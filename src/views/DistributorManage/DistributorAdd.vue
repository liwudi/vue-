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
  import { addDistributor } from '../../services/DistributorManageService';

  export default {
    data() {
      var validateDistributorName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入分销商名称'));
        }
        if (!String(value).match(/[^\/w+$][^\u4e00-\u9fa5]/)) {
          return callback(new Error('分销商名称格式错误，只能是数字、字母和符号'));
        }
      };
      const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var validateEmail = (rule, value, callback) => {
        if(!value || emailReg.test(value)) {
          callback();
        } else callback('邮箱格式错误');
      };
      const phoneReg = /^\d{11}$/;
      var validatePhone = (rule, value, callback) => {
        if(!value || phoneReg.test(value)) {
          callback();
        } else callback('手机号格式错误，只能为11位数字');
      };
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
        rules: {
          distributorName: [
            {required: true, message: '请输入分销商名称', trigger: 'change'},
            {max: 16, message: '分销商名称字符长度为1-16', trigger: 'change'},
            {validator: validateDistributorName, trigger: 'change'}
          ],
          name: [
            {max: 20, message: '联系人最大长度为20', trigger: 'change'}
          ],
          email: [
            {validator: validateEmail, trigger: 'change'}
          ],
          phone: [
            {validator: validatePhone, trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      request() {
        let params = this.$data.distributorAddForm;
        addDistributor(params).then(() => {
          console.log(params);
          this.openMessage();
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
        console.log('aaa');
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
