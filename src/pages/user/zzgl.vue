<template>
  <article class="my-inf-tc-warp">
    <div class="my-info-item-w">
      <mu-list>
        <!--<mu-list-item button class="list-item-w" @click="gosjtj">-->
          <!--<mu-list-item-title>-->
            <!--<div class="info-item">-->
              <!--<em>数据统计</em>-->
            <!--</div>-->
          <!--</mu-list-item-title>-->
          <!--<mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>-->
        <!--</mu-list-item>-->
        <mu-list-item button class="list-item-w" @click="goxxhd">
          <mu-list-item-title>
            <div class="info-item">
              <em>线下活动管理</em>
            </div>
          </mu-list-item-title>
          <mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item>
      </mu-list>
    </div>
  </article>
</template>

<script>
  export default {
    name: 'zzgl',
    data() {
      return {
        userinfo:{}
      }
    },
    methods: {
      gosjtj(){
        this.$router.push({
          name:'mygrowmonth'
        })
      },
      goxxhd(){
        this.$router.push({
          name:'xxzt'
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  .my-inf-tc-warp {
    height: 100%;
    background-color: #f3f3f3;
    a, a:active, a:hover {
      text-decoration: none;
    }
    .list-item-w{
      border-top:1px solid #f1f1f1;
      &:nth-of-type(1){
        border:none;
      }
    }
    .logoutbtn{
      width: 90%;
      display: block;
      margin: 15px auto 0;
    }
    .my-info-item-w {
      .info-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          color: #a9a9a9;
        }
      }
      .mu-item {
        background-color: #fff;
        border-bottom: 1px solid #eaeaea;
      }
    }
    .bd-btn {
      display: block;
      margin: 15px auto 0;
      width: 80%;
    }
    .mu-list {
      padding: 0;
      margin-bottom:8px;
      background-color: #fff;
    }
  }
</style>
