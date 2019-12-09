const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid:'',
    interviewAddList:'',
    winHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.showLoading({
      title: '加载数据中',
      mask:true
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    console.log(options)
    this.setData({
      sid:options.sid
    })
  },
  interviewAddList:function(){
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/interview',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        stu_id: that.data.sid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          interviewAddList: res.data
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
      title: '面试详情'
    })
  },

  add:function(){
    wx.showToast({
      title: '加载中..',
      icon: "loading",
      mask:true,
    })
    wx.navigateTo({
      url: '/pages/interviewed/interviewed?sid=' + this.data.sid,
      success:function(){
        wx.hideLoading();
        wx.hideToast();
      }
    })
  },
  edit_face:function(e){
    let id = e.currentTarget.dataset.id
    let company = e.currentTarget.dataset.company
    let position = e.currentTarget.dataset.position
    let title = e.currentTarget.dataset.title
    let pid = e.currentTarget.dataset.pid
    let face_time = e.currentTarget.dataset.face_time
    console.log(pid)
    wx.navigateTo({
      url: '/pages/editInterview/editInterview?id=' + id + '&company=' + company + '&position=' + position + '&title=' + title + '&face_time=' + face_time + '&pid=' + pid
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.interviewAddList()
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