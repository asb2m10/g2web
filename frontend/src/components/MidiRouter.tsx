// WebMIDI Router Component - routes MIDI input to the synth API

import { useState, useEffect, useCallback } from 'react';
import { playNote, deleteNote } from '../lib/api';

interface MidiInputDevice {
  id: string;
  name: string;
}

export function MidiRouter() {
  const [supported, setSupported] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [devices, setDevices] = useState<MidiInputDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [midiAccess, setMidiAccess] = useState<MIDIAccess | null>(null);
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());

  // Check WebMIDI support
  useEffect(() => {
    if (!navigator.requestMIDIAccess) {
      setSupported(false);
    }
  }, []);

  // Handle MIDI messages
  const handleMidiMessage = useCallback((event: MIDIMessageEvent) => {
    const [status, note, velocity] = event.data as Uint8Array;
    const command = status & 0xf0;

    if (command === 0x90 && velocity > 0) {
      // Note On
      setActiveNotes((prev) => new Set(prev).add(note));
      playNote(note).catch((err) => console.error('Failed to play note:', err));
    } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
      // Note Off
      setActiveNotes((prev) => {
        const next = new Set(prev);
        next.delete(note);
        return next;
      });
      deleteNote(note).catch((err) => console.error('Failed to stop note:', err));
    }
  }, []);

  // Request MIDI access when enabled
  useEffect(() => {
    if (!enabled || !supported) {
      return;
    }

    navigator.requestMIDIAccess().then(
      (access) => {
        setMidiAccess(access);

        const updateDevices = () => {
          const inputs: MidiInputDevice[] = [];
          access.inputs.forEach((input) => {
            inputs.push({ id: input.id, name: input.name || input.id });
          });
          setDevices(inputs);

          // Auto-select first device if none selected
          if (inputs.length > 0 && !selectedDevice) {
            setSelectedDevice(inputs[0].id);
          }
        };

        updateDevices();
        access.onstatechange = updateDevices;
      },
      (err) => {
        console.error('Failed to get MIDI access:', err);
        setSupported(false);
      }
    );

    return () => {
      if (midiAccess) {
        midiAccess.onstatechange = null;
      }
    };
  }, [enabled, supported]);

  // Connect to selected device
  useEffect(() => {
    if (!midiAccess || !selectedDevice) {
      return;
    }

    const input = midiAccess.inputs.get(selectedDevice);
    if (input) {
      input.onmidimessage = handleMidiMessage;
    }

    return () => {
      if (input) {
        input.onmidimessage = null;
      }
    };
  }, [midiAccess, selectedDevice, handleMidiMessage]);

  // Cleanup on disable
  useEffect(() => {
    if (!enabled && midiAccess) {
      midiAccess.inputs.forEach((input) => {
        input.onmidimessage = null;
      });
      setMidiAccess(null);
      setDevices([]);
      setActiveNotes(new Set());
    }
  }, [enabled, midiAccess]);

  if (!supported) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-nord-blue focus:ring-nord-blue"
            />
            <span className="text-gray-300 font-medium">MIDI Input</span>
          </label>

          {enabled && devices.length > 0 && (
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
            >
              {devices.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name}
                </option>
              ))}
            </select>
          )}

          {enabled && devices.length === 0 && (
            <span className="text-gray-500 text-sm">No MIDI devices found</span>
          )}
        </div>

        {enabled && activeNotes.size > 0 && (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-nord-green rounded-full animate-pulse" />
            <span className="text-gray-400 text-sm">{activeNotes.size} notes</span>
          </div>
        )}
      </div>
    </div>
  );
}
