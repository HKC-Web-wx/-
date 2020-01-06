const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '',
    acValue: '',
    dateValue: '',
    sid:''
  },
  acBindchange: function (e) {
    console.log(e)
    var that = this
    that.setData({
      index: e.detail.value
    })
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.title){
      e.detail.value.title = that.data.acValue[e.detail.value.title].title
      console.log(e.detail.value.title)
      var pid = that.data.acValue[that.data.index].id;
      var luqu_time = e.detail.value.time;
      var company = e.detail.value.company;
      var position = e.detail.value.position;
      var company_user = e.detail.value.company_user;
      var company_phone = e.detail.value.company_phone;
    }
    if (!e.detail.value.title){
      wx.showToast({
        title: '请选择招聘会',
        icon: "none"
      })
      return;
    }if(luqu_time == ''){
      wx.showToast({
        title: '时间不能为空',
        icon: "none"
      })
      return;
    }if(company == ''){
      wx.showToast({
        title: '公司不能为空',
        icon: "none"
      })
      return;
    }if(position == ''){
      wx.showToast({
        title: '职位不能为空',
        icon: "none"
      })
      return;
    } if (company_user == '') {
      wx.showToast({
        title: '联系人不能为空',
        icon: "none"
      })
      return;
    } if (company_phone == '') {
      wx.showToast({
        title: '联系电话不能为空',
        icon: "none"
      })
      return;
    } 

    wx.showLoading({
      title: '提交数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/add_admission',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        pid: pid,
        luqu_time: luqu_time,
        stu_id: that.data.sid,
        company: company,
        position: position,
        company_user: company_user,
        company_phone: company_phone
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '提交成功',
        })
        wx.hideLoading();
        wx.hideToast();
        wx.navigateBack();
        
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
      title: '添加录用信息'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/information',
      data: {

      },
      success: function (res) {
        // console.log(res.data)
        res.data.unshift({
          id: 0,
          title: '无'
        })
        that.setData({
          acValue: res.data
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