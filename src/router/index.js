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

router.beforeEach((to,from,next)=>{
  if(to.name === 'hello' || to.name === 'loading'){
    next();
  }else {
    ssoService.logged()
      .then((data)=>{
        if(!commonService.userInfo) commonService.setUserInfo(data);
        next();
      })
      .catch(()=>{
        next('hello');
      })
  }
})

export default router

