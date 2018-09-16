<template>
  <article>
    <header>
      太仓烟草的发展离不开您的智慧和贡献，如果您有关于建设发展的建议和意见，请给我来信
    </header>
    <section>
      <mu-container class="sj-content">

        <mu-text-field v-model="title" placeholder="请输入标题" icon="notes" full-width></mu-text-field>
        <br/>
        <mu-text-field class="mu-txt" v-model="content" multi-line :rows="7" icon="comment" placeholder="请输入内容"
                       full-width></mu-text-field>

        <br/>
        <div class="sj-wrap">
          <mu-checkbox v-model="nmFlag" value="2"></mu-checkbox>
          <div class="nm-fl">匿名提交</div>
        </div>
      </mu-container>
    </section>
    <mu-button large class="submit-btn" color="error" @click="submit">发送</mu-button>
  </article>
</template>

<script>

  export default {
    name: 'shujixinxiang',
    data() {
      return {
        title: '',
        content: '',
        nmFlag: []
      }
    },
    methods: {
      submit() {
        if (!this.title) {
          this.$alert('请输入标题')
          return
        }
        if (!this.content) {
          this.$alert('请输入内容')
          return
        }
        let that = this
        this.$model.datasys.mailSend({
          title: this.title,
          content: this.content,
          type: this.nmFlag.join('') || ''
        }, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          this.$alert('提交成功', {
            beforeClose: function () {
              this.close()
              that.$router.push({
                name: 'index'
              })
            }
          })
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>

  .mu-txt {
    margin-bottom: 5px;
  }

  article {
    margin: 0 auto;
    background: #fff;
    padding: 20px 10px;
    header {
      padding: 0 20px;
      font-size: 16px;
    }
    section {
      .sj-wrap {
        padding: 0 18px;
        display: flex;
        align-items: center;
        color: #7d7d7d;
        .nm-fl {
          margin-left: 18px;
        }
      }
      .sj-content {
        width: 100%;
        margin: 40px 0 0 -10px;
      }
    }
    .submit-btn {
      width: 90%;
      display: block;
      margin: 15px auto 0;
    }
  }
</style>
