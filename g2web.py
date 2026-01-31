#!/usr/bin/env python3
"""
G2 Synthesizer REST API

Exposes Nord G2 parameters, modules, and patch operations via FastAPI.
"""

from typing import Optional, List, Dict, Any
from contextlib import asynccontextmanager

from starlette.middleware.base import BaseHTTPMiddleware

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import traceback
import logging
import g2

from routes_patch import router as patch_router
from routes_bank import router as bank_router

class SlotInfo(BaseModel):
    slot: str
    name: str
    available: bool


class SynthSettings(BaseModel):
    name: str
    mode: str
    focus: str
    master_clock_bpm: int
    slots: List[SlotInfo]


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    yield

app = FastAPI(
    title="G2 Synthesizer API",
    description="REST API for Nord G2 synthesizer parameters, modules, and patches",
    version="1.0.0",
    lifespan=lifespan,
)

class ExceptionHandlerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            return await call_next(request)
        except Exception as exc:
            logging.exception("Uncaught exception")
            tb = traceback.format_exception(type(exc), exc, exc.__traceback__)
            tb_str = "".join(tb)
            return HTMLResponse(
                status_code=500,
                content=f"""
                <html>
                <head><title>500 Internal Server Error</title></head>
                <body>
                <h1>500 Internal Server Error</h1>
                <p><strong>URL:</strong> {request.url}</p>
                <p><strong>Method:</strong> {request.method}</p>
                <h2>Exception:</h2>
                <pre style="background:#f0f0f0;padding:10px;overflow:auto;">{tb_str}</pre>
                </body>
                </html>
                """
            )

app.add_middleware(ExceptionHandlerMiddleware)
app.include_router(patch_router)
app.include_router(bank_router)

# ============== Hardware Endpoints (require USB connection) ==============


@app.get("/api/status", tags=["connection"])
async def get_synth_status() -> Dict[str, Any]:
    """Check if G2 synthesizer is connected."""
    return {
        "usb_available": g2.HAS_USB,
        "connected": g2.HAS_USB and g2.g2usb is not None
    }

@app.get("/api/settings", tags=["connection"])
async def get_synth_settings() -> SynthSettings:
    """Get current synthesizer settings (requires USB connection)."""
    g2.require_usb()

    try:
        from g2ools.nord.g2.bits import BitStream

        g2.send_message([g2.CMD_SYS, 0x41, 0x35, 0x04])
        syst = g2.send_message([g2.CMD_SYS, 0x41, 0x02])
        synthname, syst = g2.parse_name(syst[4:])

        bitstream = BitStream(syst)
        mode = bitstream.read_bits(1)
        bitstream.seek_bit(8*5)
        midis = bitstream.read_bitsa([8]*5)

        # Get performance/patch info
        sels = g2.send_message([g2.CMD_SYS, 0x41, 0x81])
        data = g2.send_message([g2.CMD_SYS, sels[2], 0x10])
        perfname, data = g2.parse_name(data[4:])

        bitstream = BitStream(data, 8*4)
        _, focus, _ = bitstream.read_bitsa([4, 2, 2])
        range_enable, bpm, split, clock = bitstream.read_bitsa([8, 8, 8, 8])

        # Get slot info
        data = data[11:]
        slots = []
        for i, slot_letter in enumerate('ABCD'):
            name, data = g2.parse_name(data)
            active, key, hold, bank, patch_num, low, high = data[:7]
            slots.append(SlotInfo(
                slot=slot_letter,
                name=name,
                available=bool(active)
            ))
            data = data[10:]

        return SynthSettings(
            name=synthname,
            mode='Performance' if mode else 'Patch',
            focus='ABCD'[focus],
            master_clock_bpm=bpm,
            slots=slots
        )
    except Exception as e:
        logging.exception(e)
        raise HTTPException(status_code=500, detail=f"Error reading synth: {str(e)}")


@app.post("/api/variation/{variation}", tags=["Variation"])
async def select_variation(variation: int) -> Dict[str, str]:
    """Select variation (1-8)."""
    g2.require_usb()

    if variation < 1 or variation > 8:
        raise HTTPException(status_code=400, detail="Variation must be 1-8")

    try:
        slota = g2.send_message([g2.CMD_SYS, 0x41, 0x35, 0x00])
        g2.send_message([g2.CMD_A, slota[5], 0x6a, variation-1])
        return {"status": "ok", "variation": variation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error selecting variation: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
