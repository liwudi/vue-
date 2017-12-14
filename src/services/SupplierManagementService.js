import CommonService from './commonService';
const rootPath = '';
function makeUrl(path) {
  return `${rootPath}${path}`;
}

function addSupplier(params) {
  return CommonService.post(makeUrl('/manager/biz/addSupplier'), params)
}
function deleteSupplier(params) {
  return CommonService.get(makeUrl('/manager/biz/deleteSupplier'), params)
}
function updateSupplier(params) {
  return CommonService.post(makeUrl('/manager/biz/updateSupplier'), params)
}
function getSupplier(params) {
  return CommonService.get(makeUrl('/manager/biz/searchSupplier'), params)
}
export {
  addSupplier, deleteSupplier, updateSupplier, getSupplier
}
