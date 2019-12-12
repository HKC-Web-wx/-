const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu_content: '',
    msgid: '',
    lid:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      msgid: options.msgid,
      stu_content: options.content,
      lid:options.lid,
      id:options.id
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
        title: '回复不能为空',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '提交数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/reply_msg',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        lead_name: getApp().globalData.userInfo.nickName,
        content: e.detail.value.textarea,
        lead_id : that.data.lid,
        msg_id:that.data.msgid
      },
      success: function (res) {
        console.log(res.data)
        console.log("提交成功");
        that.setData({
          le_msg: res.data
        })
        wx.navigateBack();
        wx.hideLoading();
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