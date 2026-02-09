from pathlib import Path
from typing import Dict, Any

from fastapi import APIRouter, HTTPException

import g2

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
