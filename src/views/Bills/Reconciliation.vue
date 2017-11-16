<template>
  <el-main>
    <div class="tpl-title">对账查询</div>
    <div class="tpl-mg-t">
      <el-form :inline="true" :model="queryParams" class="tpl-form-inline" size="medium">
        <el-form-item label="套餐类型">
          <el-select v-model="queryParams.type" clearable placeholder="请选择">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商">
          <el-select v-model="queryParams.distributorId" clearable placeholder="请选择">
            <el-option
              v-for="item in distributors"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="startEndDate"
            type="daterange"
            @change="query"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tpl-mg-b">
      <el-button type="primary" @click="query" size="medium">导出EXCEL</el-button>
    </div>
    <el-table
      :data="resultData.list"
      stripe border>
      <el-table-column align="center" prop="orderId" label="订单号"/>
      <el-table-column align="center" prop="oldGoodsId" label="原套餐ID"/>
      <el-table-column align="center" prop="oldGoodsName" label="原套餐名称"/>
      <el-table-column align="center" prop="newGoodsId" label="新套餐ID"/>
      <el-table-column align="center" prop="newGoodsName" label="新套餐名称"/>
      <el-table-column align="center" prop="distributor" label="分销商"/>
      <el-table-column align="center" prop="iccid" label="iccid"/>
      <el-table-column align="center" prop="updateDate" label="创建时间"/>
      <el-table-column align="center" prop="difference" label="订单金额"/>
    </el-table>
    <p class="tpl-p" style="float:right">总金额：123456.225元</p>
    <el-pagination
      style="float:left"
      @size-change="query"
      @current-change="query"
      :current-page="queryParams.pageNum"
      :page-size="queryParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="resultData.total">
    </el-pagination>
  </el-main>
</template>

<script>
  import BillsService from '../../services/BillsService'

  export default {
    data () {
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
        }, {
          id: '2016-05-021',
          name: '王小虎2'
        }],
        startEndDate: [],
        queryParams: {
          type: '',
          distributorId: '',
          timeStart: '',
          timeEnd: '',
          pageNum: 1,
          pageSize: 10
        },
        resultData: {
          total: 0,
          list: []
        }
      }
    },
    methods: {
      dateFormat (row, column, cellValue) {
        return cellValue
      },
      query () {
        BillsService.searchBillForDistributor(
          this.queryParams
        ).then(rs => {
          console.log(rs)
          this.resultData = rs
        })
      }
    },
    mounted () {
      this.query()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">

</style>
