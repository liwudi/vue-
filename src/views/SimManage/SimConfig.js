'use strict';
const distributors = [
  { label:"全部",value:"1"},
  { label:"易鑫",value:"2"},
  { label:"双薪",value:"3"},
  { label:"三薪",value:"4"}
];
const suppliers = [
  { label:"全部",value:"1"},
  { label:"翼卡",value:"2"},
  { label:"善领",value:"3"}
];
const event = {
  CLOSE_EDIT_SIM: 'CLOSE_EDIT_SIM',
  CLOSE_DETAIL_SIM: 'CLOSE_DETAIL_SIM'
};

export {
   event , distributors , suppliers
}
