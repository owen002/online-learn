// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import model from './project/model'
import MuseUI from 'muse-ui'
import 'typeface-roboto'
import 'muse-ui/dist/muse-ui.css'

Vue.config.productionTip = false

// museui组件
Vue.use(MuseUI)
// 数据读取
Vue.use(model)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
