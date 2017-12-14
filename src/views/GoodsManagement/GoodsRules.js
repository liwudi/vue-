'use strict';
function getRules () {
  return {
    name: [
      {required: true, message: '请输入商品名称', trigger: 'change'},
      {max: 10, message: '商品名称最大字符长度为10', trigger: 'change'}
    ],
    supplierId: [
      {required: true, message: '请选择供应商', trigger: 'change'}
    ],
    totalFlow: [
      {required: true, message: '请选择商品规格', trigger: 'change'}
    ],
    type: [
      {required: true, message: '请选择商品类型', trigger: 'change'}
    ],
    message: [
      {max: 100, message: '商品介绍最大字符长度为100', trigger: 'change'}
    ],
    distributorId: [
      { required: true, message: '请选择分销商', trigger: 'change'}
    ]

  };
}
export {
  getRules
}
