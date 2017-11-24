import CommonService from './commonService';
const rootPath = '';
function makeUrl (path) {
  return `${rootPath}${path}`;
}

function addDistributor(params) {
  /*//return CommonService.post(makeUrl('/api-ni-flow/addDistributor'), params)
  return CommonService.post(makeUrl('/addDistributor'), params)
    .then((result) => {
      console.log(result);
      return result;
    }).catch((e) => {
      console.log(e);
    });*/
  return Promise.resolve();
}

function deleteDistributor(params) {
  /*//return CommonService.get(makeUrl('/api-ni-flow/deleteDistributor'), params)
  return CommonService.get(makeUrl('/deleteDistributor'), params)
    .then((result) => {
      console.log(result);
      return result;
    }).catch((e) => {
      console.log(e)
    });*/
  return Promise.resolve();
}

function updateDistributor(params) {
  /*//return CommonService.post(makeUrl('/api-ni-flow/updateDistributor'), params)
  return CommonService.post(makeUrl('/updateDistributor'), params)
    .then((result) => {
      console.log(result);
      return result;
    }).catch((e) => {
      console.log(e)
    });*/
  return Promise.resolve();
}

function getDistributor(params) {
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
      pageNum: 1,
      pageSize: 10,
      total: 30,
      pages: 3,
      list: [{
        distributorId: 1,
        distributorName: 'yixin',
        name: '田一',
        phone: '13345678910',
        email: 'tianyi@qq.com',
        createTime: '2017-11-01'
      }, {
        distributorId: 2,
        distributorName: 'baidu',
        name: '小二',
        phone: '15545678910',
        email: 'xiaoer@qq.com',
        createTime: '2017-11-05'
      }, {
        distributorId: 3,
        distributorName: 'tengxun',
        name: '张三',
        phone: '18845678910',
        email: 'zhangsan@qq.com',
        createTime: '2017-11-10'
      }, {
        distributorId: 4,
        distributorName: 'jingdong',
        name: '李四',
        phone: '15545678910',
        email: 'lisi@qq.com',
        createTime: '2017-11-15'
      }, {
        distributorId: 5,
        distributorName: 'ali',
        name: '王五',
        phone: '18845678910',
        email: 'wangwu@qq.com',
        createTime: '2017-11-20'
      }]
    }
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
