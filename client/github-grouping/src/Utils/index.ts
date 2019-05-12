import moment from 'moment'

export const $pre = async (promise: any) => {
  const res = await promise
  return new Promise(resolve => {
    if (res.data.success) {
      resolve(res.data.data)
    } else {
      throw res.data.error
    }
  })
}

export const getDateBeforeFormat = (ms: number) => {
  const s: number = 1000
  const m: number = s * 60
  const h: number = m * 60
  const d: number = h * 24
  const w: number = d * 7
  const ymdhm = moment(new Date(ms)).format("YYYY-MM-DD hh:mm")
  ms -= +new Date()
  if (ms < m) {
    return ~~(ms / s) + '초 전'
  } else if (ms < h) {
    return ~~(ms / m) + '분 전'
  } else if (ms < d) {
    return ~~(ms / h) + '시간 전'
  } else if (ms < w) {
    return ~~(ms / d) + '일 전'
  } else {
    return ymdhm
  }
}

export const getToday = (ms: number) => {
  const d: number = 1000 * 60 * 60 * 24
  const computed = ms - (+new Date())
  return moment(ms).format(computed > d ? 'MM-DD HH:mm' : 'HH:mm')
}