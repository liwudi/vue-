<template>
  <el-main>
      <el-form ref="goodsForm" :model="goodsForm" label-width="80px" size="medium">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="goodsForm.name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="totalFlow">
            <el-select v-model="goodsForm.totalFlow" placeholder="请选择商品规格">
              <el-option
                v-for="item in totalFlows"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span v-if="goodsForm.totalFlow=='2'">
              <input type="text" style="padding:9px;border:1px solid #d8dce5;" placeholder="请输入套餐流量"></input><strong style="margin-left: 3px;font-size: 20px;">G</strong>
            </span>
          </el-form-item>
          <el-form-item label="商品类型" prop="name">
            <el-select v-model="goodsForm.type" placeholder="请选择商品类型">
              <el-option
                v-for="item in optionalGoodType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
      </el-form>
  </el-main>
</template>

<script>
  import ElMain from "../../../node_modules/element-ui/packages/main/src/main.vue";
  import { totalFlows , optionalGoodType } from  "./GoodsCofig";
  export default {
    components: {ElMain},
    data () {
      return {
        goodsForm:{
          totalFlow:"1"
        },
        totalFlows,


      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
