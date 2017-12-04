'use strict';

const supplierNameReg = /[^\/w+$]/;
function validatesupplierName (rule, value, callback) {
  if(!value || supplierNameReg.test(value)) {
    callback();
  } else callback('供应商名称格式错误，只能是数字、字母和符号');
}

const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
function validateEmail (rule, value, callback) {
  if(!value || emailReg.test(value)) {
    callback();
  } else callback('邮箱格式错误');
}

const phoneReg = /^\d{11}$/;
function validatePhone(rule, value, callback) {
  if(!value || phoneReg.test(value)) {
    callback();
  } else callback('手机号格式错误，只能为11位数字');
};

function getRules (supplierNameRequired = true) {
  return {
    supplierName: [
      {required: supplierNameRequired, message: '请输入供应商名称', trigger: 'change'},
      {validator: validatesupplierName, trigger: 'change'},
      {min: 1,max: 16, message: '供应商名称字符长度为1-16', trigger: 'change'}
    ],
    name: [
      {max: 20, message: '联系人最大长度为20', trigger: 'change'}
    ],
    email: [
      {validator: validateEmail, trigger: 'change'}
    ],
    phone: [
      {validator: validatePhone, trigger: 'change'}
    ]
  };
}
export {
  getRules
}
