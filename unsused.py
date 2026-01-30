from typing import Optional, List, Dict

from fastapi import FastAPI, HTTPException, UploadFile, File, Query, Request
from fastapi.responses import FileResponse, PlainTextResponse, HTMLResponse
from pydantic import BaseModel
from g2ools.nord.g2.params import parammap
# Import G2 modules
from g2ools.nord.g2.params import parammap
from g2ools.nord.g2.modules import modules as g2modules
from g2ools.nord.g2.categories import g2categories
from g2ools.nord.g2.colors import g2conncolors, g2modulecolors, g2cablecolors
from g2ools.nord.g2.file import Pch2File


# Pydantic models for API responses
class ParamDefinition(BaseModel):
    name: str
    low: int
    high: int
    default: int
    comments: Optional[str] = None
    definitions: List[Dict[str, Any]] = []


class PatchInfo(BaseModel):
    name: str
    category: str
    voice_count: int
    modules: List[PatchModule]
    cables: List[PatchCable]

class ModuleDefinition(BaseModel):
    id: int
    name: str
    shortnm: str
    height: int
    page: str
    inputs: List[ModuleInput]
    outputs: List[ModuleOutput]
    params: List[ModuleParam]


class PatchModule(BaseModel):
    index: int
    type_id: int
    type_name: str
    horiz: int
    vert: int
    color: int


# Build lookup tables
module_by_id: Dict[int, Any] = {}
module_by_name: Dict[str, Any] = {}
for mod in g2modules:
    module_by_id[mod.id] = mod
    module_by_name[mod.longnm.lower()] = mod


class ModuleInput(BaseModel):
    name: str
    type: str
    horiz: int
    vert: int


class ModuleOutput(BaseModel):
    name: str
    type: str
    horiz: int
    vert: int


class ModuleParam(BaseModel):
    name: str
    type: str

class PatchCable(BaseModel):
    source_module: int
    source_connector: int
    dest_module: int
    dest_connector: int
    color: int




def get_param_definition(name: str) -> Optional[ParamDefinition]:
    """Get parameter definition by name."""
    param = parammap.get(name)
    if not param:
        return None

    definitions = []
    if hasattr(param, 'definitions') and param.definitions:
        for defn in param.definitions:
            d = {}
            if hasattr(defn, 'name') and defn.name:
                d['name'] = defn.name
            if hasattr(defn, 'low') and defn.low is not None:
                d['low'] = defn.low
            if hasattr(defn, 'high') and defn.high is not None:
                d['high'] = defn.high
            if hasattr(defn, 'map') and defn.map:
                d['values'] = list(defn.map.keys()) if hasattr(defn.map, 'keys') else []
            definitions.append(d)

    return ParamDefinition(
        name=param.name,
        low=getattr(param, 'low', 0),
        high=getattr(param, 'high', 127),
        default=getattr(param, 'default', 0),
        comments=getattr(param, 'comments', None),
        definitions=definitions
    )


def get_module_definition(mod) -> ModuleDefinition:
    """Convert module to API response."""
    inputs = []
    if hasattr(mod, 'inputs') and mod.inputs:
        for inp in mod.inputs:
            inputs.append(ModuleInput(
                name=inp.name,
                type=inp.type,
                horiz=getattr(inp, 'horiz', 0),
                vert=getattr(inp, 'vert', 0)
            ))

    outputs = []
    if hasattr(mod, 'outputs') and mod.outputs:
        for out in mod.outputs:
            outputs.append(ModuleOutput(
                name=out.name,
                type=out.type,
                horiz=getattr(out, 'horiz', 0),
                vert=getattr(out, 'vert', 0)
            ))

    params = []
    if hasattr(mod, 'params') and mod.params:
        for p in mod.params:
            params.append(ModuleParam(
                name=p.name,
                type=p.type
            ))

    return ModuleDefinition(
        id=mod.id,
        name=mod.longnm,
        shortnm=mod.shortnm,
        height=mod.height,
        page=mod.page,
        inputs=inputs,
        outputs=outputs,
        params=params
    )


# ============== Parameter Endpoints ==============

@app.get("/parameters", tags=["Parameters"])
async def list_parameters() -> List[str]:
    """List all available parameter type names."""
    return sorted(parammap.__dict__.keys())


@app.get("/parameters/{name}", tags=["Parameters"])
async def get_parameter(name: str) -> ParamDefinition:
    """Get parameter definition by name."""
    param = get_param_definition(name)
    if not param:
        raise HTTPException(status_code=404, detail=f"Parameter '{name}' not found")
    return param


