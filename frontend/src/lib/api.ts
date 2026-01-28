// API Client for G2 Synthesizer

import type { SynthStatus, SynthSettings, ApiResponse, SlotLetter, Variation } from '../types/api';

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

  const response = await fetch(`${API_BASE}/synth/slot/${slot}/load`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Failed to load patch: ${response.statusText}`);
  }
  return response.json();
}

export async function setVariation(variation: Variation): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/synth/variation/${variation}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`Failed to set variation: ${response.statusText}`);
  }
  return response.json();
}
