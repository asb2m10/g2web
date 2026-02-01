// API Client for G2 Synthesizer

import type { SynthStatus, SynthSettings, ApiResponse, SlotLetter, Variation, Patch, BankDef } from '../types/api';

const API_BASE = 'api';

export async function getSynthStatus(): Promise<SynthStatus> {
  const response = await fetch(`${API_BASE}/status`);
  if (!response.ok) {
    throw new Error(`Failed to get synth status: ${response.statusText}`);
  }
  return response.json();
}

export async function getSynthSettings(): Promise<SynthSettings> {
  const response = await fetch(`${API_BASE}/settings`);
  if (!response.ok) {
    throw new Error(`Failed to get synth settings: ${response.statusText}`);
  }
  return response.json();
}

export async function selectSlot(slot: SlotLetter): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/synth/slot/${slot}/select`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`Failed to select slot: ${response.statusText}`);
  }
  return response.json();
}

export async function loadPatch(slot: SlotLetter, file: File): Promise<ApiResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/synth/slot/${slot}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Failed to load patch: ${response.statusText}`);
  }
  return response.json();
}

export async function setVariation(variation: Variation): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/variation/${variation}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`Failed to set variation: ${response.statusText}`);
  }
  return response.json();
}

export async function getSlotInfo(slot: SlotLetter): Promise<Patch> {
  const response = await fetch(`${API_BASE}/slot/${slot}`);
  if (!response.ok) {
    throw new Error(`Failed to get slot info: ${response.statusText}`);
  }
  return response.json();
}

export async function playNote(midiNote: number): Promise<void> {
  const response = await fetch(`${API_BASE}/note/${midiNote}`, {
    method: 'PUT',
  });
  if (!response.ok) {
    throw new Error(`Failed to play note: ${response.statusText}`);
  }
}

export async function deleteNote(midiNote: number): Promise<void> {
  const response = await fetch(`${API_BASE}/note/${midiNote}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete note: ${response.statusText}`);
  }
}

export async function getBank(): Promise<BankDef[]> {
  const response = await fetch(`${API_BASE}/bank`);
  if (!response.ok) {
    throw new Error(`Failed to get bank: ${response.statusText}`);
  }
  return response.json();
}

export async function selectPerformance(bank: number, patch: number): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/bank/p/${bank}/${patch}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`Failed to select performance: ${response.statusText}`);
  }
  return response.json();
}

export async function selectPatch(slot: string, bank: number, patch: number): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/bank/${slot}/${bank}/${patch}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`Failed to select patch: ${response.statusText}`);
  }
  return response.json();
}
