'use strict';
const totalFlows = [
  { label:"无限流量",value:"1"},
  { label:"流量设置",value:"2"}
];
const optionalGoodType = [
  { label:"充值套餐",value:"1"},
  { label:"续费套餐",value:"2"}
];

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
  totalFlows , optionalGoodType, getRules
}
