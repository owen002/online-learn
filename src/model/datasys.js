export default function (axios) {
  let totalPath = '//120.79.76.235:8081/'

  let error = (e)=>{console.error(e)}
  let datasys = {
    totalPath,
    getBanner(param = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/getBanner`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    // 查询城市列表数据
    getNewsList(param = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/findSpecialList`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    // 查询视频列表数据
    getVideoList(param = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/video/findAllList`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    // 查询视频详情数据
    getVideoDetail(param = {}, callback) {
      let id = param.id || ''
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/video/findDetail/${id}`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    // 获取视频种类
    getVideoType(param = {}, callback) {
      let id = param.id || ''
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}/api/video/findTypeList`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    // 更新视频状态
    updateVideo(param = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.post(`${totalPath}api/video/updateStudyProgress`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    // 学习记录
    historyStudy(param = {}, callback) {
      return axios.post(`${totalPath}/api/video/histroyStudy`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    getArticle(params = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/findNews/${params.id}`, params).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    getZtDetail(params = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/findMoreNewsList/${params.id}`, params).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    login(param = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.post(`${totalPath}api/login`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    register(param = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.post(`${totalPath}api/register`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    getMyinfo(param = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/mine/myTotalStudy`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    findRanking(param = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/mine/findRanking`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    growth(params = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.get(`${totalPath}api/mine/growth`, {params: params}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    mailSend(param = {}, callback) {
      return axios.post(`${totalPath}api/mailSend`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    findTotalRankingList(param = {}, callback) {
      return axios.get(`${totalPath}api/mine/findTotalRankingList`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    getPaperList(param = {}, callback) {
      return axios.get(`${totalPath}api/findExamList`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    getPaperDetail(param = {}, callback) {
      return axios.get(`${totalPath}api/findDetail/${param.id}`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    subPaper(param = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.post(`${totalPath}api/saveExamResult`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    getLearnList(param = {}, callback) {
      return axios.get(`${totalPath}api/getStudyData`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    getAllPeople(param = {}, callback) {
      return axios.get(`${totalPath}api/findUserList`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    subActivity(param = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.post(`${totalPath}api/activityUp`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    getMonthList(param = {}, callback) {
      return axios.get(`${totalPath}api/mine/footprint`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    videoQuestion(param = {}, callback) {
      // return axios.get(`part:api/findSpecialList`, param).then((res) => {
      return axios.post(`${totalPath}api/video/findQuestions`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    subVideoQuestion(param = {}, callback) {
      return axios.post(`${totalPath}api/video/answerSave`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    checkSingAndExam(param = {}, callback) {
      return axios.get(`${totalPath}api/video/checkSingAndExam`, {params: param}).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    },
    signVideo(param = {}, callback) {
      return axios.post(`${totalPath}api/video/sign`, param).then((res) => {
        callback(res)
      }).catch((err) => {
        error(err)
      })
    }
  }
  return datasys
}
