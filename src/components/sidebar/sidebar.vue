<template>
  <div class="menu">
    <el-menu router :default-active="defaultActive">
      <el-menu-item v-for="(item, index) in menuData" :index="item.index">
        <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  import {menuData} from './SidebarConfig';
  export default {
    data () {
      return {
        menuData: [],
        defaultActive: ''
      }
    },
    created () {
      this.$data.menuData = menuData;
      this.$data.defaultActive = this.$router.currentRoute.name;
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect() {
        console.info(arguments)
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .menu {
    width: 100%; height: 100%;
    background-color: #FAFAFA;
    .el-menu {
      border: 0;background-color: rgba(255,255,255,0);
      .el-menu-item {border-bottom: 1px solid #E6EBF5;}
    }
  }
</style>
