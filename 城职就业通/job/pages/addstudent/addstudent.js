// pages/addstudent/addstudent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_id:'',
    stu_sex:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      class_id: options.id
    })
  },

  radioChange:function(e){
    console.log(e.detail.value)
    this.setData({
      stu_sex: e.detail.value,
    })
  },
  formSubmit: function (e) {
    console.log(e)
    var that = this
    var stu_code= e.detail.value.stu_code;
    var stu_name= e.detail.value.stu_name;
    var stu_sex= that.data.stu_sex;
    var stu_phone= e.detail.value.stu_phone;
    if(!stu_name){
      wx.showToast({
        title: '姓名不能为空',
        icon: "none"
      })
      return;
    }else if(!stu_sex){
      wx.showToast({
        title: '性别不能为空',
        icon: "none"
      })
      return;
    }else if(!stu_code){
      wx.showToast({
        title: '学号不能为空',
        icon: "none"
      })
      return;
    }else if(!stu_phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '提交数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/add_stu',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        class_id: that.data.class_id,
        stu_code: e.detail.value.stu_code,
        stu_name: e.detail.value.stu_name,
        stu_sex: that.data.stu_sex,
        stu_phone: e.detail.value.stu_phone,
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.exist == 0){
          wx.hideLoading();
          wx.showToast({
            title: '学号已经存在',
            icon:"none",
            duration:2000,
            mask:true
          })
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '添加成功',
            icon: "none",
            duration: 800,
            mask: true
          })
          wx.navigateBack();
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '添加学生信息'
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
    return {
      title: '城职就业通',
      path: '/pages/index/index'
    }
  }
})