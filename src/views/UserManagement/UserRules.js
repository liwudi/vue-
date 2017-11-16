/**
 * Created by cryst on 2017/11/14.
 */
'use strict';

const userNameReg = /[^\/w+$]/;
function validateUserName(rule, value, callback) {
  if (!value || userNameReg.test(value)) {
    callback();
  } else callback('用户名格式错误');
}

const userPhoneReg = /\d*/;
function validateUserPhone(rule, value, callback) {
  if (!value || userPhoneReg.test(value)) {
    callback();
  } else callback('手机号格式错误');
};

function getRules(userNameRequired = true) {
  return {
    userName: [
      {required: userNameRequired, message: '请输入用户名', trigger: 'change'},
      {validator: validateUserName, trigger: 'change'},
      {max: 16, message: '用户名字符长度为1-16', trigger: 'change'}
    ],
    loginName: [
      {max: 20, message: '姓名最大长度为20', trigger: 'change'}
    ],
    phone: [
      {validator: validateUserPhone, trigger: 'change'},
      {min: 11, max: 11, message: '请输入11位手机号', trigger: 'change'}
    ]
  };
}
export {
  getRules
}
