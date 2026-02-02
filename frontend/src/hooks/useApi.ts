// React Query hooks for G2 API

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSynthStatus,
  getSynthSettings,
  selectSlot,
  loadPatch,
  setVariation,
  setParameter,
  getSlotInfo,
} from '../lib/api';
import type { SlotLetter, Variation } from '../types/api';

// Query keys
export const queryKeys = {
  status: ['api', 'status'] as const,
  settings: ['api', 'settings'] as const,
  slot: (slot: SlotLetter) => ['api', 'slot', slot] as const,
};

// Status query with polling
export function useSynthStatus() {
  return useQuery({
    queryKey: queryKeys.status,
    queryFn: getSynthStatus,
    refetchInterval: 3000, // Poll every 3 seconds
    retry: false,
  });
}

// Settings query
export function useSynthSettings() {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: getSynthSettings,
    retry: false,
  });
}

// Select slot mutation
export function useSelectSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slot: SlotLetter) => selectSlot(slot),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings });
    },
  });
}

// Load patch mutation
export function useLoadPatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slot, file }: { slot: SlotLetter; file: File }) =>
      loadPatch(slot, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings });
    },
  });
}

// Set variation mutation
export function useSetVariation() {
  return useMutation({
    mutationFn: (variation: Variation) => setVariation(variation),
  });
}

// Set parameter mutation
export function useSetParameter() {
  return useMutation({
    mutationFn: ({
      location,
      module,
      parameter,
      value,
      variation,
    }: {
      location: 'FX' | 'VA' | 'PATCH';
      module: number;
      parameter: number;
      value: number;
      variation: number;
    }) => setParameter(location, module, parameter, value, variation),
  });
}

// Slot info query
export function useSlotInfo(slot: SlotLetter | null) {
  return useQuery({
    queryKey: queryKeys.slot(slot!),
    queryFn: () => getSlotInfo(slot!),
    enabled: !!slot,
    retry: false,
  });
}
