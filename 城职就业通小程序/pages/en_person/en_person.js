
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    eid: '',
    code_boolen: false,
    enterprise_news: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.eid)
    this.setData({
      eid: options.eid,
      code_boolen: false
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    }
  },
  //个人信息
  loadData: function () {
    var that = this;
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Enterprise/enterprise_info',
      method: 'GET',
      data: {
        id: that.data.eid
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data);
        that.setData({
          enterprise_news: res.data
        })
      }
    })
  },
  //原密码提交
  formSubmit: function (e) {
    var that = this;
    if (that.data.code_boolen == false) {
      if (e.detail.value.oldPassword == '') {
        wx.showToast({
          title: '密码不能为空',
          duration: 1500,
          icon: "none",
          mask: true
        })
      } else {
        wx.showLoading({
          title: '提交中',
          mask: true
        })
        wx.request({
          url: 'https://test.hivetech.cn/hkc/job/Home/Enterprise/old_password',
          method: 'POST',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: {
            id: that.data.eid,
            old_pad: e.detail.value.oldPassword
          },
          success: function (res) {
            console.log(res.data)
            wx.hideLoading();
            if (res.data.exist == 1) {
              wx.showToast({
                title: '原密码错误',
                duration: 1500,
                icon: "none",
                mask: true
              })
            } else if (res.data.exist == 0) {
              wx.showToast({
                title: '请设置新密码',
                duration: 1000,
                icon: "none",
                mask: true
              })
              that.setData({
                code_boolen: true
              })
            }
          }
        })
      }
    } else if (that.data.code_boolen == true) {
      wx.request({
        url: 'https://test.hivetech.cn/hkc/job/Home/Enterprise/new_password',
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          id: that.data.eid,
          new_pad: e.detail.value.newPassword
        },
        success: function (res) {
          console.log(res.data)
          wx.hideLoading();
          if (res.data.exist == 1) {
            wx.showToast({
              title: '修改失败',
              duration: 1500,
              icon: "none",
              mask: true
            })
          } else if (res.data.exist == 0) {
            wx.showToast({
              title: '修改成功',
              duration: 1200,
              icon: "none",
              mask: true
            })
            that.setData({
              code_boolen: false
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData();
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