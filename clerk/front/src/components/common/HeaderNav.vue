<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container-fluid">
            <a class="navbar-brand" href="/inquiry">문의 관리</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link" href="/model/department">부서 관리</a>
                </div>
            </div>
            <div class="opened-inquiries">
                <div v-for="inquiry in inquiries.filter(i => !i.resolved)" :key="inquiry.id" class="inquiry-item">
                    <div class="inquiry-content">
                        <span class="inquiry-title">{{ inquiry.title }}</span>
                        <small class="inquiry-time">{{ inquiry.time }}</small>
                    </div>
                    <button class="btn-close" aria-label="Close"></button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import Inquiry from "@/data/inquiry/inquiry";

const inquiries = ref<Array<Inquiry>>([]);
</script>

<style scoped>
.opened-inquiries {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 0 10px;
}

.inquiry-item {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 4px 8px;
    white-space: nowrap;
}

.inquiry-content {
    display: flex;
    flex-direction: column;
}

.inquiry-title {
    font-size: 14px;
    color: #212529;
}

.inquiry-time {
    font-size: 12px;
    color: #6c757d;
}

.btn-close {
    padding: 4px;
    font-size: 10px;
}
</style>