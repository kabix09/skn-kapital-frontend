import { defineStore } from 'pinia';
import api from "@/axios";

export const useMembersStore = defineStore('members', {
    id: 'members',
    state: () => ({
        members: [],
        count: 0,
        loading: false,
        error: null,
    }),
    getters: {
        getMembers: (state) => state.members,
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
    },
    actions: {
        async fetchMembers() {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get(`/api/User/Members`);
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                console.log(response.data)
                const data = await response.data;
                this.members = data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
    },
});