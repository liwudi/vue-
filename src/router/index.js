import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/Login.vue';
import Home from '../views/Home.vue';
const BaseTable = () => import('../views/BaseTable.vue');

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
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    { path: '*', redirect: '/basetable' }
  ]
})


export default router

