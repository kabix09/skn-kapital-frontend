import { defineStore } from 'pinia';

export const useEventPublicationsStore = defineStore('eventPublications', {
    id: 'eventPublications',
    state: () => ({
        eventPublications: [],
        count: 0,
        loading: false,
        error: null,
    }),
    getters: {
        getEventPublications: (state) => state.eventPublications,
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
    },
    actions: {
        async fetchEventPublications() {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetch('/api/event-publications');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.events = data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async mockEventPublications() {
            this.eventPublications = [
                {
                    id: '1000',
                    name: 'John Doe',
                    startDate: '2025-08-01',
                    endDate: '2025-08-01',
                },
                {
                    id: '1001',
                    name: 'Jane Smith',
                    startDate: '2025-08-01',
                    endDate: '2025-08-01',
                },
                {
                    id: '1002',
                    name: 'Alice Johnson',
                    startDate: '2025-08-02',
                    endDate: '2025-08-03',
                },
            ];
        },
        async createPublication(payload) {
            console.log(payload);
            // Można tu dodać walidację lub zapis do API
            this.eventPublications.push(payload);
            this.count = this.eventPublications.length;
        }
    },
});