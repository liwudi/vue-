<template>
  <el-main>
    <el-form ref="distributorUpdateForm" :rules="rules" :model="distributorUpdateForm" label-width="80px" size="medium">
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
    CLOSE_UPDATE_DISTRIBUTOR: 'CLOSE_UPDATE_DISTRIBUTOR'
  };
  import { getRules } from './DistributorRules';
  const rules = getRules();
  import { getDistributor, updateDistributor } from '../../services/DistributorManageService';

  export default {
    data() {
      return {
        formName: 'distributorUpdateForm',
        distributorUpdateForm: {
          distributorId: '',
          distributorCode: '',
          distributorName: 'taobao',
          city: '',
          name: '',
          phone: '',
          address: '',
          email: '',
          desc: ''
        },
        rules: rules
      }
    },
    created() {
      this.requestDistributorInfo();
    },
    methods: {
      requestDistributorInfo() {
        getDistributor().then((result) => {
          let data = result.data;
          this.$data.distributorUpdateForm = data;
        });
      },
      close(refresh=false) {
        this.$root.$emit(event.CLOSE_UPDATE_DISTRIBUTOR, refresh);
      },
      goToList() {
        this.$router.back();
      },
      openMessage() {
        this.$alert('分销商修改成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.close(true);
            //this.goToList();
          }
        });
      },
      request() {
        let params = this.$data.distributorUpdateForm;
        updateDistributor(params).then(() => {
          this.openMessage();
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
