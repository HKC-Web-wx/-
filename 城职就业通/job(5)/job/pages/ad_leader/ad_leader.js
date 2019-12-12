
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aid: '',
    winHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      aid: options.aid,
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
  },
  //分管领导列表
  leader_list: function () {
    var that = this;
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Admin/leader_list',
      method: 'GET',
      data: {
        aid:that.data.aid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          leader_list: res.data
        })
        wx.hideLoading();
      }
    })
  },
  //修改操作
  edit_leader: function (e) {
    console.log(e)
    var that = this
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    let sex = e.currentTarget.dataset.sex
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: '/pages/ad-editleader/ad-editleader?id=' + id + '&name=' + name + '&sex=' + sex + '&code=' + code + '&aid=' + that.data.aid,
    })
  },
  //删除操作
  del_leader: function (e) {
    var that = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '是否确认删除？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
            mask:true
          })
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Admin/del_leader',
            method: 'GET',
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              console.log(res.data)
              wx.hideLoading();
              that.leader_list();
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //添加操作
  add: function (e) {
    wx.navigateTo({
      url: '/pages/ad-addleader/ad-addleader',
    })
  },

  //重置密码操作
  reset_password:function(e){
    wx.showModal({
      title: '提示',
      content: '是否确认重置其密码？',
      success(res){
        if (res.confirm) {
          wx.showLoading({
            title: '重置中',
            mask: true
          })
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Admin/reset_leader',
            method: 'GET',
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              if (res.data == 1) {
                wx.hideLoading();
                wx.showToast({
                  title: '重置成功',
                  mask:true,
                  duration:1300,
                  icon:"none"
                })
              }else{
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
        }else if (res.cancel) {
          console.log('取消重置操作')
        }
      },fail:function(err){
        console.log(err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '分管领导'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.leader_list()
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