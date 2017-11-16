<template>
    <div>
      <div class="tpl-mg">
        <el-table :data="tableData" stripe border>
          <el-table-column align="center" prop="userName" label="商品Id"></el-table-column>
          <el-table-column align="center" prop="loginName" label="商品名称"></el-table-column>
          <el-table-column align="center" prop="phone" label="商品规格"></el-table-column>
          <el-table-column align="center" prop="phone" label="商品类型"></el-table-column>
          <el-table-column align="center" prop="phone" label="周期值"></el-table-column>
          <el-table-column align="center" prop="phone" label="周期"></el-table-column>
          <el-table-column align="center" prop="phone" label="商品价格"></el-table-column>
          <el-table-column align="center" prop="phone" label="促销价格"></el-table-column>
          <el-table-column align="center" prop="phone" label="商品介绍"></el-table-column>
          <el-table-column align="center" prop="phone" label="分销商"></el-table-column>
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
    </div>
</template>

<script>
  import {searchUser, deleteUser, resetUserPassword} from '../../services/GoodsManagementService';
  export default {
    data () {
      return {
        tableData: [],
        page : {}
      }
    },
    created() {
      this.request();
    },
    methods: {
      request () {
        searchUser().then((result) => {
          let data = result.data;
          this.tableData = data.list;
          delete data.list;
          this.page = data;
        });
      },
      pageSizeChange(val) {
        let params = this.$data.userForm;
        params.pageSize = val;
        this.request();
      },
      pageCurrentChange(val) {
        console.info('current-page', val);
        let params = this.$data.userForm;
        params.pageNum = val;
        this.request();
      },
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
