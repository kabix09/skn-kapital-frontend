<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onSubmit"
    class="max-w-xl mx-auto p-6 bg-white shadow rounded-xl space-y-6"
  >
    <!-- Publikacja -->
    <div class="mb-3">
      <label for="event" class="block text-sm font-medium text-gray-700">Temat</label>
      <InputText name="event" class="w-full mt-1" placeholder="Wprowadź nazwę publikacji" />
      <Message v-if="$form.event?.invalid" severity="error" size="small">{{ $form.event.error?.message }}</Message>
    </div>

    <!-- Deadline + Typ publikacji -->
    <div class="flex gap-4 mb-3">
      <div class="w-1/2">
        <label for="deadline" class="block text-sm font-medium text-gray-700">Data dodania</label>
        <Calendar name="deadline" showIcon dateFormat="yy-mm-dd" class="w-full mt-1" />
        <Message v-if="$form.deadline?.invalid" severity="error" size="small">{{ $form.deadline.error }}</Message>
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
          :showClear="true"
        />
        <Message v-if="$form.assigneeId?.invalid" severity="error" size="small">{{ $form.assigneeId.error?.message }}</Message>
      </div>
    </div>



    <!-- <div class="mb-3">
      <label for="place" class="block text-sm font-medium text-gray-700">Miejsce organizacji</label>
      <InputText name="place" class="w-full mt-1" placeholder="Wprowadź miejsce wydarzenia" />
      <Message v-if="$form.place?.invalid" severity="error" size="small">{{ $form.place.error?.message }}</Message>
    </div> -->
    <div class="mb-3">
          <label for="socialMedia" class="block text-sm font-medium text-gray-700">Platforma publikacji</label>

        <MultiSelect 
          name="socialMedia"
          display="chip" 
          :options="socialMedia" 
          optionLabel="friendlyName"
            optionValue="id"
          filter 
          placeholder="Select Platform"
          :maxSelectedLabels="3" 
          class="w-full mt-1"
         />
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
import { usePublicationsStore } from '@/stores/publications'
import { useMembersStore } from '@/stores/members'
import { storeToRefs } from 'pinia';
import { toRaw } from 'vue'

const publicationsStore = usePublicationsStore()
const membersStore = useMembersStore()

const { members } = storeToRefs(membersStore)
const { socialMedia } = storeToRefs(publicationsStore)
  
membersStore.fetchMembers()
publicationsStore.fetchSocialMedia()

// wartości początkowe
const initialValues = {
  event: '',
  deadline: null,
  assigneeId: null,
  socialMedia: [],
}

// walidacja
const schema = yup.object({
  event: yup.string().required('Temat publikacji jest wymagany'),
  deadline: yup.date().nullable().required('Data dodania jest wymagana'),
  assigneeId: yup.string().nullable(),
  socialMedia: yup.array().required('Wybierz przynajmniej jedną platformę')
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

// obsługa submit
const onSubmit = async (form) => {
  const payload = {
    topic: form.values.event,
    publicationDate: form.values.deadline
      ? formatDateLocal(form.values.deadline)
      : null,
    assignedToId: form.values.assigneeId,
    socialMedia: toRaw(form.values.socialMedia).slice()
  }

  try {
    publicationsStore.createPublication(payload)
  } catch (error) {
    alert('Wystąpił błąd: ' + error.message)
  }
}
</script>
