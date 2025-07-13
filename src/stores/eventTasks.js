import { defineStore } from 'pinia';

export const useEventTasksStore = defineStore('eventTasks', {
    id: 'eventTasks',
    state: () => ({
        eventTasks: [],
        count: 0,
        loading: false,
        error: null,
        eventTaskStatuses: [
            { label: 'Zakończone', value: 'DONE' },
            { label: 'W trakcie', value: 'IN_PROGRESS' },
            { label: 'Zaplanowane', value: 'PLANNED' }
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
                const response = await fetch('/api/event/{id}/tasks');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.eventTasks = data;
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
                console.log('Payload do wysłania:', eventId, JSON.stringify(payload))

                const response = await fetch('/api/event/{id}/task/{taskId}', {
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
                this.eventTasks.push(data);
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async editTask(eventId, index, editedTask) {
            this.eventTasks[index] = editedTask;
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
        },
        async mockEventTasks() {
            this.eventTasks =  [
                {
                    id: '1000',
                    code: 'f230fh0g3',
                    name: 'Bamboo Watch',
                    person: 'John Doe',
                    description: 'Product Description',
                    image: 'bamboo-watch.jpg',
                    price: 65,
                    category: 'Accessories',
                    quantity: 24,
                    status: 'PLANNED',
                    date: '2015-09-13',
                    rating: 5
                },
                {
                    id: '1001',
                    code: 'nvklal433',
                    name: 'Black Watch',
                    person: 'Jane Smith',
                    description: 'Product Description',
                    image: 'black-watch.jpg',
                    price: 72,
                    category: 'Accessories',
                    quantity: 61,
                    status: 'DONE',
                    date: '2015-09-13',
                    rating: 4
                },
                {
                    id: '1002',
                    code: 'zz21cz3c1',
                    name: 'Blue Band',
                    person: 'Alice Johnson',
                    description: 'Product Description',
                    image: 'blue-band.jpg',
                    price: 79,
                    category: 'Fitness',
                    quantity: 2,
                    status: 'IN_PROGRESS',
                    date: '2015-09-13',
                    rating: 3
                },
                {
                    id: '1003',
                    code: '244wgerg2',
                    name: 'Red Watch',
                    person: 'Bob Brown',
                    description: 'Product Description',
                    image: 'red-watch.jpg',
                    price: 89,
                    category: 'Accessories',
                    quantity: 0,
                    status: 'IN_PROGRESS',
                    date: '2015-09-13',
                    rating: 5
                },{
                    id: '1004',
                    code: 'nvklal433',
                    name: 'Black Watch',
                    person: 'Jane Smith',
                    description: 'Product Description',
                    image: 'black-watch.jpg',
                    price: 72,
                    category: 'Accessories',
                    quantity: 61,
                    status: 'DONE',
                    date: '2015-09-13',
                    rating: 4
                },
                {
                    id: '1005',
                    code: 'zz21cz3c1',
                    name: 'Blue Band',
                    person: 'Alice Johnson',
                    description: 'Product Description',
                    image: 'blue-band.jpg',
                    price: 79,
                    category: 'Fitness',
                    quantity: 2,
                    status: 'IN_PROGRESS',
                    date: '2015-09-13',
                    rating: 3
                },
                {
                    id: '1006',
                    code: '244wgerg2',
                    name: 'Red Watch',
                    person: 'Bob Brown',
                    description: 'Product Description',
                    image: 'red-watch.jpg',
                    price: 89,
                    category: 'Accessories',
                    quantity: 0,
                    status: 'IN_PROGRESS',
                    date: '2015-09-13',
                    rating: 5
                },{
                    id: '1007',
                    code: 'nvklal433',
                    name: 'Black Watch',
                    person: 'Jane Smith',
                    description: 'Product Description',
                    image: 'black-watch.jpg',
                    price: 72,
                    category: 'Accessories',
                    quantity: 61,
                    status: 'DONE',
                    date: '2015-09-13',
                    rating: 4
                },
                {
                    id: '1008',
                    code: 'zz21cz3c1',
                    name: 'Blue Band',
                    person: 'Alice Johnson',
                    description: 'Product Description',
                    image: 'blue-band.jpg',
                    price: 79,
                    category: 'Fitness',
                    quantity: 2,
                    status: 'IN_PROGRESS',
                    date: '2015-09-13',
                    rating: 3
                },
                {
                    id: '1009',
                    code: '244wgerg2',
                    name: 'Red Watch',
                    person: 'Bob Brown',
                    description: 'Product Description',
                    image: 'red-watch.jpg',
                    price: 89,
                    category: 'Accessories',
                    quantity: 0,
                    status: 'IN_PROGRESS',
                    date: '2015-09-13',
                    rating: 5
                }
            ];
        }
    },
});