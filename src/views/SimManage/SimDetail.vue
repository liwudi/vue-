<template>
  <el-main>
    <div class="item-info">
        <label>ICCID : </label>
        <span>{{resultData.iccid}}</span>
    </div>
    <div class="item-info">
      <label>渠道 : </label>
      <span>{{resultData.distributor}}</span>
    </div>
    <div class="item-info">
      <label>供应商 : </label>
      <span>{{resultData.suppler}}</span>
    </div>
    <div class="item-info">
      <label>状态 : </label>
      <span>{{resultData.state}}</span>
    </div>
    <div class="item-info">
      <label>激活时间 : </label>
      <span>{{resultData.activationDate}}</span>
    </div>
    <div class="item-info">
      <label>套餐修改时间 : </label>
      <span>{{resultData.updateDate}}</span>
    </div>
    <div class="item-info">
      <label>服务到期时间 : </label>
      <span>{{resultData.expirationDate}}</span>
    </div>
    <div class="item-info">
      <label>当前计费周期内使用流量 : </label>
      <span>{{resultData.curResidualFlow}}</span>
    </div>
    <div class="item-info">
      <label>当前计费周期内总流量 : </label>
      <span>{{resultData.curResidualFlow}}</span>
    </div>
    <div class="item-info">
      <label>当前基础套餐 : </label>
      <span>{{resultData.curResidualFlow}}</span>
    </div>
    <div class="item-info">
      <label>当前基础套餐到期时间 : </label>
      <span>{{resultData.curResidualFlow}}</span>
    </div>
    <div class="item-info">
      <label>当前可选套餐 : </label>
      <el-table :data="resultData.optionGoods">
          <el-table-column
            prop="goodsName"
            label="套餐名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="price"
            label="购买金额（元）"
            align="center">
          </el-table-column>
          <el-table-column
            prop="effectiveDate"
            label="生效时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="到期时间"
            align="center">
          </el-table-column>
      </el-table>
    </div>
    <div class="item-info" style="margin-top: 30px;">
        <label></label>
        <el-button type="primary" @click="cancelForm">关 闭</el-button>
    </div>
  </el-main>
</template>

<script>
  import { event } from './SimConfig';
  import { detailSim } from  '../../services/SimManageService';
  export default {
    props:["detailIccid"],
    data () {
      return {
        queryParams:{
          iccid:""
        },
        resultData:{},
      }
    },
    created() {
       this.queryParams.iccid = this.$props.detailIccid;
       this.request();
    },
    methods:{
      request() {
        detailSim(this.queryParams).then((result) => {
            this.resultData = result.data;
        })
      },
      cancelForm (refresh=false){
        this.$root.$emit(event.CLOSE_DETAIL_SIM, refresh);
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
</style>
