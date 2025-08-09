<template>
  <div class="flex text-gray-800 w-full h-full overflow-auto">
    <ScheduleXCalendar :calendar-app="calendarApp" style="height: 100%; width: 100%;" />
  </div>
</template>

<script setup>
import { ScheduleXCalendar } from '@schedule-x/vue'
import { onMounted, watch } from 'vue'
import {
  createCalendar,
  createViewMonthAgenda,
  createViewMonthGrid,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { useEventPublicationsStore } from '@/stores/eventPublications'

// Deklarujemy, że Calendar może emitować eventy
const emit = defineEmits(['addPublication'])

const eventPublicationsStore = useEventPublicationsStore()

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
  events: [], // startowo puste, wypełnimy później
})

// Metoda mapująca dane ze store → model kalendarza
function updateCalendarEvents() {
  const mappedEvents = eventPublicationsStore.getEventPublications.map(pub => ({
    id: pub.id,
    title: pub.name,
    start: pub.startDate,
    end: pub.endDate
  }))
  calendarApp.events.set(mappedEvents)
}

onMounted(async () => {
  await eventPublicationsStore.mockEventPublications()
  
  // Ustawiamy eventy w kalendarzu
  updateCalendarEvents()
  
  // Dodajemy przycisk w nagłówku kalendarza
  const header = document.querySelector('.sx__calendar-header-content')
  if (header) {
    const btn = document.createElement('button')
    btn.textContent = 'Dodaj publikacje'
    btn.className = 'my-custom-button sx__ripple px-4 py-2 text-sm font-semibold text-white rounded hover:bg-blue-700'
    btn.style.setProperty('background-color', 'var(--dark-button)', 'important')

    btn.addEventListener('click', () => {
      emit('addPublication') // Wywołujemy event do rodzica
    })

    header.insertBefore(btn, header.firstChild)
  }
})

// 🔹 Obserwacja zmian w store → automatyczne odświeżenie kalendarza
watch(
  () => eventPublicationsStore.getEventPublications,
  () => {
    updateCalendarEvents()
  },
  { deep: true }
)
</script> 

<style>
.sx__calendar-header {
  padding: 4px 8px !important; /* mniejsze marginesy wewnętrzne */
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