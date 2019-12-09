
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aid: '',
    lid: '',
    select: false,
    grade_name: '--请选择--',
    classlist: '',
    class_id:'',
    winHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    that.setData({
      aid: options.aid,
      lid: options.lid
    })
    that.class_list();
  },
  //下拉菜单
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    console.log(e)
    var name = e.currentTarget.dataset.name
    var class_id = e.currentTarget.dataset.id
    this.setData({
      grade_name: name,
      select: false,
      class_id : class_id
    })
    this.stu_list();
  },

  //班级列表
  class_list: function(){
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/class_list',
      method: 'GET',
      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          classlist: res.data
        })
        // wx.hideLoading();
      }
    })
  },

  //学生列表
  stu_list: function () {
    wx.showLoading({
      title: '数据加载中',
      mask:true
    })
    var that = this;
    if(that.data.class_id){
      wx.request({
        url: 'https://test.hivetech.cn/hkc/job/Home/Leader/stu_list',
        method: 'GET',
        data: {
          class_id : that.data.class_id
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            stulist: res.data
          })
          wx.hideLoading();
        }
      })
    }else{
      wx.request({
        url: 'https://test.hivetech.cn/hkc/job/Home/Leader/stu_list',
        method: 'GET',
        data: {},
        success: function (res) {
          console.log(res.data)
          that.setData({
            stulist: res.data
          })
          wx.hideLoading();
        }
      })
    }
    
  },

  //修改学生操作
  edit_stu: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    let sex = e.currentTarget.dataset.sex
    let code = e.currentTarget.dataset.code
    let phone = e.currentTarget.dataset.phone
    let class_id = e.currentTarget.dataset.class_id
    let classname = e.currentTarget.dataset.classname
    wx.navigateTo({
      url: '/pages/adle-editstudent/adle-editstudent?id=' + id + '&name=' + name + '&sex=' + sex + '&code=' + code + '&phone=' + phone + '&class_id=' + class_id + '&classname=' + classname,
    })
  },

  //删除学生操作
  del_stu: function (e) {
    var that = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '是否确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Leader/del_stu',
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

  //添加学生操作
  add: function (e) {
    wx.showToast({
      title: '加载中',
      duration:2000,
      mask: true,
      icon:"none"
    })
    wx.navigateTo({
      url: '/pages/adle-addstudent/adle-addstudent',
      success:function(){
        wx.hideToast();
      }
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
    this.stu_list()
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