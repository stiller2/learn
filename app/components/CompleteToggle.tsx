"use client";

import { useProgress } from "../lib/progress";

export function CompleteToggle({ sessionNumber }: { sessionNumber: number }) {
  const { isComplete, toggle } = useProgress();
  const complete = isComplete(sessionNumber);

  return (
    <button
      type="button"
      onClick={() => toggle(sessionNumber)}
      className={
        complete
          ? "flex items-center gap-2 rounded-lg border border-amber-400/50 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-200 transition-colors hover:bg-amber-400/15"
          : "flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/30 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:border-amber-500/30 hover:text-amber-100"
      }
    >
      <span>{complete ? "✓" : "○"}</span>
      {complete ? "Completed" : "Mark complete"}
    </button>
  );
}
