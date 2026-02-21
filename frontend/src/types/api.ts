// API Types for G2 Synthesizer

export interface SlotInfo {
  slot: string;
  name: string;
  available: boolean;
}

export interface SynthSettings {
  name: string;
  mode: string;
  focus: string;
  master_clock_bpm: number;
  slots: SlotInfo[];
}

export interface SynthStatus {
  usb_available: boolean;
  connected: boolean;
}

export interface ApiResponse {
  status: string;
  slot?: string;
  patch?: string;
  variation?: number;
}

export type SlotLetter = 'A' | 'B' | 'C' | 'D';
export type Variation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// Patch/Module types from /api/slot/{slot}
export interface Parameter {
  name: string;
  type: number;
  values: number[];
}

export interface Module {
  name: string;
  instance: number;
  type: number;
  typeName: string;
  pos_x: number;
  pos_y: number;
  color: number;
  parameters: Parameter[];
}

export interface Patch {
  name: string;
  slot: string;
  activeVariation: number;
  allocatedVoice: number;
  modules: Module[];
  modulesFx: Module[];
}

export interface BankDef {
  type: 'Pch2' | 'Prf2';
  bank: number;
  patch: number;
  name: string;
  category: string;
}
