<template>
  <mu-container class="bottom-nav-bar">
    <mu-bottom-nav color="red" :value.sync="bottomMenu" @change="menuChange">
      <mu-bottom-nav-item value="rec" title="推荐" icon="date_range"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="learn" title="学习" icon="library_books"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="mine" title="我的" icon="perm_identity"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>

<script>
  let pathConfig = {
    rec: '/index',
    learn: '/courselist',
    mine: '/mine'
  }
  export default {
    name: 'bottombar',
    props:['currentMenu'],
    data() {
      return {
        bottomMenu:this.currentMenu||'rec'
      }
    },
    methods: {
      menuChange(val) {
        setTimeout(() => {
          this.$router.push(pathConfig[val])
        }, 0)
      },
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  .bottom-nav-bar {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .container {
    padding: 0;
    .mu-bottom-nav {
      border-top: 1px solid #dbdbdb;
    }
  }
</style>
