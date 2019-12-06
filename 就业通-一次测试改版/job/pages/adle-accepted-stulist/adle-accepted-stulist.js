
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载数据中',
      mask:true
    })
    var that = this
    console.log(options)
    that.setData({
      cid: options.cid
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Admin/stu_admission_list',
      method: 'GET',
      data: {
        class_id: that.data.cid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          stulist: res.data
        })
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})