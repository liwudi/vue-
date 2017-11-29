import RequestService from './commonService';
const rootPath = 'http://192.168.144.33:8888/api-ni-flow/';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

/*
*   sim卡列表查询
* */
function querySimList(params) {
  return RequestService.get(makeUrl("manager/sim/searchSimList"),params).then((result) => {
      return result;
  }).catch((err) => {
      return err;
  });
};
function searchSupplier() {
  return RequestService.get(makeUrl("biz/manager/searchSupplier")).then((result) => {
      return result;
  }).catch((err) => {
      return err;
  });
};

function searchDistributor() {
  return RequestService.get(makeUrl("biz/manager/searchDistributor")).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
};

/*
*   导入
* */
function batchAddSims(file) {
  return RequestService.post(makeUrl("manager/sim/batchAddSims"),{ file:file }).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
};

/*
*  sim卡编辑
* */
function selectActiveGoods(iccid) {
    return RequestService.get(
        makeUrl("manager/sim/selectActiveGoods"),
        { iccid : iccid }
    ).then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });
};
/*
*     编辑提交
* */
function  editSim( params ) {
    return RequestService.get(
       makeUrl("manager/sim/updateActiveGoods"),
       params
    ).then((result) => {

    }).catch((err) =>{

    });
    return Promise.resolve();

};

/*
*   详情查询
* */
function detailSim(params) {
      return RequestService.get(makeUrl("manager/sim/searchSim") ,params).then((result) => {
        return result;
      }).catch((e) => {
        return result;
      });

};
export {
  querySimList , searchSupplier ,searchDistributor , batchAddSims , selectActiveGoods , editSim , detailSim
}



