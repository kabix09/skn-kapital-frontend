import { defineStore } from 'pinia';
import api from "@/axios";

export const usePublicationsStore = defineStore('publications', {
    id: 'publications',
    state: () => ({
        publications: [],
        count: 0,
        loading: false,
        error: null,
    }),
    getters: {
        getPublications: (state) => state.eventPublications,
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
    },
    actions: {
        async fetchPublications() {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get('/api/Publication');
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                this.publications = await response.data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async createPublication(payload) {
            this.loading = true;
            this.error = null;

            try {
                // Tworzymy publikację
                const response = await api.post('/api/Publication', payload, {
                    headers: { 'Content-Type': 'application/json' }
                });

                // response.data zawiera { id: ... }
                const data = response.data;

                if (data.id) {
                    // Pobieramy pełne dane nowej publikacji
                    const detailResponse = await api.get(`/api/Publication/${data.id}`);

                    this.publications.push(detailResponse.data);
                }
            } catch (error) {
                console.error(error);
                this.error = error.response?.data || error.message || 'Błąd sieci';
            } finally {
                this.loading = false;
            }
        },
    },
});