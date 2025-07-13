<template>
  <div class="event-management-page flex flex-col h-full overflow-hidden">
    <div class="flex text-gray-800 h-full">
      <!-- LISTA -->
      <EventList
        @add="addEvent"
      />

      <!-- SZCZEGÓŁY WYDARZENIA -->
      <EventDetails/>
    </div>

    <!-- Drawer -->
    <Drawer v-model:isOpen="isOpen" title="Dodaj wydarzenie" width="w-1/3">
      <!-- Slot content -->
      <AddEventForm/>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EventList from '../components/EventPage/EventList.vue'
import EventDetails from '../components/EventPage/EventDetails.vue'
import Drawer from '../components/Drawer.vue'

const isOpen = ref(false)

function addEvent() {
    isOpen.value = true
}
</script>

<style>
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