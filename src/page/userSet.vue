<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        用户信息
      </span>
    </head-top>
    <section>
      <div>
        <img src="../images/user.png" alt="" v-if="img == ''">
        <img :src="imagePath + img" alt="" v-else>
        <b class="change"><input type="file" @change="uploadImage($event)"  id="uploadimg"  accept="image/*">
          <span>上传头像</span>
        </b>
        <!--<button type="submit">上传头像</button>-->
      </div>
    </section>
    <aside>
      <ul>
        <li>
          <span>设置昵称:</span>
          <input type="text" placeholder="输入昵称" v-model="nickname">
        </li>
      </ul>
    </aside>
    <div @click="changeInfo">
      <footer-button>
      <span slot='buttonText'>
        <i class="iconfont">&#xe7b3;</i>
        <span>确定</span>
      </span>
      </footer-button>
    </div>
  </div>

</template>

<script>
  import headTop from '@/components/header/headTop'
  import { mapGetters, mapActions, mapState } from 'vuex'
  import userInfoService from '@/service/UserInfoService'
  import footerButton from '@/components/footer/footerButton'
  import { Toast } from 'mint-ui';
  import * as RNActions from '@/utils/RNActions';

export default {
  name: 'userSet',
  data () {
    return {
      imagePath:'http://192.168.199.144:8060/sunflower',
      nickname:'',
      img:''
    }
  },
  methods: {
    ...mapActions([
      'findLoginStaff'
    ]),
    uploadImage:function (event) {
      let file = event.target.files[0];
      let formData = new FormData();
      formData.append("imgFile", file);
      userInfoService.uploadImage(formData).then(resp =>{
          this.img = resp.data.result.url;
      })
//      axios.post('http://192.168.199.232:8060/baby/picture/pic/upload?access_token=96cce2a9-b7b5-4748-a617-37c0d523a5c2&r=30850c40-717d-4a43-a37c-14aff0499150', formData).then(function (response) {
//          console.log(response);
//        }).catch(function (error) {
//          alert("上传失败");
//          console.log(error);
//        });
    },
    changeInfo:function () {
      let staffId = this.$route.query.staffId;
      let nickname = this.nickname;
      let img = this.img;
      let result = userInfoService.changeInfo(img,nickname,staffId);
      Toast({
        message: '修改成功！',
        position: 'center',
        duration: 500
      });
      setTimeout(()=>{
        this.$router.push({path:'/user',query:{staffId:staffId}})
      },500);
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

    //账户流水
    let staffId = that.$route.query.staffId;
    await userInfoService.staffInfo(staffId).then(resp=>{
      let userInfo = resp.data.result;
      if(userInfo != null){
          that.nickname = userInfo.nickname;
          that.img = userInfo.img;
      }
    })
  },
  components:{headTop,footerButton},
}
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
section{justify-content: center;width: 100%;background: #fff;display: flex;}
section > div{padding: 15px 10px;display: flex;flex-direction:column;align-items: center}
section > div img{width: 150px;height: 150px;border: 1px solid #eee;border-radius: 50%;}
  button{margin: 0.14rem 0 0.02rem;color: #333;  background-color: #fff;  border:1px solid #ccc;padding:0.06rem 0.12rem;font-size: 0.14rem;border-radius: 0.05rem;}
  li{height: 0.55rem;background: #fff;line-height:0.55rem;font-size: 0.14rem;}
  aside{margin-top: 0.1rem;}
  li span{padding-left: 0.1rem;display: inline-block}

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
</style>
