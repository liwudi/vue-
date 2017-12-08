<template>
  <div>
    <el-form ref="addForm" :rules="rules" :model="addParams" label-width="100px" size="medium">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="addParams.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="供应商" prop="supplierId">
        <el-select v-model="addParams.supplierId" placeholder="请选择分销商">
          <el-option
            v-for="item in suppliers"
            :key="item.id"
            :label="item.supplierName"
            :value="item.id">
          </el-option>
        </el-select>
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
      <el-form-item label="周期/周期值" prop="cycle">
        <el-select v-model="addParams.cycle" @change="cycleChange" placeholder="请选择周期">
          <el-option
            v-for="item in cycle"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
        <el-select v-model="addParams.cycleValue" placeholder="请选择周期值">
          <el-option
            v-for="item in cycleValue[addParams.cycle-2]"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格"  prop="price">
        <el-input v-model="addParams.price" placeholder="请输入商品价格">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="促销价格" prop="salePrice">
        <el-input v-model="addParams.salePrice" placeholder="请输入促销价格">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品介绍" prop="desc">
        <el-input type="textarea" :rows="2" v-model="addParams.message" placeholder="请输入商品介绍"></el-input>
      </el-form-item>
      <el-form-item label="分销商" prop="distributorId">
        <el-select v-model="addParams.distributorId" placeholder="请选择分销商">
          <el-option
            v-for="item in distributors"
            :key="item.id"
            :label="item.distributorName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="商品关联">
        <div
          v-for="(domain, index) in supplierGoodsAddForm.domains"
          :key="index"
        >
          <el-select v-model="domain.key" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input-number v-model="domain.value" :min="1" :max="10" label="描述文字"></el-input-number>
          <el-button v-if="index !== 0" @click.prevent="removeDomain(domain)">删除</el-button>
        </div>
        <el-button class="tpl-mg-t" @click="addDomain">添加关联</el-button>
      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {  totalFlows , cycle , cycleValue} from "./GoodsCofig";
  import { getRules } from './SupplierGoodsRules';
  const rules = getRules();
  import { getAllSupplier,getAllDistributor ,searchPackageType ,searchSupplierGoods , addSupplierGoods } from '../../services/GoodsManagementService';

  export default {
    props:{
      closeView : Function,
      goodAdd:Number
    },
    data() {
      var cyclePass = (rule, value, callback) => {
        console.log(value)
        if(!value){
          return callback(new Error('请选择周期'));
        }
        if(!this.supplierGoodsAddForm.cycleValue){
          return callback(new Error('请选择周期值'));
        }
      };
      var pricePass = (rule, value, callback)=>{
        if(!value){
          return callback(new Error('请输入商品价格'));
        }
        if(!String(value).match(/^([1-9]\d*|0)(\.\d{1,2})?$/)){
          return callback(new Error('只能输入数字,小数点后2位'))
        }
      };
      var salePricePass = (rule, value, callback)=>{
        if(!String(value).match(/^([1-9]\d*|0)(\.\d{1,2})?$/)){
          return callback(new Error('只能输入数字,小数点后2位'))
        }
        if(value > this.supplierGoodsAddForm.price){
          return callback(new Error('促销价格不能大于商品价格'))
        }
      };
      return {
        formName: 'addForm',
        totalFlows  , cycle, cycleValue ,
        suppliers:[],
        distributors:[],
        goodTypes:[],
        addParams: {
          name: '',
          supplierId:"",
          totalFlow: '-1',
          type: 0,
          cycle: 2,
          cycleValue: 1,
          price: '',
          salePrice: '',
          message: '',
          distributorId:"",
        },
        rules: {
          ...rules,
          cycle : [
            {required: true, message: '请选择周期值'},
            { validator: cyclePass, trigger: 'change' }
          ],
          price : [
            {required: true, message: '请输入商品价格', trigger: 'change'},
            { validator: pricePass, trigger: 'change' }
          ],
          salePrice : [
            { validator: salePricePass, trigger: 'change' }
          ]
        }
      }
    },
    created(){
        this.getSupplierList();
        this.getDistributoList();
        this.getGoodTypes();

    },
    methods: {
      /*
      *   获取所有供应商
      * */
      getSupplierList(){
          getAllSupplier().then((res) => {
              this.suppliers = res;
          })
      },
      /*
      *   获取所有分销商
      * */
      getDistributoList(){
          getAllDistributor().then((res) => {
            this.distributors = res;
          })
      },
      /*
      *   获取商品类型
      */
      getGoodTypes(){
        let params = {
          comboType:this.$props.goodAdd
        };
        searchPackageType(params).then((res) => {
            this.goodTypes = res;
        })
      },

      /*
      *   商品关联
      */
      searchRelationGoods(){
          let params = {
              supplierId:1,
              monthFlow:"1",
              type:"1",
              cycle:"1",
              cycleVal:"15"
          };
        searchSupplierGoods(params).then((res) => {
            console.log(res);
        })

      },
      close() {
        this.$props.closeView();
      },
      goToList() {
        this.$router.back();
      },
      openMessage() {
        this.$alert('商品创建成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.close(true);
            //this.goToList();
          }
        });
      },
      removeDomain(item) {
        var index = this.supplierGoodsAddForm.domains.indexOf(item)
        if (index !== -1) {
          this.supplierGoodsAddForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.supplierGoodsAddForm.domains.push({
          value: '',
          key: ''
        });
      },
      request() {
        let params = this.$data.supplierGoodsAddForm;
        addSupplierGoods(params).then(() => {
           this.openMessage();
        });
      },
      onSubmit() {
        let formName = this.$data.formName;
        this.$refs[formName].validate((valid) => {
          if(valid) this.request();
          return valid;
        });
      },
      onCancel() {
        this.close();
      },
      cycleChange(){
        this.supplierGoodsAddForm.cycleValue = 1;
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
</style>
