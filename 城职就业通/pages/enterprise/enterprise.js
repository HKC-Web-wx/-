const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    userInfo: {},
    eid: '',
  },
  //切换身份按钮
  switch_id() {
    wx.showToast({
      title: '跳转中',
      mask: true,
      duration: 2000,
      icon: "none"
    })
    wx.reLaunch({
      url: '../index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      eid: options.eid
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,

      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '企业端-管理中心'
    })
  },
  p_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 8000
    })
    wx.navigateTo({
      url: '/pages/en_person/en_person?eid=' + this.data.eid,
      success: function () {
        wx.hideToast();
      }
    })
  },
  r_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 8000
    })
    wx.navigateTo({
      url: '/pages/show_resume/show_resume?eid=' + this.data.eid,
      success: function () {
        wx.hideToast();
      }
    })
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