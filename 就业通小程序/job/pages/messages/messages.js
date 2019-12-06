const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    content:'',
    id:'',
    sid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      id: options.id,
      sid: options.sid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  bindFormSubmit: function (e) {
    console.log(e)
    console.log(getApp().globalData.userInfo)

    var that = this;
    var content= e.detail.value.textarea;
    if(!content){
      wx.showToast({
        title: '内容不能为空',
        icon: "none"
      })
      return;
    }
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/add_message',
      method: 'POST',
      header: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        avatarUrl: getApp().globalData.userInfo.avatarUrl,
        username:getApp().globalData.userInfo.nickName,
        content: e.detail.value.textarea,
        pid: that.data.id,
      },
      success: function (res) {
        console.log(res.data)
        console.log("提交成功");
        that.setData({
          array: res.data
        })
        wx.redirectTo({
          url: '/pages/filelist/filelist?id=' + that.data.id + '&sid=' + that.data.sid,
        })
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