<template>
  <div>
    <el-form ref="addForm" :rules="rules" :model="addParams" label-width="100px" size="medium">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="addParams.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="供应商" prop="supplierId">
        <el-select v-model="addParams.supplierId" @change="supplierChange" placeholder="请选择分销商">
          <el-option
            v-for="item in suppliers"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格" prop="totalFlow">
        <el-select v-model="addParams.totalFlow" @change="totalFlowChange" placeholder="请选择商品规格">
          <el-option
            v-for="item in totalFlows"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品类型" prop="type">
        <el-select v-model="addParams.type" @change="typeChange" placeholder="请选择商品类型">
          <el-option
            v-for="item in goodTypes"
            :key="item.id"
            :label="item.name"
            :value="item.id">
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
        <el-select v-model="addParams.cycleValue" @change="cycleValueChange" placeholder="请选择周期值">
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
        <el-input v-model="addParams.salePrice" :disabled="saleIs" placeholder="请输入促销价格">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品介绍" prop="message">
        <el-input type="textarea" :rows="2" v-model="addParams.message" placeholder="请输入商品介绍"></el-input>
      </el-form-item>
      <el-form-item label="分销商" prop="distributorId">
        <el-select v-model="addParams.distributorId" placeholder="请选择分销商">
          <el-option
            v-for="item in distributors"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品关联"  v-if="relationGoods">
        <div v-if="options.length==0">无相关套餐</div>
        <div v-if="options.length>0"
             v-for="(domain, index) in addParams.suppliers"
             :key="index"
        >
          <el-select  v-model="domain.supplierGoodId"  placeholder="请选择套餐">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input-number v-model="domain.supplierCount" :min="1" :max="10" label="描述文字"></el-input-number>
          <el-button v-if="index !== 0" @click.prevent="removeDomain(domain)">删除</el-button>
        </div>
        <el-button class="tpl-mg-t" v-if="options.length>0 && addParams.totalFlow==1" @click="addDomain">添加关联</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {  totalFlows , cycle , cycleValue,event} from "./GoodsCofig";
  import { getRules } from './GoodsRules';
  const rules = getRules();
  import { getAllSupplier,getAllDistributor ,searchPackageType ,searchSupplierGoods , addSupplierGoods } from '../../services/GoodsManagementService';

  export default {
    props:["goodAdd"],
    data() {
      var cyclePass = (rule, value, callback) => {
        if(!value){
            callback(new Error('请选择周期'));
        }else{
            callback();
        }
      };
      var pricePass = (rule, value, callback)=>{
        if(!value){
          this.saleIs = true;
          callback(new Error("请输入商品价格"))
        }else{
          if(!String(value).match(/^([1-9]\d*|0)(\.\d{1,2})?$/)){
            this.saleIs = true;
            callback(new Error("只能输入数字,小数点后2位"))
          }else{
            this.saleIs = false;
            callback();
          }
        }
      };
      var salePricePass = (rule, value, callback)=>{
        if(value){
          if(!String(value).match(/^([1-9]\d*|0)(\.\d{1,2})?$/)){
            callback(new Error('只能输入数字,小数点后2位'));
          };
          if(value*1 > this.addParams.price*1){
            callback(new Error("促销价格不能大于商品价格"));
          }else{
            callback();
          }
        }else{
          callback();
        }
      };
      return {
        formName: 'addForm',
        totalFlows  , cycle, cycleValue ,
        options:[],
        suppliers:[],
        distributors:[],
        goodTypes:[],
        saleIs:true,
        relationGoods:false,  // 商品列表默认不显示
        addParams: {
          name: '',
          type: "",
          totalFlow: '',
          cycle: null,
          cycleValue: null,
          price: '',
          salePrice: '',
          message: '',
          distributorId:"",
          supplierId:"",
          suppliers:[],
          comboTypeId:""
        },
        rules: {
          ...rules,
          cycle : [
            { validator: cyclePass, trigger: 'change' }
          ],
          price : [
             { validator: pricePass, trigger: 'change' }
          ],
          salePrice : [
            { validator: salePricePass, trigger: 'change' }
          ]
        }
      }
    },
    created(){
      this.addParams.comboTypeId = this.$props.goodAdd;
      this.getSupplierList();
      this.getDistributoList();
      this.getGoodTypes();
    },
    methods: {
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
        });
      },
      /*
      *   获取所有分销商
      * */
      getDistributoList(){
        let vm = this;
        getAllDistributor().then((res) => {
          res.forEach(function (item) {
            vm.distributors.push({
              id:item.id.toString(),
              name:item.distributorName
            })
          });
        })
      },
      /*
      *   获取商品类型
      */
      getGoodTypes(){
        let params = {
            comboType:this.$props.goodAdd
          },
          vm = this;
        searchPackageType(params).then((res) => {
          res.forEach(function (item) {
            vm.goodTypes.push({
              id:item.id.toString(),
              name:item.comboName
            })
          })
        })
      },
      supplierChange(){
        this.searchRelationGoods();
      },
      totalFlowChange(){
        this.searchRelationGoods();
      },
      typeChange(){
        this.searchRelationGoods();
      },
      cycleChange(){
        this.addParams.cycleValue = 1;
        this.searchRelationGoods();
      },
      cycleValueChange(){
        this.searchRelationGoods();
      },
      /*
      *   商品关联
      */
      searchRelationGoods(){
        let obj = this.addParams;
        obj.suppliers = [{
          supplierCount: '',
          supplierGoodId: ''
        }];
        if(obj.supplierId && obj.totalFlow && obj.type) {
          this.relationGoods = true;
        };
        let params = {
            supplierId:obj.supplierId,
            monthFlow:obj.totalFlow,
            type:obj.type,
            cycle:obj.cycle,
            cycleVal:obj.cycleValue
        };
        searchSupplierGoods(params).then((res) => {
          this.options = res.list;
        })

      },
      close (refresh=false) {
        this.$emit(event.CLOSE_DIALOG, refresh);
      },
      goToList() {
        this.$router.back();
      },
      openMessage() {
        this.$alert('商品创建成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.close();
          }
        });
      },
      removeDomain(item) {
        var index = this.addParams.suppliers.indexOf(item)
        if (index !== -1) {
          this.addParams.suppliers.splice(index, 1)
        }
      },
      addDomain() {
        this.addParams.suppliers.push({
          supplierCount: '',
          supplierGoodId: ''
        });
      },
      request() {
        let params = this.$data.addParams;
        addSupplierGoods(params).then(() => {
          this.openMessage();
        }).catch((err) => {
          this.$message.error( err.message );
        })
      },
      onSubmit() {
        let formName = this.$data.formName;
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if(valid){
            if(vm.options.length>0){
              this.request();
            }else{
              this.$alert("无相关套餐，请重新选择","提示",{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
            }
          };
          return valid;
        });
      },
      onCancel() {
        this.close();
      },

    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
</style>
