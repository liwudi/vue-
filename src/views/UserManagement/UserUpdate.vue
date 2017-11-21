<template>
  <el-main>
    <el-form ref="userForm" :rules="rules" :model="userForm" label-width="80px" size="medium">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="userForm.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="loginName">
        <el-input v-model="userForm.loginName" placeholder="请输入姓名"></el-input>
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
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="userForm.phone" placeholder="请输入手机号"></el-input>
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
        <el-button type="primary" @click="submitForm">修改</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  import {sex, state, event} from './UserConfig';
  import {getRules} from './UserRules';
  const rules = getRules();
  import {updateUser, getUser} from '../../services/UserManagementService';
  export default {
    props: ['uid'],
    data() {
      return {
        formName: 'userForm',
        sex, state,
        userForm: {
          userName: 'liufang',
          loginName: '',
          sex: 3,
          phone: '',
          state: 1
        },
        rules: rules
      }
    },
    created () {
      this.requestUserInfo();
    },
    methods: {
      requestUserInfo () {
        getUser(this.$props.uid).then((result) => {
          let data = result.data;
          this.$data.userForm = data;
        });
      },
      request () {
        let params = this.$data.userForm;
        updateUser(params).then(() => {
          console.info('success');
          this.openMessage();
        });
      },
      openMessage() {
        this.$alert('信息修改成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {this.close(true);}
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
      },
      goToList() {
        this.$router.back();
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
</style>
