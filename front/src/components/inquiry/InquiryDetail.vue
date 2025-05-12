<template>

    <div class="inquiry-detail">
        <div class="inquiry-header">
            <h4>{{ selectedInquiry.title }}</h4>
            <span class="badge" :class="selectedInquiry.resolved ? 'bg-success' : 'bg-danger'">
                  {{ selectedInquiry.resolved ? '해결' : '미해결' }}
                </span>
        </div>

        <div class="chat-container">
            <div v-for="(message, index) in selectedInquiry.messages" :key="index"
                 class="message" :class="message.type">
                <div class="message-header">
                    <strong>{{ message.sender }}</strong>
                    <small>{{ message.time }}</small>
                </div>
                <template v-if="message.type === 'inquiry'">
                    <div class="message-title">{{ message.title }}</div>
                    <div class="message-summary">{{ message.summary }}</div>
                    <div class="message-content">{{ message.content }}</div>
                </template>
                <template v-else>
                    <div class="message-content">{{ message.content }}</div>
                </template>
            </div>
        </div>

        <div class="attachments-section">
            <h5>첨부 파일</h5>
            <div class="attachment-list">
                <div v-for="(file, index) in selectedInquiry.attachments" :key="index"
                     class="attachment-item">
                    <i class="bi bi-file-earmark"></i>
                    <span>{{ file.name }}</span>
                    <small>({{ file.size }})</small>
                    <button class="btn btn-sm btn-outline-primary">다운로드</button>
                </div>
            </div>
        </div>

        <div class="reply-section">
        <textarea class="form-control" v-model="replyText"
                  placeholder="답변을 입력하세요..."></textarea>
            <div class="reply-actions">
                <button class="btn btn-primary">답변 보내기</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>

</style>