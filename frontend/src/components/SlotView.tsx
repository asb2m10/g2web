// Slot View Component - loads and displays patch data for a slot

import { useSlotInfo } from '../hooks/useApi';
import { PatchView } from './PatchView';
import type { SlotLetter } from '../types/api';

interface SlotViewProps {
  slot: SlotLetter;
}

export function SlotView({ slot }: SlotViewProps) {
  const { data: patch, isLoading, isError, error, refetch } = useSlotInfo(slot);

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 border-2 border-nord-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading slot {slot}...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
        <p className="text-red-400 mb-2">
          Failed to load slot {slot}
        </p>
        <p className="text-red-400/70 text-sm mb-4">
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!patch) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-500">No patch data available</p>
      </div>
    );
  }

  const patchFx = { ...patch, modules: patch.modulesFx };

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Voice Area</h4>
        <PatchView patch={patch} />
      </div>
      {patch.modulesFx.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">FX Area</h4>
          <PatchView patch={patchFx} compact />
        </div>
      )}
    </div>
  );
}
