import CommonService from './commonService';
const rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

function addDistributor(params) {
  //return CommonService.post(makeUrl('/api-ni-flow/biz/manager/addDistributor'), params)
  console.log(makeUrl('/biz/manager/addDistributor'));
  return CommonService.post(makeUrl('/biz/manager/addDistributor'), params)
    .then((result) => {
      console.log(result);
      return result;
    }).catch((e) => {
      console.log(e);
    });
  //return Promise.resolve();
}

function deleteDistributor(params) {
  //return CommonService.get(makeUrl('/api-ni-flow/biz/manager/deleteDistributor'), params)
  return CommonService.get(makeUrl('/biz/manager/deleteDistributor'), params)
    .then((result) => {
      return result;
    }).catch((e) => {
      console.log(e);
    });
  //return Promise.resolve();
}

function updateDistributor(params) {
  //return CommonService.post(makeUrl('/api-ni-flow/biz/manager/updateDistributor'), params)
  return CommonService.post(makeUrl('/biz/manager/updateDistributor'), params)
    .then((result) => {
      console.log(result);
      return result;
    }).catch((e) => {
      console.log(e)
    });
  //return Promise.resolve();
}

function getDistributor(params) {
  //return CommonService.get(makeUrl('/api-ni-flow/biz/manager/searchDistributor'), params)
  return CommonService.get(makeUrl('/biz/manager/searchDistributor'), params)
    .then((result) => {
      return result;
    }).catch((e) => {
      console.log(e);
    });
}

function getDistributorDetail(params) {
  /*//return CommonService.get(makeUrl('/api-ni-flow/searchDistributor'), params)
  return CommonService.get(makeUrl('/searchDistributor'), params)
    .then((result) => {
      console.log(result);
      return result;
    }).catch((e) => {
      console.log(e);
    });*/
  return Promise.resolve({
    data: {
        distributorId: 1,
        distributorName: 'yixin',
        name: '田一',
        phone: '13345678910',
        email: 'tianyi@qq.com',
        createTime: '2017-11-01'
    }
  });
}

export {
  addDistributor, deleteDistributor, updateDistributor, getDistributor, getDistributorDetail
}
