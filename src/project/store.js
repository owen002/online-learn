import {getItem, session, setItem} from '../util/storeUtil'

let store = {
  videoCurrentTime(val) {
    let key = 'vue_vurrentTime_local_' + localStorage.getItem('userid')
    if (val === undefined) {
      return getItem(key)
    } else {
      return setItem(key, val, -1)
    }
  },
  userinfo(val) {
    let key = 'vue_userinfo_local_' + localStorage.getItem('userid')
    if (val === undefined) {
      return getItem(key)
    } else {
      return setItem(key, val, -1)
    }
  },
  videoStore(val) {
    let key = 'vue_videoStore_local_' + localStorage.getItem('userid')
    if (val === undefined) {
      return getItem(key)
    } else {
      return setItem(key, val, -1)
    }
  },
  growthDetail(val) {
    let key = 'vue_growthDetail_local_' + localStorage.getItem('userid')
    if (val === undefined) {
      return getItem(key)
    } else {
      return setItem(key, val, -1)
    }
  },
  myTotalStudy(val) {
    let key = 'vue_myTotalStudy_local_' + localStorage.getItem('userid')
    if (val === undefined) {
      return getItem(key)
    } else {
      return setItem(key, val, -1)
    }
  },
  mytotalRanking(val) {
    let key = 'vue_mytotalRanking_local_' + localStorage.getItem('userid')
    if (val === undefined) {
      return getItem(key)
    } else {
      return setItem(key, val, -1)
    }
  },
  us_info(val) {
    let key = 'vue_us_info_local_' + localStorage.getItem('userid')
    if (val === undefined) {
      return getItem(key)
    } else {
      return setItem(key, val, -1)
    }
  },
  rurlFlag(val){
    let key = 'vue_local_rurl_Flag'
    return session(key,val)
  },
  people(val){
    let key = 'vue_local_people_key'
    return session(key,val)
  },
  hasIn(val){
    let key = 'vue_local_hasIn_key'
    return session(key,val)
  }
}
export default store
