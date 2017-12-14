<template>
  <el-main>
    <el-form ref="simEditForm" :model="simEditForm" :label-position="labelPosition" label-width="180px">
      <el-form-item label="当前基础套餐" >
        <el-select v-model="simEditForm.comboId" @change="mealChange" placeholder="请选择当前基础套餐">
          <el-option
              v-for="item in selectActiveGoodsData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="当前基础套餐到期时间" >
        <span style="padding-left: 10px;">{{ simEditForm.date | moment}}</span>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" :disabled="!simEditForm.comboId || edit" @click="submitForm">保 存</el-button>
          <el-button @click="cancelForm">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  import { editSim , selectActiveGoods } from  '../../services/SimManageService';
  import { event } from './SimConfig';
  export default {
    props:["editParams"],
    data () {
      return {
        formName: 'simEditForm',
        labelPosition:"right",
        selectActiveGoodsData:[],
        simEditForm:{},
        edit:true
      }
    },
    created() {
       this.getSelectActiveGoods();
    },
    methods:{
      /*  获取可修改的套餐
      * */
      getSelectActiveGoods(){
          let edit = this.$props.editParams;
          let iccid = edit.iccId;
          let vm = this;
          this.simEditForm = {
              comboId:edit.comboId
          };
          selectActiveGoods({ iccId:iccid}).then((result) => {
              result.forEach((item , index) => {
                  vm.$data.selectActiveGoodsData.push({
                      id:item.id,
                      name:item.name,
                      date:item.basicExpirationDate
                  });
                  if( item.id == edit.comboId ){
                      vm.$data.simEditForm.date = item.basicExpirationDate.time;
                  };
              });
          }).catch((err) => {
              this.$message.error(err.message)
          })
      },
      mealChange() {
          let id =  this.simEditForm.comboId;
          let vm = this;
          this.edit = false;
          if(!this.$data.selectActiveGoodsData) return ;

          this.$data.selectActiveGoodsData.forEach((item) => {
               if( id == item.id ) {
                  vm.simEditForm.date = item.date.time;
               }
          })
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
      request(){
         let iccid = this.$props.editParams.iccId;  // sim卡id
         let newGoodsId = this.$data.simEditForm.comboId; // 新套餐id
         let params = {
           iccId:iccid,
           newGoodsId:newGoodsId
         };
         this.$confirm("确定要修改吗","提示",{
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
         }).then(() => {
             editSim( params ).then((result) => {
                this.$message({message:"修改成功", type: 'success'});
                this.close();
             }).catch((err)=>{
                this.$message.error( err.message );
             })
         }).catch(() => {
              this.close();
         })

      },
      cancelForm() {
          this.close();
      },
      close (refresh=false) {
          this.$emit(event.CLOSE_DIALOG, refresh);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
