<template>
  <div :model="supplierGoodsDetail">
    <div>供应商品：<span>1年无限套餐</span></div>
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
    props: ['supplierId'],
    data() {
      return {
        supplierGoodsDetail: {},
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
        let params = this.$data.supplierGoodsDetail;
        params.supplierId = this.$props.supplierId.id;
        console.log(params);
        searchRelationSupplyGoods(params).then((data) => {
          console.log(data);
          this.$data.detailData = data;
        }).catch((err)=>{
          console.log(err);
          //this.$message({type: 'warning', message: err.message});
        });
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
</style>
