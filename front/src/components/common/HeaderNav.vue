<template>
    <nav class="navbar navbar-light bg-white shadow-sm">
        <div class="container-fluid">
            <span class="navbar-brand">문의 관리</span>
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

<script>
import InquiryService from '@/service/inquiry'
export default {
    name: 'HeaderNav',
    data() {
        return {
            inquiries: InquiryService.getList()
        }
    }
}
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