// pages/stulist/stulist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      class_id:options.id,
    })
    this.stu_list()
  },

  stu_list: function () {
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/stu_list',
      method: 'GET',
      data: {
        class_id:that.data.class_id,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          stulist: res.data
        })
      }
    })
  },

  edit_stu:function(e){
    console.log(e)

    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    let sex = e.currentTarget.dataset.sex
    let code = e.currentTarget.dataset.code
    let phone = e.currentTarget.dataset.phone
    wx.redirectTo({
      url: '/pages/editstudent/editstudent?id=' + id + '&name=' + name + '&sex=' + sex + '&code=' + code + '&phone=' + phone + '&class_id=' + this.data.class_id,
    })
  },
  del_stu:function(e){
    var that = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '是否确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Fair/del_stu',
            method: 'GET',
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              console.log(res.data)
              that.stu_list()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  add:function(){
    wx.redirectTo({
      url: '/pages/addstudent/addstudent?id=' + this.data.class_id,
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

  }
})