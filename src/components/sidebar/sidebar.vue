<template>
  <div>
    <el-menu
      @open="handleOpen"
      @close="handleClose"
      unique-opened
      router
      v-for="(item, index) in menuData"
    >{{item.sub}}
      <el-submenu v-if="item.sub" :index="item.index">
<!--        <template slot="title">
          <i :class="item.icon"></i><span>{{item.title}}</span>
        </template>
        <el-menu-item-group v-for="(sub, index) in item.sub">
          <el-menu-item :index="sub.index">
            <i :class="sub.icon"></i><span>{{sub.title}}</span>
          </el-menu-item>
        </el-menu-item-group>-->
      </el-submenu>
      <el-menu-item v-else :index="item.index">
        <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
<!--
    <el-menu
      default-active="2"
      @open="handleOpen"
      @close="handleClose">

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>
-->
  </div>

<!--    <el-menu
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
    </el-menu>-->
</template>
<script>
  import {menuData} from './SidebarConfig';
  export default {
    data () {
      return {
        menuData: []
      }
    },
    created () {
      this.$data.menuData = menuData;
      console.info(menuData)
      console.info(this.$data.menuData)
    },
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
/*  .sidebar {
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
  }*/
</style>
