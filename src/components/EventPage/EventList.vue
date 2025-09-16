<template>
  <aside class="w-[280px] rounded-xl border-gray-200 bg-gray-50 flex flex-col">
    <div class="p-4 border-gray-200 border-b-2">
      <button
        class="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        @click="$emit('add')"
      >
        + Dodaj wydarzenie
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-2">
      <button
        v-for="event in events"
        :key="event.id"
        @click="() => { eventsStore.selectEvent(event.id); eventTasksStore.fetchEventTasks(event.id); }"
        :class="[
          'w-full text-left p-3 rounded hover:bg-blue-100 transition',
          selectedEvent && selectedEvent.id === event.id ? 'bg-blue-200 font-semibold' : ''
        ]"
      >
        <!-- @click="$emit('select', event.id)" -->
        {{ event.name }}
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useEventsStore } from '@/stores/events'
import { useEventTasksStore } from '@/stores/eventTasks'

import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const eventsStore = useEventsStore()
const eventTasksStore = useEventTasksStore()
const { events, selectedEvent } = storeToRefs(eventsStore)

onMounted(async () => {
  await eventsStore.fetchEvents()
})


defineEmits(['select', 'add'])
</script>
