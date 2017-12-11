<template>
  <div>
    <div class="supplyGood">供应商品：<span>{{ supplyGood }}</span></div>
    <el-table :data="detailData.list" stripe border>
      <el-table-column property="id" label="四维商品ID" align="center"></el-table-column>
      <el-table-column property="name" label="商品名称" align="center"></el-table-column>
      <el-table-column property="supplier" label="分销商" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { searchRelationSupplyGoods } from '../../services/GoodsManagementService';
  export default {
    props: ['supplierParams'],
    data() {
      return {
        supplyGood: "",
        detailData: {},
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    created() {
      this.request();
    },
    methods: {
      request() {
        this.$data.supplyGood = this.$props.supplierParams.name;
        let params = {
          supplierId: this.$props.supplierParams.supplierId,
          cycle: this.$props.supplierParams.cycle,
          cycleValue: this.$props.supplierParams.cycleValue,
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        };
        searchRelationSupplyGoods(params).then((data) => {
          console.log(data);
          this.$data.detailData = data;
        });
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .supplyGood {
    line-height: 36px;
    font-size: 14px;
    font-weight: bold;
  }
</style>
