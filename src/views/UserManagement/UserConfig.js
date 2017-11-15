/**
 * Created by cryst on 2017/11/14.
 */
'use strict';

const sex = [{value: 1, label: '男'},{value: 2, label:'女'},{value: 3, label:'不限'}],
      state = [{value: 1, label: '可用'},{value: 2, label: '停用'},{value: 3, label:'所有'}];

const event = {
  CLOSE_ADD_USER: 'CLOSE_ADD_USER',
  CLOSE_UPDATE_USER: 'CLOSE_UPDATE_USER'
};

export {
  sex, state, event
}
