import RequestService from './commonService';

const rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

/*
*   基础商品和可选商品列表
*   @params
*/
function searchNiGoods(params) {
  return RequestService.get(
    makeUrl('/goods/manager/searchNiGoods'),
    params
  )
}
/*
*   供应商品列表 && 四维商品添加
*/
function searchSupplierGoods( params ) {
  return RequestService.get(
    makeUrl('/goods/manager/searchSupplierGoods'),
    params
  )
}

/*
*   获取分销商列表
*/
function getAllDistributor( ) {
  return RequestService.get(makeUrl("/biz/manager/getAllDistributor"))
};
/*
*   获取供应商列表
*/
function getAllSupplier() {
  return RequestService.get(makeUrl("/biz/manager/getAllSupplier"));
}


/*
*   获取商品类型
*/
function searchPackageType(params) {
  return RequestService.get(makeUrl("/goods/manager/searchPackageType"),params)
}

/*
*   可选商品添加
*/
function addSupplierGoods(params) {
  return RequestService.post(
    makeUrl('/goods/manager/addNiGoods'),
    params
  )
}



function addUser(params) {
  /*return cs.post(makeUrl('addUser'), params).then((result) => {
    console.info('addUser-then', result);
    return result;
  }).catch((e) => {
    console.info('addUser-then', e)
  });*/
  return Promise.resolve();
}

function deleteUser(params) {
  /*return cs.post(makeUrl('deleteUser'), params).then((result) => {
   console.info('deleteUser-then', result);
   return result;
   }).catch((e) => {
   console.info('deleteUser-then', e)
   });*/
  return Promise.resolve();
}

function resetUserPassword(params) {
  /*return cs.post(makeUrl('updateUser'), params).then((result) => {
   console.info('updateUser-then', result);
   return result;
   }).catch((e) => {
   console.info('updateUser-then', e)
   });*/
  return Promise.resolve();
}

function updateUser(params) {
  /*return cs.post(makeUrl('updateUser'), params).then((result) => {
   console.info('updateUser-then', result);
   return result;
   }).catch((e) => {
   console.info('updateUser-then', e)
   });*/
  return Promise.resolve();
}

function getUser(params) {
  /*return cs.post(makeUrl('updateUser'), params).then((result) => {
   console.info('updateUser-then', result);
   return result;
   }).catch((e) => {
   console.info('updateUser-then', e)
   });*/
  return Promise.resolve({
    data: {
      userId: 1,
      userName: '王小虎',
      loginName: 'wangxh',
      sex: 1,
      phone: '134234234234',
      state: 1,
      password: 123
    }
  });
}
function searchUser(params) {
  /*return cs.post(makeUrl('searchUser'), params).then((result) => {
   console.info('searchUser-then', result);
   return result;
   }).catch((e) => {
   console.info('searchUser-then', e)
   });*/
  return Promise.resolve({
    data: {
      pageNum: 1,
      pageSize: 10,
      total: 50,
      pages: 3,
      list: [{
        userId: 1,
        userName: '王小虎',
        loginName: 'wangxh',
        sex: 1,
        phone: '134234234234',
        state: 1,
        password: 123
      },{
        userId: 2,
        userName: '王小虎',
        loginName: 'wangxh',
        sex: 1,
        phone: '134234234234',
        state: 1,
        password: 123
      },{
        userId: 3,
        userName: '王小虎',
        loginName: 'wangxh',
        sex: 1,
        phone: '134234234234',
        state: 1,
        password: 123
      },{
        userId: 4,
        userName: '王小虎',
        loginName: 'wangxh',
        sex: 1,
        phone: '134234234234',
        state: 1,
        password: 123
      }]
    }
  });
}

function deleteSupplierGoods(params) {
  /*return cs.post(makeUrl('/api-ni-flow/deleteSupplierGoods'), params).then((result) => {
   console.log(result);
   return result;
   }).catch((e) => {
   console.log(e)
   });*/
  return Promise.resolve();
}
function updateGoodsState(params) {
  /*return cs.post(makeUrl('/api-ni-flow/updateGoodsState'), params).then((result) => {
   console.log(result);
   return result;
   }).catch((e) => {
   console.log(e)
   });*/
  return Promise.resolve();
}


export {
  searchNiGoods, searchSupplierGoods, getAllDistributor , getAllSupplier,searchPackageType , addUser, searchUser, deleteUser, resetUserPassword, updateUser, getUser, addSupplierGoods, deleteSupplierGoods, updateGoodsState,
}
