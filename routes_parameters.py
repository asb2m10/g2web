from pathlib import Path
from typing import Dict, Any

from fastapi import APIRouter, HTTPException

import g2

from g2ools.nord.g2.file import Pch2File

router = APIRouter(prefix="/api", tags=["Parameters"])

@router.post("/parameter/{slot}/{location}/{module}/{parameter}/{value}/{variation}", tags=["Parameters"])
async def set_parameter(
        slot: str,
        location: str,
        module: int,
        parameter: int,
        value: int,
        variation: int
) -> Dict[str, Any]:
    """Set a parameter value on a specific module."""
    g2.require_usb()

    slot_idx = 'abcd'.find(slot.lower())
    if slot_idx < 0:
        raise HTTPException(status_code=400, detail="Slot must be one of A, B, C, D")

    loc_map = {'FX':0, 'VA':1, 'PATCH':2}
    loc_idx = loc_map.get(location.upper())
    if loc_idx is None:
        raise HTTPException(status_code=400, detail="Location must be FX, VA, or PATCH")

    # If variation is specified, set it first
    if variation is not None:
        if variation < 1 or variation > 8:
            raise HTTPException(status_code=400, detail="Variation must be 1-8")
        variation = variation - 1  # zero-based
    else:
        variation = 0

    if module < 0 or module > 255:
        raise HTTPException(status_code=400, detail="Module must be 0-255")
    if parameter < 0 or parameter > 255:
        raise HTTPException(status_code=400, detail="Parameter must be 0-255")
    if value < 0 or value > 255:
        raise HTTPException(status_code=400, detail="Value must be 0-255")

    # Get current slot version
    slot_version = g2.send_message([g2.CMD_SYS, 0x41, 0x35, slot_idx])[5]

    # Set the parameter value
    g2.send_message(
        # CMD_NO_RESP   CMD_SLOT
        [ g2.CMD_SEND + 0x08 + slot_idx,
          slot_version,
          0x40,
          loc_idx,
          module,
          parameter,
          value,
          variation], g2.CMD_SEND)

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

@router.put("/parametercc/{slot}/{location}/{module}/{parameter}/{cc}", tags=["Parameters"])
async def set_parametercc(
        slot: str,
        location: str,
        module: int,
        parameter: int,
        cc: int
) -> Dict[str, Any]:
    """Set a parameter value on a specific module."""
    g2.require_usb()

    slot_idx = 'abcd'.find(slot.lower())
    if slot_idx < 0:
        raise HTTPException(status_code=400, detail="Slot must be one of A, B, C, D")

    loc_map = {'FX':0, 'VA':1, 'PATCH':2}
    loc_idx = loc_map.get(location.upper())
    if loc_idx is None:
        raise HTTPException(status_code=400, detail="Location must be FX, VA, or PATCH")

    if module < 0 or module > 255:
        raise HTTPException(status_code=400, detail="Module must be 0-255")
    if parameter < 0 or parameter > 255:
        raise HTTPException(status_code=400, detail="Parameter must be 0-255")
    if cc < 0 or cc > 255:
        raise HTTPException(status_code=400, detail="CC must be 0-255")

    # Get current slot version
    slot_version = g2.send_message([g2.CMD_SYS, 0x41, 0x35, slot_idx])[5]

    # Set the parameter value
    g2.send_message(
        [ g2.CMD_A + slot_idx,
          slot_version,
          0x22,    # S_ASSIGN_MIDICC
          loc_idx,
          module,
          parameter,
          cc ])

    response = {
        "status": "ok",
        "location": location.upper(),
        "module": module,
        "parameter": parameter,
        "cc": cc
    }

    return response

@router.delete("/parametercc/{slot}/{location}/{module}/{parameter}", tags=["Parameters"])
async def delete_parametercc(
        slot: str,
        location: str,
        module: int,
        parameter: int
) -> Dict[str, Any]:
    """Deassign a MIDI CC from a parameter."""
    g2.require_usb()

    slot_idx = 'abcd'.find(slot.lower())
    if slot_idx < 0:
        raise HTTPException(status_code=400, detail="Slot must be one of A, B, C, D")

    assignments = await get_parametercc(slot)
    match = next((a for a in assignments
                  if a['location'] == location.upper()
                  and a['module'] == module
                  and a['parameter'] == parameter), None)
    if match is None:
        raise HTTPException(status_code=404, detail="No MIDI CC assigned to this parameter")

    slot_version = g2.send_message([g2.CMD_SYS, 0x41, 0x35, slot_idx])[5]

    g2.send_message(
        [ g2.CMD_A + slot_idx,
          slot_version,
          0x23,    # S_DEASSIGN_MIDICC
          match['cc'] ])

    return {"status": "ok", "cc": match['cc']}

@router.get("/parametercc/{slot}", tags=["Parameters"])
async def get_parametercc(slot: str) -> list:
    """Get all MIDI CC assignments for a slot."""
    g2.require_usb()

    slot_idx = 'abcd'.find(slot.lower())
    if slot_idx < 0:
        raise HTTPException(status_code=400, detail="Slot must be one of A, B, C, D")

    with g2.semaphore:
        version = g2.send_message([g2.CMD_SYS, 0x41, 0x35, slot_idx])[5]
        data = g2.send_message([g2.CMD_A + slot_idx, version, 0x3c])

    pch2 = Pch2File()
    pch2.parse(bytes(data[0x03:0x15] + data[0x17:-2]))

    loc_map = {0: 'FX', 1: 'VA', 2: 'PATCH'}
    result = []
    for ctrl in getattr(pch2.patch, 'ctrls', []):
        param = ctrl.param
        result.append({
            'cc':        ctrl.midicc,
            'location':  loc_map.get(param.module.area.index, param.module.area.index),
            'module':    param.module.index,
            'parameter': param.index,
        })
    return result
