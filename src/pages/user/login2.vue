<template>
  <article class="login-acticle">
    <mu-icon class="login-img" value="account_circle"></mu-icon>
    <section class="login-area">
      <mu-form ref="form" :model="loginForm" class="login-form" :auto-validate="false" label-position="top">
        <mu-form-item label="手机号：" prop="username" :rules="usernameRules" class="form-item-c" >
          <mu-text-field v-model="loginForm.username" prop="username" label-float></mu-text-field>
          <mu-icon class="input-r-icon color-red" value="clear" v-if="loginForm.username" @click="clear(1)"></mu-icon>
        </mu-form-item>
        <mu-form-item label="密码：" prop="password" :rules="passwordRules" class="form-item-c">
          <mu-text-field :type="passInputType" v-model="loginForm.password" prop="password"></mu-text-field>
          <mu-icon class="input-r-icon" :value="passinputCompu" @click="changePassType"></mu-icon>
        </mu-form-item>
        <mu-form-item>
          <mu-button round large class="submit-btn" color="error" @click="submit">提交</mu-button>
        </mu-form-item>
      </mu-form>
    </section>
  </article>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        m:'',
        usernameRules: [
          {validate: (val) => !!val, message: '必须填写用户名'},
          {validate: (val) => val.length >= 3, message: '用户名长度大于3'}
        ],
        passwordRules: [
          {validate: (val) => !!val, message: '必须填写密码'},
          {validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
        ],
        loginForm: {
          username: '',
          password: ''
        },
        passInputType: 'password'
      }
    },
    computed:{
      passinputCompu(){
        return this.passInputType === 'password'?'visibility_off':'visibility'
      }
    },
    methods: {
      submit() {
        this.$refs.form.clear()
        this.$refs.form.validate().then((result) => {
          console.log('form valid: ', result)
        });
      },
      clear(type) {
        this.$refs.form.clear()
        if (type && type == 1) {
          this.loginForm.username = ''
        } else {
          this.loginForm = {
            username: '',
            password: ''
          }
        }
      },
      changePassType(){
        if(this.passInputType === 'password'){
          this.passInputType = 'text'
        }else{
          this.passInputType = 'password'
        }
      }
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

  .login-acticle {
    height: 100%;
    box-sizing: border-box;
    padding-top: 50px;
    .login-img {
      user-select: none;
      font-size: 150px;
      margin: 0 auto;
      display: block;
      height: 150px;
      width: 150px;
      color: #4c94f7;
    }
    .login-form {
      width: 80%;
      margin: 20px auto 0;
      max-width: 460px;
      .form-item-c {
        position: relative;
      }
      .input-r-icon {
        position: absolute;
        right: 0;
        font-size: 18px;
      }
    }
    .submit-btn {
      margin-top: 10px;
      width: calc(~"100% - 16px");
    }
  }

  .color-red {
    color: #ff6c6c;
  }
</style>
