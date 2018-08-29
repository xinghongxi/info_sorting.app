<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        影像管理
      </span>
    </head-top>
    <section>
      <ul>
        <li>
          <a @click="jumpNotUploadImagePage($route.query.companyId,$route.query.classId,'init')">
            <span>未上传的</span>
            <i class="iconfont">&#xe607;</i>
          </a>
        </li>
        <li>
          <router-link :to="{path:'/classSelectionMoveManageUpload' , query:{title:'已上传的',staffId:$route.query.staffId,classId:$route.query.classId}} ">
            <span>已上传的</span>
            <i class="iconfont">&#xe607;</i>
          </router-link>
        </li>
        <li>
          <a @click="jumpNotUploadImagePage($route.query.companyId,$route.query.classId,'uploaded_fail')">
            <span>上传失败的</span>
            <i class="iconfont">&#xe607;</i>
          </a>
        </li>
      </ul>
    </section>

  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import { mapGetters, mapActions, mapState } from 'vuex'
  import * as RNActions from  '@/utils/RNActions'

export default {
  name: 'classSelection',
  data () {
    return {

    }
  },
  methods: {
    ...mapActions([
      'findLoginStaff'
    ]),
    jumpNotUploadImagePage:function (companyId,classId,status) {
      RNActions.sendMessage('jumpNotUploadImagePage',{companyId,classId,status});
    }
  },
  computed: {
    events: () => events,
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
  components:{headTop},
}
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
  li{color: #333;line-height: 0.5rem;background: #fff;border-bottom: 1px solid #eee;}
  li span{color: #333}
  a{display: flex;justify-content: space-between;padding: 0px 0.1rem;}
</style>
