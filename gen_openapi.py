#!/usr/bin/env python3
"""Generate openapi.json and openapi.html from the FastAPI app."""

import json
import sys
from pathlib import Path

# Ensure the project root is on sys.path
sys.path.insert(0, str(Path(__file__).parent))

from g2web import app

OUTPUT_DIR = Path(__file__).parent

# --- 1. Generate openapi.json ---

schema = app.openapi()
json_path = OUTPUT_DIR / "openapi.json"
json_path.write_text(json.dumps(schema, indent=2))
print(f"Written: {json_path}")

# --- 2. Generate self-contained openapi.html using Swagger UI ---

title = schema.get("info", {}).get("title", "API Docs")
spec_json = json.dumps(schema)

html = f"""<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
    <style>
      body {{ margin: 0; padding: 0; }}
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script>
      SwaggerUIBundle({{
        spec: {spec_json},
        dom_id: '#swagger-ui',
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
        layout: 'BaseLayout',
      }});
    </script>
  </body>
</html>
"""

html_path = OUTPUT_DIR / "openapi.html"
html_path.write_text(html)
print(f"Written: {html_path}")
