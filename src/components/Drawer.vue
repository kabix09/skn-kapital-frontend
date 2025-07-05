<template>
  <!-- Overlay -->
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40"
      @click="$emit('update:isOpen', false)"
    ></div>
  </transition>

  <!-- Drawer -->
  <transition name="slide">
    <div
      v-if="isOpen"
      class="fixed top-0 right-0 h-full z-50"
      :class="drawerWidthClass"
      style="background-color: var(--light);"
    >
      <div class="p-4 flex justify-between items-center shadow bg-white"
            style="background-color: var(--light)"
      >
        <h2 class="text-xl font-semibold"
            style="color: var(--dark);"
        >
            {{ title }}
        </h2>
        <button
          @click="$emit('update:isOpen', false)"
          class="text-gray-600 text-xl font-bold"
        >
            <span class="material-icons">close</span>
        </button>
      </div>
      <div class="p-4 h-full overflow-y-auto">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
  title?: string
  width?: string // e.g. 'w-96', 'w-[600px]', default: 'w-96'
}>()

defineEmits(['update:isOpen'])

const drawerWidthClass = computed(() => props.width ?? 'w-96')
</script>

<style scoped>
button {
    background: none;
    color: var(--dark);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
