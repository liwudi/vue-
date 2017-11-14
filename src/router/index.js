import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/Login.vue';
import Reconciliation from '../views/Bills/Reconciliation.vue';
import Home from '../views/Home.vue';
const BaseTable = () => import('../views/BaseTable.vue');

import RouterUserManagement from './RouterUserManagement';

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
        {
          path: '/Reconciliation',
          name: 'Reconciliation',
          component: Reconciliation
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // { path: '*', redirect: '/basetable' }
  ]
})
RouterUserManagement.setRouter(router);

export default router

