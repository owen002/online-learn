<template>
  <article class="my-inf-tc-warp">
    <div class="my-info-item-w">
      <mu-list class="mu-list-ww">
        <a :href="l.fileUrl" :download="l.title+l.fileUrl.slice(l.fileUrl.indexOf('.'))" v-for="l in learnList">
          <mu-list-item button class="list-item-w">
            <mu-list-item-title>
              <div class="info-item">
                <em>{{l.title}}</em>
              </div>
            </mu-list-item-title>
            <mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>
          </mu-list-item>
        </a>
      </mu-list>
    </div>
  </article>
</template>

<script>
  export default {
    name: 'learnlist',
    data() {
      return {
        learnList: []
      }
    },
    methods: {
      queryLearn() {
        this.$model.datasys.getLearnList({}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          this.learnList = res.data.list
        })
      }
    },
    mounted() {
      this.queryLearn()
    }
  }
</script>

<style lang="less" scoped>
  .my-inf-tc-warp {
    height: 100%;
    background-color: #f3f3f3;
    a, a:active, a:hover {
      text-decoration: none;
    }
    .mu-list-ww {
      a {
        .list-item-w {
          border-top: 1px solid #f1f1f1;
        }
        &:nth-of-type(1) {
          .list-item-w {
            border: none;
          }
        }
      }
    }
    .logoutbtn {
      width: 90%;
      display: block;
      margin: 15px auto 0;
    }
    .my-info-item-w {
      .info-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          color: #a9a9a9;
        }
      }
      .mu-item {
        background-color: #fff;
        border-bottom: 1px solid #eaeaea;
      }
    }
    .bd-btn {
      display: block;
      margin: 15px auto 0;
      width: 80%;
    }
    .mu-list {
      padding: 0;
      margin-bottom: 8px;
      background-color: #fff;
    }
  }
</style>
