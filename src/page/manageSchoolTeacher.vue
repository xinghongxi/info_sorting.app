<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        老师管理
      </span>
      <span slot='add' @click="$router.push({path:'/manageSchoolTeacherAdd',query:{companyId:$route.query.companyId}})">
        <i class="iconfont add">&#xe603;</i>
      </span>
    </head-top>
    <aside>
      <ol>
        <li @click="$router.push({path:'/manageSchoolTeacherAdd',query:{teacherId:teacher.id,companyId:$route.query.companyId}})" v-for="(teacher,index) in teacherList">
          <div>
            <img :src="imagePath +teacher.img">
            <span>{{teacher.staffName}}</span>
          </div>
          <div><i class="iconfont">&#xe607;</i></div>
        </li>
      </ol>
    </aside>
  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import footerButton from '@/components/footer/footerButton'
  import { mapGetters, mapActions, mapState } from 'vuex'
  import * as RNActions from  '@/utils/RNActions'
  import schoolService from  '@/service/SchoolService'

export default {
  name: 'user',
  data () {
    return {
      imagePath:'http://192.168.199.144:8060/sunflower',
      teacherList:[]
    }
  },
  methods: {
    ...mapActions([
      'findLoginStaff'
    ]),
    jumpNotUploadImagePage:function () {
      RNActions.sendMessage('jumpNotUploadImagePage');
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
    let companyId = that.$route.query.companyId;
    await schoolService.teacherList(companyId).then(resp =>{
        that.teacherList = resp.data.result.teacherList;
    })
  },
  props: ['hasHome'],
  components:{headTop,footerButton},
}
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
  aside{background: #fff;font-size: 0.14rem;}
  aside li{line-height: 0.5rem;border-bottom: 1px solid #eee;color: #333;padding: 0px 0.1rem;display: flex;align-items: center;justify-content: space-between}
  input{height: 0.34rem; line-height: 0.34rem;padding-right: 0.1rem;flex: 1;}
  img{width:0.3rem; height: 0.3rem; border-radius: 50%; margin-right: 0.05rem;}
  li div{display: flex;align-items: center}
</style>
