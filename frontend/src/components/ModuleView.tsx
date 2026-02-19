// Module View Component - renders a single G2 module

import { useState } from 'react';
import type { Module, Parameter } from '../types/api';
import { getModuleById, ConnColor } from '../types/modules';
import { paramMap } from '../types/params';
import { useSetParameter } from '../hooks/useApi';

// PNG images for each module type (served from /public/modules/)
const MODULE_IMAGES: Record<number, string> = {
  1: "/modules/1_Keyboard.png",
  3: "/modules/3_4-Out.png",
  4: "/modules/4_2-Out.png",
  5: "/modules/5_Invert.png",
  7: "/modules/7_OscB.png",
  8: "/modules/8_OscShpB.png",
  9: "/modules/9_OscC.png",
  12: "/modules/12_Reverb.png",
  13: "/modules/13_OscString.png",
  15: "/modules/15_Sw8-1.png",
  17: "/modules/17_ValSw1-2.png",
  18: "/modules/18_X-Fade.png",
  19: "/modules/19_Mix4-1B.png",
  20: "/modules/20_EnvADSR.png",
  21: "/modules/21_Mux1-8.png",
  22: "/modules/22_PartQuant.png",
  23: "/modules/23_ModADSR.png",
  24: "/modules/24_LfoC.png",
  25: "/modules/25_LfoShpA.png",
  26: "/modules/26_LfoA.png",
  27: "/modules/27_OscMaster.png",
  28: "/modules/28_Saturate.png",
  29: "/modules/29_MetNoise.png",
  31: "/modules/31_Noise.png",
  32: "/modules/32_Eq2Band.png",
  33: "/modules/33_Eq3Band.png",
  34: "/modules/34_ShpExp.png",
  36: "/modules/36_SwOnOffM.png",
  38: "/modules/38_Pulse.png",
  40: "/modules/40_Mix8-1B.png",
  41: "/modules/41_EnvH.png",
  43: "/modules/43_Constant.png",
  44: "/modules/44_LevMult.png",
  45: "/modules/45_FltVoice.png",
  46: "/modules/46_EnvAHD.png",
  47: "/modules/47_Pan.png",
  48: "/modules/48_MixStereo.png",
  49: "/modules/49_FltMulti.png",
  50: "/modules/50_ConstSwT.png",
  51: "/modules/51_FltNord.png",
  52: "/modules/52_EnvMulti.png",
  53: "/modules/53_S&H.png",
  54: "/modules/54_FltStatic.png",
  55: "/modules/55_EnvD.png",
  57: "/modules/57_Automate.png",
  58: "/modules/58_DrumSynth.png",
  59: "/modules/59_CompLev.png",
  60: "/modules/60_Mux8-1X.png",
  61: "/modules/61_Clip.png",
  62: "/modules/62_Overdrive.png",
  63: "/modules/63_Scratch.png",
  66: "/modules/66_Mix2-1B.png",
  68: "/modules/68_ClkGen.png",
  69: "/modules/69_ClkDiv.png",
  71: "/modules/71_EnvFollow.png",
  72: "/modules/72_NoteScaler.png",
  83: "/modules/83_ShpStatic.png",
  84: "/modules/84_EnvADR.png",
  85: "/modules/85_WindSw.png",
  86: "/modules/86_8Counter.png",
  87: "/modules/87_FltLP.png",
  88: "/modules/88_Sw1-4.png",
  89: "/modules/89_Flanger.png",
  90: "/modules/90_Sw1-2.png",
  91: "/modules/91_FlipFlop.png",
  92: "/modules/92_FltClassic.png",
  94: "/modules/94_StChorus.png",
  96: "/modules/96_OscD.png",
  97: "/modules/97_OscA.png",
  98: "/modules/98_FreqShift.png",
  100: "/modules/100_Sw2-1.png",
  102: "/modules/102_FltPhase.png",
  103: "/modules/103_EqPeak.png",
  105: "/modules/105_ValSw2-1.png",
  106: "/modules/106_OscNoise.png",
  108: "/modules/108_Vocoder.png",
  112: "/modules/112_LevAdd.png",
  113: "/modules/113_Fade1-2.png",
  114: "/modules/114_Fade2-1.png",
  115: "/modules/115_LevScaler.png",
  116: "/modules/116_Mix8-1A.png",
  117: "/modules/117_LevMod.png",
  118: "/modules/118_Digitizer.png",
  119: "/modules/119_EnvADDSR.png",
  121: "/modules/121_SeqNote.png",
  123: "/modules/123_Mix4-1C.png",
  124: "/modules/124_Mux8-1.png",
  125: "/modules/125_WahWah.png",
  127: "/modules/127_Fx-In.png",
  128: "/modules/128_MinMax.png",
  130: "/modules/130_BinCounter.png",
  131: "/modules/131_ADConv.png",
  132: "/modules/132_DAConv.png",
  134: "/modules/134_FltHP.png",
  139: "/modules/139_T&H.png",
  140: "/modules/140_Mix4-1S.png",
  141: "/modules/141_CtrlSend.png",
  142: "/modules/142_PCSend.png",
  143: "/modules/143_NoteSend.png",
  144: "/modules/144_SeqEvent.png",
  145: "/modules/145_SeqVal.png",
  146: "/modules/146_SeqLev.png",
  147: "/modules/147_CtrlRcv.png",
  148: "/modules/148_NoteRcv.png",
  149: "/modules/149_NoteZone.png",
  150: "/modules/150_Compressor.png",
  152: "/modules/152_KeyQuant.png",
  154: "/modules/154_SeqCtr.png",
  156: "/modules/156_NoteDet.png",
  157: "/modules/157_LevConv.png",
  158: "/modules/158_Glide.png",
  159: "/modules/159_CompSig.png",
  160: "/modules/160_ZeroCnt.png",
  161: "/modules/161_MixFader.png",
  162: "/modules/162_FltComb.png",
  163: "/modules/163_OscShpA.png",
  164: "/modules/164_OscDual.png",
  165: "/modules/165_DXRouter.png",
  167: "/modules/167_PShift.png",
  169: "/modules/169_ModAHD.png",
  170: "/modules/170_2-In.png",
  171: "/modules/171_4-In.png",
  172: "/modules/172_DlySingleA.png",
  173: "/modules/173_DlySingleB.png",
  174: "/modules/174_DelayDual.png",
  175: "/modules/175_DelayQuad.png",
  176: "/modules/176_DelayA.png",
  177: "/modules/177_DelayB.png",
  178: "/modules/178_DlyClock.png",
  179: "/modules/179_DlyShiftReg.png",
  180: "/modules/180_Operator.png",
  181: "/modules/181_DlyEight.png",
  182: "/modules/182_DlyStereo.png",
  183: "/modules/183_OscPM.png",
  184: "/modules/184_Mix1-1A.png",
  185: "/modules/185_Mix1-1S.png",
  186: "/modules/186_Sw1-2M.png",
  187: "/modules/187_Sw2-1M.png",
  188: "/modules/188_ConstSwM.png",
  189: "/modules/189_NoiseGate.png",
  190: "/modules/190_LfoB.png",
  192: "/modules/192_Phaser.png",
  193: "/modules/193_Mix4-1A.png",
  194: "/modules/194_Mix2-1A.png",
  195: "/modules/195_ModAmt.png",
  196: "/modules/196_OscPerc.png",
  198: "/modules/198_PitchTrack.png",
  199: "/modules/199_MonoKey.png",
  200: "/modules/200_RandomA.png",
  204: "/modules/204_RndClkA.png",
  205: "/modules/205_RndTrig.png",
  206: "/modules/206_RndClkB.png",
  208: "/modules/208_RndPattern.png",
};

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
  onValueChange: (paramIndex: number, value: number) => void;
}

