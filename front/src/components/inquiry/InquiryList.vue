<template>
    <table class="table table-hover">
        <thead>
        <tr>
            <th>문의ID</th>
            <th>문의 제목</th>
            <th>해결 여부</th>
            <th>시간</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="inquiry in inquiries" :key="inquiry.id"
            @click="$emit('select-inquiry', inquiry)">
            <td>{{ inquiry.id }}</td>
            <td>{{ inquiry.title }}</td>
            <td>
            <span class="badge" :class="inquiry.resolved ? 'bg-success' : 'bg-danger'">
              {{ inquiry.resolved ? '해결' : '미해결' }}
            </span>
            </td>
            <td>{{ inquiry.create_at }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useStore} from "vuex";

const store = useStore();

const inquiries = computed(() => store.getters.getInquiries)
// const currentCategory = computed(() => store.getters.getCategory);



</script>

<style scoped>

</style>