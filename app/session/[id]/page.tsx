import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "../../components/Header";
import { PARTS, getSession, sessions } from "../../data/course";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-amber-400/70 uppercase">
      <span className="h-px w-4 bg-amber-400/50" />
      {children}
    </h2>
  );
}

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const number = Number(id);
  const session = getSession(number);

  if (!session) {
    notFound();
  }

  const part = PARTS.find((p) => p.number === session.part);
  const prev = getSession(session.number - 1);
  const next = getSession(session.number + 1);

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:py-20">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.2em] text-amber-400/80 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Part {session.part} — {part?.title}
          <span className="text-zinc-700">·</span>
          <span className="text-zinc-500">{session.timeEstimate}</span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          <span className="text-zinc-600">
            {String(session.number).padStart(2, "0")}
          </span>{" "}
          {session.title}
        </h1>

        <section className="mt-14">
          <SectionLabel>Why this matters</SectionLabel>
          <p className="mt-4 font-serif text-lg leading-8 text-zinc-300">
            {session.whyItMatters}
          </p>
        </section>

        <section className="mt-14">
          <SectionLabel>Objectives</SectionLabel>
          <ul className="mt-4 flex flex-col gap-3">
            {session.objectives.map((objective) => (
              <li
                key={objective}
                className="flex gap-3 font-serif text-lg leading-7 text-zinc-300"
              >
                <span className="mt-0.5 text-amber-400/80">✓</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <SectionLabel>Resources</SectionLabel>
          <ul className="mt-4 flex flex-col gap-2.5">
            {session.resources.map((resource) => (
              <li key={resource.title}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-900/30 px-4 py-3.5 transition-colors hover:border-amber-500/30 hover:bg-zinc-900"
                >
                  <span className="text-zinc-200 transition-colors group-hover:text-amber-50">
                    {resource.title}
                  </span>
                  <span className="shrink-0 text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:text-amber-400">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <SectionLabel>Do</SectionLabel>
          <p className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/30 p-5 font-serif text-lg leading-8 text-zinc-300">
            {session.doDescription}
          </p>
        </section>

        <section className="mt-14">
          <SectionLabel>Glossary</SectionLabel>
          <div className="mt-4 overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/60">
                  <th className="w-1/3 px-4 py-2.5 text-xs font-medium tracking-wide text-zinc-500 uppercase">
                    Term
                  </th>
                  <th className="px-4 py-2.5 text-xs font-medium tracking-wide text-zinc-500 uppercase">
                    Definition
                  </th>
                </tr>
              </thead>
              <tbody>
                {session.glossary.map((entry, i) => (
                  <tr
                    key={entry.term}
                    className={
                      i % 2 === 1
                        ? "bg-zinc-900/25"
                        : "bg-transparent"
                    }
                  >
                    <td className="w-1/3 px-4 py-3 align-top font-medium text-zinc-100">
                      {entry.term}
                    </td>
                    <td className="px-4 py-3 align-top font-serif leading-7 text-zinc-400">
                      {entry.definition}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 rounded-lg border-l-2 border-amber-400/70 bg-amber-400/[0.04] p-5">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-amber-400/90 uppercase">
            Done when
          </h2>
          <p className="mt-3 font-serif text-lg leading-8 text-zinc-200">
            {session.doneWhen}
          </p>
        </section>

        <nav className="mt-16 flex items-stretch justify-between gap-4 border-t border-zinc-800/80 pt-8">
          {prev ? (
            <Link
              href={`/session/${prev.number}`}
              className="group flex max-w-[48%] flex-col rounded-lg border border-zinc-800 p-4 transition-colors hover:border-amber-500/30 hover:bg-zinc-900/50"
            >
              <span className="flex items-center gap-1.5 text-xs tracking-wide text-zinc-600 uppercase transition-colors group-hover:text-amber-400/80">
                <span className="transition-transform group-hover:-translate-x-0.5">
                  ←
                </span>
                Previous
              </span>
              <span className="mt-1.5 text-zinc-300 transition-colors group-hover:text-amber-50">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/session/${next.number}`}
              className="group ml-auto flex max-w-[48%] flex-col items-end rounded-lg border border-zinc-800 p-4 text-right transition-colors hover:border-amber-500/30 hover:bg-zinc-900/50"
            >
              <span className="flex items-center gap-1.5 text-xs tracking-wide text-zinc-600 uppercase transition-colors group-hover:text-amber-400/80">
                Next
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
              <span className="mt-1.5 text-zinc-300 transition-colors group-hover:text-amber-50">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return sessions.map((session) => ({ id: String(session.number) }));
}
