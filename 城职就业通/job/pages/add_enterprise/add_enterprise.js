
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lid: '',
    dateValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      lid: options.lid,
    })
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },

  formSubmit: function (e) {
    console.log(e)
    var that = this
    var enterprise_name = e.detail.value.enterprise_name;
    var enterprise_code = e.detail.value.enterprise_code;
    var enterprise_password = e.detail.value.enterprise_password;
    var expiration_date = e.detail.value.expiration_date;
    if (!enterprise_name) {
      wx.showToast({
        title: '请输入企业名称',
        icon: "none"
      })
      return;
    }
    if (!enterprise_code) {
      wx.showToast({
        title: '请输入企业账号',
        icon: "none"
      })
      return;
    }
    if (!enterprise_password) {
      wx.showToast({
        title: '请输入企业密码',
        icon: "none"
      })
      return;
    }
    if (!expiration_date) {
      wx.showToast({
        title: '请输入账号过期时间',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/add_enterprise',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        enterprise_name: e.detail.value.enterprise_name,
        enterprise_code: e.detail.value.enterprise_code,
        enterprise_password: e.detail.value.enterprise_password,
        expiration_date: e.detail.value.expiration_date,
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.exist == 0) {
          wx.hideLoading();
          wx.showToast({
            title: '账号已经存在',
            icon: "none",
            duration: 2000,
            mask: true
          })
        } else {
          wx.hideLoading();
          wx.navigateBack({})
        }
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