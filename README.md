# 🟦 Flowboard

A minimal, beginner-built **Kanban board** for organizing tasks across stages — built with pure HTML, CSS, and JavaScript as part of a structured frontend learning journey.

[Live Demo](https://coddiction-101.github.io/Frontend-Projects/Kanban-Board/) 

---

## 📸 Screenshots

### Homepage
![Homepage](https://github.com/Coddiction-101/Frontend-Projects/blob/main/Kanban-Board/homepage.png)

### Board
![Board](https://github.com/Coddiction-101/Frontend-Projects/blob/main/Kanban-Board/board.png)

---

## Project Overview

**Flowboard** is a lightweight task management app that lets you create, prioritize, edit, and move tasks across three stages — *To-Dos*, *Active*, and *Complete* — using a clean drag-and-drop interface.

The goal extends beyond basic task management:

* Practice clean and structured HTML
* Strengthen core JavaScript logic
* Understand state handling without frameworks
* Improve UI/UX decisions incrementally

---

## Features

* **Task creation** — add tasks via input form using Enter key or button click
* **Priority badges** — assign High, Medium, or Low priority
* **Drag and drop** — move cards freely across columns
* **Inline editing** — edit task names directly within the card
* **Delete tasks** — remove individual cards instantly
* **Clear board** — remove all tasks with confirmation
* **LocalStorage persistence** — retain tasks across sessions
* **First-visit handling** — initialize a clean board for new users
* **Animated homepage** — simple landing experience with transitions
* **Glassmorphism UI** — frosted inputs, select, and buttons
* **Responsive layout** — optimized for mobile and desktop

---

## Planned Features

> Features will be implemented incrementally with focus on usability, clarity, and maintainability.

### Timestamps

* Track `createdAt` and `updatedAt`
* Persist in local storage
* Display subtle metadata on each task

### Filtering and Search

* Filter tasks by text
* Optional priority-based filtering
* Non-destructive UI updates (no DOM re-rendering)

### Theme Support

* Light and dark mode toggle
* CSS variable-based theming
* Persist user preference

---

## Notes

* Features will be added step-by-step
* Maintain clean state management and UI consistency
* Preserve existing interactions (drag-and-drop, editing)

---

## Tech Stack

* **HTML5** — semantic structure
* **CSS3** — layout, glassmorphism, animations
* **JavaScript (ES6+)** — logic, drag and drop, localStorage

No frameworks or external libraries are used.

---

## Project Structure

```
flowboard/
├── index.html        Homepage
├── board.html        Kanban board
├── home.css          Homepage styles
├── style.css         Board styles
├── script.js         Board logic
├── screenshots/
│   ├── home.png
│   └── board.png
└── README.md
```

---

## How to Run Locally

1. Clone the repository
2. Open `index.html` in your browser
3. Click **Get Started** to navigate to the board

No build tools required.

---

## Learning Focus

* DOM manipulation
* Drag and drop API
* Event handling
* State management without frameworks
* LocalStorage persistence
* Writing maintainable frontend code
* UI/UX decision making

---

## Project Status

This project is a **learning sandbox**, not production-ready.
The codebase is continuously evolving and open to refactoring as understanding improves.

---
