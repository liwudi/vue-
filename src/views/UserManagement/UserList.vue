<template>
  <el-main>
    <div class="tpl-title">用户管理</div>
    <div class="tpl-mg-t">
      <el-form ref="userForm" :inline="true" :rules="rules" :model="userForm" class="tpl-form-inline" size="medium">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="loginName">
          <el-input v-model="userForm.loginName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userForm.sex" placeholder="请选择性别">
            <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="userForm.state" placeholder="请选择用户状态">
            <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" @click="userAddVisible(true)" size="medium">创建用户</el-button>
      <p class="tpl-p">默认密码：{{defaultPassword}}</p>
    </div>
    <div class="tpl-mg">
      <el-table :data="tableData" stripe border>
        <el-table-column label="序号" align="center" width="96">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column align="center" prop="userName" label="用户名"></el-table-column>
        <el-table-column align="center" prop="loginName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别">
          <template slot-scope="scope">{{scope.row.sex ? scope.row.sex === 1 ? '男' : '女'  : '未知'}}</template>
        </el-table-column>
        <el-table-column align="center" prop="state" label="用户状态">
          <template slot-scope="scope">{{scope.row.state ? scope.row.state === 1 ? '可用' : '停用'  : '未知'}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" type="info" title="修改" @click="userUpdateVisible(true, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" title="删除" @click="userDelete(scope.row)">停用</el-button>
              <el-button size="mini" type="default" title="密码重置" @click="userPasswordReset(scope.row)">重置密码</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[10, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <el-dialog title="创建用户" :visible.sync="dialog.visible.add" width="65%" :close-on-click-modal="false" :close-on-press-escape="false"
               v-if="dialog.visible.add">
      <user-add v-on="dialog.event.add"></user-add></el-dialog>
    <el-dialog title="修改信息" :visible.sync="dialog.visible.update" width="65%" :close-on-click-modal="false" :close-on-press-escape="false"
               v-if="dialog.visible.update">
      <user-update v-on="dialog.event.update" :uid="user"></user-update>
    </el-dialog>
  </el-main>
</template>

<script>
  import {sex, state, event} from './UserConfig';
  import {getRules} from './UserRules';
  const rules = getRules(false);
  import {searchUser, deleteUser, resetUserPassword} from '../../services/UserManagementService';
  import userAdd from './UserAdd.vue';
  import userUpdate from './UserUpdate.vue';
  const defaultUserForm = {
    userName: '',
    loginName: '',
    sex: '',
    phone: '',
    state: '',
    pageNum: 1,
    pageSize: 10
  };

  export default {
    components:{
      userAdd, userUpdate
    },
    data() {
      return {
        dialog: {
          visible: {add: false, update: false},
          event: {add: {}, update: {}}
        },
        defaultPassword: '888888',
        formName: 'userForm',
        sex, state,
        userForm: {...defaultUserForm},
        rules: rules,
        tableData: [],
        page: {/*
          pageNum: 1,
          pageSize: 20,
          total: 200,
          pages: 1*/
        },
        user: ''
      }
    },
    created() {
      this.request();
      this.$data.dialog.event.add[event.CLOSE_DIALOG] = (refresh) => {
        this.userAddVisible(false);
        refresh && this.pageCurrentChange(1);
      };
      this.$data.dialog.event.update[event.CLOSE_DIALOG] = (refresh) => {
        this.userUpdateVisible(false);
        refresh && this.request();
      };
    },
    methods: {
      userAddVisible (visible) {
        this.$data.dialog.visible.add = visible;
      },
      userUpdateVisible (visible, user) {
        this.$data.user = Object.assign({},user);
        this.$data.dialog.visible.update = visible;
      },
      openMessage(message, confirmText,doit) {
        this.$confirm(message, '提示', {
          cancelButtonText: '取消',
          confirmButtonText: confirmText
        }).then(() => {
          doit();
        }).catch(() => {
        });
      },
      userDelete(row) {
        this.openMessage('您确定要停用该用户吗？', '停用',()=>{
          deleteUser({userId: row.id}).then(() => {
            this.$message({type: 'success', message: '操作成功!'});
            this.request();
          }).catch((err)=>{
            this.$message({type: 'error', message: err.message});
          })
        });
      },
      userPasswordReset(row) {
        this.openMessage('您确定要将该用户重置为默认密码吗？', '确定',()=>{
          resetUserPassword({userId: row.id}).then(() => {
            this.$message({type: 'success', message: '重置成功!'});
          }).catch((err)=>{
            this.$message({type: 'error', message: err.message});
          })
        });
      },
      pageSizeChange(val) {
        let params = this.$data.userForm;
        params.pageSize = val;
        this.request();
      },
      pageCurrentChange(val) {
        let params = this.$data.userForm;
        params.pageNum = val;
        this.request();
      },
      request () {
        let params = this.$data.userForm;
        searchUser(params).then((result) => {
          this.$data.tableData = result.list;
          this.$data.page = result;
        });
      },
      submitForm() {
        let formName = this.$data.formName;
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.$data.userForm.pageNum = 1;
            this.request();
          }
          return valid;
        });
      },
      resetForm() {
        this.$data.userForm = {
          ...defaultUserForm
        }
        this.request();
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
</style>
