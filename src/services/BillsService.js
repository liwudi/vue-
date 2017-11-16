import RequestService from './commonService'
import Qs from 'qs';

let serviceUrl = ''

function makeUrl (path, params = null) {
  if(params){
    return serviceUrl + path + '?' + Qs.stringify(params);
  }else{
    return serviceUrl + path;
  }
}

function setServiceUrl (url) {
  if (url) {
    serviceUrl = url
  }
}

export default {
  setServiceUrl: setServiceUrl,

  /**
   * 分销商对账查询
   * @param params
   * @returns {*}
   */
  searchBillForDistributor: function (params) {
    return new Promise((r) => {
      r({
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
          }
        ]
      })
    })
    return RequestService.get(
      makeUrl('/api-ni-flow/searchBillForDistributor'),
      params
    )
  },
  /**
   * 分销商对账下载
   * @param params
   * @returns {*}
   */
  downloadBillForDistributor: function (params) {
    return makeUrl('/api-ni-flow/downloadBillForDistributor',params)
  },
  /**
   * 供应商对账查询
   * @param params
   * @returns {*}
   */
  searchBillForSuppler: function (params) {
    return RequestService.get(
      makeUrl('/api-ni-flow/searchBillForSuppler'),
      params
    )
  },
  /**
   * 供应商对账下载
   * @param params
   * @returns {*}
   */
  downloadBillForSuppler: function (params) {
    return makeUrl('/api-ni-flow/downloadBillForSuppler',params)
  }
}
