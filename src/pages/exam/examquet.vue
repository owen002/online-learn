<template>
  <article>
    <div>
      <header>
        <div class="exam">{{name}}</div>
        <div class="total-t">
          <mu-icon value="dvr" style="color:#fff;"></mu-icon>
          <em>
            {{currentIndex + 1}}/{{paper.length}}
          </em>
        </div>
      </header>
      <section class="p-conent">
        <div class="p-title">
          <em class="tm-type">{{pitem.ptype=='2'?'多选题':'单选题'}}</em>
          <span class="tm-title">{{pitem.question}}</span>
        </div>
        <div class="tm-cont">
          <div class="tm-img">
            <img src="//img1.mukewang.com/szimg/5b9b4b880001ebc409000300.jpg" alt="">
          </div>
          <div class="tm-ct" v-for="kitem in pitem.ansArr">
            <div class="xx-item">
              <mu-radio v-model="item.radio" :value="kitem.key" v-if="pitem.ptype=='1'"></mu-radio>
              <mu-checkbox v-model="item.check" :value="kitem.key" v-if="pitem.ptype=='2'"></mu-checkbox>
              <div class="r-val">{{kitem.key+'：'+kitem.val}}</div>
            </div>
          </div>
        </div>
        <div class="act-wrap">
          <div class="action-btn">
            <mu-button small class="ac-bt" color="primary" @click="go(-1)" v-if="prevAvb">上一题</mu-button>
            <mu-button small class="ac-bt" disabled v-else>上一题</mu-button>
            <mu-button small class="ac-bt" color="success" @click="go(1)" v-if="nextAvb">下一题</mu-button>
            <mu-button small class="ac-bt" disabled v-else>下一题</mu-button>
          </div>
          <mu-button large class="submit-btn" color="error" @click="submit" v-if="currentIndex == paper.length - 1">提交
          </mu-button>
        </div>
      </section>
    </div>

  </article>
</template>
<script>
  import util from '../../util/util'

  export default {
    name: 'examquet',
    components: {},
    data() {
      let q = this.$route.query
      return {
        item: {
          radio: '',
          check: []
        },
        id: q.id,
        pid: q.pid,
        name:q.name,
        paper: [],
        currentIndex: 0,
        totalTime:0,
        ttid:0
      }
    },
    computed: {
      pitem() {
        return this.paper[this.currentIndex] || {}
      },
      nextAvb() {
        return this.currentIndex < this.paper.length - 1
      },
      prevAvb() {
        return this.currentIndex > 0
      }
    },
    watch: {
      currentIndex(nv, ov) {
        let pp = this.paper[nv]
        let selectAr = pp.selectAns
        if (pp.ptype == '2') {
          this.item.check = selectAr
        } else {
          this.item.radio = selectAr.join('')
        }
      }
    },
    methods: {
      go(ind) {
        if (0 <= (ind + this.currentIndex) <= this.paper.length - 1) {
          // 将答案保存
          this.saveAns()
          this.currentIndex = this.currentIndex + ind
        }
      },
      saveAns() {
        let pap = this.paper[this.currentIndex]
        pap.selectAns = []
        if (pap.ptype == 1) {
          if(this.item.radio){
            pap.selectAns.push(this.item.radio)
          }
        } else {
          this.item.check.forEach((r) => {
            pap.selectAns.push(r)
          })
        }
      },
      calScore() {
        let totalScore = 0
        for (let paper of this.paper) {
          if (paper.answer === paper.selectAns.join(',')) {
            totalScore += paper.score
          }
        }
        return totalScore
      },
      fsub() {
        let score = this.calScore()
        this.$model.datasys.subPaper({id: this.id, costTime: this.totalTime, examScore: score}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          this.$router.push({
            name:'examresult',
            query:{
              score:score,
              time:this.totalTime,
              name:this.name
            }
          })
        })
      },
      submit() {
        // 计算总得分
        let that = this
        // 保存最后一题
        this.saveAns()
        let hasNoAns = this.paper.filter((r) => {
            return r.selectAns.length <= 0
          }).length > 0
        if (hasNoAns) {
          this.$confirm('您还有未完成得题目,确认提交答案？', {
            beforeClose: function (e) {
              if (e) {
                if(that.ttid){
                  clearTimeout(that.ttid)
                }
                that.fsub()
              }
              this.close()
            }
          })
        } else {
          this.$confirm('您的题目已全部完成,确认提交答案？', {
            beforeClose: function (e) {
              if (e) {
                that.fsub()
              }
              this.close()
            }
          })
        }
      },
      parseData(data) {
        for (let d of data) {
          // 判断题目类型 1 单选  2 多选
          d.ptype = d.answer.indexOf(',') >= 0 ? '2' : '1'
          let anskey = Object.keys(d).filter((r) => {
            return r.indexOf('option') >= 0
          })
          let ansArr = []
          anskey.map((r) => {
            let keyItem = r.replace(/option/g, '')
            ansArr.push({
              key: keyItem,
              val: d[r]
            })
          })
          d.ansArr = ansArr
          d.selectAns = []
        }
        return data
      },
      queryExam(id) {
        this.$model.datasys.getPaperDetail({id}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          let list = res.data.list
          this.paper = this.parseData(list)
        })
      },
      caltime(){
        this.ttid = setTimeout(()=>{
          this.totalTime = this.totalTime + 1;
          this.caltime()
        },1000)
      }
    },
    mounted() {
      let pid = this.$route.query.pid
      let id = this.$route.query.id
      if (pid && id) {
        this.queryExam(pid)
        this.caltime()
      } else {
        this.$router.back()
      }
    }
  }
</script>

<style lang="less" scoped>
  i {
    font-style: normal;
  }

  article {
  header {
    padding: 10px 15px;
    background-color: #f44336;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  .exam {
    font-size: 16px;
  }
  .total-t {
    display: flex;
    align-items: center;
  em {
    margin-left: 10px;
    font-size: 14px;
  }
  }
  }
  .r-val {
    line-height: 26px;
    margin-left: 5px;
  }
  .p-conent {
    padding: 10px 15px 25px;
  .p-title {
    padding: 10px 0;
    line-height: 26px;
  }
  .tm-type {
    font-size: 12px;
    background: #f44336;
    color: #fff;
    padding: 3px 7px;
    border-radius: 3px;
    margin-right: 8px;
  }
  .tm-title {

  }
  .tm-cont {
  .tm-img {
  img {
    display: block;
    width: 100%;
  }
  }
  .tm-ct {
    margin-top: 10px;
  .xx-item {
    padding: 8px 0;
    display: flex;
  }
  }
  }
  }
  .act-wrap {
    margin-top: 20px;
  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  .ac-bt {
    margin: 0 10px
  }
  }
  }
  .submit-btn {
    width: 100%;
    display: block;
    margin: 20px auto 0;
  }
  }
</style>
