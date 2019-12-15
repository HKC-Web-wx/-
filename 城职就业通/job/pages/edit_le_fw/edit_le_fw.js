
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    address: '',
    image: '',
    images: '',
    details: '',
    imageurl: '',
    chooseblooen: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      title: options.title,
      address: options.address,
      image: options.image,
      details: options.details,
      chooseblooen: false
    })
  },
  chooseimage: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        console.log(res)
        that.setData({
          image: res.tempFilePaths
        })
        wx.uploadFile({
          url: 'https://test.hivetech.cn/hkc/job/Home/Leader/upload_image',
          header: {
            "Content-Type": "multipart/form-data"
          },
          filePath: res.tempFilePaths[0],
          name: 'upload',
          success: function (res) {
            console.log(res)
            console.log(JSON.parse(res.data))
            var data = JSON.parse(res.data)
            var imageurl = String(data.upload.savepath + data.upload.savename)
            that.setData({
              imageurl: imageurl,
              chooseblooen: true
            })
          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    })
  },

  formSubmit: function (e) {
    console.log(e)
    var that = this
    var url = 'https://test.hivetech.cn/hkc/job/Public/Fair/images/'
    var title = e.detail.value.title;
    var address = e.detail.value.address;
    var details = e.detail.value.details;
    if (!title) {
      wx.showToast({
        title: '标题不能为空',
        icon: "none"
      })
      return;
    } else if (!address) {
      wx.showToast({
        title: '地点不能为空',
        icon: "none"
      })
      return;
    } else if (!details) {
      wx.showToast({
        title: '详情不能为空',
        icon: "none"
      })
      return;
    }

    if (that.data.chooseblooen == false) {
      that.setData({
        images: that.data.image
      })
    } else if (that.data.chooseblooen == true) {
      that.setData({
        images: url + that.data.imageurl
      })
    }
    wx.showToast({
      title: '提交数据中',
      icon: "none",
      duration: 20000,
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/edit_information',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        id: that.data.id,
        image: that.data.images,
        title: e.detail.value.title,
        address: e.detail.value.address,
        details: e.detail.value.details
      },
      success: function (res) {
        console.log(res.data)
        if (res.data !== 1) {
          wx.showToast({
            title: '招聘会已存在',
            icon: "none",
            mask: true,
            duration: 1500
          })
        } else {
          wx.navigateBack();
          wx.hideLoading();
          wx.hideToast();
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '修改招聘会信息'
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