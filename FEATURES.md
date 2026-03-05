# FinTracker — Features & User Guide

> A complete feature reference and step-by-step walkthrough for new users.

---

## 📖 Fresh User Walkthrough

This section walks you through every step of using FinTracker from the moment you land on the app.

### Step 1 — Sign Up

Navigate to `/signup` and create your account with a username, email, and password.

```
Username: john
Email:    john@example.com
Password: SecurePass1!
Phone:    01712345678 (optional)
```

On registration, the system automatically:

- Creates a default terminal called **"Pocket"** (your primary wallet)
- Initializes your user settings
- Logs you in with a JWT token (valid 30 days)

> **Staging tip:** On the staging server, you can click **"Demo Login"** to skip signup and explore with a pre-built demo account.

---

### Step 2 — Create Income Categories

Go to **Income → Source** from the sidebar. Click **"Add Source"** to create your income categories.

| Example Category | Icon | Description           |
| ---------------- | ---- | --------------------- |
| Salary           | 💰   | Monthly office salary |
| Freelancing      | 💻   | Upwork/Fiverr gigs    |
| Investments      | 📈   | Stock dividends       |

These categories help you classify where your money comes from.

---

### Step 3 — Create Expense Categories (with Budgets)

Go to **Expense → Category** from the sidebar. Click **"Add Category"**.

| Example Category | Icon | Budget (৳/month) | Description             |
| ---------------- | ---- | ---------------- | ----------------------- |
| Food             | 🍔   | 5,000            | Daily meals & groceries |
| Transport        | 🚌   | 2,000            | Bus, fuel, rideshare    |
| Entertainment    | 🎬   | 1,500            | Movies, subscriptions   |
| Rent             | 🏠   | 12,000           | Monthly apartment rent  |

Setting a **budget** enables the Budget Tracker widget on your dashboard — you'll see progress bars showing how much of each category's limit you've used.

---

### Step 4 — Create Terminals (Wallets/Accounts)

Go to **Income → Distribution** from the sidebar. Click **"Add Terminal"** to create additional wallets.

| Terminal | Purpose                              |
| -------- | ------------------------------------ |
| Pocket   | ✅ Created by default — cash on hand |
| bKash    | Mobile banking (MFS)                 |
| Bank     | Savings/checking bank account        |
| Card     | Credit/debit card balance            |

Terminals represent where your money physically lives. Every expense is deducted from a specific terminal, and you can transfer between them.

---

### Step 5 — Add Income

Go to **Income → Record** and click **"Add Income"**.

```
Category:    Salary 💰
Amount:      50,000৳
Date:        2024-01-15
Description: January salary (optional)
```

When you add income, the full amount is **automatically deposited into your default terminal** (Pocket). You can later transfer portions to other terminals.

---

### Step 6 — Transfer Between Terminals

On the **Income → Distribution** page, click **"Transfer"**.

```
From:        Pocket
To:          bKash
Amount:      10,000৳
Date:        2024-01-15
Description: Monthly bKash top-up
```

This creates two records internally: **−10,000৳** in Pocket and **+10,000৳** in bKash. Your total balance remains the same — only the distribution changes.

---

### Step 7 — Add Expenses

Go to **Expense → Record** and click **"Add Expense"**.

```
Category:    Food 🍔
Spend On:    Lunch at café
Terminal:    Pocket
Amount:      350৳
Date:        2024-01-16
Description: Team lunch (optional)
```

The expense is deducted from the selected terminal's balance. Each expense must specify **what** you spent on (`spend_on`) and **which terminal** to deduct from.

---

### Step 8 — View Expense Breakdown

On the **Expense → Breakdown** page, select a date range. You'll see:

- **Doughnut chart** — visual split of spending by category
- **Category table** — total spent per category with percentages
- **Comparison modal** — click any category to compare spending with the previous month

_Example breakdown for January:_
| Category | Spent | % of Total |
| ------------- | -------- | ---------- |
| Rent 🏠 | 12,000৳ | 48% |
| Food 🍔 | 6,200৳ | 25% |
| Transport 🚌 | 3,800৳ | 15% |
| Entertainment 🎬 | 3,000৳ | 12% |

