
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    aid: '',
    lid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      aid: options.aid,
      lid: options.pid
    })
    this.class_list()
  },

  edit_class: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let classname = e.currentTarget.dataset.classname
    let teach_id = e.currentTarget.dataset.teach_id
    let teach_name = e.currentTarget.dataset.teach_name
    wx.navigateTo({
      url: '/pages/adle-editclass/adle-editclass?id=' + id + '&classname=' + classname + '&teach_id=' + teach_id + '&teach_name=' + teach_name,
    })
  },
  del_class: function (e) {
    var that = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '是否确认删除？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Leader/del_class',
            method: 'GET',
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              console.log(res.data)
              that.class_list()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
    this.class_list();
  },

  class_list: function () {
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/class_list',
      method: 'GET',
      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          classlist: res.data
        })
      }
    })
  },
  add: function () {
    wx.navigateTo({
      url: '/pages/adle-addclass/adle-addclass',
    })
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