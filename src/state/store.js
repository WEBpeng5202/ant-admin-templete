import Vue from 'vue';
import Vuex from 'vuex';
import Cart from './modules/cart';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: { Cart },
    state: {
        percent: 0,
        RouteRepeat: 0,
    },
    mutations: {
        percent(state) {
            state.percent++;
        }
    },
    actions: {
        percent(context) {
            context.commit('percent');
        },
    },
});
//# sourceMappingURL=store.js.map