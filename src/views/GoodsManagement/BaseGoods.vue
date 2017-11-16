<template>
    <div>
      <div class="tpl-mg">
        <el-table :data="tableData" stripe border>
          <el-table-column label="序号" align="center" width="96">
            <template slot-scope="scope">{{scope.$index + 1}}</template>
          </el-table-column>
          <el-table-column align="center" prop="userName" label="用户名"></el-table-column>
          <el-table-column align="center" prop="loginName" label="姓名"></el-table-column>
          <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
          <el-table-column label="操作" align="center" width="220">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="info" title="修改" ><i class="el-icon-edit"></i></el-button>
                <el-button size="mini" type="danger" title="删除" ><i class="el-icon-delete"></i></el-button>
                <el-button size="mini" type="default" title="密码重置" ><i class="el-icon-more"></i></el-button>
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
