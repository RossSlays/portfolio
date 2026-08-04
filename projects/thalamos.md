---
title: Thalamos - Pricing Calculator
description: An interactive pricing calculator for NHS and public health departments, generating branded PDF quotes with real-time cost breakdowns and automatic Zoho CRM lead capture.
---

# Thalamos - Pricing Calculator

<div class="project-meta">
  <span class="project-role-tag">Front-End Development</span>
  <span class="project-role-tag">Third-party Integration</span>
</div>
<div class="project-meta">
  <span class="project-tag">React</span>
  <span class="project-tag">pdfMake</span>
  <span class="project-tag">Zoho CRM</span>
  <span class="project-tag">WordPress</span>
  <span class="project-tag">Tailwind CSS</span>
</div>

<div class="project-links">
  <a class="project-link-btn" href="https://www.thalamos.co.uk/pricing/" target="_blank" rel="noopener">
    Thalamos Pricing
    <span class="project-link-btn-arrow" aria-hidden="true">↗</span>
    <span class="visually-hidden">(opens in new tab)</span>
  </a>
</div>

> A pricing calculator for NHS and public health departments that computes real-time quotes, generates a fully branded PDF, and feeds the lead directly into Zoho CRM. All from a single form submission.

---

## Challenge

Thalamos sells mental health care technology to NHS Trusts, Police forces, and Integrated Care Systems. Procurement in these organisations involves variable pricing across multiple modules, with costs that shift based on population size and which products are selected. Sales teams were spending significant time building quotes manually, and prospective customers had no way to self-serve an accurate cost estimate before a sales call.

The goal was to let users configure their own quote online, understand the ROI case at a glance, and receive a professional branded document, while the sales team received the lead automatically without any manual handoff.

---

## Solution

### Calculator interface

The calculator is built as a React component embedded in the WordPress theme. Users first select their organisation type and name from a searchable dropdown, which populates population figures automatically from a CSV pricing data source parsed client-side with PapaParse. They then select which Thalamos products they want to include.

The interface adapts between mobile and desktop: on desktop the product selection and live price breakdown sit side by side, with the breakdown updating as checkboxes are toggled. On mobile, the breakdown is surfaced in a drawer overlay so the product list remains accessible.

![The Thalamos pricing calculator showing the organisation dropdown, product selection checkboxes, and live price breakdown panel](/screenshots/thalamos-calculator.png)

### Price breakdown and ROI

The breakdown panel renders an accordion with one entry per selected product, showing the individual annual cost alongside estimated annual savings. Savings are presented as a range to account for variation across different deployments. A summary at the bottom shows the total annual cost and a calculated ROI figure, giving procurement teams a quantified business case to take into an approval process.

![The price breakdown panel showing accordion rows with per-product costs and savings ranges, and an ROI summary at the bottom](/screenshots/thalamos-roi-accordions.png)

### Branded PDF generation

On submission, a fully branded PDF quote is generated client-side using pdfMake. The design was produced by the Pixelfridge design team and then pixel-perfectly translated into code: brand colours, typography, logo placement, header layout, and footer messaging are all reproduced precisely from the supplied designs.

The PDF spans multiple pages with distinct sections for each selected product. Content varies by organisation type: Police, NHS Trust, and ICS each receive tailored copy and next-steps messaging appropriate to their procurement context. The file is downloaded automatically as `thalamos-quote-YYYY-MM-DD.pdf` immediately after the lead is confirmed.

![A page from the generated branded PDF quote, showing the Thalamos header, product cost breakdown, and footer messaging](/screenshots/thalamos-pdf.png)

### Zoho CRM integration

Lead capture is handled by a custom WordPress plugin that exposes a REST endpoint at `/wp-json/zoho/v1/create-lead`. When the user submits their name and email, the React app posts to this endpoint, which authenticates with the Zoho EU API using an OAuth 2.0 refresh token flow, automatically refreshing the access token when it expires. The lead is created in Zoho with the source set to "Pricing Calculator", and the organisation name is mapped across alongside the contact details.

The PDF generation is gated on a successful CRM response, so a lead is always captured before the document is produced. If the request fails, the user sees an error and no PDF is generated.

---

## Technical

**Stack:** WordPress (Bedrock), React 18, Tailwind CSS, pdfMake 0.2.18, PapaParse 5, react-select 5, Webpack 5

**Pricing data:** Product costs and population figures are stored in a CSV file loaded client-side via a custom `useFetch` hook and parsed with PapaParse. This keeps pricing updates to a file change rather than a code deployment.

**PDF generation:** pdfMake generates the document entirely in the browser from a declarative document definition object. The brand logo and background images are embedded as Base64 SVG data. Page breaks are inserted dynamically based on which products are selected and which organisation type is active, keeping each section correctly positioned across pages.

**CRM integration:** A custom WordPress plugin handles all Zoho API communication, keeping credentials server-side. The plugin stores OAuth tokens in WordPress options and performs a token refresh automatically before each API call if the stored access token has expired. The REST endpoint validates the request, constructs the Zoho lead payload, and returns a 200 or error response that the React app acts on.

**Layout:** The calculator uses a responsive split layout. On desktop, the product list and breakdown panel share the viewport. On mobile, the breakdown is rendered in a drawer component controlled by a toggle button, with an overlay backdrop handling dismissal.

---

<div class="project-back"><a href="/projects/">← Back to all projects</a></div>