# ============== Module Endpoints ==============

@app.get("/modules", tags=["Modules"])
async def list_modules(page: Optional[str] = None) -> List[Dict[str, Any]]:
    """List all available module types. Optionally filter by page/category."""
    result = []
    for mod in g2modules:
        if page and mod.page.lower() != page.lower():
            continue
        result.append({
            "id": mod.id,
            "name": mod.longnm,
            "shortnm": mod.shortnm,
            "page": mod.page.name,
            "height": mod.height
        })
    return sorted(result, key=lambda x: (x["page"], x["name"]))



@app.get("/modules/pages", tags=["Modules"])
async def list_module_pages() -> List[str]:
    """List all module page/category names."""
    pages = set()
    for mod in g2modules:
        pages.add(mod.page)
    return sorted(pages)


@app.get("/modules/{module_id}", tags=["Modules"])
async def get_module(module_id: int) -> ModuleDefinition:
    """Get module definition by ID."""
    mod = module_by_id.get(module_id)
    if not mod:
        raise HTTPException(status_code=404, detail=f"Module ID {module_id} not found")
    return get_module_definition(mod)


@app.get("/modules/by-name/{name}", tags=["Modules"])
async def get_module_by_name(name: str) -> ModuleDefinition:
    """Get module definition by name."""
    mod = module_by_name.get(name.lower())
    if not mod:
        raise HTTPException(status_code=404, detail=f"Module '{name}' not found")
    return get_module_definition(mod)


# ============== Categories Endpoints ==============

@app.get("/categories", tags=["Categories"])
async def list_categories() -> List[str]:
    """List all patch categories."""
    return list(g2categories)


# ============== Colors Endpoints ==============

@app.get("/colors", tags=["Colors"])
async def list_colors() -> Dict[str, List[str]]:
    """List all available colors for modules, cables, and connections."""
    return {
        "module_colors": list(g2modulecolors),
        "cable_colors": list(g2cablecolors),
        "connection_colors": list(g2conncolors)
    }


# ============== Patch File Endpoints ==============

@app.get("/patches", tags=["Patches"])
async def list_patches(
        directory: str = Query(default=".", description="Directory to scan for .pch2 files")
) -> List[Dict[str, str]]:
    """List all .pch2 patch files in a directory."""
    path = Path(directory)
    if not path.exists():
        raise HTTPException(status_code=404, detail=f"Directory '{directory}' not found")

    patches = []
    for f in path.glob("**/*.pch2"):
        patches.append({
            "name": f.stem,
            "path": str(f),
            "size": f.stat().st_size
        })
    return sorted(patches, key=lambda x: x["name"].lower())


@app.get("/patches/file", tags=["Patches"])
async def read_patch_file(path: str) -> PatchInfo:
    """Read and parse a .pch2 patch file."""
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail=f"File '{path}' not found")

    try:
        pch2 = Pch2File()
        with open(path, 'rb') as f:
            data = f.read()
        # Skip header to first null byte
        null = data.find(b'\0')
        if null >= 0:
            data = data[null:]
        pch2.parse(data, 0)
        patch = pch2.patch

        # Extract modules
        modules = []
        for area in [patch.voice, patch.fx]:
            if hasattr(area, 'modules') and area.modules:
                for mod in area.modules:
                    mod_type = module_by_id.get(mod.type, None)
                    modules.append(PatchModule(
                        index=mod.index,
                        type_id=mod.type,
                        type_name=mod_type.longnm if mod_type else f"Unknown({mod.type})",
                        horiz=mod.horiz,
                        vert=mod.vert,
                        color=mod.color
                    ))

        # Extract cables
        cables = []
        for area in [patch.voice, patch.fx]:
            if hasattr(area, 'cables') and area.cables:
                for cable in area.cables:
                    cables.append(PatchCable(
                        source_module=cable.source,
                        source_connector=cable.source_connector,
                        dest_module=cable.dest,
                        dest_connector=cable.dest_connector,
                        color=cable.color
                    ))

        # Get category
        cat_idx = getattr(patch.description, 'category', 0)
        category = g2categories[cat_idx] if cat_idx < len(g2categories) else "unknown"

        return PatchInfo(
            name=Path(path).stem,
            category=category,
            voice_count=getattr(patch.description, 'voices', 1),
            modules=modules,
            cables=cables
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing patch: {str(e)}")

