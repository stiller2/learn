"use client";

import Link from "next/link";
import { useProgress } from "../lib/progress";

export function SessionCard({
  number,
  title,
  timeEstimate,
}: {
  number: number;
  title: string;
  timeEstimate: string;
}) {
  const { isComplete } = useProgress();
  const complete = isComplete(number);

  return (
    <Link
      href={`/session/${number}`}
      className={
        complete
          ? "group flex flex-col rounded-xl border border-amber-400/30 bg-amber-400/[0.04] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/50 hover:bg-amber-400/[0.07] hover:shadow-lg hover:shadow-amber-500/[0.03]"
          : "group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/40 hover:bg-zinc-900 hover:shadow-lg hover:shadow-amber-500/[0.03]"
      }
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-zinc-600 group-hover:text-amber-400/80">
          {String(number).padStart(2, "0")}
        </span>
        {complete ? (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400/20 text-[10px] text-amber-300">
            ✓
          </span>
        ) : (
          <span className="text-zinc-600 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-amber-400 group-hover:opacity-100">
            →
          </span>
        )}
      </div>
      <div className="mt-3 text-base font-medium text-zinc-100 transition-colors group-hover:text-amber-50">
        {title}
      </div>
      <div className="mt-auto pt-4 text-sm text-zinc-500">{timeEstimate}</div>
    </Link>
  );
}
