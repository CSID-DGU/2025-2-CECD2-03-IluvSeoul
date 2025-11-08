<template>
    <div class="container-lg">
        <router-view/>
    </div>
</template>
<script setup lang="ts">
import {onMounted} from "vue";
import {useStore} from "vuex";
const $store = useStore()
onMounted(() => {
    $store.dispatch('fetchTags')
    $store.dispatch('fetchDepartments')
    $store.dispatch('fetchInquiries')
})

</script>
