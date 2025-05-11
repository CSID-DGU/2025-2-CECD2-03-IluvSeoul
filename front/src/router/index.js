import {createRouter, createWebHistory} from 'vue-router';

// Inquiry
import InquiryList from "@/components/inquiry/InquiryList.vue";

const routes = [
    {
        path: '/inquiry/list', component: InquiryList, name: 'inquiryList'
    }
    // new Routes('/inquiry/list', InquiryList).toRoute()
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
