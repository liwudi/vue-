'use strict';
const statusArr = [{ id:1, name:"启用"},{ id:2, name:"停用"},{ id:'', name:"全部"}],
      cycle = [{key:2,value:'月'},{key:3,value:'年'}],
      cycleValue = [[1,2,3,4,5,6,7,8,9,10,11,12],[1,2,3]],
      totalFlows = [{ id:"-1", name:"无限流量"},{ id:"1", name:"流量设置"}];
function getRules () {
  return {
    name: [
      {required: true, message: '请输入商品名称', trigger: 'change'},
      {max: 10, message: '商品名称最大字符长度为10', trigger: 'change'}
    ],
    totalFlow: [
      {required: true, message: '请选择商品规格', trigger: 'change'}
    ],
    type: [
      {required: true, message: '请选择商品类型', trigger: 'change'}
    ],
    desc: [
      {max: 100, message: '商品介绍最大字符长度为100', trigger: 'change'}
    ],
    supplierId: [
      {required: true, message: '请选择供应商', trigger: 'change'}
    ]
  };
}

export {
  statusArr ,totalFlows ,cycle ,cycleValue , getRules
}
