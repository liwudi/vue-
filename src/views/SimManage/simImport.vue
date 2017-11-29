<template>
  <el-main>
    <el-form  :model="simImportForm" >
      <el-upload
        ref="upload"
        action=""
        :on-change="changeFn"
        :auto-upload="false"
        :show-file-list="false">
        <el-button  size="small" type="text">点击这里上传文件</el-button>
        <div style="color: #000;" >{{ file.name }}</div>
      </el-upload>

      <el-form-item>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
        <el-button @click="cancelForm">取 消</el-button>
        <a href=" download " download="" target="_blank" class="btn btn-default">下载模板</a>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  import { batchAddSims } from  '../../services/SimManageService';
  import { event } from './SimConfig';
  export default {
    data () {
      return {
        simImportForm:{},
        file:''
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
      submitUpload() {
          if(this.$data.file){
              batchAddSims(this.$data.file).then((result) => {
                    if(result.code == 200 ){
                        this.$message({
                          message:"上传成功",
                          type: 'success'
                        });
                    }else{
                        this.$message.error(result.message);
                    }
              });
          }else{
              this.$message({
                  message:"请选择要上传的文件",
                  type: 'warning'
              });
          }
      },
      download(){
//          return '';
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
