<template>
  <el-main>
    <div>
      <el-button type="primary" @click="addFormVisible(true)" size="medium">添加套餐</el-button>
    </div>
    <div class="tpl-mg">
      <el-table :data="supplierGoodsList" stripe border>
        <el-table-column label="序号" width="96" align="center">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="id" label="商品id" align="center"></el-table-column>
        <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="totalFlow" label="商品规格" align="center"></el-table-column>
        <el-table-column prop="type" label="商品类型" align="center"></el-table-column>
        <el-table-column prop="cycleValue" label="周期值" align="center"></el-table-column>
        <el-table-column prop="cycle" label="周期" align="center"></el-table-column>
        <el-table-column prop="price" label="商品价格" align="center"></el-table-column>
        <el-table-column prop="salePrice" label="促销价格" align="center"></el-table-column>
        <el-table-column prop="desc" label="商品介绍" align="center"></el-table-column>
        <el-table-column prop="supplier" label="供应商" align="center"></el-table-column>
        <el-table-column label="关联商品" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="detailTableVisible(true)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" type="info" @click="">启用</el-button>
              <!--<el-button size="mini" type="info" @click="">停用</el-button>-->
              <el-button size="mini" type="danger" @click="supplierGoodsDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[10, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>

    <el-dialog title="供应商品添加" :visible.sync="addForm"><supplierGoods-add></supplierGoods-add></el-dialog>
  </el-main>
</template>

<script>
  const event = {
    CLOSE_ADD_SUPPLIERGOODS: 'CLOSE_ADD_SUPPLIERGOODS',
    CLOSE_DETAIL_SUPPLIERGOODS: 'CLOSE_DETAIL_SUPPLIERGOODS'
  };
  import { searchSupplierGoods, deleteSupplierGoods, updateGoodsState } from '../../services/GoodsManagementService';
  import supplierGoodsAdd from './SupplierGoodsAdd.vue';

  export default {
    components: {
      supplierGoodsAdd
    },
    data() {
      return {
        addForm: false,
        detailTable: false,
        supplierGoodsParams: {
          supplierId: '',
          pageNum: 1,
          pageSize: 10
        },
        supplierGoodsList: [],
        page: {}
      }
    },
    created() {
      this.request();
      this.$root.$on(event.CLOSE_ADD_SUPPLIERGOODS, (refresh) => {
        this.addFormVisible(false);
        if (refresh) {
          this.pageCurrentChange(1);
        }
      });
      this.$root.$on(event.CLOSE_DETAIL_SUPPLIERGOODS, (refresh) => {
        this.detailTableVisible(false);
        if (refresh) {
          this.request();
        }
      });
    },
    methods: {
      addFormVisible(visible) {
        this.$data.addForm = visible;
      },
      request() {
        let params = this.$data.supplierGoodsParams;
        searchSupplierGoods(params).then((result) => {
          let data = result.data;
          this.supplierGoodsList = data.list;
          delete data.list;
          this.page = data;
        })
      },
      openMessage(message, confirmText) {
        this.$confirm(message, '提示', {
          cancelButtonText: '取消',
          confirmButtonText: confirmText
        }).then(() => {
          this.$message({type: 'success', message: '操作成功!'});
          this.request();
        }).catch(() => {
          this.$message({type: 'info', message: '已取消操作'});
        });
      },
      supplierGoodsDelete(index, row){
        console.log(index, row);
        deleteSupplierGoods({supplierGoodsId: row.supplierGoodsId}).then(() => {
          this.openMessage('您确定要删除该供应商品吗？', '删除');
        });
      },
      pageSizeChange(val) {
        let params = this.$data.supplierGoodsParams;
        params.pageSize = val;
        this.request();
      },
      pageCurrentChange(val) {
        let params = this.$data.supplierGoodsParams;
        params.pageNum = val;
        this.request();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
