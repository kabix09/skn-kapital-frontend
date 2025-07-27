<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
    :style="`background-image: url(${backgroundImage})`"
  >
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold mb-6 text-center">Zaloguj się</h2>

      <form @submit.prevent="onLogin" class="flex flex-col gap-4">
        <Message v-if="errors.length" severity="error">
          <ul class="list-disc list-inside text-sm">
            <li v-for="(err, idx) in errors" :key="idx">{{ err }}</li>
          </ul>
        </Message>

        <div>
          <label for="email" class="block text-sm mb-1">Email</label>
          <InputText
            id="email"
            v-model="email"
            type="email"
            class="w-full"
            placeholder="Email"
            :required="true"
          />
        </div>

        <div>
          <label for="password" class="block text-sm mb-1">Hasło</label>
          <Password
            id="password"
            v-model="password"
            :feedback="false"
            toggleMask
            class="w-full"
            inputClass="w-full"
            placeholder="Hasło"
            :required="true"
          />
        </div>

        <Button type="submit" label="Zaloguj się" style="background-color: var(--dark)" class="w-full" />
      </form>
    </div>
  </div>
</template>

<script setup>
import background from '@/assets/SKN_kapital_background.jpg'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from '@/axios'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const backgroundImage = background

const email = ref('')
const password = ref('')
const errors = ref([])

const router = useRouter()
const auth = useAuthStore()

const onLogin = async () => {
  errors.value = []

  try {
    // const response = await axios.post('/api/login', {
    //   email: email.value,
    //   password: password.value
    // })

    const token = "abc-def-ghi" // response.data.token;
    if (token) {
      auth.setToken(token)
      auth.setAuthStatus(true)
      await router.push({ name: 'dashboard' })
    } else {
      errors.value.push('Nieprawidłowe dane logowania.')
    }
  } catch (err) {
    errors.value = err.response?.data?.errors || ['Błąd logowania.']
  }
}
</script>