<template>
  <div>
    <div class="filebox">
      <input style="font-size: 16px" type="file" @change="changeFn" accept=".xls,.xlsx">
    </div>
    <div>
      <el-button type="primary" :disabled="importOkBtn" @click="submitUpload">确 定</el-button>
      <el-button @click="cancelForm">取 消</el-button>
      <a style="margin-left: 5px;" :href="getDownloadUrl()" download="" target="_blank">
        <el-button>下载模板</el-button>
      </a>
    </div>
  </div>
</template>

<script>
  import { batchAddSims, downloadTemplate } from '../../services/SimManageService'
  import { event } from './SimConfig'

  export default {
    data () {
      return {
        simImportForm: {},
        importOkBtn: true,
        simfile: null
      }
    },
    methods: {
      cancelForm () {
        this.close()
      },
      close (refresh = false) {
        this.$emit(event.CLOSE_DIALOG, refresh)
      },
      changeFn (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length)
          return
        this.simfile = files[0]
        this.importOkBtn = false
      },
      successFn () {
        this.$message.success('上传成功')
        this.close(true)
      },
      errorFn (err) {
        this.$message.error(err.message)
      },
      getDownloadUrl () {
        return downloadTemplate()
      },
      submitUpload () {
        if (!this.simfile) return false;
        batchAddSims(this.simfile)
          .then(()=>{
            this.successFn()
          })
          .catch((err)=>{
            this.errorFn(err)
          })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
  .filebox {
    padding: 0 0 20px 0;
  }
</style>
