// pages/editclass/editclass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    className: '',
    tid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      id:options.id,
      className:options.name,
      tid:options.tid
    })
  },

  formSubmit: function (e) {
    console.log(e)
    var that = this
    var className= e.detail.value.classname;
    if(!className){
      wx.showToast({
        title: '请输入班级名',
        icon: "none"
      })
      return;
    }
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/edit_class',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        id:that.data.id,
        className:e.detail.value.classname,
      },
      success: function (res) {
        console.log(res.data)
        wx.redirectTo({
          url: '/pages/classlist/classlist?tid=' + that.data.tid,
        })
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