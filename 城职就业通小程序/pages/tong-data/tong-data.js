// pages/tong-data/tong-data.js
var app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页面配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    tid:'',
    fairList:'',
    //招聘会报名人数
    countList:'',
  },



  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  //点击tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //点击跳转到班级列表
  enroll_classlist:function(e){
    var that = this;
    let pid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/enroll-classlist/enroll-classlist?pid=' + pid + '&tid=' + that.data.tid
    })
  },
  interviewed_stulist:function(e){
    var that = this;
    let cid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/interviewed-stulist/interviewed-stulist?cid=' + cid ,
    })
  },
  accepted_stulist:function(e){
    var that = this;
    let cid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/accepted-stulist/accepted-stulist?cid=' + cid ,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      tid:options.tid
    })
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  loadData:function(){
    var that = this;
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    //招聘会报名列表
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/fair_enroll_count',
      method: 'GET',
      data: {
        teach_id: that.data.tid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          fairList: res.data
        })
        res.data.forEach(function(item,index){
          console.log(item.title + '+++' + item.count)
        })
      }
    })
    //已面试已录取班级渲染
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/class_list',
      method: 'GET',
      data: {
        teach_id: that.data.tid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          classlist: res.data
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '统计数据'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData();
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