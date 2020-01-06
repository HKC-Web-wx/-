const app = getApp()

// pages/student/student.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    userInfo: {},
    tid: '',
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
    wx.hideLoading();
    wx.hideToast();
    this.setData({
      tid: options.tid
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
      title: '教师端-管理中心'
    })
    wx.hideLoading();
  },
  //个人中心
  p_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 4000
    })
    wx.navigateTo({
      url: '/pages/th_person/th_person?tid=' + this.data.tid,
    })
    wx.hideToast();
  },
  //管理班级
  c_click: function () {
    wx.showToast({
      title: '加载中',
      mask:true,
      icon: "none",
      duration:4000
    })
    wx.navigateTo({
      url: '/pages/classlist/classlist?tid=' + this.data.tid,
    })
    wx.hideToast();
  },
  //统计数据
  d_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 5000
    })
    wx.navigateTo({
      url: '/pages/tong-data/tong-data?tid=' + this.data.tid,
    })
    wx.hideToast();
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
    return {
      title: '城职就业通',
      path: '/pages/index/index'
    }
  }
})