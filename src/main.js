import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import App from './App.vue'
import router from './router'

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: 'light', // Wymuszenie jasnego trybu
            }
        }
    })
    .mount('#app')