# Design contract

The visual rules for this site, so people and agents build the same way. The
direction ("blueprint ink + brass") is ours; the *method* is borrowed from Meta's
open-source design system, [Astryx](https://github.com/meta/astryx) (`docs/design/`).
We borrow principles, not code. Tokens live in `src/app/globals.css`.

## Rules (each maps to an Astryx principle)

1. **Type roles, not sizes.** Use a role (`.type-section`, `.doc-label`,
   body/support text colours `text-muted` / `text-faint`) instead of re-spelling
   size and weight. Adjacent roles must differ visibly. (typography-hierarchy)
2. **One accent, scarce.** Brass marks the single primary action or the single
   active state in a local group. Never two competing brass buttons.
   (color-emphasis DR3)
3. **Space before containers.** Group with proximity first; add a card or border
   only when spacing cannot do it. Ladder: local `--space-local` < group
   `--space-group` < section `--space-section` (`.section-y`). (spatial-hierarchy)
4. **One edge language.** A surface is bounded by a hairline border *or* soft
   depth, never both at full strength. We use hairlines; no shadows. No coloured
   side-stripes on rounded cards. (elevation-hierarchy, shape-relationships)
5. **Radius follows role.** `rounded` tags/inner, `rounded-md` controls,
   `rounded-lg` containers. Nested shapes stay concentric. (shape-relationships)
6. **Hover tints, it does not replace.** Use `.tint-interactive` so hover blends
   with the surface. Hover is optional feedback; focus and touch keep the same
   meaning. (color-emphasis DR5/DR7)
7. **Motion carries meaning.** Feedback 150ms (`--duration-feedback`), entrances
   280ms (`--duration-enter`), `--ease-settle`, no bounce. Under
   `prefers-reduced-motion` there is no travel and changes land instantly.
   (motion, reduced-motion)

8. **One button.** Use `<Button>` (`primary` | `secondary` | `ghost`). Never
   hand-spell button classes. One primary per local group.
9. **One state ladder.** Rest, hover, press, current, disabled, in that order.
   Links use `.link-quiet` (via `NavLink` for sections: `aria-current` plus an
   underline, never colour alone). Disabled stays readable (`aria-disabled`,
   dimmer not invisible). Focus is the global `:focus-visible` ring.
   (user-states, system-states)
10. **Themes are token overrides.** Dark is the identity and default; light is
    opt-in (`ThemeToggle`, `html[data-theme="light"]` in `globals.css`). Never
    hardcode a hex in a component or SVG: use `var(--color-*)`. Text on a brass
    fill is `text-on-brass`, not `text-ink`. Re-check AA when changing a token.
    (color-emphasis, template-composition DR5)

## Before shipping a page

Squint test: can you tell title, primary content, and primary action apart at a
glance? Check populated and sparse states, narrow width, and keyboard focus.
(template-composition)
