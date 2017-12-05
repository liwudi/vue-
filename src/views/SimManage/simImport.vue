<template>
  <el-main>
    <el-form  :model="simImportForm" >
      <el-upload
        ref="upload"
        :on-change="changeFn"
        :auto-upload="false"
        :show-file-list="false">
        <el-button  size="small" type="text">点击这里上传文件</el-button>
        <div style="color: #000;" >{{ file.name }}</div>
      </el-upload>
      <el-form-item>
        <el-button type="primary" :disabled="importOkBtn" @click="submitUpload">确 定</el-button>
        <el-button @click="cancelForm">取 消</el-button>
        <a style="margin-left: 5px;" :href="getDownloadUrl()" download="" target="_blank" >
           <el-button>下载模板</el-button>
        </a>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  import { batchAddSims , downloadTemplate } from  '../../services/SimManageService';
  import { event } from './SimConfig';
  export default {
    data () {
      return {
        simImportForm:{},
        file:{},
        importOkBtn:false,
      }
    },
    methods:{
      cancelForm() {
        this.close();
      },
      close (refresh=false) {
        this.$emit(event.CLOSE_DIALOG, refresh);
      },
      changeFn(file){
        this.$data.file = file;
      },

      getDownloadUrl(){
          return downloadTemplate();
      },
      submitUpload() {
          if(this.$data.file){
              this.importOkBtn = true;
              let params = {
                  file:this.$data.file
              };
              batchAddSims(params).then((result) => {
                  this.$message.success("上传成功") ;
                  this.importOkBtn = false;
              }).catch((err) => {
                  this.$message.error(err.message);
                  this.importOkBtn = false;
              })
          }else{
              this.$message({
                  message:"请选择要上传的文件",
                  type: 'warning'
              });
          }
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
