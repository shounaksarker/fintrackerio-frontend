# FinTracker IO (Frontend)

FinTracker (Fin-Tracker-io) is a modern, comprehensive personal finance management web application. It empowers users to intuitively track their income, expenses, and balances across multiple wallets or accounts (terminals), monitor their financial health, and organize their budget efficiently.

This repository contains the **Frontend** application built with Next.js 14.

## 🔗 Links and Resources
- **Test / Staging Server:** [https://fintrackerio-stage.vercel.app](https://fintrackerio-stage.vercel.app)
- **Backend Repository:** [https://github.com/shounaksarker/fintrackerio-backend](https://github.com/shounaksarker/fintrackerio-backend)

---

## ✨ Features
- **Income & Expense Tracking:** Log incoming funds and outgoings against custom categories with detailed breakdowns and histories.
- **Terminal Management:** Track wealth across multiple distinct wallets or accounts (e.g., Pocket, bKash, Bank) with seamless inter-terminal transfers.
- **Monthly Budgets:** Define budget limits for specific expense categories and view progress bars to stay within limits.
- **Financial Health Score:** An automated algorithmic score calculating savings rates and budget adherence to gamify financial stability.
- **Financial Insights:** Intelligent trend analysis comparing your current spending behavior with preceding months.
- **Auto-transfer Balances:** A native setting to intelligently carry forward your remaining monthly balance into the next month.
- **Notes Module:** Personal notepad feature for logging financial reminders or lists.
- **Data Encryption:** User financial records are strictly protected and AES-encrypted on the backend.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Library:** React 18
- **Styling:** TailwindCSS 3
- **Data Fetching:** Axios
- **Charts:** Chart.js 4
- **Auth & Middleware:** Jose (JWT Edge Verification)
- **Tooling:** ESLint (Airbnb), Prettier, Husky (lint-staged)

---

## 🚀 Getting Started

### Prerequisites

You need Node.js installed on your machine. We recommend Node.js 22.x or above.

### 1. Clone the Repository

```bash
git clone https://github.com/shounaksarker/fintrackerio-frontend.git 
cd Fintracker-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
To run the app locally, create a `.env` file in the root directory and add the following keys. Make sure your local or remote backend server matches the `SERVER_URL`.

```env
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:3001
JWT_SECRET=your_super_secret_jwt_key
NEXT_PUBLIC_NODE_ENV=development | stage | production
```
*(Note: Using `NEXT_PUBLIC_NODE_ENV = development | stage` unlocks specific demo features in the UI like 'Demo Login' & 'Seed Demo Data'.)*

### 4. Start Development Server
```bash
npm run dev
```
Access the application by navigating to [http://localhost:3000](http://localhost:3000).

---

## 📁 Architecture Overview
FinTracker employs a **Double API Layer Structure:**
1. Actions / Client components hit the Next.js standard API Route Handlers (`/api/v1/*`).
2. The Route Handlers subsequently process and proxy these requests asynchronously to the Express Backend (`SERVER_URL/api/*`).

*(For an exhaustive understanding of the database structure, security schema, and backend endpoints, please refer to the `PROJECT_OVERVIEW.md` located in the root of this workspace.)*

## 🔮 Upcoming
See `UPCOMING_PLAN.md` for a summary of planned future expansions, including Recurring Transactions, Custom Savings Goals, Debt Loan Ledgers, and more.