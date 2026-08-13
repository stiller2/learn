export type Resource = {
  title: string;
  url: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
};

export type DoBlock =
  | { type: "text"; content: string }
  | { type: "code"; language: string; content: string };

export type Session = {
  number: number;
  part: number;
  title: string;
  timeEstimate: string;
  whyItMatters: string;
  objectives: string[];
  resources: Resource[];
  doBlocks: DoBlock[];
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
    doBlocks: [
      {
        type: "text",
        content:
          'Ask Claude: "Walk me through exactly what happens when I type doordash.com into Chrome and load the homepage. Cover DNS, browser, server, frontend, backend, database, APIs, and HTTP at the level of a startup founder."',
      },
      {
        type: "text",
        content:
          "Then close it and draw the whole chain on paper from memory. Then explain it out loud to nobody. The drawing and the explaining are the session — the reading is just input.",
      },
      {
        type: "text",
        content:
          "Second thing: open any website, open Chrome DevTools (Cmd+Option+I), click the Network tab, and reload. You're now watching dozens of real HTTP requests. Click one. Look at the method, the status, the headers. You don't need to understand it yet — you need to know this panel exists, because Session 15 lives here.",
      },
    ],
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
    doBlocks: [
      {
        type: "text",
        content:
          'Ask Claude Code: "Create a small script that calls a free public API, prints the status code, and prints the returned JSON. Under 30 lines. Explain every line before I run it."',
      },
      {
        type: "text",
        content:
          "Run it. Then break it on purpose, one thing at a time: wrong endpoint, missing parameter, malformed URL. Note what each failure looks like — you're building a library of failure shapes that'll pay off in Session 15.",
      },
      {
        type: "text",
        content:
          'Then ask: "Show me exactly which part of this is the HTTP request and which part is the response."',
      },
      { type: "text", content: "The picture to internalize:" },
      {
        type: "code",
        language: "text",
        content:
          'Your program\n  ↓\nGET https://api.example.com/company/123\n  ↓\nAPI server\n  ↓\n{ "id": 123, "name": "Acme" }',
      },
      {
        type: "text",
        content:
          "An API is not magic. It is software sending structured requests to other software and getting structured answers back.",
      },
    ],
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
    doBlocks: [
      {
        type: "text",
        content:
          "A database is a set of tables. Tables have rows and columns. Tables point at each other using IDs.",
      },
      {
        type: "code",
        language: "text",
        content:
          "USERS\nid | name | email\n-----------------------\n1  | Bob  | bob@x.com\n2  | Sue  | sue@x.com\n\nCOMPANIES\nid | user_id | name\n-----------------------\n1  | 2       | Stripe\n2  | 2       | OpenAI\n3  | 1       | Airbnb",
      },
      {
        type: "text",
        content:
          'user_id is what connects them. That one idea — a column in one table pointing at a row in another — is most of what "relational database" means.',
      },
      {
        type: "text",
        content:
          'Work through SQLBolt lessons 1 through 6 — interactive, instant feedback, no setup. Do these first. Then read PostgreSQL\'s "The SQL Language" sections 2.2 through 2.5: concepts, creating a table, populating it, querying it.',
      },
    ],
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
    doBlocks: [
      {
        type: "text",
        content:
          "Work through SQLBolt lessons 6 through 13: joins, NULLs, aggregates, order of execution. Read PostgreSQL tutorial sections 2.6 (joins) and 2.7 (aggregates). Mode SQL Tutorial — Intermediate has the clearest free explanation of GROUP BY and joins available anywhere.",
      },
      { type: "text", content: "The two queries to write cold:" },
      {
        type: "code",
        language: "sql",
        content: "SELECT *\nFROM companies\nWHERE industry = 'AI';",
      },
      {
        type: "code",
        language: "sql",
        content:
          "SELECT users.name, COUNT(companies.id)\nFROM users\nJOIN companies ON users.id = companies.user_id\nGROUP BY users.name;",
      },
      {
        type: "text",
        content:
          "Exercise: design the CRM schema yourself, on paper, before consulting anything. Three tables: users, companies, notes. Write down every column and every foreign key.",
      },
      {
        type: "text",
        content:
          "Then answer: how would you retrieve every note belonging to Stripe? Write the SQL first. Then check it.",
      },
    ],
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
    doBlocks: [
      {
        type: "text",
        content:
          "Read and do: work through the GitHub — Hello World tutorial, actually doing it. Read GitHub Flow once — this is the collaboration model.",
      },
      { type: "text", content: "Commands worth having:" },
      {
        type: "code",
        language: "shell",
        content:
          "pwd   ls   cd   mkdir             # moving around\ngit status   git diff            # what has changed\ngit add   git commit   git push  # save and share\ngit pull                         # get others' changes\ngit branch   git checkout        # parallel work\ngit log                          # history",
      },
      {
        type: "text",
        content:
          "Exercise: in a scratch repo, branch off main, change a file, commit, push, open a PR against main, merge it.",
      },
      {
        type: "text",
        content:
          "Then create a merge conflict on purpose — edit the same line on two branches and merge them. Resolve it. The conflict is the point. It looks alarming until you've done it once, at which point it's a five-minute annoyance forever after.",
      },
    ],
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
    doBlocks: [
      { type: "text", content: "The framing:" },
      {
        type: "code",
        language: "text",
        content:
          "HTML       = structure\nCSS        = appearance\nJavaScript = behavior\nReact      = building interfaces out of reusable components\nNext.js    = a framework around React adding routing, server code, and builds",
      },
      {
        type: "text",
        content: "Do not try to learn React properly here. Recognition, not mastery.",
      },
      { type: "text", content: "Build three pages, zero styling effort:" },
      {
        type: "code",
        language: "text",
        content: "/               dashboard\n/companies      list of companies\n/companies/new  add-company form",
      },
      {
        type: "text",
        content:
          'Tell Claude Code: "Keep this extremely simple. I care about architecture, not visual polish."',
      },
      {
        type: "text",
        content:
          'Then inspect: spend a real 15 minutes asking, "Explain this application file by file. Start with what matters most and skip config unless it\'s important," and "When I load /companies, exactly which code produces what I see?"',
      },
      {
        type: "text",
        content:
          "This inspection step is more valuable than the building step. The building is fast; understanding what got built is the skill.",
      },
    ],
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
    doBlocks: [
      { type: "text", content: "Build one endpoint, no database yet:" },
      {
        type: "code",
        language: "text",
        content:
          'POST /api/companies\n\nin:  { "name": "Stripe" }\nout: { "success": true, "company": "Stripe" }',
      },
      { type: "text", content: "Wire your add-company form to it." },
      {
        type: "text",
        content:
          "The exercise that matters most here: open Chrome DevTools → Network tab. Submit the form. Click your request. Find:\nthe method\nthe URL\nthe status code\nthe request payload\nthe response body",
      },
      {
        type: "text",
        content:
          "You are now watching frontend → HTTP → backend → HTTP → frontend. Spend twenty minutes here. Click through requests. Change the form input and watch the payload change. This panel is where you'll spend most of Session 15, and where most real debugging starts.",
      },
    ],
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
    doBlocks: [
      { type: "text", content: "Create the tables you designed in Session 4:" },
      {
        type: "code",
        language: "text",
        content: "companies:  id, name, user_id, created_at\nnotes:      id, company_id, content, created_at",
      },
      { type: "text", content: "Then wire both directions:" },
      {
        type: "code",
        language: "text",
        content:
          "Add Company     → POST → backend → Supabase → INSERT\nCompanies page  →        backend → Supabase → SELECT → display",
      },
      {
        type: "text",
        content:
          "The test that makes it real: add a company. Close the browser. Stop the dev server entirely. Restart everything.",
      },
      { type: "text", content: "It's still there." },
      { type: "text", content: "That's persistence. Obvious in the abstract, different when you watch it." },
      {
        type: "text",
        content:
          "Then use your SQL: open the Supabase SQL editor and run the queries from Session 4 against your own data. Join companies and notes. Count notes per company. This is the moment SQL becomes a tool rather than a subject.",
      },
    ],
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
    doBlocks: [
      {
        type: "text",
        content:
          "Build signup, login, logout. Then make companies belong to users — and verify a second account genuinely cannot see the first account's data. Actually test it with two accounts. Assumptions here are how breaches happen.",
      },
      {
        type: "text",
        content:
          'Ask Claude: "Walk me through everything that happens technically when I enter my email and password and click Login. Where does the user\'s identity live on subsequent requests? Explain cookies, sessions, JWTs, authentication, and authorization at the depth a founder needs — not more."',
      },
    ],
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
    doBlocks: [
      { type: "text", content: "Connect GitHub → Vercel → deploy. Then internalize the chain:" },
      {
        type: "code",
        language: "text",
        content: "Your laptop → git push → GitHub → Vercel builds → public URL",
      },
      { type: "text", content: "Note that GitHub is the middleman. Vercel never talks to your machine." },
      {
        type: "text",
        content:
          "The part that actually matters: your database password and API keys must never appear in your source code, because your source code is on GitHub and your frontend code is downloadable by every visitor to your site.",
      },
      {
        type: "code",
        language: "text",
        content:
          "Browser = user-controlled, fully inspectable, never trusted with secrets\nServer  = your environment, where secrets can live",
      },
      { type: "text", content: "If you take one security idea from this course, take this one." },
      {
        type: "text",
        content:
          "Exercise: send the URL to someone. Have them sign up, add a company, add a note. Then find the row they created in your Supabase dashboard.",
      },
      {
        type: "text",
        content:
          "Then, separately: open your deployed site, open DevTools → Sources, and look at what JavaScript the browser actually downloaded. Everything there is public. That's why the boundary matters.",
      },
    ],
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
    doBlocks: [
      {
        type: "text",
        content:
          "Tokens. Models don't read words; they read tokens — chunks of roughly ¾ of a word in English. Everything is priced and limited in tokens: what you send, what comes back. A 10-page document is roughly 5,000 tokens. This is the unit of both cost and capacity.",
      },
      {
        type: "text",
        content:
          'Context window. How much the model can hold in mind at once, measured in tokens. Everything the model "knows" about your specific situation has to fit — the system prompt, conversation history, retrieved documents, the question. Exceed it and something gets dropped.',
      },
      {
        type: "text",
        content:
          "Training vs inference. Training is the enormously expensive one-time process that produced the model. Inference is running it to get an answer, which is what you pay for per call. Fine-tuning is additional training on your own data — usually the wrong solution, and worth knowing that so you can question it when someone proposes it.",
      },
      {
        type: "text",
        content:
          'Cost and latency. Input tokens are cheaper than output tokens. Bigger models cost more and respond slower. A product that sends 50,000 tokens per request behaves very differently, economically, from one that sends 500. When someone pitches an AI product, "how many tokens per user action?" is a sharp question.',
      },
      {
        type: "text",
        content:
          'Hallucination. The model produces fluent, confident, wrong output. It has no internal signal distinguishing this from correct output — which is why "the AI will just check its work" isn\'t a plan, and why evals exist.',
      },
      {
        type: "text",
        content:
          "Non-determinism. The same input can produce different output. This breaks most conventional software assumptions and is the reason testing AI features is a genuinely hard problem.",
      },
      {
        type: "text",
        content:
          "Do: open the tokenizer. Paste in a paragraph of your own writing, then a table of numbers, then a code snippet. Notice how differently they tokenize.",
      },
      {
        type: "text",
        content:
          "Then take a product you know and estimate: how many tokens per user action? What would that cost at 10,000 users a day? Look up current pricing and actually do the arithmetic. This is the calculation nobody does and everyone should.",
      },
    ],
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
    doBlocks: [
      { type: "text", content: 'Build an "Analyze Company" button:' },
      {
        type: "code",
        language: "text",
        content:
          "Click\n  ↓\nPOST /api/analyze\n  ↓\nbackend fetches that company's notes from Postgres\n  ↓\nsends them to the model with a prompt\n  ↓\nreturns the response\n  ↓\ndisplay it",
      },
      {
        type: "text",
        content:
          'Notice what the backend is doing: assembling context from your database and constructing a prompt in code. That\'s most of what "AI engineering" is in practice.',
      },
      {
        type: "text",
        content:
          "The conceptual question to sit with: why can't the browser call the model API directly with your key?",
      },
      {
        type: "text",
        content:
          "Because anything in the browser is visible to the user. An exposed API key is someone else's free compute on your credit card, and it will be found within hours. The backend exists partly because it's the only place a secret can live.",
      },
      {
        type: "text",
        content:
          "Also handle:\nWhat does the user see while waiting? Model calls take seconds, not milliseconds.\nWhat happens if the call fails or times out?\nWhat happens if the model returns something unusable?\n\nThese three questions are most of the difference between a demo and a product.",
      },
    ],
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
    doBlocks: [
      {
        type: "text",
        content:
          "Part 1 — Structured output. Instead of a paragraph of prose, constrain the model to return exactly this:",
      },
      {
        type: "code",
        language: "json",
        content:
          '{\n  "summary": "...",\n  "strengths": ["...", "..."],\n  "risks": ["...", "..."],\n  "score": 8\n}',
      },
      {
        type: "text",
        content:
          "Then store it in your database. Why this is the key idea: prose can't be stored usefully, sorted, filtered, aggregated, or displayed in a table. Structured data can. This is most of what separates an AI feature from an AI demo — the demo produces impressive text, the feature produces data your product can actually use.",
      },
      { type: "text", content: "Part 2 — Tool calling." },
      {
        type: "code",
        language: "text",
        content:
          "User asks a question\n  ↓\nModel determines it needs data it doesn't have\n  ↓\nModel emits a tool call: get_company_notes(id)\n  ↓\nYOUR code runs the actual query\n  ↓\nResult goes back to the model\n  ↓\nModel answers using it",
      },
      {
        type: "text",
        content:
          "The model never touches your database. It requests; your code decides whether and how to comply. That distinction is the whole security model of agentic systems, and it's worth being crisp about.",
      },
      {
        type: "text",
        content:
          "Implement exactly one tool. Don't build a multi-agent system. Watch the sequence, log every step, understand it.",
      },
      {
        type: "text",
        content:
          "Part 3 — Evals. Conventional software: same input, same output, so you write tests. AI: same input, different output, so tests don't work. Evals are the replacement — a set of cases with graded outputs, run repeatedly, tracked over time.",
      },
      {
        type: "text",
        content:
          'Every serious AI company has an eval system and most of them consider it their real moat. Knowing this puts you ahead of most people using the word "agent."',
      },
    ],
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
    doBlocks: [
      {
        type: "text",
        content:
          "The problem: you have 100,000 documents and a context window that fits maybe 200 of them. So:",
      },
      {
        type: "code",
        language: "text",
        content:
          "User question\n  ↓\nConvert the question to an embedding\n  ↓\nFind the most similar document chunks\n  ↓\nPut only those in the context\n  ↓\nModel answers using them",
      },
      {
        type: "text",
        content:
          "That's RAG. Less exotic than it sounds: it's search, followed by a prompt. Most of the difficulty is in the search half, not the model half — which is why RAG systems usually underperform initially.",
      },
      { type: "text", content: "The framing that matters:" },
      {
        type: "code",
        language: "text",
        content:
          "AI product = conventional software\n           + model calls\n           + retrieval\n           + tools\n           + data\n           + evaluation\n           + interface",
      },
      {
        type: "text",
        content:
          "Not: AI product = LLM. The most common failure among non-technical founders is assuming the model is the product. In a real AI application the model calls are usually a small fraction of the code and a smaller fraction of the difficulty.",
      },
    ],
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
    doBlocks: [
      {
        type: "text",
        content:
          'The rule for this session: when something breaks, don\'t ask Claude Code to fix it. Ask: "Don\'t change any code yet. Help me identify which layer is failing, what evidence we have, and the three most likely causes." Then investigate yourself. The fix is worth less than the diagnosis.',
      },
      {
        type: "text",
        content:
          "Break your app on purpose. Four failures, one at a time. For each, find the evidence before fixing:\n1. Wrong API URL — find the failed request in the Network panel. What status? What does the response say?\n2. Misspelled API key — find the backend error. Note where it surfaces and where it doesn't.\n3. Query a column that doesn't exist — read the database error message properly. Database errors are unusually informative.\n4. Return malformed JSON — watch what the frontend does. Note that the failure appears far from its cause.",
      },
      {
        type: "text",
        content:
          "That fourth one is the important lesson: where an error appears is often not where it originated.",
      },
      { type: "text", content: "The tree to use every time:" },
      {
        type: "code",
        language: "text",
        content:
          "Something's wrong\n  ↓\nDid the UI even try?          → browser console\n  ↓\nDid a request go out?         → Network panel\n  ↓\nWhat status came back?        → Network panel\n  ↓\nDid the backend receive it?   → server logs\n  ↓\nDid the DB or API call work?  → server logs, DB dashboard\n  ↓\nWhat exactly came back?       → response body",
      },
      {
        type: "text",
        content:
          "Almost every bug localizes by walking this in order. The skill is refusing to skip steps.",
      },
    ],
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
    doBlocks: [
      {
        type: "text",
        content:
          "Pick a real open-source Next.js project on GitHub — something with a few thousand stars, not a tutorial repo. Then answer these without asking anyone:\n1. Where does the app start? What's the entry point?\n2. Where does the UI live?\n3. Where are the API routes or server functions?\n4. Where is the database schema defined?\n5. What external services does it use?\n6. Where do credentials get configured?\n7. Trace one feature end to end — from the button to the database and back.",
      },
      {
        type: "text",
        content: "You will struggle. That's the exercise. Give it a full 45 minutes before asking for help.",
      },
      {
        type: "text",
        content:
          "Then: ask Claude Code the same questions. Compare its answers to yours. Where you were wrong, work out what signal you missed — that's the actual learning.",
      },
      {
        type: "text",
        content:
          "The files that tell you the most, fastest:\nREADME.md — what the maintainers thought mattered\npackage.json — every dependency, i.e. every external thing this touches\n.env.example — every service it connects to\nfolder structure — usually the architecture in miniature\nrecent commits — what's actively being worked on",
      },
    ],
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
    doBlocks: [
      {
        type: "text",
        content:
          "Exercise A — design four systems, 10 minutes each.\n\n1. Your own CRM. Draw it completely, from memory, before looking at anything.\n\n2. Dropbox. Where do files live? Where does metadata live? What happens when a second device wants the file? Why are those two storage systems different?\n\n3. Uber. Where does location data go? How does the system find nearby drivers? How do rider and driver stay in sync? What breaks at scale?\n\n4. An AI customer support agent. Where does customer data come from? What tools can the model call? What happens when it's uncertain? What requires human approval? What do you log?\n\nCorrectness isn't the point. Decomposing a product into technical components is.",
      },
      {
        type: "text",
        content:
          "Exercise B — scoping and estimation. For each, estimate how long a competent engineer would take. Write your number down first, then check your reasoning with Claude and see how far off you were.\n\nAdd a \"delete company\" button\nAdd CSV export of all notes\nAdd a second user role with different permissions\nChange the primary key type on an existing table with data in it\nSwitch from Supabase to a different database\nAdd real-time updates so two users see each other's changes live\nAdd a full audit log of every change\nAdd support for a second language\n\nYou'll be badly wrong on at least two. The gap between your estimate and reality is the lesson — that's what calibrates you for the moment an engineer says \"three months\" and you need to know whether that's honest, padded, or optimistic.",
      },
      {
        type: "text",
        content:
          "Pay attention to which ones surprised you. Usually it's the ones that sound simple (changing a primary key, adding a language) and are structurally invasive.",
      },
      {
        type: "text",
        content:
          "The final test: draw your CRM architecture from memory, then answer:\n1. What happens when a user loads the page?\n2. What happens when they submit a company?\n3. Where is that company stored, physically?\n4. What SQL runs, roughly?\n5. What is JSON doing in this system?\n6. What does the backend do that the frontend can't?\n7. Why is authentication necessary, and what would break without it?\n8. What happens when the Analyze button is clicked, step by step?\n9. Where does the API key live and why there specifically?\n10. What does Vercel do? Supabase? GitHub? Why three separate things?\n11. What does a 500 mean, and how would you find the cause?\n12. What breaks first at 100,000 users?\n13. What would a cache help with here? What wouldn't it help with?\n14. What would a queue help with here?\n15. What would \"adding an agent\" actually mean in this system?\n16. How would you integrate a third-party service like Salesforce?\n17. How many tokens does one Analyze click cost, roughly, and what does that mean at scale?\n18. If the AI analysis started returning worse results next month, how would you know?\n\nDiscuss 14 of 18 intelligently and you've hit the target.",
      },
    ],
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

export type AggregatedGlossaryTerm = GlossaryTerm & {
  sessionNumber: number;
  sessionTitle: string;
};

export function getAllGlossaryTerms(): AggregatedGlossaryTerm[] {
  return sessions
    .flatMap((session) =>
      session.glossary.map((entry) => ({
        ...entry,
        sessionNumber: session.number,
        sessionTitle: session.title,
      })),
    )
    .sort((a, b) => a.term.localeCompare(b.term) || a.sessionNumber - b.sessionNumber);
}
