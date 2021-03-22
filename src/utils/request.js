// promise的封装
export default (params) => {
  // uni中加载中的api
  uni.showLoading({
    title: '加载中'
  })

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        // uni中隐藏加载中的api
        uni.hideLoading()
      }
    })
  })
}