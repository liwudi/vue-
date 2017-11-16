<template>
  <div>
    <el-button type="primary" size="medium" @click="create">创建新项</el-button>
    <p class="tpl-p">默认密码：123456</p>
  </div>
</template>
<script>
  export default {
    data() {
      return{}
    },
    methods: {
      create () {
        this.$emit('openDialog');
      }
    }
  }
</script>
