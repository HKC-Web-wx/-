
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classid: '',
    classname: '',
    teach_id: '',
    teach_name: '',
    teach_state: '',
    headmaster_id: '',
    headmaster_name: '',
    headmaster_state: '',
    index: '',
    index_h: '',
    inValue: '',
    classboolen: false,
    h_classboolen: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      classid: options.classid,
      classname: options.classname,
      teach_id: options.teach_id,
      teach_name: options.teach_name,
      teach_state: options.teach_state,
      headmaster_id: options.headmaster_id,
      headmaster_name: options.headmaster_name,
      headmaster_state: options.headmaster_state
    })
  },

  inBindchange: function (e) {
    console.log(e)
    var that = this
    that.setData({
      index: e.detail.value,
      classboolen: true
    })
  },

  inBindchange_h: function (e) {
    console.log(e)
    var that = this
    that.setData({
      index_h: e.detail.value,
      h_classboolen: true
    })
  },

  formSubmit: function (e) {
    var that = this
    console.log(e)
    if (that.data.classboolen == false) {
      that.setData({
        teach_id: that.data.teach_id
      })
    } else if (that.data.classboolen == true) {
      e.detail.value.teach_name = that.data.inValue[e.detail.value.teach_name].teach_name
      that.setData({
        teach_id: that.data.inValue[that.data.index].id
      })
    }
    if (that.data.h_classboolen == false) {
      that.setData({
        headmaster_id: that.data.headmaster_id
      })
    } else if (that.data.h_classboolen == true) {
      e.detail.value.headmaster_name = that.data.inValue[e.detail.value.headmaster_name].teach_name
      that.setData({
        headmaster_id: that.data.inValue[that.data.index_h].id
      })
    }
    var className = e.detail.value.classname;
    if (!className) {
      wx.showToast({
        title: '班级不能为空',
        icon: "none",
        duration:1200,
        mask:true
      })
      return;
    }
    if(that.data.teach_id == that.data.headmaster_id){
      wx.showToast({
        title: '指定不能相同',
        icon: "none",
        duration: 1200,
        mask: true
      })
      return;
    }
    wx.showLoading({
      title: '提交数据中',
      mask:true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/edit_class',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        id: that.data.classid,
        className: e.detail.value.classname,
        teach_id: that.data.teach_id,
        headmaster: that.data.headmaster_id
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.exist == 0) {
          wx.showToast({
            icon: 'loading',
            title: '请变更后再提交',
            duration:1500
          })
          return;
        } else if (res.data.exist == 1) {
          wx.hideLoading();
          wx.showToast({
            title: '班主任指定无效',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        } else if (res.data.exist == 2) {
          wx.hideLoading();
          wx.showToast({
            title: '辅导员指定无效',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        } else {
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
      title: '修改班级信息'
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
    return {
      title: '城职就业通',
      path: '/pages/index/index'
    }
  }
})