---

### Step 9 — Dashboard Overview

The **Home / Overview** page (`/`) is your financial command center:

- **Balance Cards** — Total Income, Total Expense, Remaining balance for the selected month
- **Recent Transactions** — Latest income and expense entries side-by-side
- **Yearly Summary** — Bar chart comparing monthly income vs. expenses across the year

---

### Step 10 — Explore Advanced Features

Once you have data flowing, the dashboard unlocks powerful widgets (detailed below in the Features section):

- 📊 Budget Tracker
- 💪 Financial Health Score
- 📉 Spending Insights
- 🔄 Recurring Transactions
- 🔔 Notifications

---

## ✨ Feature Reference

### 1. 🔐 Authentication & Security

**What it does:** Secure registration and login with industry-standard practices.

- Passwords are hashed with **bcrypt** (10 salt rounds) — never stored in plain text
- Sessions use **JWT tokens** (30-day expiry) stored as httpOnly, secure, sameSite cookies
- All sensitive financial data (amounts, category names, terminal names, notes) is **AES-encrypted** at the database level
- **Password reset** via email with UUID token (1-hour expiry)
- Route protection via **Next.js Edge Middleware** — no protected page is ever accessible without a valid token

---

### 2. 💰 Income Management

**What it does:** Track every source of income with full categorization.

- **Income Categories** — Create unlimited categories with name, description, and emoji icon
- **Income Records** — Log income entries with amount, date, category, and optional description
- **Auto-Distribution** — When income is added, the amount is automatically credited to your default terminal
- **Edit & History** — Modify records; amount differences are auto-adjusted in the terminal balance
- **Date Range Filter** — View records for any custom date range via the header date picker

---

### 3. 💸 Expense Management

**What it does:** Track every purchase with granular detail — what you bought, from which wallet, and under which budget category.

- **Expense Categories** — Create categories with optional monthly **budget limits**
- **Expense Records** — Log expenses with: category, amount, `spend_on` (what you bought), terminal (which wallet), date
- **Delete Expenses** — Remove wrong entries; terminal balance is automatically restored
- **Expense Breakdown** — Visual pie chart + percentage table for any date range
- **Category Comparison** — Compare spending in any category against the previous month

---

### 4. 🏦 Terminal System (Multi-Wallet)

**What it does:** Model your real-world money distribution across different wallets and accounts.

- **Default Terminal** — "Pocket" is auto-created on signup. All new income lands here first.
- **Custom Terminals** — Add terminals for bKash, Bank, Card, or any account you use
- **Inter-Terminal Transfers** — Move money between terminals with a clear transfer history
- **Per-Terminal Balance** — See exactly how much is in each wallet at any point in time
- **Transfer History** — Full log of all transfers with source, destination, amount, and date

---

### 5. 📊 Monthly Budgets

**What it does:** Set spending limits per expense category and track your progress visually.

- When creating/editing an expense category, set a `budget` field (e.g., Food: ৳5,000/month)
- The **Budget Overview** widget on the dashboard shows:
  - Progress bar (green → yellow → red as you approach the limit)
  - Amount spent vs. budget for each category
  - Percentage used

_Example: Food budget is ৳5,000. You've spent ৳3,200 → progress bar at 64% (green)._

---

### 6. 💪 Financial Health Score

**What it does:** An algorithmic score (0–100) that gamifies your financial discipline.

The score considers:

- **Savings Rate** — What percentage of your income did you save this month?
- **Budget Adherence** — How many of your budgeted categories stayed under limit?

_Example: You earned ৳50,000 and spent ৳30,000 (40% savings rate) + 4 out of 5 categories under budget → Health Score: 82/100 💪_

---

### 7. 📉 Spending Insights (Trend Analysis)

**What it does:** Automatically compares your current month's spending against the previous month, category by category.

- Shows which categories have **increased** or **decreased** spending
- Calculates percentage change
- Highlights concern areas

_Example: "Food spending is up 23% compared to last month (৳4,100 → ৳5,043). Transport is down 15%."_

---

### 8. 📅 Balance Overview

**What it does:** Monthly and yearly financial summaries with visual charts.

