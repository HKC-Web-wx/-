// pages/enroll-classlist/enroll-classlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enroll_classlist: '',
    pid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      pid: options.pid
    })
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Admin/class_enroll_count',
      data: {
        pid: that.data.pid,
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          enroll_classlist: res.data
        })
        wx.hideLoading();
      }
    })
  },
  enroll_stulist: function (e) {
    var that = this;
    let cid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/adle-enroll-stulist/adle-enroll-stulist?cid=' + cid + '&pid=' + that.data.pid
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