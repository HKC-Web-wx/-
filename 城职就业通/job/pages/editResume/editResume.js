Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid: '',
    name: '',
    sex: '',
    code: '',
    phone: '',
    birthday: '',
    stu_email: '',
    stu_height: '',
    stu_weight: '',
    politics: '',
    stu_school: '',
    stu_self: '',
    stu_hobby: '',
    dateValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      sid: options.sid,
      name: options.stu_name,
      sex: options.stu_sex,
      code: options.stu_code,
      phone: options.stu_phone,
      birthday: options.birthday,
      stu_email: options.stu_email,
      stu_height: options.stu_height,
      stu_weight: options.stu_weight,
      politics: options.politics,
      stu_school: options.stu_school,
      stu_self: options.stu_self,
      stu_hobby: options.stu_hobby,
    })
  },

  radioChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      sex: e.detail.value,
    })
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that =  this
    console.log(e)
    var birthday= e.detail.value.birthday;
    var stu_email= e.detail.value.stu_email;
    var stu_height= e.detail.value.stu_height;
    var stu_weight= e.detail.value.stu_weight;
    var politics= e.detail.value.politics;
    var stu_school= e.detail.value.stu_school;
    var stu_self= e.detail.value.stu_self;
    var stu_hobby= e.detail.value.stu_hobby;

    if (!birthday) {
      wx.showToast({
        title: '出生年月不能为空',
        icon: "none"
      })
      return;
    } 
    var str = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ ;
    if (!str.test(stu_email)) {
      wx.showToast({
        title: '邮箱不能为空或格式不正确',
        icon: "none"
      })
      return;
    } 
    if (!stu_height) {
      wx.showToast({
        title: '身高不能为空',
        icon: "none"
      })
      return;
    }
    if (!stu_weight) {
      wx.showToast({
        title: '体重不能为空',
        icon: "none"
      })
      return;
    } 
    if (!politics) {
      wx.showToast({
        title: '政治面貌不能为空',
        icon: "none"
      })
      return;
    } 
    if (!stu_school) {
      wx.showToast({
        title: '毕业院校不能为空',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '提交数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Student/edit_resume',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        stu_id: that.data.sid,
        birthday: e.detail.value.birthday,
        stu_email: e.detail.value.stu_email,
        stu_height: e.detail.value.stu_height,
        stu_weight: e.detail.value.stu_weight,
        politics: e.detail.value.politics,
        stu_school: e.detail.value.stu_school,
        stu_self: e.detail.value.stu_self,
        stu_hobby: e.detail.value.stu_hobby,
      },
      success: function (res) {
        console.log(res.data)
        wx.hideLoading();
        wx.navigateBack({});
      },
      fail: function (err) {
        wx.hideLoading();
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '修改学生信息'
    })
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