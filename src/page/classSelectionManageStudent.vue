<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        学生列表
      </span>
      <span slot='add' @click="$router.push({path:'/classSelectionManageStudentInfoSet',query:{oneOrMore:true}})">
        <i class="iconfont add">&#xe603;</i>
      </span>
    </head-top>
    <section>
      <ul>
        <li v-for="(item,index) in studentList">
          <router-link :to="{path:'/classSelectionManageStudentInfo',query:{companyId:$route.query.companyId,classId:$route.query.classId,id:item.id}}" :has-home='false'>
            <span>{{item.name}}</span>
            <i class="iconfont">&#xe607;</i>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import { mapActions, mapState } from 'vuex'


export default {
  name: 'user',
  data () {
    return {
      loading: true,  // 页面加载的状态
      noMore: false,  // 没有更多了
      list: [],       // 页面li数据
      page: 1,         // 初始化页码
      pageNum:1
    }
  },
  computed: {
    ...mapState({
      classId: state => state.Class.classId,
      studentList: state => state.Student.studentList,
      loginStaff: state => state.Login.loginStaff,
    })
  },
  methods:{
    ...mapActions([
      'getStudentList'
    ]),
  },
  props: ['hasHome'],
  components:{headTop},
  created: function () {
      if(this.loginStaff.companyId){
        window.localStorage.setItem('schoolId',this.loginStaff.companyId)
      }
      if(this.classId){
        window.localStorage.setItem('classId',this.classId)
      }
      let classId = window.localStorage.getItem('classId')
      let schoolId = window.localStorage.getItem('schoolId')
      this.getStudentList({'classId':classId,'schoolId':schoolId});
  }
}
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
  li{color: #333;line-height: 0.5rem;background: #fff;border-bottom: 1px solid #eee;}
  li span{color: #333}
  a{display: flex;justify-content: space-between;padding: 0px 0.1rem;}
</style>
