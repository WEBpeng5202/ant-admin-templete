import Vue from 'vue';
import Router from 'vue-router';
import { message } from "ant-design-vue";
import Store from '../state/store';
import IndexPage from './index';
Vue.use(Router);
/*
* 菜单项
  * 操作人员管理:  operator
  * 供应商管理:    supplier
  * 客户管理:      customer
  * 产品管理:      product
  * 券码管理:      couponCode
  * 订单管理:      order
  * 物流管理:      logistics
*
*/
const Route = new Router({
    routes: [
        {
            path: '/operator',
            name: 'operator_layout',
            // redirect:'/index/index',
            component: () => import(/* webpackChunkName: "about" */ '../views/layout/layout.vue'),
            meta: { title: '操作员管理', icon: 'iconic_admin', isMenu: true, author: [1] },
            children: [
                ...IndexPage
            ]
        },
        {
            path: '/supplier',
            name: 'supplier_layout',
            // redirect:'/index/index',
            component: () => import(/* webpackChunkName: "about" */ '../views/layout/layout.vue'),
            meta: { title: '供应商管理', icon: 'iconic_indent' },
            children: [
                ...IndexPage
            ]
        },
        {
            path: '/customer',
            name: 'customer_layout',
            // redirect:'/index/index',
            component: () => import(/* webpackChunkName: "about" */ '../views/layout/layout.vue'),
            meta: { title: '客户管理', icon: 'iconic_supplier' },
            children: [
                ...IndexPage
            ]
        },
        {
            path: '/product',
            name: 'product_layout',
            // redirect:'/index/index',
            component: () => import(/* webpackChunkName: "about" */ '../views/layout/layout.vue'),
            meta: { title: '产品管理', icon: 'iconic_product' },
            children: [
                ...IndexPage
            ]
        },
        {
            path: '/couponCode',
            name: 'couponCode_layout',
            // redirect:'/index/index',
            component: () => import(/* webpackChunkName: "about" */ '../views/layout/layout.vue'),
            meta: { title: '券码管理', icon: 'iconic_ticket' },
            children: [
                ...IndexPage
            ]
        },
        {
            path: '/order',
            name: 'order_layout',
            // redirect:'/index/index',
            component: () => import(/* webpackChunkName: "about" */ '../views/layout/layout.vue'),
            meta: { title: '订单管理', icon: 'iconic_order' },
            children: [
                ...IndexPage
            ]
        },
        {
            path: '/logistics',
            name: 'logistics_layout',
            // redirect:'/index/index',
            component: () => import(/* webpackChunkName: "about" */ '../views/layout/layout.vue'),
            meta: { title: '物流管理', icon: 'iconic_logistics' },
            children: [
                ...IndexPage
            ]
        },
        {
            path: '/statistics',
            name: 'statistics_layout',
            // redirect:'/index/index',
            component: () => import(/* webpackChunkName: "about" */ '../views/layout/layout.vue'),
            meta: { title: '统计管理', icon: 'iconic_statistics' },
            children: [
                ...IndexPage
            ]
        },
        { path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ '../views/pages/login/login.vue'),
            meta: { title: '登陆', icon: 'iconic_statistics' },
        }
    ],
});
Route.beforeEach((to, from, next) => {
    /* 对入口进行优化 */
    if (to.path !== '/login') {
        //校验isMenu author
        if (!to.meta.author || to.meta.author.indexOf(1) === -1) {
            if (Store.state.RouteRepeat > 2) {
                next({
                    path: '/operator/index1'
                });
            }
            else {
                // message.destroy();
                message.error('您的等级权限不足，请联系管理员为您的账户提升等级！');
                Store.state.RouteRepeat++;
                next({
                    path: from.path
                });
            }
        }
        else {
            next();
        }
        /*    if (to.path === '/' || to.path === '') {
              next({
                path: '/login',
              });
            }else {
              if (sessionStorage.getItem('Key') && sessionStorage.getItem('author')) {
                if(to.meta.author.findIndex((ele:any)=>{return ele == sessionStorage.getItem('author')})!==-1){
                  next();
                }else {
                  sessionStorage.removeItem('tab');
                  next({
                    path: '/index/search',
                  });
                }
              } else {
                next({
                  path: '/login',
                });
              }
            }*/
    }
    else {
        next();
    }
});
export default Route;
//# sourceMappingURL=router.js.map