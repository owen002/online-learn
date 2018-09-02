import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common/index'

// vuex
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common
  }
})
