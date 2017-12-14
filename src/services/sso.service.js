import RequestService from './commonService'

let serviceUrl = '';

function makeUrl (path) {
  return serviceUrl + path
}

function setServiceUrl (url) {
  if (url) {
    serviceUrl = url
  }
}

export default {
  setServiceUrl: setServiceUrl,

  logined: function () {
    return RequestService.request({
        url: makeUrl('/validateSSOLogin'),
        withCredentials: true
      }
    ).then((data) => {
      RequestService.setUserInfo(data)
      return Promise.resolve(data)
    })
      .catch((err)=> {
      return Promise.reject(err)
    })
  },
  /** 2017/11/23
      *功能: 登录
      *@param opts
      *return
  **/
  login: function (opts) {
    return RequestService.post(
      makeUrl('/user/login'),
      {
        loginName:opts.username,
        passWord:opts.password
      }
    )
  },
  /** 2017/11/23
      *功能: 校验token
      *@param 无
      *return
  **/
  checkToken : function () {
    return RequestService.get(
      makeUrl('/manager/user/checkToken')
    )
  },
  /** 2017/11/27
      *功能: 退出登录
      *@param
      *return
  **/
  loginOut : function () {
    return RequestService.get(
      makeUrl('/manager/user/logout')
    )
  },
  /** 2017/12/14
   *功能: 修改密码
   *@param opts
   *return
   **/
  updatePassword: function (opts) {
    return RequestService.post(
      makeUrl('/manager/user/updatePassword'),
      {
        userId:opts.userId,
        oldPassword:opts.oldPassword,
        newPassword:opts.newPassword
      }
    )
  }


}
