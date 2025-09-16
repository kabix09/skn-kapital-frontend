<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onSubmit"
    class="max-w-xl mx-auto p-6 bg-white shadow rounded-xl space-y-6"
  >
    <!-- Zadanie -->
    <div class="mb-3">
      <label for="name" class="block text-sm font-medium text-gray-700">Zadanie</label>
      <InputText name="name" class="w-full mt-1" placeholder="Wprowadź nazwę zadania" />
      <Message v-if="$form.name?.invalid" severity="error" size="small">{{ $form.name.error?.message }}</Message>
    </div>

    <!-- Deadline + Typ wydarzenia -->
    <div class="flex gap-4 mb-3">
      <div class="w-1/2">
        <label for="deadline" class="block text-sm font-medium text-gray-700">Deadline</label>
        <Calendar name="deadline" showIcon dateFormat="yy-mm-dd" class="w-full mt-1" />
        <Message v-if="$form.deadline?.invalid" severity="error" size="small">{{ $form.deadline.error?.message }}</Message>
      </div>

      <div class="w-1/2">
        <label for="assigneeId" class="block text-sm font-medium text-gray-700">Przypisz do</label>
        <Select
          name="assigneeId"
          :options="members"
          :optionLabel="member => member.firstName + ' ' + member.lastName"
          optionValue="id"
          class="w-full mt-1"
          placeholder="Wybierz osobę"
        />
        <Message v-if="$form.assigneeId?.invalid" severity="error" size="small">{{ $form.assigneeId.error?.message }}</Message>
      </div>
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
import { useEventTasksStore } from '@/stores/eventTasks'
import { useMembersStore } from '@/stores/members'
import { storeToRefs } from 'pinia';

const props = defineProps({
  eventId: {
    type: Number,
    required: true
  }
})

const eventTasksStore = useEventTasksStore()
const membersStore = useMembersStore()

const { members } = storeToRefs(membersStore)

membersStore.fetchMembers()

// dane do selectów
const people = ref([
  { id: 1, name: 'Jan Kowalski' },
  { id: 2, name: 'Anna Nowak' },
  { id: 3, name: 'Piotr Wiśniewski' }
])

const initialValues = {
  name: '',
  deadline: null,
  assigneeId: null,
  description: '',
}

// yup schema
const schema = yup.object({
  name: yup.string().required('Pole zadanie jest wymagane'),
  deadline: yup.date().nullable().required('Deadline jest wymagany'),
  assigneeId: yup.string().nullable().required('Osoba odpowiedzialna jest wymagana'),
  description: yup.string()
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
    await eventTasksStore.createEventTask(props.eventId, payload)
  } catch (error) {
    alert('Wystąpił błąd: ' + error.message)
  }
}
</script>
