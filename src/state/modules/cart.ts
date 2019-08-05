const state = {
  items: [],
  checkoutStatus: null
}

// getters
const getters = {
  cartProducts: (state:any, getters:any, rootState:any) => {
    return state;
  }
}

// actions 异步操作 提交mutation
const actions = {
  checkout ({ commit, state}:any, products:any) {
  }
}

// mutations 同步操作 操作state
const mutations = {
  pushProductToCart (state:any, { id }:any) {
    state.items.push({
      id,
      quantity: 1
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
