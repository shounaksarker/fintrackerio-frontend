# FinTracker Frontend 💸

![Next.js](https://img.shields.io/badge/Next.js-14-black.svg?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4.svg?style=for-the-badge&logo=tailwindcss)
![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384.svg?style=for-the-badge&logo=chartdotjs)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black.svg?style=for-the-badge&logo=vercel)

The frontend application for **FinTracker** — a full-stack personal finance management web app that empowers users to track income, expenses, and multi-wallet balances with AES-encrypted data storage, automated recurring transactions, real-time notifications, and intelligent financial insights.

> 🔗 **Backend Repository:** [github.com/shounaksarker/fintrackerio-backend](https://github.com/shounaksarker/fintrackerio-backend)  
> 🌐 **Live Demo (Staging):** [fintrackerio-stage.vercel.app](https://fintrackerio-stage.vercel.app)

---

## 🏗️ Architecture

FinTracker employs a **Double API Layer** pattern for security and separation of concerns:

```
┌────────────────────────────────────────────────--──┐
│      Next.js 14 Frontend (Vercel)  ← You are here  │
│                                                    │
│  Client Components (pages, forms, charts)          │
│       ↓ form submit / fetch                        │
│  Server Actions (loginAction, signupAction, etc.)  │
│       ↓                                            │
│  /app/api/v1/* (BFF Proxy Layer)                   │
│       ↓ HTTPS via SERVER_URL                       │
└──────────────────┬─────────────────────────────────┘
                   │
┌──────────────────▼─────────────────────────────────┐
│         Express.js Backend (Vercel)                │
│  13 tables · AES encryption · JWT auth · Cron jobs │
└──────────────────┬─────────────────────────────────┘
                   │
┌──────────────────▼─────────────────────────────────┐
│         MySQL 8.x (AES-encrypted fields)           │
└────────────────────────────────────────────────────┘
```

> **Why a Double API Layer?** Client components never talk directly to the Express backend. All requests go through Next.js API routes (`/api/v1/*`) which act as a Backend-for-Frontend (BFF) proxy — attaching the JWT from httpOnly cookies and forwarding securely. This keeps auth tokens completely invisible to the browser.

---

## ⚡ Key Highlights

| Area                        | Detail                                                                                       |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| **AES-Encrypted Storage**   | All sensitive financial data (amounts, names, notes) is encrypted at the MySQL level         |
| **Multi-Wallet System**     | Track money across Pocket, bKash, Bank, Card — with inter-terminal transfers                 |
| **Recurring Automation**    | Cron-powered daily execution of subscriptions and bills with failure notifications           |
| **Financial Intelligence**  | Health Score (0–100), budget tracking with progress bars, spending trend analysis            |
| **Real-Time Notifications** | 120s polling, encrypted content, admin broadcasts, soft-delete                               |
| **Error Tracking**          | Three-layer capture (Backend + BFF + Frontend) with admin-only dashboard                     |
| **Edge Middleware Auth**    | JWT verification at the Edge runtime via `jose` — no protected page loads without valid auth |
| **Interactive Charts**      | Doughnut breakdowns, yearly bar charts, budget progress bars via Chart.js 4                  |

---

## ✨ Features

- **Income & Expense Tracking** — Log transactions with custom categories, emoji icons, and date filtering
- **Terminal Management** — Multi-wallet system with auto-distribution and inter-terminal transfers
- **Monthly Budgets** — Set spending limits per category with visual progress bars
- **Financial Health Score** — Algorithmic score based on savings rate and budget adherence
- **Spending Insights** — Month-over-month trend analysis per category
- **Recurring Transactions** — Automate weekly/monthly/yearly incomes and expenses
- **Notification Center** — Real-time bell icon with unread count, admin broadcasts, and soft-delete
- **Auto-Transfer** — Carry forward remaining balance to the next month
- **Notes Module** — Encrypted personal notepad with full CRUD and pagination
- **Error Tracking** — Admin-only Sentry-like dashboard for monitoring application errors
- **User Manual** — In-app guide in English & Bangla
- **Password Reset** — Email-based reset with UUID tokens
- **AES Data Encryption** — All sensitive user data encrypted at the database level

📖 **[Full Feature Guide with Examples →](FEATURES.md)**

---

## 🛠️ Tech Stack

| Technology              | Purpose                                     |
| ----------------------- | ------------------------------------------- |
| **Next.js 14**          | App Router, SSR/SSG, API Routes (BFF proxy) |
| **React 18**            | UI library with hooks and context           |
| **TailwindCSS 3**       | Utility-first styling                       |
| **Chart.js 4**          | Doughnut charts, bar charts, scale charts   |
| **Axios**               | HTTP client with interceptors               |
| **Jose**                | Edge-compatible JWT verification            |
| **Moment.js**           | Date formatting                             |
| **react-hot-toast**     | Toast notifications                         |
| **react-datepicker**    | Date range selectors                        |
| **Husky + lint-staged** | Pre-commit hooks (ESLint + Prettier)        |
| **ESLint (Airbnb)**     | Code linting                                |
| **Prettier**            | Code formatting                             |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 22.x or higher
- **npm** (bundled with Node.js)
- A running instance of the **[FinTracker Backend](https://github.com/shounaksarker/fintrackerio-backend)**

### 1. Clone the Repository

```bash
git clone https://github.com/shounaksarker/fintrackerio-frontend.git
cd fintrackerio-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:3001
JWT_SECRET=your_super_secret_jwt_key
NEXT_PUBLIC_NODE_ENV=development
```

| Variable               | Description                                 |
| ---------------------- | ------------------------------------------- |
| `CLIENT_URL`           | This frontend's URL                         |
| `SERVER_URL`           | Backend API URL (must match backend `.env`) |
| `JWT_SECRET`           | JWT secret (must match backend)             |
| `NEXT_PUBLIC_NODE_ENV` | `development` / `stage` / `production`      |

> **Tip:** Setting `NEXT_PUBLIC_NODE_ENV` to `development` or `stage` enables demo features: Demo Login button, Seed Demo Data, and Clear Month Data.

### 4. Database Setup

If setting up for the first time, run the SQL migration from the backend repository:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS personal_finance;"
mysql -u root -p personal_finance < ../Fintracker-backend/migrations/001_init_schema.sql
```

> The migration uses `IF NOT EXISTS` — safe to run on existing databases.

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/v1/             # BFF Proxy Routes → Express Backend
│   ├── login/              # Login page + server actions
│   ├── signup/             # Signup page
│   ├── income/             # Income source, record, transfer history
│   ├── expense/            # Expense category, record, breakdown
│   ├── notes/              # Notes page
│   ├── recurring/          # Recurring transactions management
│   ├── sentry/             # Error tracking dashboard (admin only)
│   ├── setting/            # User settings & auto-transfer config
│   ├── user-manual/        # In-app documentation
│   ├── reset-password/     # Password reset flow
│   ├── page.js             # Home / Overview dashboard
│   └── layout.js           # Root layout
├── components/
│   ├── fields/             # Reusable UI: Button, Input, Select, Table, Modal
│   ├── home/               # Dashboard widgets (Balance, Budget, Health Score, Insights)
│   ├── modals/             # All modal dialogs (15 modals)
│   ├── notifications/      # NotificationBell + NotificationPanel
│   ├── sentry/             # Error boundary + Sentry UI components
│   ├── chart/              # DoughnutChart, ScaleChart
│   ├── Header.jsx          # App header with date range picker
│   ├── SideBar.jsx         # Navigation sidebar
│   └── MainLayout.jsx      # Layout wrapper
├── helpers/
│   ├── frontend/           # Client-side: API URLs, date formatting, currency
│   └── backend/            # Server-side: Axios wrapper, backend URLs, JWT reader
├── context/                # React DataContext (global state)
├── assets/                 # Constants, images, SVG icons
├── styles/                 # Global CSS + Tailwind imports
└── middleware.js            # Edge middleware for route protection
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
