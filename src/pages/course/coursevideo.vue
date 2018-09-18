<template>
  <article>
    <section class="class-title">
      <video-player class="video-player-box" v-if="videoDetail.videoUrl"
                    ref="videoPlayer"
                    :options="playerOptions"
                    customEventName="customstatechangedeventname"

                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="canPlay"
                    @ready="playerReadied">
      </video-player>
      <div class="video-title-header">
        <span>积分 {{videoDetail.point}}</span>
        <em></em>
        <span>时长 {{videoDetail.studyRecord.timeDesc}}</span>
        <em></em>
        <span>{{videoDetail.studyRecord.progress >= 1?'已完成':'未完成'}}</span>
      </div>
    </section>
    <section class="back-content">
      {{videoDetail.lessonSummary}}
    </section>
    <div class="btns-w">
      <mu-button large color="primary" class="btn-w" @click="qd" v-if="emt.sign">签到</mu-button>
      <mu-button large color="error" class="btn-w" @click="dt" v-if="emt.exam">答题</mu-button>
    </div>
    <div v-show="signFlag">
      <div class="back"></div>
      <div class="sign-wrap">
        <div class="sign-header">
          签到成功
        </div>
        <div class="sign-cont">
          <img src="../../assets/img/sign.png" alt="">
          <div class="sign-ccc">
            <div class="sign-title">如何开展两学一做</div>
            <div class="has-bf">
              已播放
              <em>{{ftime()}}</em>
            </div>
          </div>
          <div class="btn-confi-sign" @click="contLearn">
            <mu-ripple></mu-ripple>
            <span>继续学习</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  import {videoPlayer} from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  import util from '../../util/util'

  export default {
    name: 'coursevideo',
    components: {
      videoPlayer
    },
    data() {
      let q = this.$route.query
      return {
        videoDetail: {studyRecord: {}},
        playsinline: true,
        playerOptions: {
          controls: true,
          sources: [{
            src: ''
          }],
          width: document.body.clientWidth
        },
        videoTimeInterval: 0,
        videoTotalTime: 0,
        vCurrentTime: 0,
        videoId: q.id || '',
        progress: 0,
        vEnd: false,
        initTime: false,
        storeTime: 0,
        signFlag: false,
        emt: {
          sign: false,
          exam: false
        }
      }
    },
    computed: {
      splitTime() {
        return this.videoTotalTime / 5
      },
      yxtime() {
        let time = 0
        if (this.videoDetail && this.videoDetail.studyRecord) {
          let progress = this.videoDetail.studyRecord.progress;
          time = progress * this.videoDetail.lessonLength
        }
        return time
      }
    },
    methods: {
      querySign() {
        this.$model.datasys.checkSingAndExam({lessonId:this.videoId}, (res) => {
          if (res.error) {
            return
          }
          this.emt.sign = res.data.sing||false
          this.emt.exam = res.data.exam
        })
      },
      ftime() {
        return util.fstr(this.yxtime)
      },
      dt() {
        this.$router.push({
          name: 'exam',
          query: {
            lessionid: this.videoId,
            name: this.videoDetail.title
          }
        })
      },
      qd() {
        this.$model.datasys.signVideo({lessonId:this.videoId}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          this.signFlag = true
        })
      },
      contLearn() {
        this.signFlag = false
        this.querySign()
      },
      onPlayerEnded() {
        this.timeStore(0)
        this.progress = 1
        this.vEnd = true
        this.updateRecord()
      },
      updateCurrentTime(sec) {
        let vid = document.querySelector('video')
        sec = Math.floor(sec)
        vid.currentTime = sec;
        if (vid.currentTime != sec) {
          setTimeout(() => {
            this.updateCurrentTime(sec)
          }, 1000)
        }
      },
      canPlay() {
        if (!this.initTime) {
          // 设置本地视频播放时间
          let time = this.timeStore()
          let storeprogress = this.videoDetail.studyRecord.progress
          if (storeprogress < 1) {
            let storetime = storeprogress * this.videoDetail.lessonLength
            this.vCurrentTime = Number(storetime) > Number(time) ? Number(storetime) : Number(time)
          } else {
            if (time) {
              this.vCurrentTime = time
            }
          }
          this.updateCurrentTime(this.vCurrentTime)
          this.initTime = !this.initTime
        }
      },
      updateRecord() {
        console.log('update', this.progress)
        if (this.videoDetail.studyRecord.progress < 1 && !this.vEnd) {
          this.$model.datasys.updateVideo({
            progress: this.progress,
            studyId: this.videoDetail.studyRecord.id
          }, (res) => {
            if (res.error) {
              return
            }
          })
        }
      },
      onPlayerTimeupdate(e) {
        let vCurrentTime = Math.ceil(e.currentTime())
        if (vCurrentTime % 5 === 0) {
          // 5s记录一次播放时间
          if (this.vCurrentTime < vCurrentTime) {
            this.vCurrentTime = vCurrentTime
            this.timeStore(vCurrentTime)
            //记录视频播放进度
            this.progress = Math.round(this.vCurrentTime / this.videoTotalTime * 100) / 100
            this.updateRecord()
          }
        }
      },
      // 将播放时间接入本地缓存
      timeStore(time) {
        let timeArr = this.$local.videoCurrentTime() || []
        let videoObj
        for (let i = 0; i < timeArr.length; i++) {
          if (timeArr[i].id === this.videoId) {
            videoObj = timeArr[i]
          }
        }
        if (videoObj) {
          // video存在于缓存中
          if (time !== undefined) {
            // 存入time
            if (time > videoObj.currentTime || time === 0)
              videoObj.currentTime = time
            this.$local.videoCurrentTime(timeArr)
          } else {
            // 读取time
            return videoObj.currentTime
          }
        } else {
          // 不存在于缓存
          if (time !== undefined) {
            // 存入time
            timeArr.push({id: this.videoId, currentTime: time})
            this.$local.videoCurrentTime(timeArr)
          } else {
            // 读取time
            return ''
          }
        }
      },
      playerReadied(e) {
        let video = document.querySelector('video')
        video.setAttribute('x5-video-player-type', 'h5')
        // video.setAttribute('x5-video-player-fullscreen', false)
        video.setAttribute('x5-playsinline', true)
        video.setAttribute('playsinline', true)
        video.setAttribute('webkit-playsinline', true)
        video.setAttribute('preload', 'auto')
        video.setAttribute('x-webkit-airplay', true)

        // 给video标签增加属性
        this.videoTimeInterval = setInterval(() => {
          if (e.readyState() > 0) {
            this.videoTotalTime = e.duration()
            clearInterval(this.videoTimeInterval)
          }
        }, 500)
      },
      queryVideoDetail() {
        this.$model.datasys.getVideoDetail({id: this.videoId}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          let less = res.data.lesson
          less.studyRecord.timeDesc = util.fstr(less.lessonLength || 0)
          this.videoDetail = res.data.lesson
          this.playerOptions.sources[0].src = this.videoDetail.videoUrl
        })
      }
    },
    mounted() {
      if (!String(this.$route.id)) {
        this.$router.back()
      } else {
        this.queryVideoDetail()
        this.querySign()
      }
    }
  }
