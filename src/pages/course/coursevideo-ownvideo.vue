<template>
  <article>
    <section class="class-title">
      <v-video :video-src="playerOptions.sources[0].src" @ready="playerReadied" @end="onPlayerEnded" @update="onPlayerTimeupdate"></v-video>
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
  </article>
</template>

<script>
  import vVideo from '../../components/v-video.vue'
  import util from '../../util/util'

  export default {
    name: 'coursevideo',
    components: {
      vVideo
    },
    data() {
      let q = this.$route.query
      return {
        videoDetail: {studyRecord: {}},
        playerOptions: {
          sources: [{
            src: ''
          }]
        },
        videoTotalTime: 0,
        vCurrentTime: 0,
        videoId: q.id || '',
        progress: 0,
        vEnd: false,
      }
    },
    computed: {
      splitTime() {
        return this.videoTotalTime / 5
      }
    },
    methods: {
      onPlayerEnded() {
        this.timeStore(0)
        this.progress = 1
        this.vEnd = true
        this.updateRecord()
      },
      updateCurrentTime(sec) {
        let vid = document.querySelector('video')
        vid.currentTime = sec;
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
        let vCurrentTime = Math.floor(e.currentTime)
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
      playerReadied(e) {
        // 给video标签增加属性
        this.videoTotalTime = e.duration
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
        // e.currentTime(this.vCurrentTime)
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
      queryVideoDetail() {
        this.$model.datasys.getVideoDetail({id: this.videoId}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          let less = res.data.lesson
          let time = util.formatTime(less.lessonLength || 0)
          less.studyRecord.timeDesc = (time.hour ? time.hour + '时' : '') + (time.min ? time.min + '分' : '')
            + (time.sec ? time.sec + '秒' : '')
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
      }
    }
  }
</script>

<style lang="less" scoped>
  .video-js {
    width: 100% !important;
  }

  .class-title {
    background-color: #fff;
  }

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
  }

  em {
    background: #e9e9e9;
    height: 16px;
    display: block;
    width: 1px;
  }

  .back-content {
    background-color: #fff;
    padding: 20px;
    margin: 10px 0;
  }
</style>
