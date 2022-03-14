import { createStore } from "vuex";
import modules from "./modules";

export default createStore({
    state: {
        count: 1
    },
    mutations: {
        ADDSTATE(state, payload) {
            state.state = payload
        }
    },
    actions: {},
    getters: {},
    modules
})
