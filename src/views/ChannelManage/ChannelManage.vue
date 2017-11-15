<template>
  <div>
    <h3>渠道管理</h3>
    <!--渠道名称模糊查询表单-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="渠道名称：">
        <el-input v-model="formInline.channelName" placeholder="渠道名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true">创建</el-button>
        <!--创建Dialog对话框-->
        <el-dialog title="创建渠道" width="30%" center :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="渠道名称：" :label-width="formLabelWidth">
              <el-input v-model="form.channelName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" :label-width="formLabelWidth">
              <el-input v-model="form.linkman" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" :label-width="formLabelWidth">
              <el-input v-model="form.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" :label-width="formLabelWidth">
              <el-input v-model="form.phone" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>
    <!--渠道管理列表-->
    <el-table
      :data="tableData"
      border
      style="width: 100%;text-align: center">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="channelName" label="渠道名称" width="180"></el-table-column>
      <el-table-column prop="linkman" label="联系人" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        //渠道名称模糊查询
        formInline: {
          channelName: ''
        },
        //创建Dialog对话框
        dialogFormVisible: false,
        form: {
          channelName: '',
          linkman: '',
          email: '',
          phone: ''
        },
        formLabelWidth: '100px',
        //渠道名称列表数据
        tableData: [{
          id: 1,
          channelName: '易鑫',
          linkman: '田一',
          phone: '13345678910',
          email: 'tianyi@qq.com',
          createTime: '2017-11-01'
        }, {
          id: 2,
          channelName: '百度',
          linkman: '小二',
          phone: '15545678910',
          email: 'xiaoer@qq.com',
          createTime: '2017-11-05'
        }, {
          id: 3,
          channelName: '腾讯',
          linkman: '阿三',
          phone: '18845678910',
          email: 'asan@qq.com',
          createTime: '2017-11-10'
        }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('确认删除该渠道吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
