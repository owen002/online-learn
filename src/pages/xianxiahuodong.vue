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
                  <mu-text-field v-model="title" style="width:100%"></mu-text-field>
                </p>
              </div>
            </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="xx-list-item-w">
            <mu-list-item-title>
              <div class="xx-info-item">
                <em>活动时间</em>
                <p>
                  <mu-date-input v-model="date" container="bottomSheet" underline-color="#fff"
                                 full-width type="dateTime" view-type="list"></mu-date-input>
                </p>
              </div>
            </mu-list-item-title>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item>
          <mu-list-item class="xx-list-item-w">
            <mu-list-item-title class="h-auto">
              <div class="xx-info-item">
                <em>参与人员</em>
                <p>
                  <mu-select multiple chips v-model="member" style="width:100%;">
                    <mu-option v-for="pe in people" :key="pe.id" :value="pe.id" :label="pe.name"></mu-option>
                  </mu-select>
                </p>
              </div>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-list class="m-l">
          <div class="act-title">
            活动地址
          </div>
          <div class="act-cont">
            <textarea class="xx-textarea" v-model="address"></textarea>
          </div>
        </mu-list>
        <mu-list class="m-l">
          <div class="act-title">
            活动介绍
          </div>
          <div class="act-cont">
            <textarea class="xx-textarea" v-model="desc"></textarea>
          </div>
        </mu-list>
        <mu-list class="m-l">
          <div class="act-title">
            上传活动图片
          </div>
          <div class="act-cont">
            <input type="file" id="file_upload" @change="previewImg">
            <div class="xx-textarea add-icon">
              <img :src="uploadImgSrc" v-if="uploadImgSrc">
              <div v-else>+请上传图片</div>
            </div>
          </div>
        </mu-list>
      </div>
    </section>
    <mu-button large class="xx-submit-btn" color="error" @click="submit">立即发送</mu-button>
  </article>
</template>

<script>

  import jquery from 'jquery'
  import util from '../util/util'

  export default {
    name: 'xianxiahuodong',
    data() {
      return {
        title: '',
        date: '',
        member: [],
        content: '',
        desc: '',
        uploadImgSrc: '',
        people: [],
        address: '',
        uimgurl: ''
      }
    },
    computed: {},
    methods: {
      previewImg(e) {
        let that = this
        let reader = new FileReader();
        //获取文件
        var file = document.querySelector('#file_upload').files[0];
        var imageType = /^image\//;
        //是否是图片
        if (!imageType.test(file.type)) {
          this.$alert("请选择图片！");
          return;
        }
        //读取完成
        reader.onload = function (e) {
          //获取图片dom
          that.uploadImgSrc = e.currentTarget.result
          // 上传图片
          var formData = new FormData();
          formData.append("file", jquery('#file_upload')[0].files[0]);
          formData.append("token", localStorage.getItem('usertoken'));
          jquery.ajax({
            url: that.$model.datasys.totalPath + 'api/upload',
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
              if (data.code === 0) {
                //上传成功
                that.uimgurl = data.url
              }
            },
            error: function () {
            }
          });
        };
        reader.readAsDataURL(file);
      },
      getPeople() {
        let po = this.$local.people()
        if (po) {
          this.people = po
        } else {
          this.$model.datasys.getAllPeople({}, (res) => {
            if (res.error) {
              this.$alert(res.error)
              return
            }
            this.people = res.data.list
            this.$local.people(res.data.list)
          })
        }
      },
      submit() {
        let that = this
        if (!this.title) {
          this.$alert('请输入标题')
          return
        }
        if (!this.date) {
          this.$alert('请输入活动时间')
          return
        }

        if (!this.member) {
          this.$alert('请输入参与人员')
          return
        }
        if (!this.address) {
          this.$alert('请输入活动地址')
          return
        }
        let param = {
          "activityDate": util.formatDate(this.date,'YYYY-MM-dd hh:mm:ss'),
          "address": this.address,
          "pictureUrls": this.uimgurl,
          "remarks": this.desc,
          "title": this.title,
          "userIds": this.member.join(',')
        }
        this.$model.datasys.subActivity(param, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          this.$alert('提交成功', {
            beforeClose: function () {
              this.close()
              that.$router.back()
            }
          })
        })
      }
    },
    mounted() {
      this.getPeople()
    }
  }
</script>

<style lang="less">
  .xx-article {
    width:100%;
    margin: 0 auto;
    padding: 10px;
    font-size: 14px;
    .act-title {
      padding: 10px;
    }
    .act-cont {
      padding: 0 10px;
      position: relative;
      input {
        position: absolute;
        left: 0;
        display: block;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 99;
        opacity: 0;
      }
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
      height: auto;
      min-height: 48px;
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
      min-height: 90px;
      height: auto;
      img {
        display: block;
        width: 100%;
      }
    }
  }
</style>
