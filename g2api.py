#!/usr/bin/env python3
"""
G2 Synthesizer REST API

Exposes Nord G2 parameters, modules, and patch operations via FastAPI.
"""

import os
import sys
import traceback
from pathlib import Path
from typing import Optional, List, Dict, Any
from contextlib import asynccontextmanager
from g2ools.nord.g2.params import params
from typing import Literal
from fastapi import FastAPI, HTTPException, UploadFile, File, Query, Request
from fastapi.responses import FileResponse, PlainTextResponse, HTMLResponse
from pydantic import BaseModel
from fastapi.routing import APIRoute
from starlette.responses import JSONResponse
import traceback
import logging
from g2ools.nord.g2.categories import g2categories

from g2ools.nord.g2.file import Pch2File

# Optional hardware support
try:
    from g2ools.g2ctl import G2USBInterface, g2usb, parse_name, format_name
    from g2ools.g2ctl import CMD_A, CMD_SYS, CMD_REQ
    HAS_USB = True
except Exception:
    traceback.print_exc()
    HAS_USB = False
    g2usb = None

class ServerErrorLoggingRoute(APIRoute):
    def get_route_handler(self) -> Callable:
        original_route_handler = super().get_route_handler()
        async def custom_route_handler(request: Request) -> Response:
            try:
                return await original_route_handler(request)
            except HTTPException:
                raise # Don't catch explicit HTTPExceptions
            except Exception as exc:
                logging.exception("Uncaught exception")
                # Format the traceback for the response body (DEV ONLY)
                traceback_msg = traceback.format_exc()
                return JSONResponse(
                    content={"detail": "Internal Server Error", "traceback": traceback_msg},
                    status_code=500,
                )
        return custom_route_handler

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

class Parameter(BaseModel):
    name: str
    type: int
    values: List[int]

class Module(BaseModel):
    name: str
    instance: int
    type: int
    typeName: str
    pos_x: int
    pos_y: int
    color: int
    parameters: List[Parameter]

class Patch(BaseModel):
    name: str
    slot: str
    activeVariation: int
    allocatedVoice: int
    modules: List[Module]

class BankDef(BaseModel):
    type: Literal["Pch2", "Prf2"]
    bank: int
    patch: int
    name: str
    category: str


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    yield


