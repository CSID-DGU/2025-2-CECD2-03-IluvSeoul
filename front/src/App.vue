<template>
    <HeaderNav/>
    <div class="container-fluid">
        <div class="row g-1">
            <SideNav/>
            <div class="col-md-9"><router-view/></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import HeaderNav from "@/components/common/HeaderNav.vue";
import SideNav from "@/components/inquiry/SideNav.vue";
import {useStore} from "vuex";
const store = useStore()
onMounted(() => {
    store.dispatch('fetchCategories')
    store.dispatch('fetchInquiries')
})
</script>
