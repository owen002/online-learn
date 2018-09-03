<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VCharts from 'v-charts'
  import Message from 'muse-ui-message';
  import Toast from 'muse-ui-toast';
  import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
  import Loading from 'muse-ui-loading';

  Vue.use(Loading);
  Vue.use(Toast);
  Vue.use(Message);
  Vue.use(VCharts)

  export default {
    name: 'App',
    data() {
      return {
        transitionName: 'transition-go'
      }
    },
    mounted() {
      document.title = '太仓烟草'
      // 如果接口返回401
      this.$ajax.interceptors.response.use((response) => {
        // response拦截器
        response.res = response.data
        debugger
        if (response.data && String(response.data.code) == '401') {
          // localStorage.removeItem('usertoken')
          // 去登陆
          let loc = encodeURIComponent(location.href)

          let callback = () => {
            this.$router.push({name: 'login', query: {rurl: loc}})
          }
          // 获取用户账号密码
          let userinfo = this.$local.userinfo() || {}
          let mobile = userinfo.phone
          let pass = userinfo.password
          if (mobile && pass) {
            // 自动登录
            this.$model.datasys.login({phone: mobile, pwd: pass}, (res) => {
              if (res.error) {
                this.$alert(res.error)
                callback()
                return
              }
              let token = res.data.token
              localStorage.setItem('usertoken', token)
              localStorage.setItem('userid', res.data.user.id)
              // 缓存用户id
              this.$local.userinfo({user: res.data.user, token})
            })
          } else {
            callback()
          }
          return
        }
        if (response.data && String(response.data.code) === '0') {
          //
          return response
        } else {
          response.error = (response.data && response.data.msg) || '系统忙，请稍后再试'
          return response
        }
      }, error => {
        return Promise.reject(error)
      })
    }
  }
</script>

<style lang="less">
  @import "./assets/styles/common.less";

  #app {
    min-height: 100%;
    background-color: #f1f1f1;
  }

  img {
    display: block;
  }

  body, html {
    background-color: #fff;
    font-size: 15px;
  }
</style>
