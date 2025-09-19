<template>
  <div class="flex text-gray-800 w-full h-full overflow-auto">
    <ScheduleXCalendar :calendar-app="calendarApp" style="height: 100%; width: 100%;" />
  </div>
</template>

<script setup>
import { ScheduleXCalendar } from '@schedule-x/vue'
import { onMounted, computed, watchEffect } from 'vue'
import {
  createCalendar,
  createViewMonthAgenda,
  createViewMonthGrid,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { usePublicationsStore } from '@/stores/publications'
import { storeToRefs } from 'pinia'

// Calendar może emitować eventy
const emit = defineEmits(['addPublication'])

const publicationsStore = usePublicationsStore()
const { publications } = storeToRefs(publicationsStore)

const calendarApp = createCalendar({
  selectedDate: new Date().toISOString().split('T')[0],
  views: [createViewMonthGrid(), createViewMonthAgenda()],
  plugins: [createEventModalPlugin()],
  dayBoundaries: {
    start: '06:00',
    end: '22:00',
  },
  callbacks: {
    onEventClick: (event) => {
      console.log('Event clicked:', event)
    },
  },
  events: [],
})

// 🔹 Mappowanie danych ze store do modelu kalendarza
const mappedEvents = computed(() =>
  publications.value.map(pub => ({
    id: pub.id,
    title: pub.topic,
    start: pub.publicationDate,
    end: pub.publicationDate
  }))
)

// 🔹 Automatyczna synchronizacja z kalendarzem
watchEffect(() => {
  calendarApp.events.set(mappedEvents.value)
})

onMounted(async () => {
  await publicationsStore.fetchPublications()

  // Dodajemy przycisk w nagłówku kalendarza
  const header = document.querySelector('.sx__calendar-header-content')
  if (header) {
    const btn = document.createElement('button')
    btn.textContent = 'Dodaj publikacje'
    btn.className =
      'my-custom-button sx__ripple px-4 py-2 text-sm font-semibold text-white rounded hover:bg-blue-700'
    btn.style.setProperty('background-color', 'var(--dark-button)', 'important')

    btn.addEventListener('click', () => {
      emit('addPublication')
    })

    header.insertBefore(btn, header.firstChild)
  }
})
</script>

<style>
.sx__calendar-header {
  padding: 4px 8px !important;
  min-height: auto !important;
}

.sx__today-button,
.sx__view-selection-selected-item,
.sx__view-selection-item.is-selected {
  padding: 6px 6px !important;
}

.sx__date-input {
  padding: 7px 8px !important;
}
</style>