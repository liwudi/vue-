import RequestService from './commonService';
import config from '../index.config';

let rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
}
/*
*   下载模板
* */
function downloadTemplate() {
    return config.serviceBaseUrl+"/template.xlsx";
}

/*
*   sim卡列表查询
* */
function querySimList(params) {
  return RequestService.get(makeUrl("/manager/sim/searchSimList"),params)
};
function searchSupplier() {
  return RequestService.get(makeUrl("/biz/manager/searchSupplier"));
};

function searchDistributor() {
  return RequestService.get(makeUrl("/biz/manager/searchDistributor"))
};

/*
*   导入
* */
function batchAddSims( params ) {
  //return RequestService.post(makeUrl("/manager/sim/batchAddSims"),params);
  return RequestService.post(
    "http://172.22.50.12:9999/api-ni-flow/sim/batchAddSims"
    ,params,null,true);
};

/*
*  sim卡编辑
* */
function selectActiveGoods(params) {
    return RequestService.get(
        makeUrl("/manager/sim/selectActiveGoods"),
        params
    )
};
/*
*     编辑提交
* */
function  editSim( params ) {
    return RequestService.get(
       makeUrl("/manager/sim/updateActiveGoods"),
       params
    );
};

/*
*   详情查询
* */
function detailSim(params) {
      return RequestService.get(makeUrl("/manager/sim/searchSim") ,params);
};
/*
*   当前可选套餐
* */
function searchSimCombo(params) {
    return RequestService.get(makeUrl("/manager/sim/searchSimCombo") , params)
};
export {
  querySimList , searchSupplier ,searchDistributor , batchAddSims , selectActiveGoods , editSim , detailSim , searchSimCombo , downloadTemplate
}



