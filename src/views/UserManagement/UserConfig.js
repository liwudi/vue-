/**
 * Created by cryst on 2017/11/14.
 */
'use strict';

const sex = [{value: 1, label: '男'},{value: 2, label:'女'},{value: '', label:'不限'}],
      editSex = [{value: 1, label: '男'},{value: 2, label:'女'}],
      state = [{value: 1, label: '可用'},{value: 2, label: '停用'},{value: '', label:'不限'}],
      editState = [{value: 1, label: '可用'},{value: 2, label: '停用'}];

const event = {
  CLOSE_DIALOG: 'CLOSE_DIALOG'
};

export {
  sex, state, event,editState,editSex
}
