import DefaultTheme from 'vitepress/theme'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import { inject } from '@vercel/analytics'
import ProjectGrid from './ProjectGrid.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ProjectGrid', ProjectGrid)
  },
  setup() {
    const route = useRoute()

    const initObserver = () => {
      if (typeof window === 'undefined') return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.15 }
      )

      document.querySelectorAll('.timeline-item, .tech-tag, .VPFeature, .project-card').forEach((el) => {
        observer.observe(el)
      })
    }

    onMounted(() => {
      initObserver()
      inject()
    })
    watch(() => route.path, () => setTimeout(initObserver, 100))
  },
}
