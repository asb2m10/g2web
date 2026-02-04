"""
This module acts as a proxy to g2ools and most common used import.

It is design to avoid hard dependencies to the internal types in g2ools.
"""

import traceback

from fastapi import HTTPException
import threading
semaphore = threading.RLock()

# Optional hardware support
try:
    from g2ools.g2ctl import G2USBInterface, g2usb, format_name
    from g2ools.g2ctl import CMD_A, CMD_SYS, CMD_SEND

    def send_message(msg: list[int]) -> list[int]:
        """Send a message to the G2 and return the response."""
        with semaphore:
            return g2usb.send_message(msg)
    HAS_USB = True
except Exception:
    traceback.print_exc()
    HAS_USB = False
    g2usb = None

def parse_name(data):
    s = data[:16]
    if isinstance(s, (bytes, bytearray)):
        s = s.decode('latin-1')
    null = s.find('\0')
    if null < 0:
        return s, data[16:]
    else:
        return s[:null], data[null+1:]

def require_usb():
    """Check if USB is available."""
    if not HAS_USB:
        raise HTTPException(
            status_code=503,
            detail="USB support not available. Check PyUSB installation and G2 connection."
        )
