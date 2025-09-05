<template>
    <div class="flex-1 overflow-y-auto min-h-0 border-t border-gray-200">
        <DataTable
            scrollable scrollHeight="100%"
            v-model:editingRows="editingRows" 
            :value="eventTasks" 
            editMode="row" 
            dataKey="id" 
            stripedRows 
            @row-edit-save="onRowEditSave"
            :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                    bodycell: ({ state }) => ({
                        style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
                    })
                }
            }"
        >    
            <Column field="id" header="Id" style="width: 5%"></Column>

            <Column field="name" header="Zadanie" style="width: 25%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" fluid />
                </template>
            </Column>

            <Column field="person" header="Osoba odp." style="width: 15%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" fluid />
                </template>
            </Column>

            <Column field="date" header="Deadline" style="width: 15%" :editor="true">
                <template #body="{ data }">
                    {{ formatDate(data.date) }}
                </template>
                <template #editor="{ data, field }">
                    <Calendar 
                        v-model="data[field]" 
                        dateFormat="mm/dd/yy" 
                        placeholder="mm/dd/yyyy" 
                        showIcon 
                        showButtonBar 
                    />
                </template>
            </Column>

            <Column 
                field="status" 
                header="Status" 
                style="width: 10%" 
                :pt="{
                    columnHeaderContent: { style: { 'justify-content': 'center' } },
                    bodycell: { style: 'text-align:center;' }
                }"
            >
                <template #editor="{ data, field }">
                    <Select v-model="data[field]" :options="eventTaskStatuses" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                        </template>
                    </Select>
                </template>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                </template>
            </Column>

            <Column :rowEditor="true" style="width: 10%" bodyStyle="text-align:center"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useEventTasksStore } from '@/stores/eventTasks'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { getStatusLabel } from '@/utils/statusUtils'
import { storeToRefs } from 'pinia';

const eventTasksStore = useEventTasksStore()

onMounted(async () => {
    await eventTasksStore.mockEventTasks();
})

const props = defineProps({
    eventId: {
        type: Number,
        required: true
    }
})

const { eventTasks } = storeToRefs(eventTasksStore);
const { eventTaskStatuses } = storeToRefs(eventTasksStore);

const editingRows = ref([]);

const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const onRowEditSave = (event) => {
    let { newData, index } = event;
    eventTasksStore.editTask(props.eventId, index, newData);
};
</script>
