import CommonService from './commonService';
const cs = CommonService;
const rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
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

function addSupplierGoods(params) {
  /*return cs.post(makeUrl('/api-ni-flow/addSupplyGoods'), params).then((result) => {
    console.log(result);
    return result;
  }).catch((e) => {
    console.log(e);
  });*/
  return Promise.resolve();
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
function searchSupplierGoods(params) {
  /*return cs.get(makeUrl('/api-ni-flow/searchSupplierGoods'), params).then((result) => {
   console.log(result);
   return result;
   }).catch((e) => {
   console.log(e)
   });*/
  return Promise.resolve({
    data:{
      pageNum: 1,
      pageSize: 10,
      total: 30,
      pages: 3,
      list: [{
        id: '111',
        name: '1年无限套餐',
        type: '续费套餐',
        totalFlow: '无限流量',
        cycle: '年',
        cycleValue: '1',
        price: '20.00',
        salePrice: '0',
        desc: '1年无限套餐',
        supplier: '翼卡',
        state: 1
      },{
        id: '222',
        name: '1季度无限套餐',
        type: '充值套餐',
        totalFlow: '无限流量',
        cycle: '季',
        cycleValue: '4',
        price: '25.00',
        salePrice: '0',
        desc: '1季度无限套餐',
        supplier: '翼卡',
        state: 2
      },{
        id: '333',
        name: '1G月包',
        type: '续费套餐',
        totalFlow: '1G',
        cycle: '月',
        cycleValue: '6',
        price: '27.00',
        salePrice: '0',
        desc: '1G月包',
        supplier: '翼卡',
        state: 3
      }]
    }
  });
}

export {
  addUser, searchUser, deleteUser, resetUserPassword, updateUser, getUser, addSupplierGoods, deleteSupplierGoods, updateGoodsState, searchSupplierGoods
}
