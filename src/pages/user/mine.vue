<template>
  <article class="my-page-info">
    <header class="userinfo-header" @click="goMyinfo">
      <img src="../../assets/img/boy.png" alt="" v-if="imgPho==1">
      <img src="../../assets/img/girl.png" alt="" v-else>
      <span>{{userinfo.name}}</span>
    </header>
    <div class="user-rank">
      <section class="header-wrap">
        <div @click="goGrowDetail" class="header-menu-item">
          <mu-ripple>
            <div class="menu-wr">
              <img src="../../assets/img/jifen.png" alt="">
              <em>总积分：{{ranking.score}}</em>
            </div>
          </mu-ripple>
        </div>
        <div @click="goRanking" class="header-menu-item">
          <mu-ripple>
            <div class="menu-wr bo-lef">
              <img src="../../assets/img/paiming.png" alt="">
              <em>排名：{{ranking.place}}</em>
            </div>
          </mu-ripple>
        </div>
      </section>
    </div>
    <div class="user-header"  @click="goZz" v-if="showFlag">
      <div class="d-f">
        <span>组织管理</span>
      </div>
      <div class="d-f">
        <mu-icon value="chevron_right"></mu-icon>
      </div>
    </div>
    <div class="user-learning-wrap">
      <div class="user-learning" @click="goLessTotal">
        <div class="d-f h-title">
          <span>在学习的内容</span>
        </div>
        <div class="d-f" @click="goVideoList">
          <mu-ripple class="ft-12px">全部课程</mu-ripple>
          <mu-icon value="chevron_right"></mu-icon>
        </div>
      </div>
      <div class="learning-content">
        <div class="video-wrap-item" v-for="vd in uhList" @click="goVideoDetail(vd.lessonId)">
          <div class="video-img">
            <img :src="vd.coverUrl" alt="">
          </div>
          <div class="video-info-w">
            <em>{{vd.lessonName}}</em>
            <div class="video-bottom">
              已学习 {{vd.progress*100>100?'100':Math.round(vd.progress*100)}}%
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-learning-wrap">
      <div class="user-learning">
        <div class="d-f h-title">
          <span>已完成的内容</span>
        </div>
        <div class="d-f" @click="goLearnList">
          <mu-ripple class="ft-12px">学习记录</mu-ripple>
          <mu-icon value="chevron_right"></mu-icon>
        </div>
      </div>
      <div class="learning-content">
        <div class="learning-item">
          <div class="learning-left-w">
            <mu-icon class="learn-icon" value="access_time"></mu-icon>
            <em>学时</em>
            <p>累计<span>{{user.totalLesson || 0}}</span>课时</p>
          </div>
          <em>累计 {{formatTime(user.totalLessonTime || 0)}}</em>
        </div>
        <div class="learning-item">
          <div class="learning-left-w">
            <mu-icon class="learn-icon" value="format_align_justify"></mu-icon>
            <em>答题</em>
            <p>累计<span>{{user.totalQuestion}}</span>题</p>
          </div>
          <em>准确率 {{Math.floor(user.exactRate * 100)}}%</em>
        </div>
      </div>
    </div>
    <bottom :currentMenu="'mine'"></bottom>
  </article>
</template>

<script>
  import bottom from '../../components/bottombar'
  import util from '../../util/util'

  export default {
    name: 'mine',
    data() {
      return {
        user: '',
        userinfo: '',
        ranking: {},
        hList: [],
        uhList: [],
        imgPho: '',
        showFlag:false
      }
    },
    components: {bottom},
    methods: {
      goZz(){
        this.$router.push({
          name:'zzgl'
        })
      },
      formatTime(sec) {
        let time = util.formatTime(sec)
        return (time.hour ? time.hour + '时' : '') + (time.min ? time.min + '分' : '') + (time.sec ? time.sec + '秒' : '')
      },
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
      queryLogin() {
        this.$model.datasys.getMyinfo({}, (res) => {
          if (res.error) {
            this.$alert(error)
            return
          }
          this.user = res.data.myTotalStudy
          this.$local.myTotalStudy(this.user)
        })
      },
      findRanking(type) {
        this.$model.datasys.findRanking({type}, (res) => {
          if (res.error) {
            this.$alert(error)
            return
          }
          this.ranking = res.data.rankingVo
          this.$local.mytotalRanking(res.data.rankingVo)
        })
      },
      historyStudy(type) {
        this.$model.datasys.historyStudy({type}, (res) => {
          if (res.error) {
            return
          }
          let list = res.data.list
          if (type == 1)
            this.uhList = list
        })
      },
      goVideoDetail(id) {
        this.$router.push({
          name: 'coursedetail',
          query: {
            id
          }
        })
      },
      goRanking() {
        this.$router.push({
          name: 'ranking'
        })
      },
      goVideoList() {
        this.$router.push({
          name: 'courselist'
        })
      },
      goLearnList() {
        this.$router.push({
          name: 'learning'
        })
      }
    },
    mounted() {
      this.queryLogin()
      this.findRanking(1)
      this.historyStudy(1)
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
      this.showFlag = this.userinfo.activityRole == 1
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
    position: relative;
  }

  body {
    height: 100%;
  }

  .ft-12px {
    font-size: 14px;
    color: #797979;
  }

  .my-page-info {
    height: 100%;
    padding-bottom: 70px;
    .h-title {
      padding-left: 15px;
      font-size: 16px;
      position: relative;
      &:before {
        content: '';
        display: block;
        height: 100%;
        width: 2px;
        background-color: #ff0000;
        position: absolute;
        left: 0;
      }
    }
    .learning-content {
      .learning-item {
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        em {
        }
        .learning-left-w {
          display: flex;
          align-items: center;
          .learn-icon {
            font-size: 18px;
          }
          em {
            margin: 0 5px;
          }
          p {
            margin-left: 12px;
            span {
              color: #ff0000;
            }
          }
        }
      }
    }
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
        border-bottom: 1px solid #eee;
        min-height: 45px;
      }
    }
  }

  .video-wrap-item {
    display: flex;
    align-items: stretch;
    margin: 10px 0;
    .video-img {
      width: 40%;
      max-width: 280px;
    }
    .video-info-w {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding-left: 10px;
      justify-content: space-between;
      em {
        /*flex: 1;*/
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 40px;
      }
    }
  }
</style>
