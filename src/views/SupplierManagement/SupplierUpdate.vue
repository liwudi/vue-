<template>
  <el-main>
    <el-form ref="supplierUpdateForm" :rules="rules" :model="supplierUpdateForm" label-width="100px" size="medium">
      <el-form-item label="供应商名称" prop="supplierName">
        <el-input v-model="supplierUpdateForm.supplierName" placeholder="请输入供应商名称"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name">
        <el-input v-model="supplierUpdateForm.name" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="supplierUpdateForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="supplierUpdateForm.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  import { event} from './SupplierConfig';
  import { getRules } from './SupplierRules';
  const rules = getRules();
  import { getSupplier, updateSupplier } from '../../services/SupplierManagementService';

  export default {
    props: ['sId'],
    data() {
      return {
        formName: 'supplierUpdateForm',
        supplierUpdateForm: {

          supplierName: '',
          name: '',
          phone: '',
          email: ''
        },
        rules: rules
      }
    },
    created() {
      this.supplierUpdateForm = this.$props.sId;

    },
    methods: {

      request() {
        let params = this.$data.supplierUpdateForm;
        params.supplierId = this.$props.sId.id;
        updateSupplier(params).then((err) => {
          if(err){
            this.$message({type: 'warning', message: err.message});
          }else{
            this.openMessage();
          }
        });
      },
      openMessage() {
        this.$alert('供应商修改成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {this.close(true);}
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
      },
      close(refresh=false) {
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
