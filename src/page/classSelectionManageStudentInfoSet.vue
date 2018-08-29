<template>
  <div>
    <head-top class="head">
        <span slot='return' @click="$router.back()">
          <i class="iconfont return">&#xe60e;</i>
        </span>
        <span slot='title' class="user" v-if="$route.query.oneOrMore">
          新增学生
        </span>
        <span slot='title' class="user" v-else>
          基本信息
        </span>
    </head-top>
    <aside>
      <ul>
        <li>
          <span>学生姓名：</span>
          <input type="text" value="" placeholder="输入姓名" v-model='studentInfo.studentName' @blur="on_studentName()" ref="checked">
        </li>
        <li>
          <span>学生性别：</span>
          <label>
            <input type="radio" value="10062"  name="sex" v-model="studentInfo.checkedNames" ref="checked" />男生
          </label>
          <label>
            <input type="radio" value="10063" name="sex" v-model="studentInfo.checkedNames" ref="checked"/>女生
          </label>
        </li>
        <li>
          <span>出生日期：</span>
            <input type="date" value="studentInfo.studentBirth"  v-model="studentInfo.studentBirth" ref="checked">
        </li>
        <li>
          <span>家长电话：</span>
          <input type="number" value="" placeholder="输入电话" v-model="studentInfo.studentPhone" @blur="on_studentPhone()" ref="checked">
        </li>
      </ul>
    </aside>
    <footer-button :class="{'confirm':conformTo}" :conformTo="conformTo">
      <span slot='buttonText' class="span">
        <span v-if="$route.query.oneOrMore" @click="addStudentInfo"><i class="fa fa-save"></i>确定保存继续下一个{{$route.query.module}}</span>
        <span v-else @click="saveStudentInfo" ><i class="fa fa-save"></i>确定</span>
      </span>
    </footer-button>
  </div>

</template>

<script>
  import headTop from '@/components/header/headTop'
  import footerButton from '@/components/footer/footerButton'
  import studentService from '@/service/StudentService'
  import { Toast } from 'mint-ui';
  import { mapActions, mapState } from 'vuex'
  import {formatDate} from '../utils/dataFormat.js'
export default {
  name: 'userPassword',
  data () {
    return {
      studentInfo:{studentName:'',checkedNames:'10062',checkedGirl:'',studentBirth:'',studentPhone:'',adopt:false,id:''},
      conformTo:true  //不可点击

    }
  },
  components:{headTop,footerButton,Toast},
  computed: {
    ...mapState({
      studentList: state => state.Student.studentList,
      classId: state => window.localStorage.getItem('classId'),
      companyId: state => window.localStorage.getItem('loginCompanyId'),
    })
  },
  methods: {
    on_studentName () {
      if (this.studentInfo.studentName.length < 1){
        Toast({
          message: '姓名不能为空',
          duration: 1500
        })
      }
    },
    on_studentPhone () {
      var phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if ( !phone.exec(this.studentInfo.studentPhone) ){
        Toast({
          message: '手机格式不正确',
          duration: 1500
        })
      }else if(!this.studentInfo.id){
        studentService.checkPhone(this.studentInfo.studentPhone).then(resp=>{   //验证手机号是否重复
          if (!resp.data.result.flag){
            this.studentInfo.adopt = resp.data.result.flag;
            Toast({
              message: '电话重复',
              duration: 1500
            })
          }
          if(resp.data.result.flag){
              this.studentInfo.adopt = resp.data.result.flag;
          }
        });
      }else if(this.studentInfo.id){
          this.studentInfo.adopt = true
      }
    },
    saveStudentInfo(){
        let companyId = this.companyId;
        let name = this.studentInfo.studentName;
        let phone = this.studentInfo.studentPhone;
        let birthDate = this.studentInfo.studentBirth;
        let id = this.$route.query.id;
        let studentSex = this.studentInfo.checkedNames;
        studentService.setStudentInfo(companyId,this.classId,name,phone,birthDate,id,studentSex).then(resp=>{
          this.$router.back()
        });
    },
    addStudentInfo(){
      let companyId = this.companyId;
      let name = this.studentInfo.studentName;
      let phone = this.studentInfo.studentPhone;
      let birthDate = this.studentInfo.studentBirth;
      let studentSex = this.studentInfo.checkedNames;
      studentService.addStudentInfo(companyId,this.classId,name,phone,birthDate,studentSex).then(resp=>{
        this.studentInfo.studentName = '';
        this.studentInfo.studentPhone = '';
        this.studentInfo.studentBirth = '';
        this.studentInfo.checkedNames = '10062';
        this.conformTo = true;
        this.studentInfo.adopt = false
      });
    }
  },
  created:function () {
    let birthday = this.$route.query.birthDate;
    let student_birth = '';
    if(birthday == ""){
      let date = new Date();
      this.studentInfo.studentBirth = formatDate(date,'yyyy-MM-dd');
    }else{
      this.studentInfo.studentBirth = this.$route.query.birthDate;
    }
    this.studentInfo.studentName = this.$route.query.name;
    this.studentInfo.studentPhone = this.$route.query.phone;
    this.studentInfo.checkedNames = this.$route.query.genderName;
    this.studentInfo.id = this.$route.query.id;
    if(this.studentInfo.id){this.studentInfo.adopt = true}else {this.studentInfo.adopt = false}
  },
  watch:{
    studentInfo:{
      handler(newName, oldName) {
        var phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(this.studentInfo.adopt && this.studentInfo.studentName && phone.exec(this.studentInfo.studentPhone) && this.studentInfo.studentBirth && this.studentInfo.checkedNames){
          this.conformTo=false;
        }else{
          this.conformTo=true;
        }
      },
      immediate: true,
       deep: true
    }
  }

}
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
  section{justify-content: center;width: 100%;background: #fff;display: flex;}
  section > div{padding: 15px 10px;display: flex;flex-direction:column;align-items: center}
  section > div img{width: 150px;height: 150px;border: 1px solid #eee;border-radius: 50%;}
  button{margin: 0.14rem 0 0.02rem;color: #333;  background-color: #fff;  border:1px solid #ccc;padding:0.06rem 0.12rem;font-size: 0.14rem;border-radius: 0.05rem;}
  aside{margin-top: 0.1rem;}
  li{height: 0.55rem;background: #fff;line-height:0.55rem;font-size: 0.14rem;border-bottom: 1px solid #eee;}
  li span{padding-left: 0.1rem;display: inline-block}
  label{line-height:0.4rem;}
  label input{margin-right: 0.06rem; }
  input[type='text'],input[type='date'],input[type='number']{height: 0.3rem;}
  li label:last-child{margin-left: 0.1rem}
  .confirm{pointer-events: none; }
  .fa-save{margin: 0 0.1rem}
  .span{display: inline-block;width: 100%}
  .span span{ display: inline-block;width: 100%;}

</style>
