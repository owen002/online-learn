let local = window.localStorage
let ss = window.sessionStorage

function remove(key) {
  local.removeItem(key)
}

/**
 * 读取本地存储
 * @param key
 * @returns {*}
 */
export function getItem(key) {
  let value = local.getItem(key)
  let json = null
  try {
    json = JSON.parse(value)
  } catch (e) {
    json = value
  }
  if (!json) {
    return json
  }
  // 检测取得的值是否过期,过期删除并返回空
  let exp = json.expoiration
  if (exp) {
    let time = new Date().getTime()
    if (exp === -1 || time <= exp) {
      return json.item
    } else {
      return remove(key)
    }
  }
}

/**
 * 设置本地存储
 * @param key
 * @param value
 * @param exp {Number|String}  -1--永久，数字--天数，字符串--日期（可以直接new）
 * @param store
 */
export function setItem(key, value, exp = -1) {
  let last = 0
  if (typeof exp === 'number') {
    let day = 24 * 60 * 60 * 1000
    if (exp === -1) {
      last = -1
    } else {
      last = day * exp
    }
  } else {
    last = new Date(exp.replace(/-/g, '/')).getTime()
  }
  let json = {
    item: value,
    expoiration: last
  }
  local.setItem(key, JSON.stringify(json))
}

/**
 * sessionStorage设置、读取本地存储
 * @param key
 * @param val
 * @returns {*}
 */
export function session(key, val) {
  if (val === undefined) {
    // get sessionStorage value
    let value = ss.getItem(key)
    let json = null
    try {
      json = JSON.parse(value)
    } catch (e) {
      json = value
    }
    return json
  } else {
    // set session value
    val = JSON.stringify(val)
    return ss.setItem(key, val)
  }
}
