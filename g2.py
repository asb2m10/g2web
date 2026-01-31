import traceback
from typing import List

from pydantic import BaseModel
from fastapi import HTTPException

# Optional hardware support
try:
    from g2ools.g2ctl import G2USBInterface, g2usb, parse_name, format_name
    from g2ools.g2ctl import CMD_A, CMD_SYS
    send_message = g2usb.send_message
    HAS_USB = True
except Exception:
    traceback.print_exc()
    HAS_USB = False
    g2usb = None

def require_usb():
    """Check if USB is available."""
    if not HAS_USB:
        raise HTTPException(
            status_code=503,
            detail="USB support not available. Check PyUSB installation and G2 connection."
        )
