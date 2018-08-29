<template xmlns="http://www.w3.org/1999/html">
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user" v-if="teacherId>0">
        修改老师
      </span>
      <span slot='title' class="user" v-else>
        新增老师
      </span>
    </head-top>
    <section>
      <div>
        <img src="../images/user.png" alt="" v-if="teacherImg == ''">
        <img :src="imagePath + teacherImg" alt="" v-else>
        <vue-file-upload
          ref="vueFileUploader"
          url=''
          v-bind:filters = "filters"
          v-on:onAdd = "onAddItem"
        >
          <span slot="label" class="label">上传头像</span>
        </vue-file-upload>
        <!--<b class="change"><input type="file" @change="uploadImage($event)" multiple="multiple" id="uploadimg" accept="image/*">-->
          <!--<span>上传头像</span>-->
        <!--</b>-->
      </div>
    </section>
    <aside>
      <ul>
        <li>
          <span>老师姓名:</span>
          <input type="text" placeholder="输入姓名" v-model="teacherName">
        </li>
        <li v-if="teacherId==0">
          <span>登录账号:</span>
          <input type="text" placeholder="输入账号" v-model="loginAcount">
        </li>
        <li v-if="teacherId==0">
          <span>登录密码:</span>
          <input type="password" placeholder="输入密码" v-model="password">
        </li>
        <li v-if="teacherId==0">
          <span>确认密码:</span>
          <input type="password" placeholder="输入密码" v-model="subPassword">
        </li>
      </ul>
    </aside>
    <div class="list">
      <span>所属班级:</span>
      <ol>
        <div v-for="(item,index) in classList" >
        <li @click="checkClass(item.id)" ref="liId" v-if="item.isChoose" class="on">
          <span class="default" ref="spanID"></span>
          <span>{{item.name}}</span>
        </li>
          <li @click="checkClass(item.id)" ref="liId" v-else>
            <span class="default" ref="spanID"></span>
            <span>{{item.name}}</span>
          </li>
        </div>
      </ol>
    </div>
    <div v-if="submitForm" @click="editTeacher">
      <footer-button>
      <span slot='buttonText'>
        <i class="iconfont">&#xe7b3;</i>
        确定
      </span>
      </footer-button>
    </div>
    <div v-else>
      <footer-button class="{'confirm':true}" conformTo="true">
      <span slot='buttonText'>
        <i class="iconfont">&#xe7b3;</i>
        确定
      </span>
      </footer-button>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import footerButton from '@/components/footer/footerButton'
  import { mapGetters, mapActions, mapState } from 'vuex'
  import * as RNActions from  '@/utils/RNActions'
  import schoolService from  '@/service/SchoolService'
  import userInfoService from '@/service/UserInfoService'
  import { Toast } from 'mint-ui';
  import VueFileUpload from 'vue-file-upload';

  export default {
    name: 'userSet',
    data () {
      return {
        imagePath:'http://192.168.199.144:8060/sunflower',
        teacherInfo:'',
        teacherId:0,
        teacherName:'',
        loginAcount:'',
        teacherImg:'',
        password:'',
        subPassword:'',
        classList:[],
        changeStyle:false,
        number:'',
        submitForm:true,
        filters:[
          {
            name:"imageFilter",
            fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
          }
        ],
        reqopts:{
          formData:{
            tokens:'',
            authorization:'',
          },
          responseType:'',
          withCredentials:false,
          headers: {

          }
        }
      }
    },
    components:{headTop,footerButton,VueFileUpload},
    methods:{
      ...mapActions([
        'findLoginStaff'
      ]),
      onAddItem(files){
        let file = files[0].file;
        let formData = new FormData();
        formData.append("imgFile", file);
        userInfoService.uploadImage(formData).then(resp =>{
          this.teacherImg = resp.data.result.url;
        })
      },
//      uploadImage:function (event) {
//        let file = event.target.files[0];
//        let formData = new FormData();
//        formData.append("imgFile", file);
//        userInfoService.uploadImage(formData).then(resp =>{
//          this.teacherImg = resp.data.result.url;
//        })
//      },
      checkClass(classId){
        for(var i=0;i<this.classList.length;i++){
            let classInfo = this.classList[i];
            if(classInfo.id == classId){
                if(classInfo.isChoose){
                    this.classList[i].isChoose = false;
                }else{
                  this.classList[i].isChoose = true;
                }
            }
        }
      },
      editTeacher:async function () {
        this.submitForm = false;
        let teacherId = this.teacherId;
        let password = this.password;
        let subPassword = this.subPassword;
        //编辑老师信息时，判断原始密码是否输入
        if(teacherId == 0){
          if(password.length<6){
            Toast({
              message: '请输入新密码！',
              position: 'center',
              duration: 500
            });
            this.submitForm = true;
            return false;
          }
          if(subPassword.length<6){
            Toast({
              message: '请再次输入密码！',
              position: 'center',
              duration: 500
            });
            this.submitForm = true;
            return false;
          }
          if(password != subPassword){
            Toast({
              message: '新密码和再次输入的密码不一致！',
              position: 'center',
              duration: 500
            });
            this.submitForm = true;
            return false;
          }
        }
        let classIds = [];
        let classList = this.classList;
        for(var i=0;i<classList.length;i++){
            let classInfo = classList[i];
            if(classInfo.isChoose){
                classIds.push(classInfo.id);
            }
        }

        let teacherImg = this.teacherImg;
        let teacherName = this.teacherName;
        let loginAcount = this.loginAcount;
        let companyId = this.$route.query.companyId;
        if(teacherId>0){
            await schoolService.editTeacher(teacherId,teacherImg,teacherName,classIds).then(resp =>{
                let result = resp.data.result.result;
                if(result>0){
                  Toast({
                    message: '老师信息修改成功！',
                    position: 'center',
                    duration: 500
                  });
                  setTimeout(()=>{
                    this.$router.push({path:'/manageSchoolTeacher',query:{companyId:companyId}})
                  },500);
                }
            })
        }else {
          let checkResult = await schoolService.checkLoginAcount(loginAcount);
          let flag = checkResult.data.result.flag;
          if(flag){
            await schoolService.addTeacher(companyId,teacherImg,teacherName,loginAcount,password,classIds).then(resp =>{
              let result = resp.data.result.result;
              if(result>0){
                Toast({
                  message: '老师信息添加成功！',
                  position: 'center',
                  duration: 500
                });
                setTimeout(()=>{
                  this.$router.push({path:'/manageSchoolTeacher',query:{companyId:companyId}})
                },500);
              }
            })
          }else{
            Toast({
              message: '登陆账户已存在，请重新输入！',
              position: 'center',
              duration: 500
            });
            this.submitForm = true;
            return;
          }
        }
      }
    },
    computed: {
      events: () => events,
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
      let teacherId = that.$route.query.teacherId;
      if(typeof teacherId!= "undefined"){
        await schoolService.teacherInfo(teacherId).then(resp =>{
          that.teacherInfo = resp.data.result.teacher;
          that.teacherName = that.teacherInfo.staffName;
          that.teacherImag = that.teacherInfo.img;
          that.loginAcount = that.teacherInfo.logonAccount;
          that.teacherId = that.teacherInfo.id;
          that.classList = resp.data.result.classList;
        })
      }else{
        let companyId = that.$route.query.companyId;
        await schoolService.classList(companyId).then(resp =>{
            that.classList = resp.data.result.classList;
        })
      }
    },
  }
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
  section{justify-content: center;width: 100%;background: #fff;display: flex;}
  section > div{padding: 0.15rem 10px;display: flex;flex-direction:column;align-items: center}
  section > div img{width: 1.5rem;height: 1.5rem;border: 1px solid #eee;border-radius: 50%;}
  button{margin: 0.14rem 0 0.02rem;color: #333;  background-color: #fff;  border:1px solid #ccc;padding:0.06rem 0.12rem;font-size: 0.14rem;border-radius: 0.05rem;}
  ul li{height: 0.55rem;background: #fff;line-height:0.55rem;font-size: 0.14rem;border-bottom: 1px solid #eee;}
  aside{margin-top: 0.1rem}
  ul li span{padding-left: 0.1rem;display: inline-block}
  .default{background: url(../images/input-unchecked.png) 0 -0.01rem no-repeat;width:0.16rem;height:0.16rem;display: inline-block;vertical-align: middle;}
  .img{background: url(../images/input-checked.png) 0 -0.01rem no-repeat;width:0.16rem;height:0.16rem;display: inline-block;vertical-align: middle;}
  label{display: table;font-size: 0.11rem;padding: 0.1rem;border: 1px solid #eaeaea;background: #efefef;color: #666;margin-bottom:0.05rem;}
  .list{padding-left: 0.1rem;background: #fff;padding:0.1rem 0.1rem 0px;}
  .list span{line-height: 0.34rem}
  ol{display: flex;flex-wrap: wrap;padding-bottom: 0.3rem}
  ol li{border: 1px solid #23D694;border-color: transparent;margin: 0px 0.05rem;margin-bottom: 0.12rem;border-radius: 3px;line-height:0.16rem;color: #a7a7a7;font-size: 0.11rem;display: table;padding: 0.02rem 0.1rem;background-color: #efefef;}
  .on{color: #23D694;border: 1px solid #23D694;}

  #uploadimg {
    opacity:0;
  }
  .change{
    margin: 0.14rem 0 0.02rem;
    color: #333;
    background-color: #fff;
    border: 1px solid #ccc;
    font-size: 0.14rem;
    border-radius: 0.05rem;
    line-height: 0.5rem;
    height: 0.3rem;
    width: 1.2rem;
    text-align: center;
    position: relative;
  }
  #uploadimg{position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);z-index: 4}
  .change span{position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);z-index: 3}
  .vue-file-upload{position: relative}
  .vue-file-upload >>> input{
      opacity:0;
      filter:alpha(opacity=0);
    padding: 0.2rem 0.1rem 0.1rem;
    }
  .vue-file-upload >>> span{
    transition: color .2s linear,background-color .2s linear,border .2s linear;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #333;
    background-color: #fff;
    border: 1px solid #ccc;
    font-size: 0.14rem;
    border-radius: 0.05rem;
    line-height: 0.3rem;
    height: 0.3rem;
    width: 1.2rem;
    text-align: center;
  }
  .label:active{
    color: #3091f2;
    background-color: transparent;
    border-color: #3091f2;
  }

</style>
