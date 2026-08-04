---
title: AI
---

# AI

I use AI tools daily, Claude included, but a decade of building for the web is what tells me when to trust the output and when to override it.

## How I use it

- Scaffolding boilerplate, first-pass component structure, and repetitive refactors, so I spend less time typing and more time on the decisions that matter
- Debugging: pointing an LLM at a stack trace or a gnarly CSS bug often gets me to a fix faster than searching alone
- Drafting documentation and code comments, then editing for accuracy
- Reviewing my own PRs for an extra pass before a human does

## Where judgment still matters

- AI tools work from the context they're given, not the context of the actual project, client, or codebase history. They'll confidently suggest a pattern that ignores an existing convention, a past decision, or a constraint that lives only in a client's head, not in the repo
- Accessibility is a recurring blind spot: generated markup frequently looks correct but fails WCAG in ways that need a trained eye and manual testing to catch, see [Accessibility](/accessibility)
- Generated code tends toward the average solution. Knowing the codebase, the client, and the edge cases is what turns "technically works" into "actually right"

## Why it matters

Clients aren't paying for someone who can prompt a chatbot, they're paying for someone who knows which of its suggestions to keep, which to rewrite, and which to throw out entirely. AI speeds up the parts of the job that were never the hard part.
