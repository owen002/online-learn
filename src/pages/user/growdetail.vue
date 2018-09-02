<template>
  <article class="my-grow">
    <section class="grow-chart">
      <em>红色先锋·点滴积累</em>
      <ve-radar :data="chartData" :settings="chartSettings" height="360px" :legend-visible="false"
                :radius="[30,'40%']"></ve-radar>
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
  export default {
    name: 'growdetail',
    data() {
      this.chartSettings = {
        labelMap: {
          polity: '政治能力',
          innovate: '服务群众能力',
          analysis: '业务融合能力',
          plan: '计划执行能力',
          communicate: '创新管理',
        },
        areaStyle: {
          color: 'rgba(2, 143, 255, 0.32)'
        },
        lineStyle: {
          color: '#ff6960'
        },
        itemStyle: {
          color: '#ffa76d'
        },
        radius: '40%'
      }

      this.chartSettings2 = {
        stack: {'用户': ['访问用户', '下单用户']},
        area: true
      }
      return {
        chartData: {
          columns: ['id', 'polity', 'innovate', 'analysis', 'plan', 'communicate'],
          rows: [
            {id: 1, polity: 22, innovate: 1393, analysis: 1093, plan: 32, communicate: 22}
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
        this.chartData.rows[0].polity = this.currentGrow.zznl
        this.chartData.rows[0].innovate = this.currentGrow.fwqznl
        this.chartData.rows[0].analysis = this.currentGrow.ywrhnl
        this.chartData.rows[0].plan = this.currentGrow.jhzxnl
        this.chartData.rows[0].communicate = this.currentGrow.cxgl

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
      padding: 20px 20px 0;
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
