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
  /*return CommonService.post(makeUrl('/api-ni-flow/updatesupplier'), params).then((result) => {
   console.log(result);
   return result;
   }).catch((e) => {
   console.log(e)
   });*/
  return Promise.resolve();
}

function agetSupplier(params) {
  /*return CommonService.get(makeUrl('/api-ni-flow/searchsupplier'), params).then((result) => {
   console.log(result);
   return result;
   }).catch((e) => {
   console.log(e)
   });*/
  return Promise.resolve({
    data: {
      supplierId: '1',
      createTime: '2016-05-03',
      supplierName: 'yika',
      name: '王小虎',
      phone: '15110194995',
      email: '000@mapbar.com'
    }

  });
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
  addSupplier, deleteSupplier, updateSupplier, getSupplier,agetSupplier
}
