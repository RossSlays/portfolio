---
title: Wilde Lodge - Real-Time Availability Calendar
description: Custom WordPress integration with Clock PMS+ for a wedding venue and holiday let, solving a slow and rate-limited API with background caching and async processing.
---

# Wilde Lodge - Availability Calendar

<div class="project-meta">
  <span class="project-role-tag">Full Build</span>
  <span class="project-role-tag">Third-party Integration</span>
</div>
<div class="project-meta">
  <span class="project-tag">WordPress</span>
  <span class="project-tag">PHP</span>
  <span class="project-tag">API Integration</span>
  <span class="project-tag">Hospitality</span>
</div>

> Live availability and instant pricing for a wedding venue and holiday let, built around a third-party API that was never designed for the web.

---

## Challenge

Wilde Lodge needed real-time room availability on their website, fed from Clock PMS+, the property management system handling all bookings. The problem was that the Clock API is slow, rate-limited, and returns complex multi-rate data that needs significant processing before it's useful to a visitor.

The site runs on shared hosting with tight execution time limits, which ruled out fetching live from the API on every page load. The calendar needed to feel instant, while still reflecting accurate availability.

![The availability calendar showing a full month view with available, unavailable, and checkout-only dates colour coded](/screenshots/wilde-lodge-full-calendar.webp)

---

## Solution

The key insight was separating two different needs: **availability** (which changes slowly) and **pricing** (which must be live).

Availability is fetched from the API every night in the background, processed, and cached locally so the calendar loads in milliseconds rather than waiting on a slow API call. Booking quotes are fetched live only when a visitor selects a date range, because exact pricing for a specific stay can't be pre-computed.

The nightly background job had its own constraint: the API is slow enough that fetching 18 months of availability would exceed the server's 60-second execution limit. The solution was a chunked processing approach where the job runs in small batches across multiple scheduled tasks, picking up where it left off each time, until the full dataset is built and saved atomically.

![A date range selected on the calendar with a live price quote, Book Now and Enquire buttons shown below](/screenshots/wilde-lodge-date-range-selected.webp)

The calendar handles a few edge cases that matter for a hospitality site. Dates available for checkout but not check-in are correctly distinguished, so visitors can only select valid arrival dates. Selecting a range triggers a live price check, and the confirmed price is handed directly into Clock's booking engine so there's no discrepancy at checkout.

An admin panel provides visibility into cache health, prefetch progress, and a log of recent API calls so any issues can be diagnosed without server access.

![The WordPress admin panel showing cache status, last sync time, and prefetch health indicators for each room](/screenshots/wilde-lodge-admin-panel.webp)

---

## Technical

**Stack:** WordPress (Bedrock), PHP 8, vanilla JS, Flatpickr, Tailwind CSS, Timber/Twig

**Plugin architecture:** Built as a must-use WordPress plugin with a clean service layer. `ClockClient` handles authenticated HTTP transport, `PrefetchService` manages background caching, `AvailabilityService` transforms cached data into per-day calendar views, and `QuoteService` handles live pricing requests. A REST controller exposes endpoints for the frontend, keeping the integration fully decoupled from the theme.

**Caching:** Availability data is written to PHP files using `var_export()` and loaded with `include`, with no database queries or deserialisation overhead. Each file covers 18 months of data for one room, compacted to only the fields the frontend needs.

**Background processing:** A WP-Cron state machine runs the prefetch in small batches, writing progress to a temp file between runs to stay within shared hosting's 60-second execution limit. A separate save step merges and atomically writes the final cache once all batches complete.

**Frontend:** A class-based JS calendar widget wraps Flatpickr with client-side caching for month availability and quote results, arrival-date validation, and URL state sync for shareable date selections.

---

<div class="project-back"><a href="/projects/">← Back to all projects</a></div>
