import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

// Inquiry
import InquiryList from "@/components/inquiry/InquiryList.vue";
import InquiryMain from "@/components/inquiry/InquiryMain.vue";
import InquiryDetail from "@/components/inquiry/InquiryDetail.vue";

import ModelMain from "@/components/model/ModelMain.vue";
import Department from "@/components/model/Department.vue";
import InquiryCreate from "@/components/inquiry/InquiryCreate.vue";

const routes: RouteRecordRaw[] = [
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
                path: 'create',
                name: 'inquiryCreate',
                component: InquiryCreate
            },
            {
                path: ':id',
                name: 'inquiryDetail',
                component: InquiryDetail
            }
        ]
    },
    {
        path: '/model',
        component: ModelMain,
        children: [
            {
                path: 'department',
                name: 'departmentList',
                component: Department
            },
        ]
    }
    // new Routes('/inquiry/list', InquiryList).toRoute()
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
