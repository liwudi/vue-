// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import moment from 'moment'
import router from './router'
import ElementUI from 'element-ui'

import '../static/css/main.scss'
import '../static/css/template.scss'

import commonService from './services/commonService';
import CommonFilter from './filter/CommonFilter';
import config from './index.config';

Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.use(ElementUI)

/* eslint-disable no-new */
commonService.setInterceptors(config.sucessInterceptor, config.failInterceptor);

const vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})



