<template>
  <footer>
    <button :class="['unconfirm',{'conformTo':conformTo}]" >
      <slot name='buttonText'></slot>
    </button>
  </footer>
</template>

<script>
  import '../../commonStyle/font.css'
export default {
  name: 'footerButton',
  data () {
    return {
    }
  },
  mounted(){

  },
  props: ['conformTo'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  footer{position: fixed;padding: 0.1rem;bottom: 0;width: 100%;font-size: 0.17rem;z-index: 99;background: #fff;text-align: center;}
  .unconfirm{background: #23D694;border: 1px solid #23D694;width: 100%;line-height: 0.3rem;height: 0.3rem;}
  .conformTo{background: #ccc;border: 1px solid #ccc;}
  fa{font: normal normal normal 14px/1 FontAwesome;}
</style>
