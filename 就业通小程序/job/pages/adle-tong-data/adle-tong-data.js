
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页面配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    tid: '',
    fairList: '',
    //招聘会报名人数
    countList: '',
  },



  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  //点击tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //点击跳转到班级列表
  enroll_classlist: function (e) {
    var that = this;
    let pid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/adle-enroll-classlist/adle-enroll-classlist?pid=' + pid
    })
  },
  //已面试学生列表
  interviewed_stulist: function (e) {
    var that = this;
    let cid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/adle-interviewed-stulist/adle-interviewed-stulist?cid=' + cid,
    })
  },
  //已录取学生列表
  accepted_stulist: function (e) {
    var that = this;
    let cid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/adle-accepted-stulist/adle-accepted-stulist?cid=' + cid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载数据中',
      mask:true
    })
    var that = this;
    that.setData({
      tid: options.tid
    })
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Admin/fair_enroll_count',
      success: function (res) {
        console.log(res.data)
        that.setData({
          fairList: res.data
        })
      }
    })
    //已面试已录取班级渲染
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/class_list',
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          classlist: res.data
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