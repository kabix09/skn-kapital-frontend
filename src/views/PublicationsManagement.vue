<template>
    <main class="publication-management-page flex flex-col h-full overflow-hidden">
      <MyCalendar :onAddPublication="openDrawer" />
    </main>

    <!-- Drawer -->
    <Drawer v-model:isOpen="isOpen" title="Dodaj publikację" width="w-1/3">
      <!-- Slot content -->
      <AddPublicationForm/>
    </Drawer>
</template>

<script setup>
import { ref } from 'vue'
import MyCalendar from '../components/PublicationPage/MyCalendar.vue'
import AddPublicationForm from '../components/PublicationPage/Form/AddPublicationForm.vue'
import Drawer from '@/components/Drawer.vue'

const isOpen = ref(false)

function openDrawer() {
  isOpen.value = true
}
</script>