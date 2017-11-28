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
                         :label="item.distributorname"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商">
            <el-select v-model="queryParmas.supplierId" @change="supplierChange" placeholder="请选择">
              <el-option v-for="item in wrap" :key="item.id" :value="item.id" :label="item.name"></el-option>
              <el-option v-for="item in suppliers"
                         :key="item.id"
                         :label="item.suppliername"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryParmas.iccid" placeholder="请输入ICCID"></el-input>
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
        <el-table-column prop="iccid" label="ICCID" align="center"></el-table-column>
        <el-table-column prop="distributorName" label="分销商" align="center"></el-table-column>
        <el-table-column prop="supplierName" label="供应商" align="center"></el-table-column>
        <el-table-column prop="activationdate.time" label="卡激活日期" align="center"></el-table-column>
        <el-table-column prop="updatedate.time" label="套餐修改日期" align="center"></el-table-column>
        <el-table-column prop="expirationdate.time" label="服务到期日期" align="center"></el-table-column>
        <el-table-column prop="basicexpirationdate.time" label="当前套餐到期日期" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" type="info" title="编辑" @click="SimEditVisible(true , scope.row)"><i class="el-icon-edit"></i></el-button>
              <el-button size="mini" type="default" title="查看详情" @click="SimDetailVisible(true , scope.row)"><i class="el-icon-more"></i></el-button>
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
      <el-dialog title="SIM卡编辑" :visible.sync="dialog.visible.edit" :close-on-click-modal="false" :close-on-press-escape="false" >
          <sim-edit v-on="dialog.event.edit" v-if="dialog.visible.edit" :editParams = editParams></sim-edit>
      </el-dialog>
      <el-dialog title="SIM卡详情" :visible.sync="dialog.visible.detail" :close-on-click-modal="false" :close-on-press-escape="false" >
          <sim-detail v-on="dialog.event.detail" v-if="dialog.visible.detail" :detailIccid="detailIccid"></sim-detail>
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
        startEndDateTime: [],
        editParams:{ },
        editIccid:'',
        editDate:'',
        detailIccid:"",
        queryParmas:{
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
        distributors : {},  // 分销商
        suppliers : {} ,       // 供应商
        dialog: {
          visible: {edit: false, detail: false,importV:false},
          event: {edit: {}, detail: {}, importV:{}}
        },
        wrap:[
          { id:"1" , name:"全部"}
        ]
      }
    },
    created(){
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
          searchSupplier().then((result) => {
              this.$data.suppliers = result.list;
          });
          searchDistributor().then((result) => {
              this.$data.distributors = result.list;
          });
          let params = this.$data.queryParmas;
          querySimList(params).then((result) => {
//              result.list.forEach(function (item,index) {
//
//              });
              this.$data.resultData = result;

          })
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
                supplierId: '1',
                distributorId: '1',
                pageNum : 1
            };
            this.$data.startEndDateTime = [];
            this.request();
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
        SimEditVisible(visible, row) {
          this.$data.dialog.visible.edit = visible;
          if(!row) return ;
          this.$data.editParams = {
            iccid : row.iccid ,
            comboid:row.comboid,
            comboName:row.comboName,
            date : row.basicexpirationdate.time
          };
        },
        SimDetailVisible(visible , row) {
          this.$data.dialog.visible.detail = visible;
          if(!row) return ;
          this.detailIccid = row.iccid;
        },
        importVisible (visible){
          this.$data.dialog.visible.importV = visible;
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this.request();
        },
        handleCurrentChange(val) {
          this.pageNum = val;
          this.request();
        }
    },
    filters:{
        dateMoment:function (value) {
            if(!value) return "";
//            console.log(this.$moment(1511835596000))
//            return this.$moment(1511835596000).format("YYYY-MM-DD h:mm:ss");
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">


</style>
