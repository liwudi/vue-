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
        <el-table-column prop="createDate.time" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" type="info" title="修改" @click="updateFormVisible(true, scope.row)"><i class="el-icon-edit"></i></el-button>
              <el-button size="mini" type="danger" title="删除" @click="distributorDelete(scope.row)"><i class="el-icon-delete"></i></el-button>
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
    <el-dialog title="创建分销商" width="65%" :visible.sync="dialog.visible.add" :close-on-click-modal="false" :close-on-press-escape="false" v-if="dialog.visible.add">
      <distributor-add v-on="dialog.event.add"></distributor-add>
    </el-dialog>
    <!--修改信息Dialog对话框-->
    <el-dialog title="修改信息" width="65%" :visible.sync="dialog.visible.update" :close-on-click-modal="false" :close-on-press-escape="false" v-if="dialog.visible.update">
      <distributor-update v-on="dialog.event.update" :distributorId="distributor"></distributor-update>
    </el-dialog>
  </el-main>
</template>

<script>
  const event = {
    CLOSE_DIALOG: 'CLOSE_DIALOG'
  };
  import { getDistributor, deleteDistributor } from '../../services/DistributorManageService';
  import distributorAdd from './DistributorAdd.vue';
  import distributorUpdate from './DistributorUpdate.vue';

  export default {
    components: {
      distributorAdd, distributorUpdate
    },
    data() {
      var validateDistributorName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入分销商名称'));
        }
        if (!String(value).match(/[^\/w+$][^\u4e00-\u9fa5]/)) {
          return callback(new Error('分销商名称格式错误，只能是数字、字母和符号'));
        }
      };
      return {
        //添加 or 修改 Dialog
        dialog: {
          visible: {add: false, update: false},
          event: {add: {}, update: {}}
        },
        //分销商列表模糊查询
        formName: 'distributorQuery',
        distributorId: '',
        distributorQuery: {
          distributorName: '',
          distributorCode: '',
          pageNum: 1,
          pageSize: 10
        },
        rules: {
          distributorName: [
            {required: true, message: '请输入分销商名称', trigger: 'change'},
            {max: 16, message: '分销商名称字符长度为1-16', trigger: 'change'},
            {validator: validateDistributorName, trigger: 'change'}
          ]
        },
        distributorList: [],
        page: {},
        distributor: ''
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
        this.$data.dialog.visible.add = visible;
      },
      //修改按钮
      updateFormVisible(visible, distributor) {
        this.$data.distributor = Object.assign({}, distributor);
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
      //删除按钮
      distributorDelete(row) {
        deleteDistributor({distributorIds: row.id}).then(() => {
          this.openMessage('您确定要删除该分销商吗？', '删除');
        });
      },
      //请求分销商列表查询接口渲染列表
      request() {
        let params = this.$data.distributorQuery;
        getDistributor(params).then((result) => {
          this.$data.distributorList = result.list;
          delete result.list;
          this.$data.page = result;
        });
      },
      //每页显示条数
      pageSizeChange(val) {
        let params = this.$data.distributorQuery;
        params.pageSize = val;
        this.request();
      },
      //当前页码
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
