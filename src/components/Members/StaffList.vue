<template>
  <DataTable
    scrollable
    scrollHeight="flex"
    v-model:filters="filters"
    :value="staff"
    dataKey="id"
    paginator
    :rows="15"
    :loading="loading"
    filterDisplay="row"
    :globalFilterFields="[
      'full_name',
      'student_email',
      'leader',
      'added_by',
      'status'
    ]"
    stripedRows
    editMode="row" 
    v-model:editingRows="editingRows" 
    @row-edit-save="onRowEditSave"
  >
    <template #header>
      <!-- TODO add action button-->
    </template>
    <template #empty>No staff members found.</template>
    <template #loading>Loading staff members list. Please wait.</template>

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
      <template #editor="{ data }">
          <InputText v-model="data['name']" fluid />
          <InputText v-model="data['surename']" fluid />
      </template>
    </Column>

    <Column 
        header="Student Email" 
        field="student_email"
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
        <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
        </template>
    </Column>

    <Column
        header="Leader"
        :sortable="true"
        :filter="true"
        field="leader"
        filterField="leader"
        :style="{ minWidth: '15rem', width: '20%' }"
    >
      <template #body="{ data }">
        {{ data.leader }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Search by leader"
          style="width: 100%"
        />
      </template>
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" fluid />
      </template>
    </Column>

    <Column
        header="Added By"
        :sortable="true"
        :filter="true"
        field="added_by"
        filterField="added_by"
        :style="{ minWidth: '15rem', width: '20%' }"
    >
      <template #body="{ data }">
        {{ data.added_by }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          placeholder="Search by added by"
          style="width: 100%"
        />
      </template>
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" fluid />
      </template>
    </Column>

    <Column 
        field="status" 
        header="Status" 
        :showFilterMenu="false"
        :style="{ minWidth: '10rem', width: '10%' }"
        :pt="{
            columnHeaderContent: { style: { 'justify-content': 'center' } },
            bodycell: { style: 'text-align:center;' }
        }"
    >
        <template #filter="{ filterModel, filterCallback }">
            <Select v-model="filterModel.value"  @change="filterCallback()" :options="staffStatuses" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid>
                <template #option="slotProps">
                    <Tag :value="slotProps.option.value" :severity="getMemberStatusLabel(slotProps.option.value)" />
                </template>
            </Select>
        </template>
        <template #editor="{ data, field }">
            <Select v-model="data[field]" :options="staffStatuses" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid>
                <template #option="slotProps">
                    <Tag :value="slotProps.option.value" :severity="getMemberStatusLabel(slotProps.option.value)" />
                </template>
            </Select>
        </template>
        <template #body="slotProps">
            <Tag :value="slotProps.data.status" :severity="getMemberStatusLabel(slotProps.data.status)" />
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
import { useStaffStore } from '@/stores/staff'
import { storeToRefs } from 'pinia';
import { getMemberStatusLabel } from '@/utils/statusUtils'

const staffStore = useStaffStore()

const loading = ref(true)
const { staff } = storeToRefs(staffStore);
const { staffStatuses } = storeToRefs(staffStore);

const editingRows = ref([]);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  full_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  student_email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  leader: { value: null, matchMode: FilterMatchMode.CONTAINS },
  added_by: { value: null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS }
})

onMounted(async () => {
  await staffStore.mockStaff();
  loading.value = false;
})

// function editCustomer(customer) {
//   console.log('Edit', customer)
// }

const onRowEditSave = (staff) => {
    console.log('Edit', staff)

    let { newData, index } = staff;
    staffStore.editStaff(index, newData);
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
