import {createStore} from 'vuex';
import Department from "@/data/inquiry/department";
import {ModelService} from "@/service/model";
import {InquiryService} from "@/service/inquiry";
import Tag from "@/data/inquiry/tag";
import DepartmentGroup from "@/data/inquiry/department.group";
import DepartmentTag from "@/data/inquiry/department.tag";

export default createStore({
    state () {
        return {
            selectedTag: 0,
            tagMap: {},

            selectedDepartment: 0,
            departmentMap: {},
            departmentGroupIdMap: {},
            departmentGroupMap: {},
            departmentTagMap: {},

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
        getDepartmentsByGroupId(state) {
            return state.departmentGroupIdMap;
        },
        getDepartmentGroupMap(state) {
            return state.departmentGroupMap;
        },
        getDepartmentGroups(state) {
            return Object.values(state.departmentGroupMap);
        },
        getDepartmentTagMap(state) {
            return state.departmentTagMap;
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
        fetchTags(state, tags: Tag[]) {
            state.tagMap = tags.reduce((a: { [key: number]: Tag }, b) => {
                a[b.id] = b;
                return a;
            }, {})
        },
        setDepartment(state, department) {
            state.selectedDepartment = department;
        },
        fetchDepartments(state, departments: Department[]) {
            state.departmentMap = departments.reduce((a: { [key: number]: Department }, b) => {
                a[b.id] = b;
                return a;
            }, {});
            state.departmentGroupIdMap = departments.reduce((a: { [key: number]: Department[] }, b) => {
                if (!Object.prototype.hasOwnProperty.call(a, b.group_id)) {
                    a[b.group_id] = []
                }
                a[b.group_id].push(b);
                return a;
            }, {})
        },
        fetchDepartmentGroups(state, departmentGroups: DepartmentGroup[]) {
            state.departmentGroupMap = departmentGroups.reduce((a: { [key: number]: DepartmentGroup }, b) => {
                a[b.id] = b;
                return a;
            }, {});
        },
        fetchDepartmentTags(state, departmentTags: DepartmentTag[]) {
            state.departmentTagMap = departmentTags.reduce((a: { [key: number]: DepartmentTag[] }, b) => {
                if (!Object.prototype.hasOwnProperty.call(a, b.department_id)) {
                    a[b.department_id] = []
                }
                a[b.department_id].push(b);
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
        fetchDepartmentGroups(state) {
            ModelService.get<DepartmentGroup>(DepartmentGroup, 'department.group')
                .then(r => state.commit('fetchDepartmentGroups', r))
                .catch(e => console.log(e))
        },
        fetchDepartmentTags(state) {
            ModelService.get<DepartmentTag>(DepartmentTag, 'department.tag')
                .then(r => state.commit('fetchDepartmentTags', r))
                .catch(e => console.log(e))
        },
        fetchInquiries(state) {
            InquiryService.list()
                .then(r => state.commit('fetchInquiries', r))
                .catch(e => console.log(e));
        }
    }
})