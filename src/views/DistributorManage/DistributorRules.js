'use strict';

const distributorNameReg = /[^\/w+$]/;
function validateDistributorName (rule, value, callback) {
  if(!value || distributorNameReg.test(value)) {
    callback();
  } else callback('分销商名称格式错误，只能是数字、字母和符号');
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

function getRules (distributorNameRequired = true) {
  return {
    distributorName: [
      {required: distributorNameRequired, message: '请输入分销商名称', trigger: 'change'},
      {validator: validateDistributorName, trigger: 'change'},
      {max: 16, message: '分销商名称字符长度为1-16', trigger: 'change'}
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
