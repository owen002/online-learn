<template>
  <div class="register-wrap">
    <article class="login-acticle">
      <section class="login-area">
        <div class="login-area-form">
          <div class="login-item">
            <mu-text-field label="请输入手机号" :max-length="11" label-float v-model="registerForm.mobile"
                           icon="stay_current_portrait" full-width></mu-text-field>
            <mu-icon class="input-r-icon color-red" value="clear" v-if="registerForm.mobile"
                     @click="clear('mobile')"></mu-icon>
          </div>
          <div class="login-item">
            <mu-text-field :type="passInputType" label="请输入密码" label-float v-model="registerForm.password"
                           icon="locked" full-width></mu-text-field>
            <mu-icon class="input-r-icon" :value="passinputCompu" @click="changePassType"></mu-icon>
          </div>
          <div class="login-item">
            <mu-text-field label="请输入姓名" label-float v-model="registerForm.username"
                           icon="perm_identity" full-width></mu-text-field>
            <mu-icon class="input-r-icon color-red" value="clear" v-if="registerForm.username"
                     @click="clear('username')"></mu-icon>
          </div>
          <div class="login-item">
            <mu-text-field label="请输入身份证" label-float v-model="registerForm.idcard"
                           icon="picture_in_picture" full-width></mu-text-field>
            <mu-icon class="input-r-icon color-red" value="clear" v-if="registerForm.idcard"
                     @click="clear('idcard')"></mu-icon>
          </div>
          <!--<div class="login-item">-->
          <!--<mu-select class="login-party" v-model="registerForm.partyname" full-width label="归属党支部"-->
          <!--icon="group" label-float>-->
          <!--<mu-option v-for="option,index in parties" :key="option.val" :label="option.name" :value="option.val"></mu-option>-->
          <!--</mu-select>-->
          <!--</div>-->
        </div>
        <div class="btn-wrap">
          <mu-button full-width round large class="submit-btn" color="error" @click="submit">注册</mu-button>
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
    name: 'register',
    components: {loginbackimg},
    data() {
      return {
        parties: [{name: '信息科', val: 'xxk'}, {name: '信息科2', val: 'xxk2'}, {name: '信息科3', val: 'xxk3'}],
        registerForm: {
          username: '',
          password: '',
          partyname: '',
          idcard: '',
          mobile: ''
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
      changePassType() {
        if (this.passInputType === 'password') {
          this.passInputType = 'text'
        } else {
          this.passInputType = 'password'
        }
      },
      submit() {
        let that = this
        if (!util.checkPhone(this.registerForm.mobile)) {
          this.$toast.error('请输入正确的手机号')
          return
        }
        if (!this.registerForm.password) {
          this.$toast.error('请输入密码')
          return
        }
        if (!this.registerForm.username) {
          this.$toast.error('请输入姓名')
          return
        }
        if (!util.checkIdCard(this.registerForm.idcard)) {
          this.$toast.error('请输入正确的身份证')
          return
        }
        this.$model.datasys.register({
          "cardno": this.registerForm.idcard,
          "name": this.registerForm.username,
          "phone": this.registerForm.mobile,
          "pwd": this.registerForm.password,
          "type": 1
        }, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          this.$alert(`恭喜，您的信息已经成功绑定，请使用手机${this.registerForm.mobile}登录`,{
            beforeClose:function () {
              that.$router.push({
                name:'login'
              })
              this.close()
            }
          })
        })
      },
      clear(type) {
        this.registerForm[type] = ''
      },
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  @color-red: #ff4545;
  img {
    display: block;
    width: 100%;
  }

  .mu-input {
    margin-bottom: 0;
  }

  .register-wrap {
    position: relative;
    height: 100%;
  }

  .login-acticle {
    height: 100%;
    box-sizing: border-box;
    z-index: 99;
    position: relative;
    padding-top: 20px;
    .login-area-form {
      margin: 0 auto;
      padding-right: 20px;
      .login-item {
        position: relative;
        .login-party {
        }
        .input-r-icon {
          position: absolute;
          right: 0;
          bottom: 17px;
          font-size: 18px;
        }
      }
    }
    .btn-wrap {
      width: 80%;
      margin: 15px auto 0;
      .submit-btn {
      }
      .bind-btn {
        margin: 10px 0 5px;
        color: #ababab;
        box-shadow: none;
        background: none;
      }
    }
  }

  .color-red {
    color: #ff6c6c;
  }
</style>
