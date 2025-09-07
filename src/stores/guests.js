import { defineStore } from 'pinia';

export const useGuestStore = defineStore('guests', {
    id: 'guests',
    state: () => ({
        guests: [],
        count: 0,
        loading: false,
        error: null,
    }),
    getters: {
        getGuests: (state) => state.guests,
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
    },
    actions: {
        async fetchGuests(guestId) {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetch('/api/guest/{id}');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.guests = data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async createGuest(guestId, payload) {
            this.loading = true;
            this.error = null;
            try {
                console.log('Payload do wysłania:', guestId, JSON.stringify(payload))

                const response = await fetch('/api/guest/{id}', {
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
        async editGuest(index, editedGuest) {
            this.guests[index] = editedGuest;
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
        async mockGuests() {
            // guests assigned to events
            this.guests =  [
                {
                    id: 1000,
                    name: 'James',
                    surename: 'Butt',
                    full_name: 'James Butt',
                    student_email: 'jakub.fiturski@student.ue.poznan.pl',
                    private_email: 'james.butt@gmail.com',
                    field_of_study: 'Computer Science',
                    event_participation_count: 17,
                    created_at: '2015-09-13',
                    status: 'unqualified'
                },
                {
                    id: 1001,
                    name: 'Josephine',
                    surename: 'Darakjy',
                    full_name: 'Josephine Darakjy',
                    student_email: 'josephine.darakjy@university.edu',
                    private_email: 'josephine.darakjy@gmail.com',
                    field_of_study: 'Law',
                    event_participation_count: 0,
                    created_at: '2019-02-09',
                    status: 'proposal'
                },
                {
                    id: 1002,
                    name: 'Art',
                    surename: 'Venere',
                    full_name: 'Art Venere',
                    student_email: 'art.venere@university.edu',
                    private_email: 'art.venere@gmail.com',
                    field_of_study: 'Economics',
                    event_participation_count: 63,
                    created_at: '2017-05-13',
                    status: 'qualified'
                },
                {
                    id: 1003,
                    name: 'Lenna',
                    surename: 'Paprocki',
                    full_name: 'Lenna Paprocki',
                    student_email: 'lenna.paprocki@university.edu',
                    private_email: 'lenna.paprocki@gmail.com',
                    field_of_study: 'Graphic Design',
                    event_participation_count: 37,
                    created_at: '2020-09-15',
                    status: 'new'
                },
                {
                    id: 1008,
                    name: 'Sage',
                    surename: 'Wieser',
                    full_name: 'Sage Wieser',
                    student_email: 'sage.wieser@university.edu',
                    private_email: 'sage.wieser@gmail.com',
                    field_of_study: 'Law',
                    event_participation_count: 76,
                    created_at: '2018-11-21',
                    status: 'unqualified'
                },
                {
                    id: 1009,
                    name: 'Kris',
                    surename: 'Marrier',
                    full_name: 'Kris Marrier',
                    student_email: 'kris.marrier@university.edu',
                    private_email: 'kris.marrier@gmail.com',
                    field_of_study: 'Business',
                    event_participation_count: 3,
                    created_at: '2015-07-07',
                    status: 'proposal'
                },
                {
                    id: 1010,
                    name: 'Minna',
                    surename: 'Amigon',
                    full_name: 'Minna Amigon',
                    student_email: 'minna.amigon@university.edu',
                    private_email: 'minna.amigon@gmail.com',
                    field_of_study: 'Mathematics',
                    event_participation_count: 38,
                    created_at: '2018-11-07',
                    status: 'qualified'
                },
                {
                    id: 1011,
                    name: 'Abel',
                    surename: 'Maclead',
                    full_name: 'Abel Maclead',
                    student_email: 'abel.maclead@university.edu',
                    private_email: 'abel.maclead@gmail.com',
                    field_of_study: 'Engineering',
                    event_participation_count: 87,
                    created_at: '2017-03-11',
                    status: 'qualified'
                },
                {
                    id: 1012,
                    name: 'Sage',
                    surename: 'Wieser',
                    full_name: 'Sage Wieser',
                    student_email: 'sage.wieser@university.edu',
                    private_email: 'sage.wieser@gmail.com',
                    field_of_study: 'Law',
                    event_participation_count: 76,
                    created_at: '2018-11-21',
                    status: 'unqualified'
                },
                {
                    id: 1013,
                    name: 'Kris',
                    surename: 'Marrier',
                    full_name: 'Kris Marrier',
                    student_email: 'kris.marrier@university.edu',
                    private_email: 'kris.marrier@gmail.com',
                    field_of_study: 'Business',
                    event_participation_count: 3,
                    created_at: '2015-07-07',
                    status: 'proposal'
                },
                {
                    id: 1014,
                    name: 'Minna',
                    surename: 'Amigon',
                    full_name: 'Minna Amigon',
                    student_email: 'minna.amigon@university.edu',
                    private_email: 'minna.amigon@gmail.com',
                    field_of_study: 'Mathematics',
                    event_participation_count: 38,
                    created_at: '2018-11-07',
                    status: 'qualified'
                },
                {
                    id: 1015,
                    name: 'Abel',
                    surename: 'Maclead',
                    full_name: 'Abel Maclead',
                    student_email: 'abel.maclead@university.edu',
                    private_email: 'abel.maclead@gmail.com',
                    field_of_study: 'Engineering',
                    event_participation_count: 87,
                    created_at: '2017-03-11',
                    status: 'qualified'
                },
                {
                    id: 1016,
                    name: 'Sage',
                    surename: 'Wieser',
                    full_name: 'Sage Wieser',
                    student_email: 'sage.wieser@university.edu',
                    private_email: 'sage.wieser@gmail.com',
                    field_of_study: 'Law',
                    event_participation_count: 76,
                    created_at: '2018-11-21',
                    status: 'unqualified'
                },
                {
                    id: 1017,
                    name: 'Kris',
                    surename: 'Marrier',
                    full_name: 'Kris Marrier',
                    student_email: 'kris.marrier@university.edu',
                    private_email: 'kris.marrier@gmail.com',
                    field_of_study: 'Business',
                    event_participation_count: 3,
                    created_at: '2015-07-07',
                    status: 'proposal'
                },
                {
                    id: 1018,
                    name: 'Minna',
                    surename: 'Amigon',
                    full_name: 'Minna Amigon',
                    student_email: 'minna.amigon@university.edu',
                    private_email: 'minna.amigon@gmail.com',
                    field_of_study: 'Mathematics',
                    event_participation_count: 38,
                    created_at: '2018-11-07',
                    status: 'qualified'
                },
                {
                    id: 1019,
                    name: 'Abel',
                    surename: 'Maclead',
                    full_name: 'Abel Maclead',
                    student_email: 'abel.maclead@university.edu',
                    private_email: 'abel.maclead@gmail.com',
                    field_of_study: 'Engineering',
                    event_participation_count: 87,
                    created_at: '2017-03-11',
                    status: 'qualified'
                },
                {
                    id: 1020,
                    name: 'Sage',
                    surename: 'Wieser',
                    full_name: 'Sage Wieser',
                    student_email: 'sage.wieser@university.edu',
                    private_email: 'sage.wieser@gmail.com',
                    field_of_study: 'Law',
                    event_participation_count: 76,
                    created_at: '2018-11-21',
                    status: 'unqualified'
                },
                {
                    id: 1021,
                    name: 'Kris',
                    surename: 'Marrier',
                    full_name: 'Kris Marrier',
                    student_email: 'kris.marrier@university.edu',
                    private_email: 'kris.marrier@gmail.com',
                    field_of_study: 'Business',
                    event_participation_count: 3,
                    created_at: '2015-07-07',
                    status: 'proposal'
                },
                {
                    id: 1022,
                    name: 'Minna',
                    surename: 'Amigon',
                    full_name: 'Minna Amigon',
                    student_email: 'minna.amigon@university.edu',
                    private_email: 'minna.amigon@gmail.com',
                    field_of_study: 'Mathematics',
                    event_participation_count: 38,
                    created_at: '2018-11-07',
                    status: 'qualified'
                },
                {
                    id: 1023,
                    name: 'Abel',
                    surename: 'Maclead',
                    full_name: 'Abel Maclead',
                    student_email: 'abel.maclead@university.edu',
                    private_email: 'abel.maclead@gmail.com',
                    field_of_study: 'Engineering',
                    event_participation_count: 87,
                    created_at: '2017-03-11',
                    status: 'qualified'
                }
            ];
        }
    },
});