const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    sid:'',
    isclick:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    console.log(options)
    this.setData({
      sid:options.sid
    })
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/content',
      data: {
        id: options.id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          id:options.id,
          array: res.data
        })
      }
    })
    this.messagelist(options)
  },

  //报名按钮
  enrolment:function(){
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/sign_up ',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        stu_id: that.data.sid,
        pid: that.data.id,
      },
      success: function (res) {
        console.log(res);
        if (res.data == '1') {
          wx.showToast({
            title: '报名成功',
          })
          that.setData({
            isclick: false
          })
        } else if (res.data == '0') {
          wx.showToast({
            title: '您已报名',
          })
          that.setData({
            isclick: false
          })
        }
      }
    })
  },

  //写留言按钮跳转
  msg: function (options) {
    console.log(options)
    let id = options.currentTarget.dataset.id
    var sid = options.currentTarget.dataset.sid
    wx.navigateTo({
      url: '/pages/messages/messages?id=' + id + '&sid=' + sid,
    })
  },
//留言表
  messagelist:function(options){
    console.log(options)
    var that = this
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/messages',
      data: {
        pid: options.id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          messagelist: res.data
        })
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