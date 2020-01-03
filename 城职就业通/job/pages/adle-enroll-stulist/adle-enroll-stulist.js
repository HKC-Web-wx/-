// pages/enroll-stulist/enroll-stulist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_id: '',
    stulist: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      class_id: options.cid,
      pid: options.pid
    })
    this.stu_list()
  },

  stu_list: function () {
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Admin/stu_enroll_list',
      method: 'GET',
      data: {
        pid: that.data.pid,
        class_id: that.data.class_id,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          stulist: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '报名详情'
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