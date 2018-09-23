let currentLoc = location.href
let isDev = process.env.NODE_ENV === 'development'
let isQa = currentLoc.indexOf('train.qa.17usoft') >= 0
let isYf = currentLoc.indexOf('train.t.17usoft') >= 0
// let isProd = currentLoc.indexOf('train.17usoft') >= 0
let isTest = isDev || isYf

let urlPath = {
  // part: '/' + (isTest ? '' : '') + '/'
  part: '/'
}
let baseUrl = isDev ? '/proxy' : (isQa ? '//119.27.162.187:8088' : (isYf ? '//119.27.162.187:8088' : '//119.27.162.187:8088'))

function interceptor(axios) {
  // default timeout
  axios.defaults.timeout = 10000
  // request拦截器
  axios.interceptors.request.use(config => {
    // 修改请求地址
    config.url = config.url.replace(/^(\w+):/, (s0, s1) => {
      return urlPath[s1] || s0
    })
    // 添加baseUrl全路径
    if (baseUrl && !/^(?:https?:)?\/\//.test(config.url)) {
      // 不是全路径
      config.url = baseUrl + config.url
    }
    if (config.method == 'get') {
      // 处理传参格式 param={}
      let params = config.params
      if (params) {
        params.token = localStorage.getItem('usertoken') || ''
      } else {
        config.params = {token: localStorage.getItem('usertoken') || ''}
      }

      if (params) {
        params._ = new Date().getTime()
      }
    } else {
      console.log(config)
      let url = config.url, sche = url.indexOf('?') >= 0 ? '&' : '?'
      let paramArr = ['token=' + localStorage.getItem('usertoken') || '']
      let cdata = config.data
      for (var it in cdata) {
        paramArr.push(`${it}=${cdata[it]}`)
      }
      url += sche + paramArr.join('&')
      config.url = url
    }
    // 处理post传参
    return config
  }, error => {
    console.error(error)
    if(error){
      return Promise.reject(error)
    }
  })
}

export default interceptor
