<template>
    <el-main>
      <div class="tpl-title">SIM卡信息管理</div>
      <div class="tpl-mg-t">
        <el-form ref="queryForm" :inline="true" :model="queryParmas" class="demo-form-inline">
          <el-form-item label="服务到期时间">
            <el-date-picker
              v-model="startEndDateTime"
              type="datetimerange"
              @change="dateChange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="渠道">
            <el-select v-model="queryParmas.distributorId" @change="distributorChange" placeholder="请选择">
              <el-option v-for="item in distributors"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商">
            <el-select v-model="queryParmas.supplierId" @change="supplierChange" placeholder="请选择">
              <el-option v-for="item in suppliers"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryParmas.iccid" placeholder="ICCID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table
        :data="resultData.list"
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
              <el-button size="mini" type="info" title="编辑" @click="SimEditVisible(scope.row)"><i class="el-icon-edit"></i></el-button>
              <el-button size="mini" type="default" title="查看详情" @click="SimDetailVisible(scope.row)"><i class="el-icon-more"></i></el-button>
            </el-button-group>
          </template>

        </el-table-column>
      </el-table>
      <div class="block page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryParmas.pageNum"
          :page-sizes="[10,20]"
          :page-size="queryParmas.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="resultData.total">
        </el-pagination>
      </div>
      <el-dialog title="SIM卡编辑" :visible.sync="simDialog.editVisible">
          <sim-edit  :editIccid="editIccid" :editDate="editDate"></sim-edit>
      </el-dialog>
      <el-dialog title="SIM卡详情" :visible.sync="simDialog.detailVisible">
          <sim-detail :detailIccid="detailIccid"></sim-detail>
      </el-dialog>
    </el-main>
</template>

<script>
  import SimEdit from './SimEdit.vue';
  import SimDetail from './SimDetail.vue';
  import { event ,distributors , suppliers } from './SimConfig';
  import { querySimList } from  '../../services/SimManageService';
  export default {
    components:{
        SimEdit,SimDetail
    },
    data () {
      return {
        formName:"queryForm",
        startEndDateTime: [],
        editIccid:'',
        editDate:'',
        detailIccid:"",
        queryParmas:{
          iccid:"",
          timeStart:"",
          timeEnd:"",
          supplierId: '1',
          distributorId: '1',
          pageNum : 1 ,
          pageSize: 10
        },
        resultData:{
          total:0,
          list:[]
        },
        distributors : distributors,
        suppliers : suppliers ,
        simDialog:{
            editVisible:false,
            detailVisible:false
        }
      }
    },
    created(){
        this.request();
        this.$root.$on(event.CLOSE_EDIT_SIM, (refresh) => {
          this.$data.simDialog.editVisible = false;
           refresh && this.request();
        });
        this.$root.$on(event.CLOSE_DETAIL_SIM, (refresh) => {
          this.$data.simDialog.detailVisible = false;
          refresh && this.request();
        });
    },
    methods:{
        request(){
          let params = this.$data.queryParmas;
          querySimList(params).then((result) => {
              this.$data.resultData = result.data;
          })
        },
        onSubmit() {
          let formName = this.$data.formName;
          this.$refs[formName].validate((valid) => {
              if(valid) this.request();
              return valid;
           });
        },
        dateChange() {
            this.queryParmas.timeStart = this.startEndDateTime[0].getTime();
            this.queryParmas.timeEnd = this.startEndDateTime[1].getTime();
            this.request();
        },
        distributorChange() {
            this.request();
        },
        supplierChange() {
            this.request();
        },
        SimEditVisible(row) {
          this.$data.simDialog.editVisible = true;
          this.editIccid = row.iccid;
          this.editDate = row.expirationDate;
        },
        SimDetailVisible(row) {
          this.$data.simDialog.detailVisible = true;
          this.detailIccid = row.iccid;
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this.request();
        },
        handleCurrentChange(val) {
          this.pageNum = val;
          this.request();
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

</style>
