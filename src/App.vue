<template>
  <div id="app">
    <div class="flex1" :ndd="" v-if="ready" >
      <router-view/>
    </div>
    <div v-if="!ready" class="flex1" v-loading="true"></div>
  </div>
</template>

<script>
  import commonService from './services/commonService';
  import ssoService from './services/sso.service';
  export default {
    name: 'app',
    data(){
      return {
        ready : false
      }
    },
    beforeCreate : function () {
      ssoService.logged()
        .then((data)=>{

        })
        .catch(()=>{
          //window.location.href = `${window.location.origin}/#hello`;
        })
        .finally(()=>{
          this.ready = true;
        })
    }
  }
</script>

<style>
  @import "../static/css/main.css";
  @import "../static/css/color-dark.css";
</style>
