<template>
  <el-main>
    <el-form ref="distributorAddForm" :rules="rules" :model="distributorAddForm" label-width="80px" size="medium">
      <el-form-item label="分销商名称" prop="distributorName">
        <el-input v-model="distributorAddForm.distributorName" placeholder="请输入分销商名称"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name">
        <el-input v-model="distributorAddForm.name" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="distributorAddForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="distributorAddForm.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  const event = {
    CLOSE_DIALOG: 'CLOSE_DIALOG'
  };
  import {getRules} from './DistributorRules';
  const rules = getRules();
  import { addDistributor } from '../../services/DistributorManageService';

  export default {
    data() {
      return {
        formName: 'distributorAddForm',
        distributorAddForm: {
          distributorName: '',
          distributorCode: '',
          city: '',
          name: '',
          phone: '',
          address: '',
          email: '',
          message: ''
        },
        rules: rules
      }
    },
    methods: {
      request() {
        let params = this.$data.distributorAddForm;
        addDistributor(params).then(() => {
          this.openMessage();
        }).catch((err) => {
          this.$message({type: 'warning', message: err.message});
        });
      },
      openMessage() {
        this.$alert('分销商创建成功！', '提示', {
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
