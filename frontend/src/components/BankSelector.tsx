// Bank Selector Component

import { useState, useEffect } from 'react';
import { getBank } from '../lib/api';
import { useSynthSettings, useSelectPerformance, useSelectPatch, useSavePatch } from '../hooks/useApi';
import type { BankDef } from '../types/api';

export function BankSelector() {
  const [banks, setBanks] = useState<BankDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveBank, setSaveBank] = useState('');
  const [savePatchNum, setSavePatchNum] = useState('');

  const { data: settings } = useSynthSettings();
  const selectPerformance = useSelectPerformance();
  const selectPatch = useSelectPatch();
  const savePatch = useSavePatch();

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

  const getEmptySlots = (): Array<{ bank: number; patch: number }> => {
    const occupied = new Set(banks.filter(b => b.type === 'Pch2').map(b => `${b.bank}:${b.patch}`));
    const empty: Array<{ bank: number; patch: number }> = [];
    for (let b = 1; b <= 32 && empty.length < 16; b++) {
      for (let p = 1; p <= 127 && empty.length < 16; p++) {
        if (!occupied.has(`${b}:${p}`)) empty.push({ bank: b, patch: p });
      }
    }
    return empty;
  };

  const handleSaveClick = () => {
    if (!selectedValue) return;
    const [, bank, patch] = selectedValue.split(':');
    setSaveBank(bank);
    setSavePatchNum(patch);
    setSaveDialogOpen(true);
  };

  const handleSaveConfirm = () => {
    if (!settings) return;
    const bank = parseInt(saveBank);
    const patch = parseInt(savePatchNum);
    if (isNaN(bank) || isNaN(patch)) return;
    savePatch.mutate({ slot: settings.focus, bank, patch });
    setSaveDialogOpen(false);
  };

  return (
    <div className="flex gap-2">
      <select
        value={selectedValue}
        onChange={handleChange}
        className="flex-1 bg-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nord-blue"
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
      <button
        onClick={handleSaveClick}
        disabled={!selectedValue || savePatch.isPending}
        className="px-3 py-2 text-sm text-white bg-nord-blue rounded hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Save
      </button>

      {saveDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={(e) => { if (e.target === e.currentTarget) setSaveDialogOpen(false); }}
        >
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-xl w-72">
            <h4 className="text-white text-sm font-semibold mb-3">Save Patch</h4>

            <div className="flex gap-3 mb-3">
              <div className="flex-1">
                <label className="text-gray-400 text-xs block mb-1">Bank (1–32)</label>
                <input
                  type="number"
                  min={1}
                  max={32}
                  value={saveBank}
                  onChange={(e) => setSaveBank(e.target.value)}
                  className="w-full bg-gray-700 text-white text-sm rounded px-2 py-1.5 border border-gray-600 focus:outline-none focus:border-nord-blue"
                />
              </div>
              <div className="flex-1">
                <label className="text-gray-400 text-xs block mb-1">Patch (1–127)</label>
                <input
                  type="number"
                  min={1}
                  max={127}
                  value={savePatchNum}
                  onChange={(e) => setSavePatchNum(e.target.value)}
                  className="w-full bg-gray-700 text-white text-sm rounded px-2 py-1.5 border border-gray-600 focus:outline-none focus:border-nord-blue"
                />
              </div>
            </div>

            <div className="mb-3">
              <p className="text-gray-400 text-xs mb-1.5">Empty slots</p>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                {getEmptySlots().map(({ bank, patch }) => (
                  <button
                    key={`${bank}:${patch}`}
                    onClick={() => { setSaveBank(String(bank)); setSavePatchNum(String(patch)); }}
                    className={`text-xs px-2 py-0.5 rounded border ${
                      saveBank === String(bank) && savePatchNum === String(patch)
                        ? 'bg-nord-blue border-nord-blue text-white'
                        : 'border-gray-600 text-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {bank}:{patch}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setSaveDialogOpen(false)}
                className="text-xs text-gray-400 hover:text-white px-3 py-1 rounded border border-gray-600 hover:border-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveConfirm}
                disabled={savePatch.isPending}
                className="text-xs text-white bg-nord-blue hover:brightness-110 px-3 py-1 rounded disabled:opacity-40"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