function ParameterDisplay({
  param,
  paramDef,
  paramIndex,
  activeVariation,
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
        onChange={(e) => { const v = parseInt(e.target.value); setLocalValue(v); onValueChange(paramIndex, v); }}
        onMouseUp={() => setLocalValue(null)}
        onTouchEnd={() => setLocalValue(null)}
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
  const moduleDef = getModuleById(module.type);
  const moduleColor = MODULE_COLORS[module.color] || MODULE_COLORS[7];

  const moduleHeight = moduleDef?.height ?? 2;
  const baseHeight = 24;
  const width = 160 * scale;
  const imgSrc = MODULE_IMAGES[module.type];

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
        minHeight: imgSrc ? undefined : moduleHeight * baseHeight * scale,
        backgroundColor: imgSrc ? undefined : moduleColor,
      }}
      onClick={onClick}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={module.typeName}
          draggable={false}
          style={{ display: 'block', width: '100%', height: 'auto', userSelect: 'none' }}
        />
      ) : (
        <>
          <div
            className="absolute top-0 right-1 text-white text-xs truncate z-10"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
            title={`#${module.instance} ${module.typeName}`}
          >
            {module.name || module.typeName}
          </div>
          {moduleDef && (
            <div className="relative" style={{ height: moduleHeight * baseHeight * scale }}>
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
        </>
      )}
    </div>
  );
}

// Expanded module panel for showing parameters
interface ModuleDetailProps {
  module: Module;
  activeSlot: number;
  activeVariation: number;
  onClose: () => void;
}

export function ModuleDetail({ module, activeSlot, activeVariation, onClose }: ModuleDetailProps) {
  const moduleDef = getModuleById(module.type);
  const moduleColor = MODULE_COLORS[module.color] || MODULE_COLORS[7];
  const setParameter = useSetParameter();

  const handleParameterChange = (paramIndex: number, value: number) => {
    setParameter.mutate({
      slot: activeSlot,
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
