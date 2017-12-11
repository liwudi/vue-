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
*   获取分销商列表
*/
function searchDistributor( ) {
  return RequestService.get(makeUrl("/biz/manager/getAllDistributor"))
}
/*
*   获取供应商列表
*/
function searchSupplier() {
  return RequestService.get(makeUrl("/biz/manager/getAllSupplier"));
}
/*
*   sim卡列表查询
* */
function querySimList(params) {
  return RequestService.get(makeUrl("/manager/sim/searchSimList"),params)
};

/*
*   导入
* */
function batchAddSims( ) {
    return config.serviceBaseUrl+"/manager/sim/batchAddSims";
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



