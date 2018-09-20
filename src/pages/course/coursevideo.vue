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
      <mu-button large class="btn-w qd" @click="qd" v-if="videoDetail.sign == 1">签到</mu-button>
      <mu-button large color="error" class="btn-w" @click="dt" v-if="videoDetail.questionNum > 0">随堂测验</mu-button>
    </div>
    <div v-show="signFlag">
      <div class="back"></div>
      <div class="sign-wrap1">
        <div class="sign-header">
          {{!emt.sign?'签到成功':'已签到'}}
        </div>
        <div class="sign-cont">
          <img src="../../assets/img/sign.png" alt="">
          <div class="sign-ccc">
            <div class="sign-title">{{videoDetail.title}}</div>
            <div class="has-bf" v-if="!emt.exam">
              已播放<em>{{ftime()||'0分钟'}}</em>
            </div>
            <div class="has-bf" v-else>
              签到时间：<em class="b-time">{{emt.signTime}}</em>
            </div>
          </div>
          <div class="btn-confi-sign" @click="contLearn">
            <mu-ripple></mu-ripple>
            <span>继续学习</span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="signFlag2">
      <div class="back"></div>
      <div class="sign-wrap2">
        <div class="sign-header">
          <div class="dt-hear">答题结束了</div>
          <div class="sign-h">
            <div class="tm-num">
              <div class="tm-r">答对</div>
              <div class="tm-n">{{emt.rightans}}</div>
            </div>
            <div class="tm-num">
              <div class="tm-r">答错</div>
              <div class="tm-n">{{emt.errorans}}</div>
            </div>
          </div>
        </div>
        <div class="sign-cont">
          <img src="../../assets/img/jb.png" alt="">
          <div class="right-titt">亲，您本次答对 <span style="color:#ff0000">{{emt.rightans}}</span>道题目</div>
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
        signFlag2: false,
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
          exam: false,
          signTime: '',
          rightans: 0,
          errorans: 0
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
        this.$model.datasys.checkSingAndExam({lessonId: this.videoId}, (res) => {
          if (res.error) {
            return
          }
          this.emt.sign = !res.data.sing
          this.emt.exam = !res.data.exam
          this.emt.signTime = res.data.signDate || ''
          this.emt.rightans = res.data.examScore
          this.emt.errorans = (res.data.totalNum - res.data.examScore) || 0
        })
      },
      ftime() {
        return util.fstr(this.yxtime)
      },
      dt() {
        if (this.emt.exam) {
          this.signFlag2 = true;
        } else {
          this.$router.push({
            name: 'exam',
            query: {
              lessionid: this.videoId,
              name: this.videoDetail.title
            }
          })
        }
      },
      qd() {
        if (this.emt.sign) {
          this.signFlag = true
        } else {
          // 判断是否在有效期
          let startTime = new Date(this.videoDetail.signBegin.replace(/\-/g, '/'))
          let endTime = new Date(this.videoDetail.signEnd.replace(/\-/g, '/'))
          let now = new Date()
          if (now > startTime && now < endTime) {
            // 有效期内
            this.$model.datasys.signVideo({lessonId: this.videoId}, (res) => {
              this.emt.signTime = util.formatDate(new Date(),'YYYY-MM-dd hh:mm')
              this.emt.sign = true
              if (res.error) {
                this.$alert(res.error)
                return
              }
              this.signFlag = true
            })
          } else {
            this.$alert('已超出签到时间')
          }
        }
      },
      contLearn() {
        this.signFlag = false
        this.signFlag2 = false
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

  .sign-wrap1 {
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
        .b-time{
          color:#ff0000;
        }
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

  .sign-wrap2 {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 5px;
    background-color: #fff;
    width: 80%;
    .sign-header {
      background-color: #fb4c4c;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      height: 150px;
    }
    .dt-hear {
      height: 50px;
      line-height: 50px;
      color: #fff;
      text-align: center;
      margin: 0 auto;
    }
    .sign-h {
      display: flex;
      justify-content: center;
    }
    .tm-num {
      text-align: center;
      margin: 0 10%;
      color: #fff;
    }
    .tm-n {
      height: 40px;
      background-color: #fff;
      color: #e65049;
      border-radius: 4px;
      line-height: 40px;
      margin-top: 10px;
      font-size: 25px;
      width: 36px;
    }
    .sign-cont {
      background-color: #fff;
      font-size: 14px;
      img {
        display: block;
        width: 60px;
        margin: 15px auto;
      }
      .right-titt{
        text-align: center;
        color: #333;
        margin-bottom: 20px;
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
      color: #f44336;
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
