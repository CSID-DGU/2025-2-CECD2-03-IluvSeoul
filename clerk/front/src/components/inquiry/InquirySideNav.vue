<template>
    <div class="col-md-3">
        <div class="list-group">
            <a href="javascript:void(0);"
               v-if="departments.length > 0"
               v-for="department in departments"
               :key="department.id"
               class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
               :class="{ active: isActive(department.id) }"
               @click.prevent="clickDepartment(department.id)">
                {{ department.name }}
                <span class="badge bg-primary rounded-pill">{{ getDepartmentCount(department.id) }}</span>
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
const departments = computed(() => $store.getters.getDepartments);

const currentDepartment = computed(() => $store.getters.getDepartment);

const isActive = (department: number) => {
    return currentDepartment.value === department;
};

const clickDepartment = (department: number) => {
    $store.commit('setDepartment', department);
    $router.push({ name: 'inquiryList' });
};

const getDepartmentCount = (department: number) => {
    return department === 0
        ? inquiries.value.length
        : inquiries.value.filter(e => e.department_id === department).length;
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