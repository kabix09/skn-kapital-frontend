import { defineStore } from 'pinia';

export const useStaffStore = defineStore('staff', {
    id: 'staff',
    state: () => ({
        staff: [],
        count: 0,
        loading: false,
        error: null,
        staffStatuses: [
            { label: 'Aktywny', value: 'ACTIVE' },
            { label: 'Zawieszony', value: 'SUSPENDED' },
            { label: 'Nieaktywny', value: 'INACTIVE' }
        ]
    }),
    getters: {
        getStaff: (state) => state.staff,
        getStaffStatuses: (state) => state.staffStatuses,
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
    },
    actions: {
        async fetchStaff(staffId) {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetch('/api/staff/{id}');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.staff = data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async createStaff(staffId, payload) {
            this.loading = true;
            this.error = null;
            try {
                console.log('Payload do wysłania:', staffId, JSON.stringify(payload))

                const response = await fetch('/api/staff/{id}', {
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
                this.guests.push(data);
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async editStaff(index, editedStaff) {
            this.staff[index] = editedStaff;
            // TODO add request to update task on server
            // try {
            //     console.log('Payload do wysłania:', eventId, JSON.stringify(payload))

            //     const response = await fetch('/api/guest/{id}/', {
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
        },
        async mockStaff() {
            // staff assigned to events
            this.staff = [
                {
                    id: 1000,
                    name: 'James',
                    surename: 'Butt',
                    full_name: 'James Butt',
                    student_email: 'james.butt@student.ue.poznan.pl',
                    leader: 'Bruno Mars',
                    added_by: 'admin',
                    status: 'ACTIVE',
                },
                {
                    id: 1001,
                    name: 'Josephine',
                    surename: 'Darakjy',
                    full_name: 'Josephine Darakjy',
                    student_email: 'josephine.darakjy@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'ACTIVE',
                },
                {
                    id: 1002,
                    name: 'Art',
                    surename: 'Venere',
                    full_name: 'Art Venere',
                    student_email: 'art.venere@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'ACTIVE',
                },
                {
                    id: 1003,
                    name: 'Lenna',
                    surename: 'Paprocki',
                    full_name: 'Lenna Paprocki',
                    student_email: 'lenna.paprocki@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'ACTIVE',
                },
                {
                    id: 1008,
                    name: 'Sage',
                    surename: 'Wieser',
                    full_name: 'Sage Wieser',
                    student_email: 'sage.wieser@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'ACTIVE',
                },
                {
                    id: 1009,
                    name: 'Kris',
                    surename: 'Marrier',
                    full_name: 'Kris Marrier',
                    student_email: 'kris.marrier@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'SUSPENDED',
                },
                {
                    id: 1010,
                    name: 'Minna',
                    surename: 'Amigon',
                    full_name: 'Minna Amigon',
                    student_email: 'minna.amigon@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'ACTIVE',
                },
                {
                    id: 1011,
                    name: 'Abel',
                    surename: 'Maclead',
                    full_name: 'Abel Maclead',
                    student_email: 'abel.maclead@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'SUSPENDED',
                },
                {
                    id: 1012,
                    name: 'Sage',
                    surename: 'Wieser',
                    full_name: 'Sage Wieser',
                    student_email: 'sage.wieser@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'SUSPENDED',
                },
                {
                    id: 1013,
                    name: 'Kris',
                    surename: 'Marrier',
                    full_name: 'Kris Marrier',
                    student_email: 'kris.marrier@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'INACTIVE',
                },
                {
                    id: 1014,
                    name: 'Minna',
                    surename: 'Amigon',
                    full_name: 'Minna Amigon',
                    student_email: 'minna.amigon@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'ACTIVE',
                },
                {
                    id: 1015,
                    name: 'Abel',
                    surename: 'Maclead',
                    full_name: 'Abel Maclead',
                    student_email: 'abel.maclead@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'INACTIVE',
                },
                {
                    id: 1016,
                    name: 'Sage',
                    surename: 'Wieser',
                    full_name: 'Sage Wieser',
                    student_email: 'sage.wieser@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'INACTIVE',
                },
                {
                    id: 1017,
                    name: 'Kris',
                    surename: 'Marrier',
                    full_name: 'Kris Marrier',
                    student_email: 'kris.marrier@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'INACTIVE',
                },
                {
                    id: 1018,
                    name: 'Minna',
                    surename: 'Amigon',
                    full_name: 'Minna Amigon',
                    student_email: 'minna.amigon@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'SUSPENDED',
                },
                {
                    id: 1019,
                    name: 'Abel',
                    surename: 'Maclead',
                    full_name: 'Abel Maclead',
                    student_email: 'abel.maclead@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'ACTIVE',
                },
                {
                    id: 1020,
                    name: 'Sage',
                    surename: 'Wieser',
                    full_name: 'Sage Wieser',
                    student_email: 'sage.wieser@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'ACTIVE',
                },
                {
                    id: 1021,
                    name: 'Kris',
                    surename: 'Marrier',
                    full_name: 'Kris Marrier',
                    student_email: 'kris.marrier@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'SUSPENDED',
                },
                {
                    id: 1022,
                    name: 'Minna',
                    surename: 'Amigon',
                    full_name: 'Minna Amigon',
                    student_email: 'minna.amigon@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'SUSPENDED',
                },
                {
                    id: 1023,
                    name: 'Abel',
                    surename: 'Maclead',
                    full_name: 'Abel Maclead',
                    student_email: 'abel.maclead@university.edu',
                    leader: null,
                    added_by: null,
                    status: 'INACTIVE',
                }
            ];

        }
    },
});