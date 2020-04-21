// pages/fair_file/fair_file.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fair_id:'',
    filePath_list:[]
  },
  //加载页面数据
  look_file:function(){
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/fair_file',
      method: 'GET',
      data: {
        fair_id: that.data.fair_id
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          filePath_list:res.data
        })
      }
    })
  },
  //查看文件
  lookFile:function(e){
    console.log(e.target.dataset)
    var that = this;
    var index = e.target.dataset.index;
    wx.showLoading({
      title: '加载文件中',
      mask:true
    })
    wx.downloadFile({
      url:'https://test.hivetech.cn/hkc/job/Public/Fair/fairFile/' + that.data.filePath_list[index].filepath,
      success:function(res){
        console.log(res)
        if(res.statusCode == 200){
          wx.hideLoading();
          wx.openDocument({
            filePath: res.tempFilePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '文件加载失败',
            icon:'none'
          })
        }
      },
      fail:function(err){
        wx.hideLoading();
        wx.showToast({
          title: '文件加载失败',
          icon: 'none'
        })
        console.log(err)
      }
    })
  },
  //删除文件
  deleteFile:function(e){
    var that = this;
    console.log(e.target.dataset)
    var index = e.target.dataset.index;
    var filepath = that.data.filePath_list[index].filepath;
    wx.showModal({
      title:'提示',
      content:'确定删除该文件吗？',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Fair/delete_file',
            method: 'GET',
            data: {
              filepath: filepath
            },
            success: function (res) {
              console.log(res)
              that.look_file();
            }
          })
        }else if(res.cancel){
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      fair_id: options.fair_id
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '查看上传的文件'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.look_file();
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