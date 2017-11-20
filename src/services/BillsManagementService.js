import CommonService from './commonService';
const cs = CommonService;
const rootPath = '/api-ni-flow/';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

/**
 * 分销商对账查询
 * @param params
 * @returns {*}
 */
function searchBillForDistributor(params) {
  /*return cs.post(makeUrl('searchBillForDistributor'), params).then((result) => {
   console.info('updateUser-then', result);
   return result;
   }).catch((e) => {
   console.info('updateUser-then', e)
   });*/
  return Promise.resolve({
    data: {
      "pageNum": 1,
      "pageSize": 0,
      "total": 2,
      "pages": 1,
      totalAmount:1143143,
      list:[
        {
          orderId:1,
          iccid:10000,
          distributor:'易鑫',
          oldGoodsId: 1507494024000,
          oldGoodsName: 1507494024000,
          newGoodsId: 1507494024000,
          newGoodsName: 1507494024000,
          updateDate: 1507494024000,
          difference:-1,
        },
        {
          orderId:2,
          iccid:10000,
          distributor:'易鑫2',
          oldGoodsId: 1507494024000,
          oldGoodsName: 1507494024000,
          newGoodsId: 1507494024000,
          newGoodsName: 1507494024000,
          updateDate: 1507494024000,
          difference:-1,
        },
        {
          orderId:3,
          iccid:10000,
          distributor:'易鑫3',
          oldGoodsId: 1507494024000,
          oldGoodsName: 1507494024000,
          newGoodsId: 1507494024000,
          newGoodsName: 1507494024000,
          updateDate: 1507494024000,
          difference:-1,
        },
        {
          orderId:4,
          iccid:10000,
          distributor:'易鑫4',
          oldGoodsId: 1507494024000,
          oldGoodsName: 1507494024000,
          newGoodsId: 1507494024000,
          newGoodsName: 1507494024000,
          updateDate: 1507494024000,
          difference:-1,
        }
      ]
    }
  });
}

/**
 * 分销商对账下载
 * @param params
 * @returns {*}
 */
function downloadBillForDistributor (params) {
  return makeUrl('downloadBillForDistributor',params)
}

/**
 * 供应商对账查询
 * @param params
 * @returns {*}
 */
function searchBillForSuppler (params) {
  return RequestService.get(
    makeUrl('searchBillForSuppler'),
    params
  )
}

/**
 * 供应商对账查询
 * @param params
 * @returns {*}
 */
function downloadBillForSuppler (params) {
  return RequestService.get(
    makeUrl('downloadBillForSuppler'),
    params
  )
}

export {
  searchBillForDistributor, downloadBillForDistributor, searchBillForSuppler, downloadBillForSuppler
}
