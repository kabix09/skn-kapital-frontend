<template>
  <div class="flex-1 pl-2 pb-2 h-full overflow-hidden">
    <div v-if="event" class="bg-white rounded-xl shadow-lg p-6 space-y-6 h-full overflow-hidden flex flex-col">
      <!-- HEADER -->
      <div class="flex justify-between mb-4">
        <!-- EVENT NAME -->
        <h1 class="text-2xl font-bold">{{ event.name }}</h1>

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
        <div class="md:col-span-7 bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
          <p>
            <strong>Opis: </strong>{{ event.description }}
          </p>
        </div>

        <!-- ADDIDTIONAL INFO -->
        <div class="md:col-span-3 flex flex-col gap-4">
          <div class="p-1 text-sm text-gray-600 flex items-center gap-2">
            <strong>Status:</strong>
            <Tag :value="event.status" :severity="getStatusLabel(event.status)" />
          </div>

          <div class="bg-gray-100 rounded-lg p-2 text-sm text-gray-600 flex item-center gap-2">
            <strong class="block mb-1">Data:</strong>
            <p>{{ event.date }}</p>
          </div>

          <div class="bg-gray-100 rounded-lg p-2 text-sm text-gray-600 flex item-center gap-2">
            <strong class="block mb-1">Osoba odp:</strong>
            <p>{{ event.responsiblePerson }}</p>
          </div>
        </div>
      </div>

      <!-- ADD TASK action-->
      <div class="flex justify-end mb-4">
        <Button 
          label="Dodaj zadanie" 
          icon="pi pi-plus" 
          size="small" 
          class="w-[150px]" 
          @click="openAddTask"
        />
      </div>

      <!-- TASK LIST -->
      <TaskList />
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
      v-if="event"
      v-model:isOpen="isParticipantsOpen"
      title="Lista uczestników"
      width="w-3/8"
    >
      <EventParticipantsList
        :eventId="event.id"
        :maxParticipants="event.limit"
      />
    </Drawer>

    <Drawer v-model:isOpen="isTaskOpen" title="Dodaj zadanie" width="w-1/3">
      <p>Tu będzie formularz dodawania zadania</p>
    </Drawer>
  </div>
</template>

<script lang="js">
import EventParticipantsList from './EventParticipantsList.vue';
import TaskList from './Task/TaskList.vue';
import { getStatusLabel } from '@/utils/statusUtils'

export default {
  components: {
    TaskList
  },
  props: {
    event: Object
  },
  data() {
    return {
      isParticipantsOpen: false,
      isTaskOpen: false
    }
  },
  methods: {
    getStatusLabel,
    openParticipantsList() {
      this.isParticipantsOpen = true
    },
    openAddTask() {
      this.isTaskOpen = true
    }
  }
}
</script>

