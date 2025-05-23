import {createRouter, createWebHistory} from 'vue-router';

// Inquiry
import InquiryList from "@/components/inquiry/InquiryList.vue";
import InquiryMain from "@/components/inquiry/InquiryMain.vue";
import InquiryDetail from "@/components/inquiry/InquiryDetail.vue";

const routes = [
    {
        path: '/inquiry',
        component: InquiryMain,
        children: [
            {
                path: '',
                name: 'inquiryList',
                component: InquiryList
            },
            {
                path: ':id',
                name: 'inquiryDetail',
                component: InquiryDetail
            }
        ]
    }
    // new Routes('/inquiry/list', InquiryList).toRoute()
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
