const state = {
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
    }
};
// mutations 同步操作 操作state
const mutations = {
    pushProductToCart(state, { id }) {
        state.items.push({
            id,
            quantity: 1
        });
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
//# sourceMappingURL=cart.js.map