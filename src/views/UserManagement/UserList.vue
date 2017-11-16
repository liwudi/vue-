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
          <template slot-scope="scope">{{sex[scope.row.sex - 1].label}}</template>
        </el-table-column>
        <el-table-column align="center" prop="state" label="用户状态">
          <template slot-scope="scope">{{state[scope.row.sex - 1].label}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" type="info" title="修改" @click="userUpdateVisible(true)"><i class="el-icon-edit"></i></el-button>
              <el-button size="mini" type="danger" title="删除" @click="userDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
              <el-button size="mini" type="default" title="密码重置" @click="userPasswordReset(scope.$index, scope.row)"><i class="el-icon-more"></i></el-button>
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
    <el-dialog title="创建用户" :visible.sync="userDialog.addVisible" width="65%" :close-on-click-modal="false" :close-on-press-escape="false"><user-add></user-add></el-dialog>
    <el-dialog title="修改信息" :visible.sync="userDialog.updateVisible" width="65%" :close-on-click-modal="false" :close-on-press-escape="false"><user-update></user-update></el-dialog>
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
    sex: 3,
    phone: '',
    state: 3,
    pageNum: 1,
    pageSize: 10
  };

  export default {
    components:{
      userAdd, userUpdate
    },
    data() {
      return {
        userDialog: {
          addVisible: false,
          updateVisible: false
        },
        defaultPassword: 'yx8888',
        formName: 'userForm',
        sex, state,
        userForm: {
          ...defaultUserForm
        },
        rules: rules,
        tableData: [],
        page: {/*
          pageNum: 1,
          pageSize: 20,
          total: 200,
          pages: 1*/
        }
      }
    },
    created() {
      this.request();
      this.$root.$on(event.CLOSE_ADD_USER, (refresh) => {
        this.userAddVisible(false);
        refresh && this.pageCurrentChange(1);
      });
      this.$root.$on(event.CLOSE_UPDATE_USER, (refresh) => {
        this.userUpdateVisible(false);
        refresh && this.request();
      });
    },
    methods: {
      userAddVisible (visible) {
        this.$data.userDialog.addVisible = visible;
      },
      userUpdateVisible (visible) {
        this.$data.userDialog.updateVisible = visible;
      },
      openMessage(message, confirmText) {
        this.$confirm(message, '提示', {
          cancelButtonText: '取消',
          confirmButtonText: confirmText
        }).then(() => {
          this.$message({type: 'success', message: '操作成功!'});
          this.request();
        }).catch(() => {
          this.$message({type: 'info', message: '已取消操作'});
        });
      },
      userDelete(index, row) {
        deleteUser({userId: row.userId}).then(() => {
          this.openMessage('您确定要删除该用户吗？', '删除');
        });
      },
      userPasswordReset(index, row) {
        resetUserPassword({password: row.password, useId: row.userId}).then(() => {
          this.openMessage('您确定要将该用户重置为默认密码吗？', '确定');
        });
      },
      pageSizeChange(val) {
        let params = this.$data.userForm;
        params.pageSize = val;
        this.request();
      },
      pageCurrentChange(val) {
        console.info('current-page', val);
        let params = this.$data.userForm;
        params.pageNum = val;
        this.request();
      },
      request () {
        let params = this.$data.userForm;
        searchUser(params).then((result) => {
          let data = result.data;
          this.$data.tableData = data.list;
          delete data.list;
          this.$data.page = data;
        });
      },
      submitForm() {
        let formName = this.$data.formName;
        this.$refs[formName].validate((valid) => {
          if(valid) this.request();
          return valid;
        });
      },
      resetForm() {
        this.$data.userForm = {
          ...defaultUserForm
        }
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
</style>
