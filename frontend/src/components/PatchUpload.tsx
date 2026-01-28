// Drag & drop patch upload

import { useState, useCallback } from 'react';
import { useLoadPatch } from '../hooks/useApi';
import type { SlotLetter } from '../types/api';

interface PatchUploadProps {
  slot: SlotLetter;
}

export function PatchUpload({ slot }: PatchUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const loadPatch = useLoadPatch();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.name.endsWith('.pch2')) {
        loadPatch.mutate({ slot, file });
      }
    },
    [slot, loadPatch]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        loadPatch.mutate({ slot, file });
      }
      e.target.value = '';
    },
    [slot, loadPatch]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer
        ${isDragging
          ? 'border-nord-blue bg-nord-blue/10'
          : 'border-gray-600 hover:border-gray-500'
        }
        ${loadPatch.isPending ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      <input
        type="file"
        accept=".pch2"
        onChange={handleFileSelect}
        className="hidden"
        id={`patch-upload-${slot}`}
      />
      <label
        htmlFor={`patch-upload-${slot}`}
        className="cursor-pointer block"
      >
        <div className="text-4xl mb-2">📁</div>
        <p className="text-gray-400">
          {loadPatch.isPending
            ? 'Uploading...'
            : `Drop .pch2 file here for Slot ${slot}`}
        </p>
        <p className="text-gray-500 text-sm mt-1">or click to browse</p>
      </label>
      {loadPatch.isError && (
        <p className="text-red-400 text-sm mt-2">
          Error: {loadPatch.error.message}
        </p>
      )}
      {loadPatch.isSuccess && (
        <p className="text-green-400 text-sm mt-2">
          Loaded: {loadPatch.data.patch}
        </p>
      )}
    </div>
  );
}
