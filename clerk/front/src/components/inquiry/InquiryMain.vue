<template>
    <div class="row g-1">
        <InquirySideNav/>
        <div class="col-md-9">
            <router-view/>
        </div>
    </div>
</template>
<script setup lang="ts">
import InquirySideNav from "@/components/inquiry/InquirySideNav.vue";
import {onMounted} from "vue";
import {useStore} from "vuex";
const $store = useStore()
onMounted(() => {
    $store.dispatch('fetchTags')
    $store.dispatch('fetchDepartments')
    $store.dispatch('fetchInquiries')
})

</script>
