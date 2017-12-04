<template>
  <el-main>
    <div class="item-info">
        <label>ICCID : </label>
        <span>{{resultData.iccId}}</span>
    </div>
    <div class="item-info">
      <label>渠道 : </label>
      <span>{{resultData.distributor}}</span>
    </div>
    <div class="item-info">
      <label>供应商 : </label>
      <span>{{resultData.supplierName}}</span>
    </div>
    <div class="item-info">
      <label>状态 : </label>
      <span>{{resultData.state | stateStr }}</span>
    </div>
    <div class="item-info">
      <label>激活时间 : </label>
      <span>{{resultData.activationDate.time  | moment }}</span>
    </div>
    <div class="item-info">
      <label>套餐修改时间 : </label>
      <span>{{resultData.updateDate.time   | moment  }}</span>
    </div>
    <div class="item-info">
      <label>服务到期时间 : </label>
      <span>{{resultData.expirationDate.time   | moment }}</span>
    </div>
    <div class="item-info">
      <label>当前计费周期内剩余流量 : </label>
      <span>{{ resultData.curResidualFlow }}</span>
    </div>
    <div class="item-info">
      <label>当前计费周期内总流量 : </label>
      <span>{{resultData.curTotalFlow}}</span>
    </div>
    <div class="item-info">
      <label>当前基础套餐 : </label>
      <span>{{resultData.curGoodsName}}</span>
    </div>
    <div class="item-info">
      <label>当前基础套餐到期时间 : </label>
      <span>{{resultData.basicExpirationDate.time  | moment  }}</span>
    </div>
    <div class="tableContainer">
      <h6>当前可选套餐</h6>
      <el-table :data="simCombo">
          <el-table-column
            prop="name"
            label="套餐名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="price"
            label="购买金额（元）"
            align="center">
          </el-table-column>
          <el-table-column
            prop="startDate"
            label="生效时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="endDate"
            label="到期时间"
            align="center">
          </el-table-column>
      </el-table>
      <div class="block page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[5,10]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </div>
    <div class="item-info" style="margin-top: 30px;">
        <label></label>
        <el-button type="primary" @click="cancelForm">关 闭</el-button>
    </div>
  </el-main>
</template>

<script>
  import { event } from './SimConfig';
  import { detailSim , searchSimCombo } from  '../../services/SimManageService';
  export default {
    props:["detailIccid"],
    data () {
      return {
        resultData:{},
        simCombo :[],
        page:{
          pageNum:1,
          pageSize:5
        }
      }
    },
    created() {
       this.request();
    },
    methods:{
      request() {
        detailSim({ iccId:this.$props.detailIccid }).then((result) => {
            this.resultData = result;
        });
        let params = {
            iccId : this.$props.detailIccid ,
            pageNum : this.page.pageNum ,
            pageSize: this.page.pageSize
        };
        searchSimCombo(params).then((result) => {
            this.page.total = result.total ;
            this.simCombo = result.list ;
        })
      },
      cancelForm (refresh=false){
         this.$emit(event.CLOSE_DIALOG, refresh);
      },
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.request();
      },
      handleCurrentChange(val) {
        this.page.pageNum = val;
        this.request();
      }
    },
    filters:{
      stateStr: function (value) {
          if (!value) return '';
          let str = '';
          switch(value){
            case 1 :
              str = "未激活"
              break;
            case 2 :
              str = "已激活"
              break;
            case 3 :
              str = "停卡"
              break;
            default:
              str = ""
          };
          return str;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
    .item-info{
      margin:15px 0;
      label{
        display: inline-block;
        width:180px;
        text-align: right;
        margin-right:20px;
        font-size:14px;
      }
      span{
        font-size:16px;
      }
    }
  .tableContainer{
      h6{
          font-size: 16px;
          text-align: center;
          margin:8px 0;
      }
  }
  .page{
    margin-top:8px;
  }
</style>
