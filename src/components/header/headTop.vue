<template>
  <header :class="['header',{'homeBackground':hasHome}]">
    <slot name='return'></slot>
    <slot name='title'></slot>
    <slot name='add'></slot>
  </header>
</template>

<script>
export default {
  name: 'headTop',
  data () {
    return {
    }
  },
  props: ['hasHome'],
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header{position: fixed;top: 0;width: 100%;height: 0.5rem;line-height:0.5rem;font-size: 0.17rem;z-index: 99}
.header{background: #fff;text-align: center;}
.homeBackground{background: #ff8f00;color: #fff;border-bottom: 1px solid #eb8503;box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);}
</style>
