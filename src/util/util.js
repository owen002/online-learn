let util = {
  checkIdCard(IDCard) {
    var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
    if (!reg.test(IDCard)) {
      return false
    }
    return true
  },
  checkPhone(ph) {
    var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
    if (!reg.test(ph)) {
      return false
    }
    return true
  },
  formatTime(totalS) {
    totalS = totalS || 0
    let sec = totalS % 60
    let min = (totalS - sec) / 60 % 60
    let hour = (totalS - sec - min * 60) / 3600
    return {
      sec,
      min,
      hour
    }
  },
  fstr(s, h, m, d) {
    let time = this.formatTime(s)
    let str = (time.hour ? time.hour + (h || '时') : '') +
      (time.min ? time.min + (m || '分') : '') +
      (time.sec ? time.sec + (d || '秒') : '')
    return str
  }
}
export default util
