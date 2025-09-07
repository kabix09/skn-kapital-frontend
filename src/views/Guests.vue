<template>
    <div class="members-page flex flex-col h-full">
      <div class="overflow-auto">
        <GuestsList />
      </div>
    </div>
</template>

<script>
import GuestsList from '@/components/Members/GuestsList.vue';

export default {
    components: {
        GuestsList
    }
};
</script>
