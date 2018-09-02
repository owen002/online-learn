<template>
  <article>
    <section class="class-title">
      <div class="header-title">{{videoDetail.title}}</div>
      <img :src="videoDetail.coverUrl" alt="">
      <div class="video-title-header">
        <span>积分: {{videoDetail.point}}</span>
        <em></em>
        <span>时长: {{videoDetail.studyRecord.timeDesc}}</span>
        <em></em>
        <span>{{videoDetail.studyRecord.progress >= 1?'已完成':'未完成'}}</span>
      </div>
    </section>
    <section class="class-detail-wr">
      <header>
        讲师：{{videoDetail.teacher}}
      </header>
      <div class="tech-desc" v-html="videoDetail.teacherSummary"></div>
    </section>
    <section class="class-detail-wr">
      <header>
        授课学校
      </header>
      <div class="tech-desc">{{videoDetail.school}}</div>
    </section>
    <mu-button large class="start-btn" color="error" @click="start">开始学习</mu-button>
  </article>
</template>

<script>

  import util from '../../util/util'

  export default {
    name: 'coursedetail',
    components: {},
    data() {
      let q = this.$route.query
      return {
        videoId: q.id || '',
        videoDetail: {studyRecord: {}}
      }
    },
    methods: {
      start() {
        this.$router.push({name: 'coursevideo', query: {id: this.videoId}})
      },
      queryVideoDetail() {
        this.$model.datasys.getVideoDetail({id: this.videoId}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          let less = res.data.lesson
          let time = util.formatTime(less.lessonLength || 0)
          less.studyRecord.timeDesc = (time.hour ? time.hour + '时' : '') + (time.min ? time.min + '分' : '') + (time.sec ? time.sec + '秒' : '')
          this.videoDetail = res.data.lesson
        })
      }
    },
    mounted() {
      if (this.videoId) {
        this.queryVideoDetail()
      }
    }
  }
</script>

<style lang="less" scoped>
  article{
    padding-bottom: 40px;
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
      padding: 10px 0;
      margin: 0 20px;
      border-top: 1px solid #e9e9e9;
      display: flex;
      justify-content: space-between;
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

  .start-btn {
    width: 90%;
    margin: 15px auto 0;
    display: block;
  }

  .class-detail-wr {
    background-color: #fff;
    margin-top: 10px;
    padding: 15px;
    header {

    }
    .tech-desc {
      color: #909090;
      white-space: pre-line;
    }
  }
</style>
