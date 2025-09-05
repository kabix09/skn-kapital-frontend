<template>
  <div class="app flex h-screen overflow-hidden" v-if="!isAuthPage">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="flex-1 overflow-auto p-4">
        <router-view />
      </main>
    </div>
  </div>

  <router-view v-else />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue'

const route = useRoute()

const layoutlessRoutes = ['/login']
const isAuthPage = computed(() => layoutlessRoutes.includes(route.path))
</script>

<style lang="scss">
:root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark-button: #27364e;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;

	// Nadpisanie styli z PrimeVue DataTable -->
	--p-datatable-body-cell-padding: 0.2rem 0.8rem !important; // padding do komórek w tabeli
	--p-inputtext-padding-y: 0.3rem 0.3rem !important;
    --p-select-padding-y: 0.3rem !important;
	// --p-list-option-padding: 0.2rem 0.2rem !important; // lista opcji
	--p-select-option-padding: 0.25rem 0.2rem !important;
	--p-tag-padding: 0.15rem 0.5rem !important;
}

@media (max-width: 1536px) {
  :root {
    --sidebar-width: 250px;
  }
}

// * {
// 	margin: 0;
// 	padding: 0;
// 	box-sizing: border-box;
// 	font-family: 'Fira sans', sans-serif;
// }

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: var(--dark-button);
	color: var(--light);;
}

.app {
	display: flex;
	min-height: 600px;         // ⬅️ minimalna wysokość (standardowy laptop)
	height: 100vh;             // ⬅️ pełna wysokość widoczna w oknie
	overflow: hidden;          // ⬅️ zapobiega overflow przy stałym layoucie

	main {
		flex: 1 1 0;
		padding: 0.5rem;
		overflow-y: auto;      // ⬅️ scroll tylko w `main`, nie na całym body

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}
</style>