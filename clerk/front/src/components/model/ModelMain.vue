<template>
    <div class="mt-4">
        <router-view/>
    </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {useStore} from "vuex";
const $store = useStore()
onMounted(() => {
    $store.dispatch('fetchTags')
    $store.dispatch('fetchDepartments')
    $store.dispatch('fetchDepartmentGroups')
    $store.dispatch('fetchDepartmentTags')
})

</script>

<style scoped>

</style>