import RequestService from './commonService';
const rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

/*
*   sim卡列表查询
* */
function querySimList(params) {
  // return RequestService.get('http://smartc.mapbar.com/serviceapi/job/1',params).then((result) => {
  //     console.info(result);
  //     return result;
  // }).catch((e) => {
  //     console.log(e);
  // });
   return Promise.resolve();
};

/*
*  sim卡编辑
* */
function  editSim() {

    return Promise.resolve();
};

/*
*
* */

export {
  querySimList , editSim
}



