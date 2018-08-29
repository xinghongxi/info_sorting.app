<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        影像采集
      </span>
    </head-top>
    <section>
      <ul>
        <li @click="jumpCameraPage($route.query.companyId,$route.query.classId)">
          <img src="../images/icon05.png" alt="">
          <span>影像拍摄</span>
        </li>
        <li @click="jumpImageChoose($route.query.companyId,$route.query.classId)">
          <img src="../images/dr.jpg" alt="">
          <span>本地导入</span>
        </li>
        <li @click="$router.push({path:'/classSelectionMoveManage',query:{companyId:$route.query.companyId,classId:$route.query.classId,staffId:$route.query.staffId}})">
          <img src="../images/sh.jpg" alt="">
          <span>上传管理</span>
        </li>
      </ul>
    </section>


  </div>
</template>

<script>
  import * as RNActions from '@/utils/RNActions';
  import { mapGetters, mapActions, mapState } from 'vuex'
  import headTop from '@/components/header/headTop'


  export default {
    name: 'classSelectionMovieAcquisition',
    data () {
      return {

      }
    },
    props: ['hasHome'],
    components:{headTop},
    mounted(){
    },
    methods:{
      ...mapActions([
        'findLoginStaff'
      ]),
      //影像拍摄页面
      jumpCameraPage: function(companyId,classId) {
        RNActions.sendMessage('jumpCameraPage',{companyId,classId});
      },
      //选择本地照片页面
      jumpImageChoose: function(companyId,classId) {
        RNActions.sendMessage('jumpImageChoose',{companyId,classId});
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
    },
  }
</script>

<style scoped>
  section {padding: 0rem 0.15rem;width: 100%}
  li{font-size:0.16rem;border: 1px dotted #00b4ce; margin-top: 0.15rem;border-radius: 3px;background: #fff;padding: 0.1rem 0px 0.15rem;display: flex;flex-direction: column;align-items: center}
  li:nth-child(2){border-color: #f60}
  li:nth-child(3){border-color: #23d694}
  li:nth-child(1) span{ color: #00b4ce;}
  li:nth-child(2) span{ color: #f60;}
  li:nth-child(3) span{ color: #23d694}
  img{width: 0.8rem;}
</style>
