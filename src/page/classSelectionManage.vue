<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        班级管理
      </span>
    </head-top>
    <article class="class-home">
      <img src="../images/user-header2.jpg">
      <div>{{className}}</div>
    </article>
    <aside>
      <ol>
        <li>
          <router-link :to="{path:'/classSelectionManageStudent',query:{companyId:$route.query.companyId,classId:$route.query.classId}}" >
            <div>
              <i class="iconfont">&#xe63f;</i>
              <span>学生基本信息管理</span>
            </div>
            <div><i class="iconfont">&#xe607;</i></div>
          </router-link>
        </li>
        <li>
          <router-link to="/classSelectionManageInvitingParent" >
            <div>
              <i class="iconfont">&#xe601;</i>
              <span>邀请家长登记</span>
            </div>
            <div><i class="iconfont">&#xe607;</i></div>
          </router-link>
        </li>
        <li>
          <router-link :to="{path:'/classSelectionManageDealingParen',query:{classId:$route.query.classId}}" >
            <div>
              <i class="iconfont">&#xe613;</i>
              <span>处理家长登记</span>
            </div>
            <div><i class="iconfont">&#xe607;</i></div>
          </router-link>
        </li>
      </ol>
    </aside>
  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import { mapActions, mapState } from 'vuex'

export default {
  name: 'user',
  data () {
    return {
      className:''
    }
  },
  props: ['hasHome'],
  components:{headTop},
  computed: {
    ...mapState({
      classList:(state) => {
        return state.Class.classList
      }
    })
  },
  created:async function () {
      let classId = this.$route.query.classId;
       this.$store.commit('getClassId',classId);
       if(this.classList.length>0){
         let className = this.classList[this.$route.query.index].name
         window.localStorage.setItem('className',className)
       }
  },
  mounted(){
    this.className = window.localStorage.getItem('className');
  }
}
</script>

<style scoped>
  article{position: relative}
img{width: 100%;vertical-align: bottom}
article div{position: absolute;    padding: 0px 0.1rem;font-weight: bold; background: rgba(0, 0, 0,0.3) none repeat scroll 0 0;color: #fff; height: 0.4rem;line-height: 0.4rem;font-size: 0.16rem;bottom: 0px;left: 0px;right: 0px;}
  aside{background: #fff;margin-top:0.1rem;font-size: 0.14rem;}
  aside li a{line-height: 0.5rem;border-bottom: 1px solid #eee;color: #333;padding: 0px 0.1rem;display: flex;justify-content: space-between}
  aside li div{display: flex;align-items: center}
  aside li div:first-child i{margin-right: 0.1rem;font-size:0.22rem;}
  aside li div:last-child i{font-size:0.17rem;}
</style>
