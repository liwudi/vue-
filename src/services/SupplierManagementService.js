import CommonService from './commonService';
const rootPath = '';
function makeUrl(path) {
  return `${rootPath}${path}`;
}

function addSupplier(params) {
  return CommonService.post(makeUrl('/biz/manager/addSupplier'), params)
}
function deleteSupplier(supplierIds) {
  return CommonService.get(makeUrl('/biz/manager/deleteSupplier'), supplierIds).then((result) => {
    return result;
  }).catch((err) => {
    return err
  });
}
function updateSupplier(params) {
  return CommonService.post(makeUrl('/biz/manager/updateSupplier'), params)
}
function getSupplier(params) {
  return CommonService.get(makeUrl('/biz/manager/searchSupplier'), params).then((result) => {
    return result;
  }).catch((err) => {
    return err
  });
}
export {
  addSupplier, deleteSupplier, updateSupplier, getSupplier
}
