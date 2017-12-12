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
          <el-form-item label="分销商">
            <el-select v-model="queryParmas.distributorId" @change="distributorChange" placeholder="请选择">
              <el-option v-for="item in wrap" :key="item.id" :value="item.id" :label="item.name"></el-option>
              <el-option v-for="item in distributors"
                         :key="item.id"
                         :label="item.distributorName"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商">
            <el-select v-model="queryParmas.supplierId" @change="supplierChange" placeholder="请选择">
              <el-option v-for="item in wrap" :key="item.id" :value="item.id" :label="item.name"></el-option>
              <el-option v-for="item in suppliers"
                         :key="item.id"
                         :label="item.supplierName"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryParmas.iccId" placeholder="请输入ICCID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="default" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tpl-mg-b">
        <el-button type="primary" @click="importVisible(true)" size="medium">导入Excel</el-button>
      </div>
      <el-table
        :data="resultData.list"
        stripe border>
        <el-table-column prop="iccId" label="ICCID" align="center"></el-table-column>
        <el-table-column prop="distributorName" label="分销商" align="center"></el-table-column>
        <el-table-column prop="supplierName" label="供应商" align="center"></el-table-column>
        <el-table-column prop="activationDate" label="卡激活日期" align="center">
          <template slot-scope="scope" v-if="scope.row.activationDate">{{ scope.row.activationDate.time |  moment }} </template>
        </el-table-column>
        <el-table-column prop="updateDate" label="套餐修改日期" align="center">
          <template slot-scope="scope" v-if="scope.row.updateDate">{{ scope.row.updateDate.time |  moment }} </template>
        </el-table-column>
        <el-table-column prop="expirationDate" label="服务到期日期" align="center">
          <template slot-scope="scope" v-if="scope.row.expirationDate">{{ scope.row.expirationDate.time |  moment }} </template>
        </el-table-column>
        <el-table-column prop="basicExpirationDate" label="当前套餐到期日期" align="center">
          <template slot-scope="scope" v-if="scope.row.basicExpirationDate">{{ scope.row.basicExpirationDate.time | moment }} </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" type="info" title="编辑" @click="SimEditVisible(true , scope.row)">编辑</el-button>
              <el-button size="mini" type="default" title="查看详情" @click="SimDetailVisible(true , scope.row)">查看详情</el-button>
            </el-button-group>
          </template>

        </el-table-column>
      </el-table>
      <div class="block">
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
      <el-dialog title="SIM卡编辑" :visible.sync="dialog.visible.edit" :close-on-click-modal="false" :close-on-press-escape="false" >
          <sim-edit v-on="dialog.event.edit" v-if="dialog.visible.edit" :editParams = editParams></sim-edit>
      </el-dialog>
      <el-dialog title="SIM卡详情" :visible.sync="dialog.visible.detail" :close-on-click-modal="false" :close-on-press-escape="false" >
          <sim-detail v-on="dialog.event.detail" v-if="dialog.visible.detail" :detailIccid="detailIccid" style="max-height: 700px;overflow-y: auto"></sim-detail>
      </el-dialog>
      <el-dialog title="导入" :visible.sync="dialog.visible.importV" :close-on-click-modal="false" :close-on-press-escape="false" >
          <sim-import v-on="dialog.event.importV" v-if="dialog.visible.importV"></sim-import>
      </el-dialog>
    </el-main>
</template>

<script>
  import SimEdit from './SimEdit.vue';
  import SimDetail from './SimDetail.vue';
  import SimImport from './simImport.vue';
  import { event } from './SimConfig';
  import { searchSupplier , searchDistributor , querySimList } from  '../../services/SimManageService';
  export default {
    components:{
        SimEdit,SimDetail,SimImport
    },
    data () {
      return {
        formName:"queryForm",
        startEndDateTime: null,
        editParams:{ },
        editIccid:'',
        editDate:'',
        detailIccid:"",
        queryParmas:{
          timeStart:"",
          timeEnd:"",
          supplierId: 'all',
          distributorId: 'all',
          iccId:"",
          pageNum : 1 ,
          pageSize: 10
        },
        resultData:{
          total:0,
          list:[]
        },
        distributors : {},  // 分销商
        suppliers : {} ,       // 供应商
        dialog: {
          visible: {edit: false, detail: false,importV:false},
          event: {edit: {}, detail: {}, importV:{}}
        },
        wrap:[
          { id:"all" , name:"全部"}
        ]
      }
    },
    created(){
        this.getSupplier();
        this.getDistributor();
        this.request();
        this.$data.dialog.event.edit[event.CLOSE_DIALOG] = (refresh) => {
          this.SimEditVisible(false);
          refresh && this.request();
        };
        this.$data.dialog.event.detail[event.CLOSE_DIALOG] = (refresh) => {
          this.SimDetailVisible(false);
          refresh && this.request();
        };
        this.$data.dialog.event.importV[event.CLOSE_DIALOG] = (refresh) => {
          this.importVisible(false);
          refresh && this.request();
        };
    },
    methods:{
        request(){
          let params = this.$data.queryParmas;
          querySimList(params).then((result) => {
              this.$data.resultData = result;
          })
        },
        getSupplier(){
            searchSupplier().then((result) => {
              this.$data.suppliers = result;
            });
        },
        getDistributor(){
          searchDistributor().then((result) => {
              this.$data.distributors = result;
          });
        },
        onSubmit() {
          let formName = this.$data.formName;
          this.$refs[formName].validate((valid) => {
              if(valid) this.request();
              return valid;
           });
        },
        reset(){
            this.$data.queryParmas = {
                timeStart:"",
                timeEnd:"",
                supplierId: 'all',
                distributorId: 'all',
                iccId:"",
                pageNum : 1
            };
            this.$data.startEndDateTime = [];
            this.request();
        },
        dateChange() {
          let startEndDateTime = this.startEndDateTime;
          this.queryParmas.timeStart = startEndDateTime ? startEndDateTime[0].getTime() : '';
          this.queryParmas.timeEnd = startEndDateTime ? startEndDateTime[1].getTime() : '';
          this.request();
        },
        distributorChange() {
            this.request();
        },
        supplierChange() {
            this.request();
        },
        SimEditVisible(visible, row) {
          this.$data.dialog.visible.edit = visible;
          if(!row) return ;
          this.$data.editParams = {
            iccId : row.iccId ,
            comboId:row.comboId
          };
        },
        SimDetailVisible(visible , row) {
          this.$data.dialog.visible.detail = visible;
          if(!row) return ;
          this.detailIccid = row.iccId;
        },
        importVisible (visible){
          this.$data.dialog.visible.importV = visible;
        },
        handleSizeChange(val) {
          this.queryParmas.pageSize = val;
          this.request();
        },
        handleCurrentChange(val) {
          this.queryParmas.pageNum = val;
          this.request();
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">


</style>
