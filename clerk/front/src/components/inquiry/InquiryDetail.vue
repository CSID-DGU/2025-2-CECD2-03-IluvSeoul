<template>
    <div v-if="inquiry !== undefined" class="inquiry-detail row">
        <div class="col-9">
            <div class="d-flex mb-3">
                <div class="p-2 me-auto">
                    <h4>{{ inquiry.title }}</h4>
                </div>
<!--                <div class="p-2">-->
<!--                    <span class="badge" :class="inquiry.resolved ? 'bg-success' : 'bg-danger'">-->
<!--                          {{ inquiry.resolved ? '해결' : '미해결' }}-->
<!--                    </span>-->
<!--                </div>-->
                <div class="p-2">
                    <span class="p-2 badge bg-primary" v-if="inquiry.department_id > 0">
                          {{ DepartmentMap[inquiry.department_id].name }}
                    </span>
                </div>
            </div>

            <h5>민원인</h5>
            <p>{{ inquiry.inquiry_user }}</p>
            <hr/>
            <h5>연락처</h5>
            <p>{{ inquiry.inquiry_phone }}</p>
            <hr/>
            <h6>민원 내용</h6>
            <p>{{ inquiry.inquiry_message }}</p>

            <div class="reply-section">
    <!--            <textarea class="form-control" v-model="replyText"-->
    <!--                      placeholder="답변을 입력하세요..."></textarea>-->
                <div class="reply-actions">
                    <button class="btn btn-primary">배정</button>
                </div>
            </div>
        </div>
        <div class="col-3">
            <div class="tag-section" v-if="inquiry.tags !== null">
                <h5>태그</h5>
                <div class="tag-list">
                    <span class="badge text-bg-info m-1" v-for="tag in inquiry.tags">#{{ TagMap[tag.tag_id].name }}</span>
                </div>
            </div>

            <div class="department-section pt-3" v-if="inquiry.department_id === 0 && inquiry.suggest_departments != null">
                <h5>추천 부서</h5>
                <div class="department-group">
                    <template v-for="suggest_department in inquiry.suggest_departments">
                        <div class="d-flex justify-content-between mb-3">
                            <div class="p-2 bd-highlight">{{ DepartmentMap[suggest_department.suggest_department_id].name }}</div>
                            <a class="btn btn-link p-2 bd-highlight" @click="handleDepartmentSelect(suggest_department.suggest_department_id)">선택</a>
                        </div>
                        <hr/>
                    </template>
                    <div class="d-flex justify-content-between mb-3">
                        <div class="p-2 bd-highlight">
                            <select v-model="selectedDepartmentId" class="form-select">
                                <option value="0">부서 선택</option>
                                <template v-for="department in DepartmentMap">
                                    <option
                                        v-if="department.id !== 0 && inquiry.suggest_departments.filter(e => e.suggest_department_id === department.id).length === 0"
                                        :value="department.id"
                                    >
                                        {{ department.name }}
                                    </option>
                                </template>
                            </select>
                        </div>
                        <a class="btn btn-link p-2 bd-highlight" v-if="selectedDepartmentId > 0" @click="handleDepartmentSelect(selectedDepartmentId)">선택</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>

    </div>
</template>

<script lang="ts" setup>
import Date from "@/components/common/Date.vue";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import Inquiry from "@/data/inquiry/inquiry";
import {InquiryService} from "@/service/inquiry";
import {useRoute} from "vue-router";
import {TypeUtil} from "@/util/type.util";

const $store = useStore();
const $route = useRoute();

const selectedInquiryId = parseInt(TypeUtil.toArray($route.params.id)[0] || '0');
const selectedDepartmentId = ref<string>(0);

const inquiry = ref<Inquiry>();
const replyText = ref<string>();

const TagMap = computed(() => $store.getters.getTagMap);
const DepartmentMap = computed(() => $store.getters.getDepartmentMap);

onMounted(async () => {
    inquiry.value = await InquiryService.detail(selectedInquiryId)
})

const handleDepartmentSelect = async (departmentId: number) => {
    if (!departmentId) return;

    try {
        inquiry.value = await InquiryService.assign(selectedInquiryId, departmentId);
    } catch (error) {
        console.error(error);
    }
};

</script>

<style scoped>


.inquiry-detail {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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