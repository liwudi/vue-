<template>
  <el-main>
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="基础商品" name="first">
        <base-goods></base-goods>
      </el-tab-pane>
      <el-tab-pane label="可选商品" name="second">
        <optional-goods></optional-goods>
      </el-tab-pane>
      <el-tab-pane label="供应商品" name="third">
        <supplier-goods></supplier-goods>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
  import BaseGoods from './BaseGoods.vue';
  import OptionalGoods from './OptionalGoods.vue';
  import SupplierGoods from './SupplierGoods.vue';
  export default {
    components:{
      BaseGoods, SupplierGoods,OptionalGoods
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
