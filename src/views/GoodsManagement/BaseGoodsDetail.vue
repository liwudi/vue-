<template>
  <div>
    <div class="baseGood">基础商品：<span>{{ baseGood }}</span></div>
    <el-table :data="detailData.list" stripe border>
      <el-table-column property="id" label="供应商品ID" align="center"></el-table-column>
      <el-table-column property="name" label="商品名称" align="center"></el-table-column>
      <el-table-column property="totalFlow" label="商品规格" align="center"></el-table-column>
      <el-table-column property="count" label="商品数量" align="center"></el-table-column>
      <el-table-column property="type" label="商品类型" align="center"></el-table-column>
      <el-table-column property="price" label="商品价格" align="center"></el-table-column>
      <el-table-column property="supplierId" label="供应商" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { searchRelationGoods } from '../../services/GoodsManagementService';
  export default {
    props: ['baseGoodsParams'],
    data() {
      return {
        baseGood: "",
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
        this.$data.baseGood = this.$props.baseGoodsParams.name;
        let params = {
          supplierGoodId: this.$props.baseGoodsParams.supplierGoodId,
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        };
        console.log(params);
        searchRelationGoods(params).then((data) => {
          this.$data.detailData = data;
        });
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .baseGood {
    line-height: 36px;
    font-size: 14px;
    font-weight: bold;
  }
</style>
