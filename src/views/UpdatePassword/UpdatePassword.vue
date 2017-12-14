<template>
  <el-main>
    <el-form ref="updatePasswordForm"   :model="updatePasswordForm" label-width="100px" size="medium">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="updatePasswordForm.oldPassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="updatePasswordForm.newPassword" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" >
        <el-input v-model="updatePasswordForm.qnewPassword" placeholder="请再次输入新密码"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  const event = {
    CLOSE_DIALOG: 'CLOSE_DIALOG'
  };
  import commonService from '../../services/commonService'
  import ssoService from '../../services/sso.service'

  export default {
    data() {
      return {
        formName: 'updatePasswordForm',
        updatePasswordForm: {
          userId:1,
          oldPassword: '',
          newPassword: '',
          qnewPassword: '',
        }
      }
    },

    methods: {
      request() {
        let params = this.$data.updatePasswordForm;
        ssoService.updatePassword(params).then(() => {
          this.openMessage();
        }).catch((err) => {
          this.$message({type: 'warning', message: err.message});
        });
      },
      openMessage() {
        this.$alert('密码修改成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.close(true);
          }
        });
      },
      close(refresh=false) {
        this.$emit(event.CLOSE_DIALOG, refresh);
      },
      goToList() {
        this.$router.back();
      },
      onSubmit() {
        let formName = this.$data.formName;
        this.$refs[formName].validate((valid) => {
          if(valid) this.request();
          return valid;
        });
      },
      onCancel() {
        this.close();
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
</style>
