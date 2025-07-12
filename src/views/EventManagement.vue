<template>
  <div class="event-management-page flex flex-col h-full overflow-hidden">
    <div class="flex text-gray-800 h-full">
      <!-- LISTA -->
      <EventList
        :events="events"
        :selected-id="selectedId"
        @select="selectEvent"
        @add="addEvent"
      />

      <!-- SZCZEGÓŁY WYDARZENIA -->
      <EventDetails :event="selectedEvent"/>
    </div>

    <!-- Drawer -->
    <Drawer v-model:isOpen="isOpen" title="Dodaj wydarzenie" width="w-1/3">
      <!-- Slot content -->
      <AddEventForm/>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import EventList from '../components/EventPage/EventList.vue'
import EventDetails from '../components/EventPage/EventDetails.vue'
import Drawer from '../components/Drawer.vue'

const isOpen = ref(false)

const events = ref([
  {
    id: 1,
    name: 'Hackathon 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id.',
    date: '2025-08-15',
    location: 'Warszawa',
    attendees: ['Ania', 'Bartek'],
    waitlist: ['Daniel'],
    status: 'DONE',
    responsiblePerson: 'Kasia',
    notes: 'Przygotować catering.',
    limit: 40,
  },
  {
    id: 2,
    name: 'Webinar Vue 3',
    description: 'Szkolenie online z Vue 3.',
    date: '2025-09-10',
    location: 'Online',
    attendees: ['Emil', 'Filip'],
    waitlist: [],
    status: 'DONE',
    responsiblePerson: 'Marta',
    notes: 'Wysłać przypomnienia.',
    limit: 55,
  },
])

const selectedId = ref(null)

const selectedEvent = computed(() =>
  events.value.find(e => e.id === selectedId.value)
)

function selectEvent(id) {
  selectedId.value = id
}

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