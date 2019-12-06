Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    sex: '',
    code: '',
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
    var teach_name = e.detail.value.teach_name;
    var teach_sex = e.detail.value.teach_sex;
    var teach_code = e.detail.value.teach_code;
    if (!teach_name) {
      wx.showToast({
        title: '姓名不能为空',
        icon: "none"
      })
      return;
    } else if (!teach_sex) {
      wx.showToast({
        title: '性别不能为空',
        icon: "none"
      })
      return;
    } else if (!teach_code) {
      wx.showToast({
        title: '教工号不能为空',
        icon: "none"
      })
      return;
    }
    wx.showToast({
      title: '提交数据中',
      icon: "none",
      duration: 20000,
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/edit_teach',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        id: that.data.id,
        teach_name: e.detail.value.teach_name,
        teach_sex: e.detail.value.teach_sex,
        teach_code: e.detail.value.teach_code,
      },
      success: function (res) {
        console.log(res.data)
        wx.navigateBack();
        wx.hideLoading();
        wx.hideToast();
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