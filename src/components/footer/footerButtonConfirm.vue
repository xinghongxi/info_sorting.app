<template>
  <footer>
    <button :class="{prohibit:studentStatus == 'no_agree'}">
      <slot name='buttonText1'></slot>
    </button>
    <button>
      <slot name='buttonText2'></slot>
    </button>
  </footer>
</template>

<script>
  import '../../commonStyle/font.css'
export default {
  name: 'footerButton',
  data () {
    return {
      studentStatus:''
    }
  },
  mounted(){
    this.studentStatus = this.$route.query.studentStatus
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  footer{position: fixed;padding: 0.1rem;bottom: 0;width: 100%;font-size: 0.17rem;z-index: 99;background: #fff;text-align: center;display: flex;justify-content: space-between}
  button{background: #23D694;border: 1px solid #23D694;width: 47%;line-height: 0.3rem;height: 0.3rem;}
  button:nth-of-type(1){background:red ;border: 1px solid red;}
  .prohibit{background:#ccc !important;border: 1px solid #ccc !important;}
  fa{font: normal normal normal 14px/1 FontAwesome;}
</style>
