<template>
  <div>
    <el-form ref="supplierGoodsAddForm" :rules="rules" :model="addParams" label-width="100px" size="medium">
      <el-form-item label="商品ID" prop="id">
        <el-input v-model="addParams.id" placeholder="请输入商品ID"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="addParams.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品规格" prop="totalFlow">
        <el-select v-model="addParams.totalFlow" placeholder="请选择商品规格">
          <el-option
            v-for="item in totalFlows"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品类型" prop="type">
        <el-select v-model="addParams.type" placeholder="请选择商品类型">
          <el-option
            v-for="item in goodTypes"
            :key="item.comboType"
            :label="item.comboName"
            :value="item.comboType">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="周期值/周期" :required="true" prop="cycle">
        <el-select v-model="addParams.cycle" placeholder="请选择周期值">
          <el-option
            v-for="item in cycle"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
        <el-select v-model="addParams.cycleValue" placeholder="请选择周期">
          <el-option
            v-for="item in cycleValue[addParams.cycle-2]"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格" :required="true" prop="price">
        <el-input v-model="addParams.price" placeholder="请输入商品价格">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="促销价格" prop="salePrice">
        <el-input v-model="addParams.salePrice" placeholder="请输入促销价格">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品介绍" prop="message">
        <el-input type="textarea" :rows="2" v-model="addParams.message" placeholder="请输入商品介绍"></el-input>
      </el-form-item>
      <el-form-item label="供应商" prop="supplierId">
        <el-select v-model="addParams.supplierId" placeholder="请选择供应商">
          <el-option
            v-for="item in suppliers"
            :key="item.id"
            :label="item.supplierName"
            :value="item.id">
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
  const event = {
    CLOSE_DIALOG: 'CLOSE_DIALOG'
  };
  import {  totalFlows, cycle, cycleValue } from "./GoodsCofig";
  import { getRules } from './SupplierGoodsRules';
  const rules = getRules();
  import { searchPackageType, getAllSupplier, addSupplyGoods } from '../../services/GoodsManagementService';

  export default {
    data () {
      let cyclePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择周期值'));
        }
        if (!this.supplierGoodsAddForm.cycleValue) {
          return callback(new Error('请选择周期'));
        }
      };
      let pricePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入商品价格'));
        }
        if (!String(value).match(/^([1-9]\d*|0)(\.\d{1,2})?$/)) {
          return callback(new Error('只能输入数字,小数点后2位'));
        }
      };
      let salePricePass = (rule, value, callback) => {
        if (value && !String(value).match(/^([1-9]\d*|0)(\.\d{1,2})?$/)) {
          return callback(new Error('只能输入数字,小数点后2位'));
        }
        /*if (value > this.supplierGoodsAddForm.price) {
          return callback(new Error('促销价格不能大于商品价格'));
        }*/
      };
      return {
        formName: 'supplierGoodsAddForm',
        totalFlows, cycle, cycleValue,
        goodTypes: [],
        suppliers: [],
        addParams: {
          id: '',
          name: '',
          type: 1,
          totalFlow: '',
          cycle: '',
          cycleValue: '',
          price: '',
          salePrice: '',
          message: '',
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
    created(){
        this.getGoodTypes();
        this.getSupplierList();
    },
    methods: {
        /*
        *   获取商品类型
        */
        getGoodTypes(){
          let params = {
            comboType: ''
          };
          searchPackageType(params).then((res) => {
            this.goodTypes = res;
          })
        },
        /*
        *   获取所有供应商
        * */
        getSupplierList(){
          getAllSupplier().then((res) => {
            this.suppliers = res;
          })
        },
        close(refresh=false) {
          this.$emit(event.CLOSE_DIALOG, refresh);
        },
        goToList () {
          this.$router.back();
        },
        openMessage () {
          this.$alert('供应商品创建成功！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.close(true);
              //this.goToList();
            }
          })
        },
        request () {
          let params = this.$data.addParams;
          console.log(params);
          addSupplyGoods(params).then(() => {
            this.openMessage();
          }).catch((err)=>{
            this.$message({type: 'warning', message: err.message});
          })
        },
        onSubmit () {
          let formName = this.$data.formName;
          this.$refs[formName].validate((valid) => {
            if (valid) this.request();
            return valid;
          })
        },
        onCancel () {
          this.close();
        }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
</style>
