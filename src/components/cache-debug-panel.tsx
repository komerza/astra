import { useState, useEffect } from "react";
import { komerzaCache, useKomerzaCacheWarming } from "@/lib/komerza-cache";
import { Button } from "@/components/ui/button";

export function CacheDebugPanel() {
  const [stats, setStats] = useState({
    size: 0,
    keys: [] as string[],
    requestCount: 0,
    pendingRequests: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const { warmCache, clearCache } = useKomerzaCacheWarming();

  const refreshStats = () => {
    setStats(komerzaCache.getStats());
  };

  useEffect(() => {
    refreshStats();
    const interval = setInterval(refreshStats, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const handleClearCache = () => {
    clearCache();
    refreshStats();
  };

  const handleWarmCache = async () => {
    await warmCache();
    refreshStats();
  };

  // Show/hide with keyboard shortcut
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          variant="outline"
          className="bg-black/80 text-white border-white/20 hover:bg-black/90"
        >
          Cache ({stats.size})
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 border border-white/20 rounded-lg p-4 text-white text-sm max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Komerza Cache</h3>
        <Button
          onClick={() => setIsVisible(false)}
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 text-white hover:bg-white/10"
        >
          ×
        </Button>
      </div>

      <div className="space-y-2 mb-3">
        <div>Entries: {stats.size}</div>
        <div>API Calls: {stats.requestCount}</div>
        <div>Pending: {stats.pendingRequests}</div>
        <div className="text-xs text-gray-400">
          Keys: {stats.keys.length > 0 ? stats.keys.join(", ") : "None"}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleWarmCache}
          size="sm"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs"
        >
          Warm
        </Button>
        <Button
          onClick={handleClearCache}
          size="sm"
          variant="outline"
          className="flex-1 border-red-500 text-red-400 hover:bg-red-500/10 text-xs"
        >
          Clear
        </Button>
      </div>

      <div className="text-xs text-gray-500 mt-2">Ctrl+Shift+C to toggle</div>
    </div>
  );
}
