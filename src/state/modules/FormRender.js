const state = {
    form: {},
    items: [],
    checkoutStatus: null
};
// getters
const getters = {
    cartProducts: (state, getters, rootState) => {
        return state;
    }
};
// actions 异步操作 提交mutation
const actions = {
    checkout({ commit, state }, products) {
    },
    indexSubmit({ commit, state }, products) {
        console.log(products);
        // products 该对象有两个属性 data(数据) $router(Vue $router) 通过路由可以实现业务页面的跳转 刷新等等逻辑
        // return POST('/api/cmccbl/cmccBlManagerInfo',products);
    }
};
// mutations 同步操作 操作state
const mutations = {
    pushProductToCart(state, { id }) {
        state.items.push({
            id,
            quantity: 1
        });
    },
    indexSubmit(state, products) {
        console.log(products);
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
//# sourceMappingURL=FormRender.js.map