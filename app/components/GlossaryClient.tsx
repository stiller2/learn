"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCustomTerms } from "../lib/customTerms";
import type { AggregatedGlossaryTerm } from "../data/course";

type Row = {
  key: string;
  term: string;
  definition: string;
  source:
    | { type: "session"; number: number; title: string }
    | { type: "custom"; id: string };
};

export function GlossaryClient({
  entries,
}: {
  entries: AggregatedGlossaryTerm[];
}) {
  const [query, setQuery] = useState("");
  const [newTerm, setNewTerm] = useState("");
  const [newDefinition, setNewDefinition] = useState("");
  const { terms: customTerms, addTerm, removeTerm } = useCustomTerms();

  const rows = useMemo<Row[]>(() => {
    const fromCourse: Row[] = entries.map((entry) => ({
      key: `s${entry.sessionNumber}-${entry.term}`,
      term: entry.term,
      definition: entry.definition,
      source: {
        type: "session",
        number: entry.sessionNumber,
        title: entry.sessionTitle,
      },
    }));
    const fromCustom: Row[] = customTerms.map((entry) => ({
      key: `custom-${entry.id}`,
      term: entry.term,
      definition: entry.definition,
      source: { type: "custom", id: entry.id },
    }));
    return [...fromCourse, ...fromCustom].sort((a, b) =>
      a.term.localeCompare(b.term),
    );
  }, [entries, customTerms]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (row) =>
        row.term.toLowerCase().includes(q) ||
        row.definition.toLowerCase().includes(q),
    );
  }, [rows, query]);

  return (
    <div className="mt-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search terms and definitions…"
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none"
      />

      <div className="mt-2 text-sm text-zinc-500">
        {filtered.length} of {rows.length} terms
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-zinc-800">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              <th className="w-1/4 px-4 py-2.5 text-xs font-medium tracking-wide text-zinc-500 uppercase">
                Term
              </th>
              <th className="px-4 py-2.5 text-xs font-medium tracking-wide text-zinc-500 uppercase">
                Definition
              </th>
              <th className="w-1/6 px-4 py-2.5 text-xs font-medium tracking-wide text-zinc-500 uppercase">
                From
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr
                key={row.key}
                className={i % 2 === 1 ? "bg-zinc-900/25" : "bg-transparent"}
              >
                <td className="px-4 py-3 align-top font-medium text-zinc-100">
                  {row.term}
                </td>
                <td className="px-4 py-3 align-top font-serif leading-7 text-zinc-400">
                  {row.definition}
                </td>
                <td className="px-4 py-3 align-top text-sm">
                  {row.source.type === "session" ? (
                    <Link
                      href={`/session/${row.source.number}`}
                      className="text-zinc-500 transition-colors hover:text-amber-300"
                    >
                      Session {row.source.number}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400/80">Your addition</span>
                      <button
                        type="button"
                        onClick={() => {
                          const source = row.source;
                          if (source.type === "custom") removeTerm(source.id);
                        }}
                        className="text-zinc-600 transition-colors hover:text-red-400"
                        aria-label={`Remove ${row.term}`}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-6 text-center font-serif text-zinc-500"
                >
                  No terms match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-amber-400/70 uppercase">
          <span className="h-px w-4 bg-amber-400/50" />
          Add your own term
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const term = newTerm.trim();
            const definition = newDefinition.trim();
            if (!term || !definition) return;
            addTerm(term, definition);
            setNewTerm("");
            setNewDefinition("");
          }}
          className="mt-4 flex flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 p-5"
        >
          <input
            type="text"
            value={newTerm}
            onChange={(e) => setNewTerm(e.target.value)}
            placeholder="Term"
            className="rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none"
          />
          <textarea
            value={newDefinition}
            onChange={(e) => setNewDefinition(e.target.value)}
            placeholder="Definition, in your own words"
            rows={3}
            className="resize-none rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2 font-serif text-zinc-100 placeholder:font-sans placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none"
          />
          <button
            type="submit"
            className="self-start rounded-md border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-200 transition-colors hover:bg-amber-400/15"
          >
            Add term
          </button>
        </form>
      </section>
    </div>
  );
}
