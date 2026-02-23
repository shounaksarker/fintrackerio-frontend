# Agent Rules & Guidelines (FinTracker)

> **CRITICAL:** All AI agents, coding assistants, and developers must read and strictly adhere to these rules before making any changes. This document replaces the need to scan the entire codebase and saves context limits.

## 1. 📖 First Steps (Context Gathering)
- **Mandatory Read:** Always read `PROJECT_OVERVIEW.md` FIRST. This is the single source of truth for the project's architecture, database schema, API logic, and tech stack. 
- **Targeted Reading:** Do NOT read the entire codebase to understand the project. The overview has what you need. Only read specific files (e.g., a specific component or endpoint) related to the immediate task.
- **Roadmap Check:** Review `UPCOMING_PLAN.md` if the user requests a new feature to ensure it aligns with the broader product strategy.

## 2. 🏛️ Architecture & API Rules
- **Double API Layer:** Remember the FinTracker architecture. Frontend Client Components call Next.js Local API Routes (`/app/api/v1/*`), which then act as a proxy and call the Express backend. Handlers are defined in `helpers/frontend/apiEndpoints.js` and `helpers/backend/endpoints.js`.
- **Use Client vs. Server:** This project uses Next.js 14 App Router. Distinguish clearly between Server Components and Client Components (`'use client';` required for hooks, state, and interactivity).
- **Styling:** Use Tailwind CSS exclusively. Do not write custom CSS files. Maintain visual consistency by utilizing existing reusable components mostly found in `src/components/fields` and `src/components/modals`.
- **Bilingual Content:** When adding user-facing explanatory text (manuals, tooltips), maintain the dual-language standard (English and Bengali) established in `src/assets/constants/index.js`.

## 3. 🛡️ Security & Environment
- **Environment Variables:** Never hardcode URLs. Utilize `CLIENT_URL` and `SERVER_URL` via environment variables or the helpers. 
- **Encryption:** Remember that sensitive text fields in the Database are AES-encrypted. Ensure backend API payloads adapt to this convention if you are writing full-stack code.
- **Node environment:** Always use `nvm use 22` to switch to Node.js version 22 before run frontend or backend in localhost. 

## 4. 📝 Final Step (Mandatory Documentation & Clean up)
- **Update Documentation:** Always update `PROJECT_OVERVIEW.md` at the very end of your task if you:
  - Added or modified API routes.
  - Modified the database schema.
  - Added major new UI modules or pages.
  - Added new environment variables.
- **Task Conclusion:** Ensure you leave no debugging `console.log` statements in production code. Run internal lint checks mentally (e.g., correct Tailwind class sorting, removing unused imports) before marking a task as complete.
