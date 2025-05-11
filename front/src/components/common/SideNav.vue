<template>
    <div class="col-md-3">
        <div class="list-group">
            <a href="javascript:void(0);"
               v-for="category in ['전체', '분류1', '분류2']"
               :key="category"
               class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
               :class="{ active: isActive(category) }"
               @click.prevent="clickCategory(category)">
                {{ category }}
                <span class="badge bg-primary rounded-pill">{{ getCategoryCount(category) }}</span>
            </a>
        </div>
    </div>
</template>

<script>
import InquiryService from '@/service/inquiry'
export default {
    name: 'SideNav',
    methods: {
        isActive(category) {
            return this.$store.state.inquiry.current === category
        },
        clickCategory(category) {
            this.$store.commit('setInquiryCurrent', category)
            this.$router.push({name: 'inquiryList'});
        },
        getCategoryCount(category) {
            return InquiryService.getList().filter(e => e.category === category).length
        }
    }
}
</script>

<style scoped>
.list-group {
    position: sticky;
    top: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.list-group-item.active {
    background-color: #0d6efd;
    border-color: #0d6efd;
}
</style>