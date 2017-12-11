<template>
  <div>
    <div class="supplyGood">供应商品：<span>{{ supplyGood }}</span></div>
    <el-table :data="detailData.list" stripe border>
      <el-table-column property="id" label="四维商品ID" align="center"></el-table-column>
      <el-table-column property="name" label="商品名称" align="center"></el-table-column>
      <el-table-column property="distributor" label="分销商" align="center"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      :current-page="page.pageNum"
      :page-sizes="[10, 20]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="detailData.total">
    </el-pagination>
  </div>
</template>

<script>
  import { searchRelationGoods } from '../../services/GoodsManagementService';
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
          supplierGoodId: this.$props.supplierParams.supplierGoodId,
          //supplierGoodId: 1, //TODO 此处为了显示查看测试数据
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        };
        searchRelationGoods(params).then((data) => {
          this.$data.detailData = data;
        });
      },
      pageSizeChange(val) {
        this.page.pageSize = val;
        this.request();
      },
      pageCurrentChange(val) {
        this.page.pageNum = val;
        this.request();
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
