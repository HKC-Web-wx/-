const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // id:'',
    sid:'',//学生用户id
    isclick:true,
    pid:'',//招聘会id
    messagelist:'',//留言列表
    array:''//详情内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      sid:options.sid,
      pid:options.id
    })
  },
  //招聘会详情页面
  fair_content:function(){
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/content',
      data: {
        id: that.data.pid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          array: res.data
        })
      }
    })
    this.messagelist()
  },
  //跳转至文件列表
  look_file: function () {
    wx.navigateTo({
      url: '/pages/fair_file/fair_file?fair_id=' + this.data.pid,
    })
  },
  //报名按钮
  enrolment:function(){
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/sign_up',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        stu_id: that.data.sid,
        pid: that.data.pid,
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
  msg: function () {
    console.log(this.data.pid+ '.....' + this.data.sid);
    let pid = this.data.pid
    let sid = this.data.sid
    wx.navigateTo({
      url: '/pages/messages/messages?pid=' + pid + '&sid=' + sid,
    })
  },
//留言表
  messagelist:function(){
    var that = this
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/messages',
      data: {
        pid: that.data.pid
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
    wx.setNavigationBarTitle({
      title: '招聘会详情'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.fair_content();
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