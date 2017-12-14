/**
 * Created by cryst on 2017/11/14.
 */
'use strict';

const userNameReg = /[^\/w+$]/;
function validateLoginName(rule, value, callback) {
  if (!value || userNameReg.test(value)) {
    callback();
  } else callback('用户名格式错误');
}

const userPhoneReg = /^1[34578]\d{9}$/;
function validateUserPhone(rule, value, callback) {
  if (!value || userPhoneReg.test(value)) {
    callback();
  } else callback('手机号格式错误，只能为11位数字');
};

function getRules(loginNameRequired = true) {
  return {
    loginName: [
      {required: loginNameRequired, message: '请输入用户名', trigger: 'change'},
      {validator: validateLoginName, trigger: 'change'},
      {min:4,max: 20, message: '用户名字符长度为4-20位', trigger: 'change'}
    ],
    userName: [
      {max: 20, message: '姓名最大长度为20位', trigger: 'change'}
    ],
    phone: [
      {validator: validateUserPhone, trigger: 'change'}
    ]
  };
}
export {
  getRules
}
