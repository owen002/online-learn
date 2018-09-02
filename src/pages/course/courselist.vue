<template>
  <article class="video-all-big-wrap">
    <section class="header-select">
      <div class="sort-item-wrap">
        <div>
          <mu-col>
            <mu-select v-model="selectSort" full-width @change="changeSelect" solo class="mu-select-cont">
              <mu-option class="mu-select-opts" v-for="option,index in sortVal" :key="option.val" :label="option.option"
                         :value="option.val"></mu-option>
            </mu-select>
          </mu-col>
        </div>
        <div>
          <mu-col>
            <mu-select v-model="selectType" full-width @change="changeSelect" solo class="mu-select-cont">
              <mu-option class="mu-select-opts" v-for="option in typeVal" :key="option.id" :label="option.name"
                         :value="option.id"></mu-option>
            </mu-select>
          </mu-col>
        </div>
      </div>
      <div class="select-sort-wrap"></div>
    </section>

    <div class="video-wrap">
      <div class="search-result" v-show="videoList.length > 0">在{{selectName}}分类下，找到以下{{videoList.length}}门课程</div>
      <div v-for="vid in videoList" class="video-wrap-item" @click="goVideo(vid.id)">
        <div class="video-img">
          <img :src="vid.coverUrl" alt="">
        </div>
        <div class="video-info-w">
          <em>{{vid.title}}</em>
          <div class="video-bottom">
            <div class="see-num">
              <mu-icon class="eye-icon" value="remove_red_eye"></mu-icon>
              <span>{{vid.playTimes}}</span>
            </div>
            <div class="video-date">{{vid.createDay}}</div>
          </div>
        </div>
      </div>
    </div>
    <bottom :currentMenu="'learn'"></bottom>
  </article>
</template>

<script>
  import bottom from '../../components/bottombar'

  let loading = ''
  export default {
    name: 'courselist',
    watch: {},
    computed: {
      selectName() {
        if (this.typeVal.length > 0) {
          let se = this.typeVal.filter((r) => r.id == this.selectType)
          return se[0].name
        }
      }
    },
    data() {
      let q = this.$route.query
      return {
        sortVal: [{option: '人气排序', val: '1'}, {option: '时间排序', val: '2'}],
        typeVal: [],
        selectSort: '1',
        selectType: '',
        videoList: [],
        loading: ''
      }
    },
    components: {bottom},
    methods: {
      changeSelect() {
        this.queryVideoList()
      },
      goVideo(id) {
        this.$router.push({
          name: 'coursedetail',
          query: {
            id: id,
          }
        })
      },
      queryVideoList() {
        this.hList = []
        this.uhList = []
        loading = this.$loading()
        this.$model.datasys.getVideoList({
          isFirst: 2,
          sortType: this.selectSort,
          lessonTypeId: this.selectType
        }, (res) => {
          loading.close()
          if (res.error) {
            this.$alert(res.error)
            return
          }
          let list = res.data.list
          this.videoList = list;
        }, (err) => {
          loading.close()
          this.videoList = []
        })
      },
      getTypeList() {
        this.$model.datasys.getVideoType({}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          this.typeVal = res.data.list
          this.selectType = this.typeVal[0].id
          // 获取视频列表
          this.queryVideoList()
        })
      }
    },
    mounted() {
      this.getTypeList()
    }
  }
</script>

<style lang="less" scoped>
  @color-red: #ff4545;
  .video-all-big-wrap {
    img {
      display: block;
      width: 100%;
    }

    .mu-select-cont {
      height: 55px;
      .mu-select-opts {
        text-align: center;
      }
    }
    .eye-icon {
      font-size: 16px;
    }

    .header-select {
      background-color: #fff;
    }
    .video-wrap {
      background-color: #fff;
      margin: 5px 0;
      padding: 20px 15px 10px;
      .search-result {
        background-color: #dbe7f7;
        color: #3581ff;
        border-radius: 20px;
        text-align: center;
        padding: 8px 5px;
        font-size: 16px;
        margin-bottom: 25px;
      }
      .video-wrap-item {
        display: flex;
        align-items: stretch;
        margin: 10px 0;
        .video-img {
          width: 40%;
          max-width: 280px;
        }
        .video-info-w {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding-left: 10px;
          justify-content: space-between;
          em {
            /*flex: 1;*/
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            height: 40px;
          }
          .video-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .v-btn-w {
              position: relative;
              padding: 3px 10px;
              color: #fff;
              background-color: @color-red;
              border-radius: 10px;
              font-size: 12px;
            }
            .video-data {
              color: #9e9e9e;
              font-size: 12px;
            }
          }
        }
      }
    }

    .sort-item-wrap {
      display: flex;
      input {
        color: #9e9e9e;
        text-align: center;
      }
    }
    .mu-select-input {
      text-align: center !important;
    }

    .see-num {
      display: flex;
      align-items: center;
      font-size: 10px;
      span {
        font-size: 14px;
        margin-left: 5px;
      }
    }
  }
</style>
