<template>
  <el-main>
    <h3 class="main-title">对账查询</h3>

    <label>
      套餐类型
      <el-select v-model="queryParams.type" clearable placeholder="请选择">
        <el-option
          v-for="item in types"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </label>

    <label>
      供应商
      <el-select v-model="queryParams.distributorId" clearable placeholder="请选择">
        <el-option
          v-for="item in distributors"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </label>

    <label>
      创建时间
      <el-date-picker
        v-model="startEndDate"
        type="daterange"
        @change="query"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </label>

    <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
    <el-table
      :data="resultData.list"
      stripe
      style="width: 100%">
      <el-table-column prop="orderId" label="订单号"/>
      <el-table-column prop="oldGoodsId" label="原套餐ID"/>
      <el-table-column prop="oldGoodsName" label="原套餐名称"/>
      <el-table-column prop="newGoodsId" label="新套餐ID"/>
      <el-table-column prop="newGoodsName" label="新套餐名称"/>
      <el-table-column prop="distributor" label="分销商"/>
      <el-table-column prop="iccid" label="iccid"/>
      <el-table-column prop="updateDate" label="创建时间" />
      <el-table-column prop="difference" label="订单金额"/>
    </el-table>
    <el-pagination
      @size-change="query"
      @current-change="query"
      :current-page="queryParams.pageNum"
      :page-size="queryParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="resultData.total">
    </el-pagination>
    {{resultData}}
  </el-main>
</template>

<script>
  import BillsService from '../../services/BillsService';
  export default {
    data() {
      return {
        types: [{
          value: '1',
          label: '激活套餐'
        }, {
          value: '2',
          label: '续费套餐'
        }, {
          value: '3',
          label: '充值套餐'
        }],
        distributors: [{
          id: '2016-05-02',
          name: '王小虎'
        },{
          id: '2016-05-021',
          name: '王小虎2'
        }],
        startEndDate:[],
        queryParams: {
          type:'',
          distributorId:'',
          timeStart:'',
          timeEnd:'',
          pageNum: 1,
          pageSize: 10
        },
        resultData: {
          total:0,
          list: []
        }
      }
    },
    methods: {
      dateFormat(row, column, cellValue) {
          return cellValue;
      },
      dateChange() {
        console.log(this.queryParams)
        this.query();
      },
      query() {
        BillsService.searchBillForDistributor(
          this.queryParams
        ).then(rs => {
          console.log(rs)
          this.resultData = rs;
        });
      }
    },
    mounted() {
      this.query();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
