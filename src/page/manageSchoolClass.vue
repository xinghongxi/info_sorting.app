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
              <span>班级名称：</span>
              <input type="text" :value="classMapInfo.className" disabled>
        </li>
        <li>
              <span>入学年级：</span>
              <input type="text" :value="classMapInfo.classType" disabled>
        </li>
        <li>
              <span>班级类型：</span>
              <input type="text" :value="classMapInfo.grade" disabled>
        </li>
      </ol>
    </aside>
  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import { mapState } from 'vuex'
  import footerButton from '@/components/footer/footerButton'
  import classService from '@/service/ClassService'

export default {
  name: 'user',
  data () {
    return {
      classMapInfo:{}
    }
  },
  computed: {
    ...mapState({
      classList: state => state.Class.classList
    })
  },
  components:{headTop,footerButton},
  created: function () {
      let classId = this.$route.query.classId;
      classService.classListInfo(classId).then(resp=>{   //获取班级详情
      this.classMapInfo = resp.data.result.classMap;
    });
  }
}
</script>

<style scoped>
  aside{background: #fff;margin-top:0.1rem;font-size: 0.14rem;}
  aside li{line-height: 0.5rem;border-bottom: 1px solid #eee;color: #333;padding: 0px 0.1rem;display: flex;align-items: center}
  input{height: 0.34rem; line-height: 0.34rem;padding-right: 0.1rem;flex: 1;}
</style>
