<template>
  <div class="flex1" v-loading="loading">
  </div>
</template>

<script>
  import { Loading } from 'element-ui'
  import ssoService from '../../services/sso.service';
  import commonService from '../../services/commonService';
  import config from '../../index.config';
  export default {
    name: 'loading',
    data () {
      return {
        loading: true,
      }
    },
    methods: {

    },
    mounted: function () {
      ssoService.logged()
        .then((data)=>{
          commonService.setUserInfo(data);
          this.$router.replace('home');
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  }
</script>
