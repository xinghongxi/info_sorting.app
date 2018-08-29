<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        分账管理
      </span>
    </head-top>
    <section>
      <div>
        <div>账户余额（元）</div>
        <div>{{accountBalance|moneyFormat}}</div>
      </div>
    </section>
    <div class="cue" v-if="dealList.length <= 0">
      <img src="../commonStyle/icon/empty.svg" alt="" >
      <span>当前无分账流水信息</span>
    </div>
    <article v-else>
      <ol>
        <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" ref="loadmore" bottomPullText="" :bottom-all-loaded="allLoaded">
        <li v-for="(deal,index) in dealList">
          <div class="check-accounts">
            <span>{{deal.dealName}}</span>
            <span>¥{{deal.dealBalance|moneyFormat}}</span>
          </div>
          <div class="detail-list-time">
            {{deal.dealTime|formatDate}}
          </div>
        </li>
        </mt-loadmore>
      </ol>
    </article>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  import headTop from '@/components/header/headTop'
  import {formatDate,moneyFormat} from '../utils/dataFormat.js'
  import accountService from '@/service/AccountService'

export default {
  name: 'user',
  data () {
    return {
      accountBalance: 0,
      dealList:[],
      pageNum:1,
      pageSize:20,
      totalSize:0,
      allLoaded:false
    }
  },
  props: ['hasHome'],
  components:{headTop},
  methods: {
    ...mapActions([
      'findLoginStaff'
    ]),
    loadBottom() {
      let staffId = that.$route.query.staffId;
//      let staffId = 10003;
      let total = this.totalSize;
      let dealNum = this.dealList.length;
      this.pageNum = this.pageNum + 1;
      if(total>dealNum){
        accountService.dealList(staffId,this.pageNum,this.pageSize).then(resp=>{
          let listCapitalDeal = resp.data.result.listCapitalDeal;
          if(listCapitalDeal != null){
            this.dealList.push(...listCapitalDeal);
          }
          setTimeout(() => {
            this.$refs.loadmore.onBottomLoaded();
          }, 300);
        })
      }else {
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        return;
      }
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
    //账户余额
    let staffId = that.$route.query.staffId;
//    let staffId = 10003;
    await accountService.accountBlance(staffId).then(resp=>{
      let capitalAccount = resp.data.result.capitalAccount;
      if(capitalAccount == null){
        this.accountBalance = 0;
      }else {
        this.accountBalance = capitalAccount.balance;
      }
    })
    let pageNum = that.pageNum;
    let pageSize = that.pageSize;
    //账户流水
    await accountService.dealList(staffId,pageNum,pageSize).then(resp=>{
      let listCapitalDeal = resp.data.result.listCapitalDeal;
      this.totalSize = resp.data.result.total;
      if(listCapitalDeal != null){
        this.dealList = listCapitalDeal;
      }
    })
  },
}
</script>

<style scoped>
section > div {background: #ff8f00;color: #fff; padding: 0.2rem 0.1rem; }
section div:nth-child(1){font-size: 0.14rem;}
section div:nth-child(2){font-family: arial; font-size: 0.44rem; margin-top:0.1rem;line-height: 0.66rem}

article{background: #fff}
.check-accounts{font-size: 0.14rem;height: 0.5rem;line-height: 0.5rem;display: flex;justify-content: space-between;padding: 0rem 0.15rem ;}
li{border-top: 1px solid #eee;}
li:first-child{border: none}
.check-accounts span{color: #222;}
.check-accounts b{color: #999;}
.detail-list-time{color: #999;font-size: 0.12rem;border-top: 1px dashed #eee;line-height: 0.4rem;margin: 0rem 0.15rem }
.cue{letter-spacing:0.02rem;font-size: 0.13rem;color: #aaa;padding: 0.3rem 0;display: flex;flex-direction: column;align-items: center}
 .cue img{width:0.7rem;margin-bottom: 0.06rem;}
</style>
