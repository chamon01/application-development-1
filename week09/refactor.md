# Refactor Notes (Week 09)

## Improvement 1: Shared error helper
What changed:
- Added helpers/sendError.js
- Updated controllers to use sendError(...) instead of repeating res.status(...).json(...) blocks

Why it improves quality:
- Reduces duplication
- Keeps error formatting consistent
- Makes controller logic easier to read

Before vs After:
- Before: repeated error JSON blocks in multiple controllers
- After: controllers call sendError(res, status, code, message)

---

## Improvement 2: Better variable naming
What changed:
- Renamed unclear variables (example: t -> task, idx -> index)

Why it improves quality:
- Code is easier to understand at a glance
- Less confusion when reading controller logic

Before vs After:
- Before: short variable names
- After: descriptive names that match the data

---

## Improvement 3: Validation stays in middleware
What changed:
- Required-field validation for tasks is handled in middleware (validateTask.js), not in the controller

Why it improves quality:
- Controllers focus on business logic
- Validation is reusable and short-circuits correctly