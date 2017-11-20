<template>
  <el-main>
    <el-form ref="supplierGoodsAddForm" :rules="rules" :model="supplierGoodsAddForm" label-width="80px" size="medium">
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
      <el-form-item label="周期值/周期" prop="cycle">
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
      <el-form-item label="商品价格" prop="price">
        <el-input type="number" v-model="supplierGoodsAddForm.price" placeholder="请输入商品价格">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="促销价格" prop="salePrice">
        <el-input type="number" v-model="supplierGoodsAddForm.salePrice" placeholder="请输入促销价格">
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
  </el-main>
</template>

<script>
  import { totalFlow, type, cycle, cycleValue, supplierId } from './SupplierGoodsConfig';
  const event = {
    CLOSE_ADD_SUPPLIERGOODS: 'CLOSE_ADD_SUPPLIERGOODS'
  };
  import { getRules } from './SupplierGoodsRules';
  const rules = getRules();
  import { addSupplierGoods } from '../../services/GoodsManagementService';

  export default {
    data() {
      return {
        formName: 'supplierGoodsAddForm',
        totalFlow, type, cycle, cycleValue, supplierId,
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
        rules: rules
      }
    },
    methods: {
      close(refresh=false) {
        this.$root.$emit(event.CLOSE_ADD_SUPPLIERGOODS, refresh);
      },
      goToList() {
        this.$router.back();
      },
      openMessage() {
        this.$alert('供应商品创建成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.close(true);
            //this.goToList();
          }
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
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
</style>
