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
      <el-button type="primary" @click="goodAddVisible(true)" size="medium">添加套餐</el-button>
      <div class="tpl-mg-t">
        <el-table :data="resultData.list" stripe border>
          <el-table-column align="center" prop="id" label="商品Id"></el-table-column>
          <el-table-column align="center" prop="name" label="商品名称"></el-table-column>
          <el-table-column align="center" prop="totalFlow" label="商品规格"></el-table-column>
          <el-table-column align="center" prop="type" label="商品类型"></el-table-column>
          <el-table-column align="center" prop="cycleValue" label="周期值"></el-table-column>
          <el-table-column align="center" prop="cycle" label="周期">
              <template slot-scope="scope">
                {{scope.row.cycle ===1 ? '日' : scope.row.cycle ===2 ? '月' : '年' }}
              </template>
          </el-table-column>
          <el-table-column align="center" prop="price" label="商品价格"></el-table-column>
          <el-table-column align="center" prop="salePrice" label="促销价格"></el-table-column>
          <el-table-column align="center" prop="message" label="商品介绍"></el-table-column>
          <el-table-column align="center" prop="distributor" label="分销商"></el-table-column>
          <el-table-column label="关联商品" align="center" width="70">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="info" title="查看" @click="detailTableVisible(true, scope.row)">查看</el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="70">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" title="操作" ref="operateBtn" @click="goodsOperate(scope.row)">
                {{ scope.row.state ===1 ? '停用' : '启用' }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="page"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :current-page="queryParams.pageNum"
          :page-sizes="[10, 20]"
          :page-size="queryParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="resultData.total">
        </el-pagination>
      </div>
      <el-dialog title="商品添加" top="10vh" :visible.sync="dialog.visible.add" :close-on-click-modal="false" :close-on-press-escape="false">
        <optional-goods-add v-on="dialog.event.add"  v-if="dialog.visible.add" :goodAdd="queryParams.comboTypeId"></optional-goods-add>
      </el-dialog>
      <el-dialog title="商品关联" top="10vh" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="dialog.visible.detail" v-if="dialog.visible.detail">
        <baseGoods-detail v-on="dialog.event.detail" goodsType="base" :baseGoodsParams="baseGoodsParams"></baseGoods-detail>
      </el-dialog>
    </el-main>
</template>

<script>
  import { searchNiGoods, updateGoodsState } from '../../services/GoodsManagementService';
  import optionalGoodsAdd from './OptionalGoodsAdd.vue'
  import baseGoodsDetail from './BaseGoodsDetail.vue';

  import { statusArr,event } from "./GoodsCofig";
  export default {
    components: {
      optionalGoodsAdd,baseGoodsDetail
    },
    data () {
      return {
        statusArr,event,
        queryParams:{
          comboTypeId:1,
          status:1,
          pageNum:1,
          pageSize:10
        },
        resultData:{
          total:0,
          list:[]
        },
        dialog: {
          visible: {add: false, detail: false},
          event:{add:{},detail:{}}
        },
        baseGoodsParams:{}
      }
    },
    created() {
      this.request();
      this.$data.dialog.event.add[event.CLOSE_DIALOG] = (refresh) => {
        this.goodAddVisible(false);
        refresh && this.request();
      };
      this.$data.dialog.event.detail[event.CLOSE_DIALOG] = (refresh) => {
        this.detailTableVisible(false);
        refresh && this.request();
      };
    },
    methods: {
      request () {
        searchNiGoods(this.queryParams).then((result) => {
           this.resultData = result;
        });
      },
      detailTableVisible(visible, row) {
        this.$data.dialog.visible.detail = visible;
        this.$data.baseGoodsParams = {
          niGoodName: row.name,
          niGoodId: row.id
        };
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
          type: 1,
          state: row.state === 1 ? 2 : 1
        };
        let operateWord;
        if (params.state === 1) {
          operateWord = '启用';
        } else {
          operateWord = '停用';
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
      goodAddVisible (visible) {
        this.$data.dialog.visible.add = visible
      },
      pageSizeChange(val) {
        this.queryParams.pageSize = val;
        this.request();
      },
      pageCurrentChange(val) {
        this.queryParams.pageNum = val;
        this.request();
      },
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
