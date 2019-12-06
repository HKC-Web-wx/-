
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    classname: '',
    teach_id: '',
    teach_name: '',
    index: '',
    inValue: '',
    classboolen: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      id: options.id,
      classname: options.classname,
      teach_id: options.teach_id,
      teach_name: options.teach_name
    })
  },

  inBindchange: function (e) {
    console.log(e)
    var that = this
    that.setData({
      index: e.detail.value,
      classboolen: true
    })
  },

  formSubmit: function (e) {
    var that = this
    console.log(e)
    if (that.data.classboolen == false) {
      that.setData({
        teach_id: that.data.teach_id
      })
    } else if (that.data.classboolen == true) {
      e.detail.value.teach_name = that.data.inValue[e.detail.value.teach_name].teach_name
      that.setData({
        teach_id: that.data.inValue[that.data.index].id
      })
    }
    var className = e.detail.value.classname;
    if (!className) {
      wx.showToast({
        title: '班级不能为空',
        icon: "none"
      })
      return;
    }
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/edit_class',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        id: that.data.id,
        className: e.detail.value.classname,
        teach_id: that.data.teach_id
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.exist == 0) {
          wx.showToast({
            icon: 'loading',
            title: '数据未修改',
          })
          return;
        }
        wx.redirectTo({
          url: '/pages/adle-classlist/adle-classlist',
        })
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

  }
})