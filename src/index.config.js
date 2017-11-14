
import router from './router/index';
import sso from './services/sso.service';

let Config =  {
  /** 2017/11/9
      *功能: ajax请求的拦截器,更加各个业务不同修改code码与属性
      *@param response
      *return Promise
  **/
  sucessInterceptor : (response) => {
    if(response.data.code === 1015){
      //Config.toLogin();
      return Promise.resolve({data:{code:200}});
    }
    return Promise.resolve(response);
  },
  failInterceptor :  (error) => {
    if(error.response.data.code === 1015){
      //Config.toLogin();
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
    //window.location.href = Config.loginUrl + encodeURIComponent(window.location.href);
    router.replace('login');
  },

  loginUrl : 'http://wdpassport.mapbar.com/#/login?redirect=',
  ssoServiceUrl : 'https://wdservice.mapbar.com/ssoapi/user',
  serviceBaseUrl : "http://117.107.204.165:8770/yixin/"
}

sso.setServiceUrl(Config.ssoServiceUrl);

export default Config
