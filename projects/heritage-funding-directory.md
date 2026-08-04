---
title: Heritage Funding Directory
description: A full-stack WordPress build for the Heritage Alliance, featuring an AJAX-driven fund index with multiple filters and a self-service submission workflow for funders.
---

# Heritage Funding Directory

<div class="project-meta">
  <span class="project-role-tag">Full Build</span>
  <span class="project-role-tag">Third-party Integration</span>
</div>
<div class="project-meta">
  <span class="project-tag">WordPress</span>
  <span class="project-tag">PHP</span>
  <span class="project-tag">JavaScript</span>
  <span class="project-tag">Web App</span>
</div>

<div class="project-links">
  <a class="project-link-btn" href="https://www.heritagefundingdirectoryuk.org/" target="_blank" rel="noopener">
    Heritage Funding Directory UK
    <span class="project-link-btn-arrow" aria-hidden="true">↗</span>
    <span class="visually-hidden">(opens in new tab)</span>
  </a>
</div>

> A fund discovery platform for the UK heritage sector, built end-to-end. Funders can submit and manage their own listings, and applicants can search and filter the full directory to find what's relevant to them.

---

## Challenge

The Heritage Alliance needed a central place where heritage organisations could find funding relevant to them. The landscape of grants, trusts, and public bodies is wide, and applicants have very specific needs: they might only be eligible for certain geographic areas, have a particular type of project, or need a grant above a certain size.

At the same time, the directory needed to be sustainable long-term. Rather than relying on the Alliance team to manually add and maintain every listing, funders needed to be able to submit their own funds and keep them up to date, without any technical knowledge required.

I built the entire site, from the data architecture and filtering logic through to the frontend and the submission workflow.

![The Heritage Funding Directory listing page, showing the filter sidebar and fund listing cards](/screenshots/heritage-results-page.png)

---

## Solution

### The fund index

The directory is built around a custom post type with a structured set of fields: open and close dates, minimum and maximum grant sizes, application type, and a set of taxonomies covering heritage areas, audience eligibility, geographical reach, and funding type.

The filtering system lets applicants narrow results across all of those dimensions at once. Filters include free-text search, dropdowns, checkboxes, a grant amount range, and date-based status filters for funds that are currently open, opening soon, or closed. Results update without a page reload, and the active filters are reflected in the URL so searches can be shared or bookmarked.

![The directory with active filters applied, showing selected criteria and matching fund results](/screenshots/heritage-filtered-results.png)

### Fund submission and moderation

Rather than a static dataset maintained by one team, funders can submit their own listings through a public form. On submission, a new fund listing is automatically created as a post in a pending state, ready for the Alliance team to review and publish. The form fields map directly to the post type's custom fields and taxonomy terms, so no manual data entry is needed on the admin side.

The admin interface shows a live count of pending submissions in the menu, so nothing sits unreviewed.

![The public-facing fund submission form, showing the fields funders complete to add their listing to the directory](/screenshots/heritage-listing-form.png)

---

## Technical

**Stack:** WordPress (Bedrock), PHP 8.2, Timber/Twig, Tailwind CSS, Webpack, Gravity Forms, ACF Pro

**Theme architecture:** Built on Icepack, a Laravel-inspired framework for WordPress developed at Pixelfridge. Service providers register post types, taxonomies, ACF field groups, and hooks. A transformer layer maps raw post data to clean view objects, keeping templates free of business logic.

**Filtering:** Client-side JavaScript constructs a query string from the active filter state and fetches a fresh page render, swapping only the results container in the DOM. The server-side query is built with raw SQL via `$wpdb` using parameterised queries, with dynamic joins per active taxonomy and a custom date/status logic block that correctly handles open, closing-soon, and closed states. Grant size filtering uses range-overlap logic so a fund offering £5k-£50k still appears when searching for funds up to £20k.

**Fund submission:** Gravity Forms with the Advanced Post Creation add-on handles the submission-to-post workflow. Taxonomy checkboxes are dynamically populated from WordPress terms at render time. A `save_post` hook normalises date formats from form input before they are stored, ensuring query date comparisons stay reliable.

**Templating:** Twig via Timber, with a component library covering cards, filters, pagination, icons, and layout wrappers. Each page type has a corresponding transformer that prepares its data before it reaches the template.

---

<div class="project-back"><a href="/projects/">← Back to all projects</a></div>
