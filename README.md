# Campus Event Planner ✿ Your Campus, Your Moments

A dreamy, bright, and colorful **Pinterest-inspired** web application designed for college students to view and organize upcoming campus events. Built with pure **HTML5**, **CSS3 (with 3D Transforms, Stationery Details, and Glassmorphism)**, and **vanilla JavaScript** without any external libraries, frameworks, or databases.

---

## Table of Contents
1. [About the Project](#about-the-project)
2. [Art Direction & Aesthetic](#art-direction--aesthetic)
3. [Features](#features)
4. [Project Structure](#project-structure)
5. [How to Run & Preview](#how-to-run--preview)
6. [Git & Version Control Practical Steps](#git--version-control-practical-steps)

---

## About the Project

College campuses are packed with workshops, festivals, guest talks, and sports tournaments. The **Campus Event Planner** serves as an interactive moodboard and bulletin board where students can explore campus life, view event schedules, and RSVP to their favorites.

This project is tailored as an accessible template for **Git and Version Control practical exercises**, featuring clean vanilla code, modular files, and beginner-friendly structure.

---

## Art Direction & Aesthetic

Inspired by modern stationery brands, scrapbook moodboards, and colorful editorial design:
- **Palette**: Blush pink (`#FFD6E7`), lavender (`#DCD0FF`), butter yellow (`#FFF0A8`), mint green (`#C8F3DF`), and warm cream background (`#FFF9F0`) with deep plum high-contrast text (`#2A1B3D`).
- **Typography**: Editorial serif headings (*Fraunces*) paired with clean sans-serif body (*Plus Jakarta Sans*).
- **Details**: Translucent washi tape strips, cute floral stamps (`✿`), hand-crafted sticker badges, and soft dot-grid paper texture.
- **3D Features**: Lightweight CSS 3D perspective tilts on event cards, floating 3D moodboard polaroids, and mouse parallax depth.

---

## Features

- **Hero Moodboard**: Oversized typography (*"Your Campus, Your Moments ✿"*) with floating 3D polaroid photos, stickers, and interactive parallax.
- **3D Tilt Event Cards**: Cards respond naturally to cursor position with perspective rotation (`rotateX`, `rotateY`, `scale(1.02)`).
- **Asymmetrical Editorial Grid**: Pinterest-style card layout with playful tilt angles that align smoothly on hover.
- **Category Filter Tabs**: Instant filtering between Technology, Culture & Arts, Athletics, or All Gatherings.
- **Interactive Event Modal & RSVP**: Stationery note dialog with `localStorage` memory to save spots.
- **Contact & Proposal Section**: Integrated form for students to submit society gatherings.
- **Accessibility**: Automatic detection of `prefers-reduced-motion` to disable tilts and animations for sensitive users.

---

## Project Structure

```text
campus-event-planner/
│
├── index.html        # Semantic HTML layout, hero moodboard, and event cards
├── style.css         # Pastel color system, washi tape, 3D transforms, and grid
├── script.js         # Vanilla JS for 3D card tilt, parallax, filters, and modal
├── README.md         # Project documentation and Git assignment guide
└── .gitignore        # Ignored files (OS files, editor settings, temporary logs)
```

---

## How to Run & Preview

You do not need Node.js, Python, or build steps to run this project.

### Method 1: Direct Browser Open
1. Open the project directory on your computer.
2. Double-click `index.html` to open it in Google Chrome, Firefox, Safari, or Edge.

### Method 2: Live Server in VS Code
1. Open the project folder in **Visual Studio Code**.
2. Right-click `index.html` and select **"Open with Live Server"**.

---

## Git & Version Control Practical Steps

If using this project for your college Git lab assignment:

### 1. Check Status & Stage
```bash
git status
git add .
```

### 2. Commit the Redesign
```bash
git commit -m "style: redesign campus event planner with Pinterest moodboard aesthetic and 3D tilt"
```

### 3. Branching Practice
```bash
# Create and switch to a branch
git checkout -b feature/event-search

# Make changes, then merge back into main
git checkout main
git merge feature/event-search
```
## Project Overview

Campus Event Planner is a colourful, student-friendly website for exploring and organising campus events.

### Features
- Browse campus event information
- View event details in a modern, responsive layout
- Enjoy a bright, Pinterest-inspired design

### Technology
- React
- Vite
- Tailwind CSS

### How to Run the Project

1. Install Node.js.
2. Open the project folder in the terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL shown in the terminal.

This project demonstrates collaborative development and Git version control.