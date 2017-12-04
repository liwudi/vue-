import RequestService from './commonService';

let rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

/**
 * 分销商对账查询
 * @param params
 * @returns {*}
 */
function searchBillForDistributor(params) {
    return RequestService.get(makeUrl('/manager/bill/searchBillForDistributor'), params);
}

/*
*   分销商列表查询
* */
function searchDistributor(){
  return RequestService.get(makeUrl('/biz/manager/searchDistributor'));
}
/**
 * 分销商对账下载
 * @param params
 * @returns {*}
 */
function downloadBillForDistributor (params) {
  return RequestService.get(
    makeUrl('/manager/bill/downloadBillForDistributor'),
    params
  )
}

/**
 * 供应商对账查询
 * @param params
 * @returns {*}
 */

function searchBillForSupplier (params) {
  return RequestService.get(
    makeUrl('/manager/bill/searchBillForSupplier'),
    params
  )
}
/*
*   供应商列表查询
*/
function searchSupplier() {
  return RequestService.get(makeUrl('/biz/manager/searchSupplier'))
}

/**
 * 供应商对账下载
 * @param params
 * @returns {*}
 */
function downloadBillForSupplier (params) {
  return RequestService.get(
    makeUrl('/manager/bill/downloadBillForDistributor'),
    params
  )
}

export {
  searchBillForDistributor, searchDistributor, downloadBillForDistributor ,  searchBillForSupplier, searchSupplier , downloadBillForSupplier
}
