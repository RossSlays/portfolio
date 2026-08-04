---
title: Angostura Rums
description: A brand-led WordPress theme for a global rum brand, featuring a new cocktails section with index, single pages, and rum-linked carousels, alongside polished GSAP animation throughout.
---

# Angostura Rums

<div class="project-meta">
  <span class="project-role-tag">Full Build</span>
  <span class="project-role-tag">Front-End Development</span>
</div>
<div class="project-meta">
  <span class="project-tag">WordPress</span>
  <span class="project-tag">GSAP</span>
  <span class="project-tag">Swiper</span>
  <span class="project-tag">Tailwind CSS</span>
  <span class="project-tag">JavaScript</span>
</div>

<div class="project-links">
  <a class="project-link-btn" href="https://rums.angostura.com/" target="_blank" rel="noopener">
    Angostura Rums
    <span class="project-link-btn-arrow" aria-hidden="true">↗</span>
    <span class="visually-hidden">(opens in new tab)</span>
  </a>
</div>

> A brand-led site for a global rum brand, where the frontend needed to feel as premium as the product. Animation and interaction were central to the brief, not an afterthought.

---

## Challenge

Angostura is a globally recognised spirits brand with a strong visual identity. The challenge was to build a site that matched the richness of that brand, with animated section reveals, a polished cocktail browsing experience, and smooth, consistent interactions throughout. The site needed to feel crafted, not templated.

![Full-page view of the Angostura Rums homepage showing the brand aesthetic, hero imagery, and dark gold colour palette](/screenshots/angostura-homepage.webp)

---

## Solution

### Cocktails section

The cocktails section was introduced as an entirely new part of the site. A custom WordPress post type stores each cocktail with its recipe, ingredients, and imagery. A key editorial feature is the rum assignment field: each cocktail can be linked to a specific rum in the product range, creating a content relationship that drives how cocktails surface across the site.

The cocktail index presents the full range as a browsable grid, using the same scroll-triggered batch animations as the rest of the site for consistent reveals. Individual cocktail pages present the full recipe and method, with the assigned rum surfaced as a contextual link back into the product range.

![The cocktails index page showing a browsable grid of cocktail cards with imagery and names](/screenshots/angostura-cocktail-index.webp)

![A single cocktail page showing the recipe, ingredients, and the linked rum surfaced as a contextual reference](/screenshots/angostura-single-cocktail.webp)

### Rum page integration

The rum assignment relationship drives how cocktails surface on each rum's single page. Cocktails linked to a given rum are pulled into two distinct presentations: a full-width carousel for featured browsing, and a card grid for a complete overview. This gives the content team flexibility to surface relevant recipes without duplicating data.

The carousel is built with Swiper using the web component API, with GSAP handling the content animations. The active slide expands to show the cocktail image prominently, with surrounding slides visible at a reduced scale as a preview. Content for the selected cocktail (name, description, link to the full recipe) animates in alongside the slide transition. On navigation, a GSAP timeline fades and translates the outgoing text elements before the incoming content fades up into place. Slide width, image size, and text visibility are all driven by CSS custom properties and transition smoothly using `ease-in-out` on a 0.6s curve.

![Animated demo of the rum page cocktail carousel, showing the active slide expanding with cocktail name and description animating in on navigation](/screenshots/rums-carousel.gif)

### Scroll-triggered animations

Section reveals across the site are handled by GSAP ScrollTrigger. The cocktail grid uses `ScrollTrigger.batch()` to animate items in as they enter the viewport, staggering opacity and Y-offset across both the image and the heading independently. The expanding background section uses a GSAP-driven SVG mask that grows as the user scrolls into the section, scaling the background image in parallel.

All scroll animations respect `prefers-reduced-motion`, falling back to a static display where the OS accessibility setting is enabled.

### Component and build architecture

The theme uses a modular component library of 28 Twig templates covering everything from buttons and images through to the carousel, grid, and hero sections. JavaScript components are loaded as dynamic imports from the main entry point, so only the code required for the current page is fetched. Webpack produces content-hashed chunks, and an SVG sprite bundles all icons into a single HTTP request.

---

## Technical

**Stack:** WordPress (Bedrock), PHP 8, Timber/Twig, Tailwind CSS 3, GSAP with ScrollTrigger, Swiper 11, Webpack 5

**Cocktails post type:** Cocktails are registered as a custom WordPress post type with a rum relationship field. On a rum's single page, a query fetches all cocktails assigned to that rum, and the result set is passed into both the carousel and card grid templates from a single data source.

**Carousel:** Swiper web component API (`swiper-container`, `swiper-slide`) with cocktail data stored in `data-*` attributes per slide. A custom JS class manages GSAP timelines for navigation: outgoing content fades and translates up, incoming content fades and translates in with a stagger across title, body, and link elements. Active slide sizing is handled entirely in CSS using custom properties (`--active-image-size: 390px`, `--normal-image-size: 260px`) with a 0.6s ease transition.

**Scroll animations:** GSAP ScrollTrigger drives all section reveals. Batch animation groups related items so the trigger fires once per viewport entry rather than per element. The expanding background uses `maskSize` animation on an SVG clip path, scaling from `auto` to `calc(100% + 30px)` on scroll.

**CSS architecture:** Tailwind utility classes for layout and spacing, with a custom configuration defining the brand token set (cream, gold, yellow), a named 12-column grid with `[full-start]` and `[container-start]` column lines for full-bleed layouts, and custom `@keyframes` for button gradients, heading animations, and slide transitions. Typography is defined as a set of named text utility classes (`.text-heading-1` through `.text-body-sm`) applied consistently across templates.

**Build:** Webpack 5 with dynamic imports creating per-component chunks, content-hashed filenames, MiniCssExtractPlugin for stylesheet splitting, and a manifest file for reliable asset path resolution at runtime.

---

<div class="project-back"><a href="/projects/">← Back to all projects</a></div>
