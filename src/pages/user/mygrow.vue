<template>
  <article class="my-grow">
    <section class="grow-chart" @click="goDetail" v-if="growDetail">
      <ve-gauge :data="chartData" height="300px" :settings="chartSettings"></ve-gauge>
      <div class="growth-result">{{dengji}}</div>
    </section>
    <section class="my-sorts-data">
      <div class="class-w-header">
        <div class="class-sub-title">
          排名
        </div>
      </div>
      <div class="rate-data">
        <em>积分：{{ranking.score}}</em>
        <em>排名：{{ranking.place}}</em>
      </div>
    </section>
    <section class="my-sorts-data">
      <div class="class-w-header">
        <div class="class-sub-title">
          成长解读
        </div>
      </div>
      <div class="rewards-list">
        <timeline>
          <timeline-title v-if="growList.length>0" :bg-color="colorArr[0]">
            <em>{{growList[0].cycle}}</em>
            <span>得分{{growList[0].reateScore}}分，比上月{{growList[0].differenceScore>=0?'增加':'减少'}}{{Math.abs(growList[0].differenceScore)}}分</span>
          </timeline-title>
          <timeline-item v-for="grow,gindex in growList" :bg-color="colorArr[gindex%3]" v-if="gindex > 0">
            <em>{{grow.cycle}}</em>
            <span>得分{{grow.reateScore}}分，比上月{{grow.differenceScore>=0?'增加':'减少'}}{{Math.abs(grow.differenceScore)}}分</span>
          </timeline-item>
        </timeline>
      </div>
    </section>
    <section class="my-sorts-data">
      <div class="class-w-header" @click="goydzj">
        <div class="class-sub-title">
          我的月度足迹
        </div>
        <mu-ripple></mu-ripple>
        <mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>
      </div>
    </section>
  </article>
</template>

<script>
  import {Timeline, TimelineItem, TimelineTitle} from 'vue-cute-timeline'

  export default {
    name: 'mygrow',
    components: {
      Timeline,
      TimelineItem,
      TimelineTitle
    },
    data() {
      return {
        growDetail: '',
        chartData: {
          columns: ['type', 'value'],
          rows: [
            {type: '速度', value: 0}
          ]
        },
        colorArr: ['#91c7ae', '#63869e', '#c23531'],
        growList: [],
        chartSettings: {
          dimension: 'type',
          metrics: 'value',
          dataName: {
            '速度': ""
          },
          seriesMap: {
            '速度': {
              min: 0,
              max: 100,
              splitNumber: 10,
              radius: '80%',
              pointer: {
                shadowColor: '#fff',
                shadowBlur: 5
              }
            }
          }
        },
        ranking:{}
      }
    },
    computed: {
      dengji() {
        let score = this.chartData.rows[0].value
        if (score >= 80)
          return '优秀'
        if (70 <= score < 80)
          return '合格'
        if (60 <= score < 70)
          return '基本合格'
        return '不合格'
      }
    },
    methods: {
      goydzj(){
          this.$router.push({
              name:'mygrowmonth'
          })
      },
      goDetail() {
        this.$router.push({name: 'growdetail'})
      },
      queryGrowth() {
        this.$model.datasys.growth({}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          this.growList = res.data.list
          this.chartData.rows[0].value = this.growList[0].reateScore
          this.growDetail = this.growList[0]
          // 暂存
          this.$local.growthDetail(this.growList)
        })
      },
      findRanking() {
        this.$model.datasys.findRanking({type:2}, (res) => {
          if (res.error) {
            this.$alert(error)
            return
          }
          this.ranking = res.data.rankingVo
        })
      },
    },
    mounted() {
      this.queryGrowth()
      this.findRanking()
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
        position: relative;
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
