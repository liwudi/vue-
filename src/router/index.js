import Vue from 'vue'
import Router from 'vue-router'
import loading from '../views/loading/loading.vue';
import HelloWorld from '../components/HelloWorld.vue';
import Home from '../views/Home.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loading',
      component: loading
    },
    {
      path: '/home',
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
