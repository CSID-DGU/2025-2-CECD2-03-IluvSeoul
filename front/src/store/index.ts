import {createStore} from 'vuex';
import Category from "@/data/inquiry/category";
import ModelService from "@/service/model";
import InquiryService from "@/service/inquiry";

export default createStore({
    state () {
        return {
            selectedCategory: 0,
            categories: [],
            inquiries: []
        }
    },
    getters: {
        getCategory(state) {
            return state.selectedCategory;
        },
        getCategories(state) {
            return state.categories;
        },
        getInquiries(state) {
            return state.inquiries;
        }
    },
    mutations: {
        setCategory(state, category) {
            state.selectedCategory = category;
        },
        fetchCategories(state, categories) {
            state.categories = categories;
        },
        fetchInquiries(state, inquiries) {
            state.inquiries = inquiries
        }
    },
    actions: {
        fetchCategories(state) {
            ModelService.get<Category>(Category, 'category')
                .then(r => state.commit('fetchCategories', r))
                .catch(e => console.log(e))
        },
        fetchInquiries(state) {
            InquiryService.list()
                .then(r => state.commit('fetchInquiries', r))
                .catch(e => console.log(e));
        }
    }
})