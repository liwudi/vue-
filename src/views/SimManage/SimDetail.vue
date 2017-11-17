<template>
  <el-main>
    <div class="item-info">
        <label>ICCID : </label>
        <span>{{simDetailForm.iccid}}</span>
    </div>
    <div class="item-info">
      <label>渠道 : </label>
      <span>{{simDetailForm.distributor}}</span>
    </div>
    <div class="item-info">
      <label>供应商 : </label>
      <span>{{simDetailForm.suppler}}</span>
    </div>
    <div class="item-info">
      <label>状态 : </label>
      <span>{{simDetailForm.state}}</span>
    </div>
    <div class="item-info">
      <label>激活时间 : </label>
      <span>{{simDetailForm.activationDate}}</span>
    </div>
    <div class="item-info">
      <label>套餐修改时间 : </label>
      <span>{{simDetailForm.updateDate}}</span>
    </div>
    <div class="item-info">
      <label>服务到期时间 : </label>
      <span>{{simDetailForm.expirationDate}}</span>
    </div>
    <div class="item-info">
      <label>当前计费周期内使用流量 : </label>
      <span>{{simDetailForm.curResidualFlow}}</span>
    </div>
    <div class="item-info">
      <label>当前计费周期内总流量 : </label>
      <span>{{simDetailForm.curResidualFlow}}</span>
    </div>
    <div class="item-info">
      <label>当前基础套餐 : </label>
      <span>{{simDetailForm.curResidualFlow}}</span>
    </div>
    <div class="item-info">
      <label>当前基础套餐到期时间 : </label>
      <span>{{simDetailForm.curResidualFlow}}</span>
    </div>
    <div class="item-info">
      <label>当前可选套餐 : </label>
      <el-table :data="optionGoods">
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
  export default {
    data () {
      return {
        formName: 'simDetailForm',
        simDetailForm:{
          iccid:"333dsfvgfsd",
          distributor:"333dsfvgfsd",
          suppler:"333dsfvgfsd",
          state:"333dsfvgfsd",
          activationDate:"333dsfvgfsd",
          updateDate:"333dsfvgfsd",
          expirationDate:"333dsfvgfsd",
          curResidualFlow:"333dsfvgfsd",
          optionGoods:"333dsfvgfsd",
        },
        optionGoods:[
          {goodsName:"名称",price:"111",effectiveDate:"2011-10-10"}
        ]
      }
    },
    methods:{
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
