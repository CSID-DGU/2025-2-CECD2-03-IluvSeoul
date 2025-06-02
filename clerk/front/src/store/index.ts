import {createStore} from 'vuex';
import Department from "@/data/inquiry/department";
import {ModelService} from "@/service/model";
import {InquiryService} from "@/service/inquiry";
import Tag from "@/data/inquiry/tag";

export default createStore({
    state () {
        return {
            selectedTag: 0,
            tagMap: {},

            selectedDepartment: 0,
            departmentMap: {},

            selectedInquiry: 0,
            inquiries: []
        }
    },
    getters: {
        // tag
        getTag(state) {
            return state.selectedTag;
        },
        getTagMap(state) {
            return state.tagMap;
        },
        getTags(state) {
            return Object.values(state.tagMap);
        },
        // department
        getDepartment(state) {
            return state.selectedDepartment;
        },
        getDepartmentMap(state) {
            return state.departmentMap;
        },
        getDepartments(state) {
            return Object.values(state.departmentMap);
        },
        // inquiry
        getInquiry(state) {
            return state.selectedInquiry;
        },
        getInquiries(state) {
            return state.inquiries;
        }
    },
    mutations: {
        setTag(state, tag) {
            state.selectedTag = tag;
        },
        fetchTags(state, tags) {
            state.tagMap = tags.reduce((a, b) => {
                a[b.id] = b;
                return a;
            }, {})
        },
        setDepartment(state, department) {
            state.selectedDepartment = department;
        },
        fetchDepartments(state, departments) {
            state.departmentMap = departments.reduce((a, b) => {
                a[b.id] = b;
                return a;
            }, {});
        },
        setInquiry(state, inquiry) {
            state.selectedInquiry = inquiry;
        },
        fetchInquiries(state, inquiries) {
            state.inquiries = inquiries
        }
    },
    actions: {
        fetchTags(state) {
            ModelService.get<Tag>(Tag, 'tag')
                .then(r => state.commit('fetchTags', r))
                .catch(e => console.log(e))
        },
        fetchDepartments(state) {
            ModelService.get<Department>(Department, 'department')
                .then(r => state.commit('fetchDepartments', r))
                .catch(e => console.log(e))
        },
        fetchInquiries(state) {
            InquiryService.list()
                .then(r => state.commit('fetchInquiries', r))
                .catch(e => console.log(e));
        }
    }
})