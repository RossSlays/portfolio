---
title: Bank Workers Charity
description: A donation widget and JavaScript-driven flow built on WordPress, connecting a customisable preset-amount selector to a Gravity Forms and Stripe-powered donation form.
---

# Bank Workers Charity

<div class="project-meta">
  <span class="project-role-tag">Front-End Development</span>
  <span class="project-role-tag">Third-party Integration</span>
</div>
<div class="project-meta">
  <span class="project-tag">WordPress</span>
  <span class="project-tag">Gravity Forms</span>
  <span class="project-tag">Stripe</span>
  <span class="project-tag">Tailwind CSS</span>
  <span class="project-tag">JavaScript</span>
  <span class="project-tag">Timber/Twig</span>
</div>

<div class="project-links">
  <a class="project-link-btn" href="https://www.bwcharity.org.uk/get-involved/donate-today/" target="_blank" rel="noopener">
    Bank Workers Charity - Donate
    <span class="project-link-btn-arrow" aria-hidden="true">↗</span>
    <span class="visually-hidden">(opens in new tab)</span>
  </a>
</div>

> A flexible donation widget that lets editors drop preset giving amounts anywhere on the site as a CTA, with JavaScript handling the handoff from the widget through to a Gravity Forms and Stripe-powered donation form.

---

## Challenge

Bank Workers Charity needed a way to surface donation prompts throughout the site without locking the functionality into a single page or template. Editors needed control over the amounts shown, the messaging, and the visual treatment, while the underlying payment flow had to be reliable and consistent. The gap between a lightweight CTA widget and a fully featured payment form needed bridging without duplicating logic or leaking payment concerns into the content layer.

---

## Solution

### The donation widget

The widget is a flexible content row that editors can place on any page via the CMS. It presents up to four preset donation amounts as selectable buttons, split between one-off and monthly giving modes, with an "Other" option that reveals a free-text field for custom amounts. Each preset amount can have its own associated image and supporting text, which swap in dynamically as the user makes a selection.

The layout is a two-column design: the left column carries the selector form on a light background, and the right column shows the contextual image for the selected amount on a brand-coloured background. The right column is hidden on mobile, keeping the giving experience clean and focused on smaller screens.

Editors configure the widget entirely through ACF: the heading, body text, preset amounts for both giving modes, associated images, the destination form page URL, and the background colour treatment. All of that feeds into a Timber transformer that normalises the data before it reaches the Twig template.

![The donation widget showing preset amount buttons, one-off and monthly tabs, and the contextual image panel on the right](/screenshots/bwc-widget.webp)

### JavaScript and form handoff

The widget's interactivity is handled by `DonationSelector.js`, a self-contained component loaded lazily only when the selector is present on the page.

When a user selects an amount and clicks the donate button, the script intercepts the form submission, reads the current state (amount and giving type), and builds a URL query string: `?donation_type=monthly&donation_amount=50`. The user is then redirected to the configured donation form page with those parameters appended.

On the form page, the same script reads those parameters from the URL and prefills the corresponding Gravity Forms fields: the price field receives the selected amount, and a frequency radio button is set to match the giving type. Both fields are updated by dispatching native `input` and `change` events, which keeps Gravity Forms' own validation logic intact without patching into its internals. The URL state is also written to browser history via `replaceState`, so the selection is preserved if the user navigates back.

Image swapping within the widget uses `data-amount` attributes on all candidate images. On every selection change, the script fades out non-matching images and fades in the matching one over a 700ms CSS transition, falling back to a default image when a custom amount is entered or no match exists.

![The Gravity Forms donation form with the amount and giving frequency fields prefilled from the widget selection](/screenshots/bwc-donation-form.webp)

### Gravity Forms and Stripe

The donation form is built in Gravity Forms with a price field and a frequency field wired up to the Stripe payment integration. Once the JavaScript prefills both fields from the URL parameters, the user completes the rest of the form (name, email, payment details) and submits. Gravity Forms handles validation and passes the transaction to Stripe, with the amount and frequency already set from the widget selection.

This approach keeps the payment logic entirely within Gravity Forms and Stripe, with the custom widget acting purely as a UX layer that pre-configures the form state before the user arrives.

---

## Technical

**Stack:** WordPress (Bedrock), Icepack (Pixelfridge's Laravel-style PHP framework), Timber/Twig, Tailwind CSS 3, Webpack 5, ACF, Gravity Forms, Stripe

**Widget architecture:** The row is registered as a flexible content layout in ACF. A `DonationWidget` transformer class normalises the field data (amounts, images, form URL, colour options) into a clean array that the Twig template consumes. This keeps template logic minimal and the data contract explicit.

**Component loading:** `DonationSelector.js` is code-split via Webpack into its own chunk using `webpackChunkName`. The main script checks for `.js-donation-selector` elements on the page and only fetches the chunk if one is found, keeping the initial payload small on pages that don't include the widget.

**Gravity Forms field targeting:** The script targets fields by their generated CSS classes (`.gfield--input-type-price` for the amount, `.js-frequency` for the giving type radio buttons) and dispatches synthetic events to trigger Gravity Forms' native validation handlers rather than bypassing them.

**URL parameter flow:** The widget serialises state as query params on submission; the form page reads them on load. `window.history.replaceState` keeps the URL current as selections change, which also means analytics tools capture the user's final intent accurately.

**Accessibility:** Form controls in the widget use `<fieldset>` and `<legend>` grouping. The hidden field that carries the destination form URL is visually hidden with a screen-reader-only class rather than `display: none`, keeping it accessible to assistive technology without cluttering the visual layout.

---

<div class="project-back"><a href="/projects/">← Back to all projects</a></div>
