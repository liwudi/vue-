<template>
  <el-main>
    <el-form ref="supplierAddForm" :rules="rules" :model="supplierAddForm" label-width="100px" size="medium">
      <el-form-item label="供应商名称" prop="supplierName">
        <el-input v-model="supplierAddForm.supplierName" placeholder="请输入供应商名称"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name">
        <el-input v-model="supplierAddForm.name" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="supplierAddForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="supplierAddForm.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  import { event} from './SupplierConfig';
  import { getRules } from './SupplierRules';
  const rules = getRules();
  import { addSupplier } from '../../services/SupplierManagementService';

  export default {
    data() {
      return {
        formName: 'supplierAddForm',
        supplierAddForm: {
          supplierName: '',
          supplierCode: '',
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
    methods: {
      request() {
        let params = this.$data.supplierAddForm;
        addSupplier(params).then(() => {
          this.openMessage();
        }).catch((err)=>{
          this.$message({type: 'warning', message: err.message});
        })
      },
      openMessage() {
        this.$alert('供应商创建成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
              this.close(true);
          }
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
