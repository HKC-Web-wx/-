const app = getApp()

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    winHeight:'',
    stu_id:'',
    enrolment:'',
  },

  add:function(e){
    var sid = this.data.stu_id
    wx.navigateTo({
      url: '/pages/add_enroll/add_enroll?sid=' + sid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight,
          stu_id:options.sid
        });
      }
    });
  },
  //加载报名记录数据
  loadData:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/sign_list',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        stu_id: that.data.stu_id
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data)
        that.setData({
          enrolment: res.data,
        })
      }, fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: '加载失败请稍后再试',
          icon: "none",
          duration: 1200,
          mask: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '报名记录'
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