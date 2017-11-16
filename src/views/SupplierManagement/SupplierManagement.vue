<template>
  <el-main>
    <h3 class="main-title">供应商管理</h3>
    <div class="search">
      <label>
        供应商名称:
        <el-input v-model="supplierName" placeholder="请输入内容" style="width: 200px"></el-input>
      </label>
      <el-button type="primary" icon="el-icon-search" @click="searchupplierNameS">查询</el-button>
    </div>

    <div>
      <el-button type="primary" @click="dialogFormAdd = true">创建供应商</el-button>
    </div>

    <div style="margin: 10px 0">

      <el-table
        :data="resultData.list"
        stripe
        style="width: 100%">
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="supplerName" label="供应商名称"></el-table-column>
        <el-table-column prop="name" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="submitUpdate(scope.row)" size="mini" style="float: left;margin-left: 5px">修改</el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index,resultData.list)" type="danger" size="mini"
                       style="float: left;margin-left: 5px">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="SupplierList"
        @current-change="SupplierList"
        :current-page="2"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="resultData.list.length">
      </el-pagination>
    </div>


    <!--添加-->
    <el-dialog title="创建供应商 " :visible.sync="dialogFormAdd">
      <el-form :model="supplierAdd" label-width="100px" :rules="addRules" class="demo-ruleForm">
        <el-form-item label="供应商名称" prop="supplerName">
          <el-input v-model="supplierAdd.supplerName"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="name">
          <el-input v-model="supplierAdd.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="supplierAdd.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="supplierAdd.phone"></el-input>
        </el-form-item>
        <el-form-item>

          <el-button type="primary" @click="submitAdd">确 定</el-button>
          <el-button @click="dialogFormAdd = false">取 消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>


    <!--修改-->
    <el-dialog title="修改供应商 " :visible.sync="dialogFormUpdate">
      <el-form :model="supplierAdd" label-width="100px" :rules="addRules" class="demo-ruleForm">
        <el-form-item label="供应商名称" prop="supplerName">
          <el-input v-model="supplierUpdate.supplerName"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="name">
          <el-input v-model="supplierUpdate.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="supplierUpdate.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="supplierUpdate.phone"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="dialogFormUpdate =false">确 定</el-button>
          <el-button @click="dialogFormUpdate = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </el-main>
</template>

<script>
  import SupplierManagementService from '../../services/SupplierManagementService'

  export default {
    data() {
      return {
        supplierName: '',//模糊搜索
        addArr: {'date': '2016-11-16', 'supplerName': '', 'name': '', 'phone': '', 'email': ''},
        dialogTableVisible: false,
        dialogFormAdd: false,//添加模态框
        dialogFormUpdate: false,//更新模态框
        supplierAdd: {
          supplerName: '',
          name: '',
          email: '',
          phone: ''
        },//添加
        supplierUpdate: {
          supplerName: '',
          name: '',
          email: '',
          phone: ''
        },//修改
        resultData: {
          list: []
        },
        //添加表单输入验证
        addRules: {
          supplerName: [
            {required: true, message: '请输入供应商名称', trigger: 'blur'},
            {min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur'}
            // {pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, message: '格式错误，只能是数字、字母和符号'}
          ],
          name: [
            {min: 0, max: 20, message: '最长20个字符', trigger: 'blur'}
          ],
          email: [
            {type: 'email', message: '邮箱格式不正确'}
          ],
          phone: [
            {pattern: /^1[34578]\d{9}$/, message: '只能11位数字'}
          ]
        }

      }
    },
    methods: {
      //列表
      SupplierList() {
        SupplierManagementService.searchSupplierList(this.supplierName).then(rs => {
          this.resultData = rs;
          console.log(this.supplierName)
        })
      },

      //查询
      searchupplierNameS(){
        this.SupplierList()
      },

      //新增供应商
      save() {
        SupplierManagementService.addSupplier(this.supplierAdd).then(() => {
          console.log("成功 ")
        })
      },

      submitAdd () {
        var addArr = {
          'date': this.addArr.date,
          'supplerName': this.supplierAdd.supplerName,
          'name': this.supplierAdd.name,
          'phone': this.supplierAdd.phone,
          'email': this.supplierAdd.email
        };
        this.resultData.list.push(addArr);
        this.$alert('<strong>供应商创建成功!</strong>', '提示', {
          dangerouslyUseHTMLString: true,
        });
        this.resetStu();
        this.dialogFormAdd = false;
      },

      //清空供应商表单
      resetStu () {
        this.supplierAdd = {
          'supplerName': '',
          'name': '',
          'phone': '',
          'email': ''
        }
      },

      //修改供应商
      submitUpdate(suppler){
        this.supplierUpdate.supplerName = suppler.supplerName;
        this.supplierUpdate.name = suppler.name;
        this.supplierUpdate.phone = suppler.phone;
        this.supplierUpdate.email = suppler.email;
        this.dialogFormUpdate = true;
        this.resetStu();
      },

      //删除供应商
      deleteRow (index, rows) {
        this.$confirm('此操作将永久删除供应商, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        rows.splice(index, 1);

      },

      deleteDistributor(row) {
        SupplierManagementService.deleteDistributor(row.supplerId).then(() => {
          this.$confirm('此操作将永久删除供应商, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          })
        });
      },
    },

    mounted () {
      this.SupplierList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
  .search {
    padding: 10px 0;
  }
</style>
