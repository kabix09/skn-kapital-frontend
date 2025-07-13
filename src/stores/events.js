import { defineStore } from 'pinia';

export const useEventsStore = defineStore('events', {
    id: 'events',
    state: () => ({
        events: [],
        count: 0,
        loading: false,
        error: null,
        selectedEventId: null, // event selelected from list
    }),
    getters: {
        getEvents: (state) => state.events,
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
        async fetchEvents() {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetch('/api/events');
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
        async createEvent(payload) {
            this.loading = true;
            this.error = null;
            try {

                const response = await fetch('/api/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.events.push(data);
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async mockEvents() {
            this.events = [
                {
                    id: 1,
                    name: 'Hackathon 2025',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id.',
                    date: '2025-08-15',
                    location: 'Warszawa',
                    attendees: ['Ania', 'Bartek'],
                    status: 'DONE',
                    responsiblePerson: 'Kasia',
                    notes: 'Przygotować catering.',
                    attendeesLimit: 40,
                },
                {
                    id: 2,
                    name: 'Webinar Vue 3',
                    description: 'Szkolenie online z Vue 3.',
                    date: '2025-09-10',
                    location: 'Online',
                    attendees: ['Emil', 'Filip'],
                    status: 'DONE',
                    responsiblePerson: 'Marta',
                    notes: 'Wysłać przypomnienia.',
                    attendeesLimit: 55,
                },
            ];
        },
    },
});