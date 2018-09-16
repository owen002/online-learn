<template>
  <article>
    <div>
      <header>
        {{name}}
      </header>
      <section class="p-conent">
        <div class="score-t">得分</div>
        <div class="score">{{score}}</div>
        <div class="time">用时{{calt}}</div>
      </section>
      <mu-button color="primary" round class="sub-btn" @click="elist">返回列表</mu-button>
    </div>
  </article>
</template>

<script>
  import util from '../../util/util'

  export default {
    name: 'examresult',
    components: {},
    data() {
      let q = this.$route.query
      return {
        score: q.score,
        time: q.time,
        name: q.name
      }
    },
    computed:{
      calt(){
        return util.fstr(this.time)
      }
    },
    methods: {
      elist(){
        this.$router.push({
          name:'paper'
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  article {
    background-color: #fff;
    padding-bottom: 30px;
    header {
      text-align: center;
      color: #333;
      padding: 20px 15px 10px;
    }
    .p-conent {
      text-align: center;
    }
    .score-t {
      font-size: 14px;
      margin-top: 40px;
      color: #ff8a4b;
    }
    .score {
      color: #ff8a4b;
      font-size: 50px;
      line-height: 50px;
      margin: 5px 0 10px;
    }
    .time {
      font-size: 14px;
      color:#797979;
    }
    .sub-btn{
      margin: 20px auto 0;
      width: 50%;
      display: block;
    }
  }
</style>
