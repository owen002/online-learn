export default function (axios) {
  let totalPath = '//119.27.162.187:8088/'
  let datasys = {
    getBanner(param = {}, callback, error) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/getBanner`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    // 查询城市列表数据
    getNewsList(param = {}, callback, error) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/findSpecialList`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    // 查询视频列表数据
    getVideoList(param = {}, callback, error) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/video/findAllList`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    // 查询视频详情数据
    getVideoDetail(param = {}, callback, error) {
      let id = param.id || ''
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/video/findDetail/${id}`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    // 获取视频种类
    getVideoType(param = {}, callback, error) {
      let id = param.id || ''
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}/api/video/findTypeList`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    // 更新视频状态
    updateVideo(param = {}, callback, error) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.post(`${totalPath}api/video/updateStudyProgress`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    // 学习记录
    historyStudy(param = {}, callback, error) {
      return axios.post(`${totalPath}/api/video/histroyStudy`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    getArticle(params = {}, callback, error) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/findNews/${params.id}`, params).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    getZtDetail(params = {}, callback, error) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/findMoreNewsList/${params.id}`, params).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    login(param = {}, callback, error) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.post(`${totalPath}api/login`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    register(param = {}, callback, error) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.post(`${totalPath}api/register`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    getMyinfo(param = {}, callback, error) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/mine/myTotalStudy`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    findRanking(param = {}, callback, error) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/mine/findRanking`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    growth(params = {}, callback, error) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/mine/growth`, {params: params}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    mailSend(param = {}, callback, error) {
      return axios.post(`${totalPath}api/mailSend`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    findTotalRankingList(param = {}, callback, error) {
      return axios.get(`${totalPath}api/mine/findTotalRankingList`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    }
  }
  return datasys
}
