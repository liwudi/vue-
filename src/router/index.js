import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue';
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
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
    { path: '*', redirect: '/basetable' }
  ]
})


export default router

