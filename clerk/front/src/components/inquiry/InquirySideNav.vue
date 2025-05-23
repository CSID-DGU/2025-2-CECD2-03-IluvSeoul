<template>
    <div class="col-md-3">
        <div class="list-group">
            <a href="javascript:void(0);"
               v-if="categories.length > 0"
               v-for="category in categories"
               :key="category.id"
               class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
               :class="{ active: isActive(category.id) }"
               @click.prevent="clickCategory(category.id)">
                {{ category.name }}
                <span class="badge bg-primary rounded-pill">{{ getCategoryCount(category.id) }}</span>
            </a>
            <a v-else
               v-for="i in 3"
               class="list-group-item list-group-item-action d-flex justify-content-between align-items-center placeholder-glow">
                <span class="placeholder col-12"></span>
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

const $store = useStore();
const $router = useRouter();

const inquiries = computed(() => $store.getters.getInquiries);
const categories = computed(() => $store.getters.getCategories);

const currentCategory = computed(() => $store.getters.getCategory);

const isActive = (category: number) => {
    return currentCategory.value === category;
};

const clickCategory = (category: number) => {
    $store.commit('setCategory', category);
    $router.push({ name: 'inquiryList' });
};

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