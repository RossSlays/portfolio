---
title: Clink
description: A real-time multiplayer gin tasting app for hosting structured tasting nights at home, with live scoring, games, a TV display mode, and Sonos integration.
---

# Clink

<div class="project-meta">
  <span class="project-role-tag">Full Build</span>
</div>
<div class="project-meta">
  <span class="project-tag">Node.js</span>
  <span class="project-tag">Express</span>
  <span class="project-tag">SQLite</span>
  <span class="project-tag">Server-Sent Events</span>
  <span class="project-tag">Vanilla JS</span>
</div>

> A personal side project built to make gin tasting nights at home actually fun. Guests join on their phones, score each gin, play games between rounds, and a results screen settles the debate at the end.

---

## The Idea

Gin tasting nights with friends are great until someone loses track of which gin was which, everyone's scores are scribbled on different bits of paper, and the results take twenty minutes to tally. Clink solves all of that. Guests join via QR code, score each gin as it's served, play optional games between rounds, and the app handles everything else in real time.

It runs entirely on a local network, no internet required, which keeps it fast and means it works wherever the night is happening.

![The guest tasting view showing a user's score and a QR code to join the session](/screenshots/clink-user-score-and-qr-code.webp)

---

## Features

### Guest join and tasting flow

Guests scan a QR code to join on their own device. Each guest gets a persistent session so they can close the browser and rejoin without losing their progress. The host controls the pace from an admin panel: serving each gin triggers it on all guest screens simultaneously. An optional blind mode hides the gin's name, origin, and description until a guest submits their review, keeping scores honest.

![The host admin panel showing all courses with live scores, guest count, and controls for serving each gin and starting games](/screenshots/clink-admin-panel.webp)

### Scoring and results

Guests rate each gin from 0 to 10 and can add tasting notes and an optional price guess. Scores are aggregated in real time. Once all gins have been served, a results screen shows the full rankings with gold, silver, and bronze medals, a scoreboard grid with every guest's individual scores, and a tasting profile card for each guest based on their average across the night.

![The results screen showing gin rankings with gold, silver, and bronze medals alongside the full guest scoreboard grid](/screenshots/clink-results-and-score-board.webp)

### Games

Two games run between courses to keep things lively.

The **botanical quiz** presents four options and asks guests to spot the fake: three are real botanicals from the gin, one is a distractor drawn from the other gins in the lineup or from a fallback list of common botanicals. Everyone votes simultaneously, and the host reveals the answer with a live breakdown of how the room voted.

The **ABV guessing game** asks guests to estimate the gin's alcohol percentage. Once the host reveals, guests are ranked by how close they were.

Both games run on a first-come-first-served voting model with real-time vote counts broadcasting to all clients as responses come in.

![The botanical quiz reveal phase showing the correct answer and how each guest voted](/screenshots/clink-quiz-display.webp)

### TV display mode

A separate display page is designed to be thrown up on a TV or projector. It shows the current gin being served, how many guests have reviewed it, aggregate scores so far, and all courses with their status. It updates live via the same SSE stream as the guest and admin views. The display also pulls now-playing track info from a Sonos speaker on the network if one is configured.

![The TV display view showing the current gin being served, live review progress, and all courses with their status](/screenshots/clink-quiz-display.webp)

### Branding and customisation

The admin panel includes a branding section where the event title, accent colour, background colours, and footer text can all be configured. Changes broadcast instantly to all connected pages via SSE so the whole experience updates live without a reload.

---

## Technical

**Stack:** Node.js, Express, SQLite (better-sqlite3), Server-Sent Events, Vanilla HTML/CSS/JS, qrcode

**Real-time sync:** All state changes broadcast through a central SSE stream. A single `broadcast()` function iterates over connected clients and pushes JSON events. Guests, the admin panel, and the display page all subscribe to the same stream and update their UI reactively. No WebSockets, no polling, no external pub/sub library.

**Database:** SQLite via better-sqlite3 for synchronous queries. Courses, guests, reviews, reactions, quiz votes, and ABV guesses each have their own table. A key/value `app_state` table stores global state like current course, blind mode toggle, quiz state, and branding settings as JSON.

**Quiz distractor logic:** The botanical quiz prefers to source its fake option from other gins in the lineup to keep the difficulty consistent with the event's actual selection. It falls back to a hardcoded list of 25 common gin botanicals only if the lineup doesn't have enough alternatives.

**Blind mode:** Implemented at query level. When blind mode is active and a guest hasn't yet reviewed the current course, the server returns nulls for the gin name, origin, award, and description fields. The data is never sent to the client until the review is submitted.

**Sonos integration:** Auto-discovers speakers on the local network via UPnP, then fetches now-playing track info through the Sonos SOAP API. Falls back to a manual IP entry if discovery doesn't find anything.

**Session management:** Each guest gets a 16-byte hex session ID stored in the browser and the database. Rejoin works by matching the stored session ID, so no login or account is required.

---

<div class="project-back"><a href="/projects/">← Back to all projects</a></div>
