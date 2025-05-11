import {createStore} from 'vuex';

export default createStore({
    state () {
        return {
            inquiry: {
                current: '분류1'
            }
        }
    },
    mutations: {
        setInquiryCurrent(state, current) {
            state.inquiry.current = current
        }
    }
})