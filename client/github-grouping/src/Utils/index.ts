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