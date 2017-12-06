<template>
  <el-main>
    <el-form  :model="simImportForm" >
      <el-upload
        ref="upload"
        :action="getImportUrl()"
        :on-change="changeFn"
        :on-success="successFn"
        :on-error="errorFn"
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
        importOkBtn:true
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
        this.importOkBtn = false;
      },
      successFn( res, file, fileList){
          this.$message.success("上传成功");
          this.close();
      },
      errorFn( err, file, fileList){
          this.$message.success( err.message );
      },
      getImportUrl(){
          return  batchAddSims();
      },
      getDownloadUrl(){
          return downloadTemplate();
      },
      submitUpload() {
          this.$refs.upload.submit();
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
