/**
 * Created by cryst on 2017/11/14.
 */
import CommonService from './commonService';
const cs = CommonService;
const rootPath = '/api-ni-flow/';
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

export {
  addUser, searchUser, deleteUser, resetUserPassword, updateUser, getUser
}
