import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login/Login.vue';
import Reconciliation from '../views/Bills/Reconciliation.vue';
import Home from '../views/Home.vue';
const BaseTable = () => import('../views/BaseTable.vue');

import SimManage from '../views/SimManage/SimManage.vue';
import SimEdit from '../views/SimManage/SimEdit.vue';
import SimDetail from '../views/SimManage/SimDetail.vue';

const GoodsManagement = () => import('../views/GoodsManagement/GoodsManagement.vue');
import RouterUserManagement from './RouterUserManagement';
const DistributorManage = () => import('../views/DistributorManage/DistributorManage.vue');


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/basetable',
          name : 'basetable',
          component: BaseTable
        },
        ...RouterUserManagement.routers,
        {
          path: '/SimManage',
          name: 'SimManage',
          component: SimManage
        },
        {
          path: '/SimEdit',
          name: 'SimEdit',
          component: SimEdit
        },
        {
          path: '/SimDetail',
          name: 'SimDetail',
          component:SimDetail
        },
        {
          path: '/GoodsManagement',
          name: 'GoodsManagement',
          component: GoodsManagement
        },
        {
          path: '/Reconciliation',
          name: 'Reconciliation',
          component: Reconciliation
        },
		        {
          path: '/DistributorManage',
          name : 'DistributorManage',
          component: DistributorManage
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

     { path: '*', redirect: '/basetable' }

  ]
});

export default router

