// Main synth control panel

import { useState } from 'react';
import { useSynthSettings } from '../hooks/useApi';
import { ConnectionStatus } from './ConnectionStatus';
import { SlotSelector } from './SlotSelector';
import { VariationSelector } from './VariationSelector';
import { PatchUpload } from './PatchUpload';
import { SlotView } from './SlotView';
import { Keyboard } from './Keyboard';
import { BankSelector } from './BankSelector';
import { MidiRouter } from './MidiRouter';
import type { SlotLetter } from '../types/api';

export function SynthPanel() {
  const { data: settings, isLoading, isError } = useSynthSettings();
  const [viewSlot, setViewSlot] = useState<SlotLetter | null>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [loadPatchOpen, setLoadPatchOpen] = useState(false);

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

            {/* Bank selector */}
            <BankSelector />

            {/* Slot selector */}
            <SlotSelector slots={settings.slots} activeSlot={settings.focus} />

            {/* Slot view tabs */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-300">Patch View</h2>
                <div className="flex gap-2">
                  {(['A', 'B', 'C', 'D'] as SlotLetter[]).map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setViewSlot(viewSlot === slot ? null : slot)}
                      className={`
                        px-3 py-1 rounded text-sm font-medium transition-colors
                        ${viewSlot === slot
                          ? 'bg-nord-blue text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }
                      `}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {viewSlot && <SlotView slot={viewSlot} />}
            </div>

            {/* Variation selector */}
            <VariationSelector />
          </>
        )}

        {/* MIDI Input routing */}
        <MidiRouter />
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-600 text-sm">
        Nord G2 Web Controller
      </footer>
    </div>
  );
}
