// Connection status indicator

import { useSynthStatus } from '../hooks/useApi';

export function ConnectionStatus() {
  const { data: status, isLoading, isError } = useSynthStatus();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
        <span className="text-sm text-gray-400">Connecting...</span>
      </div>
    );
  }

  if (isError || !status?.usb_available) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <span className="text-sm text-gray-400">USB Not Available</span>
      </div>
    );
  }

  if (!status.connected) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-orange-500" />
        <span className="text-sm text-gray-400">G2 Disconnected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-green-500" />
      <span className="text-sm text-gray-400">G2 Connected</span>
    </div>
  );
}
