<template>
    <HeaderNav/>
    <div class="container-fluid">
        <router-view/>
    </div>
</template>

<script setup lang="ts">
import HeaderNav from "@/components/common/HeaderNav.vue";
</script>
