Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    sex: '',
    code: '',
    phone: '',
    class_id: '',
    classname: '',
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
      name: options.name,
      sex: options.sex,
      code: options.code,
      phone: options.phone,
      class_id: options.class_id,
      classname: options.classname,
      classboolen: false,
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

  radioChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      sex: e.detail.value,
    })
  },

  formSubmit: function (e) {
    var that = this
    console.log(e)

    if (that.data.classboolen == false) {
      that.setData({
        class_id: that.data.class_id
      })
    } else if (that.data.classboolen == true) {
      e.detail.value.classname = that.data.inValue[e.detail.value.classname].classname
      that.setData({
        class_id: that.data.inValue[that.data.index].id
      })
    }
    var stu_name = e.detail.value.stu_name;
    var stu_sex = e.detail.value.stu_sex;
    var stu_code = e.detail.value.stu_code;
    var stu_phone = e.detail.value.stu_phone;
    if (!stu_name) {
      wx.showToast({
        title: '名字不能为空',
        icon: "none"
      })
      return;
    } else if (!stu_sex) {
      wx.showToast({
        title: '性别不能为空',
        icon: "none"
      })
      return;
    } else if (!stu_code) {
      wx.showToast({
        title: '学号不能为空',
        icon: "none"
      })
      return;
    } else if (!stu_phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '提交数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/edit_stu',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        id: that.data.id,
        class_id: that.data.class_id,
        stu_name: e.detail.value.stu_name,
        stu_sex: e.detail.value.stu_sex,
        stu_code: e.detail.value.stu_code,
        stu_phone: e.detail.value.stu_phone,
      },
      success: function (res) {
        console.log(res.data)
        if (res.data !== 1) {
          wx.showToast({
            title: '学号已存在',
            icon: "none",
            mask: true,
            duration: 1500
          })
        } else {
          wx.navigateBack();
          wx.hideLoading();
          wx.hideToast();
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '修改学生信息'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/class_list',
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