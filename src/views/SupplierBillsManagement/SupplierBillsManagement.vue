<template>
  <el-main>
    <div class="tpl-title">供应商对账查询</div>
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
          <el-form-item label="供应商">
            <el-select v-model="queryParams.SupplierId" placeholder="请选择分销商" @change="supplierChange">
              <el-option v-for="item in wrap" :key="item.id" :label="item.name" :value="item.id"></el-option>
              <el-option v-for="item in suppliers"
                         :key="item.id"
                         :label="item.supplierName"
                         :value="item.id">
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
        <a :href="getDownloadUrl()" download=""  target="_blank" >
            <el-button type="primary" size="medium">导出Excel</el-button>
        </a>
    </div>
    <el-table stripe border :data="resultData.list">
        <el-table-column prop="id" label="订单号" align="center"></el-table-column>
        <el-table-column prop="iccId" label="ICCID" align="center"></el-table-column>
        <el-table-column prop="goodsId" label="套餐ID" align="center"></el-table-column>
        <el-table-column prop="name" label="套餐名称" align="center"></el-table-column>
        <el-table-column prop="supplierName" label="供应商" align="center"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" align="center">
          <template slot-scope="scope">{{ scope.row.createDate | moment }} </template>
        </el-table-column>
        <el-table-column prop="price" label="订单金额" align="center"></el-table-column>
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
  import { types , wrap } from './BillConfig';
  import {searchSupplier , searchBillForSupplier , downloadBillForSupplier} from '../../services/BillsManagementService'
  export default {
    data () {
      return {
          formName:"queryParams",
          queryParams:{
              type:"",
              SupplierId:"",
              timeStart:"",
              timeEnd:"",
              pageNum:1,
              pageSize:10
          },
          exportBtn:false,
          suppliers:[],
          startEndDateTime:null,
          resultData:{},
          types , wrap
      }
    },
    created(){
      this.defaultDate();
      this.getSupplierList();
      this.request();
    },
    methods:{
      getSupplierList(){
        searchSupplier().then((result) => {
              this.suppliers = result;
        })
      },
      request(){
          searchBillForSupplier(this.queryParams).then((result) => {
                this.resultData = result;
          })
      },
      defaultDate(){
        let date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth()+1;

        let startDate = year+"-"+month+"-01 00:00:00";
        let endDate = date.getTime();

        this.startEndDateTime = [startDate,endDate];
        this.queryParams.timeStart = new Date(startDate).getTime()
        this.queryParams.timeEnd = new Date(endDate).getTime()
      },
      typeChange(){
          this.request();
      },
      dateTimeChange(){
        let date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth()+1,
          day = date.getDate(),
          h = date.getHours(),
          min = date.getMinutes(),
          sec = date.getSeconds();
        let minDate = new Date((year-1)+"-"+month+"-"+day+" "+h+":"+min+":"+sec).getTime();
        let maxDate = date.getTime();

        let startEndDateTime = this.startEndDateTime;
        if(startEndDateTime[0].getTime() < minDate || startEndDateTime[1].getTime() > maxDate  ){
            this.$message("查询时间最大范围为一年，请重新选择");
            this.defaultDate();
            this.request();
        }else{
            this.queryParams.timeStart = startEndDateTime[0].getTime();
            this.queryParams.timeEnd = startEndDateTime[1].getTime();
            this.request();
        }
      },
      supplierChange(){
          this.request();
      },
      onSubmit(){
          let formName = this.$data.formName;
          this.$refs[formName].validate((valid) => {
            if(valid) this.request();
            return valid;
          });
      },
      getDownloadUrl(){
          return downloadBillForSupplier(this.queryParams);
      },
      reset(){
        this.queryParams.type = '';
        this.queryParams.distributorId = '';
        this.queryParams.pageNum = 1;
        this.defaultDate();
        this.request();

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
