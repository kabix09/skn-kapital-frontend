<template>
  <div class="flex-1 pl-2 pb-2 h-full overflow-hidden">
    <div v-if="eventsStore.selectedEvent" class="bg-white rounded-xl shadow-lg p-6 space-y-6 h-full overflow-hidden flex flex-col">
      <!-- HEADER -->
      <div class="flex justify-between mb-4">
        <!-- EVENT NAME -->
        <h1 class="text-2xl font-bold">{{ eventsStore.selectedEvent.name }}</h1>

        <!-- SHOW PARTICIPANTS action-->
        <Button 
          label="Lista uczestników" 
          icon="pi pi-plus" 
          size="small" 
          class="w-[150px]" 
          @click="openParticipantsList"
        />
      </div>

      <!-- EVENT DETAILS -->
      <div class="grid grid-cols-1 md:grid-cols-10 gap-4 mb-4">
        <!-- DESCRIPTION -->
        <div class="md:col-span-7 flex flex-col h-full">
          <p class="bg-gray-100 rounded-lg p-4 text-sm text-gray-600 flex-grow overflow-auto">
            <strong>Opis: </strong>{{ eventsStore.selectedEvent.description }}
          </p>

          <!-- ACTION -->
          <div class="flex justify-begin mt-2">
            <Button 
              label="Dodaj zadanie" 
              icon="pi pi-plus" 
              size="small" 
              class="w-[150px]" 
              @click="openAddTask"
            />
          </div>
        </div>


        <!-- ADDIDTIONAL INFO -->
        <div class="md:col-span-3 flex flex-col gap-4">
          <div class="p-1 text-sm text-gray-600 flex items-center gap-2">
            <strong>Status:</strong>
            <Tag :value="eventsStore.selectedEvent.status" :severity="getStatusLabel(eventsStore.selectedEvent.status)" />
          </div>

          <div class="bg-gray-100 rounded-lg p-2 text-sm text-gray-600 flex item-center gap-2">
            <strong class="block mb-1">Data:</strong>
            <p>{{ eventsStore.selectedEvent.date }}</p>
          </div>

          <div class="bg-gray-100 rounded-lg p-2 text-sm text-gray-600 flex item-center gap-2">
            <strong class="block mb-1">Osoba odp:</strong>
            <p>{{ eventsStore.selectedEvent.responsiblePerson }}</p>
          </div>
        </div>
      </div>

      <!-- TASK LIST -->
      <TaskList :eventId="eventsStore.selectedEvent.id"/>
    </div>

    <div v-else class="h-full flex items-center justify-center">
      <Card class="max-w-md w-full text-center p-6">
        <template #content>
          <p class="text-gray-500 italic text-lg">
            Wybierz wydarzenie z listy po lewej stronie.
          </p>
        </template>
      </Card>
    </div>

    <!-- DRAWERS -->
    <Drawer
      v-if="eventsStore.selectedEvent"
      v-model:isOpen="isParticipantsOpen"
      title="Lista uczestników"
      width="w-3/8"
    >
      <EventParticipantsList />
    </Drawer>

    <Drawer v-model:isOpen="isTaskOpen" title="Dodaj zadanie" width="w-1/3">
      <AddTaskForm :eventId="eventsStore.selectedEvent.id"/>
    </Drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEventsStore } from '@/stores/events'
import { getStatusLabel } from '@/utils/statusUtils'

import EventParticipantsList from './EventParticipantsList.vue'
import AddTaskForm from './Form/AddTaskForm.vue'
import TaskList from './Task/TaskList.vue'

// Store
const eventsStore = useEventsStore()

// Local state
const isParticipantsOpen = ref(false)
const isTaskOpen = ref(false)

function openParticipantsList() {
  isParticipantsOpen.value = true
}

function openAddTask() {
  isTaskOpen.value = true
}

</script>
