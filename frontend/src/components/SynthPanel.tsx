// Main synth control panel

import { useState } from 'react';
import { useSynthSettings, useSetMode, queryKeys } from '../hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { ConnectionStatus } from './ConnectionStatus';
import { SlotSelector } from './SlotSelector';
import { VariationSelector } from './VariationSelector';
import { PatchUpload } from './PatchUpload';
import { SlotView } from './SlotView';
import { Keyboard } from './Keyboard';
import { BankSelector } from './BankSelector';

import type { SlotLetter } from '../types/api';

export function SynthPanel() {
  const { data: settings, isLoading, isError, isFetching } = useSynthSettings();
  const setMode = useSetMode();
  const queryClient = useQueryClient();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [loadPatchOpen, setLoadPatchOpen] = useState(false);

  const handleModeToggle = () => {
    if (!settings) return;
    const newMode = settings.mode === 'performance' ? 'patch' : 'performance';
    setMode.mutate(newMode);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-nord-blue">G2 Controller</h1>
            {settings && (
              <button
                onClick={handleModeToggle}
                disabled={setMode.isPending}
                className="text-sm text-gray-400 bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors cursor-pointer disabled:opacity-50"
              >
                {settings.mode}
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLoadPatchOpen(true)}
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors"
            >
              Load Patch
            </button>
            <button
              onClick={() => setKeyboardOpen(true)}
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors"
            >
              Keyboard
            </button>
            <ConnectionStatus />
          </div>
        </div>
      </header>

      <Keyboard isOpen={keyboardOpen} onClose={() => setKeyboardOpen(false)} />

      {/* Load Patch popup */}
      {loadPatchOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setLoadPatchOpen(false)}>
          <div
            className="bg-gray-800 rounded-lg p-4 shadow-xl w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Load Patch</h3>
              <button
                onClick={() => setLoadPatchOpen(false)}
                className="text-gray-400 hover:text-white text-xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(['A', 'B', 'C', 'D'] as SlotLetter[]).map((slot) => (
                <PatchUpload key={slot} slot={slot} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
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
              <div className="flex items-center gap-3">
                <div>
                  <span className="text-gray-500 text-sm">Focus</span>
                  <p className="font-medium text-nord-blue text-xl">
                    {settings.focus}
                  </p>
                </div>
                <button
                  onClick={() => { queryClient.invalidateQueries({ queryKey: queryKeys.settings }); queryClient.invalidateQueries({ queryKey: ['api', 'slot'] }); }}
                  disabled={isFetching}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors cursor-pointer disabled:opacity-50"
                  title="Refresh settings"
                >
                  <svg className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4.49 15a8 8 0 0013.02 2.51M19.51 9A8 8 0 006.49 6.49" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Selectors */}
            <div className="space-y-1">
              <BankSelector />
              <SlotSelector slots={settings.slots} activeSlot={settings.focus} />
              <VariationSelector />
            </div>

            {/* Slot modules */}
            <SlotView slot={settings.focus as SlotLetter} />
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
