import CommonService from './commonService';
const rootPath = '';
function makeUrl(path) {
  return `${rootPath}${path}`;
}

function addSupplier(params) {
  return CommonService.post(makeUrl('/manager/biz/addSupplier'), params)
}
function deleteSupplier(supplierIds) {
  return CommonService.get(makeUrl('/manager/biz/deleteSupplier'), supplierIds).then((result) => {
    return result;
  }).catch((err) => {
    return err
  });
}
function updateSupplier(params) {
  return CommonService.post(makeUrl('/manager/biz/updateSupplier'), params)
}
function getSupplier(params) {
  return CommonService.get(makeUrl('/manager/biz/searchSupplier'), params).then((result) => {
    return result;
  }).catch((err) => {
    return err
  });
}
export {
  addSupplier, deleteSupplier, updateSupplier, getSupplier
}
