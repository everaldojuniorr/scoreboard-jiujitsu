"use client";

type MatchControlsProps = {
  onUndo: () => void;
  onReset: () => void;
  canUndo: boolean;
};

export function MatchControls({ onUndo, onReset, canUndo }: MatchControlsProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center px-3 pt-3 sm:pt-4">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-neutral-800/80 bg-neutral-950/90 px-2 py-1.5 shadow-lg backdrop-blur-sm sm:gap-3 sm:px-3">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-white transition enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
        >
          Desfazer
        </button>
        <span className="h-4 w-px bg-white/20" aria-hidden />
        <button
          type="button"
          onClick={onReset}
          className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 sm:text-sm"
        >
          Zerar luta
        </button>
      </div>
    </div>
  );
}
