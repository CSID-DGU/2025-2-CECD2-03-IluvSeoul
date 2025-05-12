<template>
    <div class="col-md-3">
        <div class="list-group">
            <a href="javascript:void(0);"
               v-for="category in categories"
               :key="category.id"
               class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
               :class="{ active: isActive(category.id) }"
               @click.prevent="clickCategory(category.id)">
                {{ category.name }}
                <span class="badge bg-primary rounded-pill">{{ getCategoryCount(category) }}</span>
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

// store, router setup
const store = useStore();
const router = useRouter();

// 반응형 데이터
const inquiries = computed(() => store.getters.getInquiries);
const categories = computed(() => store.getters.getCategories);

// 현재 카테고리 가져오기
const currentCategory = computed(() => store.getters.getCategory);

// 카테고리 버튼 활성화 여부
const isActive = (category: number) => {
    return currentCategory.value === category;
};

// 카테고리 클릭 시 처리
const clickCategory = (category: number) => {
    store.commit('setCategory', category);
    router.push({ name: 'inquiryList' });
};

// 카테고리별 문의 수 카운트
const getCategoryCount = (category: number) => {
    return category === 0
        ? inquiries.value.length
        : inquiries.value.filter(e => e.category_id === category).length;
};
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