- **Monthly Summary** — Total income, total expense, remaining balance, per-terminal breakdown
- **Yearly Summary** — Bar chart showing income vs. expense for each month of the year
- **Terminal-Level Detail** — See total inflow, outflow, and current balance for each terminal

---

### 9. 🔄 Recurring Transactions

**What it does:** Automate repeating incomes and expenses (subscriptions, bills, salary).

- Create recurring templates: type (income/expense), category, terminal, amount, interval (weekly/monthly/yearly)
- **Cron-powered execution** — An external cron service (e.g., [cron-job.org](https://cron-job.org)) hits the API daily and auto-creates records for all due recurring transactions
- **Smart validation** — Expense transactions check if the terminal has sufficient funds before execution
- **Pause/Resume** — Toggle recurring templates on/off without deleting them
- **Failure notifications** — If a recurring expense fails (e.g., insufficient funds), you get an in-app notification

_Example: Set up "Netflix ৳500/month from Pocket on the 5th" → auto-deducted every month, no manual entry needed._

---

### 10. 🔔 Notification System

**What it does:** In-app notification center with real-time alerts for system events.

- **Bell Icon** — Appears in the navigation header with an unread count badge
- **120-second polling** — Automatically checks for new notifications every 2 minutes (+ on tab focus)
- **Types** — `info`, `warning`, `error`, `success` — each with a distinct icon and color
- **Actions** — Expand to read, navigate to related page via "View →" button, or delete (soft-delete, retained 30 days)
- **Admin Broadcasts** — Admins can send notifications to all users simultaneously
- **Encrypted** — Notification titles and messages are AES-encrypted in the database

_Example notifications:_

- ✅ _"Salary auto-recorded (50,000৳) for March"_
- ❌ _"Recurring expense failed: Netflix (500৳) — insufficient funds in Pocket"_
- ℹ️ _"Cron Job completed — recurring transactions processed at 01 Mar, 10:07"_

---

### 11. 🔁 Auto-Transfer (Carry Forward Balance)

**What it does:** Automatically carry your remaining monthly balance into the next month.

- Enable in **Settings → Auto Transfer**
- Select which income and expense categories to use for the transfer
- At month-end, the system creates an "expense" in the old month and an "income" in the new month for each terminal's remaining balance
- Monthly flag (`is_this_month_done`) prevents duplicate transfers

_Example: End of January, Pocket has ৳15,000 left → auto-creates a ৳15,000 income entry in February's Pocket._

---

### 12. 📝 Notes

**What it does:** A built-in notepad for financial reminders, shopping lists, or any personal notes.

- Full CRUD — Create, read, update, delete notes
- Paginated list (10 per page)
- AES-encrypted storage — your notes are private
- Supports title + description

---

### 13. 🛡️ Error Tracking (Admin Only)

**What it does:** A self-hosted error monitoring system inspired by Sentry, visible only to admin users.

- **Three-layer capture** — Catches errors from Backend (Express middleware), BFF (Next.js API routes), and Frontend (Axios interceptor + React Error Boundary)
- **Admin Dashboard** (`/sentry`) — Stats bar (total, open, critical, today's count), filterable + searchable error list
- **Error Detail** — Full stack trace, request payload (sanitized), user info, IP, user-agent
- **Resolve/Re-open** — Optimistic toggle with cached detail views
- **Auto-classification** — Errors are auto-leveled: `500+` → critical, `400-499` → medium
- **Payload sanitization** — Passwords, tokens, and secrets are automatically redacted before storage

---

### 14. 📘 User Manual

**What it does:** In-app documentation available in **English** and **Bangla (বাংলা)**.

- Accessible from the sidebar → "User Manual"
- Covers all features with step-by-step instructions
- Bilingual support for accessibility

---

### 15. 🧪 Demo Data (Staging Only)

**What it does:** One-click realistic demo data for testing.

- Available only on staging/development environments
- **"Populate Sample Data"** — Seeds the current month with realistic income records, expense records, and terminal transfers based on your existing categories
- **"Clear This Month"** — Wipes all records for the current month
- Uses batch INSERT operations for performance
