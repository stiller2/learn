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

export const sessions: Session[] = [
  {
    number: 1,
    part: 1,
    title: "How the internet actually works",
    timeEstimate: "~75 min",
    whyItMatters:
      'Every other session assumes this one. "The frontend calls the backend" is a sentence you\'ll hear a hundred times, and it\'s meaningless until you\'ve traced what physically happens between a keystroke and a rendered page. This is also the session that makes deployment, latency, and API keys make sense later — all three are consequences of the request/response model.',
    objectives: [
      "Narrate what happens between typing a URL and seeing a page, out loud, without notes",
      "Explain the difference between your machine and a server, and why localhost is invisible to everyone else",
      "Look at a status code and know roughly what went wrong",
      'Say what "the frontend made a request to the backend" means in mechanical terms',
    ],
    resources: [
      {
        title: "MDN — Overview of HTTP",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview",
      },
      {
        title: "MDN — HTTP Messages",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages",
      },
      {
        title: "Cloudflare — What is DNS?",
        url: "https://www.cloudflare.com/learning/dns/what-is-dns/",
      },
      {
        title: "What happens when you type a URL",
        url: "https://github.com/alex/what-happens-when",
      },
      {
        title: "High Performance Browser Networking",
        url: "https://hpbn.co/",
      },
    ],
    doDescription:
      'Ask Claude: "Walk me through exactly what happens when I type doordash.com into Chrome and load the homepage. Cover DNS, browser, server, frontend, backend, database, APIs, and HTTP at the level of a startup founder." Then close it and draw the whole chain on paper from memory, then explain it out loud to nobody — the drawing and the explaining are the session, the reading is just input. Second thing: open any website, open Chrome DevTools (Cmd+Option+I), click the Network tab, and reload. You\'re now watching dozens of real HTTP requests. Click one and look at the method, the status, and the headers — you don\'t need to understand it yet, you need to know this panel exists, because Session 15 lives here. Deliberately skip HTTP/2, HTTP/3, proxies, TCP internals, and TLS handshakes for now — all real, all irrelevant to you at this stage.',
    glossary: [
      { term: "Client", definition: "Whatever is making the request. Usually a browser." },
      { term: "Server", definition: "A computer that receives requests and returns responses." },
      { term: "Frontend", definition: "Code running in the user's browser." },
      { term: "Backend", definition: "Code running on a server the user can't see or touch." },
      { term: "HTTP", definition: "The protocol — the agreed rules for how clients and servers talk." },
      { term: "Request / Response", definition: "The two halves of every web interaction." },
      { term: "DNS", definition: "The system that turns a domain name into a machine address." },
      { term: "Domain", definition: "The human-readable name (guhan.space)." },
      { term: "IP address", definition: "The numeric address of a machine on a network." },
      { term: "Localhost", definition: "Your own computer, reachable only by you." },
      { term: "Port", definition: "A numbered channel (3000, 443) so multiple servers can run on one machine." },
      { term: "Status code", definition: "A number summarizing the outcome. 200 OK, 404 not found, 500 server error." },
      { term: "Header", definition: "Metadata attached to a request or response." },
      { term: "Payload / Body", definition: "The actual content being sent." },
      { term: "Cloud", definition: "Someone else's computers, rented by the hour." },
    ],
    doneWhen:
      'You can say "the frontend made an HTTP request to the backend, which queried the database and returned a response" and every noun in that sentence points at something specific.',
  },
  {
    number: 2,
    part: 1,
    title: "APIs and JSON",
    timeEstimate: "~90 min",
    whyItMatters:
      'This is one of the two highest-value sessions in the course. Most startup products are, structurally, interfaces that retrieve, transform, store, and send data — and APIs are how the retrieving and sending happen. Once APIs and JSON are transparent to you, a large share of "how does that product work?" questions answer themselves. It\'s also the most immediately useful thing in a business role. "Can we pull that from their API?" is a question you\'ll need to answer, and answering it means reading someone\'s documentation and forming a view.',
    objectives: [
      "Read an API's documentation and work out whether it can do what you need",
      "Look at a JSON blob and describe its structure out loud",
      "Make a real API call yourself and read what came back",
      "Explain what an API key is and why it's a secret",
      "Explain the difference between an API call and a webhook",
    ],
    resources: [
      {
        title: "MDN — Introduction to Web APIs",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction",
      },
      {
        title: "MDN — Working with JSON",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON",
      },
      {
        title: "Cloudflare — What is a REST API?",
        url: "https://www.cloudflare.com/learning/security/api/what-is-rest-api/",
      },
      { title: "Stripe API Reference", url: "https://docs.stripe.com/api" },
      {
        title: "Public APIs list",
        url: "https://github.com/public-apis/public-apis",
      },
      { title: "Postman", url: "https://www.postman.com/" },
    ],
    doDescription:
      'Ask Claude Code: "Create a small script that calls a free public API, prints the status code, and prints the returned JSON. Under 30 lines. Explain every line before I run it." Run it. Then break it on purpose, one thing at a time: wrong endpoint, missing parameter, malformed URL. Note what each failure looks like — you\'re building a library of failure shapes that\'ll pay off in Session 15. Then ask: "Show me exactly which part of this is the HTTP request and which part is the response." The picture to internalize: your program sends GET https://api.example.com/company/123 to the API server, which sends back { "id": 123, "name": "Acme" }. An API is not magic — it is software sending structured requests to other software and getting structured answers back.',
    glossary: [
      { term: "API", definition: "A defined way for one piece of software to ask another for something." },
      { term: "REST API", definition: "The dominant convention: structure your API around URLs and HTTP methods." },
      { term: "Endpoint", definition: "One specific URL an API exposes." },
      { term: "GET / POST / PATCH / DELETE", definition: "Read / create / update / remove." },
      { term: "Header", definition: "Metadata on a request — auth tokens, content type." },
      { term: "Body", definition: "The payload." },
      { term: "API key", definition: "A secret string proving you're allowed to call this API." },
      { term: "JSON", definition: "The standard text format for structured data: keys, values, arrays, nesting." },
      { term: "SDK", definition: "A library wrapping an API so you write less boilerplate." },
      { term: "Webhook", definition: "The reverse of an API call — the service calls you when something happens." },
      { term: "Rate limit", definition: "A cap on requests per window." },
      { term: "Pagination", definition: "Returning results in pages because the full set is too large." },
      { term: "Idempotent", definition: "Safe to repeat. GET is; POST usually isn't." },
    ],
    doneWhen:
      'Someone says "hit the Stripe API with a POST and parse the returned JSON" and every word of it is transparent.',
  },
  {
    number: 3,
    part: 1,
    title: "Databases and SQL, part 1",
    timeEstimate: "~90 min",
    whyItMatters:
      'SQL is the single highest-ROI concrete skill on this list for someone in a business role at a startup. Not because engineers can\'t write it — because you\'ll want an answer during a meeting, and asking someone else means a two-day round trip. The person who can answer "how many March signups are still active?" in thirty seconds becomes indispensable fast. It\'s also fifty years old, universal, and not going anywhere — nothing else you learn here has that shelf life. You have an advantage most beginners don\'t: you already think in tables, cohorts, and joins from financial analysis. You\'re learning notation for concepts you have.',
    objectives: [
      "Look at a set of tables and explain how they relate",
      "Write a SELECT with filtering and sorting from a blank page, no reference",
      "Explain what a primary key and a foreign key are, and why they exist",
      "Describe what CRUD means in terms of what a user does in an app",
    ],
    resources: [
      { title: "SQLBolt", url: "https://sqlbolt.com/" },
      {
        title: "PostgreSQL — The SQL Language",
        url: "https://www.postgresql.org/docs/current/tutorial-sql.html",
      },
      { title: "Mode SQL Tutorial — Basic", url: "https://mode.com/sql-tutorial/" },
      { title: "Select Star SQL", url: "https://selectstarsql.com/" },
    ],
    doDescription:
      'A database is a set of tables. Tables have rows and columns, and tables point at each other using IDs — a USERS table (id, name, email) and a COMPANIES table (id, user_id, name), where a company\'s user_id points at the row it belongs to in users. That one idea, a column in one table pointing at a row in another, is most of what "relational database" means. Work through SQLBolt lessons 1 through 6 — interactive, instant feedback, no setup — then read PostgreSQL\'s "The SQL Language" sections 2.2 through 2.5: concepts, creating a table, populating it, querying it.',
    glossary: [
      { term: "Database", definition: "Organized, persistent storage." },
      { term: "Relational database", definition: "One organized as tables that reference each other." },
      { term: "Postgres", definition: "The most common open-source relational database. The default choice." },
      { term: "Table / row / column", definition: "Spreadsheet / record / field." },
      { term: "Schema", definition: "The structure — which tables exist and what columns they have." },
      { term: "Primary key", definition: "The unique ID of a row." },
      { term: "Foreign key", definition: "A column pointing at another table's primary key." },
      { term: "Query", definition: "A question you ask the database." },
      { term: "CRUD", definition: "Create, read, update, delete. The four operations." },
      { term: "SELECT", definition: "Choose which columns you want." },
      { term: "WHERE", definition: "Filter which rows." },
      { term: "ORDER BY / LIMIT", definition: "Sort / cap the number returned." },
      { term: "DISTINCT", definition: "Remove duplicate results." },
    ],
    doneWhen:
      "You can write a SELECT with a WHERE clause from a blank page, no reference, no hesitation.",
  },
  {
    number: 4,
    part: 1,
    title: "Databases and SQL, part 2",
    timeEstimate: "~90 min",
    whyItMatters:
      "Session 3 got you querying one table. This one gets you answering business questions, which almost always requires combining tables and summarizing. Joins and aggregates are the actual skill; everything before was setup. This is also the session with a hard gate — don't move past it until you clear the checkpoint, because every later session assumes you can reason about data relationships.",
    objectives: [
      "Write a two-table join with a GROUP BY, from a blank page, unassisted",
      "Explain the difference between an inner join and a left join, and when the difference bites",
      "Design a simple schema for a product you're describing — decide what tables exist and how they connect",
      "Explain, roughly, why one query is slow and another is fast",
    ],
    resources: [
      { title: "SQLBolt", url: "https://sqlbolt.com/" },
      {
        title: "PostgreSQL tutorial",
        url: "https://www.postgresql.org/docs/current/tutorial-sql.html",
      },
      {
        title: "Mode SQL Tutorial — Intermediate",
        url: "https://mode.com/sql-tutorial/",
      },
      { title: "Use The Index, Luke", url: "https://use-the-index-luke.com/" },
      {
        title: "PostgreSQL — Explain",
        url: "https://www.postgresql.org/docs/current/using-explain.html",
      },
    ],
    doDescription:
      "Work through SQLBolt lessons 6 through 13 — joins, NULLs, aggregates, order of execution — plus PostgreSQL tutorial sections 2.6 (joins) and 2.7 (aggregates). Then write these two cold, from memory: SELECT * FROM companies WHERE industry = 'AI'; and SELECT users.name, COUNT(companies.id) FROM users JOIN companies ON users.id = companies.user_id GROUP BY users.name;. Then design the CRM schema yourself, on paper, before consulting anything — three tables: users, companies, notes. Write down every column and every foreign key. Then answer: how would you retrieve every note belonging to Stripe? Write the SQL first, then check it.",
    glossary: [
      { term: "JOIN", definition: "Combine rows from two tables using a shared key." },
      { term: "INNER JOIN", definition: "Only rows with a match in both tables." },
      { term: "LEFT JOIN", definition: "Every row from the left table, matched or not." },
      { term: "GROUP BY", definition: "Collapse rows into groups so you can aggregate them." },
      { term: "Aggregate", definition: "COUNT, SUM, AVG, MIN, MAX." },
      { term: "HAVING", definition: "Like WHERE, but filters groups after aggregation." },
      {
        term: "NULL",
        definition:
          "Missing or unknown. Not zero, not empty string. Behaves surprisingly — this is the classic beginner trap.",
      },
      { term: "Index", definition: "A lookup structure that makes certain queries dramatically faster." },
      { term: "Migration", definition: "A versioned change to the database structure." },
      { term: "INSERT / UPDATE / DELETE", definition: "Add / change / remove rows." },
      {
        term: "Subquery / CTE",
        definition: "A query inside a query. CTEs (WITH ... AS) are the readable version.",
      },
      { term: "Normalization", definition: "Structuring data so nothing is stored twice." },
    ],
    doneWhen:
      "You write a two-table join with a GROUP BY, from blank, unassisted. Hard gate — don't skip it.",
  },
  {
    number: 5,
    part: 2,
    title: "Terminal, Git, and GitHub",
    timeEstimate: "~60 min",
    whyItMatters:
      "Git is how every software team on earth collaborates, and the vocabulary around it — branch, PR, merge conflict, code review — makes up a large fraction of everyday engineering conversation. You don't need mastery. You need the workflow to stop being mysterious, and you need to have felt a merge conflict once so the term isn't abstract.",
    objectives: [
      "Create a branch, commit, push, open a pull request, and merge it",
      "Deliberately create a merge conflict and resolve it",
      "Explain what a PR is for — not just mechanically, but why teams work this way",
      "Read a repo's commit history and get a sense of what's been happening",
      "Know why node_modules and .env are in .gitignore",
    ],
    resources: [
      {
        title: "GitHub — Hello World",
        url: "https://docs.github.com/en/get-started/start-your-journey/hello-world",
      },
      {
        title: "GitHub Flow",
        url: "https://docs.github.com/en/get-started/using-github/github-flow",
      },
      { title: "Oh Shit, Git!?!", url: "https://ohshitgit.com/" },
      { title: "Learn Git Branching", url: "https://learngitbranching.js.org/" },
      { title: "Pro Git", url: "https://git-scm.com/book/en/v2" },
    ],
    doDescription:
      "The commands worth having: pwd, ls, cd, mkdir for moving around; git status and git diff for what has changed; git add, git commit, git push to save and share; git pull to get others' changes; git branch and git checkout for parallel work; git log for history. In a scratch repo: branch off main, change a file, commit, push, open a PR against main, and merge it. Then create a merge conflict on purpose — edit the same line on two branches and merge them — and resolve it. The conflict is the point: it looks alarming until you've done it once, at which point it's a five-minute annoyance forever after.",
    glossary: [
      { term: "Repository", definition: "A project tracked by git." },
      { term: "Commit", definition: "A saved snapshot, with a message." },
      { term: "Branch", definition: "A parallel line of work." },
      { term: "Main", definition: "The primary branch, the one that gets deployed." },
      {
        term: "Pull request (PR)",
        definition: "A proposal to merge a branch, plus the discussion around it.",
      },
      { term: "Merge", definition: "Combining branches together." },
      {
        term: "Merge conflict",
        definition: "Two branches changed the same lines; a human has to decide.",
      },
      { term: "Remote / origin", definition: "The server copy; origin is its default name." },
      {
        term: "Clone / fork",
        definition: "Copy a repo locally / copy it under your own account.",
      },
      {
        term: ".gitignore",
        definition: "Files git should never track — secrets, dependencies, build output.",
      },
      { term: "Code review", definition: "Someone reading your PR before it merges." },
      { term: "Revert", definition: "Undo a commit, safely, with a record." },
    ],
    doneWhen:
      '"Clone the repo, branch off main, commit your changes, push, and open a PR" is a sentence you could act on immediately.',
  },
  {
    number: 6,
    part: 2,
    title: "Frontend, React, and Next.js",
    timeEstimate: "~90 min",
    whyItMatters:
      "You'll spend more time looking at frontend code than any other kind, because it's where the product visibly lives. You do not need to be good at React. You need to open a component file and roughly know what it does, and understand why the industry organizes interfaces this way. The core idea worth taking away: React inverted how interfaces get built. Before it, you found elements on the page and changed them one at a time, which became unmanageable at scale. React lets you describe what the screen should look like given some data, and handles the updating. Every modern frontend framework works on that principle now.",
    objectives: [
      "Open a React component and describe what it renders",
      'Explain what state is and why a page "remembers" something',
      "Predict which URL a given file will produce in Next.js",
      "Explain the difference between a library and a framework",
      'Point at a file and say "this is what produces that page"',
    ],
    resources: [
      {
        title: "Next.js — Installation",
        url: "https://nextjs.org/docs/app/getting-started/installation",
      },
      {
        title: "Next.js — Layouts and Pages",
        url: "https://nextjs.org/docs/app/getting-started/layouts-and-pages",
      },
      {
        title: "Next.js — Project Structure",
        url: "https://nextjs.org/docs/app/getting-started/project-structure",
      },
      { title: "React — Quick Start", url: "https://react.dev/learn" },
      {
        title: "React — Thinking in React",
        url: "https://react.dev/learn/thinking-in-react",
      },
      { title: "Tailwind CSS docs", url: "https://tailwindcss.com/docs" },
    ],
    doDescription:
      'The framing: HTML is structure, CSS is appearance, JavaScript is behavior, React is building interfaces out of reusable components, and Next.js is a framework around React that adds routing, server code, and builds. Do not try to learn React properly here — recognition, not mastery. Build three pages with zero styling effort: / as a dashboard, /companies as a list of companies, /companies/new as an add-company form. Tell Claude Code: "Keep this extremely simple. I care about architecture, not visual polish." Then spend a real 15 minutes asking it: "Explain this application file by file, starting with what matters most, and skip config unless it\'s important," and "When I load /companies, exactly which code produces what I see?" This inspection step is more valuable than the building step — the building is fast, understanding what got built is the skill.',
    glossary: [
      { term: "Component", definition: "A reusable piece of interface, written as a function." },
      { term: "Props", definition: "Data passed into a component from outside." },
      { term: "State", definition: "Data a component holds and can change." },
      { term: "JSX", definition: "HTML-like syntax written inside JavaScript." },
      {
        term: "Hook",
        definition: "A React function like useState or useEffect that adds capability.",
      },
      {
        term: "Routing",
        definition: "Mapping URLs to pages. In Next.js, folders are routes.",
      },
      {
        term: "Server component / client component",
        definition: "Runs on the server before HTML is sent / runs in the browser.",
      },
      {
        term: "Hydration",
        definition: "The browser taking over server-rendered HTML and making it interactive.",
      },
      { term: "Rendering", definition: "Turning code into what's displayed." },
      { term: "Build", definition: "Converting source files into what actually gets served." },
      {
        term: "Bundle",
        definition: "The packaged JavaScript sent to the browser. Size affects load time.",
      },
      { term: "Framework vs library", definition: "A framework calls your code; you call a library." },
      { term: "Responsive", definition: "Adapting layout to screen size." },
    ],
    doneWhen:
      "You can point at a file and explain what page it produces and roughly how it reaches the browser.",
  },
  {
    number: 7,
    part: 2,
    title: "Backend and API routes",
    timeEstimate: "~90 min",
    whyItMatters:
      "This is where Session 1 stops being theory. You'll build an endpoint, call it from a form, and then watch the request happen in DevTools. That moment — seeing your own data leave the browser and come back — is the one that makes the whole architecture concrete. It's also where the frontend/backend split stops being an arbitrary distinction and becomes obviously necessary: some things simply cannot happen in a browser, because the browser belongs to the user.",
    objectives: [
      "Explain what a backend does that a frontend cannot, and why",
      "Build a simple endpoint that receives data and returns a response",
      "Open DevTools, find a specific request, and read its method, status, payload, and response",
      "Explain what a 400 means versus a 500, and who's at fault in each case",
    ],
    resources: [
      {
        title: "Next.js — Route Handlers",
        url: "https://nextjs.org/docs/app/getting-started/route-handlers",
      },
      {
        title: "MDN — HTTP response status codes",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status",
      },
      {
        title: "Chrome DevTools — Inspect Network Activity",
        url: "https://developer.chrome.com/docs/devtools/network",
      },
      {
        title: "MDN — Fetch API",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
      },
      {
        title: "Chrome DevTools — Overview",
        url: "https://developer.chrome.com/docs/devtools",
      },
    ],
    doDescription:
      'Build one endpoint, no database yet — POST /api/companies takes in { "name": "Stripe" } and returns { "success": true, "company": "Stripe" }. Wire your add-company form to it. Then, the exercise that matters most: open Chrome DevTools\' Network tab, submit the form, click your request, and find the method, the URL, the status code, the request payload, and the response body. You are now watching frontend → HTTP → backend → HTTP → frontend. Spend twenty minutes here, clicking through requests and changing the form input to watch the payload change — this panel is where you\'ll spend most of Session 15, and where most real debugging starts.',
    glossary: [
      {
        term: "Route handler / API route",
        definition: "Server-side code responding to requests at a URL.",
      },
      { term: "Request payload", definition: "What the client sent." },
      { term: "Response body", definition: "What the server sent back." },
      {
        term: "Serialization",
        definition: "Converting data into a transmittable format, usually JSON.",
      },
      {
        term: "CORS",
        definition: "Browser rules about which sites may call which APIs. You will meet this as an error message.",
      },
      { term: "Middleware", definition: "Code that runs on every request before your handler does." },
      {
        term: "Validation",
        definition: "Checking incoming data is what you expected. Never trust the client.",
      },
      { term: "2xx / 4xx / 5xx", definition: "Success / the client's fault / the server's fault." },
      { term: "Timeout", definition: "Giving up on a request that's taking too long." },
      { term: "Server-side", definition: "Anything happening where the user can't see or modify it." },
    ],
    doneWhen: "You can point at a request in DevTools and narrate every part of it.",
  },
  {
    number: 8,
    part: 2,
    title: "A real database with Supabase",
    timeEstimate: "~90 min",
    whyItMatters:
      'Everything you\'ve built so far forgets. This is the session where data survives, and the conceptual jump from "application state" to "persistent state" is bigger than it sounds written down. It\'s also where the SQL from Sessions 3 and 4 stops being an exercise and starts being how you inspect your own product.',
    objectives: [
      "Explain exactly where a piece of data physically lives and what path it took",
      "Create a table with appropriate columns and relationships",
      "Trace a full round trip: form → API route → database → back → display",
      "Run a SQL query against your own real data and get an answer you care about",
      "Explain what a connection string is and why it's a secret",
    ],
    resources: [
      {
        title: "Supabase — Getting Started",
        url: "https://supabase.com/docs/guides/getting-started",
      },
      {
        title: "Supabase — Tables and Data",
        url: "https://supabase.com/docs/guides/database/tables",
      },
      {
        title: "Supabase — Database Functions",
        url: "https://supabase.com/docs/guides/database/functions",
      },
      { title: "Supabase — Realtime", url: "https://supabase.com/docs/guides/realtime" },
      { title: "The Twelve-Factor App", url: "https://12factor.net/" },
    ],
    doDescription:
      "Create the tables you designed in Session 4: companies (id, name, user_id, created_at) and notes (id, company_id, content, created_at). Then wire both directions — Add Company goes POST → backend → Supabase → INSERT, and the Companies page goes backend → Supabase → SELECT → display. The test that makes it real: add a company, close the browser, stop the dev server entirely, restart everything — it's still there. That's persistence, obvious in the abstract and different when you watch it. Then open the Supabase SQL editor and run the queries from Session 4 against your own data: join companies and notes, count notes per company. This is the moment SQL becomes a tool rather than a subject.",
    glossary: [
      { term: "ORM / query builder", definition: "A library that writes SQL for you from code." },
      {
        term: "Connection string",
        definition: "The credential-bearing address of your database. A secret.",
      },
      { term: "Persistence", definition: "Data surviving a restart." },
      { term: "Seed data", definition: "Fake rows for development." },
      {
        term: "Backup / restore",
        definition: "What saves you when something goes badly wrong.",
      },
      {
        term: "Transaction",
        definition: "A group of changes that all succeed or all fail together.",
      },
      { term: "Managed service", definition: "Someone else runs the infrastructure; you use it." },
      {
        term: "Backing service",
        definition: "Any external resource your app depends on — database, cache, mail.",
      },
    ],
    doneWhen:
      "You can trace a single piece of data from the form field it was typed into all the way to the row it occupies, and back to the screen.",
  },
  {
    number: 9,
    part: 2,
    title: "Authentication and authorization",
    timeEstimate: "~90 min",
    whyItMatters:
      'Conflating these two is the most common security mistake non-technical people make, and the consequences are severe. It\'s also unavoidable vocabulary — "auth" comes up constantly, and knowing which auth someone means is half of following the conversation. The specific idea worth internalizing: hiding something in the frontend is not security. Anyone can open DevTools and see everything your browser received. Security has to be enforced where the user has no control.',
    objectives: [
      "Explain the difference between authentication and authorization, with an example of each",
      "Explain what happens mechanically when someone logs in",
      "Explain why hiding data in the UI is not security, and what actually is",
      "Recognize a serious security mistake when you see one — credentials in frontend code, missing access checks",
      "Explain roughly what a session, a cookie, and a JWT each do",
    ],
    resources: [
      { title: "Supabase — Auth", url: "https://supabase.com/docs/guides/auth" },
      {
        title: "Supabase — Row Level Security",
        url: "https://supabase.com/docs/guides/database/postgres/row-level-security",
      },
      { title: "OWASP Top Ten", url: "https://owasp.org/www-project-top-ten/" },
      {
        title: "Auth0 — Authentication vs Authorization",
        url: "https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization",
      },
      {
        title: "What is OAuth?",
        url: "https://www.cloudflare.com/learning/access-management/what-is-oauth/",
      },
      { title: "Have I Been Pwned", url: "https://haveibeenpwned.com/" },
    ],
    doDescription:
      'Build signup, login, and logout. Then make companies belong to users — and verify a second account genuinely cannot see the first account\'s data. Actually test it with two accounts; assumptions here are how breaches happen. Ask Claude: "Walk me through everything that happens technically when I enter my email and password and click Login. Where does the user\'s identity live on subsequent requests? Explain cookies, sessions, JWTs, authentication, and authorization at the depth a founder needs — not more."',
    glossary: [
      { term: "Authentication", definition: "Proving who you are." },
      { term: "Authorization", definition: "What you're permitted to do once you're in." },
      { term: "Session", definition: "The server's memory that you're currently logged in." },
      {
        term: "Cookie",
        definition: "A small piece of data the browser sends back on every request.",
      },
      {
        term: "JWT",
        definition: "A signed token carrying identity claims, verifiable without a database lookup.",
      },
      { term: "OAuth", definition: "The protocol behind third-party sign-in." },
      {
        term: "Hashing",
        definition: "One-way scrambling. Passwords are stored hashed and are never readable.",
      },
      {
        term: "Salt",
        definition: "Random data added before hashing so identical passwords don't match.",
      },
      {
        term: "Row Level Security (RLS)",
        definition: "The database enforcing who can see which rows.",
      },
      { term: "SQL injection", definition: "Attacker-supplied text getting executed as a query." },
      { term: "Least privilege", definition: "Give every component the minimum access it needs." },
      {
        term: "Access token / refresh token",
        definition: "Short-lived proof of identity / the thing that renews it.",
      },
    ],
    doneWhen: "You can explain to someone else why frontend-only access control is not security.",
  },
  {
    number: 10,
    part: 2,
    title: "Deployment, environments, and secrets",
    timeEstimate: "~75 min",
    whyItMatters:
      "Two things here. First, understanding the deploy pipeline demystifies a large part of how software companies actually operate day to day — staging, production, rollbacks, CI. Second, and more urgent: secrets management is the one security topic where a single mistake can end a company. Leaked credentials are not a hypothetical.",
    objectives: [
      "Explain the full chain from your laptop to a public URL",
      "Explain the difference between local, staging, and production, and why all three exist",
      "Explain why an API key must never appear in frontend code, and what happens if it does",
      "Set up an environment variable and know where it's read from",
      "Explain what a rollback is and why it's the first move when production breaks",
    ],
    resources: [
      {
        title: "Vercel — Getting Started",
        url: "https://vercel.com/docs/getting-started-with-vercel",
      },
      {
        title: "Vercel — Environment Variables",
        url: "https://vercel.com/docs/environment-variables",
      },
      { title: "The Twelve-Factor App — Config", url: "https://12factor.net/config" },
      {
        title: "Cloudflare — What is a CDN?",
        url: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/",
      },
      {
        title: "GitHub — About secret scanning",
        url: "https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning",
      },
    ],
    doDescription:
      "Connect GitHub to Vercel and deploy. Internalize the chain: your laptop → git push → GitHub → Vercel builds → a public URL, noting that GitHub is the middleman and Vercel never talks to your machine directly. The part that actually matters: your database password and API keys must never appear in your source code, because your source code is on GitHub and your frontend code is downloadable by every visitor to your site. The browser is user-controlled, fully inspectable, and never trusted with secrets; the server is your environment, where secrets can live. If you take one security idea from this course, take this one. Then send the URL to someone, have them sign up and add a company and a note, and find the row they created in your Supabase dashboard. Separately, open your deployed site, open DevTools → Sources, and look at what JavaScript the browser actually downloaded — everything there is public, which is why the boundary matters.",
    glossary: [
      {
        term: "Environment variable",
        definition: "Configuration supplied at runtime rather than written in code.",
      },
      { term: "Secret", definition: "Any credential — API key, database password, token." },
      { term: ".env file", definition: "Local secrets. Always gitignored." },
      {
        term: "Local / staging / production",
        definition: "Your machine / a rehearsal copy / the real thing.",
      },
      { term: "Build", definition: "Compiling and bundling before serving." },
      { term: "Deploy", definition: "Making a new version live." },
      {
        term: "Rollback",
        definition: "Reverting to the last version that worked. Usually the right first move.",
      },
      { term: "CI/CD", definition: "Automation that tests and deploys on every push." },
      { term: "CDN", definition: "Distributed servers caching content near users." },
      { term: "DNS records", definition: "What point your domain at your host." },
      { term: "Uptime / SLA", definition: "How often it works / what you've contractually promised." },
      { term: "Zero-downtime deploy", definition: "Shipping without the site going dark." },
    ],
    doneWhen:
      "You can explain, to a non-technical person, why OPENAI_API_KEY=... in frontend code is an emergency.",
  },
  {
    number: 11,
    part: 3,
    title: "How AI models actually work",
    timeEstimate: "~75 min",
    whyItMatters:
      'Every startup conversation in 2026 touches this, and the vocabulary is new enough that real fluency is genuinely differentiating — most people using these words are repeating them. Understanding tokens and context windows in particular explains a huge amount of downstream product behavior: why some features are expensive, why responses get slower with longer inputs, why "just feed it all our documents" doesn\'t work, why models forget things mid-conversation. This session is conceptual — no building. Get the mental model before you wire anything up.',
    objectives: [
      "Explain what a token is and estimate roughly how many are in a document",
      "Explain what a context window is and what happens when you exceed it",
      "Explain, in one sentence each, the difference between training, fine-tuning, and inference",
      "Reason about why one AI feature costs 50× another",
      "Explain what a hallucination is and why the model can't tell it's happening",
      'Push back on "we\'ll just use AI for that" with a specific question',
    ],
    resources: [
      {
        title: "Anthropic — Introduction to Claude",
        url: "https://docs.claude.com/en/docs/intro",
      },
      {
        title: "Anthropic — Context windows",
        url: "https://docs.claude.com/en/docs/build-with-claude/context-windows",
      },
      { title: "OpenAI — Tokenizer", url: "https://platform.openai.com/tokenizer" },
      { title: "Anthropic — Pricing", url: "https://www.anthropic.com/pricing" },
      { title: "Simon Willison's blog", url: "https://simonwillison.net/" },
      {
        title: "Andrej Karpathy — Intro to Large Language Models",
        url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
      },
    ],
    doDescription:
      'Models don\'t read words, they read tokens — chunks of roughly ¾ of a word in English — and everything is priced and limited in tokens: what you send and what comes back. A context window is how much the model can hold in mind at once, measured in tokens; everything it "knows" about your situation has to fit, and exceeding it means something gets dropped. Training is the expensive one-time process that produced the model; inference is running it to get an answer, which is what you pay for per call; fine-tuning is additional training on your own data, and it\'s usually the wrong solution. Input tokens are cheaper than output tokens, bigger models cost more and respond slower, and a hallucination is fluent, confident, wrong output that the model has no internal signal to distinguish from correct output — which is why evals exist. Open the tokenizer and paste in a paragraph of your own writing, then a table of numbers, then a code snippet, and notice how differently they tokenize. Then take a product you know and estimate how many tokens per user action it costs, what that would cost at 10,000 users a day, and look up current pricing to actually do the arithmetic — this is the calculation nobody does and everyone should.',
    glossary: [
      { term: "Token", definition: "The unit models read and write. Roughly ¾ of a word." },
      { term: "Context window", definition: "How many tokens the model can consider at once." },
      { term: "Prompt", definition: "What you send the model." },
      {
        term: "System prompt",
        definition: "Standing instructions framing every request in a conversation.",
      },
      { term: "Completion / output", definition: "What comes back." },
      { term: "Inference", definition: "Running the model to get an answer. What you pay for." },
      { term: "Training", definition: "The one-time process that created the model." },
      { term: "Fine-tuning", definition: "Further training on your own data. Usually unnecessary." },
      { term: "Temperature", definition: "How much randomness in the output. Lower is more predictable." },
      { term: "Latency", definition: "Response time. Models are slow relative to databases." },
      { term: "Streaming", definition: "Sending output word by word so it feels faster." },
      { term: "Hallucination", definition: "Fluent, confident, wrong." },
      { term: "Non-deterministic", definition: "Same input, potentially different output." },
      { term: "Multimodal", definition: "Handles more than text — images, audio, documents." },
      {
        term: "Model family / version",
        definition: "Different sizes and generations, with different cost/quality tradeoffs.",
      },
    ],
    doneWhen:
      "Someone pitches an AI product and you can immediately ask two sharp questions about cost and reliability.",
  },
  {
    number: 12,
    part: 3,
    title: "Putting an LLM inside your product",
    timeEstimate: "~90 min",
    whyItMatters:
      "The shift here is from using AI to building with it. When a model becomes a component in your architecture rather than a tool you chat with, a set of new questions appear: where does the key live, what happens when the call fails, how long does the user wait, what if the output is garbage. Every AI product wrestles with these.",
    objectives: [
      "Explain the difference between using ChatGPT and building software that calls a model",
      "Trace a full request through your app: click → backend → model → database → screen",
      "Explain why the browser cannot call the model API directly",
      "Handle a failed or slow model call without the app breaking",
      "Explain what a prompt actually is at the API level — just text you're constructing in code",
    ],
    resources: [
      {
        title: "Anthropic — Get started with the API",
        url: "https://docs.claude.com/en/docs/get-started",
      },
      {
        title: "OpenAI — Developer Quickstart",
        url: "https://developers.openai.com/api/docs/quickstart",
      },
      {
        title: "Anthropic — Prompt engineering overview",
        url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
      },
      {
        title: "Anthropic — Streaming",
        url: "https://docs.claude.com/en/docs/build-with-claude/streaming",
      },
    ],
    doDescription:
      'Build an "Analyze Company" button: a click posts to /api/analyze, the backend fetches that company\'s notes from Postgres, sends them to the model with a prompt, returns the response, and you display it. Notice that the backend is assembling context from your database and constructing a prompt in code — that\'s most of what "AI engineering" is in practice. Sit with the question: why can\'t the browser call the model API directly with your key? Because anything in the browser is visible to the user, and an exposed API key is someone else\'s free compute on your credit card that will be found within hours — the backend exists partly because it\'s the only place a secret can live. Also handle what the user sees while waiting, since model calls take seconds rather than milliseconds; what happens if the call fails or times out; and what happens if the model returns something unusable. Those three questions are most of the difference between a demo and a product.',
    glossary: [
      {
        term: "API key",
        definition: "Your credential for the model provider. A secret, server-side only.",
      },
      {
        term: "Prompt construction",
        definition: "Assembling the text you send, usually from database content plus instructions.",
      },
      { term: "Context assembly", definition: "Deciding what information to include in a request." },
      { term: "System vs user message", definition: "Standing instructions vs the specific request." },
      { term: "Rate limit", definition: "How many requests the provider allows per minute." },
      {
        term: "Retry / backoff",
        definition: "Trying again after a failure, with increasing delays.",
      },
      { term: "Timeout", definition: "Giving up on a slow call." },
      { term: "Loading state", definition: "What the user sees while waiting." },
      {
        term: "Graceful degradation",
        definition: "The app still works, less well, when a component fails.",
      },
    ],
    doneWhen:
      "You can draw the full path of an AI feature through your system and name what could fail at each step.",
  },
  {
    number: 13,
    part: 3,
    title: "Structured output, tools, and agents",
    timeEstimate: "~90 min",
    whyItMatters:
      'Your main "AI startup architecture" session. This is where the marketing vocabulary — agents, tool use, orchestration — becomes concrete mechanism. It\'s also where most of the actual differentiation lives in AI products right now, so understanding it well is directly job-relevant.',
    objectives: [
      "Explain why structured output matters more than better prose",
      "Explain the tool-calling loop mechanically, without hand-waving",
      "Explain the difference between an agent and a workflow, and argue for when each is appropriate",
      "Say what an eval is and why AI products can't be tested conventionally",
      'Hear "we\'re building an agent" and ask the right follow-up question',
    ],
    resources: [
      {
        title: "Anthropic — Tool use",
        url: "https://docs.claude.com/en/docs/build-with-claude/tool-use",
      },
      {
        title: "OpenAI — Structured Outputs",
        url: "https://developers.openai.com/api/docs/guides/structured-outputs",
      },
      {
        title: "Anthropic — Building Effective Agents",
        url: "https://www.anthropic.com/engineering/building-effective-agents",
      },
      {
        title: "Anthropic — Define your success criteria",
        url: "https://docs.claude.com/en/docs/test-and-evaluate/define-success",
      },
      {
        title: "Hamel Husain — Your AI Product Needs Evals",
        url: "https://hamel.dev/blog/posts/evals/",
      },
    ],
    doDescription:
      'Part 1, structured output: instead of a paragraph of prose, constrain the model to return exactly { "summary": "...", "strengths": ["..."], "risks": ["..."], "score": 8 } and store it in your database — prose can\'t be stored usefully, sorted, filtered, aggregated, or displayed in a table, and structured data can, which is most of what separates an AI feature from an AI demo. Part 2, tool calling: a user asks a question, the model determines it needs data it doesn\'t have, the model emits a tool call like get_company_notes(id), your code runs the actual query, the result goes back to the model, and the model answers using it — the model never touches your database, it requests and your code decides whether and how to comply, which is the whole security model of agentic systems. Implement exactly one tool, don\'t build a multi-agent system, and watch the sequence and log every step until you understand it. Part 3, evals: conventional software gives the same output for the same input, so you write tests; AI gives different output for the same input, so you use evals instead — a set of cases with graded outputs, run repeatedly, tracked over time. Every serious AI company has an eval system and most consider it their real moat.',
    glossary: [
      { term: "Structured output", definition: "Constraining the model to a defined JSON shape." },
      { term: "Schema", definition: "The definition of that shape." },
      { term: "Tool / function calling", definition: "The model requesting that your code do something." },
      { term: "Agent", definition: "A model in a loop, using tools, choosing its own next step." },
      {
        term: "Workflow",
        definition: "A predetermined sequence with model calls in it. Usually better than an agent.",
      },
      { term: "Orchestration", definition: "Coordinating multiple model and tool calls." },
      { term: "Eval", definition: "A test suite for non-deterministic output." },
      { term: "Guardrail", definition: "A check on what goes in or what comes out." },
      { term: "Human in the loop", definition: "A person approving before an action executes." },
      {
        term: "Deterministic vs probabilistic",
        definition: "Same input, same output — versus not.",
      },
      {
        term: "Chain of thought",
        definition: "Having the model reason step by step before answering.",
      },
      {
        term: "Prompt injection",
        definition: "Untrusted input containing instructions the model follows. A real attack.",
      },
    ],
    doneWhen:
      '"Agent," "tool call," "structured output," and "eval" each name a specific mechanism in your head, not a vibe.',
  },
  {
    number: 14,
    part: 3,
    title: "Retrieval, embeddings, and AI system architecture",
    timeEstimate: "~75 min",
    whyItMatters:
      'RAG is the architecture behind most enterprise AI products, and it\'s also the answer to the most common question you\'ll hear: "can we just point AI at all our documents?" Understanding why the answer is "not directly" — and what the actual approach is — is genuinely useful vocabulary. Conceptual only — don\'t implement a vector database.',
    objectives: [
      "Explain why you can't just paste 100,000 documents into a prompt",
      'Explain what an embedding is without using the word "vector" as an explanation',
      "Describe the RAG pipeline end to end",
      "Explain why RAG often works worse than expected, and name two reasons",
      'Explain why "AI product" and "LLM" are not the same thing',
    ],
    resources: [
      {
        title: "Anthropic — Embeddings",
        url: "https://docs.claude.com/en/docs/build-with-claude/embeddings",
      },
      {
        title: "OpenAI — Embeddings",
        url: "https://developers.openai.com/api/docs/guides/embeddings",
      },
      {
        title: "Anthropic — Contextual Retrieval",
        url: "https://www.anthropic.com/news/contextual-retrieval",
      },
      {
        title: "Pinecone — Vector Database explainer",
        url: "https://www.pinecone.io/learn/vector-database/",
      },
      { title: "Chip Huyen's blog", url: "https://huyenchip.com/" },
    ],
    doDescription:
      "The problem: you have 100,000 documents and a context window that fits maybe 200 of them, so a user's question gets converted to an embedding, the most similar document chunks are found, only those go into the context, and the model answers using them. That's RAG — less exotic than it sounds, it's search followed by a prompt, and most of the difficulty is in the search half rather than the model half, which is why RAG systems usually underperform initially. The framing that matters: an AI product is conventional software plus model calls, retrieval, tools, data, evaluation, and interface — not just an LLM. The most common failure among non-technical founders is assuming the model is the product; in a real AI application the model calls are usually a small fraction of the code and a smaller fraction of the difficulty.",
    glossary: [
      {
        term: "Embedding",
        definition: "Text converted into a list of numbers that captures meaning.",
      },
      { term: "Vector", definition: "That list of numbers." },
      {
        term: "Semantic similarity",
        definition: "Closeness in meaning, measured as closeness of vectors.",
      },
      { term: "Vector database", definition: "Storage optimized for finding similar vectors fast." },
      { term: "Retrieval", definition: "Finding the relevant subset of your data." },
      { term: "RAG", definition: "Retrieval-Augmented Generation. Search, then prompt." },
      {
        term: "Chunking",
        definition: "Splitting documents into pieces small enough to retrieve usefully.",
      },
      {
        term: "Reranking",
        definition: "A second pass reordering retrieved results by relevance.",
      },
      {
        term: "Hybrid search",
        definition: "Combining keyword search with semantic search. Usually beats either alone.",
      },
      {
        term: "Context stuffing",
        definition: "Cramming everything in and hoping. Expensive, degrades quality.",
      },
      { term: "Grounding", definition: "Tying model output to source documents you can cite." },
    ],
    doneWhen:
      "You can explain to a non-technical person why a company with a lot of internal documents can't just paste them into ChatGPT, and what they'd do instead.",
  },
  {
    number: 15,
    part: 4,
    title: "Debugging and observability",
    timeEstimate: "~90 min",
    whyItMatters:
      "The most important session in the course for your specific goal. AI writes code very fast; the scarce skill now is figuring out why the system doesn't behave as intended. This is also what separates someone who can supervise engineering work from someone who can only generate it. Practically: you will hit a bug that AI can't fix for you, because fixing it requires knowing which layer is broken, and only you can see the whole system.",
    objectives: [
      "Given a broken feature, name which layer failed and cite the evidence — before writing any code",
      "Read a stack trace and identify where the error originated",
      "Find and read server logs",
      "Reproduce a bug reliably, which is usually half the work",
      "Resist the urge to guess, and check instead",
    ],
    resources: [
      { title: "Chrome DevTools — Overview", url: "https://developer.chrome.com/docs/devtools" },
      {
        title: "Chrome DevTools — Network",
        url: "https://developer.chrome.com/docs/devtools/network",
      },
      {
        title: "Chrome DevTools — Console",
        url: "https://developer.chrome.com/docs/devtools/console",
      },
      { title: "Sentry docs", url: "https://docs.sentry.io/" },
      { title: "PostHog docs", url: "https://posthog.com/docs" },
      { title: "Julia Evans' debugging zines", url: "https://wizardzines.com/" },
    ],
    doDescription:
      'The rule for this session: when something breaks, don\'t ask Claude Code to fix it — ask "Don\'t change any code yet. Help me identify which layer is failing, what evidence we have, and the three most likely causes," then investigate yourself, because the fix is worth less than the diagnosis. Break your app on purpose, four failures, one at a time, finding the evidence before fixing each: a wrong API URL (find the failed request in the Network panel — what status, what does the response say?), a misspelled API key (find the backend error and note where it surfaces and where it doesn\'t), a query against a column that doesn\'t exist (read the database error message properly — database errors are unusually informative), and malformed JSON returned to the frontend (watch what the frontend does — the failure appears far from its cause, which is the important lesson: where an error appears is often not where it originated). Use the same tree every time: did the UI even try (browser console)? Did a request go out, and what status came back (Network panel)? Did the backend receive it, and did the DB or API call work (server logs, DB dashboard)? What exactly came back (response body)? Almost every bug localizes by walking this in order — the skill is refusing to skip steps.',
    glossary: [
      { term: "Stack trace", definition: "The chain of function calls that led to an error." },
      { term: "Console", definition: "Where browser-side errors and logs appear." },
      { term: "Server logs", definition: "Where backend errors appear." },
      { term: "Observability", definition: "Being able to tell what a running system is doing." },
      {
        term: "Monitoring / alerting",
        definition: "Watching for problems / being told about them.",
      },
      { term: "Error monitoring", definition: "Automatic capture of production errors." },
      { term: "Reproduce", definition: "Making a bug happen on demand." },
      { term: "Regression", definition: "Something that used to work and no longer does." },
      { term: "Root cause", definition: "The actual reason, as opposed to the symptom." },
      { term: "Edge case", definition: "The input nobody planned for." },
      { term: "Race condition", definition: "A bug depending on timing. Miserable to reproduce." },
      { term: "Silent failure", definition: "Something broke and nothing said so. The worst kind." },
    ],
    doneWhen:
      "You can take a broken feature and produce a diagnosis with evidence, without touching any code.",
  },
  {
    number: 16,
    part: 4,
    title: "Reading a codebase you didn't write",
    timeEstimate: "~90 min",
    whyItMatters:
      'Badly underrated, and directly job-relevant. It\'s what lets you inspect reality rather than relying on someone\'s verbal summary of it. It\'s also the difference between "the engineer said it\'d be hard" and "I looked, and I understand why it\'d be hard." At a startup, this skill compounds fast — within a month of reading your own company\'s code you\'ll follow every conversation.',
    objectives: [
      "Open an unfamiliar repo and find where a specific feature lives, in about ten minutes",
      "Identify what external services a project depends on, without asking",
      "Trace one user action from the interface to the database and back",
      "Form a rough opinion about a codebase's quality and organization",
      "Know which files to read first",
    ],
    resources: [
      { title: "Cal.com", url: "https://github.com/calcom/cal.com" },
      { title: "Dub", url: "https://github.com/dubinc/dub" },
    ],
    doDescription:
      "Pick a real open-source Next.js project on GitHub — something with a few thousand stars, not a tutorial repo — and answer these without asking anyone: where does the app start, where does the UI live, where are the API routes or server functions, where is the database schema defined, what external services does it use, where do credentials get configured, and can you trace one feature end to end from the button to the database and back? You will struggle — that's the exercise; give it a full 45 minutes before asking for help. Then ask Claude Code the same questions and compare its answers to yours; where you were wrong, work out what signal you missed, because that's the actual learning. The files that tell you the most, fastest: README.md for what the maintainers thought mattered, package.json for every external thing this touches, .env.example for every service it connects to, the folder structure as the architecture in miniature, and recent commits for what's actively being worked on. Cal.com and Dub are both real, open-source, well-organized Next.js products worth reading. Do this exercise a second time in a month — the gap between attempts is a good measure of progress.",
    glossary: [
      { term: "Entry point", definition: "Where execution begins." },
      { term: "Dependency", definition: "External code the project relies on." },
      { term: "Monorepo", definition: "Multiple projects in one repository." },
      { term: "Boilerplate", definition: "Necessary, uninteresting setup code." },
      {
        term: "Abstraction layer",
        definition: "Code whose job is hiding other code's complexity.",
      },
      { term: "Config", definition: "Settings separated from logic." },
      {
        term: "Convention over configuration",
        definition: "The framework assumes defaults so you write less setup.",
      },
      { term: "Tech debt", definition: "Shortcuts taken earlier that cost you now." },
      { term: "Refactor", definition: "Restructure without changing behavior." },
      { term: "Legacy code", definition: "Code nobody wants to touch. Every company has some." },
      {
        term: "Coupling",
        definition: "How much one part depends on another. Less is better.",
      },
    ],
    doneWhen: "You can open an unfamiliar repo and locate a specific feature within about ten minutes.",
  },
  {
    number: 17,
    part: 4,
    title: "System design, scoping, and judgment",
    timeEstimate: "~90 min",
    whyItMatters:
      'Now the vocabulary will land, because you\'ve hit the problems it describes — reading this material on day one would have given you words with nothing underneath. The scoping half of this session isn\'t on any standard curriculum, and it\'s the skill that determines whether "I\'ll hire someone technical" is a strategy or a way to get taken advantage of. You cannot hire well for something you can\'t evaluate.',
    objectives: [
      "Draw the architecture of a product you use, from its behavior",
      "Explain what a cache, a queue, and a worker each solve",
      "Identify the likely bottleneck in a system as it scales",
      "Estimate how long a feature takes, within an order of magnitude",
      'Hear "that\'ll take three months" and know what question to ask next',
      "Follow a system design conversation between engineers without translating",
    ],
    resources: [
      {
        title: "Cloudflare — What is a CDN?",
        url: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/",
      },
      {
        title: "Cloudflare — What is load balancing?",
        url: "https://www.cloudflare.com/learning/performance/what-is-load-balancing/",
      },
      {
        title: "Cloudflare — What is caching?",
        url: "https://www.cloudflare.com/learning/cdn/what-is-caching/",
      },
      {
        title: "AWS Well-Architected Framework",
        url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
      },
      {
        title: "System Design Primer",
        url: "https://github.com/donnemartin/system-design-primer",
      },
      {
        title: "Designing Data-Intensive Applications",
        url: "https://dataintensive.net/",
      },
    ],
    doDescription:
      "Design four systems, ten minutes each: your own CRM, drawn completely from memory before looking at anything; Dropbox, working out where files live versus where metadata lives and what happens when a second device wants a file; Uber, working out where location data goes and how the system finds nearby drivers and keeps rider and driver in sync; and an AI customer support agent, working out where customer data comes from, what tools the model can call, and what requires human approval. Correctness isn't the point — decomposing a product into technical components is. Then, for scoping: estimate how long a competent engineer would take on each of adding a delete button, adding CSV export, adding a second user role, changing a primary key type on a table with data in it, switching databases, adding real-time updates, adding a full audit log, and adding a second language — write your number down first, then check your reasoning with Claude. You'll be badly wrong on at least two, usually the ones that sound simple and are structurally invasive, and that gap is what calibrates you for the moment an engineer says \"three months\" and you need to know whether that's honest, padded, or optimistic. Finish by drawing your CRM architecture from memory and working through what happens when a user loads the page and submits a company, where the data is stored physically, what the backend does that the frontend can't, why authentication is necessary, where the API key lives and why there specifically, what breaks first at 100,000 users, and what a cache, a queue, or an agent would each actually mean in this system. Discuss 14 of those 18 questions intelligently and you've hit the target.",
    glossary: [
      { term: "Server", definition: "A process handling requests." },
      { term: "Database", definition: "Persistent structured data." },
      {
        term: "Object storage",
        definition: "Files — images, video, PDFs. Different from a database, and cheaper.",
      },
      {
        term: "Cache",
        definition: "Fast temporary storage so expensive work isn't repeated.",
      },
      { term: "Queue", definition: "Work waiting to be done later." },
      { term: "Worker", definition: "A process doing queued work in the background." },
      { term: "Load balancer", definition: "Distributes traffic across multiple servers." },
      { term: "CDN", definition: "Content served from near the user." },
      { term: "Latency", definition: "How long one thing takes." },
      { term: "Throughput", definition: "How much work per unit time." },
      { term: "Horizontal / vertical scaling", definition: "More machines / bigger machines." },
      { term: "Monolith / microservices", definition: "One deployable unit / many." },
      { term: "Synchronous / asynchronous", definition: "The caller waits / it doesn't." },
      { term: "Bottleneck", definition: "The one component limiting everything else." },
      {
        term: "Single point of failure",
        definition: "The thing whose death kills the system.",
      },
      {
        term: "Idempotency",
        definition: "Safe to run twice. Matters enormously with queues and retries.",
      },
      {
        term: "Eventual consistency",
        definition: "Different parts of the system briefly disagree, then converge.",
      },
    ],
    doneWhen: "Discuss 14 of 18 questions about your own system intelligently and you've hit the target.",
  },
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
