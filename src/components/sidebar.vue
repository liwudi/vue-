<template>
    <el-menu
             default-active="basetable"
             @open="handleOpen"
             @close="handleClose"
             unique-opened
             router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>表格</template>
        <el-menu-item index="basetable">基础表格</el-menu-item>
      </el-submenu>
      <el-menu-item index="GoodsManagement">
        <i class="el-icon-menu"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>账单查询</template>
        <el-menu-item index="Reconciliation">对账查询</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
        <el-menu-item index="UserList">用户列表</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-menu"></i>供应商管理</template>
        <el-menu-item index="SupplierManagement">供应商管理</el-menu-item>
      </el-submenu>

    </el-menu>
</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2E363F;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
