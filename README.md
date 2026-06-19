# Nessa Portfolio — macOS-Inspired Portfolio

A personal portfolio website for **Patricia Nessa Mae** — a Data Engineer & DevOps Engineer — designed as a macOS desktop experience. Built with React, TypeScript, and Vite.

## Features

- **Boot Screen** — Animated macOS-style boot sequence on load
- **macOS Desktop** — Full-screen desktop with a wallpaper, cursor spotlight effect, and draggable windows
- **Dock Navigation** — Persistent dock with app icons for each portfolio section (About, Experience, Projects, Skills, Education, Certifications, Leadership, Contact)
- **Full-Screen Overlays** — Each section opens as a polished overlay with smooth transitions
- **Terminal Section** — Skills displayed in a retro terminal window with typewriter-like effect
- **Finder Projects** — macOS Finder sidebar layout for browsing projects with filtering by category
- **Keyboard Shortcuts** — `A` key opens About, `Escape` closes the active section
- **Responsive** — Adapts to desktop and tablet viewports

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
├── App.tsx                  # Root — boot screen → desktop flow
├── main.tsx                 # Entry point
├── index.css                # Global styles (Tailwind + macOS theme)
├── components/
│   ├── BootScreen.tsx       # Animated boot sequence
│   ├── Desktop.tsx          # Main desktop + dock + keyboard shortcuts
│   ├── TopBar.tsx           # macOS-style menu bar
│   ├── Dock.tsx             # Dock with app icons
│   ├── HeroWidget.tsx       # Hero card with profile intro
│   ├── FullScreenOverlay.tsx # Animated section overlay wrapper
│   ├── SectionContent.tsx   # Routes content to correct section component
│   ├── FinderProjects.tsx   # Projects in Finder sidebar layout
│   ├── TerminalWindow.tsx   # Skills in retro terminal UI
│   ├── MacWindow.tsx        # Reusable draggable Mac window
│   ├── ...                  # Cards, headers, timeline items, etc.
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