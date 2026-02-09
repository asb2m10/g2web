import logging
import threading
import time
from typing import List, Dict, Any

import g2
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/api", tags=["Configuration"])


class SlotInfo(BaseModel):
    slot: str = Field(..., description="Slot letter (A, B, C, or D)")
    name: str
    available: bool


class SynthSettings(BaseModel):
    name: str
    mode: str
    focus: str
    master_clock_bpm: int
    slots: List[SlotInfo]


@router.get("/status")
async def get_synth_status() -> Dict[str, Any]:
    """Check if G2 synthesizer is connected."""
    return {
        "usb_available": g2.HAS_USB,
        "connected": g2.HAS_USB and g2.g2usb is not None
    }

@router.get("/settings")
async def get_synth_settings() -> SynthSettings:
    """Get current synthesizer settings (requires USB connection)."""
    g2.require_usb()

    try:
        from g2ools.nord.g2.bits import BitStream

        with g2.semaphore:
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
            mode='performance' if mode else 'patch',
            focus='ABCD'[focus],
            master_clock_bpm=bpm,
            slots=slots
        )
    except Exception as e:
        logging.exception(e)
        raise HTTPException(status_code=500, detail=f"Error reading synth: {str(e)}")

@router.post("/clock/{bpm}")
async def set_master_clock(bpm: int) -> Dict[str, Any]:
    """Set master clock run state"""
    if bpm < 20 or bpm > 254:
        raise HTTPException(status_code=400, detail="BPM must be between 20 and 254")
    perf_version = g2.send_message([g2.CMD_SYS, 0x41, 0x35, 0x04])[5]
    g2.send_message([g2.CMD_SYS, perf_version, 0x3F, 0xFF, 0x01, bpm])
    return {"status": "ok", "master_clock": bpm}

@router.put("/clock")
async def master_clock_run() -> Dict[str, Any]:
    """Start master clock run"""
    perf_version = g2.send_message([g2.CMD_SYS, 0x41, 0x35, 0x04])[5]
    g2.send_message([g2.CMD_SYS, perf_version, 0x3F, 0xFF, 0x00, 0x01])
    return {"status": "ok"}

@router.delete("/clock")
async def master_clock_stop() -> Dict[str, Any]:
    """Stop master clock"""
    perf_version = g2.send_message([g2.CMD_SYS, 0x41, 0x35, 0x04])[5]
    g2.send_message([g2.CMD_SYS, perf_version, 0x3F, 0xFF, 0x00, 0x00])
    return {"status": "ok"}