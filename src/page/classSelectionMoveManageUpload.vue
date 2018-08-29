<template>
  <div>
    <head-top class="head">
      <span slot='return' @click="$router.back()">
        <i class="iconfont return">&#xe60e;</i>
      </span>
      <span slot='title' class="user" v-if="title">
        {{title}}
      </span>
      <span slot='title' class="user" v-else>
        影像管理
      </span>
    </head-top>
    <upload-images></upload-images>
    <footer-button v-if="title == '上传失败的'">
      <span slot='buttonText'>
        <span>重新上传</span>
      </span>
    </footer-button>
  </div>
</template>

<script>
  import headTop from '@/components/header/headTop'
  import uploadImages from '@/components/upload/uploadImages'
  import footerButton from '@/components/footer/footerButton'

export default {
  name: 'user',
  data () {
    return {
      title:'',
      routers:''
    }
  },
  components:{headTop,footerButton,uploadImages},
  created(){
    this.title = this.$route.query.title;
    this.routers = this.$route.path;
  }
}
</script>

<style scoped>
  .head{border-bottom: 1px solid #eee;}
  article{background: #fff;margin-top: 0.1rem;border-top: 1px solid #dedede;}
  article li{width:50%;float: left;height: 1.8rem;overflow: hidden;padding: 1px;}
  article li img{object-fit: cover;height: 100%;width: 100%;}
</style>
