---
name: frontend-ui
description: Build or improve frontend UI, layouts, styling, and components. Use for visual changes, supplied screenshots or reference links, responsive design, or when the user wants a polished, distinctive result rather than generic AI-generated UI. Requires visual inspection of the rendered result when browser tools are available.
---

# Frontend UI

Build product-quality UI that makes deliberate choices for this product, without
reinventing the project's primitives or producing a generic template.

General code-quality, React, and safety rules live in `senior-engineering`;
this skill adds the design judgment and UI-specific engineering on top.

## Workflow

1. Inspect the existing theme, components, layout patterns, and strong existing
   screens. Reuse the design system unless a redesign is requested.
2. If screenshots or reference URLs are supplied, view them before coding.
   Extract specific decisions about hierarchy, composition, typography, density,
   imagery, and interaction. A text fetch or accessibility snapshot is not visual
   inspection. If a reference cannot be viewed, say so rather than inventing
   observations.
3. For a substantial new surface without references, study two or three relevant
   shipped products when browser/search tools are available. Borrow principles,
   not branding, assets, or whole layouts.
4. State a compact direction: audience, content hierarchy, one distinctive
   decision grounded in the subject, and any intended visual references. Revise
   it if it would fit an unrelated product unchanged.
5. Implement with existing tokens and components. Include only the states the
   surface actually has: loading, empty, error, long content, and interactions.
6. Run the app, capture screenshots, and view them at desktop and mobile sizes.
   Fix concrete problems, then inspect fresh screenshots. Read
   `references/visual-validation.md` before this step.

If browser tools, the runtime, or access are unavailable, report the blocked
visual verification and state how it should be completed.

## Design judgment

Layout should follow real content and user tasks, not a default hero-to-cards
template. Use precise, realistic copy; do not invent customer claims, metrics,
or decorative filler.

- Make typography, spacing, imagery, and hierarchy serve the product and its
  audience. Let structural labels, dividers, and motion communicate something
  true rather than decorate.
- Spend visual emphasis deliberately. One memorable, subject-appropriate move is
  stronger than competing gradients, glows, cards, or animation.
- Do not reach reflexively for cream-and-serif, dark-and-neon, gradient blobs,
  glass panels, numbered eyebrows, or identical rounded cards. They are valid
  only when the brief or existing system makes them an intentional choice.
- Preserve familiar controls and readable content; distinctiveness must not harm
  usability.

## Implementation floor

- Reuse existing components and tokens before creating new ones. Keep CSS
  specificity and responsive rules straightforward.
- Make keyboard focus, labels, disabled states, and user-triggered feedback
  visible. Respect reduced motion and the project's dark-mode behavior.
- Use one obvious primary action where the task calls for one. Never expose raw
  technical errors to end users.
