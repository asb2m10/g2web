// Bank Selector Component

import { useState, useEffect } from 'react';
import { getBank } from '../lib/api';
import { useSynthSettings, useSelectPerformance, useSelectPatch } from '../hooks/useApi';
import type { BankDef } from '../types/api';

export function BankSelector() {
  const [banks, setBanks] = useState<BankDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const { data: settings } = useSynthSettings();
  const selectPerformance = useSelectPerformance();
  const selectPatch = useSelectPatch();

  useEffect(() => {
    async function fetchBanks() {
      try {
        setLoading(true);
        const data = await getBank();
        setBanks(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load banks');
      } finally {
        setLoading(false);
      }
    }
    fetchBanks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);

    if (!value) return;

    const [type, bank, patch] = value.split(':');
    const bankNum = parseInt(bank);
    const patchNum = parseInt(patch);

    if (type.toLowerCase() === 'prf2') {
      selectPerformance.mutate({ bank: bankNum, patch: patchNum });
    } else if (type.toLowerCase() === 'pch2' && settings) {
      selectPatch.mutate({ slot: settings.focus, bank: bankNum, patch: patchNum });
    }
  };

  const formatBankItem = (item: BankDef) => {
    return `${item.type} ${item.bank}:${item.patch} - ${item.name} [${item.category}]`;
  };

  if (loading) {
    return (
      <div className="text-gray-400 text-sm">Loading banks...</div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-sm">{error}</div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">Bank</label>
      <select
        value={selectedValue}
        onChange={handleChange}
        className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nord-blue"
      >
        <option value="">Select a patch...</option>
        {banks.map((item, idx) => (
          <option
            key={idx}
            value={`${item.type}:${item.bank}:${item.patch}`}
          >
            {formatBankItem(item)}
          </option>
        ))}
      </select>
    </div>
  );
}
