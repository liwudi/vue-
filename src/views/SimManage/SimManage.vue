<template>
    <el-main>
      <h3>SIM卡信息管理</h3>
      <div class="tit">
        <div class="tit-item">
          <span>服务到期时间:</span>
          <el-date-picker
            v-model="value3"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="tit-item">
          <span>渠道:</span>
          <select>
            <option value="111">全部</option>
            <option value="111">易鑫</option>
          </select>
        </div>
        <div class="tit-item">
          <span>供应商:</span>
          <select>
            <option value="111">全部</option>
            <option value="111">翼卡</option>
          </select>
        </div>
        <div class="tit-item">
          <input type="text" placeholder="ICCID">
          <el-button type="primary">查询</el-button>
        </div>
      </div>
      <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="iccid"
          label="ICCID"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="distributorId"
          label="渠道"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="supplierId"
          label="供应商"
          align="center">
        </el-table-column>
        <el-table-column
          prop="activationDate"
          label="卡激活日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="套餐修改日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="expirationDate"
          label="服务到期日期"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="220">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
          </template>

        </el-table-column>
      </el-table>
      </div>
      <div class="block page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </el-main>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        currentPage4: 4,
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        tableData: [{
          iccid:"8986061501000338984",
          distributorId:"易鑫",
          supplierId:"翼卡",
          activationDate:"2016-05-02",
          updateDate:"2016-04-10",
          expirationDate:"2016-11-11",
        }, {
          iccid:"8986061501000338984",
          distributorId:"易鑫",
          supplierId:"翼卡",
          activationDate:"2016-05-02",
          updateDate:"2016-04-10",
          expirationDate:"2016-11-11",
        }, {
          iccid:"8986061501000338984",
          distributorId:"易鑫",
          supplierId:"翼卡",
          activationDate:"2016-05-02",
          updateDate:"2016-04-10",
          expirationDate:"2016-11-11",
        }]
      }
    },
    methods:{
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDetail(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
  .page{
    margin-top:20px;
  }
</style>
