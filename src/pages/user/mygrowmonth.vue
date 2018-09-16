<template>
  <article class="my-grow">
    <div class="header-my">
      <div class="m-prev mt" @click="mon(-1)">
        <mu-ripple></mu-ripple>
        前一月
      </div>
      <div class="tit">{{currentDateStr}}</div>
      <div class="m-next mt" @click="mon(1)">
        <mu-ripple></mu-ripple>
        后一月
      </div>
    </div>
    <section class="my-sorts-data" v-if="activity.length > 0">
      <div class="class-w-header">
        <div class="class-sub-title">
          活动
        </div>
      </div>
      <div class="rewards-list">
        <timeline>
          <timeline-item v-for="grow,gindex in activity" :bg-color="colorArr[gindex%3]">
            <em>{{grow.day}}</em>
            <span>{{grow.name}}</span>
          </timeline-item>
        </timeline>
      </div>
    </section>
    <section class="my-sorts-data" v-if="exam.length > 0">
      <div class="class-w-header">
        <div class="class-sub-title">
          测评
        </div>
      </div>
      <div class="rewards-list">
        <timeline>
          <timeline-item v-for="grow,gindex in exam" :bg-color="colorArr[gindex%3]">
            <em>{{grow.day}}</em>
            <span>{{grow.name}}</span>
          </timeline-item>
        </timeline>
      </div>
    </section>
    <section class="my-sorts-data" v-if="video.length > 0">
      <div class="class-w-header">
        <div class="class-sub-title">
          视频
        </div>
      </div>
      <div class="rewards-list">
        <timeline>
          <timeline-item v-for="grow,gindex in video" :bg-color="colorArr[gindex%3]">
            <em>{{grow.day}}</em>
            <span>{{grow.name}}</span>
          </timeline-item>
        </timeline>
      </div>
    </section>
  </article>
</template>

<script>
  import {Timeline, TimelineItem, TimelineTitle} from 'vue-cute-timeline'
  import util from '../../util/util'

  export default {
    name: 'mygrowmonth',
    components: {
      Timeline,
      TimelineItem,
      TimelineTitle
    },
    data() {
      return {
        growDetail: '',
        growList: [],
        colorArr: ['#91c7ae', '#63869e', '#c23531'],
        currentDate: '',
        currentDateStr:'',
        activity:[],
        exam:[],
        video:[],
        loading:''
      }
    },
    computed: {},
    methods: {
      mon(i) {
        this.currentDate.setMonth(this.currentDate.getMonth() + i)
        this.currentDateStr = util.formatDate(this.currentDate, 'YYYY-MM')
        this.queryGrowth()
      },
      queryGrowth() {
        this.loading = this.$loading()
        this.$model.datasys.getMonthList({type:this.currentDateStr}, (res) => {
          this.loading.close()
          if (res.error) {
            this.$alert(res.error)
            return
          }
          this.activity = res.data.activityFootPrintList
          this.exam = res.data.examFootPrintList
          this.video = res.data.videoFootPrintList
        })
      }
    },
    mounted() {
      this.currentDate = new Date()
      this.currentDateStr = util.formatDate(this.currentDate, 'YYYY-MM')
      this.queryGrowth()
    }
  }
</script>

<style lang="less" scoped>
  @color-red: #ff4545;
  .timeline-title-circle {
    top: 0;
  }

  .my-grow {
    height: 100%;
    background-color: #eaeaea;
    .header-my {
      display: flex;
      text-align: center;
      justify-content: space-between;
      background-color: #fff;
      align-items: center;
      height: 40px;
      line-height: 40px;
      .mt {
        position: relative;
        width: 70px;
        color: #797979;
      }
      .tit {
        color: #63869e;
      }
    }
    .grow-chart {
      position: relative;
      background-color: #fff;
      .growth-result {
        position: absolute;
        color: #fff;
        background-color: @color-red;
        width: 80px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        left: 50%;
        margin-left: -40px;
        bottom: 20px;
        border-radius: 2px;
      }
    }
    .my-sorts-data {
      background-color: #fff;
      margin: 10px 0;
      padding: 10px 0;
      .class-w-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        height: 24px;
        .class-sub-title {
          border-left: 4px solid @color-red;
          padding-left: 15px;
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
      .rate-data {
        padding: 0 15px;
        display: flex;
        margin-top: 10px;
        em {
          width: 50%;
        }
      }
    }
  }

</style>
