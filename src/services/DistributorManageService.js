import CommonService from './commonService';
const rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

function addDistributor(params) {
  return CommonService.post(makeUrl('/biz/manager/addDistributor'), params)
}

function deleteDistributor(params) {
  return CommonService.get(makeUrl('/biz/manager/deleteDistributor'), params)
}

function updateDistributor(params) {
  return CommonService.post(makeUrl('/biz/manager/updateDistributor'), params)
}

function getDistributor(params) {
  return CommonService.get(makeUrl('/biz/manager/searchDistributor'), params)
}

export {
  addDistributor, deleteDistributor, updateDistributor, getDistributor
}
