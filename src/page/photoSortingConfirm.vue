<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
          {{studentName}}
      </span>
    </head-top>
    <section v-if="samplePhotos.length>0">
      <swiper :options="swiperOption" ref="mySwiper" >
        <swiper-slide v-for="(item,index) in samplePhotos" :key="index" :name="item.name" ref="current">
          <div class="box">
            <img :src="imagePath + item.img" />
          </div>
        </swiper-slide>
      </swiper>
    </section>
    <article>
      <div class="img" v-if="untReatedImgs[0]">
        <span>{{untReatedImgs[0].mediaDate | formatDate}}</span>
        <span @click="passtodo(untReatedImgs[0].studentFeedId)"><i class="fa fa-close"></i></span>
        <ImageBox :img-src="imagePath+untReatedImgs[0].previewPath"
                  :img-width="untReatedImgs[0].width"
                  :img-height="untReatedImgs[0].height"
                  :annotate="untReatedImgs[0].location"
                  :key="untReatedImgs[0].feedId"
        ></ImageBox>
        <button @click="confirm(untReatedImgs[0].studentFeedId,untReatedImgs[0].studentId)">确定</button>
        <b>{{unsortednumber._unsortednumber}}/{{unsortednumber.totalUnsortednumber}}</b>
      </div>
    </article>
  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import classService from '@/service/ClassService'
  import { mapMutations, mapActions, mapState } from 'vuex';
  import {formatDate} from '@/commonStyle/formatDate'
  import ImageBox from '@/components/ImageBox';
  import Vue from 'vue'


export default {
  name: 'photoSorting',
  data () {
    return {
      swiperOption: {
        // 所有配置均为可选（同Swiper配置）
        initialSlide: 0,
        pagination: {
          el: '.swiper-pagination'
        },
        loop: false,
        notNextTick: true,
        speed: 200,
        direction: 'horizontal',
        paginationClickable: true,
        mousewheelControl: true,
        autoplay: false,
        autoplayDisableOnInteraction: false,
        observer: true,
        observeParents: true,
        debugger: true,
        on: {
          slideChangeTransitionEnd: swiper => {
            let swipers = this.$refs.mySwiper.swiper
            this.studentName = this.samplePhotos[swipers.activeIndex].name;
            this.studentId = this.samplePhotos[swipers.activeIndex].id;
          }
        }
      },
      pageNum:1,
      studentName:'',
      imagePath:'http://192.168.199.144:8060/sunflower',
      total:0,
      time:'',
      location:[],
      studentId:'',
      staffId:'',
      classId:'',
      schoolId:'',
      unsortednumber:{
          totalUnsortednumber:'',
          _unsortednumber:''
      }
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy/MM/dd  hh:mm");
    }
  },
  methods: {
    ...mapActions([
      'samplePhoto','untReatedImg','confirmImg','passtodoImg'
    ]),
    ...mapMutations([
      'GET_NEW_DATA','HAS_GET_UNTREATEDIMG','CLEAR_UNTREATED_IMGS'
    ]),
    async confirm(studentFeedId,studentId){  //确认照片
      await this.commonMethod(); //获取下一页数据
      await this.confirmImg({'studentFeedId':studentFeedId,'staffId':this.staffId,'studentId':studentId}); //执行样本重新排序 和 删除该条数据
      await this.screen()
    },
    async passtodo(studentFeedId){  //删除照片
      await this.commonMethod(); //获取下一页数据
      await this.passtodoImg(studentFeedId)
      await this.screen()
    },
    commonMethod(){
      if(this.untReatedImgs.length < 7 && this.hasNextPage){  //如果获取到待分拣照片>=10张 且 当前待分拣照片<6张 就 获取下一页数据  && this.hasNextPage
        this.untReatedImg({'schoolId':this.schoolId,'classId':this.classId,'staffId':this.staffId});
      }
    },
    screen(){
      if(this.samplePhotos.length>0 && this.$refs.mySwiper){
        this.$refs.mySwiper.swiper.activeIndex = 0;
        this.studentName = this.samplePhotos[0].name;
        this.studentId = this.samplePhotos[0].id;
        this.GET_NEW_DATA();
      }
      if(this.statu){
        --this.unsortednumber._unsortednumber
      }
    },
    getName(){
      if(this.samplePhotos[0]){
        this.studentName = this.samplePhotos[0].name
      }
    }
  },
  computed: {
    ...mapState({
      companyId: state => window.localStorage.getItem('loginCompanyId'),
      samplePhotos: state => state.Class.afterSamplePhotos,
      untReatedImgs: state => state.Class.untReatedImgs,
      count: state => state.Class.count,
      hasNextPage: state => state.Class.hasNextPage,
      statu:state => state.Class.statu
    }),
  },
  components:{headTop,swiper,swiperSlide,ImageBox},
  created:async function () {
    this.staffId = this.$route.query.staffId;
    this.classId = this.$route.query.classId;
    Vue.set(this.unsortednumber,'totalUnsortednumber',this.$route.query.unsortednumber);
    Vue.set(this.unsortednumber,'_unsortednumber',this.$route.query.unsortednumber);
    this.schoolId = this.companyId;
    await this.samplePhoto({'schoolId':this.schoolId,'classId':this.classId});
    if(this.untReatedImgs.length == 0){
      await this.untReatedImg({'schoolId':this.schoolId,'classId':this.classId,'staffId':this.staffId});
    }
    await this.GET_NEW_DATA();
    await this.getName()
  },
  watch:{
    classId:{
      handler(newName, oldName) {
        this.CLEAR_UNTREATED_IMGS()
      },
      immediate: true
    },
    samplePhotos:{
      handler(newName, oldName) {
        this.getName()
      },
      immediate: true,
      deep:true
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
  .head{background: rgba(255,255,255,.5) !important;}
  i{ color: #000;font-size: 0.26rem;font-weight: bold;}
  .user{color: #000;font-weight: bold;font-size: 0.18rem;}
  section{position: relative;top: -0.5rem;z-index: 0}
  section .box{margin: 0 0.1rem 0.1rem;height:1.9rem;box-shadow: 0px 2px 5px rgba(0,0,0,0.3);border-radius: 5px;overflow: hidden}
  img{object-fit: cover;width: 100%;height: 100%;}
  article{position: relative;display: block;margin-top: -0.44rem;}
  article .img{position: absolute;padding: 0px 0.1rem ;width: 100%}
  article span:nth-child(1){position: absolute;top: 0px;  left: 0.25rem;  line-height:0.3rem;  color: red;  text-shadow: 0 0 1px rgba(0,0,0,0.3);}
  article span:nth-child(2) i{color: #fff ;font-weight: 100}
  article span:nth-child(2){z-index: 200;text-align: center;position: absolute;top: 0px;  right: 0.1rem;color: #fff;width: 0.3rem ;height: 0.3rem;  background: rgba(0, 0, 0,0.3) none repeat scroll 0 0 ;}
  button{position: absolute;left: 50%;transform: translateX(-50%);bottom: 0.2rem;padding: 0.04rem 0.3rem}
  b{color: #fff;font-size: 0.12rem;position: absolute;bottom: 0.22rem;right:0.25rem;font-weight: bold;text-shadow: 0px 0px 2px rgba(0,0,0,0.8);}

</style>
