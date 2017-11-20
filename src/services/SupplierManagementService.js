import CommonService from './commonService';
const rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

function addSupplier(params) {
  /*return CommonService.post(makeUrl('/api-ni-flow/addsupplier'), params).then((result) => {
   console.log(result);
   return result;
   }).catch((e) => {
   console.log(e);
   });*/
  return Promise.resolve();
}

function deleteSupplier(params) {
  /*return CommonService.get(makeUrl('/api-ni-flow/deletesupplier'), params).then((result) => {
   console.log(result);
   return result;
   }).catch((e) => {
   console.log(e)
   });*/
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
      supplerName: 'yika',
      name: '王小虎',
      phone: '15110194995',
      email: '000@mapbar.com'
    }

  });
}
function getSupplier(params) {
  /*return CommonService.get(makeUrl('/api-ni-flow/searchsupplier'), params).then((result) => {
   console.log(result);
   return result;
   }).catch((e) => {
   console.log(e)
   });*/
  return Promise.resolve({
    data: {
     pageNum: 1,
     pageSize: 10,
     total: 30,
     pages: 3,
     list:[{
     supplierId: '1',
     createTime: '2016-05-03',
     supplerName: '翼卡',
     name: '王小虎',
     phone: '15110194995',
     email: '000@mapbar.com'
     }, {
     supplierId: '2',
     createTime: '2016-05-02',
     supplerName: '翼卡1',
     name: '王小虎1',
     phone: '15110194995',
     email: '111@mapbar.com'
     }, {
     supplierId: '3',
     createTime: '2016-05-04',
     supplerName: '翼卡2',
     name: '王小虎2',
     phone: '15110194995',
     email: '222@mapbar.com'
     }, {
     supplierId: '4',
     createTime: '2016-05-01',
     supplerName: '翼卡3',
     name: '王小虎3',
     phone: '15110194995',
     email: '333@mapbar.com'
     }]
     }
  });
}
export {
  addSupplier, deleteSupplier, updateSupplier, getSupplier,agetSupplier
}
