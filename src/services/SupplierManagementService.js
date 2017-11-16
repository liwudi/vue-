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

  //供应商列表
  searchSupplierList: function (params) {
    return new Promise((r) => {
      r({
        "pageNum": 1,
        "pageSize": 0,
        "total": 10,
        "pages": 1,
        list:[
          {
            supplierId: '1',
            date: '2016-05-03',
            supplerName: '翼卡',
            name: '王小虎',
            phone: '15110194995',
            email: '000@mapbar.com'
          }, {
            supplierId: '2',
            date: '2016-05-02',
            supplerName: '翼卡1',
            name: '王小虎1',
            phone: '15110194995',
            email: '111@mapbar.com'
          }, {
            supplierId: '3',
            date: '2016-05-04',
            supplerName: '翼卡2',
            name: '王小虎2',
            phone: '15110194995',
            email: '222@mapbar.com'
          }, {
            supplierId: '4',
            date: '2016-05-01',
            supplerName: '翼卡3',
            name: '王小虎3',
            phone: '15110194995',
            email: '333@mapbar.com'
          }
        ]
      })
    })
    return RequestService.get(
      makeUrl('/api-ni-flow/searchSupplier'),
      params
    )
  },

  //添加
  addSupplier: function (params) {
    return RequestService.post(
      makeUrl('/api-ni-flow/addSupplier'),
      params
    )
  },
  // 修改
  updateSupplier: function (supplerName, name, email,phone) {
    return RequestService.get(
      makeUrl('/api-ni-flow/updateSupplier'),
      {
        supplerName:supplerName,
        name: name,
        email:email,
        phone:phone
      }
    )
  },
  //删除
  deleteDistributor: function (supplerId) {
    return RequestService.get(
      makeUrl('/api-ni-flow/deleteDistributor'),
      {
        supplerId:supplerId
      }
    )
  }


}
