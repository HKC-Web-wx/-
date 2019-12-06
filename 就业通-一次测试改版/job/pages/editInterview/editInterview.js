const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '',
    inValue: '',
    dateValue: '',
    sid: '',
    company:'',
    position:'',
    title:'无',
    id:'',
    face_time:'',
    fairboolen: false,
    pid:'',
    timeboolen: false
  },
  inBindchange: function (e) {
    console.log(e)
    var that = this
    that.setData({
      index: e.detail.value,
      fairboolen: true
    })
  },
  datePickerBindchange: function (e) {
    var that = this;
    that.setData({
      timeboolen: true,
      dateValue: e.detail.value,
    })
  },
  formSubmit: function (e) {
    console.log(e.detail)
    var that = this;
    var company = e.detail.value.company;
    var position = e.detail.value.position;
    if (that.data.fairboolen == false) {
      that.setData({
        pid: that.data.pid
      })
    } else if (that.data.fairboolen == true) {
      e.detail.value.title = that.data.inValue[e.detail.value.title].title
      that.setData({
        pid: that.data.inValue[that.data.index].id
      })
    }
    if(that.data.timeboolen == false){
      that.setData({
        face_time:that.data.face_time
      })
    }else if(that.data.timeboolen == true){
      that.setData({
        face_time:that.data.dateValue
      })
    }
    if (!company) {
      wx.showToast({
        title: '公司不能为空',
        icon: "none"
      })
      return;
    } else if (!position) {
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
      url: 'https://test.hivetech.cn/hkc/job/Home/Student/stu_edit_face',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        id: that.data.id,
        pid: that.data.pid,
        face_time: that.data.face_time,
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
    var that = this;
    if(options.title == "null"){
      that.setData({
        id: options.id,
        company: options.company,
        position: options.position,
        title : '无',
        face_time: options.face_time,
        pid: options.pid
      })
    }else{
      that.setData({
        id: options.id,
        company: options.company,
        position: options.position,
        title : options.title,
        face_time: options.face_time,
        pid: options.pid
      })
    }
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
          id: 0,
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