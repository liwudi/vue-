<template>
    <el-main>
        <div class="tpl-title">分销商对账查询</div>
        <div class="tpl-mg-t">
            <el-form ref="queryParams" :inline="true" :model="queryParams" class="tpl-form-inline" size="medium">
                <el-form-item label="套餐类型">
                    <el-select v-model="queryParams.type" placeholder="请选择套餐类型" @change="typeChange">
                        <el-option v-for="item in types" :key="item.value"
                                   :label="item.label" :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分销商">
                  <el-select v-model="queryParams.distributorId" placeholder="请选择分销商" @change="distributorChange">
                    <el-option v-for="item in wrap" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    <el-option v-for="item in distributors" :key="item.id"
                               :label="item.distributorName" :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                      v-model="startEndDateTime"
                      type="datetimerange"
                      @change="dateTimeChange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" :disabled="!startEndDateTime" @click="onSubmit">查询</el-button>
                  <el-button type="default"  @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tpl-mg-b">
            <el-button type="primary" :disabled="exportBtn" @click="exportExcel" size="medium">导出Excel</el-button>
        </div>
        <el-table stripe border :data="resultData.list">
            <el-table-column prop="id" label="订单号" align="center"></el-table-column>
            <el-table-column prop="iccId" label="ICCID" align="center"></el-table-column>
            <el-table-column prop="newId" label="新套餐ID" align="center"></el-table-column>
            <el-table-column prop="newName" label="新套餐名称" align="center"></el-table-column>
            <el-table-column prop="oldId" label="原套餐ID" align="center"></el-table-column>
            <el-table-column prop="oldName" label="原套餐名称" align="center"></el-table-column>
            <el-table-column prop="distributorName" label="分销商" align="center"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" align="center">
                <template slot-scope="scope">{{ scope.row.createDate | moment }} </template>
            </el-table-column>
            <el-table-column prop="difference" label="订单金额" align="center"></el-table-column>
        </el-table>
        <p class="tpl-p" style="float:right">总金额：{{ resultData.totalAmount }}元</p>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryParams.pageNum"
            :page-sizes="[10,20]"
            :page-size="queryParams.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="resultData.total">
          </el-pagination>
        </div>
    </el-main>
</template>

<script>
  import {searchBillForDistributor , searchDistributor , downloadBillForDistributor} from '../../services/BillsManagementService'
  import { types , wrap } from './BillConfig';
  export default {
    data () {
      return {
        formName:"queryParams",
        startEndDateTime: null,
        exportBtn:false,
        queryParams:{
            type:"",
            distributorId:"",
            pageNum:1,
            pageSize:10
        },
        types , wrap ,
        distributors:[],
        resultData:{}
      }
    },
    created(){
        this.getDistributorList();
        this.request();
    },
    methods:{
      request(){
         searchBillForDistributor(this.queryParams).then((result) => {
              this.resultData = result;
         })
      },
      getDistributorList(){
          searchDistributor().then((result) => {
              this.distributors = result.list;
          })
      },
      distributorChange(){
          this.request();
      },
      typeChange(){
          this.request();
      },
      dateTimeChange(){
          let startEndDateTime = this.startEndDateTime;
          this.queryParams.timeStart = startEndDateTime ? startEndDateTime[0].getTime() : '';
          this.queryParams.timeEnd = startEndDateTime ? startEndDateTime[1].getTime() : '';
      },

      onSubmit(){
          let formName = this.$data.formName;
          this.$refs[formName].validate((valid) => {
              if(valid) this.request();
              return valid;
          });
      },
      reset(){
        this.startEndDateTime = null;
        this.queryParams = {
            type:"",
            distributorId:"",
            pageNum:1,
        };
        this.request();
      },
      exportExcel(){
          this.exportBtn = true;
          let params = {
              type:this.queryParams.type,
              distributorId:this.queryParams.distributorId,
              timeStart:this.queryParams.timeStart,
              timeEnd:this.queryParams.timeEnd
          };
          downloadBillForDistributor(params).then((result) => {
              this.$message.success("导出成功");
              this.exportBtn = false;
          }).catch((err) => {
              this.$message.error( err.message );
              this.exportBtn = false;
          })
      },
      handleSizeChange(val){
        this.queryParams.pageSize = val;
        this.request();
      },
      handleCurrentChange(val){
        this.queryParams.pageNum = val;
        this.request();
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