app = FastAPI(
    title="G2 Synthesizer API",
    description="REST API for Nord G2 synthesizer parameters, modules, and patches",
    version="1.0.0",
    lifespan=lifespan,
    debug=True
)
app.router.route_class = ServerErrorLoggingRoute

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Show full stacktrace for unhandled exceptions."""
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


# ============== Hardware Endpoints (require USB connection) ==============

def require_usb():
    """Check if USB is available."""
    if not HAS_USB:
        raise HTTPException(
            status_code=503,
            detail="USB support not available. Check PyUSB installation and G2 connection."
        )


@app.get("/api/status", tags=["connection"])
async def get_synth_status() -> Dict[str, Any]:
    """Check if G2 synthesizer is connected."""
    return {
        "usb_available": HAS_USB,
        "connected": HAS_USB and g2usb is not None
    }

@app.get("/api/settings", tags=["connection"])
async def get_synth_settings() -> SynthSettings:
    """Get current synthesizer settings (requires USB connection)."""
    require_usb()

    try:
        from g2ools.nord.g2.bits import BitStream

        g2usb.send_message([CMD_SYS, 0x41, 0x35, 0x04])
        syst = g2usb.send_message([CMD_SYS, 0x41, 0x02])
        synthname, syst = parse_name(syst[4:])

        bitstream = BitStream(syst)
        mode = bitstream.read_bits(1)
        bitstream.seek_bit(8*5)
        midis = bitstream.read_bitsa([8]*5)

        # Get performance/patch info
        sels = g2usb.send_message([CMD_SYS, 0x41, 0x81])
        data = g2usb.send_message([CMD_SYS, sels[2], 0x10])
        perfname, data = parse_name(data[4:])

        bitstream = BitStream(data, 8*4)
        _, focus, _ = bitstream.read_bitsa([4, 2, 2])
        range_enable, bpm, split, clock = bitstream.read_bitsa([8, 8, 8, 8])

        # Get slot info
        data = data[11:]
        slots = []
        for i, slot_letter in enumerate('ABCD'):
            name, data = parse_name(data)
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

@app.post("/api/playnote/{midi_note}/{velocity}", tags=["midi"])
async def play_note(midi_note: int, velocity: int) -> Dict[str, str]:
    """Play or stop a MIDI note on the synthesizer."""
    require_usb()

    if midi_note < 0 or midi_note > 127:
        raise HTTPException(status_code=400, detail="MIDI note must be 0-127")
    if velocity == 0:
        onoff = 0
    else:
        onoff = 1
    try:
        g2usb.send_message([CMD_REQ + CMD_SYS, 0x41, 0x53, midi_note, onoff])
        return {"status": "ok", "midi_note": midi_note, "onoff": onoff}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error playing note: {str(e)}")

@app.put("/api/parameter/{location}/{module}/{parameter}/{value}/{variation}", tags=["parameters"])
async def set_parameter(
    location: str,
    module: int,
    parameter: int,
    value: int,
    variation: int
) -> Dict[str, Any]:
    """Set a parameter value on a specific module."""
    require_usb()

    loc_map = {'FX':0, 'VA':1, 'PATCH':2}
    loc_idx = loc_map.get(location.upper())
    if loc_idx is None:
        raise HTTPException(status_code=400, detail="Location must be FX, VA, or PATCH")

    try:
        # Get current slot version
        slot_info = g2usb.send_message([CMD_SYS, 0x41, 0x35, loc_idx])
        slot_version = slot_info[5]

        # If variation is specified, set it first
        if variation is not None:
            if variation < 1 or variation > 8:
                raise HTTPException(status_code=400, detail="Variation must be 1-8")
        else:
            variation = 0

        # Set the parameter value
        g2usb.send_message(
            # CMD_NO_RESP   CMD_SLOT
            [ 0x30 +        0x08 + slot_info,
             slot_version,
            # S_SET_PARAM
             0x40,
             loc_idx,
             module,
             parameter,
             value,
             variation])

        response = {
            "status": "ok",
            "location": location.upper(),
            "module": module,
            "parameter": parameter,
            "value": value
        }
        if variation is not None:
            response["variation"] = variation

        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error setting parameter: {str(e)}")

@app.get("/api/slot/{slot}", tags=["Hardware"])
async def get_slot_info(slot: str) -> Patch:
    """Get information about a specific slot (A, B, C, or D)."""
    require_usb()

    slot_idx = 'abcd'.find(slot.lower())
    if slot_idx < 0:
        raise HTTPException(status_code=400, detail="Slot must be A, B, C, or D")

    try:
        version = g2usb.send_message([CMD_SYS, 0x41, 0x35, slot_idx])[5]
        data = g2usb.send_message([CMD_A+slot_idx, version, 0x3c])
        name = g2usb.send_message([CMD_A+slot_idx, version, 0x28])
        name, junk = parse_name(name[4:])
        #printf("%s\n", hexdump(data[1:-2]))
        pch2 = Pch2File()
        data = data[0x03:0x15] + data[0x17:-2]
        pch2.parse(bytes(data))

        modules = []

        for i in pch2.patch.voice.modules:
            parameters = []
            for p in i.params:
                parameters.append(Parameter(
                    name=p.type.name,
                    type=params.index(p.type.type),
                    values=p.variations
                ))
            modules.append(Module(
                name=i.name,
                instance=i.index,
                type=i.type.id,
                typeName=i.type.shortnm,
                pos_x=i.horiz,
                pos_y=i.vert,
                color=i.color,
                parameters=parameters
            ))

        patch = Patch(
            name=name,
            slot=slot.upper(),
            activeVariation=pch2.patch.description.variation,
            allocatedVoice=pch2.patch.description.voices,
            modules = modules
        )

        return patch

    except Exception as e:
        logging.exception(e)
        raise HTTPException(status_code=500, detail=f"Error reading slot info: {str(e)}")

@app.post("/synth/slot/{slot}/load", tags=["Hardware"])
async def load_patch_to_slot(slot: str, file: UploadFile = File(...)) -> Dict[str, str]:
    """Load a patch file into a slot (A, B, C, or D)."""
    require_usb()

    slot_idx = 'abcd'.find(slot.lower())
    if slot_idx < 0:
        raise HTTPException(status_code=400, detail="Slot must be A, B, C, or D")

    try:
        data = await file.read()
        null = data.find(b'\0')
        if null < 0:
            raise HTTPException(status_code=400, detail="Invalid .pch2 file")

        data = data[null+3:-2]
        patchname = format_name(Path(file.filename).stem)

        a = bytearray([CMD_A+slot_idx, 0x53, 0x37, 0x00, 0x00, 0x00])
        a.extend(patchname.encode('latin-1') if isinstance(patchname, str) else patchname)
        a.extend(data)
        g2usb.send_message(list(a))

        return {"status": "ok", "slot": slot.upper(), "patch": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading patch: {str(e)}")


@app.post("/synth/slot/{slot}/select", tags=["Hardware"])
async def select_slot(slot: str) -> Dict[str, str]:
    """Select active slot (A, B, C, or D)."""
    require_usb()

    slot_idx = 'abcd'.find(slot.lower())
    if slot_idx < 0:
        raise HTTPException(status_code=400, detail="Slot must be A, B, C, or D")

    try:
        ion = g2usb.send_message([CMD_SYS, 0x41, 0x7d, 0x00])
        g2usb.send_message([CMD_SYS, ion[3], 0x07, 0x08>>slot_idx, 0x0f, 0x08>>slot_idx])
        g2usb.send_message([CMD_SYS, ion[3], 0x09, slot_idx])
        g2usb.send_message([CMD_A+slot_idx, 0x0a, 0x70])
        return {"status": "ok", "slot": slot.upper()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error selecting slot: {str(e)}")


@app.post("/synth/variation/{variation}", tags=["parameters"])
async def select_variation(variation: int) -> Dict[str, str]:
    """Select variation (1-8)."""
    require_usb()

    if variation < 1 or variation > 8:
        raise HTTPException(status_code=400, detail="Variation must be 1-8")

    try:
        slota = g2usb.send_message([CMD_SYS, 0x41, 0x35, 0x00])
        g2usb.send_message([CMD_A, slota[5], 0x6a, variation-1])
        return {"status": "ok", "variation": variation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error selecting variation: {str(e)}")


@app.get("/api/bank", tags=["bank"])
async def get_bank() -> List[BankDef]:
    JUMP, SKIP, BANK, MODE, CONTINUE = [1, 2, 3, 4, 5]
    LAST = CONTINUE
    PATCH_MODE, PERFORMANCE_MODE, END_MODE = range(3)
    modes = ['Pch2', 'Prf2']
    mode = PATCH_MODE
    bank = 0
    patch = 0
    ret = []
    while mode < END_MODE:
        cmd = [CMD_SYS, 0x41, 0x14, mode, bank, patch]
        data = g2usb.send_message(cmd)
        data = bytes(data[9:-2])
        while len(data):
            c = data[0]
            if c > LAST:
                name, data = parse_name(data)
                category, data = data[0], data[1:]
                ret.append(BankDef(
                    type=modes[mode],
                    bank=bank+1,
                    patch=patch+1,
                    name=name,
                    category=g2categories[category]
                ))
                patch += 1
            elif c == CONTINUE:
                data = data[1:]
            elif c == BANK:
                bank, patch, data = data[1], data[2], data[3:]
            elif c == JUMP:
                patch, data = data[1], data[2:]
            elif c == SKIP:
                patch, data = patch+1, data[1:]
            elif c == MODE:
                mode, bank, patch, data = mode+1, 0, 0, data[1:]
    return ret

@app.post("/api/bank/{type}/{bank}/{patch}", tags=["bank"])
async def select_bank_item(type: str, bank: int, patch : int) -> Dict[str, str]:
    """Select a bank item by type and ID."""
    require_usb()

    type_map = {'PCH2': 0, 'PRF2': 1}
    type_idx = type_map.get(type.upper())
    if type_idx is None:
        raise HTTPException(status_code=400, detail="Type must be PCH2 or PRF2")
    try:
        g2usb.send_message([CMD_SYS, 0x41, 0x7d, 0x00])
        g2usb.send_message([CMD_SYS, 0x7d, 0x07, 0x10, 0x0f, 0x10])
        g2usb.send_message([CMD_SYS, 0x7d, 0x09, type_idx, bank-1, patch-1])
        return {"status": "ok", "type": type.upper(), "bank": bank+1, "patch": patch+1}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error selecting bank item: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
