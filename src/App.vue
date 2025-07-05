<template>
	<div class="app">
		<Sidebar />

		<div class="flex-1 flex flex-col">
			<Header />

			<main class="flex-1 overflow-auto p-4">
				<router-view />
			</main>
		</div>
	</div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
</script>

<style lang="scss">
:root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark-button: #344766;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
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