<template>
  <el-table stripe border
    :data="tableData"
    style="width: 100%">
    <el-table-column
      header-align="center"
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      header-align="center"
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      header-align="center"
      prop="address"
      label="地址">
    </el-table-column>
    <el-table-column label="操作" header-align="center" align="center">
      <template slot-scope="scope">
        <el-button-group>
          <el-button
            size="mini"
            type="info"
            title="编辑"
            @click="edit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
          <el-button
            size="mini"
            type="danger"
            title="删除"
            @click="remove(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
          <el-button
            size="mini"
            type="default"
            title="密码重置"
            @click="more(scope.$index, scope.row)"><i class="el-icon-more"></i></el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },

    methods: {
      remove () {
        this.$confirm('确定要进行删除操作么？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        }).then(() => {
          this.$message({type: 'success', message: '操作成功!'});
        }).catch(() => {
          this.$message({type: 'info', message: '已取消操作'});
        });
      },
      edit () {

      },
      more () {

      }
    }
  }

</script>
