<template>
    <div class="members-page flex flex-col h-full">
      <div class="overflow-auto">
        <ConsequencesList />
      </div>
    </div>
</template>
<script>
import ConsequencesList from '@/components/Members/ConsequencesList.vue';

export default {
    components: {
        ConsequencesList
    }
};
</script>
