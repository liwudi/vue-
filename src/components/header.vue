<template>
  <div class="header">
    <div class="logo">NI流量管理平台</div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                    {{name}}
                <i  class="el-icon-caret-bottom"></i>
                </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="UpdatePassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码" width="65%" :visible.sync="dialog.visible.add" :close-on-click-modal="false" :close-on-press-escape="false" v-if="dialog.visible.add">
      <update-password v-on="dialog.event.add"></update-password>
    </el-dialog>
  </div>
</template>

<script>
  const event = {
    CLOSE_DIALOG: 'CLOSE_DIALOG'
  };

  import commonService from '../services/commonService'
  import ssoService from '../services/sso.service'
  import updatePassword from '../views/UpdatePassword/UpdatePassword.vue'
  export default {
    components: {
      updatePassword
    },
    data () {
      return {
        dialog: {
          visible: {add: false},
          event: {add: {}}
        },
        name: '',
        userId:'',

      }
    },
    created() {
      this.$data.dialog.event.add[event.CLOSE_DIALOG] = () => {
        this.addFormVisible(false);
      };
    },
    mounted () {
      this.name = commonService.getUserInfo().userName || '',
        this.userId = commonService.getUserInfo().id
    },
    methods: {



      handleCommand (command) {
        switch (command) {
          case 'loginout' :
            this.loginOut()
            break;
          case 'UpdatePassword':
            this.addFormVisible(true)
            break;
        }
      },

      addFormVisible(visible) {
        this.$data.dialog.visible.add = visible;
      },

      openMessage(message, confirmText, doit) {
        this.$confirm(message, '提示', {
          cancelButtonText: '取消',
          confirmButtonText: confirmText
        }).then(() => {
          doit();
        }).catch(() => {
        });
      },
      loginOut () {
        this.openMessage('您确定要退出吗？', '确定', ()=>{
          ssoService.loginOut()
            .then(()=>{
              this.$message({type: 'success', message: '退出成功'});
              window.localStorage.clear();
              setTimeout(()=>{
                this.$router.replace('login');
              },500)
            })
            .catch((err)=>{
              this.$message({type: 'warning', message: err.message});
            })
        })
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  $font-color: #ffffff;
  .header {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    line-height: 1;
    color: $font-color;

    .logo {
      font-size: 20px;
      font-weight: 500;
      float: left;
    }

    .user-info {
      float: right;
      margin-top: 3px;
      .el-dropdown {
        color: $font-color;
        cursor: pointer;
      }
    }
  }

  /* .header {
       position: relative;
       box-sizing: border-box;
       width: 100%;
       height: 100%;
       font-size: 22px;
       line-height: 50px;
       color: #fff;
   }
   .header .logo{
       float: left;
       width:250px;
       text-align: center;
   }
   .user-info {
       float: right;
       padding-right: 50px;
       font-size: 16px;
       color: #fff;
   }
   .user-info .el-dropdown-link{
       position: relative;
       display: inline-block;
       padding-left: 50px;
       color: #fff;
       cursor: pointer;
       vertical-align: middle;
   }
   .user-info .user-logo{
       position: absolute;
       left:0;
       top:15px;
       width:40px;
       height:40px;
       border-radius: 50%;
   }
   .el-dropdown-menu__item{
       text-align: center;
   }*/
</style>
