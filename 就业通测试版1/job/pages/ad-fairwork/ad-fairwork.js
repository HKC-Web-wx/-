
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      aid: options.aid
    })
    this.loadData();
  },
  loadData: function(){
    var that = this
    wx.showLoading({
      title: '提交数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/information ',
      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          ad_fw: res.data,
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
      title: '管理招聘会'
    })
  },
  ad_fw: function (res) {
    let id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/ad_filelist/ad_filelist?id=' + id + '&lid=' + this.data.lid,
    })
  },

  edit_ad_fw: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    let address = e.currentTarget.dataset.address
    let details = e.currentTarget.dataset.details
    let image = e.currentTarget.dataset.image

    wx.navigateTo({
      url: '/pages/edit_ad_fw/edit_ad_fw?id=' + id + '&title=' + title + '&address=' + address + '&details=' + details + '&image=' + image,
    })
  },
  del_ad_fw: function (e) {
    var that = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '是否确认删除？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Leader/del_information',
            method: 'GET',
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              console.log(res.data)
              wx.request({
                url: 'https://test.hivetech.cn/hkc/job/Home/Leader/information',
                data: {},
                success: function (res) {
                  console.log(res.data)
                  that.setData({
                    le_fw: res.data,
                  })
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  add: function () {
    wx.navigateTo({
      url: '/pages/add_ad_filelist/add_ad_filelist',
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