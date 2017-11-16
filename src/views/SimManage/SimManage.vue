<template>
    <el-main>
      <div class="tpl-title">SIM卡信息管理</div>
      <div class="tpl-mg-t">
        <el-form ref="queryForm" :inline="true" :model="queryForm" class="demo-form-inline">
          <el-form-item label="服务到期时间">
            <el-date-picker
              v-model="queryForm.startEndDateTime"
              type="datetimerange"
              @change="query"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="渠道">
            <el-select v-model="queryForm.distributorId" placeholder="请选择">
              <el-option v-for="item in distributors"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商">
            <el-select v-model="queryForm.supplierId" placeholder="请选择">
              <el-option v-for="item in suppliers"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.iccid" placeholder="ICCID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table
        :data="tableData"
        stripe border>
        <el-table-column prop="iccid" label="ICCID" align="center"></el-table-column>
        <el-table-column prop="distributorId" label="渠道" align="center"></el-table-column>
        <el-table-column prop="supplierId" label="供应商" align="center"></el-table-column>
        <el-table-column prop="activationDate" label="卡激活日期" align="center"></el-table-column>
        <el-table-column prop="updateDate" label="套餐修改日期" align="center"></el-table-column>
        <el-table-column prop="expirationDate" label="服务到期日期" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" type="info" title="编辑" @click="SimEditVisible(true)"><i class="el-icon-edit"></i></el-button>
              <el-button size="mini" type="default" title="查看详情" @click="SimDetailVisible(true)"><i class="el-icon-more"></i></el-button>
            </el-button-group>
          </template>

        </el-table-column>
      </el-table>
      <div class="block page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageIndex"
          :page-sizes="[10,20]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
      <el-dialog title="SIM卡编辑" :visible.sync="simDialog.editVisible">
          <sim-edit></sim-edit>
      </el-dialog>
      <el-dialog title="SIM卡详情" :visible.sync="simDialog.detailVisible">
          <sim-detail></sim-detail>
      </el-dialog>
    </el-main>
</template>

<script>
  import SimEdit from './SimEdit.vue';
  import SimDetail from './SimDetail.vue';
  import { event } from './SimConfig';
  import { querySimList } from  '../../services/SimManageService';
  export default {
    components:{
        SimEdit,SimDetail
    },
    data () {
      return {
        formName:"queryForm",
        queryForm:{
            startEndDateTime: [new Date(2010,10,10,10),new Date(2020,10,10,10)],
            distributorId:"1",
            supplierId:"1",
            iccid:''
        },
        distributors:[
            { label:"全部",value:"1"},
            { label:"易鑫",value:"2"},
            { label:"双薪",value:"3"},
            { label:"三薪",value:"4"}
        ],
        suppliers:[
            { label:"全部",value:"1"},
            { label:"翼卡",value:"2"},
            { label:"善领",value:"3"}
        ],
        page:{
            total:50,
            pageIndex:1,
            pageSize:10
        },
        simDialog:{
            editVisible:false,
            detailVisible:false
        },
        editData:{
          iccid:'',
          expirationDate:''
        },
        tableData: [{
          iccid:"8986061501000338984",
          distributorId:"易鑫",
          supplierId:"翼卡",
          activationDate:"2016-05-02",
          updateDate:"2016-04-10",
          expirationDate:"2016-11-11",
        },
        {
          iccid:"8986061501000338984",
          distributorId:"易鑫",
          supplierId:"翼卡",
          activationDate:"2016-05-02",
          updateDate:"2016-04-10",
          expirationDate:"2016-11-11",
        }]
      }
    },
    created(){
        this.request();
        this.$root.$on(event.CLOSE_EDIT_SIM, (refresh) => {
          this.SimEditVisible(false);
          if(refresh) {
            this.request();
          }
        });
        this.$root.$on(event.CLOSE_DETAIL_SIM, (refresh) => {
          this.SimDetailVisible(false);
          if(refresh) {
            this.request();
          }
        });
    },
    methods:{
        request(){
          let params = this.$data.queryForm;
          querySimList(params).then((result) => {
             // this.$data.tableData = result.data;
             // console.log(result);
          })
        },
        onSubmit() {
          let formName = this.$data.formName;
          this.$refs[formName].validate((valid) => {
              if(valid) this.request();
              return valid;
           });
        },
        query() {
            console.log(this.queryForm.startEndDateTime)
        },
        SimEditVisible(visible) {
          this.$data.simDialog.editVisible = visible;
        },
        SimDetailVisible(visible) {
          this.$data.simDialog.detailVisible = visible;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.page.pageSize = val;
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.page.pageIndex = val;
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
    .tit{
        margin:20px 0;

        .tit-item{
          padding-right:30px;
          display: inline-block;
          select,input{
            width: 150px;
            padding:10px;
          }

        }
    }
  .page{
    margin-top:20px;
  }
</style>
