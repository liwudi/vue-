import CommonService from './commonService';
const rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

function addSupplier(params) {
  return CommonService.post(makeUrl('/biz/manager/addSupplier'), params).then((result) => {
   return result;
   }).catch((e) => {
   });
  return Promise.resolve();
}

function deleteSupplier(supplierIds) {
  return CommonService.get(makeUrl('/biz/manager/deleteSupplier'), supplierIds).then((result) => {
   return result;
   }).catch((e) => {
   });
  return Promise.resolve();
}

function updateSupplier(params) {
  return CommonService.post(makeUrl('/biz/manager/updateSupplier'), params).then((result) => {
   return result;
   }).catch((e) => {
   });
  return Promise.resolve();
}


function getSupplier(params) {
  return CommonService.get(makeUrl('/biz/manager/searchSupplier'), params).then((result) => {
   return result;
   }).catch((e) => {
   //
   });
  return Promise.resolve();
}
export {
  addSupplier, deleteSupplier, updateSupplier, getSupplier
}
