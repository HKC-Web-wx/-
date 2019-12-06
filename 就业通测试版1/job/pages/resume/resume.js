const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeFile: null,
    tempFilePaths:'',
    filePath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '个人简介'
    })
  },

  wx_up: function (e) {
    var that = this;
    
    wx.chooseMessageFile({
      count: 10,
      type: 'file',
      success:function(res) {
        const tempFilePaths = res.tempFilePaths[0];
        console.log(tempFilePaths);
        that.setData({ 
          tempFilePaths: tempFilePaths,
        });
        
        wx.uploadFile({
          url: 'http://test.hivetech.cn/francin/', //服务器上传接口
          filePath: that.data.tempFilePaths, //文件资源路径
          name: 'filename',
          header: {
            
          },
          success(res) {
            console.log(res)
            if (res.statusCode == 200) {
              that.setData({
                fliepath: that.data.tempFilePaths,
              })
            }
          }
        })
        wx.saveFile({
          tempFilePath: tempFilePaths,
          success(res) {
            that.data.storeFile.push(tempFilePath);
            that.setData({
              storeFile: that.data.storeFile
            })
            console.log(that.data.storeFile)
            console.log('文件存储成功');
          },
          fail(error) {
            console.log('本地文件存储失败');
          }
        })

      },
      fail(error) {
        that.showLoadHid();
        console.log('文件上传失败', error)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    wx.getSavedFileList({
      success(res) {
        that.setData({
          storeFile: res.fileList
        })
        console.log(that.data.storeFile)
        console.log('本地缓存文件获取成功', res)
      },
      fail(error) {
        console.log('本地缓存文件获取失败', error);
      }
    })

  },


  
  
  // 本地文档打开
  // openStoreFile: function (e) {
  //   let info = e.currentTarget.dataset.info;
  //   console.log(info);
  //   this.fileOpen(info.filePath);
  // },

  // 打开文档
  // fileOpen: function (val) {
  //   wx.openDocument({
  //     filePath: val,
  //     fileType: 'all',
  //     success(res) {
  //       console.log('打开文件成功');
  //     },
  //     fail(error) {
  //       console.log('文件打开失败');
  //     }
  //   })
  // },
  showLoad: function () {
    wx.showLoading({
      title: '正在打开本地文件',
      mask: true,
    })
  },
  showLoadHid: function () {
    wx.hideLoading();
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