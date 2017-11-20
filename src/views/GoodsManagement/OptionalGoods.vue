<template>
  <el-main>
      <el-button type="primary" @click="goodAddVisible(true)" size="medium">添加套餐</el-button>
      <div class="tpl-mg-t">
          <el-table :data="resultData.list" stripe border>
            <el-table-column align="center" prop="id" label="商品Id"></el-table-column>
            <el-table-column align="center" prop="name" label="商品名称"></el-table-column>
            <el-table-column align="center" prop="totalFlow" label="商品规格"></el-table-column>
            <el-table-column align="center" prop="type" label="商品类型"></el-table-column>
            <el-table-column align="center" prop="cycleValue" label="周期值"></el-table-column>
            <el-table-column align="center" prop="cycle" label="周期"></el-table-column>
            <el-table-column align="center" prop="price" label="商品价格"></el-table-column>
            <el-table-column align="center" prop="salePrice" label="促销价格"></el-table-column>
            <el-table-column align="center" prop="desc" label="商品介绍"></el-table-column>
            <el-table-column align="center" prop="distributor" label="分销商"></el-table-column>
            <el-table-column label="关联商品" align="center" width="70">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button size="mini" type="info" title="查看" ><i class="el-icon-edit"></i></el-button>
                </el-button-group>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="220">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button size="mini" type="info" title="启用" ><i class="el-icon-edit"></i></el-button>
                  <el-button size="mini" type="danger" title="停用" ><i class="el-icon-delete"></i></el-button>
                  <el-button size="mini" type="default" title="删除" ><i class="el-icon-more"></i></el-button>
                </el-button-group>
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

      <el-dialog title="商品添加" :visible.sync="dialog.visible.add">
          <optional-goods-add></optional-goods-add>
      </el-dialog>
  </el-main>
</template>

<script>
  import {searchNiGoods, deleteUser, resetUserPassword} from '../../services/GoodsManagementService';
  import optionalGoodsAdd from './OptionaGoodslAdd.vue';
  export default {
    components:{
      optionalGoodsAdd ,
    },
    data () {
      return {
        resultData:{
          total:0,
          list:[]
        },
        dialog: {
          visible: { add: false, detail: false},
        },
        queryParams:{
          type:2,
          pageNum:1,
          pageSize:10
        }
      }
    },
    created() {
      this.request();
    },
    methods:{
      request () {
        searchNiGoods(this.queryParams).then((result) => {
           this.resultData = result.data;
        });
      },
      pageSizeChange(val) {
        let params = this.$data.queryParams;
        params.pageSize = val;
        this.request();
      },
      pageCurrentChange(val) {
        let params = this.$data.queryParams;
        params.pageNum = val;
        this.request();
      },
      goodAddVisible(visible) {
         this.$data.dialog.visible.add = visible;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
