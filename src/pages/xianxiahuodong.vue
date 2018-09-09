<template>
  <article class="xx-article">
    <header class="xx-header">
      请填写活动相关信息
    </header>
    <section class="xx-my-inf-tc-warp">
      <div class="xx-my-info-item-w">
        <mu-list>
          <mu-list-item button class="xx-list-item-w">
            <mu-list-item-title>
              <div class="xx-info-item">
                <em>活动标题</em>
                <p>
                  <mu-text-field v-model="title"></mu-text-field>
                </p>
              </div>
            </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="xx-list-item-w">
            <mu-list-item-title>
              <div class="xx-info-item">
                <em>活动日期</em>
                <p>
                  <mu-date-input v-model="date" container="bottomSheet" underline-color="#fff"
                                 full-width></mu-date-input>
                </p>
              </div>
            </mu-list-item-title>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item>
          <mu-list-item button class="xx-list-item-w">
            <mu-list-item-title>
              <div class="xx-info-item">
                <em>参与人员</em>
                <p>
                  <mu-text-field v-model="member"></mu-text-field>
                </p>
              </div>
            </mu-list-item-title>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item>
        </mu-list>
        <mu-list class="m-l">
          <div class="act-title">
            活动地址
          </div>
          <div class="act-cont">
            <textarea class="xx-textarea"></textarea>
          </div>
        </mu-list>
        <mu-list class="m-l">
          <div class="act-title">
            活动介绍
          </div>
          <div class="act-cont">
            <textarea class="xx-textarea"></textarea>
          </div>
        </mu-list>
        <mu-list class="m-l">
          <div class="act-title">
            上传活动图片
          </div>
          <div class="act-cont">
            <div class="xx-textarea add-icon">
              <div>+请上传图片</div>
              <img :src="uploadImgSrc" v-show="uploadImgSrc">
            </div>
          </div>
        </mu-list>
      </div>
    </section>
    <mu-button large class="xx-submit-btn" color="error" @click="submit">立即发送</mu-button>
  </article>
</template>

<script>

  export default {
    name: 'xianxiahuodong',
    data() {
      return {
        title: '',
        date: '',
        member: '',
        content: '',
        desc: '',
        uploadImgSrc: ''
      }
    },
    computed: {},
    methods: {
      uploadFile() {
        let that = this;
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            if (localIds && localIds[0]){
              that.uploadImgSrc = localIds[0]
            }
          }
        });
      },
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
        this.$model.datasys.mailSend({title: this.title, content: this.content}, (res) => {
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

<style lang="less">
  .xx-article {
    margin: 0 auto;
    padding: 10px;
    font-size: 14px;
    .act-title {
      padding: 10px;
    }
    .act-cont {
      padding: 0 10px;
    }
    .xx-textarea {
      width: 100%;
      border: 1px solid #eee;
      border-radius: 5px;
      height: 90px;
      display: block;
    }
    .xx-header {
      font-size: 13px;
      padding: 0 10px;
      color: #333;
    }
    .xx-submit-btn {
      width: 90%;
      display: block;
      margin: 15px auto 0;
    }
    .xx-info-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        flex: 1;
        padding-left: 10px;
      }
    }
    .mu-list {
      padding: 0;
      margin: 5px 0 0;
      background-color: #fff;
    }
    .mu-item {
      background-color: #fff;
      border-bottom: 1px solid #eaeaea;
      padding: 0 10px;
    }
    .mu-input {
      font-size: 14px;
      color: rgba(0, 0, 0, .54);
      width: auto;
      min-height: 0;
      margin-bottom: 0;
      padding-bottom: 0;
      padding-top: 0;
    }
    .mu-item-title {
      height: auto;
      line-height: 1;
      font-size: 14px;
    }
    .m-l {
      padding-bottom: 8px;
    }
    .add-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #bbb;
      position: relative;
    }
  }
</style>
