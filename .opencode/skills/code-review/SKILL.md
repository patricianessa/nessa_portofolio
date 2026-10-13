---
name: code-review
description: Review, refactor, clean up, or improve the quality of existing code. Use when the user asks to review code, find bugs or edge cases, reduce complexity, remove duplication, improve maintainability, or make code cleaner and more optimal — anything framed as evaluating or improving code that already exists rather than writing new behavior. For diagnosing a specific failure, use debugging instead.
---

# Code Review

Review existing code for material risks and the smallest high-impact
improvements. Preserve behavior unless the request asks to change it.

## Review priorities

Work in this order — do not polish style before correctness is settled:

1. Correctness
2. Simplicity
3. Safety
4. Maintainability
5. Performance
6. Style consistency

## What to look for

- Hidden bugs, broken edge cases, unhandled null/undefined.
- Race conditions and incorrect async handling.
- Overcomplicated or duplicated logic; unnecessary state or dependencies.
- Unclear boundaries or duplication that makes behavior unsafe to change.
- Unsafe input handling and security issues.
- Poor naming.
- Performance bottlenecks that actually matter (not hypothetical ones).

## Refactoring rules

- Keep behavior identical unless the user asked to change it. Preserve public
  APIs.
- Make small, safe, reviewable improvements. Don't rewrite whole files unless
  the current structure genuinely blocks the requested improvement.
- Extract only when it improves a concrete boundary, clarity, or testability.

## Output

When reviewing without editing, report only actionable findings, ordered by
severity. Each finding includes its location, impact, and evidence. If there are
no findings, say so and name remaining test gaps.

When asked to edit, implement the approved or clearly requested fixes only, then
verify the affected behavior with the project's existing checks.
