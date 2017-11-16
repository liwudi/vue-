import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login/Login.vue';
import Reconciliation from '../views/Bills/Reconciliation.vue';
import Home from '../views/Home.vue';
const BaseTable = () => import('../views/BaseTable.vue');
const GoodsManagement = () => import('../views/GoodsManagement/GoodsManagement.vue');
import RouterUserManagement from './RouterUserManagement';
const SupplierManagement = () => import('../views/SupplierManagement/SupplierManagement.vue');<<<<<<< .mine
const SupplierManagement = () => import('../views/SupplierManagement/SupplierManagement.vue');
=======
const DistributorManage = () => import('../views/DistributorManage/DistributorManage.vue');
>>>>>>> .theirs

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
          path: '/GoodsManagement',
          name: 'GoodsManagement',
          component: GoodsManagement
        },
        {
          path: '/SupplierManagement',
          name: 'SupplierManagement',
          component: SupplierManagement
        },
        {
          path: '/Reconciliation',
          name: 'Reconciliation',
          component: Reconciliation
<<<<<<< .mine
        },
        {
          path: '/SupplierManagement',
          name: 'SupplierManagement',
          component: SupplierManagement
=======
        },
		        {
          path: '/DistributorManage',
          name : 'DistributorManage',
          component: DistributorManage
>>>>>>> .theirs
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