</script>

<style lang="less" scoped>
  article {
    padding-bottom: 50px;
  }

  .back {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.7;
  }

  .sign-wrap {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 5px;
    background-color: #fff;
    width: 80%;
    .sign-header {
      background-color: #ff473e;
      color: #fff;
      font-size: 16px;
      line-height: 45px;
      height: 45px;
      text-align: center;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .sign-cont {
      background-color: #fff;
      font-size: 14px;
      img {
        display: block;
        width: 45%;
        margin: 10px auto 20px;
      }
      .sign-title {
        color: #000;
        font-size: 14px;
      }
      .has-bf {
        color: #888;
        font-size: 13px;
        margin: 10px 0;
      }
      .sign-ccc {
        width: 80%;
        margin: 0 auto;
      }
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .btn-confi-sign {
      border-top: 1px solid #eee;
      position: relative;
      height: 45px;
      text-align: center;
      line-height: 45px;
    }
  }

  .btns-w {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .btn-w {
      flex: 1;
    }
    .dt {
      color: #fff;
      border-color: #c33636;
      background-color: #c33636;
    }
    .qd {
      color: #c33636;
      background-color: #fff;
    }
  }

  .video-js {
    width: 100% !important;
  }

  .class-title {
    background-color: #fff;
    .header-title {
      font-size: 18px;
      text-align: center;
      padding-top: 25px;
    }
    img {
      width: 60%;
      margin: 15px auto 20px;
    }

    .video-title-header {
      padding: 10px 20px;
      border-bottom: 1px solid #e9e9e9;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 12px;
      em {
        background: #e9e9e9;
        height: 16px;
        display: block;
        width: 1px;
      }
    }
  }

  .back-content {
    background-color: #fff;
    padding: 20px;
    margin: 10px 0;
  }
</style>
