<template>
    <div class="row g-1">
<!--        <InquirySideNav/>-->
        <div class="col-12">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>문의ID</th>
                    <th>문의 제목</th>
                    <th>담당 부서</th>
                    <th>접수일</th>
                    <th>처리 기간</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="inquiries.length > 0" v-for="inquiry in inquiries" :key="inquiry.id"
                    @click="selectInquiry(inquiry.id)">
                    <td>{{ inquiry.id }}</td>
                    <td>{{ inquiry.title }}</td>
                    <td>{{ departmentMap[inquiry.department_id].name }}</td>
                    <td><Date :date="inquiry.create_at"/></td>
                    <td><Date :date="inquiry.limit_at"/></td>
                </tr>
                <tr v-else v-for="i in 5" :key="i">
                    <td class="placeholder-glow"><span class="placeholder col-12"></span></td>
                    <td class="placeholder-glow"><span class="placeholder col-12"></span></td>
                    <td class="placeholder-glow"><span class="placeholder col-12"></span></td>
                    <td class="placeholder-glow"><span class="placeholder col-12"></span></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useStore} from "vuex";
import Inquiry from "@/data/inquiry/inquiry";
import {useRouter} from "vue-router";
import Date from "@/components/common/Date.vue";
import InquirySideNav from "@/components/inquiry/InquirySideNav.vue";

const $store = useStore();
const $router = useRouter();

const selectedDepartment = computed(() => $store.getters.getDepartment)
const inquiries = computed(() => $store.getters.getInquiries.filter((e: Inquiry) => selectedDepartment.value === 0 || e.department_id === selectedDepartment.value))
const departmentMap = computed(() => $store.getters.getDepartmentMap);

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