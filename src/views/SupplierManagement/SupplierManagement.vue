<template>
  <el-main>
    <div class="tpl-title">供应商管理</div>
    <div class="tpl-mg-t">
      <el-form :inline="true" ref="supplierQuery" :model="supplierQuery" class="tpl-form-inline" size="medium">
        <el-form-item label="供应商名称：" >
          <el-input v-model="supplierQuery.supplerName" placeholder="请输入供应商名称" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="addFormVisible(true)" size="medium">创建供应商</el-button>
      </div>
    </div>
    <!--列表-->
    <div class="tpl-mg">
      <el-table :data="supplierList" stripe border>
        <el-table-column label="序号" width="96" align="center">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="supplerName" label="供应商名称" align="center"></el-table-column>
        <el-table-column prop="name" label="联系人" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" type="info" @click="updateFormVisible(true)"><i class="el-icon-edit"></i></el-button>
              <el-button size="mini" type="danger" @click="supplierDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[2, 4]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="supplierList.length">
      </el-pagination>
    </div>

    <el-dialog title="创建供应商" :visible.sync="addForm"><supplier-add></supplier-add></el-dialog>
    <el-dialog title="修改信息" :visible.sync="updateForm"><supplier-update></supplier-update></el-dialog>
  </el-main>
</template>

<script>
  const event = {
    CLOSE_ADD_SUPPLIER: 'CLOSE_ADD_SUPPLIER',
    CLOSE_UPDATE_SUPPLIER: 'CLOSE_UPDATE_SUPPLIER'
  };
  import { getRules } from './SupplierRules';
  const rules = getRules(false);
  import { getSupplier, deleteSupplier } from '../../services/SupplierManagementService';
  import supplierAdd from './SupplierAdd.vue';
  import supplierUpdate from './SupplierUpdate.vue';

  export default {
    components: {
      supplierAdd, supplierUpdate
    },
    data() {
      return {
        //添加 or 修改 Dialog
        addForm: false,
        updateForm: false,
        //供应商名称模糊查询
        formName: 'supplierQuery',
        supplierQuery: {
          supplerName: '',
          pageNum: 1,
          pageSize: 10
        },
        rules: rules,

        supplierList: [],
        page: {}
      }
    },
    created() {
      this.request();
      this.$root.$on(event.CLOSE_ADD_SUPPLIER, (refresh) => {
        this.addFormVisible(false);
        if (refresh) {
          this.pageCurrentChange(1);
        }
      });
      this.$root.$on(event.CLOSE_UPDATE_SUPPLIER, (refresh) => {
        this.updateFormVisible(false);
        if (refresh) {
          this.request();
        }
      });
    },
    methods: {
      //查询
      onSubmit() {
        let formName = this.$data.formName;
        console.log(this.supplierQuery.supplerName)
        this.$refs[formName].validate((valid) => {
          if(valid) this.request();

          return valid;
        });
      },
      //添加
      addFormVisible(visible) {
        this.$data.addForm = visible;
      },
      //修改
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
      //删除
      supplierDelete(index, row) {
        console.log(index, row);
        deleteSupplier({supplierId: row.supplierId}).then(() => {
          this.openMessage('您确定要删除该供应商吗？', '删除');
        });
      },
      //查询
      request() {
        let params = this.$data.supplierParams;
        getSupplier(params).then((result) => {
          let data = result.data;
          this.$data.supplierList = data.list;
          delete data.list;
          this.$data.page = data;
        });
      },
      //页码
      pageSizeChange(val) {
        let params = this.$data.supplierQuery;
        params.pageSize = val;
        this.request();
      },
      pageCurrentChange(val) {
        let params = this.$data.supplierQuery;
        params.pageNum = val;
        this.request();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
  h3 {
    margin-bottom: 20px;
  }
</style>
