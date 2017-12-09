import RequestService from './commonService';

const rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

/*
*   基础商品和可选商品列表
*   @params
*/
function searchNiGoods(params) {
  return RequestService.get(
    makeUrl('/goods/manager/searchNiGoods'),
    params
  )
}
/*
*   供应商品列表
*/
function searchSupplierGoods( params ) {
  return RequestService.get(
    makeUrl('/goods/manager/searchSupplierGoods'),
    params
  )
}

/*
*   获取分销商列表
*/
function getAllDistributor( ) {
  return RequestService.get(makeUrl("/biz/manager/getAllDistributor"))
}
/*
*   获取供应商列表
*/
function getAllSupplier() {
  return RequestService.get(makeUrl("/biz/manager/getAllSupplier"));
}


/*
*   获取商品类型
*/
function searchPackageType(params) {
  return RequestService.get(makeUrl("/goods/manager/searchPackageType"),params);
}

/*
*   可选商品添加
*/
function addSupplierGoods(params) {
  return RequestService.post(
    makeUrl('/goods/manager/addNiGoods'),
    params
  )
}

/*
*   供应商商品增加
*/
function addSupplyGoods(params) {
  return RequestService.post(makeUrl('/goods/manager/addSupplyGoods'), params);
}

/*
*   基础商品查看详情
*/
function searchRelationGoods(params) {
  return RequestService.get(makeUrl('/goods/manager/searchRelationGoods'), params);
}

/*
*   供应商查看详情
*/
function searchRelationSupplyGoods(params) {
  return RequestService.get(makeUrl('/goods/manager/searchRelationSupplyGoods'), params);
}


function updateGoodsState(params) {
  return RequestService.get(makeUrl('/goods/manager/updateGoodsState'), params);
}


export {
  searchNiGoods, searchSupplierGoods, getAllDistributor, getAllSupplier, searchPackageType, searchRelationGoods, searchRelationSupplyGoods, addSupplyGoods, addSupplierGoods, updateGoodsState
}
