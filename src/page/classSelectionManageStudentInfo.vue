<template>
  <div>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :maxDistance='200' :bottomDistance='0' ref="loadmore" >

    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
          {{info.name}}
      </span>
    </head-top>
    <section>
      <ol>
        <li>
          <div>
            <img v-if="info.img" :src="imagePath + info.img" alt="">
            <img src="../images/user.png" alt="" v-else />
          </div>
        </li>
        <li>
          <span>{{info.name}} · <span v-if="info.genderName">{{info.genderName}} · </span><b>家长填写</b></span>
        </li>
        <li>
          <span>生日：<i ref="iTime">{{time | formatDate}}</i> | 电话：{{info.phone}}</span>
        </li>
        <li>
          <router-link :to="{path:'/classSelectionManageStudentInfoSet',query:{id:studentId,name:info.name,genderName:info.genderItemVid,birthDate:iTime,phone:info.phone}}" :has-home='false'>
            <span>设置</span>
          </router-link>
        </li>
      </ol>
      <aside @click="gotoSample($route.query.companyId,$route.query.classId,info.id)">
          <span>样本管理</span>
          <i class="iconfont">&#xe607;</i>
      </aside>
    </section>
    <article>
      <div>{{info.name}}影像：</div>
      <ul class="clearfix">
        <li v-for="(picture,index) in pictureList">
          <img :src="imagePath + picture.previewPath" alt="">
        </li>
      </ul>
    </article>
    </mt-loadmore>
  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import { mapActions, mapState } from 'vuex'
  import studentService from '@/service/StudentService'
  import {formatDate} from '@/commonStyle/formatDate'

export default {
  name: 'user',
  data () {
    return {
        info:{},
        pageNum:1,
        pageSize:10,
        totalSize:0,
        allLoaded:false,
        imagePath:'http://192.168.199.144:8060/sunflower',
        studentImg:{},
        pictureList:[],
        studentId:'',
        filterBirthDate:'',
        time:'',
        iTime:''

    }
  },
  filters: {
    formatDate(time) {
        if(time != null){
          var date = new Date(time);
          return formatDate(date, "yyyy年MM月dd日");
        }else {
          return "暂未设置";
        }
    }
  },
  props: ['hasHome'],
  methods:{
    loadBottom() {
      this.pageNum++;
      let id = this.$route.query.id
      //总条数
      let total = this.totalSize;
      //当前列表照片数量
      let pictureNum = this.pictureList.length;
      if(total<=pictureNum&&total>0){
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        return;
      }else {
        studentService.getStudentImg(id,this.pageNum).then(resp=>{   //获取学生详情
          let pictures = resp.data.result.rows;
          this.pictureList.push(...pictures);
        })
        setTimeout(() => {
          this.$refs.loadmore.onBottomLoaded();
        }, 300);
      }
    },
    gotoSample(companyId,classId,id){
        this.$router.push({path:'/classSelectionManageStudentInfoSetSample',query:{companyId:companyId,classId:classId,id:id,name:this.info.name}})
    }
  },
  computed: {
    ...mapState({
      studentList: state => state.Student.studentList,
    })
  },
  components:{headTop},
  created:function () {
    this.studentId= this.$route.query.id;
    studentService.getStudentInfo(this.studentId).then(resp=>{   //获取学生详情
      this.info = resp.data.result.student;
      console.warn(this.info)
      this.time = this.info.birthDate;

    });
    studentService.getStudentImg(this.studentId,this.pageNum).then(resp=>{   //获取影像
      this.totalSize = resp.data.result.total;
      this.pictureList = resp.data.result.rows;
    });
  },
  updated: function () {
    let birthday = this.$refs.iTime.innerHTML;
    if(birthday == "暂未设置"){
      this.iTime = "";
    }else {
      this.iTime = this.$refs.iTime.innerHTML.replace('年','-').replace('月','-').replace('日','')
    }
  },
}
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
  section{position: relative;background: #fff;padding: 0.15rem 0px 0;}
  section div{border-radius:100%;overflow: hidden;background: #fff;width: 0.8rem;height: 0.8rem}
  section img{object-fit:cover;width: 100%}
  ol li{display: flex;justify-content: center}
  ol li:nth-child(2){margin-top:0.15rem; }
  ol li:nth-child(3){color: #999;  margin-top: 0.1rem;font-size: 0.12rem;}
  ol li:last-child{height: 0.25rem; color: #428bca;width: 0.4rem;border: 1px solid #dedede;text-align: center;line-height:0.23rem;border-radius: 2px;position: absolute;top:0.1rem;right: 0.1rem;}
  article{background: #fff;margin-top: 0.1rem;border-top: 1px solid #dedede;}
  article div{color: #222;line-height: 0.5rem; padding: 0px 0.1rem;}
  article li{width:50%;float: left;height: 1.8rem;overflow: hidden;padding: 1px;}
  article li img{object-fit: cover;height: 100%;width: 100%;}
  b{color: #f60}
  a span{color:#428bca}
  ul{padding-bottom: 0.3rem}
  aside {display: flex;justify-content: space-between;width: 100%;padding: 0 0.1rem ; margin-top: 0.22rem;line-height: 0.5rem; border-top: 1px solid #eee;;border-bottom: 1px solid #eee;}
</style>
