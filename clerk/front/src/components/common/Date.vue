<template>
    {{ formatEpoch(date) }}
</template>

<script lang="ts" setup>
import {defineProps} from 'vue';
const props = defineProps<{
    date: number  // epoch second
}>()

const formatEpoch = (epoch: number): string => {
    const date = new Date(epoch * 1000); // epoch second → millisecond
    return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).replace(/\./g, '-').replace(' ', ' ').replace(/- /g, '-');
};
</script>

<style scoped>

</style>