<template>
  <div class="article-warap">
    <article class="login-acticle">
      <img class="login-img" src="./../../assets/img/d.png" alt="">
      <section class="login-area">
        <div class="login-area-form">
          <div class="login-item">
            <mu-text-field label="请输入手机号" :max-length="11" label-float v-model="loginForm.username"
                           icon="account_circle" full-width></mu-text-field>
            <mu-icon class="input-r-icon" value="clear" v-if="loginForm.username" @click="clear(1)"></mu-icon>
          </div>
          <div class="login-item">
            <mu-text-field :type="passInputType" label="请输入密码" label-float v-model="loginForm.password"
                           icon="locked" full-width></mu-text-field>
            <mu-icon class="input-r-icon" value="visibility" :value="passinputCompu" @click="changePassType"></mu-icon>
          </div>
        </div>
        <div class="forget-pass">
          <span @click="forget">忘记密码</span>
        </div>
        <div class="btn-wrap">
          <mu-button full-width round large class="submit-btn" color="error" @click="submit">提交</mu-button>
          <mu-button full-width round class="bind-btn" @click="register">新用户绑定</mu-button>
        </div>
      </section>
    </article>
    <loginbackimg></loginbackimg>
  </div>
</template>

<script>
  import loginbackimg from '../../components/loginbackimg'
  import util from '../../util/util'

  export default {
    name: 'login',
    components: {loginbackimg},
    data() {
      let q = this.$route.query;
      return {
        rurl: q.rurl || '',
        loginForm: {
          username: '',
          password: ''
        },
        passInputType: 'password'
      }
    },
    computed: {
      passinputCompu() {
        return this.passInputType === 'password' ? 'visibility_off' : 'visibility'
      }
    },
    methods: {
      forget() {
        this.$router.push({name: 'forget'})
      },
      register() {
        this.$router.push({name: 'register'})
      },
      submit() {
        if (!util.checkPhone(this.loginForm.username)) {
          this.$toast.error('请输入正确的手机号')
          return
        }
        if (!this.loginForm.password) {
          this.$toast.error('请输入密码')
          return
        }

        this.$model.datasys.login({phone: this.loginForm.username, pwd: this.loginForm.password}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          this.$local.hasIn('1')
          let token = res.data.token
          localStorage.setItem('usertoken', token)
          localStorage.setItem('userid', res.data.user.id)
          // 缓存用户id
          this.$local.userinfo({user: res.data.user, token})
          this.$local.us_info({username: this.loginForm.username, password: this.loginForm.password})
          // this.$router.push({name: 'index'})
          if (this.rurl) {
            location.href = decodeURIComponent(this.rurl)
          } else {
            this.$router.push({
              name: 'mine'
            })
          }
        })
      },
      clear() {
        this.loginForm.username = ''
      },
      changePassType() {
        if (this.passInputType === 'password') {
          this.passInputType = 'text'
        } else {
          this.passInputType = 'password'
        }
      }
    },
    mounted() {
      // this.$local.rurlFlag('')
    }
  }
</script>

<style lang="less" scoped>

  img {
    display: block;
    width: 100%;
  }

  .mu-input {
    margin-bottom: 0;
  }

  .article-warap {
    position: relative;
    height: 100%;
  }

  .login-acticle {
    height: 100%;
    box-sizing: border-box;
    padding-top: 50px;
    z-index: 99;
    position: relative;
    .login-img {
      user-select: none;
      font-size: 150px;
      margin: 0 auto;
      display: block;
      height: 150px;
      width: 150px;
      color: #4c94f7;
    }
    .login-area-form {
      margin: 20px auto 0;
      padding-right: 20px;
      .login-item {
        position: relative;
      }
      .input-r-icon {
        position: absolute;
        right: 0;
        bottom: 17px;
        font-size: 18px;
      }
    }
    .forget-pass {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 20px;
      span {
        color: #333;
      }
    }
    .btn-wrap {
      width: 80%;
      margin: 15px auto 0;
      .submit-btn {
      }
      .bind-btn {
        margin: 10px 0 5px;
        color: #0030ff;
        box-shadow: none;
        background: none;
      }
    }
  }
</style>
