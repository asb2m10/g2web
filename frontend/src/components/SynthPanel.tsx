// Main synth control panel

import { useSynthSettings } from '../hooks/useApi';
import { ConnectionStatus } from './ConnectionStatus';
import { SlotSelector } from './SlotSelector';
import { VariationSelector } from './VariationSelector';
import { PatchUpload } from './PatchUpload';
import type { SlotLetter } from '../types/api';

export function SynthPanel() {
  const { data: settings, isLoading, isError } = useSynthSettings();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-nord-blue">G2 Controller</h1>
            {settings && (
              <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
                {settings.mode}
              </span>
            )}
          </div>
          <ConnectionStatus />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto p-6 space-y-8">
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400">Loading synth settings...</div>
          </div>
        )}

        {isError && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <p className="text-red-400">
              Unable to connect to G2 API. Make sure the backend is running.
            </p>
          </div>
        )}

        {settings && (
          <>
            {/* Status bar */}
            <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-gray-500 text-sm">Name</span>
                  <p className="font-medium">{settings.name}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">BPM</span>
                  <p className="font-medium text-nord-yellow">
                    {settings.master_clock_bpm}
                  </p>
                </div>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Focus</span>
                <p className="font-medium text-nord-blue text-xl">
                  {settings.focus}
                </p>
              </div>
            </div>

            {/* Slot selector */}
            <SlotSelector slots={settings.slots} activeSlot={settings.focus} />

            {/* Variation selector */}
            <VariationSelector />

            {/* Patch upload */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-300">Load Patch</h2>
              <div className="grid grid-cols-2 gap-4">
                {(['A', 'B', 'C', 'D'] as SlotLetter[]).map((slot) => (
                  <PatchUpload key={slot} slot={slot} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-600 text-sm">
        Nord G2 Web Controller
      </footer>
    </div>
  );
}
