<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user">
        新增班级
      </span>
    </head-top>
    <section>
      <ul>
        <li>
          <label for="">
            班级名称：
            <input type="text" placeholder="输入名称" v-model="classInfo.name">
          </label>
        </li>
        <li>
          <label for="" >
            入学年级：
            <select name="" id="" v-model="classInfo.grade">
              <option :value="item.value" v-for="(item,index) in getGrade" >{{item.name}}</option>
            </select>
          </label>
        </li>
        <li>
          <label for="">
            班级类型：
            <select name=""  v-model="classInfo.type">
              <option :value="item.value" v-for="(item,index) in getCalssType" >{{item.name}}</option>
            </select>
          </label>
        </li>
      </ul>
    </section>
    <div v-if="submitForm">
      <footer-button :class="{'confirm':conformTo}" :conformTo="conformTo">
        <span slot='buttonText' class="span" @click="addClass">
            <i class="iconfont">&#xe7b3;</i>
            确定
        </span>
      </footer-button>
    </div>
    <div v-else>
      <footer-button :class="{'confirm':true}" :conformTo="true">
        <span slot='buttonText' class="span">
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
  import classService from '@/service/ClassService'
  import { mapState ,mapActions} from 'vuex'

export default {
  name: 'user',
  data () {
    return {
        classInfo:{name:'',grade:'',type:''},
        getGrade:[],
        getCalssType:[],
        conformTo:false,
        submitForm:true
    }
  },
  components:{headTop,footerButton},
  computed: {
    ...mapState({
      loginStaff: state => state.Login.loginStaff,
    })
  },
  methods:{
    ...mapActions([
      'getClassInfo'
    ]),
    addClass(){
      this.submitForm = false;
      let companyId = this.loginStaff.companyId;
      let className = this.classInfo.name;
      let classType = this.classInfo.type;
      let grade = this.classInfo.grade;
      classService.addCalssType(companyId,className,classType,grade).then(resp=>{   //新增班级
        let schoolId = this.loginStaff.companyId;
        this.getClassInfo(schoolId);
        this.$router.back()
      })
    }
  },
  created:async function () {
      await classService.getGrade().then(resp=>{   //获取入学年级api
        this.getGrade = resp.data.result.gradeList;
    });
      await classService.getCalssType().then(resp=>{   //获取班级类型api
        this.getCalssType = resp.data.result.gradeList;
      })
  },
  watch:{
    classInfo:{
      handler(newName, oldName) {
        if(newName.name && newName.grade && newName.type){
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
  .head{border-bottom: 1px solid #e7e7e7;}
  select{background: #fff;margin-top: 0.1rem;height: 0.34rem;color: #555; border-radius: 4px;border: 1px solid #ccc;width: 60%}
  select:focus{border-color: #66afe9;box-shadow: inset 0 1px 1px rgba(0,0,0,0.075), 0 0 8px rgba(102,175,233,0.6);}
  li{border-bottom: 1px solid #eee;background: #fff;height: 0.55rem;line-height: 0.55rem;padding: 0 10px 0px;}
  input[type='text']{height: 0.3rem;}
  .confirm{pointer-events: none; }
  .span{display: inline-block;width: 100%}
</style>
