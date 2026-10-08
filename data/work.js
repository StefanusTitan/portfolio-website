/*
  Schematic format
  nodes: placed on a grid (col, row). kind: step | gate | store | end | reject
  edges: from -> to. route "vh" leaves vertically then turns, "hv" leaves horizontally.
  kind on an edge: "no" (failed or rejected path) or "alt" (secondary path).
  Keep grids within 4 columns and 3 rows; they transpose to vertical on narrow screens.
*/

export const duluin = {
  company: "Duluin",
  location: "Bandung, Indonesia",
  roles: [
    { title: "Software Engineer", period: "Since October 2026" },
    { title: "Software Engineer Intern", period: "June 30 to September 30, 2026" },
  ],
  intro: [
    "Duluin makes Workin, an HR platform. It's split into a bunch of services: a Next.js dashboard, Node.js and Go backends, some Python for the AI parts, and a Laravel app for sign-in.",
    "I joined as an intern and got to own a few features, which meant working across a lot of those services. They kept me on as a software engineer afterwards.",
  ],
  systems: [
    {
      id: "calendar",
      name: "Calendar",
      period: "Jun 30 to Sep 21",
      summary:
        "Workin's calendar: month, week, day and agenda views, recurring events, reminders and attachments.",
      body: [
        "The backend is in Go, including the code that reads and writes .ics calendar files, with recurring events and exceptions. Event times are stored as local time plus a timezone, which fixed meetings showing up at the wrong hour for people in other timezones.",
        "On the frontend I did drag-to-create on the week grid, swiping between weeks, public holidays, attachments and reminders.",
      ],
      stack: "Go, GoFiber, GORM, MinIO, Next.js, TypeScript",
    },
    {
      id: "meet",
      name: "Meet",
      period: "Jul 20 to Sep 16",
      summary: "Video calls inside Workin, linked to the calendar.",
      body: [
        "The calls themselves run on LiveKit, with screen sharing, in-call chat, and separate host and guest permissions. I built the Go service that sets up the rooms and the Next.js app around the call.",
        "Turn on video for a calendar event and the room gets created and the link goes into the invite. Edit or delete the event and the room follows along.",
      ],
      stack: "Go, GoFiber, LiveKit, Next.js",
      diagram: {
        nodes: [
          { id: "event", label: "Calendar event", sub: "synced with Meet", col: 0, row: 0 },
          { id: "room", label: "Create room", sub: "calendar calls the Meet API", col: 1, row: 0 },
          { id: "link", label: "Attach join link", sub: "meet code saved on the event", col: 2, row: 0 },
          { id: "invites", label: "Invites sent", sub: "every attendee gets the link", col: 3, row: 0, kind: "end" },
          { id: "signal", label: "LiveKit room", sub: "the call itself", col: 1, row: 1 },
          { id: "peers", label: "Participants", sub: "video, screen share, chat", col: 2, row: 1 },
        ],
        edges: [
          { from: "event", to: "room" },
          { from: "room", to: "link" },
          { from: "link", to: "invites" },
          { from: "room", to: "signal", label: "on join" },
          { from: "signal", to: "peers" },
        ],
      },
    },
    {
      id: "tracking",
      name: "Live tracking",
      period: "Sep 13 to Sep 22",
      summary: "Shows where field staff are and the route they took, on a map.",
      body: [
        "The phone app sends GPS points in batches instead of one at a time, which is easier on the battery. Each point has a sequence number, so a resent batch doesn't turn into duplicate points.",
        "The server keeps everyone's latest position and their route history, and the dashboard checks for new positions every 15 seconds. On the map each person gets their own trail color, and supervisors can scroll back through a shift.",
      ],
      stack: "Node.js, WebSocket, MySQL, Next.js, Google Maps",
      diagram: {
        nodes: [
          { id: "phone", label: "Phone app", sub: "buffers GPS points", col: 0, row: 0 },
          { id: "ingest", label: "Ingest", sub: "drops repeated points", col: 1, row: 0 },
          { id: "latest", label: "Latest position", sub: "one row per person", col: 2, row: 0, kind: "store" },
          { id: "map", label: "Dashboard map", sub: "refreshes every 15 s", col: 3, row: 0, kind: "end" },
          { id: "history", label: "Route history", sub: "per assignment", col: 1, row: 1, kind: "store" },
        ],
        edges: [
          { from: "phone", to: "ingest", label: "batches" },
          { from: "ingest", to: "latest" },
          { from: "latest", to: "map", label: "polled" },
          { from: "ingest", to: "history" },
        ],
      },
    },
    {
      id: "ocr",
      name: "Receipt OCR",
      period: "Jul 4 to Aug 20",
      summary: "Fill in an expense claim by taking a photo of the receipt.",
      body: [
        "First a small image model checks that the photo is actually a receipt, so random photos get turned away before anything expensive runs.",
        "The photo gets preprocessed, OCR reads the text, and an LLM picks out the description, date and amount for the claim. If one photo has several receipts in it, a vision model reads them instead.",
      ],
      stack: "Python, FastAPI, ONNX Runtime, SigLIP, RapidOCR, Qwen",
      diagram: {
        nodes: [
          { id: "photo", label: "Receipt photo", sub: "from the claim form", col: 0, row: 0 },
          { id: "gate", label: "Is it a receipt?", sub: "small image model", col: 1, row: 0, kind: "gate" },
          { id: "count", label: "One receipt?", col: 2, row: 0, kind: "gate" },
          { id: "ocr", label: "Read text", sub: "preprocess, then OCR", col: 3, row: 0 },
          { id: "reject", label: "Turned away", sub: "before any LLM call", col: 1, row: 1, kind: "reject" },
          { id: "vision", label: "Vision model", sub: "reads each receipt", col: 2, row: 1 },
          { id: "extract", label: "Extract fields", sub: "LLM: description, date, amount", col: 3, row: 1 },
          { id: "claim", label: "Claim filled in", sub: "for the employee to confirm", col: 3, row: 2, kind: "end" },
        ],
        edges: [
          { from: "photo", to: "gate" },
          { from: "gate", to: "count", label: "yes" },
          { from: "gate", to: "reject", label: "no", kind: "no" },
          { from: "count", to: "ocr", label: "yes" },
          { from: "count", to: "vision", label: "no", kind: "alt" },
          { from: "ocr", to: "extract" },
          { from: "extract", to: "claim" },
          { from: "vision", to: "claim", route: "vh" },
        ],
      },
    },
    {
      id: "cv",
      name: "CV analyzer",
      period: "Jul 27 to Sep 8",
      summary: "Reads a candidate's CV, looks at their public code, and gives recruiters a summary for the role.",
      body: [
        "It parses PDF and Word files, then looks at the candidate's GitHub, GitLab, Bitbucket or Hugging Face through a headless browser that's locked down to the public internet.",
        "The write-up has to cite where each point came from, so recruiters can check it instead of taking it on trust. They get a fit score, strengths and a few questions worth asking in the interview, in Indonesian or English.",
      ],
      stack: "Python, FastAPI, Rust extractors, Playwright, Squid, Qwen",
      diagram: {
        nodes: [
          { id: "upload", label: "CV upload", sub: "PDF, DOCX or DOC", col: 0, row: 0 },
          { id: "parse", label: "Parse", sub: "PDF and Word", col: 1, row: 0 },
          { id: "evidence", label: "Check public work", sub: "GitHub, GitLab and others", col: 2, row: 0 },
          { id: "evaluate", label: "Compare with the job", sub: "LLM, with sources", col: 3, row: 0 },
          { id: "sandbox", label: "Locked-down browser", sub: "Playwright behind a proxy", col: 2, row: 1, kind: "store" },
          { id: "report", label: "Report", sub: "score, strengths, questions", col: 3, row: 1, kind: "end" },
        ],
        edges: [
          { from: "upload", to: "parse" },
          { from: "parse", to: "evidence" },
          { from: "evidence", to: "evaluate" },
          { from: "evidence", to: "sandbox", label: "via", kind: "alt" },
          { from: "evaluate", to: "report" },
        ],
      },
    },
    {
      id: "assets",
      name: "Asset management",
      period: "Aug 11 to Sep 21",
      summary: "Keeps track of company laptops, phones and vehicles, and who has them.",
      body: [
        "An item can only be with one person at a time. When a request is accepted the item is reserved and other requests for it are cancelled, and handovers and returns need photos.",
        "Smaller companies have one person approve requests directly, bigger ones send them through an approval chain. There are also QR labels, maintenance, write-offs for lost items, and Excel and PDF exports.",
      ],
      stack: "Node.js, Express, Sequelize, Go, Laravel queues, Next.js",
      diagram: {
        nodes: [
          { id: "chain", label: "Approval chain", sub: "for bigger companies", col: 1, row: 0 },
          { id: "lost", label: "Lost", sub: "written off", col: 3, row: 0, kind: "reject" },
          { id: "requested", label: "Requested", sub: "by the employee", col: 0, row: 1 },
          { id: "pic", label: "PIC approves", sub: "direct mode", col: 1, row: 1 },
          { id: "reserved", label: "Reserved", sub: "other requests cancelled", col: 2, row: 1 },
          { id: "issued", label: "Issued", sub: "handover photos", col: 3, row: 1 },
          { id: "returned", label: "Returned", sub: "inspected, then available", col: 2, row: 2, kind: "end" },
          { id: "pending", label: "Return pending", sub: "return photos", col: 3, row: 2 },
        ],
        edges: [
          { from: "requested", to: "pic", label: "direct" },
          { from: "requested", to: "chain", route: "vh", label: "policy" },
          { from: "pic", to: "reserved" },
          { from: "chain", to: "reserved", route: "hv" },
          { from: "reserved", to: "issued" },
          { from: "issued", to: "lost", kind: "no" },
          { from: "issued", to: "pending" },
          { from: "pending", to: "returned" },
        ],
      },
    },
    {
      id: "2fa",
      name: "Two-factor sign-in",
      period: "Aug 5 to Sep 4",
      summary: "Authenticator app and email codes for signing in to Workin. Admins can make it required.",
      body: [
        "Standard authenticator codes, with the secrets encrypted, recovery codes hashed, and a check so the same code can't be used twice.",
        "Signing in works like before, but the Workin dashboard stays locked until you pass the second step. If an admin makes it required, people set it up the next time they sign in.",
      ],
      stack: "PHP, Laravel, Passport, Next.js",
      diagram: {
        nodes: [
          { id: "signin", label: "Sign in", sub: "password, OAuth token", col: 0, row: 0 },
          { id: "has", label: "2FA set up?", col: 1, row: 0, kind: "gate" },
          { id: "verify", label: "Verify code", sub: "app or email", col: 2, row: 0 },
          { id: "open", label: "Workin opens", sub: "after the second step", col: 3, row: 0, kind: "end" },
          { id: "setup", label: "Set up now", sub: "QR code and 8 recovery codes", col: 1, row: 1 },
        ],
        edges: [
          { from: "signin", to: "has" },
          { from: "has", to: "verify", label: "yes" },
          { from: "has", to: "setup", label: "no", kind: "alt" },
          { from: "setup", to: "verify", route: "hv" },
          { from: "verify", to: "open" },
        ],
      },
    },
    {
      id: "cfit",
      name: "CFIT assessment",
      period: "Jul 14 to Jul 22",
      summary: "An online version of the Culture Fair Intelligence Test, scored automatically.",
      body: [
        "Four timed subtests, with answers locked when time runs out. The questions are fixed when a session starts, so they can't change halfway through.",
        "Answers are scored and converted to an IQ estimate on submission, and HR can export the results.",
      ],
      stack: "Go, GoFiber, GORM, MySQL, Next.js",
      diagram: {
        nodes: [
          { id: "series", label: "Series", sub: "subtest 1, timed", col: 0, row: 0 },
          { id: "classification", label: "Classification", sub: "subtest 2, timed", col: 1, row: 0 },
          { id: "matrices", label: "Matrices", sub: "subtest 3, timed", col: 2, row: 0 },
          { id: "conditions", label: "Conditions", sub: "subtest 4, timed", col: 3, row: 0 },
          { id: "snapshot", label: "Session snapshot", sub: "questions fixed at start", col: 0, row: 1, kind: "store" },
          { id: "score", label: "Score", sub: "IQ estimate", col: 3, row: 1, kind: "end" },
        ],
        edges: [
          { from: "snapshot", to: "series" },
          { from: "series", to: "classification" },
          { from: "classification", to: "matrices" },
          { from: "matrices", to: "conditions" },
          { from: "conditions", to: "score", label: "submit" },
        ],
      },
    },
  ],
  alsoTitle: "Smaller things",
  also: [
    "Indonesian income tax (PTKP and TER) calculations",
    "Caching in the API gateway",
    "PDF and Excel report exports",
    "The 2FA screen and a remember-me option in the sign-in portal",
    "Indonesian and English translations across the dashboard",
    "Docs for a few of the systems above",
  ],
};

export const gentech = {
  company: "GenTech AI",
  location: "Kuala Lumpur, remote",
  roles: [{ title: "Software Engineer Intern", period: "February to August 2025" }],
  points: [
    "Worked on AI products: document management, a streaming chat, and pulling images out of PDF and Word files. Lots of API integration, including the WhatsApp Business API.",
    "Built shared Vue and React components used across several apps, which made new screens quicker to put together.",
    "Moved background jobs to BullMQ with retries, and added logging to the backend so failures were easier to track down.",
  ],
};
