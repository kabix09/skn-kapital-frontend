<template>
  <aside class="w-[280px] rounded-xl border-gray-200 bg-gray-50 flex flex-col">
    <div class="p-4 border-b">
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
        @click="$emit('select', event.id)"
        :class="[
          'w-full text-left p-3 rounded hover:bg-blue-100 transition',
          selectedId === event.id ? 'bg-blue-200 font-semibold' : ''
        ]"
      >
        {{ event.name }}
      </button>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  events: Array,
  selectedId: Number,
})

defineEmits(['select', 'add'])
</script>
