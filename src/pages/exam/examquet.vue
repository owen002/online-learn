<template>
  <article>
    <section class="item-header">
      <span class="item-sort">选择题</span>
      <span class="class=">
        单选题的题目是什么呢斐林试剂分开来的健身房，玩儿玩儿你选几个花开风华高科，开始的飞机客户是否渴望
      </span>
    </section>
    <section class="item-comte">
      <div class="item-wrap">
        <div class="item-tt">A</div>
        <div class="item-cot">我是A选项</div>
      </div>
      <div class="item-wrap">
        <div class="item-tt">A</div>
        <div class="item-cot">我是A选项</div>
      </div>
      <div class="item-wrap">
        <div class="item-tt">A</div>
        <div class="item-cot">我是A选项</div>
      </div>
    </section>
    <section>
      <mu-form :model="form" class="mu-demo-form">
        <mu-form-item prop="radio" label="Radio">
          <div><mu-radio v-model="form.radio" value="male" label="Male"></mu-radio></div>
          <div><mu-radio v-model="form.radio" value="female" label="Female"></mu-radio></div>
        </mu-form-item>
        <mu-form-item prop="checkbox" label="Checkbox">
          <mu-checkbox v-model="form.checkbox" value="eat" label="Eat"></mu-checkbox>
          <mu-checkbox v-model="form.checkbox" value="sleep" label="Sleep"></mu-checkbox>
          <mu-checkbox v-model="form.checkbox" value="run" label="Run"></mu-checkbox>
          <mu-checkbox v-model="form.checkbox" value="movie" label="Movie"></mu-checkbox>
        </mu-form-item>
      </mu-form>
    </section>
    <button>提交</button>
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
        videoId: q.id || '',
        videoDetail: {studyRecord: {}},
        form: {
          radio: '',
          checkbox: []
        }
      }
    },
    methods: {
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
  article {
    min-height: 100%;
    padding-bottom: 40px;
    background-color: #fff;
  }
</style>
