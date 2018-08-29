<template>
  <div @click="sharedFriend">分享给朋友</div>
</template>

<script>
  import wx from 'weixin-js-sdk';
  import wxService from '@/service/WxService'

  export default {
    name:'expandSchool',
    data(){
      return{
        appId:'',
        timestamp:'',
        nonceStr:'',
        signature:''
      }
    },
    methods:{
      sharedFriend:function () {
        wx.config({
          debug: false,
          appId: this.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
          timestamp:this.timestamp, // 必填，生成签名的时间戳
          nonceStr: this.nonceStr, // 必填，生成签名的随机串
          signature: this.signature,// 必填，签名，见附录1
          //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
          jsApiList: [
            'onMenuShareAppMessage','onMenuShareTimeline',
            'onMenuShareQQ','onMenuShareQZone'
          ]
        });
        //处理验证失败的信息
        wx.error(function (res) {
          console.log('验证失败返回的信息:',res);
        });
        //处理验证成功的信息
        wx.ready(function () {
          //分享到朋友圈
          wx.onMenuShareTimeline({
            title: '你好', // 分享标题
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl:'', // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              console.log("分享成功："+res)
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              console.log("取消分享到朋友圈返回的信息为:",res);
            }
          });
          //分享给朋友
          wx.onMenuShareAppMessage({
            title:'你好', // 分享标题
            desc: '学校注册详情', // 分享描述
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl:'', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (res) {
              // 用户确认分享后执行的回调函数
              console.log("分享成功："+res)
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              console.log("取消分享给朋友返回的信息为:",res);
            }
          });
          //分享到QQ
          wx.onMenuShareQQ({
            title:'你好', // 分享标题
            desc: '学校注册详情', // 分享描述
            link: '', // 分享链接
            imgUrl: '', // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              console.log("分享到QQ好友成功返回的信息为:",res);
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              console.log("取消分享给QQ好友返回的信息为:",res);
            }
          });

          //分享到QQ空间
          wx.onMenuShareQZone({
            title: '你好', // 分享标题
            desc: '学校注册详情', // 分享描述
            link: '', // 分享链接
            imgUrl: '', // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              console.log("分享到QQ空间成功返回的信息为:",res);
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              console.log("取消分享到QQ空间返回的信息为:",res);
            }
          });
        });
        console.log(wx)
      }
    },
    mounted: async function(){
      let url = location.href.split('#')[0];
      console.log(url)
      wxService.wxConfigInfo(url).then(resp =>{
          let result = resp.data.result;
          this.appId = result.appId
          this.timestamp = result.timestamp;
          this.nonceStr = result.nonceStr;
          this.signature = result.signature;
      })
    },
  }
</script>
