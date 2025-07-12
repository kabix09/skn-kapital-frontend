<template>
    <div class="flex flex-col h-full">
        <header class="h-12 shrink-0 flex items-center justify-between px-2">
            <span class="font-semibold" style="color: var(--dark);">
                Zapisanych: 39/{{ maxParticipants }}
            </span>

            <Button 
                label="Odśwież" 
                icon="pi pi-load" 
                size="small" 
                class="w-[100px] h-[30px]"
                @click="refreshParticipantsList"
            />
        </header>

        <div class="bg-white rounded-xl shadow-lg p-1 h-auto overflow-auto">
            <DataTable :value="members" size="small" stripedRows>
                <Column field="name" header="Name" sortable></Column>
                <Column field="email" header="Email" sortable></Column>
                <Column field="registrationDate" header="Registered At" sortable></Column>

                <Column header="" bodyClass="text-center">
                    <template #body="{ data }">
                        <router-link :to="`/members/${data.id}`" >
                            <span class="material-icons">visibility</span>
                        </router-link>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
  eventId: Number,
  maxParticipants: Number,
})

const members = [
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
]

function refreshParticipantsList() {
    console.log('Refreshing participants list for event ID:', props.eventId);
}
</script>