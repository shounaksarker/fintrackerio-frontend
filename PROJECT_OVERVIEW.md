# FinTracker — Full Project Overview

> **Last Updated:** 2026-03-01  
> **Purpose:** Single source of truth for any agent/developer working on the FinTracker codebase.

---

## Table of Contents

1. [Project Summary](#1-project-summary)
2. [Architecture](#2-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Environment Configuration](#4-environment-configuration)
5. [Database Schema](#5-database-schema)
6. [Backend API Reference](#6-backend-api-reference)
7. [Frontend Architecture](#7-frontend-architecture)
8. [Authentication Flow](#8-authentication-flow)
9. [Security — Field-Level Encryption](#9-security--field-level-encryption)
10. [Deployment](#10-deployment)
11. [Changelog](#11-changelog)

---

## 1. Project Summary

**FinTracker** (Fin-Tracker.io) is a personal finance management web app. Users track their income, expenses, and balances across multiple "terminals" (wallets/accounts like Pocket, Bkash, Bank). Features include:

- **Income Management** — income sources (categories), income records, income distribution across terminals
- **Expense Management** — expense categories, expense records with spend-on details & breakdowns
- **Recurring Transactions** — natively automate and manage repeating incomes and expenses on weekly, monthly, or yearly schedules
- **Monthly Budgets** — set limits for expense categories and track them visually
- **Financial Health Score** — dynamic score of your savings rate and budget adherence
- **Financial Insights** — automated trend analysis comparing spending to previous months
- **Balance Overview** — monthly & yearly summaries with Chart.js graphs
- **Terminal System** — wallets/accounts with balance tracking & inter-terminal transfers
- **Notes** — personal notes with full CRUD and pagination
- **Auto-Transfer** — automatically carry forward remaining balance from previous month
- **Password Reset** — email-based reset using UUID tokens
- **Notification System** — in-app notification center with bell icon, soft-delete, admin broadcasts, 120s polling
- **Error Tracking (Sentry)** — captures backend, BFF, and frontend errors into `error_logs` table with admin-only dashboard (`/sentry`), resolve/re-open toggle, debounced search, detail caching
- **User Manual** — in-app guide in English & Bangla

**Currency:** `৳` (Bangladeshi Taka — BDT)

---

## 2. Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Vercel (Frontend)                       │
│  Next.js 14 App Router                                    │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Client Components (pages, forms, charts)           │  │
│  │       ↓ form submit / fetch                         │  │
│  │  Server Actions (loginAction, signupAction, etc.)   │  │
│  │       ↓ HTTP call via CLIENT_URL                    │  │
│  │  /app/api/v1/* (Next.js API Route Handlers)         │  │
│  │       ↓ HTTP call via SERVER_URL                    │  │
│  └─────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼───────────────────────────────────┐
│                    Vercel (Backend)                        │
│  Express.js                                               │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  /api/auth/*       → authController                 │  │
│  │  /api/category/*   → categoryController             │  │
│  │  /api/records/*    → recordController               │  │
│  │  /api/distribution/* → distributionController       │  │
│  │  /api/balance/*    → balanceController              │  │
│  │  /api/notes/*      → notesController                │  │
│  │  /api/user/*       → userController                 │  │
│  │  /api/recurring/*   → recurringController           │  │
│  │  /api/notifications/* → notificationController       │  │
│  │  /api/sentry/*      → sentryController (admin-only)  │  │
│  │  /api/seed/*       → seedController (stage-only)    │  │
│  └─────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────┘
                       │ mysql2
┌──────────────────────▼───────────────────────────────────┐
│                    MySQL Database                          │
│  (14 tables, AES-encrypted sensitive fields)              │
└──────────────────────────────────────────────────────────┘
```

**Key architectural concept — Double API Layer in Frontend:**

The frontend has TWO layers of API endpoint definitions:

| Layer                              | File               | Purpose                                        | Runs On                  |
| ---------------------------------- | ------------------ | ---------------------------------------------- | ------------------------ |
| `helpers/frontend/apiEndpoints.js` | Client-facing URLs | Points to Next.js API routes (`/api/v1/*`)     | Browser → Next.js server |
| `helpers/backend/endpoints.js`     | Server-facing URLs | Points to Express backend (`SERVER_URL/api/*`) | Next.js server → Backend |

**Flow:** Client component → Server Action → Next.js API Route (`/api/v1/*`) → Backend API (`SERVER_URL/api/*`) → MySQL

---

## 3. Tech Stack

### Backend (`Fintracker-backend/`)

| Technology             | Purpose                            |
| ---------------------- | ---------------------------------- |
| **Node.js 22.x**       | Runtime                            |
| **Express 4.18**       | HTTP framework                     |
| **mysql2**             | MySQL driver (connection pool)     |
| **jsonwebtoken**       | JWT creation & verification        |
| **bcrypt**             | Password hashing (salt rounds: 10) |
| **nodemailer**         | Password reset emails              |
| **uuid**               | Reset token generation             |
| **body-parser**        | JSON body parsing                  |
| **cors**               | CORS middleware (open CORS)        |
| **swagger-ui-express** | API docs at `/api-docs`            |
| **dotenv**             | Environment variables              |

### Frontend (`Fintracker-frontend/`)

| Technology                 | Purpose                                     |
| -------------------------- | ------------------------------------------- |
| **Next.js 14**             | App Router + SSR/SSG                        |
| **React 18**               | UI library                                  |
| **TailwindCSS 3**          | Utility-first CSS                           |
| **axios**                  | HTTP client                                 |
| **Chart.js 4**             | Financial charts & graphs                   |
| **jose**                   | JWT verification (middleware, Edge runtime) |
| **moment.js**              | Date formatting                             |
| **react-hot-toast**        | Toast notifications                         |
| **react-datepicker**       | Date range selectors                        |
| **@vercel/analytics**      | Vercel analytics                            |
| **Husky + lint-staged**    | Pre-commit hooks                            |
| **ESLint (Airbnb config)** | Linting                                     |
| **Prettier**               | Code formatting                             |

---

## 4. Environment Configuration

### Backend `.env`

```env
DB_HOST=           # MySQL host
DB_NAME=           # Database name (e.g., personal_finance)
DB_USER=           # Database user
DB_PASSWORD=       # Database password
DB_PORT=3306       # MySQL port
PORT=3001          # Express server port

JWT_SECRET=                    # JWT signing secret (must match frontend)
DB_DATA_ENCYPTION_SECRET=      # AES encryption key for field-level encryption

CLIENT_URL=        # Frontend URL (for CORS, email links)
SERVER_URL=        # Self URL (unused, but documented)

MAIL_USER=         # Nodemailer sender email
MAIL_PASSWORD=     # Nodemailer app password
MAIL_PORT=         # SMTP port
MAIL_HOST=         # SMTP host (e.g., smtp.gmail.com)

NODE_ENV=          # development | stage | production
                   # stage enables /api/seed/* endpoints
```

### Frontend `.env`

```env
CLIENT_URL=            # Frontend URL (http://localhost:3000 for dev)
SERVER_URL=            # Backend URL (http://localhost:3001 for dev)
JWT_SECRET=            # JWT secret (must match backend)
NEXT_PUBLIC_NODE_ENV=  # development | stage | production
                       # Exposed to client-side via NEXT_PUBLIC_ prefix
                       # stage enables demo login + seed/clear buttons
```

### Environment Values

| Environment     | `NEXT_PUBLIC_NODE_ENV` | Frontend URL                            | Backend URL                                     |
| --------------- | ---------------------- | --------------------------------------- | ----------------------------------------------- |
| **Development** | `development`          | `http://localhost:3000`                 | `http://localhost:3001`                         |
| **Stage**       | `stage`                | `https://fintrackerio-stage.vercel.app` | `https://fintrackerio-backend-stage.vercel.app` |
| **Production**  | `production`           | `https://fintrackerio.vercel.app`       | `https://fintrackerio-backend.vercel.app`       |

> **Note:** `NEXT_PUBLIC_NODE_ENV=stage` enables demo login button, seed demo data, and clear month data features. Backend `NODE_ENV=stage` is required for seed/clear API endpoints.

---

## 5. Database Schema

**Database:** MySQL (`personal_finance`)  
**Encryption:** All sensitive text fields are stored as AES-encrypted blobs using `DB_DATA_ENCYPTION_SECRET`.

### 5.1 `users`

| Column                   | Type       | Notes                                            |
| ------------------------ | ---------- | ------------------------------------------------ |
| `user_id`                | INT (PK)   | Auto-incremented manually via `MAX(user_id) + 1` |
| `username`               | VARCHAR    | Stored lowercase                                 |
| `email`                  | VARCHAR    | Stored lowercase, unique                         |
| `password`               | VARCHAR    | bcrypt-hashed                                    |
| `phone`                  | VARCHAR    | Nullable                                         |
| `avatar`                 | VARCHAR    | Nullable                                         |
| `last_login`             | DATETIME   | Updated on each login                            |
| `reset_token`            | VARCHAR    | UUID for password reset                          |
| `reset_token_expiration` | DATETIME   | Token expiry (1 hour)                            |
| `is_admin`               | TINYINT(1) | Default `0`. `1` = admin (access to sentry, etc) |
| `created_at`             | TIMESTAMP  | Auto-generated                                   |
| `updated_at`             | TIMESTAMP  | Auto-updated                                     |

### 5.2 `user_settings`

| Column                     | Type             | Notes                                                                      |
| -------------------------- | ---------------- | -------------------------------------------------------------------------- |
| `id`                       | INT (PK)         | Auto-increment                                                             |
| `user_id`                  | INT (FK → users) |                                                                            |
| `is_transfer_allowed`      | BOOLEAN          | Enables auto-transfer feature                                              |
| `options`                  | JSON             | `{ is_this_month_done: 0 / 1 }` — tracks if current month transfer is done |
| `transfer_info`            | JSON             | `{ expenseCategoryId, incomeCategoryId }` — categories for transfer        |
| `transfer_info_updated_at` | DATETIME         |                                                                            |

### 5.3 `income_categories`

| Column               | Type             | Notes                               |
| -------------------- | ---------------- | ----------------------------------- |
| `income_category_id` | INT (PK)         | Auto-increment                      |
| `user_id`            | INT (FK → users) |                                     |
| `name`               | BLOB             | **AES-encrypted**, stored lowercase |
| `description`        | BLOB             | **AES-encrypted**, nullable         |
| `icon`               | VARCHAR          | Emoji or null                       |

### 5.4 `income_records`

| Column               | Type             | Notes                                                 |
| -------------------- | ---------------- | ----------------------------------------------------- |
| `record_id`          | INT (PK)         | Auto-increment                                        |
| `user_id`            | INT (FK → users) |                                                       |
| `income_category_id` | INT (FK)         |                                                       |
| `amount`             | BLOB             | **AES-encrypted**, cast to `DECIMAL(10,2)` in queries |
| `date`               | DATE             | When income was received                              |
| `description`        | BLOB             | **AES-encrypted**, nullable                           |
| `created_at`         | TIMESTAMP        |                                                       |
| `updated_at`         | TIMESTAMP        |                                                       |

### 5.5 `distributed_terminal`

| Column             | Type             | Notes                                                           |
| ------------------ | ---------------- | --------------------------------------------------------------- |
| `terminal_id`      | INT (PK)         | Auto-increment                                                  |
| `user_id`          | INT (FK → users) |                                                                 |
| `terminal_name`    | BLOB             | **AES-encrypted** (e.g., "pocket", "bkash", "bank")             |
| `default_terminal` | BOOLEAN          | 1 = default. Each user gets "pocket" as default on registration |
| `created_at`       | TIMESTAMP        |                                                                 |
| `updated_at`       | TIMESTAMP        |                                                                 |

### 5.6 `income_distributed_to`

| Column        | Type                            | Notes                                                               |
| ------------- | ------------------------------- | ------------------------------------------------------------------- |
| `id`          | INT (PK)                        | Auto-increment (actual col: `income_distributed_id`)                |
| `user_id`     | INT (FK → users)                |                                                                     |
| `terminal_id` | INT (FK → distributed_terminal) |                                                                     |
| `amount`      | BLOB                            | **AES-encrypted** (negative = transfer-out, positive = transfer-in) |
| `date`        | DATE                            |                                                                     |
| `description` | BLOB                            | **AES-encrypted**                                                   |
| `created_at`  | TIMESTAMP                       |                                                                     |

### 5.7 `expense_categories`

| Column                | Type             | Notes                       |
| --------------------- | ---------------- | --------------------------- |
| `expense_category_id` | INT (PK)         | Auto-increment              |
| `user_id`             | INT (FK → users) |                             |
| `name`                | BLOB             | **AES-encrypted**           |
| `description`         | BLOB             | **AES-encrypted**, nullable |
| `budget`              | BLOB             | **AES-encrypted**, nullable |
| `icon`                | VARCHAR          | Emoji or null               |

### 5.8 `expense_records`

| Column                | Type             | Notes                               |
| --------------------- | ---------------- | ----------------------------------- |
| `record_id`           | INT (PK)         | Auto-increment                      |
| `user_id`             | INT (FK → users) |                                     |
| `expense_category_id` | INT (FK)         |                                     |
| `spend_on`            | BLOB             | **AES-encrypted** (what was bought) |
| `terminal_id`         | INT (FK)         | Which wallet/account was used       |
| `amount`              | BLOB             | **AES-encrypted**                   |
| `date`                | DATE             |                                     |
| `description`         | BLOB             | **AES-encrypted**, nullable         |
| `created_at`          | TIMESTAMP        |                                     |
| `updated_at`          | TIMESTAMP        |                                     |

### 5.9 `notes`

| Column        | Type             | Notes             |
| ------------- | ---------------- | ----------------- |
| `note_id`     | INT (PK)         | Auto-increment    |
| `user_id`     | INT (FK → users) |                   |
| `title`       | BLOB             | **AES-encrypted** |
| `description` | BLOB             | **AES-encrypted** |
| `created_at`  | TIMESTAMP        |                   |
| `updated_at`  | TIMESTAMP        |                   |

### 5.10 `recurring_transactions`

| Column                | Type             | Notes                                                              |
| --------------------- | ---------------- | ------------------------------------------------------------------ |
| `id`                  | INT (PK)         | Auto-increment                                                     |
| `user_id`             | INT (FK → users) |                                                                    |
| `type`                | ENUM             | `'income'` or `'expense'`                                          |
| `category_id`         | INT              | Reference to either `income_categories` or `expense_categories` ID |
| `terminal_id`         | INT              | Nullable, only required for `type = 'expense'`                     |
| `amount`              | BLOB             | **AES-encrypted**                                                  |
| `spend_on`            | BLOB             | **AES-encrypted** (what was bought, optional)                      |
| `description`         | BLOB             | **AES-encrypted** (optional)                                       |
| `recurrence_interval` | ENUM             | `'weekly'`, `'monthly'`, `'yearly'`                                |
| `next_execution_date` | DATE             | Looked at by cron job                                              |
| `is_active`           | BOOLEAN          | Active/Paused state toggle                                         |
| `created_at`          | TIMESTAMP        | Auto-generated                                                     |
| `updated_at`          | TIMESTAMP        | Auto-updated                                                       |

### 5.11 `notifications`

| Column           | Type             | Notes                                                       |
| ---------------- | ---------------- | ----------------------------------------------------------- |
| `id`             | INT (PK)         | Auto-increment                                              |
| `user_id`        | INT (FK → users) | Nullable — `NULL` = broadcast to all users                  |
| `type`           | ENUM             | `'info'`, `'warning'`, `'error'`, `'success'`               |
| `title`          | VARBINARY(128)   | **AES-encrypted**                                           |
| `message`        | VARBINARY(512)   | **AES-encrypted**, expandable description                   |
| `link`           | VARCHAR(500)     | Nullable — clickable route (e.g., `/expense`)               |
| `reference_type` | VARCHAR(50)      | Nullable — `'recurring_transaction'`, `'budget'`, `'admin'` |
| `reference_id`   | INT              | Nullable — FK to related row                                |
| `is_read`        | TINYINT(1)       | Default `0`                                                 |
| `is_deleted`     | TINYINT(1)       | Default `0` — soft delete                                   |
| `deleted_at`     | TIMESTAMP        | Nullable — set on soft delete, purged after 30 days         |
| `created_at`     | TIMESTAMP        | Auto-generated                                              |

### 5.12 `notification_reads` (broadcast per-user state)

| Column            | Type                     | Notes                        |
| ----------------- | ------------------------ | ---------------------------- |
| `id`              | INT (PK)                 | Auto-increment               |
| `notification_id` | INT (FK → notifications) |                              |
| `user_id`         | INT (FK → users)         |                              |
| `is_read`         | TINYINT(1)               | Default `0`                  |
| `is_deleted`      | TINYINT(1)               | Default `0`                  |
| `deleted_at`      | TIMESTAMP                | Nullable                     |
| UNIQUE            |                          | `(notification_id, user_id)` |

### 5.13 `error_logs`

| Column        | Type             | Notes                                                 |
| ------------- | ---------------- | ----------------------------------------------------- |
| `id`          | INT (PK)         | Auto-increment                                        |
| `source`      | ENUM             | `'backend'`, `'bff'`, `'frontend'`                    |
| `level`       | ENUM             | `'low'`, `'medium'`, `'high'`, `'critical'`           |
| `user_id`     | INT (FK → users) | Nullable — `ON DELETE SET NULL`                       |
| `method`      | VARCHAR(10)      | HTTP method (GET, POST, etc.)                         |
| `url`         | VARCHAR(500)     | Request URL                                           |
| `status_code` | INT              | HTTP status code                                      |
| `message`     | TEXT             | Error message                                         |
| `stack`       | TEXT             | Stack trace (nullable)                                |
| `payload`     | TEXT             | Sanitized request payload (sensitive fields redacted) |
| `user_agent`  | VARCHAR(500)     | Browser / client user-agent string                    |
| `ip`          | VARCHAR(45)      | Client IP address                                     |
| `is_resolved` | TINYINT(1)       | Default `0` — toggle via admin dashboard              |
| `created_at`  | TIMESTAMP        | Auto-generated                                        |

---

## 6. Backend API Reference

**Base URL:** `{SERVER_URL}/api`  
**Auth:** JWT token sent via `token` header (NOT Authorization Bearer format).  
**All protected endpoints** verify JWT via `jwtVerified(req)` which reads `req.headers.token`.

### Standard Response Format

```json
{
  "success": true, // true for 2xx/3xx, false otherwise
  "status": 200,
  "msg": "Description of result",
  "data": {}, // optional — present when data is returned
  "token": "jwt..." // optional — only on login/register
}
```

---

### 6.1 Auth (`/api/auth`)

#### `POST /api/auth/register`

Create a new user. Also creates default terminal ("pocket") and user_settings row.

**Request:**

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "SecurePass1!",
  "phone": "01712345678" // optional
}
```

**Response (201):**

```json
{
  "success": true,
  "status": 201,
  "msg": "user has been created successfully.",
  "token": "eyJhbGciOi..."
}
```

#### `POST /api/auth/login`

Authenticate user and return JWT.

**Request:**

```json
{
  "emailOrPhone": "john@example.com",
  "password": "SecurePass1!"
}
```

**Response (200):**

```json
{
  "success": true,
  "status": 200,
  "msg": "login successful.",
  "token": "eyJhbGciOi..."
}
```

**JWT Payload:**

```json
{
  "user_id": 1,
  "username": "john",
  "email": "john@example.com",
  "phone": "01712345678",
  "iat": 1708000000,
  "exp": 1710592000 // 30 days
}
```

---

### 6.2 Category (`/api/category`)

#### `GET /api/category/income` 🔒

Get all income categories for authenticated user.

**Response (200):**

```json
{
  "success": true,
  "status": 200,
  "msg": "all income category.",
  "data": [
    {
      "income_category_id": 1,
      "user_id": 1,
      "name": "salary",
      "description": "monthly salary",
      "icon": "💰"
    }
  ]
}
```

#### `POST /api/category/income` 🔒

```json
{ "name": "Salary", "description": "Monthly salary", "icon": "💰" }
```

**Response (201):** `{ "msg": "income category created." }`

#### `PUT /api/category/edit-income-source` 🔒

Edit income category name, description and icon.

**Request:**

```json
{
  "income_category_id": 1,
  "name": "Salary",
  "description": "Monthly salary",
  "icon": "💰"
}
```

**Response (200):** `{ msg: Category updated successfully., success: true, status: 200 }`

#### `GET /api/category/expense` 🔒

Get all expense categories.

**Response (200):**

```json
{
  "success": true,
  "status": 200,
  "msg": "all expense category.",
  "data": [
    {
      "expense_category_id": 1,
      "user_id": 1,
      "name": "food",
      "description": "daily meals",
      "icon": "🍔",
      "budget": "1000.00",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### `POST /api/category/expense` 🔒

```json
{ "name": "Food", "description": "Daily meals", "icon": "🍔", "budget": "1000.00" }
```

**Response (201):** `{ msg: Expense category created successfully., success: true, status: 201 }`

#### `PUT /api/category/edit-expense-category` 🔒

Edit expense category name, description and icon.

**Request:**

```json
{
  "expense_category_id": 1,
  "name": "Food",
  "description": "Daily meals",
  "icon": "🍔",
  "budget": "1000.00"
}
```

**Response (200):** `{ msg: Category updated successfully., success: true, status: 200 }`

---

### 6.3 Records (`/api/records`)

#### `POST /api/records/income` 🔒

Get all income records (filtered by date range).

**Request:**

```json
{ "from": "2024-01-01", "to": "2024-01-31" }
```

**Response (200):**

```json
{
  "data": [
    {
      "record_id": 1,
      "user_id": 1,
      "income_category_id": 1,
      "income_category_name": "salary",
      "icon": "💰",
      "amount": 50000.0,
      "date": "2024-01-15T00:00:00.000Z",
      "description": "january salary",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### `POST /api/records/create-income` 🔒

Creates income record AND auto-distributes to default terminal.

```json
{
  "income_category_id": 1,
  "amount": 50000,
  "date": "2024-01-15",
  "description": "January salary" // optional
}
```

#### `PUT /api/records/edit-income` 🔒

Edit income record. If amount changes, difference is auto-adjusted in default terminal.

```json
{
  "income_record_id": 1,
  "income_category_id": 1,
  "amount": 50000,
  "newAmount": 55000,
  "date": "2024-01-15",
  "description": "Updated"
}
```

#### `POST /api/records/expense` 🔒

Get all expense records (filtered by date range).

**Response (200):**

```json
{
  "data": [
    {
      "record_id": 1,
      "expense_category_id": 1,
      "expense_category_name": "food",
      "icon": "🍔",
      "spend_on": "burger",
      "terminal_id": 1,
      "terminal_name": "pocket",
      "amount": 250.0,
      "date": "2024-01-15T00:00:00.000Z",
      "description": "lunch"
    }
  ]
}
```

#### `POST /api/records/create-expense` 🔒

```json
{
  "expense_category_id": 1,
  "spend_on": "Burger",
  "terminal_id": 1,
  "amount": 250,
  "date": "2024-01-15",
  "description": "Lunch" // optional
}
```

**Response (201):** `{ msg: Expense record created successfully., success: true, status: 201 }`

#### `PUT /api/records/edit-expense` 🔒

```json
{
  "record_id": 1,
  "expense_category_id": 1,
  "spend_on": "Pizza",
  "terminal_id": 1,
  "amount": 300,
  "date": "2024-01-15",
  "description": "Updated"
}
```

**Response (200):** `{ msg: Expense record updated successfully., success: true, status: 200 }`

#### `DELETE /api/records/delete-expense?record_id=1` 🔒

**Response (200):** `{ msg: Expense record deleted successfully., success: true, status: 200 }`

---

### 6.4 Distribution/Terminals (`/api/distribution`)

#### `POST /api/distribution/create` 🔒

```json
{ "terminal_name": "Bkash" }
```

**Response (201):** `{ msg: Terminal created successfully., success: true, status: 201 }`

#### `GET /api/distribution/all-terminals` 🔒

```json
{
  "data": [
    {
      "terminal_id": 1,
      "user_id": 1,
      "terminal_name": "pocket",
      "default_terminal": 1,
      "created_at": "..."
    }
  ]
}
```

#### `PUT /api/distribution/edit-terminal` 🔒

```json
{ "terminal_id": 1, "terminal_name": "Cash" }
```

**Response (200):** `{ msg: Terminal updated successfully., success: true, status: 200 }`

#### `POST /api/distribution/income` 🔒

Get income distribution (transfer history) with date range filter.

```json
{ "from": "2024-01-01", "to": "2024-01-31" }
```

**Response:** Array of transfer records with `terminal_name`, `amount` (negative = out, positive = in), `description`.

#### `POST /api/distribution/transfer` 🔒

Transfer balance between terminals. Creates two records: negative in source, positive in destination.

```json
{
  "from_terminal_id": 1,
  "to_terminal_id": 2,
  "amount": 5000,
  "date": "2024-01-20",
  "description": "Transfer to Bkash" // optional
}
```

**Response (201):** `{ msg: Transfer created successfully., success: true, status: 201 }`

---

### 6.5 Balance (`/api/balance`)

#### `POST /api/balance/monthly-summary` 🔒

```json
{ "from": "2024-01-01", "to": "2024-01-31" }
```

**Response:**

```json
{
  "data": {
    "total_income": 50000,
    "total_expense": 15000,
    "remain": 35000,
    "terminal": [
      {
        "terminal_id": 1,
        "terminal_name": "pocket",
        "total_in": 50000,
        "total_out": 10000,
        "balance": 40000
      },
      {
        "terminal_id": 2,
        "terminal_name": "bkash",
        "total_in": 5000,
        "total_out": 5000,
        "balance": 0
      }
    ]
  }
}
```

#### `POST /api/balance/yearly-summary` 🔒

```json
{ "year": 2024 }
```

**Response:**

```json
{
  "data": {
    "January": { "income": 50000, "expense": 15000, "savings": 35000 },
    "February": { "income": 45000, "expense": 20000, "savings": 25000 },
    ...
  }
}
```

#### `POST /api/balance/transfer-to-next-month` 🔒

Carries forward remaining balance to next month. Auto-creates expense records (previous month) and income records (current month) per terminal.

```json
{
  "from": "2024-01-01",
  "to": "2024-01-31",
  "expenseDate": "2024-01-31",
  "incomeDate": "2024-02-01"
}
```

**Response:** `{ msg: Transfer created successfully., success: true, status: 201 }`

---

### 6.6 Notes (`/api/notes`)

#### `POST /api/notes/create` 🔒

```json
{ "title": "Shopping List", "description": "Buy groceries" }
```

#### `GET /api/notes/get-all?page=1&limit=10` 🔒

**Response:**

```json
{
  "success": true,
  "status": 200,
  "data": {
    "notes": [
      {
        "note_id": 1,
        "title": "Shopping List",
        "description": "Buy groceries",
        "created_at": "..."
      }
    ],
    "currentPage": 1,
    "totalPages": 3,
    "totalNotes": 25
  }
}
```

#### `GET /api/notes/:id` 🔒

Single note detail.

**Response:**

```json
{
  "success": true,
  "status": 200,
  "msg": "Note",
  "data": {
    "note_id": 24,
    "user_id": 2,
    "title": "Hello World",
    "description": "Lorem ipsum world description",
    "created_at": "2026-02-22T04:59:25.000Z",
    "updated_at": null
  }
}
```

#### `PUT /api/notes/:id` 🔒

```json
{ "title": "Updated Title", "description": "Updated content" }
```

**Response:** `{ msg: Note updated successfully., success: true, status: 200 }`

#### `DELETE /api/notes/:id` 🔒

**Response:** `{ msg: Note deleted successfully., success: true, status: 200 }`

---

### 6.7 User (`/api/user`)

#### `GET /api/user/info` 🔒

```json
{
  "data": {
    "username": "john",
    "email": "john@example.com",
    "phone": "01712345678",
    "created_at": "...",
    "avatar": null,
    "start_date": "2024-01-01",
    "first_income_date": "2024-01-15",
    "last_income_date": "2024-12-30",
    "first_expense_date": "2024-01-16",
    "last_expense_date": "2024-12-31"
  }
}
```

#### `PUT /api/user/edit` 🔒

```json
{
  "name": "John",
  "email": "new@email.com",
  "mobile": "0189999",
  "avatar": "🧑"
}
```

#### `POST /api/user/send-reset-email`

```json
{ "email": "john@example.com" }
```

Sends email with reset link: `{CLIENT_URL}/reset-password?token={uuid}`

#### `POST /api/user/reset-password`

```json
{ "token": "uuid-token-here", "password": "NewPass1!" }
```

#### `PATCH /api/user/set-auto-transfer` 🔒

Configure auto-transfer settings.

```json
{
  "expenseCategoryId": 5,
  "incomeCategoryId": 6,
  "is_transfer_allowed": true
}
```

#### `GET /api/user/get-auto-transfer` 🔒

Get current auto-transfer configuration.

#### `GET /api/user/setting-auto-update`

Called by `cron-job.org` monthly. Resets `is_this_month_done` flag for all users with auto-transfer enabled. Protected by `req.headers.secret === process.env.DB_PORT`.

---

### 6.8 Seed (`/api/seed`) — Stage Only

These endpoints are **gated by `NODE_ENV !== 'production'`** and return `403` in any other environment.

#### `POST /api/seed/demo-data` 🔒

Seed realistic demo data for the current month. Uses batch INSERTs for performance.

- Checks for existing data — refuses to seed if month already has records
- Fetches user's actual categories and terminals from DB
- Creates income records for every income category (amounts based on category name)
- Creates expense records across all categories × all terminals
- Auto-distributes income to default terminal and creates inter-terminal transfers

**Response (201):**

```json
{
  "success": true,
  "msg": "Demo data seeded successfully.",
  "data": {
    "incomeRecords": 2,
    "expenseRecords": 12,
    "terminalTransfers": 2
  }
}
```

#### `DELETE /api/seed/demo-data` 🔒

Clear all income records, expense records, and distribution records for the current month.

**Response (200):**

```json
{
  "success": true,
  "msg": "Month data cleared successfully.",
  "data": {
    "incomeRecords": 2,
    "expenseRecords": 12,
    "distributionRecords": 6
  }
}
```

---

### 6.9 Recurring (`/api/recurring`)

#### `POST /api/recurring/create` 🔒

Create a recurring transaction template.

```json
{
  "type": "expense",
  "category_id": 3,
  "terminal_id": 1,
  "amount": 500,
  "spend_on": "Netflix",
  "description": "Monthly subscription",
  "recurrence_interval": "monthly",
  "next_execution_date": "2026-03-15"
}
```

#### `GET /api/recurring` 🔒

Get all recurring templates for the authenticated user.

#### `PUT /api/recurring/edit/:id` 🔒

Edit a recurring template.

#### `DELETE /api/recurring/delete/:id` 🔒

Delete a recurring template.

#### `GET /api/recurring/cron`

Dedicated endpoint for Vercel Cron Jobs. Executes all due recurring transactions, auto-distributes income to default terminals, validates expense terminal balances, creates per-user notifications, and **notifies all admin users** on success.

---

### 6.10 Sentry / Error Tracking (`/api/sentry`) — Admin Only 🔒

All sentry endpoints require the authenticated user to have `is_admin = 1`.

#### `POST /api/sentry/log` 🔒

Log an error (used internally by backend error middleware, BFF interceptor, and frontend interceptor).

```json
{
  "source": "frontend",
  "level": "high",
  "method": "GET",
  "url": "/api/v1/balance/monthly-summery",
  "status_code": 500,
  "message": "Internal Server Error",
  "stack": "Error: ...",
  "payload": { "from": "2026-01-01" },
  "user_agent": "Mozilla/5.0 ..."
}
```

#### `GET /api/sentry/errors?page=1&limit=20&source=&level=&status=&search=` 🔒

Fetch paginated error list with optional filters.

**Response (200):**

```json
{
  "success": true,
  "msg": "Error logs fetched.",
  "data": {
    "results": [ { "id": 1, "source": "backend", "level": "high", "message": "...", ... } ],
    "total": 86,
    "totalPages": 5,
    "currentPage": 1
  }
}
```

#### `GET /api/sentry/errors/:id` 🔒

Fetch single error detail (joins with `users` table for username/email).

#### `PATCH /api/sentry/errors/:id` 🔒

Toggle `is_resolved` status.

#### `GET /api/sentry/stats` 🔒

Get aggregate stats: `total`, `open_count`, `critical_count`, `today_count`.

## 7. Frontend Architecture

### Directory Structure

```
Fintracker-frontend/src/
├── app/
│   ├── api/v1/             # Next.js API Route Handlers (proxy to backend)
│   │   ├── login/route.js
│   │   ├── signup/route.js
│   │   ├── income-source/route.js
│   │   ├── income-record/route.js, create/route.js, edit/route.js
│   │   ├── expense-category/route.js, edit/route.js
│   │   ├── expense-record/route.js, create/route.js, edit/route.js, delete/route.js
│   │   ├── income-distribution/route.js, create/route.js, terminals/route.js, transfer/route.js
│   │   ├── balance/monthly-summery/route.js, yearly-summery/route.js
│   │   ├── notes/create/route.js, get-all/route.js, [id]/route.js
│   │   ├── user/route.js, edit-user/route.js, auto-transfer/route.js
│   │   ├── recurring/route.js, create/route.js, edit/[id]/route.js, delete/[id]/route.js
│   │   ├── sentry/log/route.js, errors/route.js, errors/[id]/route.js, stats/route.js
│   │   ├── seed-demo-data/route.js     # POST + DELETE proxy (stage-only)
│   │   └── reset-password/route.js, email-send/route.js
│   ├── login/              # Login page
│   │   ├── page.jsx        # Login form UI
│   │   ├── loginAction.js  # Server action for login
│   │   └── demoLoginAction.js  # Server action for demo login (stage-only)
│   ├── signup/             # Signup page
│   ├── income/             # Income pages (source, record, transfer-history)
│   ├── expense/            # Expense pages (category, record, breakdown)
│   ├── notes/              # Notes page
│   ├── setting/            # Settings page (user profile, auto-transfer)
│   ├── reset-password/     # Password reset page
│   ├── user-manual/        # User manual page
│   ├── recurring/          # Recurring transactions page
│   ├── sentry/             # Error tracking admin dashboard (admin-only)
│   ├── layout.js           # Root layout (Inter font, Toaster, Analytics)
│   ├── page.js             # Home/Overview page
│   ├── loading.jsx         # Global loading UI
│   └── not-found.jsx       # 404 page
├── components/
│   ├── fields/             # Reusable form fields
│   │   ├── Button.jsx      # Base button (primary/secondary/danger/default, sizes)
│   │   ├── AuthButton.jsx  # Submit button with loading state (used in login/signup)
│   │   ├── DemoLoginButton.jsx  # Demo login button (stage-only)
│   │   ├── Input.jsx       # Input field with label, icon support
│   │   └── ...             # Others: Select, Dropdown, Checkbox, etc.
│   ├── Header.jsx          # App header with date range picker
│   ├── SideBar.jsx         # Navigation sidebar
│   ├── Content.jsx         # Main content wrapper
│   ├── MainLayout.jsx      # Layout with sidebar + content
│   ├── chart/              # Chart components (LineChart, BarChart)
│   ├── home/               # Overview page components
│   │   ├── BalanceDetails.jsx    # Income/Expense/Remain cards
│   │   ├── RecentTransection.jsx # Income/Expense list + doughnut chart
│   │   ├── YearlySummery.jsx     # Yearly bar chart
│   │   ├── SeedDemoButton.jsx    # "Populate sample data" banner (stage-only, empty month)
│   │   └── ClearMonthButton.jsx  # "Clear this month's data" link (stage-only, has data)
│   ├── modals/             # Modal dialogs (create/edit forms)
│   ├── sentry/             # Sentry UI components
│   │   ├── SentryErrorBoundary.jsx  # React Error Boundary for render crashes
│   │   └── SentryUIComponents.jsx   # Badge, StatCard, FilterSelect
│   └── settings/           # Settings page components
├── helpers/
│   ├── frontend/           # Client-side helpers
│   │   ├── apiEndpoints.js # Frontend API URLs (/api/v1/*)
│   │   ├── setToken.js     # Cookie setter (server action, httpOnly, secure)
│   │   ├── formateDate.js  # Date formatting utils
│   │   ├── getBreakdown.js # Expense breakdown calculations
│   │   ├── getSum.js       # Amount formatting with currency
│   │   └── others.js       # Misc helpers
│   ├── backend/            # Server-side helpers (run on Next.js server only)
│   │   ├── apiRequest.js   # Axios wrapper for backend calls
│   │   ├── endpoints.js    # Backend API URLs (SERVER_URL/api/*)
│   │   └── getJwtToken.js  # Read JWT from cookies
│   └── validation.js       # Password validation
├── context/                # React context (DataContext for global state)
│   └── DataContext.jsx     # User, records, terminals, sidebar state
├── assets/
│   ├── constants/          # App constants, sidebar menu, table headers
│   ├── images/             # Static images for manual
│   └── svg/                # SVG icon components
├── styles/
│   └── globals.css         # Global styles + Tailwind imports
└── middleware.js            # Next.js Edge middleware — route protection
```

### Key Frontend Patterns

1. **Server Actions pattern:** Forms use `useFormState` hook → server action → Next.js API route → backend
2. **Auth middleware (Edge):** `middleware.js` checks JWT cookie on every navigation. Exempt paths: `/about`, `/reset-password`. Redirects to `/login` if no token. Uses `jose` library for Edge-compatible JWT verification.
3. **Token storage:** JWT stored as httpOnly, secure, sameSite=strict cookie with 30-day expiry
4. **API proxy:** All frontend API routes (`/api/v1/*`) proxy requests to the backend, adding the `token` header from the cookie
5. **Button component:** Supports `primary`, `secondary`, `danger`, `default` colors and `small`, `md`, `large` sizes

### Tailwind Custom Colors (from `tailwind.config.js`)

- `pest` — primary green color
- `pest-200` — hover green
- `pRed` — danger/error red
- `phGray` — placeholder gray

---

## 8. Authentication Flow

```
Registration:
1. POST /api/auth/register (username, email, password, phone?)
2. Backend: hash password (bcrypt, 10 rounds), insert user, create default terminal "pocket", create user_settings
3. Return JWT token (30 day expiry). Payload: { user_id, username, email, phone }

Login:
1. User submits form → loginAction.js (server action)
2. Server action POSTs to CLIENT_URL/api/v1/login
3. Next.js API route validates + forwards to SERVER_URL/api/auth/login
4. Backend: find user by email/phone, bcrypt.compare password, update last_login, return JWT
5. Server action: setToken(cookie) + permanentRedirect to "/"

Route Protection:
1. Next.js middleware.js runs on every request (Edge runtime)
2. Reads JWT from cookie, verifies with jose.jwtVerify
3. No token + protected route → redirect to /login
4. Token exists + login/signup page → redirect to /
5. Invalid/expired token → clear cookie

Backend Auth:
1. Every protected endpoint calls jwtVerified(req)
2. Reads token from req.headers.token (custom header, NOT Authorization)
3. Verifies with jsonwebtoken, checks expiry
4. Returns { success: true, data: { user_id, username, email, phone } }
```

---

## 9. Security — Field-Level Encryption

FinTracker uses **MySQL AES_ENCRYPT/AES_DECRYPT** for sensitive data at the database level.

```javascript
// utils/security.js
encryptData(data) → `AES_ENCRYPT("${data}", "${DB_DATA_ENCYPTION_SECRET}")`
decryptData(data) → `AES_DECRYPT(${data}, "${DB_DATA_ENCYPTION_SECRET}")`
```

**Encrypted fields:** category names, descriptions, amounts, terminal names, spend_on, note titles/descriptions.

**Buffer handling:** AES_DECRYPT returns binary buffers. `bufferToString()` utility converts buffer fields to readable strings in query results.

> **Important for developers:** When querying encrypted fields, always use `${decryptData("column")} AS column` in SELECT and `${encryptData(value)}` in INSERT/UPDATE. Never store raw text in encrypted columns.

---

## 10. Deployment

Both frontend and backend are deployed on **Vercel**.

- **Backend:** Has `vercel.json` with routing config. Entry point is `index.js`.
- **Frontend:** Standard Next.js Vercel deployment.
- **Database:** External MySQL.
- **Cron Jobs:**
  - `cron-job.org` calls `GET /api/user/setting-auto-update` monthly to reset auto-transfer flags.
  - Vercel Cron calls `GET /api/recurring/cron` daily to execute due recurring transactions and notify admins.
- **Swagger:** API docs available at `{SERVER_URL}/api-docs`.

### Running Locally

```bash
# Backend
cd Fintracker-backend
npm install
npm run dev    # nodemon index.js, port 3001

# Frontend
cd Fintracker-frontend
npm install
npm run dev    # next dev, port 3000
```

---

## 11. Changelog

| Date       | Change                                            | Files                                                                                                                                                                                      |
| ---------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-02-20 | Initial project overview created                  | `PROJECT_OVERVIEW.md`                                                                                                                                                                      |
| 2026-02-20 | Added demo login button (stage-only)              | `demoLoginAction.js`, `DemoLoginButton.jsx`, `login/page.jsx`, `.env.example`                                                                                                              |
| 2026-02-21 | Added seed demo data endpoint + UI button         | `seedController.js`, `seedRoutes.js`, `SeedDemoButton.jsx`, `seed-demo-data/route.js`                                                                                                      |
| 2026-02-21 | Added clear month data endpoint + UI button       | `seedController.js`, `ClearMonthButton.jsx`                                                                                                                                                |
| 2026-02-21 | Performance: batch INSERTs, parallel queries      | `seedController.js`                                                                                                                                                                        |
| 2026-02-21 | Fix: proper DataContext refetch instead of reload | `SeedDemoButton.jsx`, `ClearMonthButton.jsx`                                                                                                                                               |
| 2026-02-22 | Feature: Monthly Budgets tracker via DB update    | `expense_categories`, `CategoryModal`, `BudgetOverview`, `categoryController`                                                                                                              |
| 2026-02-22 | Feature: Financial Health Score widget            | `FinancialHealthScore.jsx`, `app/page.js`                                                                                                                                                  |
| 2026-02-22 | Feature: Financial Insights comparative tracker   | `ExpenseInsights.jsx`, `app/page.js`                                                                                                                                                       |
| 2026-02-24 | Feature: Migrations Folder created for SQL init   | `migrations/001_init_schema.sql`                                                                                                                                                           |
| 2026-02-24 | Feature: Recurring Transactions (Income/Expense)  | `recurring_transactions`, `recurringController.js`, `cronJob.js`, `recurring/page`                                                                                                         |
| 2026-02-24 | Feature: Notification System (Backend + Frontend) | `notifications`, `notification_reads` tables, `notificationController.js`, `notificationRoutes.js`, `createNotification.js`, `NotificationBell.jsx`, `NotificationPanel.jsx`, `Header.jsx` |
| 2026-02-28 | Feature: Error Tracking — DB & Backend API        | `error_logs` table, `is_admin` column in `users`, `logError.js`, `sentryController.js`, `sentryRoutes.js`, `sendServerError.js` integration                                                |
| 2026-02-28 | Feature: Error Tracking — BFF & Frontend Capture  | `sentryInterceptor.js`, `SentryErrorBoundary.jsx`, BFF proxy routes (`/api/v1/sentry/*`), `apiRequest.js` BFF error logging                                                                |
| 2026-02-28 | Feature: Error Tracking — Admin Dashboard UI      | `sentry/page.jsx`, `SentryUIComponents.jsx`, `SentryIcon.jsx`, sidebar link (admin-only), debounced search, detail caching, optimistic resolve toggle                                      |
| 2026-03-01 | Feature: Cron Job admin notification              | `recurringRoutes.js` — all admins notified on successful cron execution                                                                                                                    |
| 2026-03-01 | Docs: PROJECT_OVERVIEW.md comprehensive update    | Added `error_logs` table, `is_admin` column, Sentry API docs, updated architecture diagram (14 tables), frontend structure, cron info, changelog                                           |
