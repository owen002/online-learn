<template>
  <article>
    <section>
      <mu-tabs :value.sync="tabIndex" full-width center color="#f44336" indicator-color="#00f9ff">
        <mu-tab>待测评</mu-tab>
        <mu-tab>已完成</mu-tab>
      </mu-tabs>
    </section>
    <div>
      <!--<header class="paper-time">-->
      <!--2015年12月10日-->
      <!--</header>-->
      <div class="paper-wrap need-p" v-show="tabIndex === 0">
        <section class="paper-cont" @click="goPaper(paper.paperId,paper.id,paper.examName,paper)" v-for="paper in needExam">
          <mu-ripple></mu-ripple>
          <div class="paper-left">
            <div class="paper-title">
              {{paper.examName}}
            </div>
            <div class="paper-dd">
              <em>限时</em>
              <i>{{caltime(paper.examLength)}}</i>
              <em>题数</em>
              <i>{{paper.questionNum}}题</i>
              <em>总分</em>
              <i>{{paper.totalScore}}分</i>
            </div>
            <div class="jzskj" v-if="nowTime < paper.starttime">
              开始时间：{{paper.validDateBegin}}
            </div>
            <div class="jzskj" v-else>
              截止时间：{{paper.validDateEnd}}
            </div>
          </div>
          <div class="paper-write">
            <mu-icon value="launch"></mu-icon>
          </div>
        </section>
      </div>
      <div class="paper-wrap no-need-p" v-show="tabIndex === 1">
        <section class="paper-cont" v-for="paper in hasExam">
          <div class="paper-left">
            <div class="paper-title">
              {{paper.examName}}
            </div>
            <div class="paper-dd">
              <em>题数</em>
              <i>{{paper.questionNum}}题</i>
              <em>总分</em>
              <i>{{paper.totalScore}}分</i>
            </div>
            <div class="jzskj" v-if="paper.examDate">
              考试时间：{{paper.examDate}}
            </div>
          </div>
          <div class="paper-write has-w">
            <span v-if="String(paper.status) === '2'">缺考</span>
            <span v-if="String(paper.status) !== '2'">{{paper.examScore}}分</span>
          </div>
        </section>
      </div>
    </div>
  </article>
</template>

<script>

  import util from '../../util/util'

  export default {
    name: 'paper',
    components: {},
    data() {
      let q = this.$route.query
      return {
        tabIndex: 0,
        needExam: [],
        hasExam: [],
        timeType:'',
        canJump:false,
        nowTime:''
      }
    },
    methods: {
      setNowTime(){
        this.nowTime = new Date().getTime()
      },
      caltime(s) {
        let t = util.fstr(s)
        return t
      },
      goPaper(pid, id, name,paper) {
        let nowD = new Date().getTime()
        if(nowD > paper.starttime && nowD < paper.endtime){
          this.$router.push({
            name: 'exam',
            query: {
              pid,
              id,
              name
            }
          })
        }
      },
      queryPaper(type) {
        this.$model.datasys.getPaperList({type}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          if (type === 1) {
            // 待测评
            let list = res.data.list || []
            list.map((r)=>{
              let starttime = new Date(r.validDateBegin.replace(/\-/g,'\/'))
              let endtime = new Date(r.validDateEnd.replace(/\-/g,'\/'))
              r.starttime = starttime.getTime()
              r.endtime = endtime.getTime()
            })
            console.log(list)
            this.needExam = list
          } else {
            // 已测评
            this.hasExam = res.data.list || []
          }
        })
      }
    },
    mounted() {
      this.setNowTime()
      this.queryPaper(1)
      this.queryPaper(2)
    }
  }
</script>

<style lang="less" scoped>
  i {
    font-style: normal;
  }

  article {
    min-height: 100%;
    padding-bottom: 30px;
    background-color: #fff;
    .paper-time {
      background-color: #f3f3f3;
      color: #989898;
      padding: 5px 10px;
      font-size: 12px;
    }
    .paper-cont {
      position: relative;
      padding: 10px 0;
      margin: 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-bottom: 1px solid #eee;
      .paper-left {
        flex: 1;
        .paper-title {
          font-size: 16px;
          color: #000;
        }
        .paper-dd {
          font-size: 12px;
          color: #929292;
          margin: 4px 0;
          display: flex;
          align-items: center;
          em {
            margin-right: 2px
          }
          i {
            margin-right: 8px
          }
        }
        .jzskj {
          font-size: 12px;
          color: #f00;
        }
      }
      .paper-write {
        border-left: 1px solid #6b6b6b;
        margin-left: 15px;
        padding-left: 10px;
        height: 50px;
        font-size: 33px;
        width: 50px;
        color: #6b6b6b;
        text-align: right;
      }
      .has-w {
        font-size: 13px;
        line-height: 52px;
        color: #f44336;
      }
    }
  }
</style>
