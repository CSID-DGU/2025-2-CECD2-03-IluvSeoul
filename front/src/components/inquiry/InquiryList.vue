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
        <tr v-for="inquiry in filteredInquiries" :key="inquiry.id"
            @click="$emit('select-inquiry', inquiry)">
            <td>{{ inquiry.id }}</td>
            <td>{{ inquiry.title }}</td>
            <td>
            <span class="badge" :class="inquiry.resolved ? 'bg-success' : 'bg-danger'">
              {{ inquiry.resolved ? '해결' : '미해결' }}
            </span>
            </td>
            <td>{{ inquiry.time }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import InquiryService from "@/service/inquiry";
export default {
    name: 'InquiryList',
    data() {
        return {
            filteredInquiries: []
        }
    },
    methods: {
        fetchInquiries(category) {
            this.filteredInquiries = InquiryService.getList().filter(
                e => e.category === category
            );
        }
    },
    mounted() {
        this.fetchInquiries(this.currentCategory);
    },
    computed: {
        currentCategory() {
            return this.$store.state.inquiry.current;
        }
    },
    watch: {
        currentCategory(newVal) {
            this.fetchInquiries(newVal);
        }
    }
}
</script>

<style scoped>

</style>