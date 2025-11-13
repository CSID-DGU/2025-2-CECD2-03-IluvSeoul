<template>
    <div>
        <input type="text" class="form-control" v-model="user" placeholder="민원인">
        <input type="text" class="form-control" v-model="phone" placeholder="전화번호">
        <textarea class="form-control" v-model="message" placeholder="문의 내용"></textarea>
        <button type="button" class="btn btn-primary" @click="create">등록</button>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {InquiryService} from "@/service/inquiry";

const user = ref<string>('');
const phone = ref<string>('');
const message = ref<string>('');

const create = () => {
    console.log(user.value, phone.value, message.value)

    InquiryService.create(user.value, phone.value, message.value).then(res => {
        alert('성공')
        console.log(res)
    })
}
</script>

