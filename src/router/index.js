import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login/Login.vue';

import Home from '../views/Home.vue';
const BaseTable = () => import('../views/template/BaseTable.vue');

import SimManage from '../views/SimManage/SimManage.vue';

const GoodsManagement = () => import('../views/GoodsManagement/GoodsManagement.vue');
const UserManagement = () => import ('../views/UserManagement/UserList.vue');
const SupplierManagement = () => import('../views/SupplierManagement/SupplierManagement.vue');


const DistributorManage = () => import('../views/DistributorManage/DistributorManage.vue');

const DistributorBillsManagement = () => import('../views/DistributorBillsManagement/DistributorBillsManagement.vue');
const SupplierBillsManagement = () => import('../views/SupplierBillsManagement/SupplierBillsManagement.vue');

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/',
          name : 'basetable',
          component: BaseTable
        },
        {
          path: '/UserManagement',
          name: 'UserManagement',
          component: UserManagement
        },
        {
          path: '/SimManage',
          name: 'SimManage',
          component: SimManage
        },
        {
          path: '/GoodsManagement',
          name: 'GoodsManagement',
          component: GoodsManagement
        },

        {
          path: '/DistributorBillsManagement',
          name: 'DistributorBillsManagement',
          component: DistributorBillsManagement
        },
        {
          path: '/SupplierBillsManagement',
          name: 'SupplierBillsManagement',
          component: SupplierBillsManagement
        },

        {
          path: '/SupplierManagement',
          name: 'SupplierManagement',
          component: SupplierManagement

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
     { path: '*', redirect: '/' }
  ]
});

export default router

