
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    enterprise_code: '',
    enterprise_name: '',
    expiration_date: '',
    dateValue: '',
    priseboolen:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      id: options.id,
      enterprise_code: options.enterprise_code,
      enterprise_name: options.enterprise_name,
      expiration_date: options.expiration_date,
    })
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value,
      priseboolen:true,
    })
  },

  formSubmit: function (e) {
    console.log(e)
    var that = this

    if (that.data.priseboolen == false) {
      that.setData({
        expiration_date: that.data.expiration_date
      })
    } else if (that.data.priseboolen == true) {
      that.setData({
        expiration_date: that.data.dateValue
      })
    }

    var enterprise_name = e.detail.value.enterprise_name;
    var enterprise_code = e.detail.value.enterprise_code;
    var enterprise_password = e.detail.value.enterprise_password;
    var expiration_date = that.data.expiration_date;
    
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
    // if (!enterprise_password) {
    //   wx.showToast({
    //     title: '请输入企业密码',
    //     icon: "none"
    //   })
    //   return;
    // }
    if (!expiration_date) {
      wx.showToast({
        title: '请输入账号过期时间',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '提交中',
      mask:true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/edit_enterprise',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        id:that.data.id,
        enterprise_name: e.detail.value.enterprise_name,
        enterprise_code: e.detail.value.enterprise_code,
        // enterprise_password: e.detail.value.enterprise_password,
        expiration_date: that.data.expiration_date,
      },
      success: function (res) {
        console.log(res.data)
        if(res.data !== 1){
          wx.hideLoading();
          wx.showToast({
            title: '账号已经存在',
            icon:"none",
            duration:1500,
            mask:true
          })
        }else{
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
    wx.setNavigationBarTitle({
      title: '修改企业账号'
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
    return {
      title: '城职就业通',
      path: '/pages/index/index'
    }
  }
})