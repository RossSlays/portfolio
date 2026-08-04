import { defineConfig } from 'vitepress'

const SITE_URL = 'https://rosshayes.dev'
const OG_IMAGE = `${SITE_URL}/photo.webp`

export default defineConfig({
  title: 'Ross Hayes',
  description: 'Selected projects by Ross Hayes, a web developer committed to accessible, well-crafted work.',
  cleanUrls: true,
  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'preload', as: 'image', href: '/photo.webp' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: OG_IMAGE }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: OG_IMAGE }],
  ],

  transformPageData(pageData) {
    const title = pageData.frontmatter.title
      ? `${pageData.frontmatter.title} | Ross Hayes`
      : 'Ross Hayes'
    const description = pageData.frontmatter.description
      || 'Selected projects by Ross Hayes, a web developer committed to accessible, well-crafted work.'
    const path = pageData.relativePath.replace(/\.md$/, '').replace(/\/index$/, '')
    const url = `${SITE_URL}/${path}`

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    )
  },

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Accessibility', link: '/accessibility' },
      { text: 'AI', link: '/ai' },
    ],

    sidebar: {
      '/projects/': [
        {
          text: 'Projects',
          items: [
            { text: 'Heritage Funding Directory', link: '/projects/heritage-funding-directory' },
            { text: 'Thalamos - Pricing Calculator', link: '/projects/thalamos' },
            { text: 'Wilde Lodge - Calendar System', link: '/projects/wilde-lodge' },
            { text: 'Angostura Rums', link: '/projects/angostura-rums' },
            { text: 'Clink', link: '/projects/clink' },
            { text: 'Bank Workers Charity', link: '/projects/bank-workers-charity' },
          ],
        },
      ],
    },


    footer: {
      message: 'Selected work by Ross Hayes. · <a href="mailto:contact@rosshayes.dev">contact@rosshayes.dev</a> · <a href="https://www.linkedin.com/in/ross-hayes-a3589988/" target="_blank" rel="noopener noreferrer">LinkedIn</a>',
      copyright: 'Built with <a href="https://vitepress.dev" target="_blank" rel="noopener noreferrer">VitePress</a> · Deployed on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a> · WCAG 2.2 AA compliant',
    },
  },
})
