<template>
  <el-main>
    <el-form ref="simEditForm" :model="simEditForm" :label-position="labelPosition" label-width="180px">
      <el-form-item label="当前基础套餐" >
        <el-select v-model="simEditForm.setMeal" @change="mealChange" placeholder="请选择当前基础套餐">
          <el-option
              v-for="item in setMeals"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="当前基础套餐到期时间" >
        <span style="padding-left: 10px;">{{simEditForm.expirationDate}}</span>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="submitForm">保 存</el-button>
          <el-button @click="cancelForm">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  import { editSim } from  '../../services/SimManageService';
  import { event } from './SimConfig';
  export default {
    props:["editIccid","editDate"],
    data () {
      return {
        formName: 'simEditForm',
        labelPosition:"right",
        setMeals:[
          {label:"25G*1年套餐",value:"25G*1年套餐"},
          {label:"25G*2年套餐",value:"25G*2年套餐"}
        ],
        simEditForm:{
          setMeal:"25G*1年套餐",
          expirationDate:""
        }
      }
    },
    created() {
      this.$data.simEditForm.expirationDate =  this.$props.editDate;
    },
    methods:{
      mealChange() {
          console.log(this.$data.simEditForm.setMeal);
      },
      request() {
          let params = this.$data.simEditForm;
          editSim(params).then(() => {
             this.close(true);
             this.openMessage();
          });
      },
      openMessage() {
          this.$message({type: 'success', message: '操作成功!'});
      },
      submitForm() {
          let formName = this.$data.formName;
          this.$refs[formName].validate((valid) => {
              if(valid) this.request();
              return valid;
          });

      },
      cancelForm() {
          this.close();
      },
      close (refresh=false) {
          this.$root.$emit(event.CLOSE_EDIT_SIM, refresh);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
