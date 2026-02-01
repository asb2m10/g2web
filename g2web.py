#!/usr/bin/env python3
"""
G2 Synthesizer REST API

Exposes Nord G2 parameters, modules, and patch operations via FastAPI.
"""

from typing import Dict
from pathlib import Path
import traceback
import logging

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.staticfiles import StaticFiles
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse, FileResponse

import g2
from routes_patch import router as patch_router
from routes_bank import router as bank_router
from routes_configuration import router as configuration_router


app = FastAPI(
    title="G2 Synthesizer API",
    description="REST API for Nord G2 synthesizer parameters, modules, and patches",
    version="1.0.0",
)

class ExceptionHandlerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            return await call_next(request)
        except Exception as exc:
            logging.exception("Uncaught exception")
            tb = traceback.format_exception(type(exc), exc, exc.__traceback__)
            tb_str = "".join(tb)
            return HTMLResponse(
                status_code=500,
                content=f"""
                <html>
                <head><title>500 Internal Server Error</title></head>
                <body>
                <h1>500 Internal Server Error</h1>
                <p><strong>URL:</strong> {request.url}</p>
                <p><strong>Method:</strong> {request.method}</p>
                <h2>Exception:</h2>
                <pre style="background:#f0f0f0;padding:10px;overflow:auto;">{tb_str}</pre>
                </body>
                </html>
                """
            )

app.add_middleware(ExceptionHandlerMiddleware)
app.include_router(patch_router)
app.include_router(bank_router)
app.include_router(configuration_router)


@app.post("/api/variation/{variation}", tags=["Variation"])
async def select_variation(variation: int) -> Dict[str, str]:
    """Select variation (1-8)."""
    g2.require_usb()

    if variation < 1 or variation > 8:
        raise HTTPException(status_code=400, detail="Variation must be 1-8")

    try:
        slota = g2.send_message([g2.CMD_SYS, 0x41, 0x35, 0x00])
        g2.send_message([g2.CMD_A, slota[5], 0x6a, variation-1])
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error selecting variation: {str(e)}")


# ============== Static Files (Frontend) ==============
STATIC_DIR = Path(__file__).parent / "frontend" / "dist"
if STATIC_DIR.exists():
    # Serve static assets (js, css, images)
    app.mount("/assets", StaticFiles(directory=STATIC_DIR / "assets"), name="assets")

    @app.get("/{path:path}", tags=["static"])
    async def serve_frontend(path: str):
        """Serve frontend SPA - returns index.html for all non-API routes."""
        file_path = STATIC_DIR / path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(STATIC_DIR / "index.html")


def register_mdns(port: int = 8000):
    """Register mDNS service for g2.local discovery."""
    try:
        import socket
        from zeroconf import ServiceInfo, Zeroconf

        # Get local IP address
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()

        zc = Zeroconf()
        service_info = ServiceInfo(
            "_http._tcp.local.",
            "G2 Controller._http._tcp.local.",
            addresses=[socket.inet_aton(local_ip)],
            port=port,
            properties={"path": "/"},
            server="g2.local.",
        )
        zc.register_service(service_info)
        logging.info(f"mDNS registered: http://g2.local:{port}")
        return zc, service_info
    except ImportError:
        logging.warning("zeroconf not installed, mDNS disabled (pip install zeroconf)")
        return None, None
    except Exception as e:
        logging.warning(f"mDNS registration failed: {e}")
        return None, None


if __name__ == "__main__":
    import uvicorn
    import sys

    if sys.argv[1] != "dev" :
        logging.basicConfig(level=logging.INFO)
        zc, service_info = register_mdns(8000)

    try:
        uvicorn.run(app, host="0.0.0.0", port=8000)
    finally:
        try:
            if zc and service_info:
                zc.unregister_service(service_info)
                zc.close()
        except: pass
