export default [
    {
        path: 'index',
        name: 'index',
        meta: { title: '一级页面', icon: 'icon-Pdf', isMenu: true, author: [1, 2, 3] },
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/index/index.vue'),
    },
    {
        path: 'index1',
        name: 'index1',
        meta: { title: '一级页面1', icon: 'icon-Pdf', isMenu: true, author: [1, 2, 3] },
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/index/index.vue'),
    },
    {
        path: 'index2',
        name: 'index2',
        meta: { title: '一级页面2', icon: 'icon-Pdf', isMenu: true },
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/index/index.vue'),
    },
    {
        path: 'index3',
        name: 'index3',
        meta: { title: '一级页面3', icon: 'icon-Pdf', isMenu: true, author: [1, 2, 3] },
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/index/index.vue'),
    },
];
//# sourceMappingURL=index.js.map