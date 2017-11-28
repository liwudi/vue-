
import router from './router/index';
import sso from './services/sso.service';

let Config =  {
  /** 2017/11/9
      *功能: ajax请求的拦截器,根据各个业务不同修改code码与属性
      *@param response
      *return Promise
  **/
  sucessInterceptor : (response) => {
    if(response.data.code === 601){
      window.localStorage.clear();
      Config.toLogin();
      return Promise.resolve({data:{code:200}});
    }
    return Promise.resolve(response);
  },
  failInterceptor :  (error) => {
    if(error.response.data.code === 601){
      window.localStorage.clear();
      Config.toLogin();
      return Promise.resolve({data:{code:200}});
    }
    return Promise.reject(error.response);
  },

  /** 2017/11/9
      *功能: 跳转去登录页面，统一账户模式使用
      *@param
      *return
  **/
  toLogin :  () => {
    router.replace('login');
  },

  serviceBaseUrl : "http://192.168.144.33:8888/api-ni-flow"
}


export default Config
