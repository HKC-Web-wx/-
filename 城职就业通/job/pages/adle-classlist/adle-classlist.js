
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    aid: '',
    lid: '',
    winHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    this.setData({
      aid: options.aid,
      lid: options.pid
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    // this.class_list()
  },
  edit_class: function (e) {
    console.log(e.currentTarget.dataset)
    let classid = e.currentTarget.dataset.classid
    let classname = e.currentTarget.dataset.classname
    let teach_id = e.currentTarget.dataset.teach_id
    let teach_name = e.currentTarget.dataset.teach_name
    let teach_state = e.currentTarget.dataset.teach_state
    let headmaster_id = e.currentTarget.dataset.headmaster_id
    let headmaster_name = e.currentTarget.dataset.headmaster_name
    let headmaster_state = e.currentTarget.dataset.headmaster_state
    wx.navigateTo({
      url: '/pages/adle-editclass/adle-editclass?classid=' + classid + '&classname=' + classname + '&teach_id=' + teach_id + '&teach_name=' + teach_name + '&teach_state=' + teach_state + '&headmaster_id=' + headmaster_id + '&headmaster_name=' + headmaster_name + '&headmaster_state=' + headmaster_state,
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
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/class_list',
      method: 'GET',
      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          classlist: res.data
        })
        wx.hideLoading();
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