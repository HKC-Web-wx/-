const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:'',
    inValue:'',
    dateValue: '',
    sid:''
  },
  inBindchange:function(e){
    console.log(e)
    var that = this
    that.setData({
      index:e.detail.value
    })
    
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  formSubmit:function(e){
    var that = this;
    var face_time= e.detail.value.time;
    var company= e.detail.value.company;
    var position= e.detail.value.position;
    if (e.detail.value.title){
      e.detail.value.title = that.data.inValue[e.detail.value.title].title
      var pid = that.data.inValue[that.data.index].id
    }else{
      wx.showToast({
        title: '请选择招聘会',
        icon: "none"
      })
      return;
    }
    if(!face_time){
      wx.showToast({
        title: '请选择面试时间',
        icon: "none"
      })
      return;
    }else if(!company){
      wx.showToast({
        title: '公司不能为空',
        icon: "none"
      })
      return;
    }else if(!position){
      wx.showToast({
        title: '职位不能为空',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '提交数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/add_interview',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        pid: that.data.inValue[that.data.index].id,
        face_time: e.detail.value.time,
        stu_id: that.data.sid,
        company: e.detail.value.company,
        position: e.detail.value.position
      },
      success: function (res) {
        console.log(res.data)
        wx.navigateBack();
        wx.hideLoading();
      }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      sid:options.sid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '面试详情'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/information',
      data: {},
      success: function (res) {
        console.log(res.data)
        res.data.unshift({
          id:0,
          title: '无'
        })
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
    
  }
})