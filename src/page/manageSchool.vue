<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        学校管理
      </span>
    </head-top>
    <aside>
      <ol>
        <li>
          <router-link :to="{path:'/manageSchoolBasics',query:{staffId:$route.query.staffId,companyId:$route.query.companyId}}" >
            <div>
              <i class="iconfont">&#xe63f;</i>
              <span>基础信息</span>
            </div>
            <div><i class="iconfont">&#xe607;</i></div>
          </router-link>
        </li>
        <li>
          <router-link  :to="{path:'/classSelection', query:{module:'班级管理'}}">
            <div>
              <i class="iconfont">&#xe6af;</i>
              <span>班级管理</span>
            </div>
            <div><i class="iconfont">&#xe607;</i></div>
          </router-link>
        </li>
        <li>
          <router-link :to="{path:'/manageSchoolTeacher',query:{companyId:$route.query.companyId}}" >
            <div>
              <i class="iconfont">&#xe631;</i>
              <span>老师管理</span>
            </div>
            <div><i class="iconfont">&#xe607;</i></div>
          </router-link>
        </li>
        <li>
          <router-link to="/manageDealingParen" >
            <div>
              <i class="iconfont">&#xe611;</i>
              <span>招生工具</span>
            </div>
            <div><i class="iconfont">&#xe607;</i></div>
          </router-link>
        </li>
        <li>
        <router-link to="/manageDealingParen" >
          <div>
            <i class="iconfont">&#xe63e;</i>
            <span>产品管理</span>
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

export default {
  name: 'user',
  data () {
    return {

    }
  },
  components:{headTop},
  mounted(){
  }
}
</script>

<style scoped>
  aside{background: #fff;margin-top:0.1rem;font-size: 0.14rem;}
  aside li a{line-height: 0.5rem;border-bottom: 1px solid #eee;color: #333;padding: 0px 0.1rem;display: flex;justify-content: space-between}
  aside li div{display: flex;align-items: center}
  aside li div:first-child i{margin-right: 0.1rem;font-size:0.22rem;}
  aside li div:last-child i{font-size:0.17rem;}
</style>
