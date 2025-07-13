<template>
    <div class="flex flex-col h-full">
        <header class="h-12 shrink-0 flex items-center justify-between px-2">
            <span class="font-semibold" style="color: var(--dark);">
                Zapisanych: {{ attendeesCount }}/{{ attendeesLimit }}
            </span>

            <Button 
                label="Odśwież" 
                icon="pi pi-load" 
                size="small" 
                class="w-[100px] h-[30px]"
                @click="refreshParticipantsList"
            />
        </header>

        <div class="bg-white rounded-xl shadow-lg p-1 h-auto overflow-auto">
            <DataTable :value="eventMembers" size="small" stripedRows>
                <Column field="name" header="Name" sortable></Column>
                <Column field="email" header="Email" sortable></Column>
                <Column field="registrationDate" header="Registered At" sortable></Column>

                <Column header="" bodyClass="text-center">
                    <template #body="{ data }">
                        <router-link :to="`/members/${data.id}`" >
                            <span class="material-icons">visibility</span>
                        </router-link>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useEventMembersStore } from '@/stores/eventMembers'
import { useEventsStore } from '@/stores/events'
import { storeToRefs } from 'pinia'

// Store
const eventMembersStore = useEventMembersStore()
const eventsStore = useEventsStore()

onMounted(async () => {
  await eventMembersStore.mockEventMembers()
})

const { eventMembers } = storeToRefs(eventMembersStore)
const { selectedEvent } = storeToRefs(eventsStore);

const attendeesLimit = computed(() => selectedEvent.value.attendeesLimit || 0);
const attendeesCount = computed(() => selectedEvent.value.attendees.length);

function refreshParticipantsList() {
    console.log('Refreshing participants list for event ID:', eventsStore.selectedEvent.id);
}
</script>