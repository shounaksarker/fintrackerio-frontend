# FinTracker — Upcoming Feature Plans

> **Purpose:** A roadmap for proactive financial planning features to elevate FinTracker from a simple tracker to a smart financial advisor.

## 1. 🔄 Recurring Transactions (Subscriptions & Routine Bills)
Currently, users have to manually input regular expenses (like Netflix, rent, internet) or regular income (salary) every month.

- **The Plan:** Create a "Recurring" toggle when adding a record. The system will automatically add this record on the specified date (weekly, monthly, yearly).
- **Example:** User sets up a monthly $15 Netflix expense on the 5th of every month. The app automatically deducts this from their designated terminal (e.g., Credit Card) and updates the budget without manual entry.
- **Impact:** Reduces user friction and prevents "forgotten" expenses from ruining the budget.

## 2. 🎯 Savings Goals & Wishlists
Users know how much they save via the Health Score, but they don't have a dedicated way to save *for* something specific (e.g., a new iPhone, a vacation, an emergency fund).

- **The Plan:** Add a "Goals" module. Users can define a target amount and a target date. We allow them to allocate a portion of their monthly "Remain" balance to these goals.
- **Example:** Goal: "MacBook Pro" ($2000). Target: December. The app calculates "You need to save $200/month." The user can manually transfer funds from "Pocket" to the "MacBook Goal" (acting as a virtual terminal), and see a progress bar (e.g., 40% complete).
- **Impact:** Gamifies saving and gives the "Remain" balance a concrete purpose.

## 3. 🤝 Debt & Loan Management (Lend/Borrow)
In real life, people frequently lend money to friends or take micro-loans/credit. Standard expense tracking makes this messy because a repaid loan looks like "income."

- **The Plan:** Create a "Debt Tracker" section. Users can log "I borrowed $50 from John" or "I lent $100 to Sarah."
- **Example:** When Sarah repays $50, the user logs a repayment. The system updates the outstanding balance to $50 and adds the money back to a terminal (e.g., bKash) *without* counting it as monthly income, keeping the Health Score accurate.
- **Impact:** Solves a major pain point in personal finance that most simple trackers ignore.

## 4. 🔮 Future Month Projections (Financial Forecasting)
Users want to know: *"If I keep spending like this, will I have enough for rent next week?"*

- **The Plan:** Use the existing `ExpenseInsights` logic to predict future balances. Combine standard recurring bills + average daily spending.
- **Example:** It's the 15th of the month. The user has $500 left. The app sees a recurring rent bill of $400 on the 25th and warns: *"Heads up! After your upcoming Rent bill, you will only have $100 left for the last 5 days of the month. Consider slowing down on 'Food' expenses."*
- **Impact:** Shifts the app from being purely retrospective (looking back) to highly prescriptive (giving advice for the future).
