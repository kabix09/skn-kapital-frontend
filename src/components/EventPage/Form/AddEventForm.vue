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
      <label for="event" class="block text-sm font-medium text-gray-700">Wydarzenie</label>
      <InputText name="event" class="w-full mt-1" placeholder="Wprowadź nazwę wydarzenia" />
      <Message v-if="$form.event?.invalid" severity="error" size="small">{{ $form.event.error?.message }}</Message>
    </div>

    <!-- Deadline + Typ wydarzenia -->
    <div class="flex gap-4 mb-3">
      <div class="w-1/2">
        <label for="deadline" class="block text-sm font-medium text-gray-700">Deadline</label>
        <Calendar name="deadline" showIcon dateFormat="yy-mm-dd" class="w-full mt-1" />
        <Message v-if="$form.deadline?.invalid" severity="error" size="small">{{ $form.deadline.error?.message }}</Message>
      </div>

      <div class="w-1/2">
        <label for="eventType" class="block text-sm font-medium text-gray-700">Typ wydarzenia</label>
        <Select
          name="eventType"
          :options="eventTypes"
          class="w-full mt-1"
          placeholder="Wybierz typ"
        />
        <Message v-if="$form.eventType?.invalid" severity="error" size="small">{{ $form.eventType.error?.message }}</Message>
      </div>
    </div>

    <!-- Osoba odpowiedzialna + Limit osób -->
    <div class="flex gap-4 mb-3">
      <div class="w-1/2">
        <label for="responsible" class="block text-sm font-medium text-gray-700">Osoba odpowiedzialna</label>
        <Select
          name="responsible"
          :options="people"
          optionLabel="name"
          optionValue="id"
          class="w-full mt-1"
          placeholder="Wybierz osobę"
        />
        <Message v-if="$form.responsible?.invalid" severity="error" size="small">{{ $form.responsible.error?.message }}</Message>
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

const eventsStore = useEventsStore()

// dane do selectów
const people = ref([
  { id: 1, name: 'Jan Kowalski' },
  { id: 2, name: 'Anna Nowak' },
  { id: 3, name: 'Piotr Wiśniewski' }
])

const eventTypes = ref(['praktycy', 'excel', 'nauka'])

const initialValues = {
  event: '',
  deadline: null,
  eventType: null,
  responsible: null,
  limit: 0,
  description: '',
  place: '',
}

// yup schema
const schema = yup.object({
  event: yup.string().required('Nazwa jest wymagana'),
  deadline: yup.date().nullable().required('Deadline jest wymagany'),
  eventType: yup.string().required('Typ wydarzenia jest wymagany'),
  responsible: yup.number().nullable().required('Osoba odpowiedzialna jest wymagana'),
  limit: yup.number().integer().min(0, 'Limit musi być >= 0').required('Limit jest wymagany'),
  description: yup.string(),
})

// resolver na bazie yup
const resolver = yupResolver(schema)

const onSubmit = async (form) => {
  const payload = {
    ...form.values,
    deadline: form.values.deadline
      ? new Date(form.values.deadline).toISOString().split('T')[0]
      : null
  }

  try {
    await eventsStore.createEvent(payload)
  } catch (error) {
    alert('Wystąpił błąd: ' + error.message)
  }
}
</script>
