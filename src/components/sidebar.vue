<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-menu-item >
                <i class="el-icon-setting"></i>1
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>2</template>
                <el-menu-item >1</el-menu-item>
                <el-menu-item >2</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-date"></i>3</template>
                <el-menu-item >1</el-menu-item>
                <el-menu-item >2</el-menu-item>
                <el-menu-item >3</el-menu-item>
                <el-menu-item >4</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-star-on"></i>4</template>
                <el-menu-item >1</el-menu-item>
                <el-menu-item >2</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    export default {
        computed:{
//            onRoutes(){
//                return this.$route.path.replace('/','');
//            }
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
