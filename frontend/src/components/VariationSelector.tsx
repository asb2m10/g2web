// Variation selector (1-8)

import { useState } from 'react';
import { useSetVariation } from '../hooks/useApi';
import type { Variation } from '../types/api';

interface VariationSelectorProps {
  initialVariation?: number;
}

const VARIATIONS: Variation[] = [1, 2, 3, 4, 5, 6, 7, 8];

export function VariationSelector({ initialVariation = 1 }: VariationSelectorProps) {
  const [currentVariation, setCurrentVariation] = useState(initialVariation);
  const setVariation = useSetVariation();

  const handleSelect = (variation: Variation) => {
    setCurrentVariation(variation);
    setVariation.mutate(variation);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-8 gap-2">
        {VARIATIONS.map((num) => {
          const isActive = currentVariation === num;

          return (
            <button
              key={num}
              onClick={() => handleSelect(num)}
              disabled={setVariation.isPending}
              className={`
                p-3 rounded-lg font-semibold text-lg transition-all
                ${isActive
                  ? 'bg-nord-orange text-white shadow-lg shadow-nord-orange/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
              `}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
}
