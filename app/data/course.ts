export type Resource = {
  title: string;
  url: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
};

export type Session = {
  number: number;
  part: number;
  title: string;
  timeEstimate: string;
  whyItMatters: string;
  objectives: string[];
  resources: Resource[];
  doDescription: string;
  glossary: GlossaryTerm[];
  doneWhen: string;
};

export type Part = {
  number: number;
  title: string;
};

export const PARTS: Part[] = [
  { number: 1, title: "The Machine" },
  { number: 2, title: "Building It" },
  { number: 3, title: "AI-Native Software" },
  { number: 4, title: "Systems and Judgment" },
];

const placeholder = (
  number: number,
  part: number,
  title: string,
  timeEstimate: string,
): Session => ({
  number,
  part,
  title,
  timeEstimate,
  whyItMatters: "Placeholder — why this session matters goes here.",
  objectives: ["Placeholder objective one.", "Placeholder objective two."],
  resources: [{ title: "Placeholder resource", url: "#" }],
  doDescription: "Placeholder — the exercise for this session goes here.",
  glossary: [{ term: "Term", definition: "Placeholder definition." }],
  doneWhen: "Placeholder — done when line goes here.",
});

export const sessions: Session[] = [
  placeholder(1, 1, "How the internet actually works", "~75 min"),
  placeholder(2, 1, "APIs and JSON", "~90 min"),
  placeholder(3, 1, "Databases and SQL, part 1", "~90 min"),
  placeholder(4, 1, "Databases and SQL, part 2", "~90 min"),
  placeholder(5, 2, "Terminal, Git, and GitHub", "~60 min"),
  placeholder(6, 2, "Frontend, React, and Next.js", "~90 min"),
  placeholder(7, 2, "Backend and API routes", "~90 min"),
  placeholder(8, 2, "A real database with Supabase", "~90 min"),
  placeholder(9, 2, "Authentication and authorization", "~90 min"),
  placeholder(10, 2, "Deployment, environments, and secrets", "~75 min"),
  placeholder(11, 3, "How AI models actually work", "~75 min"),
  placeholder(12, 3, "Putting an LLM inside your product", "~90 min"),
  placeholder(13, 3, "Structured output, tools, and agents", "~90 min"),
  placeholder(
    14,
    3,
    "Retrieval, embeddings, and AI system architecture",
    "~75 min",
  ),
  placeholder(15, 4, "Debugging and observability", "~90 min"),
  placeholder(16, 4, "Reading a codebase you didn't write", "~90 min"),
  placeholder(17, 4, "System design, scoping, and judgment", "~90 min"),
];

export function getSession(number: number): Session | undefined {
  return sessions.find((session) => session.number === number);
}

export function getTotalMinutes(): number {
  return sessions.reduce((total, session) => {
    const match = session.timeEstimate.match(/\d+/);
    return total + (match ? Number(match[0]) : 0);
  }, 0);
}
