<template>
  <div>
    <div class="baseGood">{{ titleType }}商品：<span>{{ baseGood }}</span></div>
    <el-table :data="detailData.list" stripe border>
      <el-table-column property="id" label="供应商品ID" align="center"></el-table-column>
      <el-table-column property="name" label="商品名称" align="center"></el-table-column>
      <el-table-column property="totalFlow" label="商品规格" align="center"></el-table-column>
      <el-table-column property="supplierCount" label="商品数量" align="center"></el-table-column>
      <el-table-column property="type" label="商品类型" align="center"></el-table-column>
      <el-table-column property="price" label="商品价格" align="center"></el-table-column>
      <el-table-column property="supplierName" label="供应商" align="center"></el-table-column>
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
  import { searchRelationGoods_niId } from '../../services/GoodsManagementService';
  export default {
    props: ['baseGoodsParams', 'goodsType'],
    data() {
      return {
        titleType: this.$props.goodsType === 'base' ? '基础' : '可选',
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
        this.$data.baseGood = this.$props.baseGoodsParams.niGoodName;
        let params = {
          niGoodId: this.$props.baseGoodsParams.niGoodId,
          //niGoodId: 1,  //TODO 此处为了显示查看测试数据
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        };
        searchRelationGoods_niId(params).then((data) => {
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
  .baseGood {
    line-height: 36px;
    font-size: 14px;
    font-weight: bold;
  }
</style>
