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

            <Column field="assignee" header="Osoba odp." style="width: 15%">
                <template #editor="{ data, field }">
                    <Select
                        v-model="data[field]"
                        :options="members"
                        :optionLabel="member => member.firstName + ' ' + member.lastName"
                        optionValue="id"
                        class="w-full mt-1"
                        :placeholder="data[field]"
                        showClear
                    />
                </template>
            </Column>

            <Column field="deadline" header="Deadline" style="width: 15%" :editor="true">
                <template #body="{ data }">
                    {{ data.deadline }}
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
                    <Select
                        v-model="data[field]"
                        :options="eventTaskStatuses"
                        :optionLabel="option => getEventTaskStatusLabel(option.value)"
                        optionValue="value"
                        placeholder="Select a Status"
                        fluid
                        >
                        <template #option="slotProps">
                            <Tag
                            :value="getEventTaskStatusLabel(slotProps.option.value)"
                            :severity="getEventTaskStatusTag(slotProps.option.value)"
                            />
                        </template>
                    </Select>
                </template>
                <template #body="slotProps">
                    <Tag :value="getEventTaskStatusLabel(slotProps.data.status)" :severity="getEventTaskStatusTag(slotProps.data.status)" />
                </template>
            </Column>

            <Column :rowEditor="true" style="width: 10%" bodyStyle="text-align:center"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useEventTasksStore } from '@/stores/eventTasks'
import { useMembersStore } from '@/stores/members'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { getEventTaskStatusLabel, getEventTaskStatusTag } from '@/utils/statusUtils'
import { storeToRefs } from 'pinia';

const eventTasksStore = useEventTasksStore()
const membersStore = useMembersStore()


const props = defineProps({
    eventId: {
        type: String,
        required: true
    }
})

const { eventTasks } = storeToRefs(eventTasksStore);
const { eventTaskStatuses } = storeToRefs(eventTasksStore);
const { members } = storeToRefs(membersStore)

membersStore.fetchMembers()

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
    let { newData, data, index } = event;

    var payload = {
        name: newData.name,
        deadline: new Date(newData.deadline).toISOString(),
        status: newData.status,
        assigneeId: newData.assignee,
    };

    eventTasksStore.editTask(props.eventId, data.id, index, payload);
};
</script>
