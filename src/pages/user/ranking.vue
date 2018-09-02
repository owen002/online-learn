<template>
  <article class="my-page-info">
    <header class="userinfo-header">
      <img src="../../assets/img/boy.png" alt="" v-if="imgPho==1">
      <img src="../../assets/img/girl.png" alt="" v-else>
      <span>{{userinfo.name}}</span>
    </header>
    <div class="user-rank">
      <section class="header-wrap">
        <div class="header-menu-item">
          <div class="menu-wr">
            <img src="../../assets/img/jifen.png" alt="">
            <em>积分：{{ranking.score}}</em>
          </div>
        </div>
        <div class="header-menu-item">
          <div class="menu-wr bo-lef">
            <img src="../../assets/img/paiming.png" alt="">
            <em>排名：{{ranking.place}}</em>
          </div>
        </div>
      </section>
    </div>
    <div class="user-learning-wrap">
      <div class="user-learning" @click="goLessTotal">
        <div class="d-f">
          <span style="font-size: 16px;">排行榜</span>
        </div>
      </div>
      <div class="learning-content">
        <div class="ranking-wrap">
          <div class="ranking-item" v-for="rl,rindex in ranklist">
            <div class="ranking-titel">
              <img src="../../assets/img/guanjun.png" alt="" class="jb" v-if="rindex === 0">
              <img src="../../assets/img/yajun.png" alt="" class="jb" v-else-if="rindex === 1">
              <img src="../../assets/img/jijun.png" alt="" class="jb" v-else-if="rindex === 2">
              <span v-else style="width:25px;text-align: center">{{rindex + 1}}</span>
              <img src="../../assets/img/boy.png" alt="" class="photo" v-if="rl.sex == 1">
              <img src="../../assets/img/girl.png" alt="" class="photo" v-if="rl.sex == 2">
              <em>{{rl.userName}}</em>
            </div>
            <em>
              {{rl.score}}
            </em>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  import bottom from '../../components/bottombar'

  export default {
    name: 'ranking',
    data() {
      return {
        user: this.$local.myTotalStudy(),
        userinfo: '',
        ranking: {},
        hList: [],
        imgPho: '',
        ranklist: []
      }
    },
    components: {bottom},
    methods: {
      goGrowDetail() {
        this.$router.push({
          name: 'mygrow'
        })
      },
      goLessTotal() {
        this.$router.push({
          name: 'courselist'
        })
      },
      goMyinfo() {
        this.$router.push({
          name: 'myinfo'
        })
      },
      findRanking(type) {
        this.$model.datasys.findRanking({type}, (res) => {
          if (res.error) {
            this.$alert(error)
            return
          }
          this.ranking = res.data.rankingVo
        })
      },
      findTotalRankingList() {
        this.$model.datasys.findTotalRankingList({}, (res) => {
          if (res.error) {
            this.$alert(error)
            return
          }
          // 排序
          this.ranklist = res.data.list
        })
      }
    },
    mounted() {
      this.findRanking(2)
      this.findTotalRankingList()
      // 校验是否登录
      let userinfo = this.$local.userinfo()
      if (!userinfo) {
        this.$router.push({
          name: 'login'
        })
        return
      }
      this.userinfo = userinfo.user
      this.imgPho = userinfo.user.sex
    }
  }
</script>

<style lang="less" scoped>
  img {
    display: block;
    width: 100%;
  }

  .d-f {
    line-height: 24px;
  }

  body {
    height: 100%;
  }

  .ft-12px {
    font-size: 12px;
    color: #797979;
  }

  .my-page-info {
    background-color: #ececec;
    height: 100%;
    .header-wrap {
      display: flex;
      background-color: #fff;
      .header-menu-item {
        position: relative;
        width: 50%;
        .menu-wr {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          img {
            margin-bottom: 4px;
            width: 40px;
          }
        }
        .bo-lef {
          &:after {
            display: block;
            content: '';
            position: absolute;
            left: 0;
            width: 1px;
            height: 40px;
            background: #dadada;
          }
        }
      }
    }
    .userinfo-header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 140px;
      background-color: #c33636;
      color: #fff;
      img {
        margin-bottom: 10px;
        width: 50px;
      }
    }
    .user-header {
      background-color: #fff;
      margin-top: 10px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .user-rank {
      width: 94%;
      margin: -20px auto 0;
      background-color: #fff;
      border-radius: 15px;
      padding: 5px;
    }
    .user-learning-wrap {
      margin-top: 10px;
      background-color: #fff;
      padding: 0 10px 10px;
      .user-learning {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 45px;
      }
      .learning-content {
        .ranking-item {
          display: flex;
          margin-top:10px;
          margin-bottom: 15px;
          align-items: center;
          justify-content: space-between;
          .ranking-titel {
            display: flex;
            align-items: center;
          }
          .jb {
            width: 25px;
          }
          .photo {
            width: 50px;
            margin: 0 20px 0 10px;
          }
        }
      }
    }
  }
</style>
