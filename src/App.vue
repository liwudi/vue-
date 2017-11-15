<template>
  <div id="app">
    <div class="wrapper flex1" v-if="ready" >
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
      ssoService.logined()
        .then((data)=>{
            return;
        })
        .catch(()=>{
          //window.location.href = `${window.location.origin}/#hello`;
          return;
        })
        .then(()=>{
          this.ready = true;
        })
    }
  }
</script>

<style>

</style>
