// 防抖

interface debArg {
  fn: any,
  delay?: any
}

export const debounce = (params: debArg) => {
  let timer: NodeJS.Timeout | null = null
  const { fn, delay } = params
  return () => {
    const context = this
    const args = params
    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

// 节流

// 函数节流的实现;
export const throttle = (params: debArg) => {
  let preTime = Date.now()
  const { fn, delay } = params
  return () => {
    const context = this
    const args = params
    const nowTime = Date.now()

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now()
      fn.apply(context, args)
    }
  }
}

export const getCookie = (name: string) => {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  const arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  }
  return null
}


export const setCookie = (name: string, value: any, days: number) => {
  let expires = ''
  let domain = ''
  const cookieDomain = process.env.COOKIE_DOMAIN || ''
  if (days) {
    const date = new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000)
    expires = ` ; expires = ${date.toUTCString()} `
  }
  if (cookieDomain) {
    domain = ` ; domain = ${cookieDomain} `
  }
  document.cookie = `${name}=${value} ${expires} ${domain}; path = /`
}

// @ts-ignore
export const deepClone = values => {
  let copy

  // Handle the 3 simple types, and null or undefined
  if (values == null || typeof values != 'object') return values

  // Handle Date
  if (values instanceof Date) {
    copy = new Date()
    copy.setTime(values.getTime())
    return copy
  }

  // Handle Array
  if (values instanceof Array) {
    copy = []
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i])
    }
    return copy
  }

  // Handle Object
  if (values instanceof Object) {
    copy = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const attr in values) {
      // @ts-ignore
      if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr])
    }
    return copy
  }

  throw new Error("Unable to copy values! Its type isn't supported.")
}