---
layout: home

hero:
  name: "Ross Hayes"
  text: "Developing, Leading and Explaining"
  tagline: I've been building for the web since 2015 — now leading a digital department into emerging technology. I combine bespoke code, an obsession with accessibility, and a talent for turning technical complexity into plain English to build digital experiences that feel personal and function flawlessly.
  image:
    src: /photo.webp
    alt: Ross Hayes
  actions:
    - theme: brand
      text: View Projects
      link: /projects/
    - theme: alt
      text: Get in Touch
      link: mailto:contact@rosshayes.dev

---

<ProjectGrid :projects="[
  { title: 'Heritage Funding Directory', details: 'A filterable database connecting UK heritage projects with funding opportunities, built on a custom WordPress MVC architecture.', link: '/projects/heritage-funding-directory', tags: ['Full Build', 'Third-party Integration'] },
  { title: 'Thalamos - Pricing Calculator', details: 'Interactive React calculator for NHS departments, generating branded PDF quotes and syncing data to Zoho CRM.', link: '/projects/thalamos', tags: ['Front-End Development', 'Third-party Integration'] },
  { title: 'Wilde Lodge - Calendar System', details: 'Real-time availability calendar with custom middleware to handle Clock PMS+ API rate limits via async queuing and caching.', link: '/projects/wilde-lodge', tags: ['Full Build', 'Third-party Integration'] },
  { title: 'Angostura Rums', details: 'Brand-led WordPress theme with GSAP scroll animations, a custom cocktail carousel, and a modular component architecture.', link: '/projects/angostura-rums', tags: ['Full Build', 'Front-End Development'] },
  { title: 'Clink', details: 'A real-time multiplayer gin tasting app with live scoring, botanical quizzes, an ABV guessing game, and a TV display mode. Built for fun, runs on a local network.', link: '/projects/clink', tags: ['Full Build'] },
  { title: 'Bank Workers Charity', details: 'A donation widget and JavaScript-driven flow connecting a preset-amount CTA to a Gravity Forms and Stripe-powered donation form, with full editor control over amounts, imagery, and copy.', link: '/projects/bank-workers-charity', tags: ['Front-End Development', 'Third-party Integration'] }
]" />

<div class="tech-stack">
  <h2 class="tech-stack-heading">Technologies & Standards</h2>
  <div class="tech-stack-items">
    <span class="tech-tag">WordPress</span>
    <span class="tech-tag">PHP</span>
    <span class="tech-tag">React</span>
    <span class="tech-tag">JavaScript</span>
    <span class="tech-tag">Tailwind CSS</span>
    <span class="tech-tag">GSAP</span>
    <span class="tech-tag">MySQL</span>
    <span class="tech-tag">REST APIs</span>
    <span class="tech-tag">WCAG 2.2</span>
  </div>
</div>

<div class="timeline">
  <h2 class="tech-stack-heading">Career</h2>
  <p class="timeline-summary">A decade in agencies. Five roles. One consistent thread: building things that work for everyone, and making sure everyone understands them too.</p>
  <div class="timeline-items">
    <div class="timeline-item">
      <div class="timeline-year">2015</div>
      <div class="timeline-content">
        <div class="timeline-role">Athena Web Designs, Cirencester, Gloucestershire</div>
        <a class="timeline-link" href="https://www.athenawebdesigns.co.uk/" target="_blank" rel="noopener noreferrer">athenawebdesigns.co.uk</a>
        <p>Started my career building WordPress sites, learning the fundamentals of custom theme development, client work, and shipping real products to real users.</p>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-year">2017</div>
      <div class="timeline-content">
        <div class="timeline-role">Lightflows Agency, Guildford, Surrey</div>
        <a class="timeline-link" href="https://www.lightflows.co.uk/" target="_blank" rel="noopener noreferrer">lightflows.co.uk</a>
        <p>Joined an award-winning agency and led development on a large housing association account. Working on a platform used by thousands of residents brought accessibility into sharp focus and became a defining thread in how I approach every build.</p>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-year">2020</div>
      <div class="timeline-content">
        <div class="timeline-role">Rubber Duckiee, Southwark, London</div>
        <a class="timeline-link" href="https://rubberduckiee.com/" target="_blank" rel="noopener noreferrer">rubberduckiee.com</a>
        <p>Stepped up to lead developer at a digital agency within a wider comms group. Working with local governments, government departments, and housing associations deepened my commitment to WCAG compliance and inclusive design as a baseline, not an afterthought.</p>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-year">2024</div>
      <div class="timeline-content">
        <div class="timeline-role">Pixelfridge, Southwark, London</div>
        <a class="timeline-link" href="https://www.pixelfridge.com/" target="_blank" rel="noopener noreferrer">pixelfridge.com</a>
        <p>Building pixel-perfect sites for charities and purpose-driven organisations on a Laravel-based WordPress foundation. Work spans everything from full site builds and ongoing maintenance to custom API integrations covering payments, booking engines, and beyond.</p>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-year">2026</div>
      <div class="timeline-content">
        <div class="timeline-role">Crown Creative, Belfast</div>
        <a class="timeline-link" href="https://crowncreative.com/" target="_blank" rel="noopener noreferrer">crowncreative.com</a>
        <p>Joined as Senior Web Developer to lead the digital department, with a mandate to spearhead the studio's move into emerging technologies and deliver cutting-edge digital solutions for hospitality clients.</p>
      </div>
    </div>
  </div>
</div>

<div class="latest-article">
  <h2 class="tech-stack-heading">Latest Writing</h2>
  <a class="article-card" href="https://www.pixelfridge.com/latest/wcag-3-accessibility-guidelines/" target="_blank" rel="noopener noreferrer">
    <span class="article-label">Pixelfridge</span>
    <h3 class="article-title">WCAG 3.0: Understanding the latest accessibility guidelines</h3>
    <p class="article-excerpt">WCAG 3.0 marks a shift from rigid compliance checklists toward context-based, user-centred evaluation. Here's what the new Bronze, Silver and Gold conformance model means in practice, and how to start preparing now.</p>
    <span class="article-link">Read article &rarr;</span>
  </a>
</div>
