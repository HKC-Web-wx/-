// pages/classlist/classlist.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:'',
    pid:'',
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
      tid:options.tid,
      pid:options.pid
    })
    this.class_list();
    
  },

  // edit_class:function(e){
  //   console.log(e)
  //   let id = e.currentTarget.dataset.id
  //   let name = e.currentTarget.dataset.name
  //   wx.redirectTo({
  //     url: '/pages/editclass/editclass?id=' + id + '&name=' + name + '&tid=' + this.data.tid,
  //   })
  // },
  // del_class:function(e){
  //   var that = this
  //   console.log(e)
  //   wx.showModal({
  //     title: '提示',
  //     content: '是否确认删除？',
  //     success(res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //         wx.request({
  //           url: 'https://test.hivetech.cn/hkc/job/Home/Fair/del_class',
  //           method: 'GET',
  //           data: {
  //             id: e.currentTarget.dataset.id
  //           },
  //           success: function (res) {
  //             console.log(res.data)
  //             that.class_list()
  //           }
  //         })
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
    
  // },
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

  class_list:function(){
    var that = this;
    if(that.data.pid){
      console.log('pid存在数值');
      wx.request({
        url: 'https://test.hivetech.cn/hkc/job/Home/Fair/class_list',
        method: 'GET',
        data: {
          teach_id: that.data.tid
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            classlist: res.data
          })
          wx.hideLoading();
        }
      })
    }else{
      console.log('pid为空');
      wx.request({
        url: 'https://test.hivetech.cn/hkc/job/Home/Fair/class_list',
        method: 'GET',
        data: {
          teach_id: that.data.tid
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            classlist: res.data
          })
          wx.hideLoading();
        }
      })
    }
  },
  stu_list:function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/stulist/stulist?id=' + id,
    })
  },
  add: function () {
    wx.redirectTo({
      url: '/pages/addclass/addclass?tid=' + this.data.tid,
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