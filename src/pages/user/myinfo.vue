<template>
  <article class="my-inf-tc-warp">
    <div class="my-info-item-w">
      <mu-list>
        <mu-list-item button class="list-item-w">
          <mu-list-item-title>
            <div class="info-item">
              <em>姓名</em>
              <p>{{userinfo.name}}</p>
            </div>
          </mu-list-item-title>
          <mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item>
        <mu-list-item button class="list-item-w">
          <mu-list-item-title>
            <div class="info-item">
              <em>性别</em>
              <p>{{userinfo.sex == '1'?'男':'女'}}</p>
            </div>
          </mu-list-item-title>
          <mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item>
      </mu-list>
      <mu-list>
        <mu-list-item button class="list-item-w">
          <mu-list-item-title>
            <div class="info-item">
              <em>党支部</em>
              <p>{{userinfo.groupName}}</p>
            </div>
          </mu-list-item-title>
          <mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item>
        <mu-list-item button class="list-item-w">
          <mu-list-item-title>
            <div class="info-item">
              <em>职务</em>
              <p>{{userinfo.job}}</p>
            </div>
          </mu-list-item-title>
          <mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item>
        <mu-list-item button class="list-item-w">
          <mu-list-item-title>
            <div class="info-item">
              <em>党龄</em>
              <p>{{userinfo.joinAge}}年</p>
            </div>
          </mu-list-item-title>
          <mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item>
      </mu-list>
      <mu-list>
        <mu-list-item button class="list-item-w">
          <mu-list-item-title>
            <div class="info-item">
              <em>手机</em>
              <p>{{userinfo.phone}}</p>
            </div>
          </mu-list-item-title>
          <mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item>
        <!--<mu-list-item button>
          <mu-list-item-title>
            <div class="info-item">
              <em>座机</em>
              <p>{{userinfo.name}}</p>
            </div>
          </mu-list-item-title>
          <mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>
        </mu-list-ite>-->
        <mu-list-item button class="list-item-w">
          <mu-list-item-title>
            <div class="info-item">
              <em>邮箱</em>
              <p>{{userinfo.mail}}</p>
            </div>
          </mu-list-item-title>
          <mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item>
      </mu-list>
      <mu-list>
        <mu-list-item button class="list-item-w">
          <mu-list-item-title>
            <div class="info-item">
              <em>岗位</em>
              <p>{{userinfo.postName}}</p>
            </div>
          </mu-list-item-title>
          <mu-icon class="dn" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item>
      </mu-list>
      <mu-button class="logoutbtn" color="error" large @click="logout">退出</mu-button>
    </div>
    <!--<mu-button class="bd-btn" normal color="red">绑定信息</mu-button>-->
  </article>
</template>

<script>
  export default {
    name: 'myinfo',
    data() {
      return {
        userinfo:{}
      }
    },
    methods: {
      logout(){
        let that = this
        this.$confirm('确认退出？',{
          beforeClose:function (e) {
            if(e){
              localStorage.removeItem('usertoken')
              localStorage.removeItem('userid')
              that.$router.push({
                name:'index'
              })
            }
            this.close()
          }
        })
      }
    },
    mounted() {
      let userinfo = this.$local.userinfo()
      this.userinfo = userinfo.user
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
    .dn{
      display: none;
    }
    .list-item-w{
      border-top:1px solid #f1f1f1;
      &:nth-of-type(1){
        border:none;
      }
    }
    .logoutbtn{
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
      margin-top:8px;
      background-color: #fff;
    }
  }
</style>
