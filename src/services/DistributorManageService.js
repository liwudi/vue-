import CommonService from './commonService';
const rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

function addDistributor(params) {
  return CommonService.post(makeUrl('/manager/biz/addDistributor'), params)
}

function deleteDistributor(params) {
  return CommonService.get(makeUrl('/manager/biz/deleteDistributor'), params)
}

function updateDistributor(params) {
  return CommonService.post(makeUrl('/manager/biz/updateDistributor'), params)
}

function getDistributor(params) {
  return CommonService.get(makeUrl('/manager/biz/searchDistributor'), params)
}

export {
  addDistributor, deleteDistributor, updateDistributor, getDistributor
}
