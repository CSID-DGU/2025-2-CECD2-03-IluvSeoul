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
        <tr v-if="inquiries.length > 0" v-for="inquiry in inquiries" :key="inquiry.id"
            @click="selectInquiry(inquiry.id)">
            <td>{{ inquiry.id }}</td>
            <td>{{ inquiry.title }}</td>
            <td>
            <span class="badge" :class="inquiry.resolved ? 'bg-success' : 'bg-danger'">
              {{ inquiry.resolved ? '해결' : '미해결' }}
            </span>
            </td>
            <td>{{ inquiry.create_at }}</td>
        </tr>
        <tr v-else v-for="i in 5" :key="i">
            <td class="placeholder-glow"><span class="placeholder col-12"></span></td>
            <td class="placeholder-glow"><span class="placeholder col-12"></span></td>
            <td class="placeholder-glow"><span class="placeholder col-12"></span></td>
            <td class="placeholder-glow"><span class="placeholder col-12"></span></td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useStore} from "vuex";
import Inquiry from "@/data/inquiry/inquiry";
import {useRouter} from "vue-router";

const $store = useStore();
const $router = useRouter();

const selectedCategory = computed(() => $store.getters.getCategory)
const inquiries = computed(() => $store.getters.getInquiries.filter((e: Inquiry) => selectedCategory.value === 0 || e.category_id === selectedCategory.value))

const selectInquiry = (inquiry_id: number) => {
    $store.commit('setInquiry', inquiry_id);
    $router.push({
        name: 'inquiryDetail',
        params: {
            id: inquiry_id
        }
    })
}
</script>

<style scoped>

</style>