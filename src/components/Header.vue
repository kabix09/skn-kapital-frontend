<template>
  <header class="h-16 shrink-0 px-6 flex items-center justify-between shadow bg-white">
    <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>

    <span class="material-icons cursor-pointer" @click="logout">
      power_settings_new
    </span>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const pageTitle = computed(() => route.meta.title || 'Panel')

function logout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<style lang="scss">
header {
  background-color: var(--light);
  color: var(--dark);
}
</style>