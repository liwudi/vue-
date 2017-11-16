<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical-demo"
             default-active="basetable"
             @open="handleOpen"
             @close="handleClose"
             unique-opened
             router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>表格</template>
        <el-menu-item index="basetable">基础表格</el-menu-item>
      </el-submenu>
      <el-menu-item index="DistributorManage">
        <i class="el-icon-menu"></i>
        <span slot="title">渠道管理</span>
      </el-menu-item>
    </el-menu>
  </div>
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
