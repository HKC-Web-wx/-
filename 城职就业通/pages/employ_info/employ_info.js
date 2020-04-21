
var app = getApp()
Page({

  /*
   * 页面的初始数据
   */
  data: {
    //页面配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    sid: '',
    stu_enroll_info: '',
    //招聘会报名人数
    stu_interviewed_info: '',
    stu_admission_info:'',
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      sid: options.sid
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
  },

  loadData: function () {
    var that = this;
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    //报名
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Teacher/stu_enroll_info',
      method: 'GET',
      data: {
        stu_id: that.data.sid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          stu_enroll_info: res.data
        })
      }
    })
    //面试
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Teacher/stu_interviewed_info',
      method: 'GET',
      data: {
        stu_id: that.data.sid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          stu_interviewed_info: res.data
        })
        wx.hideLoading();
      }
    })
    //录取
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Teacher/stu_admission_info',
      method: 'GET',
      data: {
        stu_id: that.data.sid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          stu_admission_info: res.data
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '学生就业信息'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData();
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