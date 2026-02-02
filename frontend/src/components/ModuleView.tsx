// Module View Component - renders a single G2 module

import { useState } from 'react';
import type { Module, Parameter } from '../types/api';
import { getModuleById, ConnColor } from '../types/modules';
import { paramMap } from '../types/params';
import { useSetParameter } from '../hooks/useApi';

// Module colors from G2 (index corresponds to color value)
const MODULE_COLORS = [
  '#B8860B', // 0 - Yellow/Gold
  '#4169E1', // 1 - Blue
  '#DC143C', // 2 - Red
  '#228B22', // 3 - Green
  '#9932CC', // 4 - Purple
  '#FF8C00', // 5 - Orange
  '#20B2AA', // 6 - Cyan
  '#808080', // 7 - Gray
];

// Connection colors
const CONN_COLORS: Record<ConnColor, string> = {
  [ConnColor.Red]: '#DC143C',
  [ConnColor.Blue]: '#4169E1',
  [ConnColor.Yellow]: '#FFD700',
  [ConnColor.Orange]: '#FF8C00',
  [ConnColor.BlueRed]: '#9932CC',
  [ConnColor.YellowOrange]: '#FFA500',
};

interface ModuleViewProps {
  module: Module;
  activeVariation?: number;
  scale?: number;
  onClick?: () => void;
  selected?: boolean;
}

interface ParameterDisplayProps {
  param: Parameter;
  paramDef: typeof paramMap[string] | undefined;
  paramIndex: number;
  activeVariation: number;
  moduleInstance: number;
  onValueChange: (paramIndex: number, value: number) => void;
}

function ParameterDisplay({
  param,
  paramDef,
  paramIndex,
  activeVariation,
  moduleInstance,
  onValueChange,
}: ParameterDisplayProps) {
  const [localValue, setLocalValue] = useState<number | null>(null);
  const value = localValue ?? param.values[activeVariation] ?? param.values[0] ?? 0;

  // Get display value from param definition
  let displayValue: string = String(value);
  if (paramDef && paramDef.map && paramDef.map.length > 0) {
    const map = paramDef.map[0];
    // Find matching value in map
    for (const [name, val] of Object.entries(map)) {
      if (parseInt(val) === value) {
        displayValue = name.replace(/_/g, ' ');
        break;
      }
    }
  }

  const min = paramDef?.low ?? 0;
  const max = paramDef?.high ?? 127;
  const percentage = max > min ? ((value - min) / (max - min)) * 100 : 0;

  const handleChange = (newValue: number) => {
    setLocalValue(newValue);
  };

  const handleCommit = () => {
    if (localValue !== null) {
      onValueChange(paramIndex, localValue);
      setLocalValue(null);
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-400 w-20 truncate" title={param.name}>
        {param.name}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => handleChange(parseInt(e.target.value))}
        onMouseUp={handleCommit}
        onTouchEnd={handleCommit}
        className="flex-1 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-nord-blue
          [&::-webkit-slider-thumb]:cursor-pointer"
      />
      <span className="text-gray-300 w-12 text-right truncate" title={displayValue}>
        {displayValue}
      </span>
    </div>
  );
}

export function ModuleView({ module, scale = 1, onClick, selected }: ModuleViewProps) {
  // Get module type definition
  const moduleDef = getModuleById(module.type);
  const moduleColor = MODULE_COLORS[module.color] || MODULE_COLORS[7];

  // Calculate height based on module definition
  const moduleHeight = moduleDef?.height ?? 2;
  const baseHeight = 24; // Base unit height in pixels
  const height = moduleHeight * baseHeight * scale;
  const width = 160 * scale;

  return (
    <div
      className={`
        absolute rounded-md overflow-hidden cursor-pointer transition-all
        ${selected ? 'ring-2 ring-nord-blue ring-offset-2 ring-offset-gray-900 z-10' : ''}
        hover:z-10 hover:shadow-lg
      `}
      style={{
        left: module.pos_x * width,
        top: module.pos_y * baseHeight * scale,
        width,
        minHeight: height,
        backgroundColor: moduleColor,
      }}
      onClick={onClick}
    >
      {/* Module name at top right */}
      <div
        className="absolute top-0 right-1 text-white text-xs truncate z-10"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
        title={`#${module.instance} ${module.typeName}`}
      >
        {module.name || module.typeName}
      </div>

      {/* Connectors visualization */}
      {moduleDef && (
        <div className="relative" style={{ height: moduleHeight * baseHeight * scale }}>
          {/* Inputs */}
          {moduleDef.inputs.map((input, idx) => (
            <div
              key={`in-${idx}`}
              className="absolute w-2 h-2 rounded-full border border-white/50"
              style={{
                left: input.horiz * 7 * scale,
                top: input.vert * baseHeight * scale,
                backgroundColor: CONN_COLORS[input.color] || '#888',
              }}
              title={`In: ${input.name}`}
            />
          ))}
          {/* Outputs */}
          {moduleDef.outputs.map((output, idx) => (
            <div
              key={`out-${idx}`}
              className="absolute w-2 h-2 rounded-sm border border-white/50"
              style={{
                left: output.horiz * 7 * scale,
                top: output.vert * baseHeight * scale,
                backgroundColor: CONN_COLORS[output.color] || '#888',
              }}
              title={`Out: ${output.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Expanded module panel for showing parameters
interface ModuleDetailProps {
  module: Module;
  activeVariation: number;
  onClose: () => void;
}

export function ModuleDetail({ module, activeVariation, onClose }: ModuleDetailProps) {
  const moduleDef = getModuleById(module.type);
  const moduleColor = MODULE_COLORS[module.color] || MODULE_COLORS[7];
  const setParameter = useSetParameter();

  const handleParameterChange = (paramIndex: number, value: number) => {
    setParameter.mutate({
      location: 'VA',
      module: module.instance,
      parameter: paramIndex,
      value,
      variation: activeVariation + 1, // API expects 1-based
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700">
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: moduleColor }}
      >
        <div>
          <h3 className="font-bold text-white">
            {moduleDef?.longName || module.typeName}
          </h3>
          <p className="text-xs text-white/70">
            Instance #{module.instance} | Type: {module.typeName}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white text-xl leading-none"
        >
          &times;
        </button>
      </div>

      {/* Parameters */}
      <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
        {module.parameters.length === 0 ? (
          <p className="text-gray-500 text-sm">No parameters</p>
        ) : (
          module.parameters.map((param, idx) => {
            // Find matching param definition from module def
            const paramTypeName = moduleDef?.params[idx]?.type;
            const paramDef = paramTypeName ? paramMap[paramTypeName] : undefined;

            return (
              <ParameterDisplay
                key={idx}
                param={param}
                paramDef={paramDef}
                paramIndex={idx}
                activeVariation={activeVariation}
                moduleInstance={module.instance}
                onValueChange={handleParameterChange}
              />
            );
          })
        )}
      </div>

      {/* Footer with position info */}
      <div className="px-4 py-2 bg-gray-900 text-xs text-gray-500 flex gap-4">
        <span>X: {module.pos_x}</span>
        <span>Y: {module.pos_y}</span>
        {moduleDef && <span>Height: {moduleDef.height}</span>}
        <span className="text-nord-blue">VA</span>
      </div>
    </div>
  );
}
