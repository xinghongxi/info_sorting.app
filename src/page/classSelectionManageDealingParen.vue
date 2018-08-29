<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        处理邀请
      </span>
    </head-top>
    <section>
      <ul>
        <li v-for="(item,index) in classResult.reuslt">
          <router-link :to="{path:'/classSelectionManageDealingParenInfo',query:{studentId:item.studentId,classId:item.classId,studentStatus:item.studentStatus}}">
            <span>{{item.studentName}}</span>
            <div v-if="item.studentStatus=='no_confirm'">
              未处理
              <i class="iconfont">&#xe607;</i>
            </div>
            <div v-if="item.studentStatus=='no_agree'">
              不同意
              <i class="iconfont">&#xe607;</i>
            </div>
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
  name: '',
  data () {
    return {
      goto:'',
      todo:''
    }
  },
  props: ['module'],
  components:{headTop},
  computed: {
    ...mapState({
      classResult:(state) => {
        return state.Class.classResult
      }
    })
  },
  methods: {
    ...mapActions([
        'getClassList'
    ]),
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
  mounted:async function(){
    this.goto = this.$route.query.module;
    this.todo = this.aaa();
    let classId = this.$route.query.classId;
    await this.getClassList(classId);
  },
  created: function () {

  }
}
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
  li{color: #333;line-height: 0.5rem;background: #fff;border-bottom: 1px solid #eee;}
  li span{color: #333}
  a{display: flex;justify-content: space-between;padding: 0px 0.1rem;}
  section div {color: gray;}
</style>
