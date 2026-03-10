"""
This module acts as a proxy to g2ools and most common used imports.

It is design to avoid hard dependencies to the internal types in g2ools.
"""

import logging
import threading

from fastapi import HTTPException
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

g2usb = None
HAS_USB = False


def _try_connect() -> bool:
    """Attempt to open the G2 USB connection. Updates g2usb and HAS_USB."""
    global g2usb, HAS_USB
    try:
        g2usb = g2interface.G2USBInterface()
        HAS_USB = True
        logging.info("G2 USB connected")
        return True
    except Exception as e:
        g2usb = None
        HAS_USB = False
        logging.debug("G2 USB not available: %s", e)
        return False


# Non-fatal initial connection attempt
_try_connect()


def send_message(*args, **kwargs) -> list[int]:
    """Send a message to the G2, reconnecting automatically if needed."""
    global g2usb, HAS_USB
    with semaphore:
        if g2usb is None:
            if not _try_connect():
                raise HTTPException(status_code=503, detail="G2 USB device not connected")
        try:
            return g2usb.send_wait_reply(*args, **kwargs)
        except Exception as e:
            logging.warning("G2 USB communication error, resetting connection: %s", e)
            g2usb = None
            HAS_USB = False
            raise HTTPException(status_code=503, detail=f"G2 USB communication error: {e}")


def require_usb():
    """Raise 503 if the G2 USB device is not reachable, attempting to connect first."""
    if g2usb is None:
        _try_connect()
    if not HAS_USB:
        raise HTTPException(
            status_code=503,
            detail="USB support not available. Check PyUSB installation and G2 connection."
        )


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
