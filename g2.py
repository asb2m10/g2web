"""
This module acts as a proxy to g2ools and most common used imports.

It is design to avoid hard dependencies to the internal types in g2ools.
"""

import traceback

from fastapi import HTTPException
import threading
import g2interface

semaphore = threading.RLock()

CMD_A    = 0x08
CMD_B    = 0x09
CMD_C    = 0x0a
CMD_D    = 0x0b
CMD_SYS  = 0x0c
CMD_INIT = 0x80
CMD_MASK = 0xf0
CMD_REQ  = 0x20
CMD_SEND = 0x30
CMD_RESP = 0x00

try:
    #from g2ools.g2ctl import G2USBInterface, g2usb, format_name
    g2usb = g2interface.G2USBInterface()

    def send_message(*args, **kwargs) -> list[int]:
        """Send a message to the G2 and return the response."""
        with semaphore:
            return g2usb.send_wait_reply(*args, **kwargs)
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

def format_name(name):
    if len(name) < 16:
        return name + '\0'
    else:
        return name[:16]

def require_usb():
    """Check if USB is available."""
    if not HAS_USB:
        raise HTTPException(
            status_code=503,
            detail="USB support not available. Check PyUSB installation and G2 connection."
        )
