
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aid: '',
    lid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      aid: options.aid,
      lid: options.lid
    })
    this.teach_list()
  },

  teach_list: function () {
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/teach_list',
      method: 'GET',
      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          teach_list: res.data
        })
        wx.hideLoading();
      }
    })
  },

  edit_tech: function (e) {
    console.log(e)

    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    let sex = e.currentTarget.dataset.sex
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: '/pages/adle-editteacher/adle-editteacher?id=' + id + '&name=' + name + '&sex=' + sex + '&code=' + code,
    })
  },
  del_tech: function (e) {
    var that = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '是否确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Leader/del_teach',
            method: 'GET',
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              console.log(res.data)
              that.teach_list()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  add: function (e) {
    wx.navigateTo({
      url: '/pages/adle-addteacher/adle-addteacher',
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
    this.teach_list();
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