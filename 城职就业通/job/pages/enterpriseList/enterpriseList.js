
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lid: '',
    aid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      lid: options.lid,
      aid:options.aid,
    })
  },

  //企业列表
  enterprise_list: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/enterprise_list',
      method: 'GET',
      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          enterpriselist: res.data
        })
        wx.hideLoading();
      }
    })
  },

  //修改学生操作
  edit_stu: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let enterprise_name = e.currentTarget.dataset.name
    let enterprise_code = e.currentTarget.dataset.code
    let expiration_date = e.currentTarget.dataset.time
    wx.navigateTo({
      url: '/pages/edit_enterprise/edit_enterprise?id=' + id + '&enterprise_name=' + enterprise_name + '&enterprise_code=' + enterprise_code + '&expiration_date=' + expiration_date,
    })
  },
  //删除学生操作
  del_stu: function (e) {
    var that = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '是否确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Leader/delete_enterprise',
            method: 'GET',
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              console.log(res.data)
              that.enterprise_list()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //添加企业操作
  add: function (e) {
    wx.showToast({
      title: '加载中',
      duration: 2000,
      mask: true,
      icon: "none"
    })
    wx.navigateTo({
      url: '/pages/add_enterprise/add_enterprise',
      success: function () {
        wx.hideToast();
      }
    })
  },
  reset_password: function (e) {
    console.log(e.currentTarget.dataset);
    wx.showModal({
      title: '提示',
      content: '是否确认重置其密码为123456？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '重置中',
            mask: true
          })
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Leader/reset_password',
            method: 'GET',
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              console.log(res)
              if (res.data == 0 || res.data == 1) {
                wx.hideLoading();
                wx.showToast({
                  title: '重置成功',
                  mask: true,
                  duration: 1300,
                  icon: "none"
                })
              } else {
                wx.hideLoading();
                wx.showToast({
                  title: '重置失败',
                  mask: true,
                  duration: 1200,
                  icon: "none"
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('取消重置操作')
        }
      }, fail: function (err) {
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '管理企业'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.enterprise_list();
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