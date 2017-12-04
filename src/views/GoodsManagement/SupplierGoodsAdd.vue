<template>
  <div>
    <el-form ref="addForm" :rules="rules" :model="supplierGoodsAddForm" label-width="100px" size="medium">
      <el-form-item label="商品ID" prop="id">
        <el-input v-model="supplierGoodsAddForm.id" placeholder="请输入商品ID"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="supplierGoodsAddForm.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品规格" prop="totalFlow">
        <el-select v-model="supplierGoodsAddForm.totalFlow" placeholder="请选择商品规格">
          <el-option
            v-for="item in totalFlow"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品类型" prop="type">
        <el-select v-model="supplierGoodsAddForm.type" placeholder="请选择商品类型">
          <el-option
            v-for="item in type"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="周期值/周期" :required="true" prop="cycle">
        <el-select v-model="supplierGoodsAddForm.cycle" placeholder="请选择周期值">
          <el-option
            v-for="item in cycle"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-select v-model="supplierGoodsAddForm.cycleValue" placeholder="请选择周期">
          <el-option
            v-for="item in cycleValue"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格" :required="true" prop="price">
        <el-input v-model="supplierGoodsAddForm.price" placeholder="请输入商品价格">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="促销价格" prop="salePrice">
        <el-input v-model="supplierGoodsAddForm.salePrice" placeholder="请输入促销价格">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品介绍" prop="desc">
        <el-input type="textarea" :rows="2" v-model="supplierGoodsAddForm.desc" placeholder="请输入商品介绍"></el-input>
      </el-form-item>
      <el-form-item label="供应商" prop="supplierId">
        <el-select v-model="supplierGoodsAddForm.supplierId" placeholder="请选择供应商">
          <el-option
            v-for="item in supplierId"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { totalFlow, type, cycle, cycleValue, supplierId } from './SupplierGoodsConfig'
  import { getRules } from './SupplierGoodsRules'

  const rules = getRules()
  import { addSupplierGoods } from '../../services/GoodsManagementService'

  export default {
    props: {
      closeView: Function
    },
    data () {
      var cyclePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择周期值'))
        }
        if (!this.supplierGoodsAddForm.cycleValue) {
          return callback(new Error('请选择周期'))
        }
      }
      var pricePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入商品价格'))
        }
        if (!String(value).match(/^([1-9]\d*|0)(\.\d{1,2})?$/)) {
          return callback(new Error('只能输入数字,小数点后2位'))
        }
      }
      var salePricePass = (rule, value, callback) => {
        if (!String(value).match(/^([1-9]\d*|0)(\.\d{1,2})?$/)) {
          return callback(new Error('只能输入数字,小数点后2位'))
        }
        if (value > this.supplierGoodsAddForm.price) {
          return callback(new Error('促销价格不能大于商品价格'))
        }
      }
      return {
        formName: 'addForm',
        totalFlow, cycle, cycleValue,
        supplierGoodsAddForm: {
          id: '',
          name: '',
          type: '',
          totalFlow: '',
          cycle: '',
          cycleValue: '',
          price: '',
          salePrice: '',
          desc: '',
          supplierId: ''
        },
        rules: {
          ...rules,
          cycle: [
            {validator: cyclePass, trigger: 'change'}
          ],
          price: [
            {validator: pricePass, trigger: 'change'}
          ],
          salePrice: [
            {validator: salePricePass, trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      close () {
        this.$props.closeView()
      },
      goToList () {
        this.$router.back()
      },
      openMessage () {
        this.$alert('供应商品创建成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.close(true)
            //this.goToList();
          }
        })
      },
      request () {
        let params = this.$data.supplierGoodsAddForm
        addSupplierGoods(params).then(() => {
          this.openMessage()
        })
      },
      onSubmit () {
        let formName = this.$data.formName
        this.$refs[formName].validate((valid) => {
          if (valid) this.request()
          return valid
        })
      },
      onCancel () {
        this.close()
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
</style>
