// pages/enroll-classlist/enroll-classlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enroll_classlist:'',
    pid:'',
    tid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    var that = this;
    console.log(options);
    that.setData({
      pid:options.pid,
      tid:options.tid
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/class_enroll_count',
      data:{
        pid:options.pid,
        teach_id:options.tid
      },
      success:function(res){
        console.log(res.data);
        that.setData({
          enroll_classlist : res.data
        })
        wx.hideLoading();
      }
    })
  },
  enroll_stulist:function(e){
    var that = this;
    let cid = e.currentTarget.dataset.id
    // console.log(cid);
    if(cid){
      wx.showToast({
        title: '跳转中',
        icon:"none",
        duration:2000,
        mask:true
      })
      wx.navigateTo({
        url: '/pages/enroll-stulist/enroll-stulist?cid=' + cid + '&pid=' + that.data.pid,
      })
    }else{
      wx.showToast({
        title: '班级暂无人报名',
        icon:"none",
        duration:1000,
        mask:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('ready');
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