<template>
    <div class="members-page flex flex-col h-full">
      <div class="overflow-auto">
        <StaffList />
      </div>
    </div>
</template>

<script>
import StaffList from '@/components/Members/StaffList.vue';

export default {
    components: {
        StaffList
    }
};
</script>