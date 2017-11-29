/**
 * Created by cryst on 2017/11/14.
 */
import CommonService from './commonService';
const cs = CommonService;
const rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

function addUser(params) {
  return cs.post(makeUrl('/manager/user/addUser'), params)
}

function deleteUser(params) {
  return cs.get(makeUrl('/manager/user/deleteUser'), params)
}

function resetUserPassword(params) {
  return cs.get(makeUrl('/manager/user/resetPassword'), params)
}

function updateUser(params) {
  return cs.post(makeUrl('/manager/user/updateUser'), params)
}

function searchUser(params) {
  return cs.post(makeUrl('/manager/user/searchUsers'), params)
}

export {
  addUser, searchUser, deleteUser, resetUserPassword, updateUser
}
