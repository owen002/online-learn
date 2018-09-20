<template>
  <article class="my-inf-tc-warp">
    <div class="my-info-item-w">
      <div class="mu-list-ww">
        <a :href="l.fileUrl" v-for="l in learnList">
          <div class="list-item-w">
            <div>
              <img v-if="l.fileType == 1" src="../../assets/img/doc.png" alt="">
              <img v-if="l.fileType == 2" src="../../assets/img/pdf.png" alt="">
              <img v-if="l.fileType == 3" src="../../assets/img/other.png" alt="">
            </div>
            <div class="wrap-l">
              <div class="info-item">
                <em>{{l.title}}</em>
              </div>
            </div>
          </div>
        </a>
      </div>
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
      match(url){
        let doc = /\.doc/,pdf = /\.pdf/
        if(doc.test(url)){
          return 1
        }else if(pdf.test(url)){
          return 2
        }else{
          return 3
        }
      },
      queryLearn() {
        this.$model.datasys.getLearnList({}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          let list = res.data.list
          list.map((r)=>{
            r.fileType = this.match(r.fileUrl)
          })
          this.learnList = list
        },(e)=>{console.error(e)})
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
    .mu-list-ww{
    .wrap-l{
      flex:1;
    }
      a {
        .list-item-w {
          display: flex;
          border-top: 1px solid #f1f1f1;
          padding:12px 15px;
          color:#333;
          background: #fff;
          align-items: center;
          img{
            width:30px;
            display: block;
          }
          em{
            padding-left:5px;
          }
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
