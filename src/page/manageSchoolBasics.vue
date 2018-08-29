<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        学校管理
      </span>
    </head-top>
    <aside>
      <ol>
        <li>
              <span>学校名称：</span>
              <input type="text" v-model="schoolName">
        </li>
        <li>
              <span>所属公司：</span>
              <input type="text" :value="schoolInfo.parentName" disabled>
        </li>
        <li>
              <span>所属区域：</span>
              <input type="text" :value="schoolInfo.districtName" disabled>
        </li>
        <li>
              <span>详细地址：</span>
              <input type="text" :value="schoolInfo.address" disabled>
        </li>
        <li>
              <span>联系人员：</span>
              <input type="text" v-model="staffName">
        </li>
        <li>
              <span>联系电话：</span>
              <input type="text" v-model="phone">
        </li>
      </ol>
    </aside>
    <div  @click="editSchoolInfo">
      <footer-button>
      <span slot='buttonText'>
        <i class="fa fa-save"></i>
        确定保存
      </span>
      </footer-button>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import footerButton from '@/components/footer/footerButton'
  import { mapGetters, mapActions, mapState } from 'vuex'
  import schoolService from '@/service/SchoolService'
  import {Toast} from 'mint-ui'

export default {
  name: 'user',
  data () {
    return {
      schoolName:'',
      staffName:'',
      phone:'',
      schoolInfo:''
    }
  },
  props: ['hasHome'],
  components:{headTop,footerButton},
  methods:{
    ...mapActions([
      'findLoginStaff'
    ]),
    editSchoolInfo:function () {
      let companyId = this.$route.query.companyId;
      let staffId =this.$route.query.staffId;
      let phone = this.phone;
      if(phone == null||phone.length<11){
        Toast({
          message: '联系电话错误，请重新输入！',
          position: 'center',
          duration: 1000
        });
        return;
      }
      schoolService.editSchoolInfo(companyId,this.schoolName,this.staffName,this.phone).then(resp =>{
          let result = resp.data.result.editNum;
          if(result>0){
            Toast({
              message: '学校信息修改成功！',
              position: 'center',
              duration: 500
            });
            setTimeout(()=>{
              this.$router.push({path:'/manageSchool',query:{staffId:staffId,companyId:companyId}})
            },500);
          }else {
            Toast({
              message: '学校信息修改失败！',
              position: 'center',
              duration: 1000
            });
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

  mounted: async function() {
    if (this.loginStatus == 'init') {
      let access_token = this.utils.getUrlParam('access_token');
      let refresh_token = this.utils.getUrlParam('r');
      this.findLoginStaff({access_token, refresh_token});
    }
    let that = this;
//    setTimeout(async function () {
//      var accessToken = await RNActions.getLoginToken();
//      that.findLoginStaff({'access_token':accessToken});
//    }, 500);
//    RNActions.resetHandlerTitle();

    let companyId = that.$route.query.companyId;
    await schoolService.schoolInfo(companyId).then(resp => {
      that.schoolInfo = resp.data.result.company;
      that.schoolName = that.schoolInfo.name;
      that.staffName = that.schoolInfo.staffName;
      that.phone = that.schoolInfo.phone;
    })
  }
}
</script>

<style scoped>
  aside{background: #fff;margin-top:0.1rem;font-size: 0.14rem;}
  aside li{line-height: 0.5rem;border-bottom: 1px solid #eee;color: #333;padding: 0px 0.1rem;display: flex;align-items: center}
  input{height: 0.34rem; line-height: 0.34rem;padding-right: 0.1rem;flex: 1;}
</style>
