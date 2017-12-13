import CommonService from './commonService';
const rootPath = '';
function makeUrl(path) {
  return `${rootPath}${path}`;
}

function addSupplier(params) {
  return CommonService.post(makeUrl('/biz/manager/addSupplier'), params)
}
function deleteSupplier(params) {
  return CommonService.get(makeUrl('/biz/manager/deleteSupplier'), params)
}
function updateSupplier(params) {
  return CommonService.post(makeUrl('/biz/manager/updateSupplier'), params)
}
function getSupplier(params) {
  return CommonService.get(makeUrl('/biz/manager/searchSupplier'), params)
}
export {
  addSupplier, deleteSupplier, updateSupplier, getSupplier
}
