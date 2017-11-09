<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import commonService from './services/commonService';
  export default {
    name: 'app'
  }
</script>

<style>
  @import "../static/css/main.css";
  @import "../static/css/color-dark.css";
</style>
