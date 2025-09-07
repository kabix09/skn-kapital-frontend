<template>
  <DataTable
    scrollable
    scrollHeight="flex"
    v-model:filters="filters"
    :value="consequences"
    dataKey="id"
    paginator
    :rows="15"
    :loading="loading"
    filterDisplay="row"
    :globalFilterFields="[
      'full_name',
      'student_email',
      'private_email',
      'field_of_study',
      'event_participation_count'
    ]"
  >
    <template #header>
      <!-- TODO add action button-->
    </template>
    <template #empty>No members found.</template>
    <template #loading>Loading members list. Please wait.</template>

    <Column
      header="Name & Surname"
      :sortable="true"
      :filter="true"
      filterField="full_name"
      :style="{ minWidth: '15rem', width: '20%' }"
    >
      <template #body="{ data }">
        {{ data.name }} {{ data.surename }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Search by name"
          style="width: 100%"
        />
      </template>
    </Column>

    <Column 
        header="Student Email" 
        filterField="student_email" 
        :style="{ minWidth: '17rem', width: '25%' }"
    >
        <template #body="{ data }">
            {{ data.student_email }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Search by student email"
            style="width: 100%"
            />
        </template>
    </Column>

    <Column header="Private Email" filterField="private_email" :style="{ minWidth: '17rem', width: '23%' }">
      <template #body="{ data }">
        {{ data.private_email }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Search by private email"
          style="width: 100%"
        />
      </template>
    </Column>
  
    <Column field="field_of_study" header="Field of Study" :style="{ minWidth: '25rem', width: '30%' }">
      <template #body="{ data }">
        {{ data.field_of_study }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Search by field of study"
          style="width: 100%"
        />
      </template>
    </Column>

    <Column 
        field="is_member" 
        header="Is Member" 
        :showFilterMenu="false"
        :style="{ minWidth: '10rem', width: '10%' }"
        :pt="{
            columnHeaderContent: { style: { 'justify-content': 'center' } },
            bodycell: { style: 'text-align:center;' }
        }"
    >
        <template #filter="{ filterModel, filterCallback }">
            <Select v-model="filterModel.value"  @change="filterCallback()" :options="isMemberStatuses" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid>
                <template #option="slotProps">
                    <Tag :value="slotProps.option.value" :severity="getBooleanLabel(slotProps.option.value)" />
                </template>
            </Select>
        </template>
        <template #editor="{ data, field }">
            <Select v-model="data[field]" :options="isMemberStatuses" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid>
                <template #option="slotProps">
                    <Tag :value="slotProps.option.value" :severity="getBooleanLabel(slotProps.option.value)" />
                </template>
            </Select>
        </template>
        <template #body="slotProps">
            <Tag :value="slotProps.data.is_member" :severity="getBooleanLabel(slotProps.data.is_member)" />
        </template>
    </Column>
        
    <Column header="Actions" :style="{ minWidth: '8rem', textAlign: 'center' }">
      <template #body="{ data }">
        <button
          class="p-button p-button-rounded p-button-text p-button-sm"
          @click="editCustomer(data)"
        >
          <span class="material-icons">edit</span>
        </button>
        <button
          class="p-button p-button-rounded p-button-text p-button-danger p-button-sm"
          @click="deleteCustomer(data)"
        >
          <span class="material-icons">delete</span>
        </button>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useConsequencesStore } from '@/stores/consequences'
import { storeToRefs } from 'pinia';
import { getBooleanLabel } from '@/utils/statusUtils'

const consequencesStore = useConsequencesStore()

const loading = ref(true)
const { consequences } = storeToRefs(consequencesStore);
const { isMemberStatuses } = storeToRefs(consequencesStore);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  full_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  student_email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  private_email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  field_of_study: { value: null, matchMode: FilterMatchMode.CONTAINS },
  is_member: { value: null, matchMode: FilterMatchMode.EQUALS },
})

onMounted(async () => {
  await consequencesStore.mockConsequences();
  loading.value = false;
})

function editCustomer(customer) {
  console.log('Edit', customer)
}

function deleteCustomer(customer) {
  console.log('Delete', customer)
}
</script>

<style>
.p-datatable-filter-element-container {
  width: calc(100% - var(--p-button-icon-only-width));
}
</style>
