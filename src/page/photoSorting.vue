<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        照片分拣
      </span>
    </head-top>
    <section>
      <ul v-if="classList.length>0" class="ul1">
        <li v-for="(detail,index) in classList">
          <router-link :to="{path:'photoSortingConfirm',query:{staffId:$route.query.staffId,classId:detail.classId,unsortednumber:detail.unsortednumber}}">
            <div>
              <span>{{detail.className}}</span>
              <span>已分拣：{{detail.sortednumber}} 未分拣：<b>{{detail.unsortednumber}}</b></span>
            </div>
            <i class="iconfont">&#xe607;</i>
          </router-link>
        </li>
      </ul>
      <ul v-else class="cue" >
        <img src="../commonStyle/icon/empty.svg" alt="" >
        <span>您尚未添加班级</span>
      </ul>
    </section>
  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import * as RNActions from '@/utils/RNActions';
  import { mapGetters, mapActions, mapState } from 'vuex';
  import classService from '@/service/ClassService'

export default {
  name: 'photoSorting',
  data () {
    return {
      classList:[]
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
  },
  created:function () {
    let staffId = this.$route.query.staffId;
     classService.sortClassList(staffId).then(resp =>{
      this.classList = resp.data.result.classList;
    })
  }
}
</script>

<style scoped>
.head{border-bottom: 1px solid #eee;}
.ul1{background: #fff;}
a{display: flex;justify-content: space-between;align-items: center;padding: 0px 0.1rem;border-bottom: 1px dotted #ccc;}
  li div{display: flex;flex-direction: column;font-size:0.12rem;}
  li div span:nth-child(1){color: #222;line-height: 0.3rem}
  li div span:nth-child(2){color: #999;line-height: 0.14rem;padding-bottom: 0.08rem  }
  span b{color: #f60;font-size:0.12rem;}
.cue{font-size: 0.12rem;color: #aaa;padding: 0.3rem 0;display: flex;flex-direction: column;align-items: center}
.cue img{width:0.7rem;margin-bottom: 0.06rem;}
</style>
