<template>
  <header class="h-16 px-6 flex items-center shadow bg-white">
    <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const pageTitle = computed(() => route.meta.title || 'Panel')
</script>

<style lang="scss">
header {
  background-color: var(--light);
  color: var(--dark);
}
</style>