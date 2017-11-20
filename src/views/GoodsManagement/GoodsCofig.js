'use strict';
const totalFlows = [
  { label:"无限流量",value:"1"},
  { label:"流量设置",value:"2"}
];
const optionalGoodType = [
  { label:"充值套餐",value:"1"},
  { label:"续费套餐",value:"2"}
];
const event = {
  CLOSE_EDIT_SIM: 'CLOSE_EDIT_SIM',
  CLOSE_DETAIL_SIM: 'CLOSE_DETAIL_SIM'
};

export {
  event , totalFlows , optionalGoodType
}
