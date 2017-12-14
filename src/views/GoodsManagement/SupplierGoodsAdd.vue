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
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="周期值/周期" prop="cycle">
        <el-select v-model="addParams.cycle" @change="cycleChange" placeholder="请选择周期值">
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
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="addParams.price" placeholder="请输入商品价格">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="促销价格" prop="salePrice">
        <el-input v-model="addParams.salePrice" :disabled="saleIs" placeholder="请输入促销价格">
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
            :label="item.name"
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
              callback(new Error('请选择周期'));
          } else {
              callback();
          }
      };
      let pricePass = (rule, value, callback) => {
          if (!value) {
              this.saleIs = true;
              callback(new Error("请输入商品价格"))
          } else {
              if (!String(value).match(/^([1-9]\d*|0)(\.\d{1,2})?$/)) {
                  this.saleIs = true;
                  callback(new Error("只能输入数字,小数点后2位"))
              } else {
                  this.saleIs = false;
                  callback();
              }
          }
      };
      let salePricePass = (rule, value, callback) => {
        if(value){
            if (!String(value).match(/^([1-9]\d*|0)(\.\d{1,2})?$/)) {
               callback(new Error('只能输入数字,小数点后2位'));
            }
            if (value*1 > this.addParams.price*1) {
                callback(new Error("促销价格不能大于商品价格"));
            } else {
                callback();
            }
        } else {
            callback();
        }
      };
      return {
        formName: 'supplierGoodsAddForm',
        totalFlows, cycle, cycleValue,
        goodTypes: [],
        suppliers: [],
        saleIs: true,  // 促销价格禁止
        addParams: {
          id: '',
          name: '',
          type: '',
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
            {required: true, message: '', trigger: 'change'},
            {validator: cyclePass, trigger: 'change'}
          ],
          price: [
            {required: true, message: '请选择商品价格', trigger: 'change'},
            {validator:pricePass, trigger: 'change'}
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
          let vm = this;
          searchPackageType(params).then((res) => {
            res.forEach(function (item) {
              vm.goodTypes.push({
                id:item.id.toString(),
                name:item.comboName
              })
            })
          })
        },
        /*
        *   获取所有供应商
        * */
        getSupplierList(){
          let vm = this;
          getAllSupplier().then((res) => {
            res.forEach(function (item) {
              vm.suppliers.push({
                id:item.id.toString(),
                name:item.supplierName
              })
            });
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
        cycleChange(){
          this.addParams.cycleValue = 1;
        },
        request () {
          let params = this.$data.addParams;
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
