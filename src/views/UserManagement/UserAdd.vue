<template>
  <el-main>
    <el-form ref="userForm" :rules="rules" :model="userForm" label-width="80px" size="medium">
      <el-form-item label="用户名" prop="loginName">
        <el-input v-model="userForm.loginName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="userForm.userName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="userForm.sex" placeholder="请选择性别">
          <el-option
            v-for="item in editSex"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="userForm.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>

     <!-- <el-form-item label="用户状态">
        <el-select v-model="userForm.state" placeholder="请选择用户状态" disabled>
          <el-option
            v-for="item in state"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>-->


      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  import {editSex, editState, event} from './UserConfig';
  import {getRules} from './UserRules';
  const rules = getRules();
  import {addUser} from '../../services/UserManagementService';
  export default {
    data() {
      return {
        formName: 'userForm',
        editSex, editState,
        userForm: {
          userName: '',
          loginName: '',
          sex: 1,
          phone: ''
        },
        rules: rules
      }
    },
    methods: {
      request () {
        let params = this.$data.userForm;
        addUser(params).then(() => {
          this.openMessage();
        }).catch((rs)=>{
          if(rs.code==806){
            this.$message({type: 'warning', message: "用户名不能重复"});
          }
        })
      },
      openMessage() {
        this.$alert('用户创建成功，密码为默认密码！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.close(true);
          }
        });
      },
      submitForm() {
        let formName = this.$data.formName;
        this.$refs[formName].validate((valid) => {
          if(valid) this.request();
          return valid;
        });
      },
      cancelForm () {
        this.close();
      },
      close (refresh=false) {
        this.$emit(event.CLOSE_DIALOG, refresh);
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
</style>
