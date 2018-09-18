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
          <div class="tm-img" v-if="pitem.imgSrc">
            <img :src="pitem.imgSrc" alt="">
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
          <div v-if="isVideoType" class="res-v">
            <mu-icon value="done" class="done-icon"></mu-icon>
            <span>{{right.length}}</span>
            <mu-icon value="clear" class="clear-icon"></mu-icon>
            <span>{{error.length}}</span>
          </div>
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
    <div v-show="signFlag">
      <div class="back"></div>
      <div class="sign-wrap">
        <div class="sign-header">
          <div class="dt-hear">答题结束了</div>
          <div class="sign-h">
            <div class="tm-num">
              <div class="tm-r">答对</div>
              <div class="tm-n">{{right.length}}</div>
            </div>
            <div class="tm-num">
              <div class="tm-r">答错</div>
              <div class="tm-n">{{error.length}}</div>
            </div>
          </div>
        </div>
        <div class="sign-cont">
          <img src="../../assets/img/res.png" alt="">
          <div class="btn-confi-sign" @click="goLearn">
            <mu-ripple></mu-ripple>
            <span>继续学习</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
  import util from '../../util/util'

  export default {
    name: 'exam',
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
        name: q.name,
        paper: [],
        currentIndex: 0,
        totalTime: 0,
        ttid: 0,
        lessionid: q.lessionid,
        right: [],
        error: [],
        signFlag: false
      }
    },
    computed: {
      isVideoType() {
        return !!this.$route.query.lessionid
      },
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
      goLearn(){
        this.signFlag = false;
        this.$router.back()
      },
      checkArr(){
        let rightAns = this.paper[this.currentIndex].answer
        let currentAns = this.paper[this.currentIndex].selectAns.join(',')
        let eindex = this.error.indexOf(this.currentIndex)
        let rindex = this.right.indexOf(this.currentIndex)
        if (rightAns === currentAns) {
          // 如果是错的 删除错误
          if (eindex >= 0) {
            this.error.splice(eindex, 1)
          }
          // 正确
          if (rindex < 0) {
            this.right.push(this.currentIndex)
          }
        } else {
          // 如果是对的 删除
          if (rindex >= 0) {
            this.right.splice(rindex, 1)
          }
          if (eindex < 0) {
            this.error.push(this.currentIndex)
          }
        }
      },
      go(ind) {
        if (0 <= (ind + this.currentIndex) <= this.paper.length - 1) {
          // 将答案保存
          this.saveAns()
          //如果是视频答题 check答案
          if (this.isVideoType) {
            this.checkArr()
          }

          this.currentIndex = this.currentIndex + ind
        }
      },
      saveAns() {
        let pap = this.paper[this.currentIndex]
        pap.selectAns = []
        if (pap.ptype == 1) {
          if (this.item.radio) {
            pap.selectAns.push(this.item.radio)
          }
        } else {
          // 答案排序
          this.item.check = this.item.check.sort()
          this.item.check.forEach((r) => {
            pap.selectAns.push(r)
          })
        }
      },
      calScore() {
        let totalScore = 0
        for (let paper of this.paper) {
          if (paper.answer === paper.selectAns.join(',')) {
            if(this.isVideoType){
              totalScore += 1
            }else{
              totalScore += paper.score
            }
          }
        }
        return totalScore
      },
      fsub() {
        let score = this.calScore()
        if (this.isVideoType) {
          this.$model.datasys.subVideoQuestion({lessonId: this.lessionid, examScore: score}, (res) => {
            if (res.error) {
              this.$alert(res.error)
              return
            }
            this.signFlag = true
          })
        } else {
          this.$model.datasys.subPaper({id: this.id, costTime: this.totalTime, examScore: score}, (res) => {
            if (res.error) {
              this.$alert(res.error)
              return
            }
            this.$router.push({
              name: 'examresult',
              query: {
                score: score,
                time: this.totalTime,
                name: this.name
              }
            })
          })
        }
      },
      submit() {
        // 计算总得分
        let that = this
        // 保存最后一题
        this.saveAns()
        if (this.isVideoType) {
          this.checkArr()
        }

        let hasNoAns = this.paper.filter((r) => {
          return r.selectAns.length <= 0
        }).length > 0
        if (hasNoAns) {
          this.$confirm('您还有未完成得题目,确认提交答案？', {
            beforeClose: function (e) {
              if (e) {
                if (that.ttid) {
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
      queryVideoExam(id) {
        this.$model.datasys.videoQuestion({lessonId: id}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          let list = res.data.list
          this.paper = this.parseData(list)
        })
      },
      caltime() {
        this.ttid = setTimeout(() => {
          this.totalTime = this.totalTime + 1;
          this.caltime()
        }, 1000)
      }
    },
    mounted() {
      if (this.isVideoType) {
        this.queryVideoExam(this.lessionid)
      } else {
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
  }
</script>

<style lang="less" scoped>
  i {
    font-style: normal;
  }

  article {
    .done-icon {
      color: #4c94f7;
      margin-right: 2px;
    }
    .clear-icon {
      color: #ff0000;
      margin-left: 20px;
      margin-right: 2px;
    }
    .res-v {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
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
      margin-top: 15px;
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
    .sign-header{
      background-color: #fb4c4c;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      height:150px;
    }
    .dt-hear{
      height:50px;
      line-height: 50px;
      color:#fff;
      text-align: center;
      margin:0 auto;
    }
    .sign-h {
      display: flex;
      justify-content: center;
    }
    .tm-num{
      text-align: center;
      margin: 0 10%;
      color:#fff;
    }
    .tm-n{
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
        width: 45%;
        margin: 10px auto 20px;
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
</style>
