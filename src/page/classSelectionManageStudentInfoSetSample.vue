<template>
    <div>
      <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" :maxDistance='200' :bottomDistance='0' ref="loadmore" :bottom-all-loaded="allLoaded">
      <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
        <span slot='title' class="user">
        {{studentName}} · 样本
      </span>
      </head-top>
      <section>
        <ul>
          <li @click="jumpCameraPage($route.query.companyId,$route.query.classId,$route.query.id)">
            <img src="../images/icon05.png" alt="">
            <span>现在拍摄</span>
          </li>
          <li @click="jumpImageChoose($route.query.companyId,$route.query.classId,$route.query.id)">
            <img src="../images/dr.jpg" alt="">
            <span>本地导入</span>
          </li>
        </ul>
      </section>
      <article class="clearfix">
        <div>已采集样本：</div>
        <ul>
          <li v-for="(picture,index) in pictureList">
            <img :src="imagePath + picture.previewImg" alt="">
          </li>
        </ul>
      </article>
      </mt-loadmore>
    </div>

</template>

<script>
  import * as RNActions from '@/utils/RNActions';
  import { mapGetters, mapActions, mapState } from 'vuex'
  import headTop from '@/components/header/headTop'
  import studentService from '@/service/StudentService'
  import { Loadmore } from 'mint-ui'


  export default {
    name: 'classSelectionMovieAcquisition',
    data () {
      return {
        pictureList:[],
        pageNum:1,
        pageSize:10,
        totalSize:0,
        allLoaded:false,
        imagePath:'http://192.168.199.144:8060/sunflower',
        studentName:''
      }
    },
    props: ['hasHome'],
    components:{headTop,Loadmore},
    methods:{
      ...mapActions([
        'findLoginStaff'
      ]),
      //影像拍摄页面
      jumpCameraPage: function(companyId,classId,studentId) {
        RNActions.sendMessage('jumpCameraPage',{companyId,classId,studentId});
      },
      jumpImageChoose: function(companyId,classId,studentId) {
        RNActions.sendMessage('jumpImageChoose',{companyId,classId,studentId});
      },
      loadBottom() {
        this.pageNum++;
        let studentId = this.$route.query.id
        let companyId = this.loginStaff.companyId;
        let classId = this.classId;
        //总条数
        let total = this.totalSize;
        //当前列表照片数量
        let pictureNum = this.pictureList.length;
        if(total<=pictureNum&&total>0){
          this.allLoaded = true;
          this.$refs.loadmore.onBottomLoaded();
          return;
        }else {
          studentService.getStudentSample(studentId,companyId,classId,this.pageNum).then(resp=>{
            let pictures = resp.data.result.rows;
            this.pictureList.push(...pictures);

          })
          setTimeout(() => {
            this.$refs.loadmore.onBottomLoaded();
          }, 300);
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
        },
        classId: state => window.localStorage.getItem('classId')
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
      let studentId = this.$route.query.id
      let companyId = this.loginStaff.companyId;
      let classId = this.classId
      studentService.getStudentSample(studentId,companyId,classId,this.pageNum).then(resp=>{
        this.totalSize = resp.data.result.total;
        this.pictureList = resp.data.result.rows;
        this.studentName = this.$route.query.name
      })
    }
  }
</script>

<style scoped>
  section {padding: 0rem 0.15rem;width: 100%}
  section li{font-size:0.16rem;border: 1px dotted #00b4ce; margin-top: 0.15rem;border-radius: 3px;background: #fff;padding: 0.1rem 0px 0.15rem;display: flex;flex-direction: column;align-items: center}
  section li:nth-child(2){border-color: #f60}
  section li:nth-child(3){border-color: #23d694}
  section li:nth-child(1) span{ color: #00b4ce;}
  section li:nth-child(2) span{ color: #f60;}
  section li:nth-child(3) span{ color: #23d694}
  img{width: 0.8rem;}
  article{background: #fff;margin-top: 0.1rem;border-top: 1px solid #dedede;padding-bottom: 0.2rem}
  article div{color: #222;line-height: 0.5rem; padding: 0px 0.1rem;}
  article li{width:50%;float: left;height: 1.8rem;overflow: hidden;padding: 1px;}
  article li img{object-fit: cover;height: 100%;width: 100%;}
</style>
