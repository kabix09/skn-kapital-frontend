import { defineStore } from 'pinia';
import api from "@/axios";

export const useEventTasksStore = defineStore('eventTasks', {
    id: 'eventTasks',
    state: () => ({
        eventTasks: [],
        count: 0,
        loading: false,
        error: null,
        eventTaskStatuses: [
            { value: 'Done' },
            { value: 'InProgress' },
            { value: 'Planned' },
            { value: 'Canceled' },
        ]
    }),
    getters: {
        getEventTasks: (state) => state.eventTasks,
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
    },
    actions: {
        async fetchEventTasks(eventId) {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get(`/api/Event/${eventId}/EventTask`);

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                this.eventTasks = await response.data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async createEventTask(eventId, payload) {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.post(`/api/Event/${eventId}/EventTask`, payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
                
                const data = response.data;

                if (data.id) {
                    // Pobieramy pełne dane nowego zadania
                    const detailResponse = await api.get(`/api/Event/${eventId}/EventTask/${data.id}`);

                    this.eventTasks.push(detailResponse.data);
                }
            } catch (error) {
                console.error(error);
                this.error = error.response?.data || error.message || 'Błąd sieci';
            } finally {
                this.loading = false;
            }
        },
        async editTask(eventId, taskId, index, payload) {
            // this.eventTasks[index] = editedTask;
            // TODO add request to update task on server
            // try {
            //     console.log('Payload do wysłania:', eventId, JSON.stringify(payload))

            //     const response = await fetch('/api/event/{id}/task/', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(editedTask),
            //     });

            //     if (!response.ok) {
            //         throw new Error('Network response was not ok');
            //     }
                
            //     this.eventTasks[index] = editedTask;
            // } catch (error) {
            //     this.error = error.message;
            // } finally {
            //     this.loading = false;
            // }
            this.loading = true;
            this.error = null;
            try {
                const response = await api.put(`/api/Event/${eventId}/EventTask/${taskId}`, payload, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.status === 200) {
                    // Pobieramy pełne dane nowego zadania

                    this.eventTasks[index] = response.data;
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