<template>
  <!--<div v-if="loginStatus == 'init'">-->
    <!--正在进行安全认证，请稍后。-->
  <!--</div>-->
  <div>
    <head-top :has-home='true'>
      <span slot='title'>启蒙印象· 教师</span>
    </head-top>
    <ul class="clearfix">
      <li v-for="(module,index) in modules" :key="index">
        <router-link :to="{path:module.link, query:{module:index,staffId:loginStaff.staffId,companyId:loginStaff.companyId}}">
          <div class="module-icon" :style="module.linkCss"><i class="iconfont" v-html="module.icon"></i></div>
          <div class="module-title">{{module.title}}</div>
        </router-link>
      </li>
    </ul>
    <section v-if="dealList.length>0">
      <div class="check-accounts" @click="$router.push({path:'/account',query:{staffId:loginStaff.staffId}})">
        <span>最新分账流水</span>
        <b>查看更多</b>
      </div>
      <ol>
        <li v-for="(deal,index) in dealList">
          <div class="check-accounts">
            <span>{{deal.dealName}}</span>
            <span>¥{{deal.dealBalance |moneyFormat}}</span>
          </div>
          <div class="detail-list-time">
            {{deal.dealTime|formatDate}}
          </div>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  import headTop from '@/components/header/headTop'
  import accountService from '@/service/AccountService'
  import * as RNActions from '@/utils/RNActions';
  import {formatDate,moneyFormat} from '../utils/dataFormat.js'
  import localdb from '@/localstore'

export default {
  name: 'home',
  data () {
    return {
      modules: [
          {title: '学生管理', icon: '&#xe600;', link:'/classSelection', linkCss:'color:#fe7357'},
          {title: '日常拍摄', icon: '&#xe6ff;', link:'/classSelection', linkCss:'color:#06d17a'},
          {title: '照片分拣', icon: '&#xe6b9;', link:'/photoSorting', linkCss:'color:#ffb302'},
          {title: '影像管理', icon: '&#xe655;', link:'/classSelection', linkCss:'color:#889ffe'},
          {title: '学生订单', icon: '&#xe60d;', link:'/classSelectionStudentOrder', linkCss:'color:#8dd401'},
          {title: '我的账户', icon: '&#xe61e;', link:'/account', linkCss:'color:#ef4e80'},
          {title: '拓展学校', icon: '&#xe612;', link:'/expandSchool', linkCss:'color:#2eb1fe'},
          {title: '学校管理', icon: '&#xe7d4;', link:'/manageSchool', linkCss:'color:#ff8703'},
          {title: '我的中心', icon: '&#xe695;', link:'/user', linkCss:'color:#435d82'}
         ],
      dealList:[]
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日 hh:mm");
    },
    moneyFormat(account){
      return moneyFormat(account);
    }
  },
  methods: {
    ...mapActions([
      'findLoginStaff'
    ])
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
    //通过access_token获取用户信息之后，登陆状态仍为init，退出登陆
    if(this.loginStatus == 'init'){
      RNActions.sendMessage('removeLogin');
    }
    let staffId = this.loginStaff.staffId;
    if(this.dealList.length<=0&&typeof staffId != 'undefined'){
      //账户流水
      accountService.dealList(staffId,1,3).then(resp=>{
        let listCapitalDeal = resp.data.result.listCapitalDeal;
        if(listCapitalDeal != null){
          this.dealList = listCapitalDeal;
        }
      })
    }
  },
  updated: function() {
    if(this.dealList.length<=0){
      //账户流水
      accountService.dealList(this.loginStaff.staffId,1,3).then(resp=>{
        let listCapitalDeal = resp.data.result.listCapitalDeal;
        if(listCapitalDeal != null){
          this.dealList = listCapitalDeal;
        }
      })
    }
  },
  components:{headTop}
}
</script>

<style scoped>
  .module-title{font-size:0.14rem ;color: #333;}
  .module-icon {font-size:0.38rem}
  ul li{background: #fff;border-right: 1px solid #eee; border-bottom: 1px solid #eee;width: 33.33%;height: 1.1rem;float: left;display: flex;align-items: center;justify-content: center}
  ul li a{text-align: center}
  section{margin-top: 0.1rem;background: #fff}
  .check-accounts{font-size: 0.14rem;height: 0.5rem;line-height: 0.5rem;display: flex;justify-content: space-between;padding: 0rem 0.15rem ;}
  ol li{border-top: 1px solid #eee;}
  .check-accounts span{color: #222;}
  .check-accounts b{color: #999;}
  .detail-list-time{color: #999;font-size: 0.12rem;border-top: 1px dashed #eee;line-height: 0.4rem;margin: 0rem 0.15rem }
</style>
