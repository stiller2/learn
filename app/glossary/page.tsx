import { Header } from "../components/Header";
import { GlossaryClient } from "../components/GlossaryClient";
import { getAllGlossaryTerms } from "../data/course";

export default function GlossaryPage() {
  const entries = getAllGlossaryTerms();

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:py-20">
        <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-amber-400/80 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Every term, in one place
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Glossary
        </h1>
        <p className="mt-3 max-w-lg font-serif text-lg leading-8 text-zinc-400">
          Every term from all 17 sessions, aggregated and searchable — plus
          room to add your own.
        </p>

        <GlossaryClient entries={entries} />
      </main>
    </div>
  );
}
