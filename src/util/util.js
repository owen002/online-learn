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
  },
  formatDate: function (_tdate, format) {
    var date = {
      "M+": _tdate.getMonth() + 1,
      "d+": _tdate.getDate(),
      "h+": _tdate.getHours(),
      "m+": _tdate.getMinutes(),
      "s+": _tdate.getSeconds(),
      "q+": Math.floor((_tdate.getMonth() + 3) / 3),
      "S+": _tdate.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (_tdate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return format;

  },
}
export default util
