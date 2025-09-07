<template>
  <DataTable
    scrollable
    scrollHeight="flex"
    v-model:filters="filters"
    :value="guests"
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
    stripedRows
    editMode="row" 
    v-model:editingRows="editingRows" 
    @row-edit-save="onRowEditSave"
  >
    <template #header>
      <!-- TODO add action button-->
    </template>
    <template #empty>No customers found.</template>
    <template #loading>Loading customers data. Please wait.</template>

    <Column
      header="Name & Surname"
      :sortable="true"
      :filter="true"
      filterField="full_name"
      :style="{ minWidth: '12rem', width: '14%' }"
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
            <template #editor="{ data }">
          <InputText v-model="data['name']" fluid />
          <InputText v-model="data['surename']" fluid />
      </template>
    </Column>

    <Column header="Student Email" field="student_email" filterField="student_email" :style="{ minWidth: '17rem', width: '23%' }">
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
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" fluid />
      </template>
    </Column>

    <Column header="Private Email" field="private_email" filterField="private_email" :style="{ minWidth: '17rem', width: '23%' }">
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
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" fluid />
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
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" fluid />
      </template>
    </Column>

    <Column :rowEditor="true" style="min-width: 7rem;" bodyStyle="text-align:center"></Column>

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
import { useGuestStore } from '@/stores/guests'
import { storeToRefs } from 'pinia';

const guestsStore = useGuestStore()

const loading = ref(true)
const { guests } = storeToRefs(guestsStore);

const editingRows = ref([]);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  full_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  student_email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  private_email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  field_of_study: { value: null, matchMode: FilterMatchMode.CONTAINS },
  event_participation_count: { value: null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS }
})

onMounted(async () => {
  await guestsStore.mockGuests();
  loading.value = false;
})

function editCustomer(customer) {
  console.log('Edit', customer)
}

const onRowEditSave = (guest) => {
    console.log('Edit', guest)

    let { newData, index } = guest;
    console.log(newData);
    console.log(index);
    guestsStore.editGuest(index, newData);
};

function deleteCustomer(customer) {
  console.log('Delete', customer)
}
</script>

<style>
.p-datatable-filter-element-container {
  width: calc(100% - var(--p-button-icon-only-width));
}
</style>
