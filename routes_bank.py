from typing import List, Literal, Dict

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

import g2
from g2ools.nord.g2.categories import g2categories

router = APIRouter(prefix="/api", tags=["Bank"])

class BankDef(BaseModel):
    type: Literal["pch2", "prf2"]
    bank: int
    patch: int
    name: str
    id: str
    category: str


@router.get("/bank")
async def get_bank() -> List[BankDef]:
    JUMP, SKIP, BANK, MODE, CONTINUE = [1, 2, 3, 4, 5]
    LAST = CONTINUE
    PATCH_MODE, PERFORMANCE_MODE, END_MODE = range(3)
    modes = ['pch2', 'prf2']
    mode = PATCH_MODE
    bank = 0
    patch = 0
    ret = []
    while mode < END_MODE:
        cmd = [g2.CMD_SYS, 0x41, 0x14, mode, bank, patch]
        data = g2.send_message(cmd)
        data = bytes(data[9:-2])
        while len(data):
            c = data[0]
            if c > LAST:
                name, data = g2.parse_name(data)
                category, data = data[0], data[1:]
                ret.append(BankDef(
                    type=modes[mode],
                    bank=bank+1,
                    patch=patch+1,
                    id=f"{modes[mode]}:{bank+1:d}:{patch+1:d}",
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


@router.post("/bank/{slot}/{bank}/{patch}")
async def select_bank_item(slot: str, bank: int, patch: int) -> Dict[str, str]:
    """Select a bank item by type and ID."""

    slot = 'abcdp'.find(slot.lower())
    if slot < 0:
        raise HTTPException(status_code=400, detail="Slot must be one of A, B, C, D, P")
    if bank < 1 or bank > 32:
        raise HTTPException(status_code=400, detail="Bank must be between 1 and 32")
    if patch < 1 or patch > 127:
        raise HTTPException(status_code=400, detail="Bank must be between 1 and 32")

    g2.send_message([g2.CMD_SYS, 0x41, 0x0a, slot, bank-1, patch-1])
    return {"status": "ok"}
