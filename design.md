# Design - LaporSekolah

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page; extend this file when the system
needs to grow.

## Genre
modern-minimal, operational dashboard

## Macrostructure family
- Marketing pages: Split Studio with H2 split diptych and compact auth form.
- App pages: Workbench with metric strip, filter rail, dense table, and clear status controls.
- Content pages: Long Document with readable complaint body and structured metadata.

## Theme
- `--color-paper`   oklch(98% 0.012 205)
- `--color-paper-2` oklch(95% 0.018 205)
- `--color-surface` oklch(100% 0.004 205)
- `--color-ink`     oklch(22% 0.026 220)
- `--color-ink-2`   oklch(42% 0.03 220)
- `--color-rule`    oklch(87% 0.018 210)
- `--color-accent`  oklch(53% 0.13 166)
- `--color-focus`   oklch(66% 0.17 166)

## Typography
- Display: Inter, weight 760, style normal
- Body: Inter, weight 400
- Mono: SFMono-Regular, weight 500
- Display tracking: 0
- Type scale anchor: `--text-display = clamp(2.15rem, 6vw, 4.25rem)`

## Spacing
4-point named scale. Pages must use named tokens (`var(--space-md)`), never raw
values when a token exists.

## Motion
- Easings: `--ease-out`, `--ease-in`, `--ease-in-out`
- Reveal pattern: none by default
- Reduced-motion fallback: opacity/transform transitions collapse to <=150ms.

## Microinteractions stance
- Silent success with inline state and toast only after saved work.
- Confirmation dialogs only for destructive delete actions.
- Hover changes background, color, or 1px translate; no bouncy motion.
- Focus rings appear instantly at >=3:1 contrast.

## CTA voice
- Primary CTA: solid accent, 8px radius, direct verb copy.
- Secondary CTA: quiet outlined surface, same radius and rhythm.
- Destructive CTA: solid danger only where the user is deleting data.
- Icon actions: square 36px controls with visible tooltip/title.

## Per-page allowances
- Auth pages may use a dark trust panel and product promise.
- App pages must stay dense, scannable, and task-led.
- Content/detail pages are typography-first and may use one attachment preview.

## What pages MUST share
- The LaporSekolah wordmark / `LS` mark.
- Accent placement below 8% of each viewport.
- Inter/system type stack.
- Button, input, panel, table, badge, and toast language.
- Status colour semantics: pending = amber, diproses = blue, selesai = green.

## What pages MAY differ on
- Dashboard may use charts and metric cards.
- Complaint list may prioritize filtering and bulk scanning.
- Complaint detail may use a narrower reading measure.
- Admin pages may be denser than student-facing pages.

## Exports

### tokens.css
```css
:root {
  --color-paper: oklch(98% 0.012 205);
  --color-paper-2: oklch(95% 0.018 205);
  --color-surface: oklch(100% 0.004 205);
  --color-ink: oklch(22% 0.026 220);
  --color-ink-2: oklch(42% 0.03 220);
  --color-rule: oklch(87% 0.018 210);
  --color-accent: oklch(53% 0.13 166);
  --color-accent-ink: oklch(99% 0.012 160);
  --color-focus: oklch(66% 0.17 166);

  --font-display: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-body: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
}
```

### Tailwind v4 `@theme`
```css
@theme {
  --color-paper: oklch(98% 0.012 205);
  --color-ink: oklch(22% 0.026 220);
  --color-accent: oklch(53% 0.13 166);
  --font-display: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-body: Inter, ui-sans-serif, system-ui, sans-serif;
  --spacing-md: 1.5rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### DTCG `tokens.json`
```json
{
  "color": {
    "paper": { "$value": "oklch(98% 0.012 205)", "$type": "color" },
    "ink": { "$value": "oklch(22% 0.026 220)", "$type": "color" },
    "accent": { "$value": "oklch(53% 0.13 166)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Inter", "$type": "fontFamily" },
    "body": { "$value": "Inter", "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1.5rem", "$type": "dimension" }
  }
}
```

### shadcn/ui CSS variables
```css
:root {
  --background: 98% 0.012 205;
  --foreground: 22% 0.026 220;
  --primary: 53% 0.13 166;
  --primary-foreground: 99% 0.012 160;
  --muted: 95% 0.018 205;
  --muted-foreground: 42% 0.03 220;
  --border: 87% 0.018 210;
  --input: 87% 0.018 210;
  --ring: 66% 0.17 166;
  --radius: 8px;
}
```
