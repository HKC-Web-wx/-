const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid:'',
    interviewAddList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载数据中',
      mask:true
    })
    console.log(options)
    this.setData({
      sid:options.sid
    })
    this.interviewAddList()
  },
  interviewAddList:function(){
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/interview',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        stu_id: that.data.sid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          interviewAddList: res.data
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
      title: '面试详情'
    })
  },

add:function(){
  wx.showToast({
    title: '加载中..',
    icon: "loading",
    mask:true,
  })
  wx.navigateTo({
    url: '/pages/interviewed/interviewed?sid=' + this.data.sid,
    success:function(){
      wx.hideLoading();
      wx.hideToast();
    }
  })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.interviewAddList()
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