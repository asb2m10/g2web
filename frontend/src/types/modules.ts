// G2 Module Definitions
// Converted from g2ools/nord/g2/modules.py

import { paramMap } from './params';

// Connection colors
export enum ConnColor {
  Red = 0,
  Blue = 1,
  Yellow = 2,
  Orange = 3,
  BlueRed = 4,
  YellowOrange = 5,
}

export interface PageType {
  name: string;
  index: number;
}

export interface InputType {
  name: string;
  color: ConnColor;
  horiz: number;
  vert: number;
}

export interface OutputType {
  name: string;
  color: ConnColor;
  horiz: number;
  vert: number;
}

export interface ParamType {
  name: string;
  type: string;
  labels: string[];
}

export interface ModeType {
  name: string;
  type: string;
}

export interface ModuleType {
  id: number;
  height: number;
  longName: string;
  shortName: string;
  page: PageType;
  inputs: InputType[];
  outputs: OutputType[];
  params: ParamType[];
  modes: ModeType[];
}

// Color name to enum mapping
const colorMap: Record<string, ConnColor> = {
  red: ConnColor.Red,
  blue: ConnColor.Blue,
  yellow: ConnColor.Yellow,
  orange: ConnColor.Orange,
  blue_red: ConnColor.BlueRed,
  yellow_orange: ConnColor.YellowOrange,
};

