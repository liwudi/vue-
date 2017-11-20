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
   return Promise.resolve({
     data: {
       pageNum: 3,
       pageSize: 20,
       total: 50,
       pages: 4,
       list: [{
         iccid:"8986061501000338984",
         distributorId:"易鑫1",
         supplierId:"翼卡1",
         activationDate:"2011-03-12",
         updateDate:"2016-07-20",
         expirationDate:"2012-04-10",
       },{
         iccid:"894433654646666422",
         distributorId:"易鑫2",
         supplierId:"翼卡2",
         activationDate:"2006-05-02",
         updateDate:"2016-12-10",
         expirationDate:"2017-03-15",
       },{
         iccid:"89860619479045662456",
         distributorId:"易鑫3",
         supplierId:"翼卡3",
         activationDate:"2016-05-02",
         updateDate:"2016-04-10",
         expirationDate:"2013-05-19",
       },{
         iccid:"8984245636688696555",
         distributorId:"易鑫4",
         supplierId:"翼卡4",
         activationDate:"2016-05-02",
         updateDate:"2016-04-10",
         expirationDate:"2016-01-20",
       }]
     }
   });
};

/*
*  sim卡编辑
* */
function  editSim() {

    return Promise.resolve();

};

/*
*   详情查询
* */
function detailSim(params) {
    console.log(params);
    return Promise.resolve({
        data:{
          iccid:"333dsfvgfsd",
          distributor:"易鑫",
          suppler:"翼卡",
          state:"1",
          activationDate:"1507494024000,",
          updateDate:" 1507494024000",
          expirationDate:"1507494024000",
          curResidualFlow:"2345",
          optionGoods:[
            {
              goodsId:"10000",
              goodsName:"1G月包",
              price:"20.0",
              effectiveDate:"1G",
              expirationDate:"月",
              supplier:"翼卡"
            },
            {
              goodsId:"1333",
              goodsName:"5G月包",
              price:"50.0",
              effectiveDate:"1G",
              expirationDate:"月",
              supplier:"翼卡"
            }
          ]
        }
    });
};
export {
  querySimList , editSim , detailSim
}



