import Vue from 'vue';
import Vuex from 'vuex';
import Cart from './modules/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{Cart},
  state: {
    percent:0,
    RouteRepeat:0,
  },
  mutations: {
    percent(state){
      state.percent++;
    }
  },
  actions: {
    percent(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
      context.commit('percent');
    },
  },
});
