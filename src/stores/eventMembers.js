import { defineStore } from 'pinia';

export const useEventMembersStore = defineStore('eventMembers', {
    id: 'eventMembers',
    state: () => ({
        eventMembers: [],
        count: 0,
        loading: false,
        error: null,
    }),
    getters: {
        getEventMembers: (state) => state.eventMembers,
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
    },
    actions: {
        async fetchEventMembers() {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetch('/api/event/{id}/members');
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
        async mockEventMembers() {
            this.eventMembers = [
                {
                    id: '1000',
                    name: 'John Doe',
                    email: 'jogn.doe@gmail.com',
                    phone: '+48 123 456 789',
                    registrationDate: '2023-10-01',
                },
                {
                    id: '1001',
                    name: 'Jane Smith',
                    email: 'jane.smith@gmail.com',
                    phone: '+48 987 654 321',
                    registrationDate: '2023-10-02',
                },
                {
                    id: '1002',
                    name: 'Alice Johnson',
                    email: 'alice.johnson@vp.pl',
                    phone: '+48 456 789 123',
                    registrationDate: '2023-10-03',
                },
                {
                    id: '1003',
                    name: 'Bob Brown',
                    email: 'bob.brown@onet.pl',
                    phone: '+48 321 654 987',
                    registrationDate: '2023-10-04',
                },
                {
                    id: '1000',
                    name: 'John Doe',
                    email: 'jogn.doe@gmail.com',
                    phone: '+48 123 456 789',
                    registrationDate: '2023-10-01',
                },
                {
                    id: '1001',
                    name: 'Jane Smith',
                    email: 'jane.smith@gmail.com',
                    phone: '+48 987 654 321',
                    registrationDate: '2023-10-02',
                },
                {
                    id: '1002',
                    name: 'Alice Johnson',
                    email: 'alice.johnson@vp.pl',
                    phone: '+48 456 789 123',
                    registrationDate: '2023-10-03',
                },
                {
                    id: '1003',
                    name: 'Bob Brown',
                    email: 'bob.brown@onet.pl',
                    phone: '+48 321 654 987',
                    registrationDate: '2023-10-04',
                },
                {
                    id: '1000',
                    name: 'John Doe',
                    email: 'jogn.doe@gmail.com',
                    phone: '+48 123 456 789',
                    registrationDate: '2023-10-01',
                },
                {
                    id: '1001',
                    name: 'Jane Smith',
                    email: 'jane.smith@gmail.com',
                    phone: '+48 987 654 321',
                    registrationDate: '2023-10-02',
                },
                {
                    id: '1002',
                    name: 'Alice Johnson',
                    email: 'alice.johnson@vp.pl',
                    phone: '+48 456 789 123',
                    registrationDate: '2023-10-03',
                },
                {
                    id: '1003',
                    name: 'Bob Brown',
                    email: 'bob.brown@onet.pl',
                    phone: '+48 321 654 987',
                    registrationDate: '2023-10-04',
                },
                {
                    id: '1000',
                    name: 'John Doe',
                    email: 'jogn.doe@gmail.com',
                    phone: '+48 123 456 789',
                    registrationDate: '2023-10-01',
                },
                {
                    id: '1003',
                    name: 'Bob Brown',
                    email: 'bob.brown@onet.pl',
                    phone: '+48 321 654 987',
                    registrationDate: '2023-10-04',
                },
                {
                    id: '1000',
                    name: 'John Doe',
                    email: 'jogn.doe@gmail.com',
                    phone: '+48 123 456 789',
                    registrationDate: '2023-10-01',
                },
                {
                    id: '1003',
                    name: 'Bob Brown',
                    email: 'bob.brown@onet.pl',
                    phone: '+48 321 654 987',
                    registrationDate: '2023-10-04',
                },
                {
                    id: '1000',
                    name: 'John Doe',
                    email: 'jogn.doe@gmail.com',
                    phone: '+48 123 456 789',
                    registrationDate: '2023-10-01',
                },
                {
                    id: '1003',
                    name: 'Bob Brown',
                    email: 'bob.brown@onet.pl',
                    phone: '+48 321 654 987',
                    registrationDate: '2023-10-04',
                },
                {
                    id: '1003',
                    name: 'Bob Brown',
                    email: 'bob.brown@onet.pl',
                    phone: '+48 321 654 987',
                    registrationDate: '2023-10-04',
                }
            ];
       },
    },
});