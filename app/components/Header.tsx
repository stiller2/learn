"use client";

import Link from "next/link";
import { useProgress } from "../lib/progress";

export function Header() {
  const { count } = useProgress();

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-950/75 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-medium tracking-wide text-zinc-400 transition-colors hover:text-zinc-100"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 transition-shadow group-hover:shadow-[0_0_8px_2px_rgba(251,191,36,0.5)]" />
          Technical Fluency for Startups
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link
            href="/glossary"
            className="text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Glossary
          </Link>
          <span className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 font-mono text-xs text-zinc-400">
            {count}/17
          </span>
        </nav>
      </div>
    </header>
  );
}
