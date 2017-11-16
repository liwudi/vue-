<template>
  <el-main>
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="基础商品" name="first">
        <base-goods></base-goods>
      </el-tab-pane>
      <el-tab-pane label="可选商品" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="供应商品" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
  import BaseGoods from './BaseGoods.vue';
  export default {
    components:{
      BaseGoods
    },
    data() {
      return {
        activeName2: 'first'
      };
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
