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
      <span>{{resultData.supplier}}</span>
    </div>
    <div class="item-info">
      <label>状态 : </label>
      <span>{{resultData.state | stateStr }}</span>
    </div>
    <div class="item-info">
      <label>激活时间 : </label>
      <span>{{resultData.activationDate.time | dateMoment}}</span>
    </div>
    <div class="item-info">
      <label>套餐修改时间 : </label>
      <span>{{resultData.updateDate.time}}</span>
    </div>
    <div class="item-info">
      <label>服务到期时间 : </label>
      <span>{{resultData.expirationDate.time}}</span>
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
      <span>{{resultData.basicExpirationDate.time}}</span>
    </div>
    <div class="item-info">
      <label>当前可选套餐 : </label>
      <el-table :data="resultData.list">
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
        resultData:{},
      }
    },
    created() {
       this.request();
    },

    methods:{
      request() {
        detailSim({ iccid:this.$props.detailIccid }).then((result) => {
            this.resultData = result;
        })
      },
      cancelForm (refresh=false){
         this.$emit(event.CLOSE_DIALOG, refresh);
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
      },
      dateMoment:function (value) {
         if (!value) return '';

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
