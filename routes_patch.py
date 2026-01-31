"""Patch-related API endpoints."""

import logging
from pathlib import Path
from typing import Dict, List

from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from g2ools.nord.g2.params import params

import g2

from g2ools.nord.g2.file import Pch2File

class Parameter(BaseModel):
    name: str
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


router = APIRouter(prefix="/api", tags=["Patch"])


def require_usb():
    """Check if USB is available."""
    if not g2.HAS_USB:
        raise HTTPException(
            status_code=503,
            detail="USB support not available. Check PyUSB installation and G2 connection."
        )


@router.get("/slot/{slot}", tags=["Hardware"])
async def get_slot_info(slot: str) -> Patch:
    """Get information about a specific slot (A, B, C, or D)."""

    slot_idx = 'abcd'.find(slot.lower())
    if slot_idx < 0:
        raise HTTPException(status_code=400, detail="Slot must be A, B, C, or D")

    version = g2.g2usb.send_message([g2.CMD_SYS, 0x41, 0x35, slot_idx])[5]
    data = g2.g2usb.send_message([g2.CMD_A+slot_idx, version, 0x3c])
    name = g2.g2usb.send_message([g2.CMD_A+slot_idx, version, 0x28])
    name, junk = g2.parse_name(name[4:])
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


@router.post("/slot/{slot}/upload")
async def upload_patch_to_slot(slot: str, file: UploadFile = File(...)) -> Dict[str, str]:
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
        patchname = g2.format_name(Path(file.filename).stem)

        a = bytearray([g2.CMD_A+slot_idx, 0x53, 0x37, 0x00, 0x00, 0x00])
        a.extend(patchname.encode('latin-1') if isinstance(patchname, str) else patchname)
        a.extend(data)
        g2.g2usb.send_message(list(a))

        return {"status": "ok", "slot": slot.upper(), "patch": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading patch: {str(e)}")


@router.post("/slot/{slot}/select")
async def select_slot(slot: str) -> Dict[str, str]:
    """Select active slot (A, B, C, or D)."""
    require_usb()

    slot_idx = 'abcd'.find(slot.lower())
    if slot_idx < 0:
        raise HTTPException(status_code=400, detail="Slot must be A, B, C, or D")

    try:
        ion = g2.g2usb.send_message([g2.CMD_SYS, 0x41, 0x7d, 0x00])
        g2.g2usb.send_message([g2.CMD_SYS, ion[3], 0x07, 0x08>>slot_idx, 0x0f, 0x08>>slot_idx])
        g2.g2usb.send_message([g2.CMD_SYS, ion[3], 0x09, slot_idx])
        g2.g2usb.send_message([g2.CMD_A+slot_idx, 0x0a, 0x70])
        return {"status": "ok", "slot": slot.upper()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error selecting slot: {str(e)}")


@router.put("/note/{midi_note}")
async def play_note(midi_note: int) -> Dict[str, str]:
    """Play a MIDI note on the G2."""
    require_usb()

    if not (0 <= midi_note <= 127):
        raise HTTPException(status_code=400, detail="MIDI note must be between 0 and 127")
    resp = g2.g2usb.send_message([g2.CMD_SYS, 0x41, 0x56, 1, midi_note])
    return { "status": "ok" }

@router.delete("/note/{midi_note}")
async def remove_note(midi_note: int) -> Dict[str, str]:
    """Remove a MIDI note on the G2."""
    require_usb()

    if not (0 <= midi_note <= 127):
        raise HTTPException(status_code=400, detail="MIDI note must be between 0 and 127")
    resp = g2.g2usb.send_message([g2.CMD_SYS, 0x41, 0x56, 0, midi_note])
    return { "status": "ok" }

