const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid:'',
    acceptedAddlist:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载数据中',
      mask : true
    })
    console.log(options)
    this.setData({
      sid:options.sid
    })
    this.acceptedAddlist()
  },
  acceptedAddlist: function () {
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/admission',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        stu_id:that.data.sid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          acceptedAddlist: res.data
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
      title: '录取详情'
    })
  },

  add: function () {
    wx.navigateTo({
      url: '/pages/accepted/accepted?sid=' + this.data.sid,
    })
  },
  edit_luqu: function (e) {
    let id = e.currentTarget.dataset.id
    let company = e.currentTarget.dataset.company
    let position = e.currentTarget.dataset.position
    let title = e.currentTarget.dataset.title
    let pid = e.currentTarget.dataset.pid
    let luqu_time = e.currentTarget.dataset.luqu_time
    console.log(pid)
    wx.navigateTo({
      url: '/pages/editAccepted/editAccepted?id=' + id + '&company=' + company + '&position=' + position + '&title=' + title + '&luqu_time=' + luqu_time + '&pid=' + pid
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.acceptedAddlist()
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
