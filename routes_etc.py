from typing import List, Literal, Dict

from fastapi import APIRouter, HTTPException
import g2

router = APIRouter(prefix="/api")

@router.put("/note/{midi_note}", tags=["Note"])
async def play_note(midi_note: int) -> Dict[str, str]:
    """Play a MIDI note on the G2."""
    g2.require_usb()

    if not (0 <= midi_note <= 127):
        raise HTTPException(status_code=400, detail="MIDI note must be between 0 and 127")
    resp = g2.send_message([g2.CMD_SYS, 0x41, 0x56, 0, midi_note])
    return { "status": "ok" }

@router.delete("/note/{midi_note}", tags=["Note"])
async def remove_note(midi_note: int) -> Dict[str, str]:
    """Remove a MIDI note on the G2."""
    g2.require_usb()

    if not (0 <= midi_note <= 127):
        raise HTTPException(status_code=400, detail="MIDI note must be between 0 and 127")
    resp = g2.send_message([g2.CMD_SYS, 0x41, 0x56, 1, midi_note])
    return { "status": "ok" }
