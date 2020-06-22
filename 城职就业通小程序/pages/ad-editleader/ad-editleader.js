Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    sex: '',
    code: '',
    aid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      id: options.id,
      name: options.name,
      sex: options.sex,
      code: options.code,
      aid:options.aid
    })
  },

  radioChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      sex: e.detail.value,
    })
  },

  formSubmit: function (e) {
    var that = this
    console.log(e)
    var lead_name = e.detail.value.lead_name;
    var lead_sex = e.detail.value.lead_sex;
    var lead_code = e.detail.value.lead_code;
    if (!lead_name) {
      wx.showToast({
        title: '姓名不能为空',
        icon: "none"
      })
      return;
    } else if (!lead_sex) {
      wx.showToast({
        title: '性别不能为空',
        icon: "none"
      })
      return;
    } else if (!lead_code) {
      wx.showToast({
        title: '教工号不能为空',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '提交数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Admin/edit_leader',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        id: that.data.id,
        lead_name: e.detail.value.lead_name,
        lead_sex: e.detail.value.lead_sex,
        lead_code: e.detail.value.lead_code,
      },
      success: function (res) {
        console.log(res.data)
        if (res.data !== 1) {
          wx.showToast({
            title: '教工号已存在',
            icon: "none",
            mask: true,
            duration: 1500
          })
        } else {
          wx.navigateBack();
          wx.hideLoading();
          wx.hideToast();
        }
      },
      fail: function (err) {
        console.log(err);
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
    return {
      title: '城职就业通',
      path: '/pages/index/index'
    }
  }
})