<template>
  <el-main>
    <div class="tpl-title">分销商管理</div>
    <!--分销商名称模糊查询表单-->
    <div class="tpl-mg-t">
      <el-form :inline="true" :rules="rules" ref="distributorQuery" :model="distributorQuery" class="tpl-form-inline" size="medium">
        <el-form-item label="分销商名称：" prop="distributorName">
          <el-input v-model="distributorQuery.distributorName" placeholder="请输入分销商名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="addFormVisible(true)" size="medium">创建分销商</el-button>
      </div>
    </div>
    <!--分销商管理列表-->
    <div class="tpl-mg">
      <el-table :data="distributorList" stripe border>
        <el-table-column label="序号" width="96" align="center">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="distributorName" label="分销商名称" align="center"></el-table-column>
        <el-table-column prop="name" label="联系人" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" type="info" @click="updateFormVisible(true)"><i class="el-icon-edit"></i></el-button>
              <el-button size="mini" type="danger" @click="distributorDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
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
    <!--创建分销商Dialog对话框-->
    <el-dialog title="创建分销商" :visible.sync="addForm"><distributor-add></distributor-add></el-dialog>
    <!--修改信息Dialog对话框-->
    <el-dialog title="修改信息" :visible.sync="updateForm"><distributor-update></distributor-update></el-dialog>
  </el-main>
</template>

<script>
  const event = {
    CLOSE_ADD_DISTRIBUTOR: 'CLOSE_ADD_DISTRIBUTOR',
    CLOSE_UPDATE_DISTRIBUTOR: 'CLOSE_UPDATE_DISTRIBUTOR'
  };
  import { getRules } from './DistributorRules';
  const rules = getRules(false);
  import { getDistributor, deleteDistributor } from '../../services/DistributorManageService';
  import distributorAdd from './DistributorAdd.vue';
  import distributorUpdate from './DistributorUpdate.vue';

  export default {
    components: {
      distributorAdd, distributorUpdate
    },
    data() {
      return {
        //添加 or 修改 Dialog
        addForm: false,
        updateForm: false,
        //分销商列表模糊查询
        formName: 'distributorQuery',
        distributorQuery: {
          distributorName: '',
          distributorCode: '',
          pageNum: 1,
          pageSize: 10
        },
        rules: rules,
        distributorList: [],
        page: {}
      }
    },
    created() {
      this.request();
      this.$root.$on(event.CLOSE_ADD_DISTRIBUTOR, (refresh) => {
        this.addFormVisible(false);
        if (refresh) {
          this.pageCurrentChange(1);
        }
      });
      this.$root.$on(event.CLOSE_UPDATE_DISTRIBUTOR, (refresh) => {
        this.updateFormVisible(false);
        if (refresh) {
          this.request();
        }
      });
    },
    methods: {
      //查询按钮
      onSubmit() {
        let formName = this.$data.formName;
        console.log(this.distributorQuery.distributorName);
        this.$refs[formName].validate((valid) => {
          if(valid) this.request();
          return valid;
        });
      },
      //添加按钮
      addFormVisible(visible) {
        this.$data.addForm = visible;
      },
      //修改按钮
      updateFormVisible(visible) {
        this.$data.updateForm = visible;
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
      //删除按钮
      distributorDelete(index, row) {
        console.log(index, row);
        deleteDistributor({distributorId: row.distributorId}).then(() => {
          this.openMessage('您确定要删除该分销商吗？', '删除');
        });
      },
      //请求分销商列表查询接口渲染列表
      request() {
        let params = this.$data.distributorQuery;
        getDistributor(params).then((result) => {
          let data = result.data;
          this.$data.distributorList = data.list;
          delete data.list;
          this.$data.page = data;
        });
      },
      //页码
      pageSizeChange(val) {
        let params = this.$data.distributorQuery;
        params.pageSize = val;
        this.request();
      },
      pageCurrentChange(val) {
        let params = this.$data.distributorQuery;
        params.pageNum = val;
        this.request();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
</style>
