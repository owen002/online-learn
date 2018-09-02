<template>
  <article class="body-w-article">
    <header>
      <div class="header-img" v-if="bannerImg">
        <img :src="bannerImg">
      </div>
      <section class="header-wrap">
        <div class="header-menu-item" @click="goSjxx">
          <mu-ripple>
            <div class="menu-wr">
              <img src="../assets/img/xinxiang.png" alt="">
              <em>书记信箱</em>
            </div>
          </mu-ripple>
        </div>
        <div class="header-menu-item">
          <mu-ripple>
            <div class="menu-wr bo-lef">
              <img src="../assets/img/ceping.png" alt="">
              <em>在线测评</em>
            </div>
          </mu-ripple>
        </div>
      </section>
    </header>
    <section v-for="zt,zind in newList" class="class-content-w" v-if="zind === 0">
      <div class="class-w-header">
        <div class="class-sub-title">
          {{zt.name}}
        </div>
        <div class="more-class" @click="goZtList(zt.id,zt.name)" v-if="zt.newsList.length > zt.showNum">
          <mu-ripple class="d-flex">
            <div class="more-f">查看更多</div>
            <mu-icon class="arrow-right-c" value="chevron_right"></mu-icon>
          </mu-ripple>
        </div>
      </div>
      <div class="wz-content">
        <div class="wz-item" v-for="nt in zt.newsList.slice(0,zt.showNum)" @click="goNews(nt.id)">
          <mu-ripple>{{nt.titel}}</mu-ripple>
        </div>
      </div>
    </section>
    <section class="class-content-w">
      <div class="class-w-header">
        <div class="class-sub-title">
          微党课
        </div>
        <div class="more-class" @click="goTotalLesson">
          <mu-ripple class="d-flex">
            <div class="more-f">全部课程</div>
            <mu-icon class="arrow-right-c" value="chevron_right"></mu-icon>
          </mu-ripple>
        </div>
      </div>
      <div class="video-wrap">
        <div class="video-wrap-item" @click="goVideo(video.id)" v-for="video in videoList">
          <div class="video-img">
            <img :src="video.coverUrl" alt="">
          </div>
          <div class="video-info-w">
            <div class="title-w">
              <span class="video-label">访谈</span>
              <span class="em">{{video.title}}</span>
            </div>
            <div class="video-bottom">
              <div class="video-date">{{video.createDay}}</div>
              <div class="see-times">
                <mu-icon class="see-icon" value="remove_red_eye"></mu-icon>
                <em>{{video.playTimes}}</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-for="zt,zind in newList" class="class-content-w" v-if="zind >= 1">
      <div class="class-w-header">
        <div class="class-sub-title">
          {{zt.name}}
        </div>
        <div class="more-class" @click="goZtList(zt.id,zt.name)" v-if="zt.newsList.length > zt.showNum">
          <mu-ripple class="d-flex">
            <div class="more-f">查看更多</div>
            <mu-icon class="arrow-right-c" value="chevron_right"></mu-icon>
          </mu-ripple>
        </div>
      </div>
      <div class="wz-content">
        <div class="wz-item" v-for="nt in zt.newsList.slice(0,zt.showNum)" @click="goNews(nt.id)">
          <mu-ripple class="zt-art-title">{{nt.titel}}</mu-ripple>
        </div>
      </div>
    </section>
    <bottom :currentMenu="'rec'"></bottom>
  </article>
</template>

<script>
  import bottom from '../components/bottombar'

  export default {
    name: 'index',
    data() {
      return {
        newList: [],
        videoList: [],
        newsLimit: 5,
        bannerImg: ''
      }
    },
    components: {bottom},
    methods: {
      goTotalLesson() {
        this.$router.push({
          name: 'courselist'
        })
      },
      goZtList(id, name) {
        this.$router.push({
          name: 'ztlist',
          query: {id, name}
        })
      },
      goNews(id) {
        this.$router.push({
          name: 'article',
          query: {
            id
          }
        })
      },
      goSjxx(){
        this.$router.push({
          name:'shujixinxiang'
        })
      },
      goVideo(id) {
        this.$router.push({
          name: 'coursedetail',
          query: {
            id: id,
          }
        })
      },
      queryList() {
        this.$model.datasys.getNewsList({}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          let list = res.data.list
          this.newList = list;
        }, (err) => {
        })
      },
      getBanner() {
        this.$model.datasys.getBanner({}, (res) => {
          if (res.error) {
            return
          }
          this.bannerImg = res.data.tcdxBanner.bannerUrl
        }, (err) => {
        })
      },
      queryVideoList() {
        this.$model.datasys.getVideoList({isFirst: 1}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          let list = res.data.list
          this.videoList = list;
        }, (err) => {
        })
      }
    },
    mounted() {
      this.queryList()
      this.queryVideoList()
      this.getBanner()
    }
  }
</script>

<style lang="less" scoped>
  @color-red: #ff4545;

  img {
    display: block;
    width: 100%;
  }

  .d-flex {
    display: flex;
    align-items: center;
  }

  .header-wrap {
    display: flex;
    padding: 10px;
    background-color: #fff;
    .header-menu-item {
      position: relative;
      width: 50%;
      .menu-wr {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 40px;
        }
        font-size: 12px
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

  .class-content-w {
    background-color: #fff;
    padding: 10px 0 5px;
    margin-top: 5px;
    .class-w-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      height: 24px;
      font-size: 16px;
      .class-sub-title {
        border-left: 4px solid @color-red;
        padding-left: 8px;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        &:before {
          display: block;
          content: '';
          position: absolute;
          left: 0;
          width: 4px;
          height: 10px;
        }
      }
      .more-class {
        display: flex;
        align-items: center;
        color: #9c9c9c;
        position: relative;
      }
      .arrow-right-c {
        width: 17px;
      }
      .more-f {
        margin-right: -3px;
        font-size: 14px;
      }
    }
    .wz-content {
      padding: 0 15px;
      margin: 8px 0 0;
      .wz-item {
        position: relative;
        word-break: break-all;
        line-height: 18px;
        margin:10px 0;
        .zt-art-title{

        }
      }
    }
    .video-wrap {
      margin: 5px 0;
      padding: 0 15px;
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
          .title-w {
            .em {
              /*flex: 1;*/
              overflow: hidden;
              /*text-overflow: ellipsis;*/
              /*display: -webkit-box;*/
              /*-webkit-line-clamp: 2;*/
              /*-webkit-box-orient: vertical;*/
              height: 40px;
            }
          }
          .video-label {
            padding: 2px 5px;
            background-color: #ff0000;
            border-radius: 10px;
            color: #fff;
            font-size: 10px;
            margin-right: 8px;
          }
          .video-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .video-data {
              color: #9e9e9e;
              font-size: 12px;
            }
            .see-times {
              display: flex;
              align-items: center;
              .see-icon {
                font-size: 16px;
              }
              em {
                margin-left: 3px;
              }
            }
          }
        }
      }
    }
  }

  .body-w-article {
    padding-bottom: 70px;
  }
</style>
