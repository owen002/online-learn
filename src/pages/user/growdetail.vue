<template>
  <article class="my-grow">
    <section class="grow-chart">
      <em>红色先锋·点滴积累</em>
      <section>
        <chart :options="scoreRadar" auto-resize/>
      </section>
      <!--<ve-radar :data="chartData" :settings="chartSettings" height="360px" :legend-visible="false"
                :radius="[30,'40%']"></ve-radar>-->
    </section>
    <section class="my-sorts-data">
      <div class="class-w-header">
        <div class="class-sub-title">
          成长解读
        </div>
      </div>
      <div class="grow-charts-line">
        <ve-line :data="chartData2" :settings="chartSettings2"></ve-line>
      </div>
    </section>
  </article>
</template>

<script>
  import 'echarts/lib/chart/radar'
  // import ECharts from 'vue-echarts/components/ECharts'
  import ECharts from '../../components/ECharts'

  export default {
    components: {
      chart: ECharts
    },
    name: 'growdetail',
    data() {
      return {
        chartSettings: {
          labelMap: {
            polity: '政治能力',
            innovate: '服务群众能力',
            analysis: '业务融合能力',
            plan: '计划执行能力',
            communicate: '创新管理',
          },
          lineStyle: {
            color: '#ff0000'
          },
          radius: '40%'
        },
        chartSettings2: {
          area: true
        },
        scoreRadar: {
          radar: {
            indicator: [],
            radius: '70%'
          },
          series: [{
            name: '能力值',
            type: 'radar',
            data: []
          }]
        },
        chartData: {
          columns: ['id', 'polity', 'innovate', 'analysis', 'plan', 'communicate'],
          rows: [
            {id: 1, polity: 1, innovate: 1, analysis: 1, plan: 1, communicate: 1},
            {id: 2, polity: 0, innovate: 0, analysis: 0, plan: 0, communicate: 0}
          ]
        },
        chartData2: {
          columns: ['日期', '政治能力', '服务群众能力', '业务融合能力', '计划执行能力', '创新管理'],
          rows: []
        },
        growList: [],
        currentGrow: {}
      }
    },
    methods: {
      queryGrowth() {
        this.$model.datasys.growth({}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          this.growList = res.data.list
        })
      },
      solveDate() {
        this.chartData.rows[0].polity = this.currentGrow.zznlT
        this.chartData.rows[0].innovate = this.currentGrow.fwqznlT
        this.chartData.rows[0].analysis = this.currentGrow.ywrhnlT
        this.chartData.rows[0].plan = this.currentGrow.jhzxnlT
        this.chartData.rows[0].communicate = this.currentGrow.cxglT

        this.chartData.rows[1].polity = this.currentGrow.zznl
        this.chartData.rows[1].innovate = this.currentGrow.fwqznl
        this.chartData.rows[1].analysis = this.currentGrow.ywrhnl
        this.chartData.rows[1].plan = this.currentGrow.jhzxnl
        this.chartData.rows[1].communicate = this.currentGrow.cxgl
        //
        let scores = [
          {name: '政治能力', max: this.currentGrow.zznlT, value: this.currentGrow.zznl},
          {name: '服务群众', max: this.currentGrow.fwqznlT, value: this.currentGrow.fwqznl},
          {name: '业务融合', max: this.currentGrow.ywrhnlT, value: this.currentGrow.ywrhnl},
          {name: '计划执行', max: this.currentGrow.jhzxnlT, value: this.currentGrow.jhzxnl},
          {name: '创新管理', max: this.currentGrow.cxglT, value: this.currentGrow.cxgl}
        ]
        this.scoreRadar.radar.indicator = scores.map(({name, max}) => {
          return {name, max}
        })
        this.scoreRadar.series[0].data[0] = {value: scores.map(({value}) => value)}
        //
        for (let i = this.growList.length - 1; i >= 0; i--) {
          let gr = this.growList[i]
          this.chartData2.rows.push({
            '日期': gr.cycle, '政治能力': gr.zznl,
            '服务群众能力': gr.fwqznl, '业务融合能力': gr.ywrhnl, '计划执行能力': gr.jhzxnl, '创新管理': gr.cxgl
          })
        }
      }
    },
    mounted() {
      this.growList = this.$local.growthDetail()
      if (!this.growList) {
        this.$router.back()
      }
      this.currentGrow = this.growList[0]
      this.solveDate()
    }
  }
</script>

<style lang="less" scoped>
  @color-red: #ff4545;
  .my-grow {
    height: 100%;
    background-color: #eaeaea;
    .grow-chart {
      position: relative;
      background-color: #fff;
      padding: 20px 0;
      em {
        width: 200px;
        display: block;
        text-align: center;
        margin: 0 auto 5px;
        font-size: 16px;
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
      .grow-charts-line {
        padding: 10px 5px;
      }
    }
  }

</style>
