<template>
  <el-main>
    <div>
      <el-form>
        <el-form-item label="套餐状态">
          <el-select v-model="queryParams.status" @change="statusChange"  placeholder="请选择套餐状态">
            <el-option v-for="item in statusArr" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" @click="addFormVisible(true)" size="medium">添加套餐</el-button>
    <div class="tpl-mg">
      <el-table :data="resultData.list" stripe border>
        <el-table-column label="序号" width="96" align="center">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="id" label="商品ID" align="center"></el-table-column>
        <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="totalFlow" label="商品规格" align="center"></el-table-column>
        <el-table-column prop="type" label="商品类型" align="center"></el-table-column>
        <el-table-column prop="cycleValue" label="周期值" align="center"></el-table-column>
        <el-table-column prop="cycle" label="周期" align="center">
          <template slot-scope="scope">
            {{scope.row.cycle ===1 ? '日' : scope.row.cycle ===2 ? '月' : '年' }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品价格" align="center"></el-table-column>
        <el-table-column prop="salePrice" label="促销价格" align="center"></el-table-column>
        <el-table-column prop="message" label="商品介绍" align="center"></el-table-column>
        <el-table-column prop="supplier" label="供应商" align="center"></el-table-column>
        <el-table-column label="关联商品" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="detailTableVisible(true, scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="70">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" title="操作" @click="goodsOperate(scope.row)">
              {{ scope.row.state ===1 ? '启用' : scope.row.state ===2 ? '停用' : '删除' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="queryParams.pageNum"
        :page-sizes="[10, 20]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="resultData.total">
      </el-pagination>
    </div>

    <el-dialog title="供应商品添加" top="10vh" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="dialog.visible.add" v-if="dialog.visible.add">
      <supplierGoods-add v-on="dialog.event.add"></supplierGoods-add>
    </el-dialog>
    <el-dialog title="商品关联" top="10vh" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="dialog.visible.detail" v-if="dialog.visible.detail">
      <supplierGoods-detail v-on="dialog.event.detail" :supplierParams="supplierParams"></supplierGoods-detail>
    </el-dialog>
  </el-main>
</template>

<script>
  const event = {
    CLOSE_DIALOG: 'CLOSE_DIALOG'
  };
  import { searchSupplierGoods, deleteSupplierGoods, updateGoodsState } from '../../services/GoodsManagementService';
  import supplierGoodsAdd from './SupplierGoodsAdd.vue';
  import supplierGoodsDetail from './SupplierGoodsDetail.vue';
  import { statusArr } from "./GoodsCofig";
  export default {
    components: {
      supplierGoodsAdd, supplierGoodsDetail
    },
    data() {
      return {
        dialog: {
          visible: {add: false, detail: false},
          event: {add: {}, detail: {}}
        },
        supplierParams: {},
        statusArr,
        queryParams:{
          supplierId:'',
          status:1,
          pageNum:1,
          pageSize:10
        },
        resultData:{
          total:0,
          list:[]
        }
      }
    },
    created() {
      this.request();
      this.$data.dialog.event.add[event.CLOSE_DIALOG] = (refresh) => {
        this.addFormVisible(false);
        refresh && this.request();
      };
    },
    methods: {
      addFormVisible(visible){
        this.$data.dialog.visible.add = visible;
      },
      detailTableVisible(visible, row) {
        this.$data.dialog.visible.detail = visible;
        this.$data.supplierParams = {
          supplierGoodName: row.name,
          supplierGoodId: row.id
        };
      },
      request() {
        searchSupplierGoods(this.queryParams).then((result) => {
          this.resultData = result;
        })
      },
      openMessage(message, confirmText, doit) {
        this.$confirm(message, '提示', {
          cancelButtonText: '取消',
          confirmButtonText: confirmText
        }).then(() => {
          doit();
        }).catch(() => {});
      },
      goodsOperate(row) {
        let params = {
          id: row.id,
          type: 3,
          state: row.state
        };
        let operateWord;
        if (params.state === 1) {
          operateWord = '停用';
        }  else if (params.state === 2) {
          operateWord = '启用';
        }
        this.openMessage('您确定要'+ operateWord +'该商品吗？', operateWord, ()=>{
          updateGoodsState(params).then(() => {
            this.$message({type: 'success', message: '操作成功!'});
            this.request();
          }).catch((err)=>{
            this.$message({type: 'error', message: err.message});
          })
        });
      },
      statusChange(){
        this.request();
      },
      pageSizeChange(val) {
        this.queryParams.pageSize = val;
        this.request();
      },
      pageCurrentChange(val) {
        this.queryParams.pageNum = val;
        this.request();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
</style>
