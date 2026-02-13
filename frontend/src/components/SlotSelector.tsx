// Slot selector (A, B, C, D)

import { useSelectSlot } from '../hooks/useApi';
import type { SlotLetter, SlotInfo } from '../types/api';

interface SlotSelectorProps {
  slots: SlotInfo[];
  activeSlot: string;
}

const SLOT_LETTERS: SlotLetter[] = ['A', 'B', 'C', 'D'];

export function SlotSelector({ slots, activeSlot }: SlotSelectorProps) {
  const selectSlot = useSelectSlot();

  const handleSelect = (slot: SlotLetter) => {
    selectSlot.mutate(slot);
  };

  const getSlotInfo = (letter: SlotLetter) => {
    return slots.find((s) => s.slot === letter);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-3">
        {SLOT_LETTERS.map((letter) => {
          const slot = getSlotInfo(letter);
          const isActive = activeSlot === letter;

          return (
            <button
              key={letter}
              onClick={() => handleSelect(letter)}
              disabled={selectSlot.isPending}
              className={`
                relative p-4 rounded-lg font-bold text-2xl transition-all
                ${isActive
                  ? 'bg-nord-blue text-white shadow-lg shadow-nord-blue/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
              `}
            >
              {letter}
              {slot?.name && slot.name !== `Slot ${letter}` && (
                <span className="absolute bottom-1 left-0 right-0 text-xs font-normal truncate px-1">
                  {slot.name}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
