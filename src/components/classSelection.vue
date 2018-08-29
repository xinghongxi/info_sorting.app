<template>

  <keep-alive v-if="$route.meta.keepAlive">
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user" v-if="goto=='班级管理'">
        班级管理
      </span>
      <span slot='title' class="user" v-else>
        选择班级
      </span>
      <span slot='add' @click="$router.push('/classSelectionManageAdd')" v-if="goto=='班级管理'">
        <i class="iconfont add">&#xe603;</i>
      </span>
    </head-top>
    <section>
      <ul>
        <li v-for="(detail,index) in classList">
          <div v-if="goto==3">
            <a @click="jumpNotUploadImagePage($route.query.companyId,detail.id,'init')">
              <span>{{detail.name}}</span>
              <i class="iconfont">&#xe607;</i>
            </a>
          </div>
          <div v-else>
            <router-link :to="{path:`${todo}`,query:{staffId:$route.query.staffId,companyId:$route.query.companyId,classId:detail.id,index:index}}" >
              <span>{{detail.name}}</span>
              <i class="iconfont">&#xe607;</i>
            </router-link>
          </div>
        </li>
      </ul>
    </section>
  </div>
  </keep-alive>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  import headTop from '@/components/header/headTop'
  import * as RNActions from  '@/utils/RNActions'


export default {
  name: '',
  data () {
    return {
      goto:'',
      todo:''
    }
  },
  props: ['module'],
  components:{headTop},
  methods: {
    ...mapActions([
      'findLoginStaff','getClassInfo'
    ]),
    async getClassInfoAsync(schoolId){
      await this.getClassInfo(schoolId)
    },
    jumpPage(){
        try
        {
          if(this.goto==0)  throw "/classSelectionManage";
          if(this.goto==1)  throw "/classSelectionMovieAcquisition";
          if(this.goto==3)  throw "/classSelectionMoveManageUpload";
          if(this.goto=='班级管理')  throw "/manageSchoolClass";
        }
        catch(e)
        {
          return e
        }
    },
    jumpNotUploadImagePage:function (companyId,classId,status) {
      RNActions.sendMessage('jumpNotUploadImagePage',{companyId,classId,status});
    }
  },
  computed: {
    ...mapState({
      loginStatus: (state) => {
        return state.Login.loginStatus
      },
      loginStaff: (state) => {
        return state.Login.loginStaff
      },
      classList:(state) => {
        return state.Class.classList
      }
    })
  },

  mounted(){
      //页面跳转判断
      this.goto = this.$route.query.module;
      this.todo = this.jumpPage();
      //获取当前登陆人信息
      if (this.loginStatus == 'init') {
        let access_token = this.utils.getUrlParam('access_token');
        let refresh_token = this.utils.getUrlParam('r');
        this.findLoginStaff({access_token, refresh_token});
      }
//    setTimeout(async function () {
//      var accessToken = await RNActions.getLoginToken();
//      that.findLoginStaff({'access_token':accessToken});
//    }, 500);
//    RNActions.resetHandlerTitle();
      //账户流水
  },
  created: function () {
      if(this.loginStaff.companyId){
        window.localStorage.setItem('companyId',this.loginStaff.companyId)
      }
      let schoolId = window.localStorage.getItem('companyId')
      this.getClassInfoAsync(schoolId);
  }
}
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
  li{color: #333;line-height: 0.5rem;background: #fff;border-bottom: 1px solid #eee;}
  li span{color: #333}
  a{display: flex;justify-content: space-between;padding: 0px 0.1rem;}
</style>
