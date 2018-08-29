<template>
  <div>
    <head-top class="head">
        <span slot='return' @click="$router.back()">
          <i class="iconfont return">&#xe60e;</i>
        </span>
      <span slot='title' class="user">
          学生订单
        </span>
    </head-top>
    <aside>
      <ul>
        <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" ref="loadmore" bottomPullText="" :bottom-all-loaded="allLoaded">
        <li v-for="(order,index) in orderList">
          <article>
            <span> {{order.sn}}</span>
            <span>{{order.orderTime|formatDate}}</span>
          </article>
          <section>
            <div>
              <table width="100%">
                <tbody>
                <tr>
                  <td width="75px" align="right">购买人：</td>
                  <td>{{order.consumername}}</td>
                </tr>
                <tr>
                  <td width="75px" align="right">学生名：</td>
                  <td>{{order.studentName}}</td>
                </tr>
                <tr>
                  <td width="75px" align="right">订单状态：</td>
                  <td>已完成</td>
                </tr>
                <tr>
                  <td width="75px" align="right">总金额：</td>
                  <td><span style="color: red">{{order.totalAmount|moneyFormat}}</span></td>
                </tr>
                <tr>
                  <td width="75px" align="right">分账金额：</td>
                  <td><span style="color: red">{{order.accountAmount|moneyFormat}}</span></td>
                </tr>
                <tr>
                  <td width="75px" align="right" style="vertical-align: top">购买详情：</td>
                  <td>
                    <div class="order-goods" v-for="(goods,index) in order.goodsList">{{goods.categoryName}}<div class="pull-right">× {{goods.goodsNum}}</div></div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </section>
        </li>
        </mt-loadmore>
      </ul>
    </aside>
  </div>

</template>

<script>
  import headTop from '@/components/header/headTop'
  import * as RNActions from '@/utils/RNActions';
  import { mapGetters, mapActions, mapState } from 'vuex';
  import {formatDate,moneyFormat} from '../utils/dataFormat.js';
  import orderService from '@/service/OrderService'
  import { Loadmore } from 'mint-ui'
export default {
  name: 'userPassword',
  data () {
    return {
      pageNum:1,
      pageSize:2,
      totalSize:0,
      orderList:[],
      allLoaded:false
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd- hh:mm");
    },
    moneyFormat(account){
      return moneyFormat(account);
    }
  },
  components:{headTop,Loadmore},
  methods:{
    ...mapActions([
      'findLoginStaff'
    ]),
    loadBottom:async function () {
      let total = this.totalSize;
      let orderNum = this.orderList.length;
      this.pageNum = this.pageNum + 1;
      if(total>orderNum){
        let staffId = this.$route.query.staffId;
        await orderService.orderList(staffId,this.pageNum,this.pageSize).then(resp =>{
          let orders = resp.data.result.orderInfoList;
          this.orderList.push(...orders);
        })
        setTimeout(() => {
          this.$refs.loadmore.onBottomLoaded();
        }, 300);
      }else {
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        return
      }
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

    let staffId = that.$route.query.staffId;
    await orderService.orderList(staffId,that.pageNum,that.pageSize).then(resp =>{
      that.totalSize = resp.data.result.total;
      that.orderList = resp.data.result.orderInfoList;
    })
  },
}
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
  aside{margin-top: 0.1rem;}
  ul{font-size: 0.14rem;}
  li{margin-bottom: 0.1rem;background: #fff}
  li article{display: flex;justify-content: space-between;padding:0 0.1rem;height:0.4rem;line-height:0.4rem;border-bottom: 1px solid #eee;}
  li article span:nth-child(1){display: inline-block}
  li article span:nth-child(2){font-size: 0.12rem;color: #999;}
  tr td{line-height:0.26rem;}
  li section{padding: 10px;  border-bottom: 1px solid #dedede;}
  .order-goods {
    background: #f5f5f5;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 1px 0px;
    padding: 0px 5px;
    font-size: 12px;
  }


</style>
