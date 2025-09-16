<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onSubmit"
    class="max-w-xl mx-auto p-6 bg-white shadow rounded-xl space-y-6"
  >
    <!-- Wydarzenie -->
    <div class="mb-3">
      <label for="name" class="block text-sm font-medium text-gray-700">Wydarzenie</label>
      <InputText name="name" class="w-full mt-1" placeholder="Wprowadź nazwę wydarzenia" />
      <Message v-if="$form.name?.invalid" severity="error" size="small">{{ $form.name.error?.message }}</Message>
    </div>

    <!-- Deadline + Typ wydarzenia -->
    <div class="flex gap-4 mb-3">
      <div class="w-1/2">
        <label for="date" class="block text-sm font-medium text-gray-700">Deadline</label>
        <Calendar name="date" showIcon dateFormat="yy-mm-dd" class="w-full mt-1" />
        <Message v-if="$form.date?.invalid" severity="error" size="small">{{ $form.date.error?.message }}</Message>
      </div>

      <div class="w-1/2">
        <label for="eventTypeId" class="block text-sm font-medium text-gray-700">Typ wydarzenia</label>
        <Select
          name="eventTypeId"
          :options="eventTypes"
          optionLabel="name"
          optionValue="id"
          class="w-full mt-1"
          placeholder="Wybierz typ"
        />
        <Message v-if="$form.eventTypeId?.invalid" severity="error" size="small">{{ $form.eventTypeId.error?.message }}</Message>
      </div>
    </div>

    <!-- Osoba odpowiedzialna + Limit osób -->
    <div class="flex gap-4 mb-3">
      <div class="w-1/2">
        <label for="coordinatorId" class="block text-sm font-medium text-gray-700">Osoba odpowiedzialna</label>
        <Select
          name="coordinatorId"
          :options="coordinators"
          :optionLabel="coordinator => coordinator.firstName + ' ' + coordinator.lastName"
          optionValue="id"
          class="w-full mt-1"
          placeholder="Wybierz osobę"
        />
        <Message v-if="$form.coordinatorId?.invalid" severity="error" size="small">{{ $form.coordinatorId.error?.message }}</Message>
      </div>

      <div class="w-1/2">
        <label for="limit" class="block text-sm font-medium text-gray-700">Limit osób</label>
        <InputNumber
          name="limit"
          mode="decimal"
          showButtons
          :min="0"
          :max="350"
          :step="1"
          class="mt-1 w-full"
          :useGrouping="false"
        />
        <Message v-if="$form.limit?.invalid" severity="error" size="small">{{ $form.limit.error?.message }}</Message>
      </div>
    </div>

    <div class="mb-3">
      <label for="place" class="block text-sm font-medium text-gray-700">Miejsce organizacji</label>
      <InputText name="place" class="w-full mt-1" placeholder="Wprowadź miejsce wydarzenia" />
      <Message v-if="$form.place?.invalid" severity="error" size="small">{{ $form.place.error?.message }}</Message>
    </div>

    <!-- Opis -->
    <div class="mb-3">
      <label for="description" class="block text-sm font-medium text-gray-700">Dodatkowy opis</label>
      <Textarea name="description" autoResize rows="4" class="w-full mt-1" placeholder="Wpisz dodatkowe informacje" />
      <Message v-if="$form.description?.invalid" severity="error" size="small">{{ $form.description.error?.message }}</Message>
    </div>

    <!-- Przycisk -->
    <div class="text-right">
      <Button
        type="submit"
        label="Wyślij"
        icon="pi pi-check"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      />
    </div>

    <!-- Debug form state -->
    <!-- <Fieldset legend="Form State" class="h-40 overflow-auto">
      <pre class="whitespace-pre-wrap">{{ $form }}</pre>
    </Fieldset> -->
  </Form>
</template>

<script setup>
import { ref } from 'vue'
import * as yup from 'yup'
import { yupResolver } from '@primevue/forms/resolvers/yup'
import { useEventsStore } from '@/stores/events'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia';

const eventsStore = useEventsStore()
const usersStore = useUserStore()

const { eventTypes } = storeToRefs(eventsStore);
const { coordinators } = storeToRefs(usersStore);

eventsStore.fetchEventTypes()
usersStore.fetchCoordinators()

// dane do selectów
// const people = ref([
//   { id: 1, name: 'Jan Kowalski' },
//   { id: 2, name: 'Anna Nowak' },
//   { id: 3, name: 'Piotr Wiśniewski' }
// ])

// const eventTypes = ref(['praktycy', 'excel', 'nauka'])

const initialValues = {
  name: '',
  date: null,
  eventTypeId: null,
  coordinatorId: null,
  limit: 0,
  description: '',
  place: '',
}

// yup schema
const schema = yup.object({
  name: yup.string().required('Nazwa jest wymagana'),
  date: yup.date().nullable().required('Deadline jest wymagany'),
  eventTypeId: yup.string().required('Typ wydarzenia jest wymagany'),
  coordinatorId: yup.string().nullable().required('Osoba odpowiedzialna jest wymagana'),
  limit: yup.number().integer().min(0, 'Limit musi być >= 0').required('Limit jest wymagany'),
  description: yup.string(),
})

// resolver na bazie yup
const resolver = yupResolver(schema)

function formatDateLocal(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
// przesuwa date do tyłu np 08-10 -> 08-09 bo => new Date(form.values.deadline).toISOString().split('T')[0]
// różnica stref czasowych –
// toISOString() zawsze zwraca datę w UTC, więc przy północy w Polsce (UTC+2) przesuwa o jeden dzień wstecz.
// Dlatego:
//     W formularzu masz 2025-08-11 00:00 czasu lokalnego.
//     toISOString() przelicza to na 2025-08-10T22:00:00.000Z.
//     Potem .split('T')[0] daje 2025-08-10.

const onSubmit = async (form) => {
  const payload = {
    ...form.values,
    date: form.values.date
      ? formatDateLocal(form.values.date)
      : null
  }

  try {
    console.log(payload)
// - potrzxeba
//     {
//   "name": "string",
//   "description": "string",
//   "date": "2025-09-14T20:11:35.832Z",
//   "coordinatorId": "string",
//   "location": "string",
//   "status": 0,
//   "eventTypeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
// }

// leci:
// Object { event: "test", deadline: "2025-09-17", eventType: "excel", responsible: 2, limit: 10, place: "etre", description: "erterw" }
// ​
// deadline: "2025-09-17"
// description: "erterw"
// event: "test"
// eventType: "excel"
// limit: 10
// place: "etre"
// responsible: 2


    await eventsStore.createEvent(payload)
  } catch (error) {
    alert('Wystąpił błąd: ' + error.message)
  }
}
</script>
