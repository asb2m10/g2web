// Patch View Component - renders the patch canvas with all modules

import { useState, useMemo } from 'react';
import type { Patch, Module } from '../types/api';
import { ModuleView, ModuleDetail } from './ModuleView';

interface PatchViewProps {
  patch: Patch;
}

export function PatchView({ patch }: PatchViewProps) {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [scale, setScale] = useState(1);

  // Calculate canvas bounds from module positions
  const bounds = useMemo(() => {
    if (patch.modules.length === 0) {
      return { minX: 0, minY: 0, maxX: 20, maxY: 10, width: 200, height: 240 };
    }

    let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;

    for (const mod of patch.modules) {
      minX = Math.min(minX, mod.pos_x);
      minY = Math.min(minY, mod.pos_y);
      maxX = Math.max(maxX, mod.pos_x + 16); // Module width ~16 units
      maxY = Math.max(maxY, mod.pos_y + 4);  // Approximate height
    }

    // Add padding
    const padding = 2;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX += padding;
    maxY += padding;

    return {
      minX,
      minY,
      maxX,
      maxY,
      width: (maxX - minX) * 10,
      height: (maxY - minY) * 24,
    };
  }, [patch.modules]);

  const handleModuleClick = (module: Module) => {
    setSelectedModule(selectedModule?.instance === module.instance ? null : module);
  };

  return (
    <div className="space-y-4">
      {/* Patch header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{patch.name}</h3>
          <p className="text-sm text-gray-400">
            Slot {patch.slot} | Variation {patch.activeVariation + 1} | {patch.modules.length} modules | {patch.allocatedVoice} voices
          </p>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(Math.max(0.5, scale - 0.25))}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            -
          </button>
          <span className="text-sm text-gray-400 w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale(Math.min(2, scale + 0.25))}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex gap-4">
        {/* Module canvas */}
        <div className="flex-1 bg-gray-800 rounded-lg overflow-auto border border-gray-700">
          <div
            className="relative"
            style={{
              width: bounds.width * scale,
              height: bounds.height * scale,
              minWidth: '100%',
              minHeight: 300,
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: `${10 * scale}px ${24 * scale}px`,
            }}
          >
            {patch.modules.map((module) => (
              <ModuleView
                key={module.instance}
                module={{
                  ...module,
                  pos_x: module.pos_x - bounds.minX,
                  pos_y: module.pos_y - bounds.minY,
                }}
                activeVariation={patch.activeVariation}
                scale={scale}
                selected={selectedModule?.instance === module.instance}
                onClick={() => handleModuleClick(module)}
              />
            ))}
          </div>
        </div>

        {/* Module detail panel */}
        {selectedModule && (
          <div className="w-80 flex-shrink-0">
            <ModuleDetail
              module={selectedModule}
              activeVariation={patch.activeVariation}
              onClose={() => setSelectedModule(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
