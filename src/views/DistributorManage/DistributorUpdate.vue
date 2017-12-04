<template>
  <el-main>
    <el-form ref="distributorUpdateForm" :rules="rules" :model="distributorUpdateForm" label-width="100px" size="medium">
      <el-form-item label="分销商名称" prop="distributorName">
        <el-input v-model="distributorUpdateForm.distributorName" placeholder="请输入分销商名称"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name">
        <el-input v-model="distributorUpdateForm.name" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="distributorUpdateForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="distributorUpdateForm.phone" placeholder="请输入手机号"></el-input>
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
  import {getRules} from './DistributorRules';
  const rules = getRules();
  import { updateDistributor } from '../../services/DistributorManageService';

  export default {
    props: ['distributorId'],
    data() {
      return {
        formName: 'distributorUpdateForm',
        distributorUpdateForm: {
          distributorName: '',
          name: '',
          phone: '',
          email: ''
        },
        rules: rules
      }
    },
    created() {
      this.distributorUpdateForm = this.$props.distributorId;
    },
    methods: {
      close(refresh=false) {
        this.$emit(event.CLOSE_DIALOG, refresh);
      },
      goToList() {
        this.$router.back();
      },
      openMessage() {
        this.$alert('分销商修改成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.close(true);
          }
        });
      },
      request() {
        let params = this.$data.distributorUpdateForm;
        params.distributorId = this.$props.distributorId.id;
        updateDistributor(params).then(() => {
          this.openMessage();
        }).catch((err)=>{
          this.$message({type: 'warning', message: err.message});
        });
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
