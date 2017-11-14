<template>
  <el-main>
    <h3>用户管理</h3>
    <div>
      <el-form ref="userForm" :inline="true" :rules="rules" :model="userForm" class="demo-form-inline demo-ruleForm">
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
            <el-option
              v-for="item in sex"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="userForm.state" placeholder="请选择用户状态">
            <el-option
              v-for="item in state"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <router-link :to="{name: 'userAdd'}"><el-button type="primary">创建用户</el-button></router-link>
      <el-tag type="info">默认密码：{{defaultPassword}}</el-tag>
    </div>
    <div>
      <el-table
        :data="tableData">
        <el-table-column
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="userName"
          label="用户名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="loginName"
          label="姓名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          align="center"
          prop="state"
          label="用户状态">
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <router-link :to="{name: 'UserUpdate', params: { userId: 111 }}">
              <el-button size="mini">修改</el-button>
            </router-link>

            <el-button
              size="mini"
              type="danger"
              @click="userDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="userPasswordReset(scope.$index, scope.row)">密码重置</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
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
  </el-main>
</template>

<script>
  import {sex, state, rules} from './UserConfig';
  import {searchUser, deleteUser, resetUserPassword} from '../../services/UserManagementService';
  export default {
    data() {
      return {
        defaultPassword: 'yx8888',
        formName: 'userForm',
        sex, state,
        userForm: {
          userName: 'liufang',
          loginName: '',
          sex: 3,
          phone: '',
          state: 3,
          pageNum: 1,
          pageSize: 10
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
    },
    methods: {
      openMessage(message, confirmText) {
        this.$confirm(message, '提示', {
          cancelButtonText: '取消',
          confirmButtonText: confirmText
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.request();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
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
        let params = this.$data.userForm;
        params.pageNum = val;
        this.request();
      },
      request () {
        let params = this.$data.userForm;
        console.info(params)
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
        let formName = this.$data.formName;
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .user-wrapper {
    >div {
      margin: 5px 0;
    }
  }
</style>
