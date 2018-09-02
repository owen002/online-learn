import interceptor from '../model/interceptor'
import store from './store'
import axios from 'axios'
import _datasys from '../model/datasys'

interceptor(axios)

let datasys = _datasys(axios)
let model = {
  datasys
}

let _model = {
  install(vue) {
    vue.prototype.$local = store
    vue.prototype.$ajax = axios
    vue.prototype.$model = model
  }
}

export default _model
