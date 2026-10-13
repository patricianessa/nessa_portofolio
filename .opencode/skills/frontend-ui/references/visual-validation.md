# Visual Validation

Read this after implementing a visual UI change and before declaring it complete.

1. Start the app with its existing command and open the changed route or flow.
2. Capture and view screenshots at a desktop viewport and a narrow mobile
   viewport. Include relevant below-the-fold content.
3. Compare the render against the brief, viewed references, and existing design
   system. Inspect hierarchy, type wrapping, spacing, alignment, clipping,
   contrast, imagery, and whether the primary task is obvious.
4. Exercise changed controls with keyboard and pointer input. Check the relevant
   responsive, loading, empty, error, disabled, and long-content states.
5. Inspect browser console errors and failed requests relevant to the change.
6. Fix observed defects, then capture and inspect new screenshots. Repeat until
   the criteria are met or report the blocker.

Use component-specific checks only when applicable:

- Forms: visible label or accessible name, field-level validation, and duplicate
  submission prevention.
- Dialogs: focus handling, clear dismissal, Escape behavior where appropriate,
  and a usable small-screen layout.
- Tables and lists: readable density, controlled overflow, consistent actions,
  and a useful empty state.
- Data mutations: loading feedback, understandable recovery from failure, and no
  surprising layout shift.
