<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        <b v-if="studentInfo.studentInfo">{{studentInfo.studentInfo.name}}</b> 信息
      </span>
    </head-top>
    <section>
      <ul>
        <li>
            <span v-if="studentInfo.studentInfo">学生姓名：{{studentInfo.studentInfo.name}}</span>
        </li>
        <li>
          <span v-if="studentInfo.studentInfo">学生性别：{{studentInfo.studentInfo.sex}}生</span>
        </li>
        <li>
          <span v-if="studentInfo.studentInfo">出生日期：{{studentInfo.studentInfo.birthday | formatDate}}</span>
        </li>
        <li>
          <span v-if="studentInfo.studentInfo">联系人员：{{studentInfo.studentInfo.staffName}}</span>
        </li>
        <li>
          <span v-if="studentInfo.studentInfo">联系电话：{{studentInfo.studentInfo.phone}}</span>
        </li>
        <li>
          <span v-if="studentInfo.studentInfo">登陆密码：{{studentInfo.studentInfo.password}}</span>
        </li>
      </ul>
    </section>
    <section class="section">
      <ul>
        <li>
          <span>样本照片：</span>
        </li>
        <li>
          <ol v-if="studentInfo.studentInfo">
            <li v-for="(item,index) in studentInfo.studentInfo.sampleList"><img :src="imagePath+item.mediaPath" alt=""></li>
          </ol>
        </li>
      </ul>
    </section>
    <footer-button-confirm class="footer">
      <span slot="buttonText1" @click="agreest(studentInfo.studentInfo.studentId,classId,1)" :class="{none:studentStatus == 'no_agree'}" >不同意</span>
      <span slot="buttonText2" @click="agreest(studentInfo.studentInfo.studentId,classId,0)">同意</span>
    </footer-button-confirm>
  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import footerButtonConfirm from '@/components/footer/footerButtonConfirm'
  import {formatDate} from '@/commonStyle/formatDate'
  import { MessageBox } from 'mint-ui';
  import ClassService from '@/service/ClassService';
  import { mapActions, mapState } from 'vuex'
export default {
  name: '',
  data () {
    return {
      goto:'',
      todo:'',
      imagePath:'http://192.168.199.144:8060/sunflower',
      classId:'',
      studentStatus:''
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
  props: ['module'],
  components:{headTop,footerButtonConfirm},
  computed: {
    ...mapState({
      studentInfo:(state) => {
        return state.Class.studentInfo
      }
    })
  },
  methods: {
    ...mapActions([
      'getStudentInfo','getClassList'
    ]),
    async agreest(studentId,classId,flag){
        var _this = this
      await MessageBox({
        title: '提示',
        message: '是否确定执行此操作?',
        cancelButtonText:'取消',
        confirmButtonText:'确认',
        showConfirmButton:true,
        showCancelButton: true
      }).then(action => {
        if(action == 'confirm'){
           ClassService.judge(studentId,classId,flag).then(function (res) {
               _this.getClassList(_this.$route.query.classId)
               _this.$router.back()
           }
              )
        }else if(action == 'cancel'){
            return
        }
      })
    },
      aaa(){
          try
          {
            if(this.goto==0)  throw "/classSelectionManage";
            if(this.goto==1)  throw "/classSelectionMovieAcquisition";
            if(this.goto==3)  throw "/classSelectionMoveManage";
            if(this.goto==4)  throw "/classSelectionStudentOrder";
          }
          catch(e)
          {
            return e
          }
      }
  },
  mounted(){
    this.goto = this.$route.query.module;
    this.todo = this.aaa();
    this.studentStatus = this.$route.query.studentStatus
  },
  async created(){
    let studentId = this.$route.query.studentId;
    this.classId = this.$route.query.classId;
    await this.getStudentInfo(studentId);
  }
}
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
  li{color: #333;line-height: 0.5rem;background: #fff;border-bottom: 1px solid #eee;}
  li span{color: #333;padding: 0px 0.1rem;}
  section{margin-top: 0.1rem}
  ol{display: flex;flex-wrap:wrap;padding: 0 0.06rem}
  ol li{margin: 0.05rem;width:0.8rem;height:0.8rem;}
  ol img{object-fit: cover;width: 100%;height: 100%}
  .footer span{width: 100%;display: inline-block}
  .none{pointer-events: none;}
</style>
