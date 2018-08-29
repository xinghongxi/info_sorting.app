<template>
  <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" ref="loadmore" bottomPullText="" :bottom-all-loaded="allLoaded">
  <div>
    <article>
      <ul>

        <li v-for="(picture,index) in pictureList">
          <img :src="imagePath + picture.previewPath" alt="">
        </li>

      </ul>
    </article>
  </div>
  </mt-loadmore>
</template>

<script>
  import * as RNActions from '@/utils/RNActions';
  import { mapGetters, mapActions, mapState } from 'vuex'
  import pictureService from '@/service/PictureService'
  import { Loadmore } from 'mint-ui'

export default {
  name: 'uploadImages',
  data () {
    return {
      imagePath:'http://192.168.199.144:8060/sunflower',
      pageNum:1,
      pageSize:10,
      totalSize:0,
      allLoaded:false,
      pictureList:[]
    }
  },
  methods: {
    ...mapActions([
      'findLoginStaff'
    ]),
    loadBottom() {
      this.pageNum = this.pageNum + 1;
      //    let staffId = this.$route.query.staffId;
      let staffId = 11837;
//      let classId = this.$route.query.classId;
      let classId = 11001;
      let totalSize = this.totalSize;
      let pictureNum = this.pictureList.length;
      //照片总条数小于等于页面图片列表总条数
      if(pictureNum>=totalSize&&totalSize != 0){
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        return
      }else{
        pictureService.uploadPictureList(staffId,classId,this.pageNum,this.pageSize).then(resp =>{
          //返回的图片列表
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


    let staffId = this.$route.query.staffId;
    let classId = this.$route.query.classId;
    await pictureService.uploadPictureList(staffId,classId,this.pageNum,this.pageSize).then(resp =>{
        //总条数
        this.totalSize = resp.data.result.total;
        this.pictureList = resp.data.result.rows;
    })
  },
  components:{Loadmore},
}
</script>

<style scoped>
  article{background: #fff;margin-top: 0.1rem;border-top: 1px solid #dedede;}
  article li{width:50%;float: left;height: 1.8rem;overflow: hidden;padding: 1px;}
  article li img{object-fit: cover;height: 100%;width: 100%;}
</style>
