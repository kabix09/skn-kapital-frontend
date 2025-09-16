import { defineStore } from 'pinia';
import api from "@/axios";

export const useEventsStore = defineStore('events', {
    id: 'events',
    state: () => ({
        events: [],
        eventTypes: [],
        count: 0,
        loading: false,
        error: null,
        selectedEventId: null, // event selelected from list
    }),
    getters: {
        getEvents: (state) => state.events,
        getEventTypes: (state) => state.eventTypes,
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
        selectedEvent: (state) => {
            return state.events.find(e => e.id === state.selectedEventId) || null
        }
    },
    actions: {
        selectEvent(id) {
            this.selectedEventId = id;
        },
        async fetchEventTypes() {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get('/api/EventType');
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                this.eventTypes = await response.data;
            } catch (error) {
                console.log(error)
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async fetchEvents() {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get('/api/Event');
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                this.events = await response.data;
            } catch (error) {
                console.log(error)
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async createEvent(payload) {
            this.loading = true;
            this.error = null;

            try {
                // Tworzymy wydarzenie
                const response = await api.post('/api/Event', payload, {
                headers: { 'Content-Type': 'application/json' }
                });

                // response.data zawiera { id: ... }
                const data = response.data;

                if (data.id) {
                // Pobieramy pełne dane nowego wydarzenia
                const detailResponse = await api.get(`/api/Event/${data.id}`);

                this.events.push(detailResponse.data);
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