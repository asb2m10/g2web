// Piano Keyboard Component

import { useState } from 'react';
import { playNote, deleteNote } from '../lib/api';

interface KeyboardProps {
  isOpen: boolean;
  onClose: () => void;
}

// Piano key layout: true = black key, false = white key
const OCTAVE_PATTERN = [false, true, false, true, false, false, true, false, true, false, true, false];
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const START_OCTAVE = 3;
const NUM_OCTAVES = 3;
const START_NOTE = START_OCTAVE * 12; // MIDI note for C3

export function Keyboard({ isOpen, onClose }: KeyboardProps) {
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());

  if (!isOpen) return null;

  const handleNoteOn = async (midiNote: number) => {
    setActiveNotes((prev) => new Set(prev).add(midiNote));
    try {
      await playNote(midiNote);
    } catch (err) {
      console.error('Failed to play note:', err);
    }
  };

  const handleNoteOff = async (midiNote: number) => {
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.delete(midiNote);
      return next;
    });
    try {
      await deleteNote(midiNote);
    } catch (err) {
      console.error('Failed to stop note:', err);
    }
  };

  // Generate keys for all octaves
  const keys: { midiNote: number; isBlack: boolean; noteName: string }[] = [];
  for (let octave = 0; octave < NUM_OCTAVES; octave++) {
    for (let note = 0; note < 12; note++) {
      const midiNote = START_NOTE + octave * 12 + note;
      keys.push({
        midiNote,
        isBlack: OCTAVE_PATTERN[note],
        noteName: NOTE_NAMES[note] + (START_OCTAVE + octave),
      });
    }
  }

  const whiteKeys = keys.filter((k) => !k.isBlack);
  const blackKeys = keys.filter((k) => k.isBlack);

  // Calculate black key positions based on white key index
  const getBlackKeyPosition = (midiNote: number) => {
    const noteInOctave = midiNote % 12;
    const octaveOffset = Math.floor((midiNote - START_NOTE) / 12);
    const whiteKeyWidth = 40;
    const whiteKeysPerOctave = 7;

    // Position mapping for black keys within octave
    const blackKeyOffsets: Record<number, number> = {
      1: 0.65,  // C#
      3: 1.75,  // D#
      6: 3.7,   // F#
      8: 4.75,  // G#
      10: 5.8,  // A#
    };

    const offset = blackKeyOffsets[noteInOctave] ?? 0;
    return (octaveOffset * whiteKeysPerOctave + offset) * whiteKeyWidth;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50" onClick={onClose}>
      <div
        className="bg-gray-800 rounded-t-lg p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">Keyboard</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="relative" style={{ height: 140 }}>
          {/* White keys */}
          <div className="flex">
            {whiteKeys.map((key) => (
              <button
                key={key.midiNote}
                onMouseDown={() => handleNoteOn(key.midiNote)}
                onMouseUp={() => handleNoteOff(key.midiNote)}
                onMouseLeave={() => activeNotes.has(key.midiNote) && handleNoteOff(key.midiNote)}
                className={`
                  w-10 h-32 border border-gray-400 rounded-b
                  ${activeNotes.has(key.midiNote) ? 'bg-nord-blue' : 'bg-white hover:bg-gray-100'}
                  transition-colors
                `}
              >
                <span className="text-gray-500 text-xs block mt-24">{key.noteName}</span>
              </button>
            ))}
          </div>

          {/* Black keys */}
          <div className="absolute top-0 left-0">
            {blackKeys.map((key) => (
              <button
                key={key.midiNote}
                onMouseDown={() => handleNoteOn(key.midiNote)}
                onMouseUp={() => handleNoteOff(key.midiNote)}
                onMouseLeave={() => activeNotes.has(key.midiNote) && handleNoteOff(key.midiNote)}
                className={`
                  absolute w-6 h-20 rounded-b z-10
                  ${activeNotes.has(key.midiNote) ? 'bg-nord-blue' : 'bg-gray-900 hover:bg-gray-700'}
                  transition-colors
                `}
                style={{ left: getBlackKeyPosition(key.midiNote) }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
