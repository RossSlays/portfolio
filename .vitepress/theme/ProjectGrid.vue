<script setup>
defineProps({
  projects: Array
})
</script>

<template>
  <div class="project-grid-container">
    <div class="project-grid">
      <a
        v-for="project in projects"
        :key="project.link"
        :href="project.link"
        class="project-card"
      >
        <h2 class="project-card-title">{{ project.title }} <span class="project-card-arrow">→</span></h2>
        <p class="project-card-details">{{ project.details }}</p>
        <div class="project-card-tags">
          <span v-for="tag in project.tags" :key="tag" class="project-role-tag">{{ tag }}</span>
        </div>
      </a>
    </div>
  </div>
</template>
