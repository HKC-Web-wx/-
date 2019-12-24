const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeFile: null,
    fileName: '',
    savedFilePath: '',
    stu_id:'',
    resumeInfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stu_id:options.sid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '个人简介'
    })
  },

  uploadResume: function (e) {
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: function (res) {
        console.log(res);
        const fileName = res.tempFiles[0].name;
        that.setData({
          fileName: fileName,
        });
        wx.uploadFile({
          url: 'https://test.hivetech.cn/hkc/job/Home/Student/upload_file', //服务器上传接口
          filePath: res.tempFiles[0].path, //文件资源路径
          formData:{
            stu_id:that.data.stu_id
          },
          name: 'filename',
          header: {},
          success(res) {
            wx.showToast({
              title: '文件上传中',
              icon: "loading",
              mask:true
            })
            if(res.data){
              wx.hideToast();
              that.loadResume();
              wx.showToast({
                title: '上传文件成功',
                duration: 1800,
                mask: true
              })
            }
          }
        })
        wx.saveFile({
          tempFilePath: res.tempFiles[0].path,
          success: function (res) {
            that.setData({
              savedFilePath: res.savedFilePath
            })
            wx.getSavedFileList({
              success(res){
                if(res.fileList.length > 1){
                  wx.removeSavedFile({
                    filePath: res.fileList[1].filePath,
                  })
                }
              }
            })
            console.log('文件存储本地成功' + res.savedFilePath)
          },
          fail: function (error) {
            console.log('文件存储本地失败');
          }
        })
      },
      fail(error) {
        wx.hideLoading();
        console.log('文件上传失败', error)
      }
    })

  },
  //编辑简介
  edit_info:function(){
    console.log(this.data.resumeInfo[0])
    wx.navigateTo({
      url: '/pages/editResume/editResume?sid=' + this.data.stu_id + '&stu_name=' + this.data.resumeInfo[0].stu_name + '&stu_code=' + this.data.resumeInfo[0].stu_code + '&stu_sex=' + this.data.resumeInfo[0].stu_sex + '&stu_phone=' + this.data.resumeInfo[0].stu_phone + '&stu_height=' + this.data.resumeInfo[0].stu_height + '&stu_weight=' + this.data.resumeInfo[0].stu_weight + '&stu_self=' + this.data.resumeInfo[0].stu_self + '&birthday=' + this.data.resumeInfo[0].birthday + '&stu_email=' + this.data.resumeInfo[0].stu_email + '&politics=' + this.data.resumeInfo[0].politics + '&stu_hobby=' + this.data.resumeInfo[0].stu_hobby + '&stu_school=' + this.data.resumeInfo[0].stu_school,
    })
  },
  //简历基础信息
  loadResume: function(){
    var that = this;
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Student/stu_resume',
      method: 'GET',
      data:{
        stu_id: that.data.stu_id
      },
      success:function(res){
        if(res.data){
          wx.hideLoading();
          console.log(res.data);
          that.setData({
            resumeInfo:res.data,
          })
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '网络错误请稍后再试',
            icon:"none",
            duration:1500,
            mask:true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadResume();
    var that = this;
    // wx.getSavedFileList({
    //   success(res) {
    //     that.setData({
    //       storeFile: res.fileList
    //     })
    //     console.log(that.data.storeFile)
    //   },
    //   fail(error) {
    //     console.log('本地缓存文件获取失败', error);
    //   }
    // })
  },

  // 打开文档
  fileOpen: function () {
    var that = this
    wx.downloadFile({
      url: 'https://test.hivetech.cn/hkc/job/Public/Fair/resume/' + that.data.resumeInfo[0].filepath,
      success:function(res){
        wx.openDocument({
          filePath: res.tempFilePath,
          // fileType: 'doc',
          success(res) {
            console.log('打开文件成功');
          },
          fail(error) {
            console.log('文件打开失败');
          }
        })
      },fail:function(err){
        console.log(err)
      }
    })
  },
  
  showLoad: function () {
    wx.showLoading({
      title: '正在打开本地文件',
      mask: true,
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