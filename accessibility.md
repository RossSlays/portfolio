---
title: Accessibility
---

# Accessibility

Accessibility works best when it's built into the process, not tacked on before launch. At Pixelfridge, I built a WCAG 2.2 audit spreadsheet that's now part of the agency's standard go-live checklist.

## The audit

It covers all three conformance levels, A, AA, and AAA, plus a Best Practice category for things outside the formal spec. Eight sections span the full scope: Content, Design, Development, and five QA disciplines covering keyboard navigation, forms, colour contrast, screen reader compatibility, and media.

![The audit dashboard tab showing conformance summary broken down by WCAG level and section scores](/screenshots/spreadsheet-dashboard.webp)

Each criterion is tagged by discipline, so a content editor sees what's theirs and a developer isn't wading through design criteria.

![A checklist sheet showing WCAG criteria tagged by discipline with pass, fail, and N/A status columns](/screenshots/spreadsheet-checklists.webp)

Failures auto-populate a shared issues log with the WCAG reference, a description, the responsible owner, and notes. A dashboard summarises conformance by level so you can see at a glance where a site stands.

## Testing tools

Across my career I've used a range of tools depending on what needs testing:

- **SortSite / Powermapper** - site-wide automated scanning across WCAG levels, good for catching issues at scale before manual review
- **WAVE** - page-level visual overlay highlighting contrast failures, missing labels, and heading structure
- **Axe / Arc** - browser-based auditing integrated into dev workflow, useful for catching issues during build rather than at QA
- **Lighthouse** - quick automated pass covering accessibility alongside performance and best practices
- **W3C HTML Validator** - structural validation to catch semantic errors that affect assistive technology
- **VoiceOver** - primary screen reader for manual testing on macOS and iOS
- **NVDA** - Windows screen reader for cross-platform screen reader coverage
- **WebAIM Contrast Checker** - manual contrast ratio checking for text, UI components, and focus indicators

No single tool catches everything. Automated scanners typically surface around 30-40% of real issues; the rest requires manual keyboard and screen reader testing.

## Why it matters

Most of the clients I work with are charities, housing associations, and public sector organisations that serve people who rely on assistive technology. For them, an inaccessible site isn't inconvenient; it's a blocker. Treating accessibility as a gate in the go-live process means it gets the same attention as visual QA or cross-browser testing.
