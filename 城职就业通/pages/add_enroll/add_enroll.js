// pages/add_enroll/add_enroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      stu_id:options.sid
    })
  },
  formSubmit: function (e) {
    var that =this;
    var title = e.detail.value.title;
    var address = e.detail.value.address;
    console.log(title + address)
    wx.showLoading({
      title: '提交中',
    })
    if (!title){
      wx.hideLoading();
      wx.showToast({
        title: '招聘会名称不能为空',
        icon:"none",
        mask:true,
        duration:1200
      })
      return;
    }
    if (!address){
      wx.hideLoading();
      wx.showToast({
        title: '招聘会地点不能为空',
        icon: "none",
        mask: true,
        duration: 1200
      })
      return;
    }
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Student/add_enroll_info',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        title: title,
        address: address,
        stu_id: that.data.stu_id
      },
      success:function(res){
        wx.hideLoading();
        console.log(res.data);
        if(res.data == '数据已存在'){
          wx.showToast({
            title: '该数据已存在',
            icon: "none",
            duration: 1200,
            mask: true
          })
          return;
        }else{
          wx.showToast({
            title: '添加成功',
            icon: "none",
            duration: 800,
            mask: true
          })
          wx.navigateBack({});
        }
      },fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: '加载失败请稍后再试',
          icon: "none",
          duration: 1200,
          mask: true
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
    return {
      title: '城职就业通',
      path: '/pages/index/index'
    }
  }
})