<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        我的中心
      </span>
    </head-top>
    <section>
      <div>
        <img src="../images/user-header.png" alt="" />
      </div>
        <ul>
          <li v-if="userInfo.img != null&&userInfo.img != ''"><img :src="imagePath + userInfo.img"></li>
          <li v-else=""><img src="../images/pg.jpg"></li>
          <li v-if="userInfo.nickname != null&&userInfo.nickname != ''">{{userInfo.nickname}}</li>
          <li v-else="">佚名</li>
        </ul>
    </section>
    <aside>
       <ol>
         <li>
           <router-link :to="{path:'userSet',query:{staffId:this.$route.query.staffId}}" >
             <div>
               <i class="iconfont">&#xe63f;</i>
               <span>用户信息</span>
             </div>
             <div><i class="iconfont">&#xe607;</i></div>
           </router-link>
         </li>
         <li>
           <router-link :to="{path:'userPassword',query:{staffId:this.$route.query.staffId}}" >
             <div>
               <i class="iconfont">&#xe628;</i>
               <span>修改密码</span>
             </div>
             <div><i class="iconfont">&#xe607;</i></div>
           </router-link>
         </li>
         <li>
           <a  @click="removeLogin">
             <div>
               <i class="iconfont">&#xe627;</i>
               <span>退出登录</span>
             </div>
             <div><i class="iconfont">&#xe607;</i></div>
           </a>
         </li>
       </ol>
    </aside>
  </div>
</template>

<script>
  import * as RNActions from '@/utils/RNActions';
  import userInfoService from '@/service/UserInfoService';
  import { mapGetters, mapActions, mapState } from 'vuex'
  import headTop from '@/components/header/headTop'

export default {
  name: 'user',
  data () {
    return {
      imagePath:'http://192.168.199.144:8060/sunflower',
      userInfo:''
    }
  },
  components:{headTop},
  methods:{
    ...mapActions([
      'findLoginStaff'
    ]),
    removeLogin: function() {
      RNActions.sendMessage('removeLogin');
    },
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

    let staffId = that.$route.query.staffId;
    await userInfoService.staffInfo(staffId).then(resp =>{
      that.userInfo = resp.data.result;
    })
  },
}
</script>

<style scoped>
  section{position: relative;}
  section ul{position: absolute;top:50%;left: 50%;transform:translate(-50%,-46%);}
  section div {background: #061502;height: 200px;}
  section div img{width: auto;height: 100%}
  section ul{display: flex;flex-direction:column;font-size: 0.16rem;color: #fff;align-items: center;line-height: 0.34rem}
  section ul li:first-child{width: 0.65rem;height: 0.65rem;border-radius: 100%;background: #fff;overflow: hidden;position: relative;border: 2px solid #fff}
  section ul li img{width: 100%;height: 100%;position: absolute;border-radius: 100%;}
  aside{background: #fff;margin-top:0.1rem;font-size: 0.14rem;}
  aside li a{line-height: 0.5rem;border-bottom: 1px solid #eee;color: #333;padding: 0px 0.1rem;display: flex;justify-content: space-between}
  aside li div{display: flex;align-items: center}
  aside li div:first-child i{margin-right: 0.1rem;font-size:0.22rem;}
  aside li div:last-child i{font-size:0.17rem;}
</style>
