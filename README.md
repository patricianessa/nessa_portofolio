# Nessa Portfolio — macOS-Inspired Portfolio

A personal portfolio website for **Patricia Nessa Mae**, a DevOps Intern at Adira Finance with a background in data engineering. Built with React, TypeScript, and Vite, with a light macOS-inspired glass aesthetic.

## Features

- **Connected page** — Home, Projects, Experience, About, and Contact in one scrollable reading path
- **Glass dock** — Labeled section links with an active indicator that follows scrolling
- **Projects** — Category filters and animated inline details; closing returns focus to the project control
- **Optional terminal** — `help`, `whoami`, `skills`, `projects`, `contact`, and `clear`, with visible command shortcuts
- **Complete background** — Education, certifications, leadership, and readable skills within About
- **Accessible navigation** — Skip link, semantic landmarks, keyboard focus, anchor URLs, and reduced-motion support
- **Responsive** — Desktop, tablet, mobile, and short-screen layouts with space reserved for the dock

Project summaries use the existing source data. Supporting project artifacts and verification links are not fabricated when unavailable.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Drag | react-draggable |
| Container | Docker + Nginx (multi-stage) |

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Docker

### Build & Run

```bash
docker compose up --build
```

The app will be served at [http://localhost](http://localhost).

### Manual Build

```bash
docker build -t nessa-portfolio .
docker run -p 80:80 nessa-portfolio
```

## Project Structure

```
src/
├── App.tsx                  # Root with reduced-motion configuration
├── main.tsx                 # Entry point
├── index.css                # Global styles (Tailwind + macOS theme)
├── components/
│   ├── Desktop.tsx          # Connected page and active-section tracking
│   ├── TopBar.tsx           # Identity and direct contact
│   ├── Dock.tsx             # Glass anchor navigation
│   ├── HeroWidget.tsx       # Introduction, portrait, and primary actions
│   ├── SectionContent.tsx   # Experience, About, and Contact content
│   ├── FinderProjects.tsx   # Project filters and inline expansions
│   ├── TerminalWindow.tsx   # Optional command interface
│   ├── ...                  # Earlier desktop components retained but not mounted
├── data/
│   ├── profile.ts           # Name, title, about, experience, education
│   ├── projects.ts          # Project entries
│   ├── skills.ts            # Skills by category
│   ├── certifications.ts    # Certifications
│   └── leadership.ts        # Leadership & organization experience
├── types/
│   └── window.ts            # Window type definitions
└── lib/
    └── motion.ts            # Shared Framer Motion variants
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

MIT