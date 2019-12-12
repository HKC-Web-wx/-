
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '',
    inValue: '',
    index_h: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

  inBindchange: function (e) {
    console.log(e)
    var that = this
    that.setData({
      index: e.detail.value,
    })
  },
  inBindchange_h: function (e) {
    console.log(e)
    var that = this
    that.setData({
      index_h: e.detail.value,
    })
  },

  formSubmit: function (e) {
    var that = this
    //辅导员
    if (e.detail.value.teach_name) {
      e.detail.value.teach_name = that.data.inValue[e.detail.value.teach_name].teach_name
      var teach_id = that.data.inValue[that.data.index].id;
    }
    //班主任
    if (e.detail.value.headmaster_name) {
      e.detail.value.headmaster_name = that.data.inValue[e.detail.value.headmaster_name].teach_name
      var h_teach_id = that.data.inValue[that.data.index_h].id;
    }
    var className = e.detail.value.classname;
    if (!className) {
      wx.showToast({
        title: '班级不能为空',
        icon: "none",
        duration: 1200,
        mask: true
      })
      return;
    } else if (!teach_id) {
      wx.showToast({
        title: '辅导员不能为空',
        icon: "none",
        duration: 1200,
        mask: true
      })
      return;
    }else if(!h_teach_id){
      wx.showToast({
        title: '班主任不能为空',
        icon: "none",
        duration:1200,
        mask: true
      })
      return;
    }else if(teach_id == h_teach_id){
      wx.showToast({
        title: '指定不能相同',
        icon: "none",
        duration: 1200,
        mask: true
      })
      return;
    }
    wx.showLoading({
      title: '数据提交中',
      mask:true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/add_class',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        className: e.detail.value.classname,
        teach_id: that.data.inValue[that.data.index].id,
        headmaster: that.data.inValue[that.data.index_h].id
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.exist == 0){
          wx.hideLoading();
          wx.showToast({
            title: '班级已存在',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        } else if (res.data.exist == 1){
          wx.hideLoading();
          wx.showToast({
            title: '班主任指定无效',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        } else if (res.data.exist == 2){
          wx.hideLoading();
          wx.showToast({
            title: '辅导员指定无效',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        }else{
          wx.navigateBack();
          wx.hideLoading();
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '添加班级信息'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/teach_list',
      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          inValue: res.data
        })
      }
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
    return;
  }
})