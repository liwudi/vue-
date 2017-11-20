'use strict';

const priceReg = /^\d+\.\d{2}$/;
function validatePrice(rule, value, callback) {
  if(!value || priceReg.test(value)) {
    callback();
  } else callback('格式错误，只能输入数字，小数点后2位');
}

function getRules (idRequired = true, nameRequired = true, totalFlowRequired = true, typeRequired = true, cycleRequired = true, priceRequired = true, supplierIdRequired = true) {
  return {
    id: [
      {required: idRequired, message: '请输入商品ID', trigger: 'change'}
    ],
    name: [
      {required: nameRequired, message: '请输入商品名称', trigger: 'change'},
      {max: 10, message: '商品名称最大字符长度为10', trigger: 'change'}
    ],
    totalFlow: [
      {required: totalFlowRequired, message: '请选择商品规格', trigger: 'change'}
    ],
    type: [
      {required: typeRequired, message: '请选择商品类型', trigger: 'change'}
    ],
    cycle: [
      {required: cycleRequired, message: '请选择周期值', trigger: 'change'}
    ],
    price: [
      {required: priceRequired, message: '请输入商品价格', trigger: 'change'},
      {validator: validatePrice, trigger: 'change'}
    ],
    salePrice: [
      {validator: validatePrice, trigger: 'change'}
    ],
    desc: [
      {max: 100, message: '商品介绍最大字符长度为100', trigger: 'change'}
    ],
    supplierId: [
      {required: supplierIdRequired, message: '请选择供应商', trigger: 'change'}
    ]
  };
}
export {
  getRules
}
