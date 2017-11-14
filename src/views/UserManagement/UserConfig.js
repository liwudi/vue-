/**
 * Created by cryst on 2017/11/14.
 */
'use strict';

const sex = [{value: 1, label: '男'},{value: 2, label:'女'},{value: 3, label:'不限'}],
      state = [{value: 1, label: '可用'},{value: 2, label: '停用'},{value: 3, label:'所有'}];

const userNameReg = /[^\/w+$]/;
function validateUserName (rule, value, callback) {
  if(userNameReg.test(value)) {
    callback();
  } else callback('用户名格式错误');
}

const userPhoneReg = /\d*/;
function validateUserPhone(rule, value, callback) {
  if(userPhoneReg.test(value)) {
    callback();
  } else callback('手机号格式错误');
};
let rules = {
  userName: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
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
export {
  sex, state, rules
}
