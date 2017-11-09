import RequestService from './commonService';

let serviceUrl = '';

function makeUrl(path) {
  return serviceUrl + path;
}

function setServiceUrl(url) {
  if (url) {
    serviceUrl = url;
  }
}

export default {
  logged : function () {
    return RequestService.get(
      makeUrl('sysuser/checkToken')
    )
  }
}
