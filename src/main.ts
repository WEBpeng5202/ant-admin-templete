import Vue from 'vue';
import App from './App.vue';
import router from './route/router';
import store from './state/store';

//使用蚂蚁金服的 ANT 组件库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import 'ant-design-vue/dist/antd.less'
Vue.use(Antd);
//使用iconfont图标组件
import {Icon} from "ant-design-vue";
const MyIcon:any = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1325523_ilttil4jscf.js', // 在 iconfont.cn 上生成
});
Vue.component('IconFont',MyIcon);
Vue.use(MyIcon);
import debounceButton from './components/debounceButton.vue'
Vue.component('debounceButton',debounceButton);
// Vue.use(debounceButton);



//挂载qs MD5到全局 不需要每个组件都单独引入
Vue.prototype.qs = require('./util/moudel').qs;
Vue.prototype.MD5 = require('./util/moudel').MD5;
Vue.prototype.axios = require('./util/axios');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
