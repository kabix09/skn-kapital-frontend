<template>
    <div class="flex-1 overflow-y-auto min-h-0 border-t border-gray-200">
        <DataTable
            scrollable scrollHeight="100%"
            v-model:editingRows="editingRows" 
            :value="products" 
            editMode="row" 
            dataKey="id" 
            stripedRows 
            @row-edit-save="onRowEditSave"
            :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                    bodycell: ({ state }) => ({
                        style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
                    })
                }
            }"
        >    
            <Column field="id" header="Id" style="width: 5%"></Column>

            <Column field="name" header="Zadanie" style="width: 30%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" fluid />
                </template>
            </Column>

            <Column field="person" header="Osoba odp." style="width: 15%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" fluid />
                </template>
            </Column>

            <Column field="date" header="Deadline" style="width: 15%" :editor="true">
                <template #body="{ data }">
                    {{ formatDate(data.date) }}
                </template>
                <template #editor="{ data, field }">
                    <Calendar 
                        v-model="data[field]" 
                        dateFormat="mm/dd/yy" 
                        placeholder="mm/dd/yyyy" 
                        showIcon 
                        showButtonBar 
                    />
                </template>
            </Column>

            <Column field="status" header="Status" style="width: 10%">
                <template #editor="{ data, field }">
                    <Select v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                        </template>
                    </Select>
                </template>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                </template>
            </Column>

            <Column :rowEditor="true" style="width: 5%; min-width: 2rem" bodyStyle="text-align:center"></Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { getStatusLabel } from '@/utils/statusUtils'

export default {
    data() {
        return {
            products: null,
            editingRows: [],
            statuses: [
                { label: 'Zakończone', value: 'DONE' },
                { label: 'W trakcie', value: 'IN_PROGRESS' },
                { label: 'Zaplanowane', value: 'PLANNED' }
            ]
        };
    },
    mounted() {
        this.products = [
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
        ]
    },
    methods: {
        getStatusLabel,
        formatDate(value) {
            if (!value) return '';
            const date = new Date(value);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        onRowEditSave(event) {
            let { newData, index } = event;

            this.products[index] = newData;
        },
        getStatusLabel,
        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        }
    }
};
</script>
