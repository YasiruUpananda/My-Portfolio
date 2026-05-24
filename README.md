# Cyberpunk Portfolio (Portrait)

A gaming-inspired RPG character-sheet portfolio in **fullscreen portrait** layout — each section fills the viewport with snap scrolling. Built with React, Node.js, Express, and Tailwind CSS.

## Stack

- **Client:** React 18, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide icons
- **Server:** Node.js, Express (serves portfolio data from JSON)

## Getting started

```bash
# Install all dependencies (root + client + server)
npm run install:all

# Run client (port 5173) and server (port 3001) together
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customize your data

Edit `server/data/portfolio.json` with your name, skills, projects, links, and stats. Changes reload automatically in dev mode.

## Production build

```bash
npm run build
NODE_ENV=production npm start
```

The Express server serves the built React app and API on port 3001.

## Project structure

```
├── client/          # React + Vite + Tailwind
│   └── src/
│       ├── components/
│       ├── hooks/
│       └── App.jsx
├── server/          # Express API
│   ├── data/portfolio.json
│   └── index.js
└── package.json
```
