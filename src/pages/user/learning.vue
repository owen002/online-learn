<template>
  <article class="my-learning-wrap">
    <header>
      <span>累计</span><span class="color-red">{{user.totalLesson}}课时</span>
    </header>
    <section class="cont-learn">
      <div class="wrap-line"></div>
      <div class="view-content" v-for="item in hList">
        <div class="time-left">
          <div class="time-date">{{item.createDay}}</div>
          <!--<div class="time-time">12:22</div>-->
        </div>
        <div class="time-content">
          <div class="tt-c">
            <div class="content-t">{{item.lessonName}}</div>
            <!--<div class="content-c">第一课时</div>-->
          </div>
          <div class="time-c">{{formatTime(item.lessonTime)}}</div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
  import util from '../../util/util'

  export default {
    name: 'learning',
    data() {
      return {
        hList: [],
        user: this.$local.myTotalStudy()
      }
    },
    methods: {
      historyStudy(type) {
        this.$model.datasys.historyStudy({type}, (res) => {
          if (res.error) {
            return
          }
          let list = res.data.list
          this.hList = list
        })
      },
      formatTime(secs) {
        let time = util.formatTime(secs)
        return (time.hour ? time.hour + '时' : '') + (time.min ? time.min + '分' : '')
          + (time.sec ? time.sec + '秒' : '')
      }
    },
    mounted() {
      this.historyStudy(2)
    }
  }
</script>

<style lang="less" scoped>
  .color-red {
    color: #ff0000;
  }

  .my-learning-wrap {
    background: #fff;
    padding-bottom: 50px;
    color: #888;
    header {
      font-size: 16px;
      padding: 15px 10px 10px;
    }
    .cont-learn {
      position: relative;
      padding-top: 10px;
      .wrap-line {
        width: 1px;
        height: calc(~'100% - 25px');
        position: absolute;
        left: 100px;
        top: 16px;
        background-color: #e4e4e4;
      }
      .view-content {
        display: flex;
        margin-bottom: 55px;
        padding-right: 10px;
        .time-left {
          width: 85px;
          text-align: right;
          .time-date {
          }
        }
        .time-content {
          flex: 1;
          display: flex;
          .tt-c {
            flex: 1;
            color: #333;
            padding-left: 30px;
            padding-right: 5px;
            position: relative;
            &:before {
              position: absolute;
              left: 10px;
              top: 6px;
              display: block;
              content: '';
              width: 10px;
              height: 10px;
              background-color: #ff0000;
              border-radius: 50%;
            }
            .content-t {
            }
            .content-c {
            }
          }
          .time-c {
            min-width: 50px;
            text-align: right;
            line-height: 16px;
            color: #ff0000;
          }
        }
      }
    }
    .cont-learn > .view-content:nth-last-of-type(1) {
      margin-bottom: 0;
    }
  }
</style>
