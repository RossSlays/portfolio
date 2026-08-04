---
title: Projects
---

# Projects

A decade of building things that work, with care for accessibility, performance, and the people using them. Here's a selection of the more interesting ones, each written up with context on the challenge, the approach, and the technical decisions behind it.

<ProjectGrid :projects="[
  { title: 'Heritage Funding Directory', details: 'A filterable database connecting UK heritage projects with funding opportunities, built on a custom WordPress MVC architecture.', link: '/projects/heritage-funding-directory', tags: ['Full Build', 'Third-party Integration'] },
  { title: 'Thalamos - Pricing Calculator', details: 'Interactive React calculator for NHS departments, generating branded PDF quotes and syncing data to Zoho CRM.', link: '/projects/thalamos', tags: ['Front-End Development', 'Third-party Integration'] },
  { title: 'Wilde Lodge - Calendar System', details: 'Real-time availability calendar with custom middleware to handle Clock PMS+ API rate limits via async queuing and caching.', link: '/projects/wilde-lodge', tags: ['Full Build', 'Third-party Integration'] },
  { title: 'Angostura Rums', details: 'Brand-led WordPress theme with GSAP scroll animations, a custom cocktail carousel, and a modular component architecture.', link: '/projects/angostura-rums', tags: ['Full Build', 'Front-End Development'] },
  { title: 'Clink', details: 'A real-time multiplayer gin tasting app with live scoring, botanical quizzes, an ABV guessing game, and a TV display mode. Built for fun, runs on a local network.', link: '/projects/clink', tags: ['Full Build'] },
  { title: 'Bank Workers Charity', details: 'A donation widget and JavaScript-driven flow connecting a preset-amount CTA to a Gravity Forms and Stripe-powered donation form, with full editor control over amounts, imagery, and copy.', link: '/projects/bank-workers-charity', tags: ['Front-End Development', 'Third-party Integration'] }
]" />
