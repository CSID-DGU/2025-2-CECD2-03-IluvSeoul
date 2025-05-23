<template>
    <div v-if="inquiry !== undefined" class="inquiry-detail">
        <div class="inquiry-header">
            <h4>{{ inquiry.title }}</h4>
            <span class="badge" :class="inquiry.resolved ? 'bg-success' : 'bg-danger'">
                  {{ inquiry.resolved ? '해결' : '미해결' }}
                </span>
        </div>

        <div class="chat-container" v-if="inquiry.messages !== null">
            <div v-for="(message, index) in inquiry.messages" :key="index"
                 class="message" :class="message.sender_type">
                <div class="message-header">
                    <strong>{{ message.sender_id }}</strong>
                    <small>{{ message.create_at }}</small>
                </div>
                <template v-if="message.sender_type === 'requester'">
                    <div class="message-summary">{{ message.summary }}</div>
                    <div class="message-content">{{ message.content }}</div>
                </template>
                <template v-else>
                    <div class="message-content">{{ message.content }}</div>
                </template>
            </div>
        </div>

        <div class="attachments-section" v-if="inquiry.attachments !== null">
            <h5>첨부 파일</h5>
            <div class="attachment-list">
                <div v-for="(file, index) in inquiry.attachments" :key="index"
                     class="attachment-item">
                    <i class="bi bi-file-earmark"></i>
                    <span>{{ file.name }}</span>
                    <small>({{ file.path }})</small>
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
    <div v-else>

    </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import Inquiry from "@/data/inquiry/inquiry";
import {InquiryService} from "@/service/inquiry";
import {useRoute} from "vue-router";
import {TypeUtil} from "@/util/type.util";

const $store = useStore();
const $route = useRoute();

const selectedInquiryId = parseInt(TypeUtil.toArray($route.params.id)[0]);

const inquiry = ref<Inquiry>();
const replyText = ref<string>();

onMounted(async () => {
    inquiry.value = await InquiryService.detail(selectedInquiryId)
})
</script>

<style scoped>


.inquiry-detail {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.inquiry-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.chat-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
}

.message {
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 8px;
}

.message.requester {
    align-self: flex-start;
    background-color: #f0f2f5;
}

.message.responder {
    align-self: flex-end;
    background-color: #e3f2fd;
}

.message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 0.9em;
}

.message-content {
    white-space: pre-wrap;
}

.attachments-section {
    margin: 20px 0;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
}

.attachment-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.attachment-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    background: white;
    border-radius: 4px;
    border: 1px solid #dee2e6;
}

.reply-section {
    margin-top: 20px;
}

.reply-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

.table tbody tr {
    cursor: pointer;
}

.table tbody tr:hover {
    background-color: #f5f5f5;
}
</style>