<template>
  <div class="flex1" v-loading="loading">
  </div>
</template>

<script>
  import { Loading } from 'element-ui'
  import ssoService from '../../services/sso.service';
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
          console.log(data);
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  }
</script>
