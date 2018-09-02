<template>
  <div class="login-back-img">
    <!--<img src="./../assets/img/timg.jpeg" alt="">-->
    <!--<div class="back-img-cover"></div>-->
  </div>
</template>

<script>
  export default {
    name: 'loginbackimg',
    data() {
      return {}
    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  .login-back-img{
    position: absolute;
    z-index: 77;
    left:0;
    top:0;
    right:0;
    bottom:0;
    .back-img-cover{
      position:absolute;
      z-index: 85;
      background-color: #fdefef;
      opacity: 0.8;
      top:0;
      left:0;
      right:0;
      bottom:0;
    }
    img{
      position: relative;
      z-index: 80;
      width:100%;
      height: 100%;
    }
  }
</style>
