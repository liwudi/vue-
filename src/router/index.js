import Vue from 'vue'
import Router from 'vue-router'
import loading from '../views/loading/loading.vue';
import HelloWorld from '../components/HelloWorld.vue';
import Home from '../views/Home.vue';
import ssoService from '../services/sso.service';
import commonService from '../services/commonService';

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/loading',
      name: 'loading',
      component: loading
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    }
  ]
})


export default router

