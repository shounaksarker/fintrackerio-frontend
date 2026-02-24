# FinTracker — Upcoming Feature Plans

> **Purpose:** A roadmap for proactive financial planning features to elevate FinTracker from a simple tracker to a smart financial advisor.

## 1. 🔄 Recurring Transactions (Subscriptions & Routine Bills)

Currently, users have to manually input regular expenses (like Netflix, rent, internet) or regular income (salary) every month.

- **The Plan:** Create a "Recurring" toggle when adding a record. The system will automatically add this record on the specified date (weekly, monthly, yearly).
- **Example:** User sets up a monthly $15 Netflix expense on the 5th of every month. The app automatically deducts this from their designated terminal (e.g., Credit Card) and updates the budget without manual entry.
- **Impact:** Reduces user friction and prevents "forgotten" expenses from ruining the budget.

## 2. 🎯 Savings Goals & Wishlists

Users know how much they save via the Health Score, but they don't have a dedicated way to save _for_ something specific (e.g., a new iPhone, a vacation, an emergency fund).

- **The Plan:** Add a "Goals" module. Users can define a target amount and a target date. We allow them to allocate a portion of their monthly "Remain" balance to these goals.
- **Example:** Goal: "MacBook Pro" ($2000). Target: December. The app calculates "You need to save $200/month." The user can manually transfer funds from "Pocket" to the "MacBook Goal" (acting as a virtual terminal), and see a progress bar (e.g., 40% complete).
- **Impact:** Gamifies saving and gives the "Remain" balance a concrete purpose.

## 3. 🤝 Debt & Loan Management (Lend/Borrow)

In real life, people frequently lend money to friends or take micro-loans/credit. Standard expense tracking makes this messy because a repaid loan looks like "income."

- **The Plan:** Create a "Debt Tracker" section. Users can log "I borrowed $50 from John" or "I lent $100 to Sarah."
- **Example:** When Sarah repays $50, the user logs a repayment. The system updates the outstanding balance to $50 and adds the money back to a terminal (e.g., bKash) _without_ counting it as monthly income, keeping the Health Score accurate.
- **Impact:** Solves a major pain point in personal finance that most simple trackers ignore.

## 4. 🔮 Future Month Projections (Financial Forecasting)

Users want to know: _"If I keep spending like this, will I have enough for rent next week?"_

- **The Plan:** Use the existing `ExpenseInsights` logic to predict future balances. Combine standard recurring bills + average daily spending.
- **Example:** It's the 15th of the month. The user has $500 left. The app sees a recurring rent bill of $400 on the 25th and warns: _"Heads up! After your upcoming Rent bill, you will only have $100 left for the last 5 days of the month. Consider slowing down on 'Food' expenses."_
- **Impact:** Shifts the app from being purely retrospective (looking back) to highly prescriptive (giving advice for the future).

## 5. 🔔 Notification System (Alerts & Reminders)

Users need to be informed about background activities and important account statuses without having to dig through their transaction history.

- **The Plan:** Add a dedicated `notifications` table and a Notification Center UI (bell icon) in the frontend. Notifications will be soft-deleted ("Mark as Read").
- **Example:** If a recurring transaction fails due to insufficient funds, the system creates an alert: _"Failed to pay 20৳ for Netflix because Pocket terminal has insufficient funds."_ Could also include low balance warnings and budget alerts.
- **Impact:** Keeps the user engaged and informed about automated actions and account health, improving overall trust in the app.

## 6. make sentry to show the error as admin
