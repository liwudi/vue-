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
function searchNiGoods(params) {
  /*return cs.get(makeUrl('searchUser'), params).then((result) => {
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
        id:10000,
        sort:2000,
        name:"1G月包",
        type:"充值套餐",
        totalFlow:"1G",
        cycle:"月",
        cycleValue:1,
        price:"20.00",
        salePrice:12.00,
        desc:123,
        distributor:"易鑫222",
        state:1
      },{
        id:10000,
        sort:2000,
        name:"1G月包",
        type:"充值套餐",
        totalFlow:"89G",
        cycle:"月",
        cycleValue:1,
        price:"20.00",
        salePrice:12.00,
        desc:123,
        distributor:"易鑫33",
        state:1
      },{
        id:10000,
        sort:6000,
        name:"5G月包",
        type:"充值套餐",
        totalFlow:"1G",
        cycle:"月",
        cycleValue:1,
        price:"50.00",
        salePrice:44.00,
        desc:22123,
        distributor:"易鑫44",
        state:1
      }]
    }
  });
};



export {
  addUser, searchNiGoods, deleteUser, resetUserPassword, updateUser, getUser
}
