<template>
  <el-container>
    <el-header><v-head></v-head></el-header>
    <el-container>
      <el-aside width="200px"><v-sidebar></v-sidebar></el-aside>
      <transition name="move" mode="out-in"><router-view></router-view></transition>
    </el-container>
  </el-container>
    <!--<div class="wrapper">-->
        <!--<v-head></v-head>-->
        <!--<v-sidebar></v-sidebar>-->
        <!--<div class="content">-->
            <!--<transition name="move" mode="out-in"><router-view></router-view></transition>-->
        <!--</div>-->
    <!--</div>-->
</template>

<script>
    import vHead from '../components/header.vue';
    import vSidebar from '../components/sidebar/sidebar.vue';
    export default {
        components:{
            vHead, vSidebar
        },
        mounted(){
          //this.$router.replace('basetable');
        }
    }
</script>
