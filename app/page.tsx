import { Header } from "./components/Header";
import { SessionCard } from "./components/SessionCard";
import { PARTS, getTotalMinutes, sessions } from "./data/course";

const ROMAN = ["I", "II", "III", "IV"];

export default function Home() {
  const totalHours = Math.round(getTotalMinutes() / 60);

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:py-20">
        <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-amber-400/80 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />A
          self-directed course
        </div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Technical Fluency{" "}
          <span className="text-zinc-500">for Startups</span>
        </h1>
        <p className="mt-4 max-w-lg font-serif text-lg leading-8 text-zinc-400">
          One project, built session by session, until the whole stack stops
          being a mystery.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-zinc-800/80 pt-6 text-sm text-zinc-500">
          <div>
            <span className="font-medium text-zinc-200">17</span> sessions
          </div>
          <div>
            <span className="font-medium text-zinc-200">4</span> parts
          </div>
          <div>
            <span className="font-medium text-zinc-200">~{totalHours}</span>{" "}
            hours total
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-14">
          {PARTS.map((part) => {
            const partSessions = sessions.filter(
              (session) => session.part === part.number,
            );

            return (
              <section key={part.number}>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl text-zinc-700">
                    {ROMAN[part.number - 1]}
                  </span>
                  <h2 className="text-sm font-medium tracking-wide text-zinc-400 uppercase">
                    {part.title}
                  </h2>
                  <div className="h-px flex-1 bg-zinc-800/80" />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {partSessions.map((session) => (
                    <SessionCard
                      key={session.number}
                      number={session.number}
                      title={session.title}
                      timeEstimate={session.timeEstimate}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
