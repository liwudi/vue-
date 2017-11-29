<template>
  <el-main>
    <div class="tpl-title">供应商管理</div>
    <div class="tpl-mg-t">
      <el-form :inline="true" ref="supplierQuery" :model="supplierQuery" class="tpl-form-inline" size="medium">
        <el-form-item label="供应商名称：">
          <el-input v-model="supplierQuery.supplierName" placeholder="请输入供应商名称" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="suppliernameSearch">查询</el-button>
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
        <el-table-column prop="supplierName" label="供应商名称" align="center"></el-table-column>
        <el-table-column prop="name" label="联系人" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="createDate.time " label="创建时间" align="center">
          <!--<template slot-scope="scope">{{scope.row.createDate.time | moment}}</template>-->
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" type="info" @click="updateFormVisible(true, scope.row)" ><i
                class="el-icon-edit"></i></el-button>
              <el-button size="mini" type="danger" @click="supplierDelete(scope.$index, scope.row)"><i
                class="el-icon-delete"></i></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[10, 20,30,40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>


    <el-dialog title="创建供应商" width="65%"
               :visible.sync="dialog.visible.add"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               v-if="dialog.visible.add">
      <supplier-add v-on="dialog.event.add"></supplier-add>
    </el-dialog>

    <el-dialog title="修改信息" width="65%"
               :visible.sync="dialog.visible.update"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               v-if="dialog.visible.update">
      <supplier-update v-on="dialog.event.update" :sId="id"></supplier-update>
    </el-dialog>
  </el-main>
</template>

<script>
  import {event} from './SupplierConfig';
  import {getRules} from './SupplierRules';
  const rules = getRules(false);
  import {getSupplier, deleteSupplier} from '../../services/SupplierManagementService';
  import supplierAdd from './SupplierAdd.vue';
  import supplierUpdate from './SupplierUpdate.vue';

  export default {
    components: {
      supplierAdd, supplierUpdate
    },
    data() {
      return {
        //弹框
        dialog: {
          visible: {add: false, update: false},
          event: {add: {}, update: {}}
        },

        formName: 'supplierQuery',
        supplierQuery: {
          supplierName: '',
          pageNum: 1,
          pageSize: 10
        },
        rules: rules,
        supplierList: [],
        page: {},
        id: ''
      }
    },
    created() {
      this.request();
      this.$data.dialog.event.add[event.CLOSE_DIALOG] = (refresh) => {
        this.addFormVisible(false);
        refresh && this.pageCurrentChange(1);
      };
      this.$data.dialog.event.update[event.CLOSE_DIALOG] = (refresh) => {
        this.updateFormVisible(false);
        refresh && this.request();
      };
    },
    methods: {

      //查询
      suppliernameSearch() {
        this.request();
      },
      //添加
      addFormVisible(visible) {
        this.$data.dialog.visible.add = visible;
      },
      //修改
      updateFormVisible(visible,id ) {
        this.$data.id = Object.assign({},id);
        this.$data.dialog.visible.update = visible;
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
        deleteSupplier({supplierIds: row.id}).then(() => {
          this.openMessage('您确定要删除该供应商吗？', '删除');
        });
      },
      //列表
      request() {
        let params = this.$data.supplierQuery;
        getSupplier(params).then((result) => {
          this.$data.supplierList = result.list;
          delete result.list;
          this.$data.page = result;

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
    },
    mounted() {
      this.suppliernameSearch()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
  h3 {
    margin-bottom: 20px;
  }
</style>
