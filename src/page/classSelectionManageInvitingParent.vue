<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        邀请管理
      </span>
    </head-top>
    <article>
        <div>
          <p>《邀请家长填写学生信息登记表》</p>
        </div>
        <h5>【用途解释】</h5>
        <p style="line-height: 24px;">邀请家长填写学生信息登记表，其目的是让家长来填写学生建档信息，更加方便快捷的为学生建档，方便学校以后操作和管理。</p>
        <h5>【内容解析】</h5>
        <p style="line-height: 24px;">学生信息登记表内容包含，学生姓名、性别、生日、家长姓名、联系电话。以及日后用于查询学生信息的初始密码。最重要的是学生的样本照片，此照片用于识别学生以后拍摄影像。</p>
        <h5>【如何使用】</h5>
        <p style="line-height: 24px;">首先，点击页面最下方的“微信邀请家长登记”按钮。</p>
        <p style="line-height: 24px;">其次，在跳转的微信中，找到负责的班级家长聊天群，发送邀请登记表。</p>
        <p style="line-height: 24px;">最后，在微信群里提醒家长们务必认真填写信息并提交。</p>
    </article>
    <footer-button>
      <span slot='buttonText'>
        <i class="fa fa-weixin"></i>
        <span>去微信邀请家长登记</span>
      </span>
    </footer-button>
  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import footerButton from '@/components/footer/footerButton'

export default {
  name: 'user',
  data () {
    return {

    }
  },
  props: ['hasHome'],
  components:{headTop,footerButton},
  mounted(){
  }
}
</script>

<style scoped>
.head{border-bottom: 1px solid #eee;}
article{padding: 0px 0.15rem;background: #fff}
article div{text-align: center;font-size: 0.16rem;height: 0.6rem;line-height: 0.6rem;border-bottom: 1px solid #eee;}
article div p{font-weight: bold;}
  h5{font-size:0.14rem;margin:0.1rem 0;}
</style>
