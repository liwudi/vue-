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

  logged: function () {
    return RequestService.request({
        url: makeUrl('/validateSSOLogin'),
        withCredentials: true
      }
    ).then((data) => {
      RequestService.setUserInfo(data)
      return Promise.resolve(data)
    })
      .catch((err)=> Promise.reject(err))
  }
}
