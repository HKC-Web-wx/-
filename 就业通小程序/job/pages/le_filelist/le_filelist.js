const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    lid: '',
    isclick: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id,
      lid: options.lid
    })
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/main_information',
      data: {
        id: options.id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          le_fw: res.data
        })
      }
    })
    this.messagelist(options)
  },

  //留言表
  messagelist: function (options) {
    console.log(options)
    var that = this
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/messages',
      data: {
        pid: that.data.id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          messagelist: res.data
        })
      }
    })
  },
  reply:function(e){
    var that = this
    console.log(e)
    let msgid = e.currentTarget.dataset.id
    let content = e.currentTarget.dataset.content
    wx.redirectTo({
      url: '/pages/le_messages/le_messages?msgid=' + msgid + '&content=' + content + '&lid=' + that.data.lid + '&id=' + that.data.id,
    })
  },
  block:function(options){
    var that = this
    console.log(options)
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/show_msg',
      data: {
        id: options.currentTarget.dataset.id
      },
      success: function (res) {
        console.log(res.data)
        that.messagelist(options)
      }
    })
  },
  hidden: function (options){
    var that = this
    console.log(options)
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/hide_msg',
      data: {
        id: options.currentTarget.dataset.id
      },
      success: function (res) {
        console.log(res.data)
        that.messagelist(options)
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