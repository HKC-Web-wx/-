
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '',
    inValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

  inBindchange: function (e) {
    console.log(e)
    var that = this
    that.setData({
      index: e.detail.value,
    })
  },

  formSubmit: function (e) {
    var that = this
    if (e.detail.value.teach_name) {
      e.detail.value.teach_name = that.data.inValue[e.detail.value.teach_name].teach_name
      var teach_id = that.data.inValue[that.data.index].id;
    }
    var className = e.detail.value.classname;
    if (!className) {
      wx.showToast({
        title: '班级不能为空',
        icon: "none"
      })
      return;
    } else if (!teach_id) {
      wx.showToast({
        title: '辅导员不能为空',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '数据提交中',
      mask:true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/add_class',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        className: e.detail.value.classname,
        teach_id: that.data.inValue[that.data.index].id
      },
      success: function (res) {
        console.log(res.data)
        wx.navigateBack();
        wx.hideLoading();
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
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/teach_list',
      data: {

      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          inValue: res.data
        })
      }
    })
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
    return;
  }
})