export const modules: ModuleType[] = [
  {
    id: 1,
    height: 2,
    longName: 'Keyboard',
    shortName: 'Keyboard',
    page: { name: 'In/Out', index: 5 },
    inputs: [
    ],
    outputs: [
      { name: 'Pitch', color: ConnColor.Blue, horiz: 2, vert: 1 },
      { name: 'Gate', color: ConnColor.Yellow, horiz: 5, vert: 1 },
      { name: 'Lin', color: ConnColor.Blue, horiz: 9, vert: 1 },
      { name: 'Release', color: ConnColor.Blue, horiz: 12, vert: 1 },
      { name: 'Note', color: ConnColor.Blue, horiz: 15, vert: 1 },
      { name: 'Exp', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 3,
    height: 2,
    longName: '4 outputs',
    shortName: '4-Out',
    page: { name: 'In/Out', index: 1 },
    inputs: [
      { name: 'In1', color: ConnColor.Red, horiz: 13, vert: 1 },
      { name: 'In2', color: ConnColor.Red, horiz: 15, vert: 1 },
      { name: 'In3', color: ConnColor.Red, horiz: 17, vert: 1 },
      { name: 'In4', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    outputs: [
    ],
    params: [
      { name: 'Destination', type: 'Dst_2', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Pad', type: 'Pad_1', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 4,
    height: 2,
    longName: '2 outputs',
    shortName: '2-Out',
    page: { name: 'In/Out', index: 0 },
    inputs: [
      { name: 'InL', color: ConnColor.Red, horiz: 17, vert: 1 },
      { name: 'InR', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    outputs: [
    ],
    params: [
      { name: 'Destination', type: 'Dst_1', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Pad', type: 'Pad_1', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 5,
    height: 2,
    longName: 'Logic Inverter',
    shortName: 'Invert',
    page: { name: 'Logic', index: 1 },
    inputs: [
      { name: 'In1', color: ConnColor.YellowOrange, horiz: 7, vert: 1 },
      { name: 'In2', color: ConnColor.YellowOrange, horiz: 15, vert: 1 },
    ],
    outputs: [
      { name: 'Out1', color: ConnColor.YellowOrange, horiz: 11, vert: 1 },
      { name: 'Out2', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 7,
    height: 5,
    longName: 'Osc B',
    shortName: 'OscB',
    page: { name: 'Osc', index: 1 },
    inputs: [
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 3 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 4 },
      { name: 'Sync', color: ConnColor.Red, horiz: 0, vert: 1 },
      { name: 'FmMod', color: ConnColor.Red, horiz: 9, vert: 4 },
      { name: 'ShapeMod', color: ConnColor.Red, horiz: 14, vert: 4 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 4 },
    ],
    params: [
      { name: 'FreqCoarse', type: 'FreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'FreqFine', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'PitchMod', type: 'Level_100', labels: [] },
      { name: 'FreqMode', type: 'FreqMode_3', labels: [] },
      { name: 'FmAmount', type: 'Level_100', labels: [] },
      { name: 'Shape', type: 'PW', labels: [] },
      { name: 'ShapeMod', type: 'Level_100', labels: [] },
      { name: 'Waveform', type: 'OscBWaveform', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'FmMode', type: 'FmLinTrk', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 8,
    height: 4,
    longName: 'Osc Shape B',
    shortName: 'OscShpB',
    page: { name: 'Osc', index: 6 },
    inputs: [
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 2 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 3 },
      { name: 'Sync', color: ConnColor.Red, horiz: 0, vert: 1 },
      { name: 'FmMod', color: ConnColor.Red, horiz: 10, vert: 3 },
      { name: 'ShapeMod', color: ConnColor.Red, horiz: 15, vert: 3 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'FreqCoarse', type: 'FreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'FreqFine', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'PitchMod', type: 'Level_100', labels: [] },
      { name: 'FreqMode', type: 'FreqMode_3', labels: [] },
      { name: 'FmAmount', type: 'Level_100', labels: [] },
      { name: 'Shape', type: 'PW', labels: [] },
      { name: 'ShapeMod', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'FmMode', type: 'FmLinTrk', labels: [] },
    ],
    modes: [
      { name: 'Waveform', type: 'OscWaveform_3' },
    ],
  },
  {
    id: 9,
    height: 3,
    longName: 'Osc C',
    shortName: 'OscC',
    page: { name: 'Osc', index: 2 },
    inputs: [
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 2 },
      { name: 'Sync', color: ConnColor.Red, horiz: 12, vert: 2 },
      { name: 'FmMod', color: ConnColor.Red, horiz: 14, vert: 2 },
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'FreqCoarse', type: 'FreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'FreqFine', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'FreqMode', type: 'FreqMode_3', labels: [] },
      { name: 'FmAmount', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'FmMode', type: 'FmLinTrk', labels: [] },
      { name: 'PitchMod', type: 'Level_100', labels: [] },
    ],
    modes: [
      { name: 'Waveform', type: 'OscWaveform_2' },
    ],
  },
  {
    id: 12,
    height: 3,
    longName: 'reverb',
    shortName: 'Reverb',
    page: { name: 'FX', index: 7 },
    inputs: [
      { name: 'InL', color: ConnColor.Red, horiz: 17, vert: 0 },
      { name: 'InR', color: ConnColor.Red, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'OutL', color: ConnColor.Red, horiz: 17, vert: 2 },
      { name: 'OutR', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'Time', type: 'ReverbTime', labels: [] },
      { name: 'Brightness', type: 'Level_100', labels: [] },
      { name: 'DryWet', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
      { name: 'RoomType', type: 'RoomType' },
    ],
  },
  {
    id: 13,
    height: 3,
    longName: 'Osc String',
    shortName: 'OscString',
    page: { name: 'Osc', index: 13 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
      { name: 'Pitch', color: ConnColor.Blue, horiz: 0, vert: 1 },
      { name: 'PitchVar', color: ConnColor.Blue, horiz: 0, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'FreqCoarse', type: 'FreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'FreqFine', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'PitchMod', type: 'Level_100', labels: [] },
      { name: 'FreqMode', type: 'FreqMode_3', labels: [] },
      { name: 'Decay', type: 'Level_100', labels: [] },
      { name: 'Moisture', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 15,
    height: 4,
    longName: 'Switch 8-1',
    shortName: 'Sw8-1',
    page: { name: 'Switch', index: 5 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 6, vert: 0 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 7, vert: 1 },
      { name: 'In3', color: ConnColor.BlueRed, horiz: 9, vert: 0 },
      { name: 'In4', color: ConnColor.BlueRed, horiz: 11, vert: 1 },
      { name: 'In5', color: ConnColor.BlueRed, horiz: 13, vert: 0 },
      { name: 'In6', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'In7', color: ConnColor.BlueRed, horiz: 15, vert: 0 },
      { name: 'In8', color: ConnColor.BlueRed, horiz: 18, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 3 },
      { name: 'Control', color: ConnColor.Blue, horiz: 9, vert: 3 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 17,
    height: 2,
    longName: 'Value Switch 1-2',
    shortName: 'ValSw1-2',
    page: { name: 'Switch', index: 11 },
    inputs: [
      { name: 'Input', color: ConnColor.BlueRed, horiz: 14, vert: 2 },
      { name: 'Ctrl', color: ConnColor.BlueRed, horiz: 0, vert: 2 },
    ],
    outputs: [
      { name: 'OutOn', color: ConnColor.BlueRed, horiz: 16, vert: 2 },
      { name: 'OutOff', color: ConnColor.BlueRed, horiz: 19, vert: 2 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 18,
    height: 2,
    longName: 'Cross Fader',
    shortName: 'X-Fade',
    page: { name: 'Mixer', index: 13 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 14, vert: 2 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 16, vert: 2 },
      { name: 'Mod', color: ConnColor.BlueRed, horiz: 6, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'MixMod', type: 'Level_100', labels: [] },
      { name: 'Mix', type: 'Bipolar_127', labels: [] },
      { name: 'LogLin', type: 'LogLin', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 19,
    height: 2,
    longName: 'Mixer 4-1 B',
    shortName: 'Mix4-1B',
    page: { name: 'Mixer', index: 5 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 5, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 8, vert: 1 },
      { name: 'In3', color: ConnColor.BlueRed, horiz: 12, vert: 1 },
      { name: 'In4', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'Chain', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Lev1', type: 'MixLevel', labels: [] },
      { name: 'Lev2', type: 'MixLevel', labels: [] },
      { name: 'Lev3', type: 'MixLevel', labels: [] },
      { name: 'Lev4', type: 'MixLevel', labels: [] },
      { name: 'ExpLin', type: 'ExpLin_2', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 20,
    height: 4,
    longName: 'Envelop ADSR',
    shortName: 'EnvADSR',
    page: { name: 'Env', index: 0 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
      { name: 'Gate', color: ConnColor.Yellow, horiz: 0, vert: 2 },
      { name: 'AM', color: ConnColor.Blue, horiz: 0, vert: 3 },
    ],
    outputs: [
      { name: 'Env', color: ConnColor.Blue, horiz: 18, vert: 3 },
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'Shape', type: 'EnvShape_3', labels: [] },
      { name: 'Attack', type: 'EnvTime', labels: [] },
      { name: 'Decay', type: 'EnvTime', labels: [] },
      { name: 'Sustain', type: 'EnvLevel', labels: [] },
      { name: 'Release', type: 'EnvTime', labels: [] },
      { name: 'OutputType', type: 'PosNegInvBipInv', labels: [] },
      { name: 'KB', type: 'OffOn', labels: [] },
      { name: 'NR', type: 'EnvNR', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 21,
    height: 2,
    longName: 'Multiplexer 1-8',
    shortName: 'Mux1-8',
    page: { name: 'Switch', index: 14 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 6, vert: 1 },
      { name: 'Ctrl', color: ConnColor.Blue, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out1', color: ConnColor.BlueRed, horiz: 7, vert: 1 },
      { name: 'Out2', color: ConnColor.BlueRed, horiz: 9, vert: 1 },
      { name: 'Out3', color: ConnColor.BlueRed, horiz: 11, vert: 1 },
      { name: 'Out4', color: ConnColor.BlueRed, horiz: 12, vert: 1 },
      { name: 'Out5', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'Out6', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Out7', color: ConnColor.BlueRed, horiz: 18, vert: 1 },
      { name: 'Out8', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 22,
    height: 2,
    longName: 'Partial Quantizer',
    shortName: 'PartQuant',
    page: { name: 'Note', index: 2 },
    inputs: [
      { name: 'In', color: ConnColor.Blue, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Range', type: 'PartialRange', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 23,
    height: 5,
    longName: 'Envelope Modulation ADSR',
    shortName: 'ModADSR',
    page: { name: 'Env', index: 8 },
    inputs: [
      { name: 'Gate', color: ConnColor.Yellow, horiz: 0, vert: 4 },
      { name: 'AttackMod', color: ConnColor.Blue, horiz: 2, vert: 4 },
      { name: 'DecayMod', color: ConnColor.Blue, horiz: 5, vert: 4 },
      { name: 'SustainMod', color: ConnColor.Blue, horiz: 8, vert: 4 },
      { name: 'ReleaseMod', color: ConnColor.Blue, horiz: 11, vert: 4 },
      { name: 'In', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
      { name: 'AM', color: ConnColor.Blue, horiz: 0, vert: 4 },
    ],
    outputs: [
      { name: 'Env', color: ConnColor.Blue, horiz: 19, vert: 4 },
      { name: 'Out', color: ConnColor.BlueRed, horiz: 17, vert: 4 },
    ],
    params: [
      { name: 'Attack', type: 'EnvTime', labels: [] },
      { name: 'Decay', type: 'EnvTime', labels: [] },
      { name: 'Sustain', type: 'EnvLevel', labels: [] },
      { name: 'Release', type: 'EnvTime', labels: [] },
      { name: 'AttackMod', type: 'Level_100', labels: [] },
      { name: 'DecayMod', type: 'Level_100', labels: [] },
      { name: 'SustainMod', type: 'Level_100', labels: [] },
      { name: 'ReleaseMod', type: 'Level_100', labels: [] },
      { name: 'OutputType', type: 'PosNegInvBipInv', labels: [] },
      { name: 'KB', type: 'OffOn', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 24,
    height: 2,
    longName: 'LFO C',
    shortName: 'LfoC',
    page: { name: 'LFO', index: 2 },
    inputs: [
      { name: 'Rate', color: ConnColor.Blue, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Rate', type: 'LfoRate_3', labels: [] },
      { name: 'PolyMono', type: 'PolyMono', labels: [] },
      { name: 'OutputType', type: 'OutTypeLfo', labels: [] },
      { name: 'Range', type: 'LfoRange_3', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
      { name: 'Waveform', type: 'LfoWaveform_1' },
    ],
  },
  {
    id: 25,
    height: 5,
    longName: 'LFO Shape A',
    shortName: 'LfoShpA',
    page: { name: 'LFO', index: 3 },
    inputs: [
      { name: 'Rate', color: ConnColor.Blue, horiz: 1, vert: 4 },
      { name: 'RateVar', color: ConnColor.Blue, horiz: 2, vert: 4 },
      { name: 'Rst', color: ConnColor.Blue, horiz: 0, vert: 1 },
      { name: 'ShapeMod', color: ConnColor.Blue, horiz: 9, vert: 4 },
      { name: 'PhaseMod', color: ConnColor.Blue, horiz: 12, vert: 4 },
      { name: 'Dir', color: ConnColor.Blue, horiz: 1, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 4 },
      { name: 'Snc', color: ConnColor.Blue, horiz: 0, vert: 4 },
    ],
    params: [
      { name: 'Rate', type: 'LfoRate_4', labels: [] },
      { name: 'Range', type: 'LfoRange_4', labels: [] },
      { name: 'Kbt', type: 'Kbt_4', labels: [] },
      { name: 'RateMod', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Shape', type: 'LfoShpAPW', labels: [] },
      { name: 'PhaseMod', type: 'Level_100', labels: [] },
      { name: 'Phase', type: 'Phase', labels: [] },
      { name: 'ShapeMod', type: 'Level_100', labels: [] },
      { name: 'PolyMono', type: 'PolyMono', labels: [] },
      { name: 'OutputType', type: 'OutTypeLfo', labels: [] },
      { name: 'Waveform', type: 'LfoShpA__Waveform', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 26,
    height: 3,
    longName: 'LFO A',
    shortName: 'LfoA',
    page: { name: 'LFO', index: 0 },
    inputs: [
      { name: 'Rate', color: ConnColor.Blue, horiz: 0, vert: 1 },
      { name: 'RateVar', color: ConnColor.Blue, horiz: 0, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'Rate', type: 'LfoRate_3', labels: [] },
      { name: 'PolyMono', type: 'PolyMono', labels: [] },
      { name: 'Kbt', type: 'Kbt_4', labels: [] },
      { name: 'RateMod', type: 'Level_100', labels: [] },
      { name: 'Waveform', type: 'LfoA_Waveform', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'OutputType', type: 'OutTypeLfo', labels: [] },
      { name: 'Range', type: 'LfoRange_3', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 27,
    height: 3,
    longName: 'Osc Master',
    shortName: 'OscMaster',
    page: { name: 'Osc', index: 16 },
    inputs: [
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'FreqCoarse', type: 'FreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'FreqFine', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'FreqMode', type: 'FreqMode_2', labels: [] },
      { name: 'PitchMod', type: 'Level_100', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 28,
    height: 2,
    longName: 'Saturate',
    shortName: 'Saturate',
    page: { name: 'Shaper', index: 2 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Mod', color: ConnColor.BlueRed, horiz: 8, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Amount', type: 'Level_100', labels: [] },
      { name: 'AmountMod', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Curve', type: 'SaturateCurve', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 29,
    height: 2,
    longName: 'Metallic Noise Oscillator',
    shortName: 'MetNoise',
    page: { name: 'Osc', index: 10 },
    inputs: [
      { name: 'FreqMod', color: ConnColor.BlueRed, horiz: 4, vert: 1 },
      { name: 'ColorMod', color: ConnColor.BlueRed, horiz: 11, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Color', type: 'Level_100', labels: [] },
      { name: 'Freq', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'FreqMod', type: 'Level_100', labels: [] },
      { name: 'ColorMod', type: 'Level_100', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 30,
    height: 3,
    longName: 'Device',
    shortName: 'Device',
    page: { name: 'In/Out', index: 7 },
    inputs: [
    ],
    outputs: [
      { name: 'Wheel', color: ConnColor.Blue, horiz: 0, vert: 2 },
      { name: 'AftTouch', color: ConnColor.Blue, horiz: 3, vert: 2 },
      { name: 'ControlPedal', color: ConnColor.Blue, horiz: 6, vert: 2 },
      { name: 'SustainPedal', color: ConnColor.Yellow, horiz: 10, vert: 2 },
      { name: 'PitchStick', color: ConnColor.Blue, horiz: 13, vert: 2 },
      { name: 'GlobalWheel1', color: ConnColor.Blue, horiz: 16, vert: 2 },
      { name: 'GlobalWheel2', color: ConnColor.Blue, horiz: 19, vert: 2 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 31,
    height: 2,
    longName: 'Noise',
    shortName: 'Noise',
    page: { name: 'Osc', index: 9 },
    inputs: [
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Color', type: 'NoiseColor', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 32,
    height: 3,
    longName: 'Eq 2 Band',
    shortName: 'Eq2Band',
    page: { name: 'Filter', index: 12 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'LoSlope', type: 'EqdB', labels: [] },
      { name: 'HiSlope', type: 'EqdB', labels: [] },
      { name: 'Level', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'LoFreq', type: 'EqLoFreq', labels: [] },
      { name: 'HiFreq', type: 'EqHiFreq', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 33,
    height: 4,
    longName: 'Eq 3 Band',
    shortName: 'Eq3Band',
    page: { name: 'Filter', index: 13 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'LoSlope', type: 'EqdB', labels: [] },
      { name: 'MidGain', type: 'EqdB', labels: [] },
      { name: 'MidFreq', type: 'EqMidFreq', labels: [] },
      { name: 'HiSlope', type: 'EqdB', labels: [] },
      { name: 'Level', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'LoFreq', type: 'EqLoFreq', labels: [] },
      { name: 'HiFreq', type: 'EqHiFreq', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 34,
    height: 2,
    longName: 'Shape Exp',
    shortName: 'ShpExp',
    page: { name: 'Shaper', index: 3 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Mod', color: ConnColor.BlueRed, horiz: 8, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Amount', type: 'Level_100', labels: [] },
      { name: 'AmountMod', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Curve', type: 'ShpExpCurve', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 36,
    height: 2,
    longName: 'Switch On/Off Momentary',
    shortName: 'SwOnOffM',
    page: { name: 'Switch', index: 0 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
      { name: 'Ctrl', color: ConnColor.Blue, horiz: 0, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 38,
    height: 2,
    longName: 'Pulse',
    shortName: 'Pulse',
    page: { name: 'Logic', index: 4 },
    inputs: [
      { name: 'In', color: ConnColor.YellowOrange, horiz: 15, vert: 0 },
      { name: 'Time', color: ConnColor.BlueRed, horiz: 4, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Time', type: 'LogicTime', labels: [] },
      { name: 'TimeMod', type: 'Level_100', labels: [] },
      { name: 'Range', type: 'LogicRange', labels: [] },
    ],
    modes: [
      { name: 'Mode', type: 'PulseMode' },
    ],
  },
  {
    id: 40,
    height: 4,
    longName: 'Mixer 8-1 B',
    shortName: 'Mix8-1B',
    page: { name: 'Mixer', index: 9 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 3, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 5, vert: 1 },
      { name: 'In3', color: ConnColor.BlueRed, horiz: 7, vert: 1 },
      { name: 'In4', color: ConnColor.BlueRed, horiz: 9, vert: 1 },
      { name: 'In5', color: ConnColor.BlueRed, horiz: 11, vert: 1 },
      { name: 'In6', color: ConnColor.BlueRed, horiz: 13, vert: 1 },
      { name: 'In7', color: ConnColor.BlueRed, horiz: 15, vert: 1 },
      { name: 'In8', color: ConnColor.BlueRed, horiz: 17, vert: 1 },
      { name: 'Chain', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'Lev1', type: 'MixLevel', labels: [] },
      { name: 'Lev2', type: 'MixLevel', labels: [] },
      { name: 'Lev3', type: 'MixLevel', labels: [] },
      { name: 'Lev4', type: 'MixLevel', labels: [] },
      { name: 'Lev5', type: 'MixLevel', labels: [] },
      { name: 'Lev6', type: 'MixLevel', labels: [] },
      { name: 'Lev7', type: 'MixLevel', labels: [] },
      { name: 'Lev8', type: 'MixLevel', labels: [] },
      { name: 'ExpLin', type: 'ExpLin_2', labels: [] },
      { name: 'Pad', type: 'Pad_3', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 41,
    height: 2,
    longName: 'Envelope Hold',
    shortName: 'EnvH',
    page: { name: 'Env', index: 1 },
    inputs: [
      { name: 'Trig', color: ConnColor.Yellow, horiz: 0, vert: 1 },
      { name: 'AM', color: ConnColor.Blue, horiz: 3, vert: 1 },
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Env', color: ConnColor.Blue, horiz: 15, vert: 1 },
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Hold', type: 'EnvTime', labels: [] },
      { name: 'OutputType', type: 'PosNegInv', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 42,
    height: 2,
    longName: 'Logic Delay',
    shortName: 'Delay',
    page: { name: 'Logic', index: 5 },
    inputs: [
      { name: 'In', color: ConnColor.YellowOrange, horiz: 15, vert: 0 },
      { name: 'TimeMod', color: ConnColor.BlueRed, horiz: 4, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Time', type: 'LogicTime', labels: [] },
      { name: 'TimeMod', type: 'Level_100', labels: [] },
      { name: 'Range', type: 'LogicRange', labels: [] },
    ],
    modes: [
      { name: 'Mode', type: 'LogicDelayMode' },
    ],
  },
  {
    id: 43,
    height: 2,
    longName: 'Constant Value',
    shortName: 'Constant',
    page: { name: 'Level', index: 0 },
    inputs: [
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Level', type: 'LevBipUni', labels: [] },
      { name: 'BipUni', type: 'BipUni', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 44,
    height: 2,
    longName: 'Level Multiplier',
    shortName: 'LevMult',
    page: { name: 'Level', index: 6 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Mod', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 45,
    height: 4,
    longName: 'Filter Voice',
    shortName: 'FltVoice',
    page: { name: 'Filter', index: 9 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
      { name: 'VowelMod', color: ConnColor.Blue, horiz: 9, vert: 3 },
      { name: 'FreqMod', color: ConnColor.Red, horiz: 0, vert: 3 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'Vowel1', type: 'Vowel', labels: [] },
      { name: 'Vowel2', type: 'Vowel', labels: [] },
      { name: 'Vowel3', type: 'Vowel', labels: [] },
      { name: 'Level', type: 'Level_100', labels: [] },
      { name: 'Vowel', type: 'Level_100', labels: [] },
      { name: 'VowelMod', type: 'Bipolar_127', labels: [] },
      { name: 'Freq', type: 'Level_100', labels: [] },
      { name: 'FreqMod', type: 'Bipolar_127', labels: [] },
      { name: 'Res', type: 'Bipolar_127', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 46,
    height: 4,
    longName: 'Envelope AHD',
    shortName: 'EnvAHD',
    page: { name: 'Env', index: 4 },
    inputs: [
      { name: 'Trig', color: ConnColor.Yellow, horiz: 0, vert: 2 },
      { name: 'AM', color: ConnColor.Blue, horiz: 0, vert: 3 },
      { name: 'In', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Env', color: ConnColor.Blue, horiz: 18, vert: 0 },
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
    ],
    params: [
      { name: 'Shape', type: 'EnvShape_3', labels: [] },
      { name: 'Attack', type: 'EnvTime', labels: [] },
      { name: 'Hold', type: 'EnvTime', labels: [] },
      { name: 'NR', type: 'EnvNR', labels: [] },
      { name: 'Decay', type: 'EnvTime', labels: [] },
      { name: 'OutputType', type: 'PosNegInv', labels: [] },
      { name: 'KB', type: 'OffOn', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 47,
    height: 2,
    longName: 'Pan',
    shortName: 'Pan',
    page: { name: 'Mixer', index: 12 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'Mod', color: ConnColor.BlueRed, horiz: 6, vert: 1 },
    ],
    outputs: [
      { name: 'OutL', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'OutR', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'PanMod', type: 'Level_100', labels: [] },
      { name: 'Pan', type: 'Bipolar_127', labels: [] },
      { name: 'LogLin', type: 'LogLin', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 48,
    height: 5,
    longName: 'Mixer Stereo',
    shortName: 'MixStereo',
    page: { name: 'Mixer', index: 11 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 0, vert: 2 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 2, vert: 2 },
      { name: 'In3', color: ConnColor.BlueRed, horiz: 5, vert: 2 },
      { name: 'In4', color: ConnColor.BlueRed, horiz: 8, vert: 2 },
      { name: 'In5', color: ConnColor.BlueRed, horiz: 10, vert: 2 },
      { name: 'In6', color: ConnColor.BlueRed, horiz: 13, vert: 2 },
    ],
    outputs: [
      { name: 'OutL', color: ConnColor.BlueRed, horiz: 17, vert: 4 },
      { name: 'OutR', color: ConnColor.BlueRed, horiz: 19, vert: 4 },
    ],
    params: [
      { name: 'Lev1', type: 'Level_100', labels: [] },
      { name: 'Lev2', type: 'Level_100', labels: [] },
      { name: 'Lev3', type: 'Level_100', labels: [] },
      { name: 'Lev4', type: 'Level_100', labels: [] },
      { name: 'Lev5', type: 'Level_100', labels: [] },
      { name: 'Lev6', type: 'Level_100', labels: [] },
      { name: 'Pan1', type: 'Bipolar_127', labels: [] },
      { name: 'Pan2', type: 'Bipolar_127', labels: [] },
      { name: 'Pan3', type: 'Bipolar_127', labels: [] },
      { name: 'Pan4', type: 'Bipolar_127', labels: [] },
      { name: 'Pan5', type: 'Bipolar_127', labels: [] },
      { name: 'Pan6', type: 'Bipolar_127', labels: [] },
      { name: 'LevMaster', type: 'Level_100', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 49,
    height: 4,
    longName: 'Filter Multi-mode',
    shortName: 'FltMulti',
    page: { name: 'Filter', index: 4 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 2 },
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 3 },
    ],
    outputs: [
      { name: 'LP', color: ConnColor.Red, horiz: 19, vert: 1 },
      { name: 'BP', color: ConnColor.Red, horiz: 19, vert: 2 },
      { name: 'HP', color: ConnColor.Red, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'Freq', type: 'FltFreq', labels: [] },
      { name: 'PitchMod', type: 'Level_200', labels: [] },
      { name: 'Kbt', type: 'Kbt_4', labels: [] },
      { name: 'GC', type: 'GcOffOn', labels: [] },
      { name: 'Res', type: 'Res_1', labels: [] },
      { name: 'Slope', type: 'FltSlope_1', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 50,
    height: 2,
    longName: 'Constant Switch Toggling',
    shortName: 'ConstSwT',
    page: { name: 'Level', index: 2 },
    inputs: [
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Lev', type: 'LevBipUni', labels: [] },
      { name: 'BipUni', type: 'BipUni', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 51,
    height: 5,
    longName: 'Filter Nord',
    shortName: 'FltNord',
    page: { name: 'Filter', index: 2 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 4 },
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 3 },
      { name: 'FMLin', color: ConnColor.BlueRed, horiz: 3, vert: 4 },
      { name: 'Res', color: ConnColor.BlueRed, horiz: 9, vert: 4 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 4 },
    ],
    params: [
      { name: 'Freq', type: 'FltFreq', labels: [] },
      { name: 'PitchMod', type: 'Level_200', labels: [] },
      { name: 'Kbt', type: 'Kbt_4', labels: [] },
      { name: 'GC', type: 'GcOffOn', labels: [] },
      { name: 'Res', type: 'Res_1', labels: [] },
      { name: 'Slope', type: 'FltSlope_2', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'FM_Lin', type: 'Level_100', labels: [] },
      { name: 'FilterType', type: 'LpBpHpBr', labels: [] },
      { name: 'ResMod', type: 'Level_100', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 52,
    height: 6,
    longName: 'Envelope Multi',
    shortName: 'EnvMulti',
    page: { name: 'Env', index: 6 },
    inputs: [
      { name: 'Gate', color: ConnColor.Yellow, horiz: 0, vert: 2 },
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 0 },
      { name: 'AM', color: ConnColor.Blue, horiz: 2, vert: 2 },
    ],
    outputs: [
      { name: 'Env', color: ConnColor.Blue, horiz: 19, vert: 1 },
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
    ],
    params: [
      { name: 'Level1', type: 'EnvLevel', labels: [] },
      { name: 'Level2', type: 'EnvLevel', labels: [] },
      { name: 'Level3', type: 'EnvLevel', labels: [] },
      { name: 'Level4', type: 'EnvLevel', labels: [] },
      { name: 'Time1', type: 'EnvTime', labels: [] },
      { name: 'Time2', type: 'EnvTime', labels: [] },
      { name: 'Time3', type: 'EnvTime', labels: [] },
      { name: 'Time4', type: 'EnvTime', labels: [] },
      { name: 'NR', type: 'EnvNR', labels: [] },
      { name: 'SustainMode', type: 'SustainMode_2', labels: [] },
      { name: 'OutputType', type: 'PosNegInvBip', labels: [] },
      { name: 'KB', type: 'OffOn', labels: [] },
      { name: 'Shape', type: 'EnvShape_3', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 53,
    height: 2,
    longName: 'Sample & Hold',
    shortName: 'S&H',
    page: { name: 'Switch', index: 16 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 15, vert: 1 },
      { name: 'Ctrl', color: ConnColor.YellowOrange, horiz: 12, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 54,
    height: 3,
    longName: 'Filter Static',
    shortName: 'FltStatic',
    page: { name: 'Filter', index: 5 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'Freq', type: 'FltFreq', labels: [] },
      { name: 'Res', type: 'Res_1', labels: [] },
      { name: 'FilterType', type: 'LpBpHp', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'GC', type: 'GcOffOn', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 55,
    height: 2,
    longName: 'Envelope Decay',
    shortName: 'EnvD',
    page: { name: 'Env', index: 2 },
    inputs: [
      { name: 'Trig', color: ConnColor.Yellow, horiz: 0, vert: 1 },
      { name: 'AM', color: ConnColor.Blue, horiz: 3, vert: 1 },
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Env', color: ConnColor.Blue, horiz: 15, vert: 1 },
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Decay', type: 'EnvTime', labels: [] },
      { name: 'OutputType', type: 'PosNegInv', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 57,
    height: 2,
    longName: 'MIDI Control Automate',
    shortName: 'Automate',
    page: { name: 'MIDI', index: 6 },
    inputs: [
      { name: 'In', color: ConnColor.Yellow, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Yellow, horiz: 4, vert: 1 },
    ],
    params: [
      { name: 'Ctrl', type: 'MidiData', labels: [] },
      { name: 'Val', type: 'MidiData', labels: [] },
      { name: 'Ch', type: 'MidiCh_20', labels: [] },
      { name: 'Echo', type: 'OffOn', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 58,
    height: 8,
    longName: 'Drum Synthesizer',
    shortName: 'DrumSynth',
    page: { name: 'Osc', index: 12 },
    inputs: [
      { name: 'Trig', color: ConnColor.Yellow, horiz: 0, vert: 2 },
      { name: 'Vel', color: ConnColor.Blue, horiz: 0, vert: 7 },
      { name: 'Pitch', color: ConnColor.Blue, horiz: 0, vert: 4 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 8 },
    ],
    params: [
      { name: 'Masterfreq', type: 'DrumSynthFreq', labels: [] },
      { name: 'SlaveRatio', type: 'DrumSynthRatio', labels: [] },
      { name: 'MasterDecay', type: 'EnvTime', labels: [] },
      { name: 'SlaveDecay', type: 'EnvTime', labels: [] },
      { name: 'MasterLevel', type: 'Level_100', labels: [] },
      { name: 'SlaveLevel', type: 'Level_100', labels: [] },
      { name: 'NoiseFltFreq', type: 'DrumSynthNoiseFlt', labels: [] },
      { name: 'NoiseFltRes', type: 'Level_100', labels: [] },
      { name: 'NoiseFltSweep', type: 'Level_100', labels: [] },
      { name: 'NoiseFltDecay', type: 'EnvTime', labels: [] },
      { name: 'NoiseFltMode', type: 'LpBpHp', labels: [] },
      { name: 'BendAmount', type: 'Level_100', labels: [] },
      { name: 'BendDecay', type: 'EnvTime', labels: [] },
      { name: 'Click', type: 'Level_100', labels: [] },
      { name: 'Noise', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 59,
    height: 2,
    longName: 'Compare to Level',
    shortName: 'CompLev',
    page: { name: 'Level', index: 10 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 9, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'C', type: 'Bipolar_127', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 60,
    height: 3,
    longName: 'Multiplexer 8-1 with variable X-Fade',
    shortName: 'Mux8-1X',
    page: { name: 'Switch', index: 15 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 5, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 7, vert: 1 },
      { name: 'In3', color: ConnColor.BlueRed, horiz: 9, vert: 1 },
      { name: 'In4', color: ConnColor.BlueRed, horiz: 10, vert: 1 },
      { name: 'In5', color: ConnColor.BlueRed, horiz: 12, vert: 1 },
      { name: 'In6', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'In7', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'In8', color: ConnColor.BlueRed, horiz: 17, vert: 1 },
      { name: 'Ctrl', color: ConnColor.Blue, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'XFade', type: 'Level_100', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 61,
    height: 2,
    longName: 'Clip',
    shortName: 'Clip',
    page: { name: 'Shaper', index: 0 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Mod', color: ConnColor.BlueRed, horiz: 5, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'ClipLevMod', type: 'Level_100', labels: [] },
      { name: 'ClipLev', type: 'Level_100', labels: [] },
      { name: 'Shape', type: 'ClipShape', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 62,
    height: 2,
    longName: 'Overdrive',
    shortName: 'Overdrive',
    page: { name: 'Shaper', index: 1 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Mod', color: ConnColor.BlueRed, horiz: 8, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'AmountMod', type: 'Level_100', labels: [] },
      { name: 'Amount', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Type', type: 'OverdriveType', labels: [] },
      { name: 'Shape', type: 'ClipShape', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 63,
    height: 3,
    longName: 'Scratch',
    shortName: 'Scratch',
    page: { name: 'FX', index: 6 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
      { name: 'Mod', color: ConnColor.Blue, horiz: 0, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'Ratio', type: 'ScratchRatio', labels: [] },
      { name: 'RatioMod', type: 'Level_100', labels: [] },
      { name: 'Delay', type: 'ScratchDelay', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 64,
    height: 2,
    longName: 'Gate',
    shortName: 'Gate',
    page: { name: 'Logic', index: 0 },
    inputs: [
      { name: 'In1_1', color: ConnColor.YellowOrange, horiz: 6, vert: 0 },
      { name: 'In1_2', color: ConnColor.YellowOrange, horiz: 5, vert: 1 },
      { name: 'In2_1', color: ConnColor.YellowOrange, horiz: 13, vert: 0 },
      { name: 'In2_2', color: ConnColor.YellowOrange, horiz: 12, vert: 1 },
    ],
    outputs: [
      { name: 'Out1', color: ConnColor.YellowOrange, horiz: 11, vert: 1 },
      { name: 'Out2', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
      { name: 'GateMode1', type: 'GateMode' },
      { name: 'GateMode2', type: 'GateMode' },
    ],
  },
  {
    id: 66,
    height: 2,
    longName: 'Scratch',
    shortName: 'Mix2-1B',
    page: { name: 'Mixer', index: 3 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 5, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 12, vert: 1 },
      { name: 'Chain', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Inv1', type: 'MixInvert', labels: [] },
      { name: 'Lev1', type: 'MixLevel', labels: [] },
      { name: 'Inv2', type: 'MixInvert', labels: [] },
      { name: 'Lev2', type: 'MixLevel', labels: [] },
      { name: 'ExpLin', type: 'ExpLin_2', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 68,
    height: 4,
    longName: 'Clock Generator',
    shortName: 'ClkGen',
    page: { name: 'LFO', index: 4 },
    inputs: [
      { name: 'Rst', color: ConnColor.Yellow, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: '1/96', color: ConnColor.Yellow, horiz: 19, vert: 1 },
      { name: '1/16', color: ConnColor.Yellow, horiz: 19, vert: 2 },
      { name: 'ClkActive', color: ConnColor.Yellow, horiz: 19, vert: 0 },
      { name: 'Sync', color: ConnColor.Yellow, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'Rate', type: 'RateBpm', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Source', type: 'InternalMaster', labels: [] },
      { name: 'BeatSync', type: 'ClkGenBeatSync', labels: [] },
      { name: 'Swing', type: 'ClkGenSwing', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 69,
    height: 2,
    longName: 'Clock Divider',
    shortName: 'ClkDiv',
    page: { name: 'Logic', index: 3 },
    inputs: [
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 8, vert: 1 },
      { name: 'Rst', color: ConnColor.YellowOrange, horiz: 5, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Divider', type: 'Range_128', labels: [] },
    ],
    modes: [
      { name: 'DivMode', type: 'ClkDivMode' },
    ],
  },
  {
    id: 71,
    height: 2,
    longName: 'Envelope Follower',
    shortName: 'EnvFollow',
    page: { name: 'Level', index: 8 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Attack', type: 'EnvFollowAttack', labels: [] },
      { name: 'Release', type: 'EnvFollowRelease', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 72,
    height: 2,
    longName: 'Note Scaler',
    shortName: 'NoteScaler',
    page: { name: 'Note', index: 3 },
    inputs: [
      { name: 'In', color: ConnColor.Blue, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Range', type: 'NoteRange', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 74,
    height: 2,
    longName: 'Wave Wrapper',
    shortName: 'WaveWrap',
    page: { name: 'Shaper', index: 4 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Mod', color: ConnColor.BlueRed, horiz: 8, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'AmountMod', type: 'Level_100', labels: [] },
      { name: 'Amount', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 75,
    height: 2,
    longName: 'Note Quantizer',
    shortName: 'NoteQuant',
    page: { name: 'Note', index: 0 },
    inputs: [
      { name: 'In', color: ConnColor.Blue, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Range', type: 'NoteRange', labels: [] },
      { name: 'Notes', type: 'NoteQuantNotes', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 76,
    height: 2,
    longName: 'Switch On/Off Toggle',
    shortName: 'SwOnOffT',
    page: { name: 'Switch', index: 1 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
      { name: 'Ctrl', color: ConnColor.Blue, horiz: 0, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 78,
    height: 4,
    longName: 'Switch 1-8',
    shortName: 'Sw1-8',
    page: { name: 'Switch', index: 9 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 3, vert: 3 },
    ],
    outputs: [
      { name: 'Out1', color: ConnColor.BlueRed, horiz: 6, vert: 2 },
      { name: 'Out2', color: ConnColor.BlueRed, horiz: 8, vert: 3 },
      { name: 'Out3', color: ConnColor.BlueRed, horiz: 10, vert: 2 },
      { name: 'Out4', color: ConnColor.BlueRed, horiz: 12, vert: 3 },
      { name: 'Out5', color: ConnColor.BlueRed, horiz: 13, vert: 2 },
      { name: 'Out6', color: ConnColor.BlueRed, horiz: 15, vert: 3 },
      { name: 'Out7', color: ConnColor.BlueRed, horiz: 17, vert: 2 },
      { name: 'Out8', color: ConnColor.BlueRed, horiz: 19, vert: 3 },
      { name: 'Ctrl', color: ConnColor.Blue, horiz: 0, vert: 3 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 79,
    height: 3,
    longName: 'Switch 4-1',
    shortName: 'Sw4-1',
    page: { name: 'Switch', index: 4 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 6, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 9, vert: 1 },
      { name: 'In3', color: ConnColor.BlueRed, horiz: 13, vert: 1 },
      { name: 'In4', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 2 },
      { name: 'Ctrl', color: ConnColor.Blue, horiz: 0, vert: 2 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 81,
    height: 2,
    longName: 'Level Amplifier',
    shortName: 'LevAmp',
    page: { name: 'Level', index: 5 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Gain', type: 'LevAmpGain', labels: [] },
      { name: 'Type', type: 'LinDB', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 82,
    height: 2,
    longName: 'Rectifier',
    shortName: 'Rect',
    page: { name: 'Shaper', index: 6 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Mode', type: 'RectMode', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 83,
    height: 2,
    longName: 'Shape Static',
    shortName: 'ShpStatic',
    page: { name: 'Shaper', index: 5 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Mode', type: 'ShpStaticMode', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 84,
    height: 3,
    longName: 'Envelope ADR',
    shortName: 'EnvADR',
    page: { name: 'Env', index: 3 },
    inputs: [
      { name: 'Gate', color: ConnColor.Yellow, horiz: 0, vert: 2 },
      { name: 'In', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
      { name: 'AM', color: ConnColor.Blue, horiz: 3, vert: 2 },
    ],
    outputs: [
      { name: 'Env', color: ConnColor.Blue, horiz: 17, vert: 2 },
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 2 },
      { name: 'End', color: ConnColor.Yellow, horiz: 16, vert: 2 },
    ],
    params: [
      { name: 'Shape', type: 'EnvShape_3', labels: [] },
      { name: 'Attack', type: 'EnvTime', labels: [] },
      { name: 'NR', type: 'EnvNR', labels: [] },
      { name: 'Release', type: 'EnvTime', labels: [] },
      { name: 'TG', type: 'TrigGate', labels: [] },
      { name: 'OutputType', type: 'PosNegInv', labels: [] },
      { name: 'KB', type: 'OffOn', labels: [] },
      { name: 'DcyRel', type: 'AdAr', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 85,
    height: 2,
    longName: 'Window Switch',
    shortName: 'WindSw',
    page: { name: 'Switch', index: 12 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Ctrl', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
      { name: 'Gate', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
    ],
    params: [
      { name: 'ValFrom', type: 'Range_64', labels: [] },
      { name: 'ValTo', type: 'Range_64', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 86,
    height: 2,
    longName: '8 Counter',
    shortName: '8Counter',
    page: { name: 'Logic', index: 6 },
    inputs: [
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
      { name: 'Rst', color: ConnColor.YellowOrange, horiz: 3, vert: 1 },
    ],
    outputs: [
      { name: 'Out1', color: ConnColor.YellowOrange, horiz: 5, vert: 1 },
      { name: 'Out2', color: ConnColor.YellowOrange, horiz: 7, vert: 1 },
      { name: 'Out3', color: ConnColor.YellowOrange, horiz: 9, vert: 1 },
      { name: 'Out4', color: ConnColor.YellowOrange, horiz: 11, vert: 1 },
      { name: 'Out5', color: ConnColor.YellowOrange, horiz: 13, vert: 1 },
      { name: 'Out6', color: ConnColor.YellowOrange, horiz: 15, vert: 1 },
      { name: 'Out7', color: ConnColor.YellowOrange, horiz: 17, vert: 1 },
      { name: 'Out8', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 87,
    height: 2,
    longName: 'Filter Lowpass',
    shortName: 'FltLP',
    page: { name: 'Filter', index: 0 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 16, vert: 1 },
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 4, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Freq', type: 'FltFreq', labels: [] },
      { name: 'FreqMod', type: 'Level_100', labels: [] },
      { name: 'Kbt', type: 'Kbt_4', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
      { name: 'SlopeMode', type: 'HpLpSlopeMode' },
    ],
  },
  {
    id: 88,
    height: 3,
    longName: 'Switch 1-4',
    shortName: 'Sw1-4',
    page: { name: 'Switch', index: 8 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 3, vert: 2 },
    ],
    outputs: [
      { name: 'Out1', color: ConnColor.BlueRed, horiz: 6, vert: 2 },
      { name: 'Out2', color: ConnColor.BlueRed, horiz: 10, vert: 2 },
      { name: 'Out3', color: ConnColor.BlueRed, horiz: 13, vert: 2 },
      { name: 'Out4', color: ConnColor.BlueRed, horiz: 17, vert: 2 },
      { name: 'Ctrl', color: ConnColor.Blue, horiz: 0, vert: 2 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 89,
    height: 3,
    longName: 'Flanger',
    shortName: 'Flanger',
    page: { name: 'FX', index: 2 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'Rate', type: 'FlangerRate', labels: [] },
      { name: 'Range', type: 'Level_100', labels: [] },
      { name: 'FeedBack', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 90,
    height: 2,
    longName: 'Switch 1-2',
    shortName: 'Sw1-2',
    page: { name: 'Switch', index: 7 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
    ],
    outputs: [
      { name: 'Out2', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Out1', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
      { name: 'Ctrl', color: ConnColor.Blue, horiz: 0, vert: 1 },
    ],
    params: [
      { name: 'Sel', type: 'Sw_1', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 91,
    height: 2,
    longName: 'Flip Flop',
    shortName: 'FlipFlop',
    page: { name: 'Logic', index: 2 },
    inputs: [
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 8, vert: 1 },
      { name: 'In', color: ConnColor.YellowOrange, horiz: 11, vert: 0 },
      { name: 'Rst', color: ConnColor.YellowOrange, horiz: 5, vert: 1 },
    ],
    outputs: [
      { name: 'NotQ', color: ConnColor.YellowOrange, horiz: 17, vert: 1 },
      { name: 'Q', color: ConnColor.YellowOrange, horiz: 19, vert: 0 },
    ],
    params: [
    ],
    modes: [
      { name: 'OperationMode', type: 'FlipFlopMode' },
    ],
  },
  {
    id: 92,
    height: 4,
    longName: 'Filter Classic',
    shortName: 'FltClassic',
    page: { name: 'Filter', index: 3 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 3 },
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'Freq', type: 'FltFreq', labels: [] },
      { name: 'PitchMod', type: 'Level_200', labels: [] },
      { name: 'Kbt', type: 'Kbt_4', labels: [] },
      { name: 'Res', type: 'Level_100', labels: [] },
      { name: 'Slope', type: 'ClassicSlope', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 94,
    height: 3,
    longName: 'Stereo Chorus',
    shortName: 'StChorus',
    page: { name: 'FX', index: 0 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 18, vert: 1 },
    ],
    outputs: [
      { name: 'OutL', color: ConnColor.Red, horiz: 17, vert: 2 },
      { name: 'OutR', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'Detune', type: 'Level_100', labels: [] },
      { name: 'Amount', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 96,
    height: 2,
    longName: 'Osc D',
    shortName: 'OscD',
    page: { name: 'Osc', index: 3 },
    inputs: [
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'FreqCoarse', type: 'FreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'FreqFine', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'FreqMode', type: 'FreqMode_3', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
      { name: 'Waveform', type: 'OscWaveform_2' },
    ],
  },
  {
    id: 97,
    height: 3,
    longName: 'Osc A',
    shortName: 'OscA',
    page: { name: 'Osc', index: 0 },
    inputs: [
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'FreqCoarse', type: 'FreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'FreqFine', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'PitchMod', type: 'Level_100', labels: [] },
      { name: 'Waveform', type: 'OscA_Waveform', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'FreqMode', type: 'FreqMode_3', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 98,
    height: 3,
    longName: 'Frequency Shifter',
    shortName: 'FreqShift',
    page: { name: 'FX', index: 4 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 18, vert: 0 },
      { name: 'Shift', color: ConnColor.Blue, horiz: 1, vert: 2 },
    ],
    outputs: [
      { name: 'Dn', color: ConnColor.Red, horiz: 17, vert: 1 },
      { name: 'Up', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'FreqShift', type: 'FreqShiftFreq', labels: [] },
      { name: 'ShiftMod', type: 'Level_100', labels: [] },
      { name: 'Range', type: 'FreqShiftRange', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 100,
    height: 2,
    longName: 'Switch 2-1',
    shortName: 'Sw2-1',
    page: { name: 'Switch', index: 3 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 14, vert: 0 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 16, vert: 0 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
      { name: 'Ctrl', color: ConnColor.Blue, horiz: 0, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 102,
    height: 5,
    longName: 'Filter Phase',
    shortName: 'FltPhase',
    page: { name: 'Filter', index: 6 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 4 },
      { name: 'Spr', color: ConnColor.Blue, horiz: 6, vert: 4 },
      { name: 'FB', color: ConnColor.Blue, horiz: 9, vert: 4 },
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 3 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 4 },
    ],
    params: [
      { name: 'PitchMod', type: 'Level_100', labels: [] },
      { name: 'Freq', type: 'Freq_2', labels: [] },
      { name: 'SpreadMod', type: 'Level_100', labels: [] },
      { name: 'FB', type: 'Bipolar_127', labels: [] },
      { name: 'NotchCount', type: 'FltPhaseNotchCount', labels: [] },
      { name: 'Spread', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Level', type: 'Level_100', labels: [] },
      { name: 'FBMod', type: 'Level_100', labels: [] },
      { name: 'Type', type: 'FltPhaseType', labels: [] },
      { name: 'Kbt', type: 'Kbt_4', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 103,
    height: 4,
    longName: 'Eq Peak',
    shortName: 'EqPeak',
    page: { name: 'Filter', index: 11 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'Freq', type: 'Freq_3', labels: [] },
      { name: 'Gain', type: 'EqdB', labels: [] },
      { name: 'Bandwidth', type: 'EqPeakBandwidth', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Level', type: 'Level_100', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 105,
    height: 2,
    longName: 'Value Switch 2-1',
    shortName: 'ValSw2-1',
    page: { name: 'Switch', index: 10 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Ctrl', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Val', type: 'ValSwVal', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 106,
    height: 3,
    longName: 'Oscillator Noise',
    shortName: 'OscNoise',
    page: { name: 'Osc', index: 8 },
    inputs: [
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 2 },
      { name: 'Width', color: ConnColor.BlueRed, horiz: 12, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'FreqCoarse', type: 'FreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'FreqFine', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'PitchMod', type: 'Level_100', labels: [] },
      { name: 'FreqMode', type: 'FreqMode_3', labels: [] },
      { name: 'Width', type: 'Level_100', labels: [] },
      { name: 'WidthMod', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 108,
    height: 8,
    longName: 'Vocoder',
    shortName: 'Vocoder',
    page: { name: 'Filter', index: 10 },
    inputs: [
      { name: 'Ctrl', color: ConnColor.Red, horiz: 0, vert: 2 },
      { name: 'In', color: ConnColor.Red, horiz: 16, vert: 7 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 7 },
    ],
    params: [
      { name: 'Band1', type: 'VocoderBand', labels: [] },
      { name: 'Band2', type: 'VocoderBand', labels: [] },
      { name: 'Band3', type: 'VocoderBand', labels: [] },
      { name: 'Band4', type: 'VocoderBand', labels: [] },
      { name: 'Band5', type: 'VocoderBand', labels: [] },
      { name: 'Band6', type: 'VocoderBand', labels: [] },
      { name: 'Band7', type: 'VocoderBand', labels: [] },
      { name: 'Band8', type: 'VocoderBand', labels: [] },
      { name: 'Band9', type: 'VocoderBand', labels: [] },
      { name: 'Band10', type: 'VocoderBand', labels: [] },
      { name: 'Band11', type: 'VocoderBand', labels: [] },
      { name: 'Band12', type: 'VocoderBand', labels: [] },
      { name: 'Band13', type: 'VocoderBand', labels: [] },
      { name: 'Band14', type: 'VocoderBand', labels: [] },
      { name: 'Band15', type: 'VocoderBand', labels: [] },
      { name: 'Band16', type: 'VocoderBand', labels: [] },
      { name: 'Emphasis', type: 'OffOn', labels: [] },
      { name: 'Monitor', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 112,
    height: 2,
    longName: 'Level Add',
    shortName: 'LevAdd',
    page: { name: 'Level', index: 3 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Level', type: 'LevBipUni', labels: [] },
      { name: 'BipUni', type: 'BipUni', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 113,
    height: 2,
    longName: 'Fade 1-2',
    shortName: 'Fade1-2',
    page: { name: 'Mixer', index: 14 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'Mod', color: ConnColor.BlueRed, horiz: 6, vert: 1 },
    ],
    outputs: [
      { name: 'Out1', color: ConnColor.BlueRed, horiz: 17, vert: 1 },
      { name: 'Out2', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Mix', type: 'Fade12Mix', labels: [] },
      { name: 'MixMod', type: 'Level_100', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 114,
    height: 2,
    longName: 'Fade 2-1',
    shortName: 'Fade2-1',
    page: { name: 'Mixer', index: 15 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Mod', color: ConnColor.BlueRed, horiz: 6, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Mix', type: 'Fade21Mix', labels: [] },
      { name: 'MixMod', type: 'Level_100', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 115,
    height: 3,
    longName: 'Level Scaler',
    shortName: 'LevScaler',
    page: { name: 'Note', index: 7 },
    inputs: [
      { name: 'Note', color: ConnColor.Blue, horiz: 0, vert: 2 },
      { name: 'In', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Level', color: ConnColor.Blue, horiz: 16, vert: 2 },
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'L', type: 'LevScaledB', labels: [] },
      { name: 'BP', type: 'FreqCoarse', labels: [] },
      { name: 'R', type: 'LevScaledB', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 116,
    height: 2,
    longName: 'Mix 8-1 A',
    shortName: 'Mix8-1A',
    page: { name: 'Mixer', index: 8 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 5, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 7, vert: 1 },
      { name: 'In3', color: ConnColor.BlueRed, horiz: 8, vert: 1 },
      { name: 'In4', color: ConnColor.BlueRed, horiz: 10, vert: 1 },
      { name: 'In5', color: ConnColor.BlueRed, horiz: 12, vert: 1 },
      { name: 'In6', color: ConnColor.BlueRed, horiz: 13, vert: 1 },
      { name: 'In7', color: ConnColor.BlueRed, horiz: 15, vert: 1 },
      { name: 'In8', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Pad', type: 'Pad_3', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 117,
    height: 3,
    longName: 'Level Modulator',
    shortName: 'LevMod',
    page: { name: 'Level', index: 7 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 2 },
      { name: 'Mod', color: ConnColor.BlueRed, horiz: 16, vert: 0 },
      { name: 'ModDepth', color: ConnColor.BlueRed, horiz: 6, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'ModDepth', type: 'Level_100', labels: [] },
      { name: 'ModType', type: 'LevModAmRm', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 118,
    height: 3,
    longName: 'Digitizer',
    shortName: 'Digitizer',
    page: { name: 'FX', index: 3 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
      { name: 'Rate', color: ConnColor.BlueRed, horiz: 19, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 1, vert: 2 },
    ],
    params: [
      { name: 'Bits', type: 'DigitizerBits', labels: [] },
      { name: 'Rate', type: 'DigitizerRate', labels: [] },
      { name: 'RateMod', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 119,
    height: 5,
    longName: 'Envelope ADDSR',
    shortName: 'EnvADDSR',
    page: { name: 'Env', index: 5 },
    inputs: [
      { name: 'Gate', color: ConnColor.Yellow, horiz: 0, vert: 2 },
      { name: 'AM', color: ConnColor.Blue, horiz: 0, vert: 3 },
      { name: 'In', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Env', color: ConnColor.Blue, horiz: 17, vert: 3 },
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'KB', type: 'OffOn', labels: [] },
      { name: 'Shape', type: 'EnvShape_3', labels: [] },
      { name: 'Attack', type: 'EnvTime', labels: [] },
      { name: 'Decay1', type: 'EnvTime', labels: [] },
      { name: 'Level1', type: 'EnvLevel', labels: [] },
      { name: 'Decay2', type: 'EnvTime', labels: [] },
      { name: 'Level2', type: 'EnvLevel', labels: [] },
      { name: 'Release', type: 'EnvTime', labels: [] },
      { name: 'SustainMode', type: 'SustainMode_1', labels: [] },
      { name: 'OutputType', type: 'PosNegInvBipInv', labels: [] },
      { name: 'NR', type: 'EnvNR', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 121,
    height: 9,
    longName: 'Sequencer Note',
    shortName: 'SeqNote',
    page: { name: 'Seq', index: 3 },
    inputs: [
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 0, vert: 2 },
      { name: 'Rst', color: ConnColor.YellowOrange, horiz: 0, vert: 4 },
      { name: 'Loop', color: ConnColor.YellowOrange, horiz: 0, vert: 6 },
      { name: 'Park', color: ConnColor.YellowOrange, horiz: 16, vert: 0 },
      { name: 'Note', color: ConnColor.BlueRed, horiz: 0, vert: 7 },
      { name: 'Trig', color: ConnColor.YellowOrange, horiz: 0, vert: 8 },
      { name: 'RecVal', color: ConnColor.BlueRed, horiz: 7, vert: 0 },
      { name: 'RecEnable', color: ConnColor.YellowOrange, horiz: 8, vert: 0 },
    ],
    outputs: [
      { name: 'Link', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
      { name: 'Note', color: ConnColor.BlueRed, horiz: 19, vert: 7 },
      { name: 'Trig', color: ConnColor.YellowOrange, horiz: 19, vert: 8 },
    ],
    params: [
      { name: 'Seq1Step1', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step2', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step3', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step4', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step5', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step6', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step7', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step8', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step9', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step10', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step11', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step12', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step13', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step14', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step15', type: 'FreqCoarse', labels: [] },
      { name: 'Seq1Step16', type: 'FreqCoarse', labels: [] },
      { name: 'Seq2Step1', type: 'OffOn', labels: [] },
      { name: 'Seq2Step2', type: 'OffOn', labels: [] },
      { name: 'Seq2Step3', type: 'OffOn', labels: [] },
      { name: 'Seq2Step4', type: 'OffOn', labels: [] },
      { name: 'Seq2Step5', type: 'OffOn', labels: [] },
      { name: 'Seq2Step6', type: 'OffOn', labels: [] },
      { name: 'Seq2Step7', type: 'OffOn', labels: [] },
      { name: 'Seq2Step8', type: 'OffOn', labels: [] },
      { name: 'Seq2Step9', type: 'OffOn', labels: [] },
      { name: 'Seq2Step10', type: 'OffOn', labels: [] },
      { name: 'Seq2Step11', type: 'OffOn', labels: [] },
      { name: 'Seq2Step12', type: 'OffOn', labels: [] },
      { name: 'Seq2Step13', type: 'OffOn', labels: [] },
      { name: 'Seq2Step14', type: 'OffOn', labels: [] },
      { name: 'Seq2Step15', type: 'OffOn', labels: [] },
      { name: 'Seq2Step16', type: 'OffOn', labels: [] },
      { name: 'Loop', type: 'LoopOnce', labels: [] },
      { name: 'Length', type: 'SeqLen', labels: [] },
      { name: 'TG', type: 'TrigGate', labels: [] },
      { name: 'Clr_Or_Rnd', type: 'OffOn', labels: [] },
      { name: 'Rnd_Or_Clr', type: 'OffOn', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 123,
    height: 4,
    longName: 'Mixer 4-1 C',
    shortName: 'Mix4-1C',
    page: { name: 'Mixer', index: 6 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 3, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 7, vert: 1 },
      { name: 'In3', color: ConnColor.BlueRed, horiz: 11, vert: 1 },
      { name: 'In4', color: ConnColor.BlueRed, horiz: 15, vert: 1 },
      { name: 'Chain', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'Lev1', type: 'MixLevel', labels: [] },
      { name: 'Lev2', type: 'MixLevel', labels: [] },
      { name: 'Lev3', type: 'MixLevel', labels: [] },
      { name: 'Lev4', type: 'MixLevel', labels: [] },
      { name: 'Pad', type: 'Pad_2', labels: [] },
      { name: 'ExpLin', type: 'ExpLin_2', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 124,
    height: 2,
    longName: 'Multiplexer 8-1',
    shortName: 'Mux8-1',
    page: { name: 'Switch', index: 13 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 4, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 7, vert: 1 },
      { name: 'In3', color: ConnColor.BlueRed, horiz: 9, vert: 1 },
      { name: 'In4', color: ConnColor.BlueRed, horiz: 11, vert: 1 },
      { name: 'In5', color: ConnColor.BlueRed, horiz: 12, vert: 1 },
      { name: 'In6', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'In7', color: ConnColor.BlueRed, horiz: 15, vert: 1 },
      { name: 'In8', color: ConnColor.BlueRed, horiz: 17, vert: 1 },
      { name: 'Ctrl', color: ConnColor.Blue, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 125,
    height: 2,
    longName: 'Wah-Wah',
    shortName: 'WahWah',
    page: { name: 'Filter', index: 8 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 16, vert: 1 },
      { name: 'Sweep', color: ConnColor.Blue, horiz: 7, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'SweepMod', type: 'Level_100', labels: [] },
      { name: 'Sweep', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 126,
    height: 1,
    longName: 'Name Bar',
    shortName: 'Name',
    page: { name: 'In/Out', index: 10 },
    inputs: [
    ],
    outputs: [
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 127,
    height: 2,
    longName: 'Fx Input',
    shortName: 'Fx-In',
    page: { name: 'In/Out', index: 4 },
    inputs: [
    ],
    outputs: [
      { name: 'OutL', color: ConnColor.Red, horiz: 16, vert: 1 },
      { name: 'OutR', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Source', type: 'Source_1', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Pad', type: 'Pad_4', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 128,
    height: 2,
    longName: 'Min/Max Compare',
    shortName: 'MinMax',
    page: { name: 'Level', index: 12 },
    inputs: [
      { name: 'A', color: ConnColor.BlueRed, horiz: 9, vert: 1 },
      { name: 'B', color: ConnColor.BlueRed, horiz: 11, vert: 1 },
    ],
    outputs: [
      { name: 'Min', color: ConnColor.BlueRed, horiz: 17, vert: 1 },
      { name: 'Max', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 130,
    height: 2,
    longName: 'Binary Counter',
    shortName: 'BinCounter',
    page: { name: 'Logic', index: 7 },
    inputs: [
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
      { name: 'Rst', color: ConnColor.YellowOrange, horiz: 2, vert: 1 },
    ],
    outputs: [
      { name: 'Out001', color: ConnColor.YellowOrange, horiz: 5, vert: 1 },
      { name: 'Out002', color: ConnColor.YellowOrange, horiz: 7, vert: 1 },
      { name: 'Out004', color: ConnColor.YellowOrange, horiz: 9, vert: 1 },
      { name: 'Out008', color: ConnColor.YellowOrange, horiz: 11, vert: 1 },
      { name: 'Out016', color: ConnColor.YellowOrange, horiz: 13, vert: 1 },
      { name: 'Out032', color: ConnColor.YellowOrange, horiz: 15, vert: 1 },
      { name: 'Out064', color: ConnColor.YellowOrange, horiz: 17, vert: 1 },
      { name: 'Out128', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 131,
    height: 2,
    longName: 'A/D Converter',
    shortName: 'ADConv',
    page: { name: 'Logic', index: 8 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'D0', color: ConnColor.YellowOrange, horiz: 5, vert: 1 },
      { name: 'D1', color: ConnColor.YellowOrange, horiz: 7, vert: 1 },
      { name: 'D2', color: ConnColor.YellowOrange, horiz: 9, vert: 1 },
      { name: 'D3', color: ConnColor.YellowOrange, horiz: 11, vert: 1 },
      { name: 'D4', color: ConnColor.YellowOrange, horiz: 13, vert: 1 },
      { name: 'D5', color: ConnColor.YellowOrange, horiz: 15, vert: 1 },
      { name: 'D6', color: ConnColor.YellowOrange, horiz: 17, vert: 1 },
      { name: 'D7', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 132,
    height: 2,
    longName: 'D/A Converter',
    shortName: 'DAConv',
    page: { name: 'Logic', index: 9 },
    inputs: [
      { name: 'D0', color: ConnColor.YellowOrange, horiz: 5, vert: 1 },
      { name: 'D1', color: ConnColor.YellowOrange, horiz: 7, vert: 1 },
      { name: 'D2', color: ConnColor.YellowOrange, horiz: 9, vert: 1 },
      { name: 'D3', color: ConnColor.YellowOrange, horiz: 11, vert: 1 },
      { name: 'D4', color: ConnColor.YellowOrange, horiz: 12, vert: 1 },
      { name: 'D5', color: ConnColor.YellowOrange, horiz: 13, vert: 1 },
      { name: 'D6', color: ConnColor.YellowOrange, horiz: 15, vert: 1 },
      { name: 'D7', color: ConnColor.YellowOrange, horiz: 17, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 134,
    height: 2,
    longName: 'Filter Highpass',
    shortName: 'FltHP',
    page: { name: 'Filter', index: 1 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 16, vert: 1 },
      { name: 'Pitch', color: ConnColor.Blue, horiz: 4, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Freq', type: 'FltFreq', labels: [] },
      { name: 'FreqMod', type: 'Level_100', labels: [] },
      { name: 'Kbt', type: 'Kbt_4', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
      { name: 'SlopeMode', type: 'HpLpSlopeMode' },
    ],
  },
  {
    id: 139,
    height: 2,
    longName: 'Track & Hold',
    shortName: 'T&H',
    page: { name: 'Switch', index: 17 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 15, vert: 1 },
      { name: 'Ctrl', color: ConnColor.YellowOrange, horiz: 12, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 140,
    height: 4,
    longName: 'Mixer 4-1 Stereo',
    shortName: 'Mix4-1S',
    page: { name: 'Mixer', index: 7 },
    inputs: [
      { name: 'In1L', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
      { name: 'In1R', color: ConnColor.BlueRed, horiz: 1, vert: 1 },
      { name: 'In2L', color: ConnColor.BlueRed, horiz: 4, vert: 1 },
      { name: 'In2R', color: ConnColor.BlueRed, horiz: 5, vert: 1 },
      { name: 'In3L', color: ConnColor.BlueRed, horiz: 8, vert: 1 },
      { name: 'In3R', color: ConnColor.BlueRed, horiz: 9, vert: 1 },
      { name: 'In4L', color: ConnColor.BlueRed, horiz: 13, vert: 1 },
      { name: 'In4R', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'ChainL', color: ConnColor.BlueRed, horiz: 17, vert: 0 },
      { name: 'ChainR', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'OutL', color: ConnColor.BlueRed, horiz: 17, vert: 3 },
      { name: 'OutR', color: ConnColor.BlueRed, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'Lev1', type: 'MixLevel', labels: [] },
      { name: 'Lev2', type: 'MixLevel', labels: [] },
      { name: 'Lev3', type: 'MixLevel', labels: [] },
      { name: 'Lev4', type: 'MixLevel', labels: [] },
      { name: 'ExpLin', type: 'ExpLin_2', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 141,
    height: 2,
    longName: 'MIDI Control Send',
    shortName: 'CtrlSend',
    page: { name: 'MIDI', index: 0 },
    inputs: [
      { name: 'Send', color: ConnColor.Yellow, horiz: 1, vert: 1 },
      { name: 'Value', color: ConnColor.Blue, horiz: 11, vert: 1 },
    ],
    outputs: [
      { name: 'Send', color: ConnColor.Yellow, horiz: 4, vert: 1 },
    ],
    params: [
      { name: 'Ctrl', type: 'MidiData', labels: [] },
      { name: 'Val', type: 'MidiData', labels: [] },
      { name: 'Ch', type: 'MidiCh_20', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 142,
    height: 2,
    longName: 'MIDI Program Change Send',
    shortName: 'PCSend',
    page: { name: 'MIDI', index: 1 },
    inputs: [
      { name: 'Send', color: ConnColor.Yellow, horiz: 1, vert: 1 },
      { name: 'Program', color: ConnColor.Blue, horiz: 11, vert: 1 },
    ],
    outputs: [
      { name: 'Send', color: ConnColor.Yellow, horiz: 4, vert: 1 },
    ],
    params: [
      { name: 'Program', type: 'MidiData', labels: [] },
      { name: 'Ch', type: 'MidiCh_16', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 143,
    height: 2,
    longName: 'MIDI Note Send',
    shortName: 'NoteSend',
    page: { name: 'MIDI', index: 2 },
    inputs: [
      { name: 'Gate', color: ConnColor.Yellow, horiz: 0, vert: 1 },
      { name: 'Vel', color: ConnColor.Blue, horiz: 4, vert: 1 },
      { name: 'Note', color: ConnColor.Blue, horiz: 10, vert: 1 },
    ],
    outputs: [
    ],
    params: [
      { name: 'Vel', type: 'MidiData', labels: [] },
      { name: 'Note', type: 'MidiData', labels: [] },
      { name: 'Ch', type: 'MidiCh_20', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 144,
    height: 5,
    longName: 'Seq Event',
    shortName: 'SeqEvent',
    page: { name: 'Seq', index: 0 },
    inputs: [
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
      { name: 'Rst', color: ConnColor.Yellow, horiz: 0, vert: 2 },
      { name: 'Loop', color: ConnColor.Yellow, horiz: 0, vert: 4 },
      { name: 'Park', color: ConnColor.Yellow, horiz: 16, vert: 0 },
      { name: 'Trig1', color: ConnColor.Yellow, horiz: 1, vert: 3 },
      { name: 'Trig2', color: ConnColor.Yellow, horiz: 1, vert: 4 },
    ],
    outputs: [
      { name: 'Link', color: ConnColor.Yellow, horiz: 19, vert: 1 },
      { name: 'Trig1', color: ConnColor.YellowOrange, horiz: 19, vert: 3 },
      { name: 'Trig2', color: ConnColor.YellowOrange, horiz: 19, vert: 4 },
    ],
    params: [
      { name: 'Seq1Step1', type: 'OffOn', labels: [] },
      { name: 'Seq1Step2', type: 'OffOn', labels: [] },
      { name: 'Seq1Step3', type: 'OffOn', labels: [] },
      { name: 'Seq1Step4', type: 'OffOn', labels: [] },
      { name: 'Seq1Step5', type: 'OffOn', labels: [] },
      { name: 'Seq1Step6', type: 'OffOn', labels: [] },
      { name: 'Seq1Step7', type: 'OffOn', labels: [] },
      { name: 'Seq1Step8', type: 'OffOn', labels: [] },
      { name: 'Seq1Step9', type: 'OffOn', labels: [] },
      { name: 'Seq1Step10', type: 'OffOn', labels: [] },
      { name: 'Seq1Step11', type: 'OffOn', labels: [] },
      { name: 'Seq1Step12', type: 'OffOn', labels: [] },
      { name: 'Seq1Step13', type: 'OffOn', labels: [] },
      { name: 'Seq1Step14', type: 'OffOn', labels: [] },
      { name: 'Seq1Step15', type: 'OffOn', labels: [] },
      { name: 'Seq1Step16', type: 'OffOn', labels: [] },
      { name: 'Seq2Step1', type: 'OffOn', labels: [] },
      { name: 'Seq2Step2', type: 'OffOn', labels: [] },
      { name: 'Seq2Step3', type: 'OffOn', labels: [] },
      { name: 'Seq2Step4', type: 'OffOn', labels: [] },
      { name: 'Seq2Step5', type: 'OffOn', labels: [] },
      { name: 'Seq2Step6', type: 'OffOn', labels: [] },
      { name: 'Seq2Step7', type: 'OffOn', labels: [] },
      { name: 'Seq2Step8', type: 'OffOn', labels: [] },
      { name: 'Seq2Step9', type: 'OffOn', labels: [] },
      { name: 'Seq2Step10', type: 'OffOn', labels: [] },
      { name: 'Seq2Step11', type: 'OffOn', labels: [] },
      { name: 'Seq2Step12', type: 'OffOn', labels: [] },
      { name: 'Seq2Step13', type: 'OffOn', labels: [] },
      { name: 'Seq2Step14', type: 'OffOn', labels: [] },
      { name: 'Seq2Step15', type: 'OffOn', labels: [] },
      { name: 'Seq2Step16', type: 'OffOn', labels: [] },
      { name: 'Loop', type: 'LoopOnce', labels: [] },
      { name: 'Length', type: 'SeqLen', labels: [] },
      { name: 'TG1', type: 'TrigGate', labels: [] },
      { name: 'TG2', type: 'TrigGate', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 145,
    height: 8,
    longName: 'Sequencer Values',
    shortName: 'SeqVal',
    page: { name: 'Seq', index: 1 },
    inputs: [
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
      { name: 'Rst', color: ConnColor.Yellow, horiz: 0, vert: 3 },
      { name: 'Loop', color: ConnColor.Yellow, horiz: 0, vert: 4 },
      { name: 'Park', color: ConnColor.Yellow, horiz: 16, vert: 0 },
      { name: 'Val', color: ConnColor.BlueRed, horiz: 0, vert: 5 },
      { name: 'Trig', color: ConnColor.Yellow, horiz: 0, vert: 7 },
    ],
    outputs: [
      { name: 'Link', color: ConnColor.Yellow, horiz: 19, vert: 1 },
      { name: 'Val', color: ConnColor.BlueRed, horiz: 19, vert: 5 },
      { name: 'Trig', color: ConnColor.YellowOrange, horiz: 19, vert: 7 },
    ],
    params: [
      { name: 'Seq1Step1', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step2', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step3', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step4', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step5', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step6', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step7', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step8', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step9', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step10', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step11', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step12', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step13', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step14', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step15', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step16', type: 'LevBipUni', labels: [] },
      { name: 'Seq2Step1', type: 'OffOn', labels: [] },
      { name: 'Seq2Step2', type: 'OffOn', labels: [] },
      { name: 'Seq2Step3', type: 'OffOn', labels: [] },
      { name: 'Seq2Step4', type: 'OffOn', labels: [] },
      { name: 'Seq2Step5', type: 'OffOn', labels: [] },
      { name: 'Seq2Step6', type: 'OffOn', labels: [] },
      { name: 'Seq2Step7', type: 'OffOn', labels: [] },
      { name: 'Seq2Step8', type: 'OffOn', labels: [] },
      { name: 'Seq2Step9', type: 'OffOn', labels: [] },
      { name: 'Seq2Step10', type: 'OffOn', labels: [] },
      { name: 'Seq2Step11', type: 'OffOn', labels: [] },
      { name: 'Seq2Step12', type: 'OffOn', labels: [] },
      { name: 'Seq2Step13', type: 'OffOn', labels: [] },
      { name: 'Seq2Step14', type: 'OffOn', labels: [] },
      { name: 'Seq2Step15', type: 'OffOn', labels: [] },
      { name: 'Seq2Step16', type: 'OffOn', labels: [] },
      { name: 'Loop', type: 'LoopOnce', labels: [] },
      { name: 'Length', type: 'SeqLen', labels: [] },
      { name: 'BipUni', type: 'BipUni', labels: [] },
      { name: 'TG', type: 'TrigGate', labels: [] },
      { name: 'Clr_Or_Rnd', type: 'OffOn', labels: [] },
      { name: 'Rnd_Or_Clr', type: 'OffOn', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 146,
    height: 8,
    longName: 'Sequencer Level',
    shortName: 'SeqLev',
    page: { name: 'Seq', index: 2 },
    inputs: [
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
      { name: 'Rst', color: ConnColor.YellowOrange, horiz: 0, vert: 3 },
      { name: 'Loop', color: ConnColor.YellowOrange, horiz: 0, vert: 4 },
      { name: 'Park', color: ConnColor.YellowOrange, horiz: 16, vert: 0 },
      { name: 'Val', color: ConnColor.BlueRed, horiz: 0, vert: 6 },
      { name: 'Trig', color: ConnColor.YellowOrange, horiz: 0, vert: 7 },
    ],
    outputs: [
      { name: 'Link', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
      { name: 'Val', color: ConnColor.BlueRed, horiz: 19, vert: 6 },
      { name: 'Trig', color: ConnColor.YellowOrange, horiz: 19, vert: 7 },
    ],
    params: [
      { name: 'Seq1Step1', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step2', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step3', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step4', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step5', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step6', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step7', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step8', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step9', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step10', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step11', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step12', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step13', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step14', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step15', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step16', type: 'LevBipUni', labels: [] },
      { name: 'Seq2Step1', type: 'OffOn', labels: [] },
      { name: 'Seq2Step2', type: 'OffOn', labels: [] },
      { name: 'Seq2Step3', type: 'OffOn', labels: [] },
      { name: 'Seq2Step4', type: 'OffOn', labels: [] },
      { name: 'Seq2Step5', type: 'OffOn', labels: [] },
      { name: 'Seq2Step6', type: 'OffOn', labels: [] },
      { name: 'Seq2Step7', type: 'OffOn', labels: [] },
      { name: 'Seq2Step8', type: 'OffOn', labels: [] },
      { name: 'Seq2Step9', type: 'OffOn', labels: [] },
      { name: 'Seq2Step10', type: 'OffOn', labels: [] },
      { name: 'Seq2Step11', type: 'OffOn', labels: [] },
      { name: 'Seq2Step12', type: 'OffOn', labels: [] },
      { name: 'Seq2Step13', type: 'OffOn', labels: [] },
      { name: 'Seq2Step14', type: 'OffOn', labels: [] },
      { name: 'Seq2Step15', type: 'OffOn', labels: [] },
      { name: 'Seq2Step16', type: 'OffOn', labels: [] },
      { name: 'Loop', type: 'LoopOnce', labels: [] },
      { name: 'Length', type: 'SeqLen', labels: [] },
      { name: 'BipUni', type: 'BipUni', labels: [] },
      { name: 'TG', type: 'TrigGate', labels: [] },
      { name: 'Clr_Or_Rnd', type: 'OffOn', labels: [] },
      { name: 'Rnd_Or_Clr', type: 'OffOn', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 147,
    height: 2,
    longName: 'MIDI Control Receive',
    shortName: 'CtrlRcv',
    page: { name: 'MIDI', index: 3 },
    inputs: [
    ],
    outputs: [
      { name: 'Rcv', color: ConnColor.Yellow, horiz: 16, vert: 1 },
      { name: 'Val', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Ctrl', type: 'MidiData', labels: [] },
      { name: 'Ch', type: 'MidiCh_16', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 148,
    height: 2,
    longName: 'MIDI Note Receive',
    shortName: 'NoteRcv',
    page: { name: 'MIDI', index: 4 },
    inputs: [
    ],
    outputs: [
      { name: 'Gate', color: ConnColor.Yellow, horiz: 14, vert: 1 },
      { name: 'Vel', color: ConnColor.Blue, horiz: 16, vert: 1 },
      { name: 'RelVel', color: ConnColor.Blue, horiz: 18, vert: 1 },
    ],
    params: [
      { name: 'Note', type: 'MidiData', labels: [] },
      { name: 'Ch', type: 'MidiCh_17', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 149,
    height: 3,
    longName: 'MIDI Note Zone',
    shortName: 'NoteZone',
    page: { name: 'MIDI', index: 5 },
    inputs: [
    ],
    outputs: [
    ],
    params: [
      { name: 'RcvCh', type: 'MidiCh_17', labels: [] },
      { name: 'RcvMin', type: 'MidiData', labels: [] },
      { name: 'RcvMax', type: 'MidiData', labels: [] },
      { name: 'SendTrans', type: 'Bipolar_127', labels: [] },
      { name: 'SendCh', type: 'MidiCh_20', labels: [] },
      { name: 'ThruMode', type: 'NoteZoneThru', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 150,
    height: 5,
    longName: 'Compressor',
    shortName: 'Compressor',
    page: { name: 'FX', index: 8 },
    inputs: [
      { name: 'InL', color: ConnColor.Red, horiz: 18, vert: 1 },
      { name: 'InR', color: ConnColor.Red, horiz: 19, vert: 1 },
      { name: 'SideChain', color: ConnColor.Red, horiz: 5, vert: 0 },
    ],
    outputs: [
      { name: 'OutR', color: ConnColor.Red, horiz: 18, vert: 4 },
      { name: 'OutL', color: ConnColor.Red, horiz: 19, vert: 4 },
    ],
    params: [
      { name: 'Threshold', type: 'Threshold_42', labels: [] },
      { name: 'Ratio', type: 'CompressorRatio', labels: [] },
      { name: 'Attack', type: 'CompressorAttack', labels: [] },
      { name: 'Release', type: 'CompressorRelease', labels: [] },
      { name: 'RefLevel', type: 'CompressorRefLevel', labels: [] },
      { name: 'SideChain', type: 'OffOn', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 152,
    height: 2,
    longName: 'Key Quantizer',
    shortName: 'KeyQuant',
    page: { name: 'Note', index: 1 },
    inputs: [
      { name: 'In', color: ConnColor.Blue, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Range', type: 'NoteRange', labels: [] },
      { name: 'Capture', type: 'KeyQuantCapture', labels: [] },
      { name: 'E', type: 'OffOn', labels: [] },
      { name: 'F', type: 'OffOn', labels: [] },
      { name: 'F#', type: 'OffOn', labels: [] },
      { name: 'G', type: 'OffOn', labels: [] },
      { name: 'G#', type: 'OffOn', labels: [] },
      { name: 'A', type: 'OffOn', labels: [] },
      { name: 'A#', type: 'OffOn', labels: [] },
      { name: 'B', type: 'OffOn', labels: [] },
      { name: 'C', type: 'OffOn', labels: [] },
      { name: 'C#', type: 'OffOn', labels: [] },
      { name: 'D', type: 'OffOn', labels: [] },
      { name: 'D#', type: 'OffOn', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 154,
    height: 8,
    longName: 'Sequencer Controlled',
    shortName: 'SeqCtr',
    page: { name: 'Seq', index: 4 },
    inputs: [
      { name: 'Ctrl', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
      { name: 'Val', color: ConnColor.BlueRed, horiz: 0, vert: 5 },
      { name: 'Trig', color: ConnColor.YellowOrange, horiz: 0, vert: 7 },
    ],
    outputs: [
      { name: 'Val', color: ConnColor.BlueRed, horiz: 19, vert: 5 },
      { name: 'Trig', color: ConnColor.YellowOrange, horiz: 19, vert: 7 },
    ],
    params: [
      { name: 'Seq1Step1', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step2', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step3', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step4', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step5', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step6', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step7', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step8', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step9', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step10', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step11', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step12', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step13', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step14', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step15', type: 'LevBipUni', labels: [] },
      { name: 'Seq1Step16', type: 'LevBipUni', labels: [] },
      { name: 'Seq2Step1', type: 'OffOn', labels: [] },
      { name: 'Seq2Step2', type: 'OffOn', labels: [] },
      { name: 'Seq2Step3', type: 'OffOn', labels: [] },
      { name: 'Seq2Step4', type: 'OffOn', labels: [] },
      { name: 'Seq2Step5', type: 'OffOn', labels: [] },
      { name: 'Seq2Step6', type: 'OffOn', labels: [] },
      { name: 'Seq2Step7', type: 'OffOn', labels: [] },
      { name: 'Seq2Step8', type: 'OffOn', labels: [] },
      { name: 'Seq2Step9', type: 'OffOn', labels: [] },
      { name: 'Seq2Step10', type: 'OffOn', labels: [] },
      { name: 'Seq2Step11', type: 'OffOn', labels: [] },
      { name: 'Seq2Step12', type: 'OffOn', labels: [] },
      { name: 'Seq2Step13', type: 'OffOn', labels: [] },
      { name: 'Seq2Step14', type: 'OffOn', labels: [] },
      { name: 'Seq2Step15', type: 'OffOn', labels: [] },
      { name: 'Seq2Step16', type: 'OffOn', labels: [] },
      { name: 'TG', type: 'TrigGate', labels: [] },
      { name: 'BipUni', type: 'BipUni', labels: [] },
      { name: 'XFade', type: 'SeqCtrlXFade', labels: [] },
      { name: 'Clr_Or_Rnd', type: 'OffOn', labels: [] },
      { name: 'Rnd_Or_Clr', type: 'OffOn', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 156,
    height: 2,
    longName: 'Note Detector',
    shortName: 'NoteDet',
    page: { name: 'In/Out', index: 9 },
    inputs: [
    ],
    outputs: [
      { name: 'Gate', color: ConnColor.Yellow, horiz: 13, vert: 1 },
      { name: 'Vel', color: ConnColor.Blue, horiz: 16, vert: 1 },
      { name: 'RelVel', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Note', type: 'FreqCoarse', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 157,
    height: 2,
    longName: 'Level Converter',
    shortName: 'LevConv',
    page: { name: 'Level', index: 4 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'OutputType', type: 'PosNegInvBipInv', labels: [] },
      { name: 'InputType', type: 'BipPosNeg', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 158,
    height: 2,
    longName: 'Glide',
    shortName: 'Glide',
    page: { name: 'Note', index: 4 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'On', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Time', type: 'GlideTime', labels: [] },
      { name: 'Glide', type: 'OffOn', labels: [] },
      { name: 'Shape', type: 'LogLin', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 159,
    height: 2,
    longName: 'Compare to Signal',
    shortName: 'CompSig',
    page: { name: 'Level', index: 11 },
    inputs: [
      { name: 'A', color: ConnColor.BlueRed, horiz: 9, vert: 1 },
      { name: 'B', color: ConnColor.BlueRed, horiz: 11, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 160,
    height: 2,
    longName: 'Zero Crossing Counter',
    shortName: 'ZeroCnt',
    page: { name: 'Note', index: 6 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 161,
    height: 9,
    longName: 'Mixer 8-1 Fader',
    shortName: 'MixFader',
    page: { name: 'Mixer', index: 10 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 1, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 2, vert: 1 },
      { name: 'In3', color: ConnColor.BlueRed, horiz: 5, vert: 1 },
      { name: 'In4', color: ConnColor.BlueRed, horiz: 7, vert: 1 },
      { name: 'In5', color: ConnColor.BlueRed, horiz: 10, vert: 1 },
      { name: 'In6', color: ConnColor.BlueRed, horiz: 12, vert: 1 },
      { name: 'In7', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'In8', color: ConnColor.BlueRed, horiz: 17, vert: 1 },
      { name: 'Chain', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 8 },
    ],
    params: [
      { name: 'Lev1', type: 'MixLevel', labels: [] },
      { name: 'Lev2', type: 'MixLevel', labels: [] },
      { name: 'Lev3', type: 'MixLevel', labels: [] },
      { name: 'Lev4', type: 'MixLevel', labels: [] },
      { name: 'Lev5', type: 'MixLevel', labels: [] },
      { name: 'Lev6', type: 'MixLevel', labels: [] },
      { name: 'Lev7', type: 'MixLevel', labels: [] },
      { name: 'Lev8', type: 'MixLevel', labels: [] },
      { name: 'ExpLin', type: 'ExpLin_2', labels: [] },
      { name: 'Pad', type: 'Pad_3', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 162,
    height: 4,
    longName: 'Filter Comb',
    shortName: 'FltComb',
    page: { name: 'Filter', index: 7 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 2 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 3 },
      { name: 'FB', color: ConnColor.Blue, horiz: 9, vert: 3 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Freq', type: 'Freq_1', labels: [] },
      { name: 'PitchMod', type: 'Level_100', labels: [] },
      { name: 'Kbt', type: 'Kbt_4', labels: [] },
      { name: 'FB', type: 'Bipolar_127', labels: [] },
      { name: 'FBMod', type: 'Level_100', labels: [] },
      { name: 'Type', type: 'CombType', labels: [] },
      { name: 'Lev', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 163,
    height: 5,
    longName: 'Osc Shape A',
    shortName: 'OscShpA',
    page: { name: 'Osc', index: 5 },
    inputs: [
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 3 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 4 },
      { name: 'Sync', color: ConnColor.Red, horiz: 0, vert: 1 },
      { name: 'FmMod', color: ConnColor.Red, horiz: 8, vert: 3 },
      { name: 'ShapeMod', color: ConnColor.Red, horiz: 14, vert: 3 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 4 },
    ],
    params: [
      { name: 'FreqCoarse', type: 'FreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'FreqFine', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'PitchMod', type: 'Level_100', labels: [] },
      { name: 'FreqMode', type: 'FreqMode_3', labels: [] },
      { name: 'FmAmount', type: 'Level_100', labels: [] },
      { name: 'FmMode', type: 'FmLinTrk', labels: [] },
      { name: 'Shape', type: 'PW', labels: [] },
      { name: 'ShapeMod', type: 'Level_100', labels: [] },
      { name: 'Waveform', type: 'OscShpA_Waveform', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 164,
    height: 5,
    longName: 'Osc Dual',
    shortName: 'OscDual',
    page: { name: 'Osc', index: 7 },
    inputs: [
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 3 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 4 },
      { name: 'Sync', color: ConnColor.Red, horiz: 0, vert: 1 },
      { name: 'PW', color: ConnColor.Red, horiz: 9, vert: 1 },
      { name: 'Phase', color: ConnColor.Red, horiz: 9, vert: 4 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 4 },
    ],
    params: [
      { name: 'FreqCoarse', type: 'FreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'FreqFine', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'PitchMod', type: 'Level_100', labels: [] },
      { name: 'FreqMode', type: 'FreqMode_3', labels: [] },
      { name: 'SqrLevel', type: 'Level_100', labels: [] },
      { name: 'PWMod', type: 'Level_100', labels: [] },
      { name: 'SawLevel', type: 'Level_100', labels: [] },
      { name: 'SawPhase', type: 'Phase', labels: [] },
      { name: 'SubOctLevel', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'SqrPW', type: 'PW', labels: [] },
      { name: 'PhaseMod', type: 'Level_100', labels: [] },
      { name: 'Soft', type: 'OffOn', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 165,
    height: 6,
    longName: 'DX Style Router',
    shortName: 'DXRouter',
    page: { name: 'Osc', index: 15 },
    inputs: [
      { name: 'In1', color: ConnColor.Red, horiz: 0, vert: 5 },
      { name: 'In2', color: ConnColor.Red, horiz: 2, vert: 5 },
      { name: 'In3', color: ConnColor.Red, horiz: 5, vert: 5 },
      { name: 'In4', color: ConnColor.Red, horiz: 9, vert: 5 },
      { name: 'In5', color: ConnColor.Red, horiz: 12, vert: 5 },
      { name: 'In6', color: ConnColor.Red, horiz: 15, vert: 5 },
    ],
    outputs: [
      { name: 'Out1', color: ConnColor.Red, horiz: 1, vert: 5 },
      { name: 'Out2', color: ConnColor.Red, horiz: 4, vert: 5 },
      { name: 'Out3', color: ConnColor.Red, horiz: 7, vert: 5 },
      { name: 'Out4', color: ConnColor.Red, horiz: 10, vert: 5 },
      { name: 'Out5', color: ConnColor.Red, horiz: 13, vert: 5 },
      { name: 'Out6', color: ConnColor.Red, horiz: 16, vert: 5 },
      { name: 'Main', color: ConnColor.Red, horiz: 19, vert: 5 },
    ],
    params: [
      { name: 'Algorithm', type: 'DxAlgorithm', labels: [] },
      { name: 'Feedback', type: 'DxFeedback', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 167,
    height: 3,
    longName: 'Pitch Shifter',
    shortName: 'PShift',
    page: { name: 'FX', index: 5 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
      { name: 'Pitch', color: ConnColor.Blue, horiz: 1, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'ShiftSemi', type: 'PShiftCoarse', labels: [] },
      { name: 'ShiftFine', type: 'PShiftFine', labels: [] },
      { name: 'ShiftMod', type: 'Level_100', labels: [] },
      { name: 'Delay', type: 'ScratchDelay', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 169,
    height: 5,
    longName: 'Envelope Modulation AHD',
    shortName: 'ModAHD',
    page: { name: 'Env', index: 7 },
    inputs: [
      { name: 'Trig', color: ConnColor.Yellow, horiz: 0, vert: 2 },
      { name: 'AttackMod', color: ConnColor.Blue, horiz: 4, vert: 4 },
      { name: 'HoldMod', color: ConnColor.Blue, horiz: 8, vert: 4 },
      { name: 'DecayMod', color: ConnColor.Blue, horiz: 12, vert: 4 },
      { name: 'In', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
      { name: 'AM', color: ConnColor.Blue, horiz: 0, vert: 4 },
    ],
    outputs: [
      { name: 'Env', color: ConnColor.Blue, horiz: 18, vert: 4 },
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 4 },
    ],
    params: [
      { name: 'Attack', type: 'EnvTime', labels: [] },
      { name: 'Hold', type: 'EnvTime', labels: [] },
      { name: 'Decay', type: 'EnvTime', labels: [] },
      { name: 'AttackMod', type: 'Level_100', labels: [] },
      { name: 'HoldMod', type: 'Level_100', labels: [] },
      { name: 'DecayMod', type: 'Level_100', labels: [] },
      { name: 'OutputType', type: 'PosNegInv', labels: [] },
      { name: 'KB', type: 'OffOn', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 170,
    height: 2,
    longName: '2 inputs',
    shortName: '2-In',
    page: { name: 'In/Out', index: 2 },
    inputs: [
    ],
    outputs: [
      { name: 'OutL', color: ConnColor.Red, horiz: 17, vert: 1 },
      { name: 'OutR', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Source', type: 'Source_2', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Pad', type: 'Pad_4', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 171,
    height: 2,
    longName: '4 inputs',
    shortName: '4-In',
    page: { name: 'In/Out', index: 3 },
    inputs: [
    ],
    outputs: [
      { name: 'Out1', color: ConnColor.Red, horiz: 12, vert: 1 },
      { name: 'Out2', color: ConnColor.Red, horiz: 14, vert: 1 },
      { name: 'Out3', color: ConnColor.Red, horiz: 17, vert: 1 },
      { name: 'Out4', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Source', type: 'Source_3', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Pad', type: 'Pad_4', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 172,
    height: 2,
    longName: 'Delay Static',
    shortName: 'DlySingleA',
    page: { name: 'Delay', index: 0 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Time', type: 'DelayTime_3', labels: [] },
    ],
    modes: [
      { name: 'DelayRange', type: 'DelayRange_3' },
    ],
  },
  {
    id: 173,
    height: 2,
    longName: 'Delay Single',
    shortName: 'DlySingleB',
    page: { name: 'Delay', index: 1 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 16, vert: 1 },
      { name: 'Time', color: ConnColor.Red, horiz: 7, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Time', type: 'DelayTime_3', labels: [] },
      { name: 'TimeMod', type: 'Level_100', labels: [] },
    ],
    modes: [
      { name: 'DelayRange', type: 'DelayRange_3' },
    ],
  },
  {
    id: 174,
    height: 3,
    longName: 'Delay Dual',
    shortName: 'DelayDual',
    page: { name: 'Delay', index: 2 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
      { name: 'Time1', color: ConnColor.Red, horiz: 7, vert: 2 },
      { name: 'Time2', color: ConnColor.Red, horiz: 13, vert: 2 },
    ],
    outputs: [
      { name: 'Out1', color: ConnColor.Red, horiz: 10, vert: 2 },
      { name: 'Out2', color: ConnColor.Red, horiz: 17, vert: 2 },
    ],
    params: [
      { name: 'Time1', type: 'DelayTime_3', labels: [] },
      { name: 'Time1Mod', type: 'Level_100', labels: [] },
      { name: 'Time2', type: 'DelayTime_3', labels: [] },
      { name: 'Time2Mod', type: 'Level_100', labels: [] },
    ],
    modes: [
      { name: 'DelayRange', type: 'DelayRange_3' },
    ],
  },
  {
    id: 175,
    height: 5,
    longName: 'Delay Quad',
    shortName: 'DelayQuad',
    page: { name: 'Delay', index: 3 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
      { name: 'Time1', color: ConnColor.Red, horiz: 3, vert: 4 },
      { name: 'Time2', color: ConnColor.Red, horiz: 7, vert: 4 },
      { name: 'Time3', color: ConnColor.Red, horiz: 11, vert: 4 },
      { name: 'Time4', color: ConnColor.Red, horiz: 15, vert: 4 },
    ],
    outputs: [
      { name: 'OutMain', color: ConnColor.Red, horiz: 19, vert: 4 },
      { name: 'Out1', color: ConnColor.Red, horiz: 5, vert: 2 },
      { name: 'Out2', color: ConnColor.Red, horiz: 9, vert: 2 },
      { name: 'Out3', color: ConnColor.Red, horiz: 13, vert: 2 },
      { name: 'Out4', color: ConnColor.Red, horiz: 17, vert: 2 },
    ],
    params: [
      { name: 'Time1', type: 'DelayTime_3', labels: [] },
      { name: 'Time1Mod', type: 'Level_100', labels: [] },
      { name: 'Time2', type: 'DelayTime_3', labels: [] },
      { name: 'Time2Mod', type: 'Level_100', labels: [] },
      { name: 'Time3', type: 'DelayTime_3', labels: [] },
      { name: 'Time3Mod', type: 'Level_100', labels: [] },
      { name: 'Time4', type: 'DelayTime_3', labels: [] },
      { name: 'Time4Mod', type: 'Level_100', labels: [] },
      { name: 'TimeClk', type: 'TimeClk', labels: [] },
    ],
    modes: [
      { name: 'DelayRange', type: 'DelayRange_3' },
    ],
  },
  {
    id: 176,
    height: 3,
    longName: 'Delay A',
    shortName: 'DelayA',
    page: { name: 'Delay', index: 7 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'Time', type: 'DelayTime_2', labels: [] },
      { name: 'FB', type: 'Level_100', labels: [] },
      { name: 'Filter', type: 'Level_100', labels: [] },
      { name: 'DryWet', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'TimeClk', type: 'TimeClk', labels: [] },
    ],
    modes: [
      { name: 'DelayRange', type: 'DelayRange_2' },
    ],
  },
  {
    id: 177,
    height: 4,
    longName: 'Delay B',
    shortName: 'DelayB',
    page: { name: 'Delay', index: 8 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
      { name: 'FBMod', color: ConnColor.BlueRed, horiz: 9, vert: 3 },
      { name: 'DryWetMod', color: ConnColor.BlueRed, horiz: 15, vert: 3 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'Time', type: 'DelayTime_2', labels: [] },
      { name: 'FB', type: 'Level_100', labels: [] },
      { name: 'LP', type: 'Level_100', labels: [] },
      { name: 'DryWet', type: 'Level_100', labels: [] },
      { name: 'TimeClk', type: 'TimeClk', labels: [] },
      { name: 'FBMod', type: 'Level_100', labels: [] },
      { name: 'DryWetMod', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'HP', type: 'Level_100', labels: [] },
    ],
    modes: [
      { name: 'DelayRange', type: 'DelayRange_2' },
    ],
  },
  {
    id: 178,
    height: 2,
    longName: 'Delay Clocked',
    shortName: 'DlyClock',
    page: { name: 'Delay', index: 6 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Delay', type: 'Range_128', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 179,
    height: 2,
    longName: 'Shift Register',
    shortName: 'DlyShiftReg',
    page: { name: 'Delay', index: 5 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 5, vert: 1 },
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out1', color: ConnColor.BlueRed, horiz: 7, vert: 1 },
      { name: 'Out2', color: ConnColor.BlueRed, horiz: 9, vert: 1 },
      { name: 'Out3', color: ConnColor.BlueRed, horiz: 11, vert: 1 },
      { name: 'Out4', color: ConnColor.BlueRed, horiz: 12, vert: 1 },
      { name: 'Out5', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'Out6', color: ConnColor.BlueRed, horiz: 15, vert: 1 },
      { name: 'Out7', color: ConnColor.BlueRed, horiz: 17, vert: 1 },
      { name: 'Out8', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 180,
    height: 12,
    longName: 'FM Operator',
    shortName: 'Operator',
    page: { name: 'Osc', index: 14 },
    inputs: [
      { name: 'Freq', color: ConnColor.Blue, horiz: 0, vert: 3 },
      { name: 'FM', color: ConnColor.Red, horiz: 19, vert: 1 },
      { name: 'Gate', color: ConnColor.Yellow, horiz: 0, vert: 5 },
      { name: 'Note', color: ConnColor.Blue, horiz: 0, vert: 6 },
      { name: 'AMod', color: ConnColor.Blue, horiz: 0, vert: 9 },
      { name: 'Vel', color: ConnColor.Blue, horiz: 0, vert: 11 },
      { name: 'Pitch', color: ConnColor.Blue, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 11 },
    ],
    params: [
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'Sync', type: 'OffOn', labels: [] },
      { name: 'RatioFixed', type: 'RatioFixed', labels: [] },
      { name: 'FreqCoarse', type: 'OpFreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'OpFreqFine', labels: [] },
      { name: 'FreqDetune', type: 'OpFreqDetune', labels: [] },
      { name: 'Vel', type: 'OpVel', labels: [] },
      { name: 'RateScale', type: 'OpRateScale', labels: [] },
      { name: 'R1', type: 'OpTime', labels: [] },
      { name: 'L1', type: 'OpLevel', labels: [] },
      { name: 'R2', type: 'OpTime', labels: [] },
      { name: 'L2', type: 'OpLevel', labels: [] },
      { name: 'R3', type: 'OpTime', labels: [] },
      { name: 'L3', type: 'OpLevel', labels: [] },
      { name: 'R4', type: 'OpTime', labels: [] },
      { name: 'L4', type: 'OpLevel', labels: [] },
      { name: 'AMod', type: 'OpAmod', labels: [] },
      { name: 'BrPoint', type: 'OpBrPpoint', labels: [] },
      { name: 'LDepthMode', type: 'OpDepthMode', labels: [] },
      { name: 'LDepth', type: 'OpDepth', labels: [] },
      { name: 'RDepthMode', type: 'OpDepthMode', labels: [] },
      { name: 'RDepth', type: 'OpDepth', labels: [] },
      { name: 'OutLevel', type: 'OpLevel', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'EnvKB', type: 'OffOn', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 181,
    height: 3,
    longName: 'Delay 8 Tap',
    shortName: 'DlyEight',
    page: { name: 'Delay', index: 4 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Out1', color: ConnColor.Red, horiz: 7, vert: 2 },
      { name: 'Out2', color: ConnColor.Red, horiz: 9, vert: 2 },
      { name: 'Out3', color: ConnColor.Red, horiz: 10, vert: 2 },
      { name: 'Out4', color: ConnColor.Red, horiz: 12, vert: 2 },
      { name: 'Out5', color: ConnColor.Red, horiz: 14, vert: 2 },
      { name: 'Out6', color: ConnColor.Red, horiz: 16, vert: 2 },
      { name: 'Out7', color: ConnColor.Red, horiz: 17, vert: 2 },
      { name: 'Out8', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'Time', type: 'DelayTime_3', labels: [] },
    ],
    modes: [
      { name: 'DelayRange', type: 'DelayRange_3' },
    ],
  },
  {
    id: 182,
    height: 5,
    longName: 'Delay Stereo',
    shortName: 'DlyStereo',
    page: { name: 'Delay', index: 9 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'OutL', color: ConnColor.Red, horiz: 17, vert: 4 },
      { name: 'OutR', color: ConnColor.Red, horiz: 19, vert: 4 },
    ],
    params: [
      { name: 'TimeLeft', type: 'DelayTime_1', labels: [] },
      { name: 'TimeRight', type: 'DelayTime_1', labels: [] },
      { name: 'FBLeft', type: 'Level_100', labels: [] },
      { name: 'FBRight', type: 'Level_100', labels: [] },
      { name: 'XFBLeft', type: 'Level_100', labels: [] },
      { name: 'XFBRight', type: 'Level_100', labels: [] },
      { name: 'TimeClk', type: 'TimeClk', labels: [] },
      { name: 'LP', type: 'Level_100', labels: [] },
      { name: 'DryWet', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'HP', type: 'Level_100', labels: [] },
    ],
    modes: [
      { name: 'DelayRange', type: 'DelayRange_1' },
    ],
  },
  {
    id: 183,
    height: 3,
    longName: 'Osc Phase Mod',
    shortName: 'OscPM',
    page: { name: 'Osc', index: 4 },
    inputs: [
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 2 },
      { name: 'Sync', color: ConnColor.Red, horiz: 12, vert: 2 },
      { name: 'PhaseMod', color: ConnColor.Red, horiz: 14, vert: 2 },
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'FreqCoarse', type: 'FreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'FreqFine', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'FreqMode', type: 'FreqMode_3', labels: [] },
      { name: 'PhaseMod', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'PitchVar', type: 'Level_100', labels: [] },
    ],
    modes: [
      { name: 'Waveform', type: 'OscWaveform_1' },
    ],
  },
  {
    id: 184,
    height: 2,
    longName: 'Mixer 1-1 A',
    shortName: 'Mix1-1A',
    page: { name: 'Mixer', index: 0 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Chain', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Lev', type: 'MixLevel', labels: [] },
      { name: 'ExpLin', type: 'ExpLin_2', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 185,
    height: 2,
    longName: 'Mixer 1-1 Stereo',
    shortName: 'Mix1-1S',
    page: { name: 'Mixer', index: 1 },
    inputs: [
      { name: 'InL', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'InR', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'LChain', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
      { name: 'RChain', color: ConnColor.BlueRed, horiz: 1, vert: 1 },
    ],
    outputs: [
      { name: 'OutL', color: ConnColor.BlueRed, horiz: 17, vert: 1 },
      { name: 'OutR', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Lev', type: 'MixLevel', labels: [] },
      { name: 'ExpLin', type: 'ExpLin_2', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 186,
    height: 2,
    longName: 'Switch 1-2 Momentary',
    shortName: 'Sw1-2M',
    page: { name: 'Switch', index: 6 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
    ],
    outputs: [
      { name: 'OutOn', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
      { name: 'OutOff', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Ctrl', color: ConnColor.Blue, horiz: 0, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 187,
    height: 2,
    longName: 'Switch 2-1 Momentary',
    shortName: 'Sw2-1M',
    page: { name: 'Switch', index: 2 },
    inputs: [
      { name: 'InOff', color: ConnColor.BlueRed, horiz: 14, vert: 1 },
      { name: 'InOn', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
      { name: 'Ctrl', color: ConnColor.Blue, horiz: 0, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 188,
    height: 2,
    longName: 'Constant Switch Momentary',
    shortName: 'ConstSwM',
    page: { name: 'Level', index: 1 },
    inputs: [
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Lev', type: 'LevBipUni', labels: [] },
      { name: 'BipUni', type: 'BipUni', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 189,
    height: 3,
    longName: 'Noise Gate',
    shortName: 'NoiseGate',
    page: { name: 'Level', index: 9 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 19, vert: 0 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 2 },
      { name: 'Env', color: ConnColor.Blue, horiz: 17, vert: 2 },
    ],
    params: [
      { name: 'Threshold', type: 'Threshold_127', labels: [] },
      { name: 'Attack', type: 'NoiseGateAttack', labels: [] },
      { name: 'Release', type: 'NoiseGateRelease', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 190,
    height: 4,
    longName: 'LFO B',
    shortName: 'LfoB',
    page: { name: 'LFO', index: 1 },
    inputs: [
      { name: 'Rate', color: ConnColor.Blue, horiz: 1, vert: 3 },
      { name: 'RateVar', color: ConnColor.Blue, horiz: 3, vert: 3 },
      { name: 'Rst', color: ConnColor.Blue, horiz: 0, vert: 1 },
      { name: 'Phase', color: ConnColor.Blue, horiz: 10, vert: 3 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 3 },
      { name: 'Sync', color: ConnColor.Blue, horiz: 0, vert: 3 },
    ],
    params: [
      { name: 'Rate', type: 'LfoRate_4', labels: [] },
      { name: 'RateMod', type: 'Level_100', labels: [] },
      { name: 'Range', type: 'LfoRange_4', labels: [] },
      { name: 'Kbt', type: 'Kbt_4', labels: [] },
      { name: 'Waveform', type: 'LfoB_Waveform', labels: [] },
      { name: 'PolyMono', type: 'PolyMono', labels: [] },
      { name: 'Phase', type: 'Phase', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'OutputType', type: 'OutTypeLfo', labels: [] },
      { name: 'PhaseMod', type: 'Level_100', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 192,
    height: 2,
    longName: 'Phaser',
    shortName: 'Phaser',
    page: { name: 'FX', index: 1 },
    inputs: [
      { name: 'In', color: ConnColor.Red, horiz: 16, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Type', type: 'PhaserType', labels: [] },
      { name: 'Freq', type: 'PhaserFreq', labels: [] },
      { name: 'FeedBack', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 193,
    height: 2,
    longName: 'Mixer 4-1 A',
    shortName: 'Mix4-1A',
    page: { name: 'Mixer', index: 4 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 5, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 8, vert: 1 },
      { name: 'In3', color: ConnColor.BlueRed, horiz: 11, vert: 1 },
      { name: 'In4', color: ConnColor.BlueRed, horiz: 15, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 194,
    height: 2,
    longName: 'Mixer 2-1 A',
    shortName: 'Mix2-1A',
    page: { name: 'Mixer', index: 2 },
    inputs: [
      { name: 'In1', color: ConnColor.BlueRed, horiz: 9, vert: 1 },
      { name: 'In2', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Chain', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Lev1', type: 'MixLevel', labels: [] },
      { name: 'Lev2', type: 'MixLevel', labels: [] },
      { name: 'ExpLin', type: 'ExpLin_2', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 195,
    height: 2,
    longName: 'Modulation Amount',
    shortName: 'ModAmt',
    page: { name: 'Level', index: 13 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 16, vert: 1 },
      { name: 'Mod', color: ConnColor.BlueRed, horiz: 15, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'ModDepth', type: 'Level_100', labels: [] },
      { name: 'ExpLin', type: 'ExpLin_1', labels: [] },
      { name: 'InvertMode', type: 'ModAmtInvert', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 196,
    height: 3,
    longName: 'Osc Percussion',
    shortName: 'OscPerc',
    page: { name: 'Osc', index: 11 },
    inputs: [
      { name: 'Pitch', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
      { name: 'PitchVar', color: ConnColor.BlueRed, horiz: 0, vert: 2 },
      { name: 'Trig', color: ConnColor.Red, horiz: 3, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Red, horiz: 19, vert: 3 },
    ],
    params: [
      { name: 'FreqCoarse', type: 'FreqCoarse', labels: [] },
      { name: 'FreqFine', type: 'FreqFine', labels: [] },
      { name: 'FreqMode', type: 'FreqMode_3', labels: [] },
      { name: 'Kbt', type: 'Kbt_1', labels: [] },
      { name: 'PitchMod', type: 'Level_100', labels: [] },
      { name: 'Decay', type: 'Level_100', labels: [] },
      { name: 'Click', type: 'Level_100', labels: [] },
      { name: 'Punch', type: 'OffOn', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 197,
    height: 2,
    longName: 'Status',
    shortName: 'Status',
    page: { name: 'In/Out', index: 8 },
    inputs: [
    ],
    outputs: [
      { name: 'PatchActive', color: ConnColor.Yellow, horiz: 8, vert: 1 },
      { name: 'VarActive', color: ConnColor.Yellow, horiz: 13, vert: 1 },
      { name: 'VoiceNo', color: ConnColor.Blue, horiz: 18, vert: 1 },
    ],
    params: [
    ],
    modes: [
    ],
  },
  {
    id: 198,
    height: 2,
    longName: 'Pitch Tracker',
    shortName: 'PitchTrack',
    page: { name: 'Note', index: 5 },
    inputs: [
      { name: 'In', color: ConnColor.BlueRed, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Period', color: ConnColor.YellowOrange, horiz: 13, vert: 1 },
      { name: 'Gate', color: ConnColor.YellowOrange, horiz: 15, vert: 1 },
      { name: 'Pitch', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Threshold', type: 'Threshold_127', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 199,
    height: 2,
    longName: 'Monophonic Keyboard',
    shortName: 'MonoKey',
    page: { name: 'In/Out', index: 6 },
    inputs: [
    ],
    outputs: [
      { name: 'Pitch', color: ConnColor.Blue, horiz: 14, vert: 1 },
      { name: 'Gate', color: ConnColor.Yellow, horiz: 16, vert: 1 },
      { name: 'Vel', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Mode', type: 'MonoKeyMode', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 200,
    height: 2,
    longName: 'Random A',
    shortName: 'RandomA',
    page: { name: 'Rnd', index: 0 },
    inputs: [
      { name: 'Rate', color: ConnColor.Blue, horiz: 0, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'Rate', type: 'LfoRate_3', labels: [] },
      { name: 'PolyMono', type: 'PolyMono', labels: [] },
      { name: 'OutputType', type: 'BipPosNeg', labels: [] },
      { name: 'Range', type: 'LfoRange_3', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'Edge', type: 'RndEdge', labels: [] },
      { name: 'StepProb', type: 'RandomAStepProb', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 202,
    height: 3,
    longName: 'Random B',
    shortName: 'RandomB',
    page: { name: 'Rnd', index: 1 },
    inputs: [
      { name: 'Rate', color: ConnColor.Blue, horiz: 0, vert: 1 },
      { name: 'RateVar', color: ConnColor.Blue, horiz: 0, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.Blue, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'Rate', type: 'LfoRate_3', labels: [] },
      { name: 'PolyMono', type: 'PolyMono', labels: [] },
      { name: 'Kbt', type: 'Kbt_4', labels: [] },
      { name: 'RateMod', type: 'Level_100', labels: [] },
      { name: 'StepProb', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'OutputType', type: 'BipPosNeg', labels: [] },
      { name: 'Range', type: 'LfoRange_3', labels: [] },
      { name: 'Edge', type: 'RndEdge', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 204,
    height: 2,
    longName: 'Random Clock A',
    shortName: 'RndClkA',
    page: { name: 'Rnd', index: 2 },
    inputs: [
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
      { name: 'Rst', color: ConnColor.YellowOrange, horiz: 4, vert: 1 },
      { name: 'Seed', color: ConnColor.BlueRed, horiz: 7, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'StepProb', type: 'Level_100', labels: [] },
      { name: 'PolyMono', type: 'PolyMono', labels: [] },
      { name: 'Dice', type: 'OffOn', labels: [] },
      { name: 'OutputType', type: 'BipPosNeg', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 205,
    height: 2,
    longName: 'Random Trig',
    shortName: 'RndTrig',
    page: { name: 'Rnd', index: 4 },
    inputs: [
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
      { name: 'Rst', color: ConnColor.YellowOrange, horiz: 4, vert: 1 },
      { name: 'Seed', color: ConnColor.BlueRed, horiz: 7, vert: 1 },
      { name: 'Prob', color: ConnColor.BlueRed, horiz: 8, vert: 1 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.YellowOrange, horiz: 19, vert: 1 },
    ],
    params: [
      { name: 'StepProb', type: 'Level_100', labels: [] },
      { name: 'StepProbMod', type: 'Level_100', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'PolyMono', type: 'PolyMono', labels: [] },
    ],
    modes: [
    ],
  },
  {
    id: 206,
    height: 3,
    longName: 'Random Clock B',
    shortName: 'RndClkB',
    page: { name: 'Rnd', index: 3 },
    inputs: [
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
      { name: 'Rst', color: ConnColor.YellowOrange, horiz: 0, vert: 2 },
      { name: 'Seed', color: ConnColor.BlueRed, horiz: 3, vert: 2 },
      { name: 'Step', color: ConnColor.Blue, horiz: 11, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'StepProb', type: 'Level_100', labels: [] },
      { name: 'OutputType', type: 'BipPosNeg', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
      { name: 'PolyMono', type: 'PolyMono', labels: [] },
      { name: 'StepProbMod', type: 'Level_100', labels: [] },
    ],
    modes: [
      { name: 'Character', type: 'Rnd_1' },
    ],
  },
  {
    id: 208,
    height: 3,
    longName: 'Random Pattern',
    shortName: 'RndPattern',
    page: { name: 'Rnd', index: 5 },
    inputs: [
      { name: 'Clk', color: ConnColor.YellowOrange, horiz: 0, vert: 1 },
      { name: 'Rst', color: ConnColor.YellowOrange, horiz: 0, vert: 2 },
      { name: 'A', color: ConnColor.Blue, horiz: 3, vert: 1 },
      { name: 'B', color: ConnColor.Blue, horiz: 3, vert: 2 },
      { name: 'StepProb', color: ConnColor.Blue, horiz: 9, vert: 2 },
    ],
    outputs: [
      { name: 'Out', color: ConnColor.BlueRed, horiz: 19, vert: 2 },
    ],
    params: [
      { name: 'PatternA', type: 'RangeBip_128', labels: [] },
      { name: 'PatternB', type: 'Level_100', labels: [] },
      { name: 'StepProb', type: 'RangeBip_128', labels: [] },
      { name: 'LoopCount', type: 'Range_128', labels: [] },
      { name: 'StepProbMod', type: 'Level_100', labels: [] },
      { name: 'OutputType', type: 'BipPosNeg', labels: [] },
      { name: 'Active', type: 'ActiveMonitor', labels: [] },
    ],
    modes: [
      { name: 'Waveform', type: 'RndStepPulse' },
    ],
  },
];

// Module lookup by ID
export const moduleById: Record<number, ModuleType> = {};
for (const module of modules) {
  moduleById[module.id] = module;
}

// Module lookup by short name (lowercase)
export const moduleByName: Record<string, ModuleType> = {};
for (const module of modules) {
  moduleByName[module.shortName.toLowerCase()] = module;
}

// Helper function to get module by ID
export function getModuleById(id: number): ModuleType | undefined {
  return moduleById[id];
}

// Helper function to get module by name
export function getModuleByName(name: string): ModuleType | undefined {
  return moduleByName[name.toLowerCase()];
}

// Get parameter definition for a module parameter
export function getModuleParamDef(moduleId: number, paramIndex: number) {
  const module = moduleById[moduleId];
  if (!module || paramIndex >= module.params.length) return undefined;
  const paramType = module.params[paramIndex].type;
  return paramMap[paramType];
}
