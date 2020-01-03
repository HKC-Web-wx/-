const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    userInfo: {},
    aid: '',
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
      aid: options.aid
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
      title: '管理员-管理中心'
    })
  },
  l_click: function () {
    wx.showToast({
      title: '加载中',
      mask:true,
      icon:"none",
      duration:8000
    })
    wx.navigateTo({
      url: '/pages/ad_leader/ad_leader?aid=' + this.data.aid,
      success:function(){
        wx.hideToast();
      }
    })
  },
  f_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 8000
    })
    wx.navigateTo({
      url: '/pages/ad-fairwork/ad-fairwork?aid=' + this.data.aid,
      success: function () {
        wx.hideToast();
      }
    })
  },
  t_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 8000
    })
    wx.navigateTo({
      url: '/pages/adle-teacher/adle-teacher?aid=' + this.data.aid,
      success: function () {
        wx.hideToast();
      }
    })
  },
  c_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 8000
    })
    wx.navigateTo({
      url: '/pages/adle-classlist/adle-classlist?aid=' + this.data.aid,
      success: function () {
        wx.hideToast();
      }
    })
  },
  s_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 8000
    })
    wx.navigateTo({
      url: '/pages/adle-stulist/adle-stulist?aid=' + this.data.aid,
      success: function () {
        wx.hideToast();
      }
    })
  },
  d_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 8000
    })
    wx.navigateTo({
      url: '/pages/adle-tong-data/adle-tong-data?aid=' + this.data.aid,
      success: function () {
        wx.hideToast();
      }
    })
  },
  enterprise_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 10000
    })
    wx.navigateTo({
      url: '/pages/enterpriseList/enterpriseList?aid=' + this.data.aid,
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