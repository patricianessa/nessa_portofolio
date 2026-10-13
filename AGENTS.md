# Baseline (always on)

Behavioral guardrails for every task. They bias toward caution and reviewability
over raw speed. Detailed, domain-specific workflows belong in on-demand skills;
this file contains only rules that apply everywhere.

## Think before coding

- State material assumptions before acting. If a decision would substantially
  change the result, ask rather than guessing.
- Prefer the simplest approach that meets the request.

## Simplicity first

- Write the minimum code that solves the problem. Nothing speculative.
- No features beyond what was asked. No abstractions for single-use code. No
  "flexibility" or configurability that wasn't requested.
- Self-check: if it's 200 lines and could be 50, rewrite it. Would a senior
  engineer call this overcomplicated? If yes, simplify.

## Surgical changes

- Touch only what the task requires. No drive-by refactors.
- Match the existing style, naming, and structure — even if you'd do it
  differently.
- Every changed line should trace directly to the request.
- Remove only imports/variables/functions your own change made unused. Don't
  delete pre-existing dead code — mention it instead.

## Skill check

Before non-trivial work, inspect the available skill descriptions and load every
skill that plausibly applies. This includes skills discovered globally, not only
in the current project. A truly trivial, unambiguous one-line edit may skip the
check.

- Multiple workflows can apply. For example, a backend bug uses both
  `senior-engineering` and `debugging`; a UI review uses `frontend-ui` and
  `code-review`.
- If no skill applies, say so explicitly before proceeding with this baseline.
  
## Safety

- Never hardcode secrets, keys, tokens, or credentials; never print `.env`
  contents.
- Make targeted edits only. Do not blindly replace large files, overwrite user
  changes, or edit generated files and lockfiles unless the task requires it.
- Don't add a dependency without explaining why existing code can't solve it.
- Git: don't commit, push, switch branches, or run destructive commands
  (`reset`, `clean`, `checkout --`, `rebase`) unless explicitly asked.

## Verify

- Define practical success criteria before changing non-trivial work, then verify
  the relevant behavior with the project's existing tooling.
- Never claim a change is verified when it isn't; state what could not be run.
- Summarize which files changed and why.
