<template>
  <div>
    <head-top class="head">
        <span slot='return' @click="$router.back()">
          <i class="iconfont return">&#xe60e;</i>
        </span>
      <span slot='title' class="user">
          修改密码
        </span>
    </head-top>
    <aside>
      <ul>
        <li>
          <span>原始密码:</span>
          <input type="password" v-model="pwd" placeholder="输入原密码">
        </li>
        <li>
          <span>新设密码:</span>
          <input type="password" v-model="newPwd" placeholder="输入新密码">
        </li>
        <li>
          <span>再次输入:</span>
          <input type="password" v-model="repeatPwd" placeholder="重新输入一次">
        </li>
      </ul>
    </aside>
    <div @click="changePassword">
      <footer-button>
      <span slot='buttonText'>
        <i class="iconfont">&#xe7b3;</i>
        <span>确定</span>
      </span>
      </footer-button>
    </div>
  </div>

</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  import userInfoService from '@/service/UserInfoService'
  import headTop from '@/components/header/headTop'
  import footerButton from '@/components/footer/footerButton'
  import { Toast } from 'mint-ui';
export default {
  name: 'userPassword',
  data () {
    return {
      pwd:'',
      newPwd:'',
      repeatPwd:''
    }
  },
  methods: {
    ...mapActions([
      'findLoginStaff'
    ]),
    changePassword:function () {
      let oldPassword = this.pwd;
      let newPassword = this.newPwd;
      let repeatPassword = this.repeatPwd;
      if(oldPassword.length<=0){
        Toast({
          message: '请输入原始密码！',
          position: 'center',
          duration: 500
        });
        return false;
      }
      if(newPassword.length<6){
        Toast({
          message: '请输入新密码！',
          position: 'center',
          duration: 500
        });
        return false;
      }
      if(repeatPassword.length<6){
        Toast({
          message: '请再次输入密码！',
          position: 'center',
          duration: 500
        });
        return false;
      }
      if(newPassword != repeatPassword){
        Toast({
          message: '新密码和再次输入的密码不一致！',
          position: 'center',
          duration: 500
        });
        return false;
      }
      let staffId = this.$route.query.staffId;
      let instance = Toast('提交中..');
      userInfoService.changePassword(oldPassword,newPassword,staffId).then(resp =>{
        //关闭状态
        instance.close();
        let that = this;
        if(resp.data.result){
          Toast({
            message: '密码修改成功！',
            position: 'center',
            duration: 500
          });
          setTimeout(()=>{
            this.$router.push({path:'/user',query:{staffId:staffId}})
          },500);
        }else {
          Toast({
            message: '原始密码错误，请重新输入！',
            position: 'center',
            duration: 500
          });
          return false;
        }
      })
    }
  },
  computed: {
    events: () => events,
    ...mapGetters({

    }),
    ...mapState({
      loginStatus: (state) => {
        return state.Login.loginStatus
      },
      loginStaff: (state) => {
        return state.Login.loginStaff
      }
    })
  },

  mounted: async function(){
    if (this.loginStatus == 'init') {
      let access_token = this.utils.getUrlParam('access_token');
      let refresh_token = this.utils.getUrlParam('r');
      this.findLoginStaff({access_token,refresh_token});
    }
    let that = this;
//    setTimeout(async function () {
//      var accessToken = await RNActions.getLoginToken();
//      that.findLoginStaff({'access_token':accessToken});
//    }, 500);
//    RNActions.resetHandlerTitle();
  },
  components:{headTop,footerButton},
}
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
  section{justify-content: center;width: 100%;background: #fff;display: flex;}
  section > div{padding: 15px 10px;display: flex;flex-direction:column;align-items: center}
  section > div img{width: 150px;height: 150px;border: 1px solid #eee;border-radius: 50%;}
  button{margin: 0.14rem 0 0.02rem;color: #333;  background-color: #fff;  border:1px solid #ccc;padding:0.06rem 0.12rem;font-size: 0.14rem;border-radius: 0.05rem;}
  aside{margin-top: 0.1rem;}
  li{height: 0.55rem;background: #fff;line-height:0.55rem;font-size: 0.14rem;border-bottom: 1px solid #eee;}
  li span{padding-left: 0.1rem;display: inline-block}
</style>
