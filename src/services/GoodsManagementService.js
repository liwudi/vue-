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
    makeUrl('/manager/goods/searchNiGoods'),
    params
  )
}
/*
*   供应商品列表 && 四维商品添加
*/
function searchSupplierGoods( params ) {
  return RequestService.get(
    makeUrl('/manager/goods/searchSupplierGoods'),
    params
  )
}

/*
*   获取分销商列表
*/
function getAllDistributor( ) {
  return RequestService.get(makeUrl("/manager/biz/getAllDistributor"))
}
/*
*   获取供应商列表
*/
function getAllSupplier() {
  return RequestService.get(makeUrl("/manager/biz/getAllSupplier"));
}


/*
*   获取商品类型
*/
function searchPackageType(params) {
  return RequestService.get(makeUrl("/manager/goods/searchPackageType"),params);
}

/*
*   可选商品添加
*/
function addSupplierGoods(params) {
  return RequestService.post(
    makeUrl('/manager/goods/addNiGoods'),
    params
  )
}

/*
*   供应商商品增加
*/
function addSupplyGoods(params) {
  return RequestService.post(makeUrl('/manager/goods/addSupplyGoods'), params);
}

/*
*   基础商品、可选商品查看详情
*/
function searchRelationGoods_niId(params) {
  return RequestService.get(makeUrl('/manager/goods/searchRelationGoods_niId'), params);
}

/*
*   供应商品查看详情
*/
function searchRelationGoods_sId(params) {
  return RequestService.get(makeUrl('/manager/goods/searchRelationGoods_sId'), params);
}

function updateGoodsState(params) {
  return RequestService.get(makeUrl('/manager/goods/updateGoodsState'), params);
}


export {
  searchNiGoods, searchSupplierGoods, getAllDistributor, getAllSupplier, searchPackageType,  searchRelationGoods_niId, searchRelationGoods_sId, addSupplyGoods, addSupplierGoods, updateGoodsState
}
