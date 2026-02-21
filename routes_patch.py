"""Patch-related API endpoints."""

from pathlib import Path
from typing import Dict, List, Tuple

from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel

import g2
from g2ools.nord.g2.file import Pch2File
from g2ools.nord.g2.params import params


class Parameter(BaseModel):
    name: str
    values: List[int]


class OutboundConnection(BaseModel):
    outModule: int
    outParameter: int
    inParameter: int
    color: int


class Module(BaseModel):
    name: str
    instance: int
    type: int
    typeName: str
    pos_x: int
    pos_y: int
    color: int
    parameters: List[Parameter]
    outboundConnections: List[OutboundConnection] = []


class KnobParameter(BaseModel):
    index: int
    position: str
    area: str
    module: int
    parameter: int


class Patch(BaseModel):
    name: str
    slot: str
    activeVariation: int
    allocatedVoice: int
    modules: List[Module]
    modulesFx: List[Module]
    knobs: List[KnobParameter]

router = APIRouter(prefix="/api", tags=["Patch"])

def fetch_modules(area) -> Dict[int, Module] :
    modules = {}
    for i in area.modules:
        parameters = []
        for p in i.params:
            parameters.append(Parameter(
                name=p.type.name,
                type=params.index(p.type.type),
                values=p.variations
            ))

        modules[i.index] = Module(
            name=i.name,
            instance=i.index,
            type=i.type.id,
            typeName=i.type.shortnm,
            pos_x=i.horiz,
            pos_y=i.vert,
            color=i.color,
            parameters=parameters,
            outboundConnections=[]
        )

    for cable in area.cables:
        source, dest = cable.source, cable.dest
        outbound = OutboundConnection(
            outModule=source.module.index,
            outParameter=source.index,
            inParameter=dest.index,
            color=cable.color
        )
        modules[dest.module.index].outboundConnections.append(outbound)

    return modules

@router.get("/slot/{slot}")
async def get_slot_info(slot: str) -> Patch:
    """Get information about a specific slot (A, B, C, or D)."""
    g2.require_usb()

    slot_idx = 'abcd'.find(slot.lower())
    if slot_idx < 0:
        raise HTTPException(status_code=400, detail="Slot must be A, B, C, or D")
    with g2.semaphore:
        version = g2.send_message([g2.CMD_SYS, 0x41, 0x35, slot_idx])[5]
        data = g2.send_message([g2.CMD_A+slot_idx, version, 0x3c])
        name = g2.send_message([g2.CMD_A+slot_idx, version, 0x28])
    name, junk = g2.parse_name(name[4:])
    #printf("%s\n", hexdump(data[1:-2]))
    pch2 = Pch2File()
    data = data[0x03:0x15] + data[0x17:-2]
    pch2.parse(bytes(data))

    knobs = []
    if hasattr(pch2.patch, 'knobs'):
        for i, knob in enumerate(pch2.patch.knobs):
            if knob.assigned and hasattr(knob.param, 'module'):
                knobs.append(KnobParameter(
                    index=i,
                    area=['fx', 'voice', 'perf'][knob.param.module.area.index],
                    position="%s%d:%d" % ('ABCDE'[i//24], (i/8)%3, i&7),
                    module=knob.param.module.index,
                    parameter=knob.param.index
                ))

    patch = Patch(
        name=name,
        slot=slot.upper(),
        activeVariation=pch2.patch.description.variation,
        allocatedVoice=pch2.patch.description.voices,
        modules = fetch_modules(pch2.patch.voice).values(),
        modulesFx = fetch_modules(pch2.patch.fx).values(),
        knobs = knobs
    )

    return patch

@router.post("/slot/{slot}/upload")
async def upload_patch_to_slot(slot: str, file: UploadFile = File(...)) -> Dict[str, str]:
    """Load a patch file into a slot (A, B, C, or D)."""
    g2.require_usb()

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
        g2.send_message(list(a))

        return {"status": "ok", "slot": slot.upper(), "patch": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading patch: {str(e)}")

@router.post("/slot/{slot}/select")
async def select_slot(slot: str) -> Dict[str, str]:
    """Select active slot (A, B, C, or D)."""
    g2.require_usb()

    slot_idx = 'abcd'.find(slot.lower())
    if slot_idx < 0:
        raise HTTPException(status_code=400, detail="Slot must be A, B, C, or D")

    g2.send_message([0x2c, 0x00, 0x09, slot_idx])
    return {"status": "ok", "slot": slot.upper()}
