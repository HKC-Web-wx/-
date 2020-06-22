
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '',
    imageurl: '',
    aid: '',
    savename: '',
    random_id:''//随机生成的招聘会id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var random_num = Math.floor(Math.random() * (90000 - 40000 + 1)) + 40000;
    console.log(options)
    this.setData({
      aid: options.aid,
      random_id: random_num
    })
  },
  //选择封面图片
  chooseimage: function (e) {
    var that = this; 
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
            })
          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    })
  },
  // 上传招聘文件
  uploadFile: function (e) {
    var that = this;
    var random_num = Math.floor(Math.random() * (90000 - 40000 + 1)) + 40000;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: function (res) {
        console.log(res.tempFiles);
        const fileName = res.tempFiles[0].name;
        var fileType_docx = fileName.substr(fileName.length - 4);
        var fileType_doc = fileName.substr(fileName.length - 3);
        console.log("文件类型：" + fileType_docx + "或" + fileType_doc + "招聘会id：" + that.data.id)
        if (fileType_docx == 'docx' || fileType_doc == 'doc') {
          that.setData({
            fileName: fileName
          });
          wx.showLoading({
            title: '文件上传中',
            mask: true
          })
          wx.uploadFile({
            url: 'https://test.hivetech.cn/hkc/job/Home/Fair/upload_file', //服务器上传接口
            filePath: res.tempFiles[0].path, //文件资源路径
            formData: {
              fair_id: that.data.random_id,
              fileName: fileName
            },
            name: 'filename',
            header: {},
            success(res) {
              if (res.errMsg == "uploadFile:ok") {
                console.log(res)
                wx.hideToast();
                wx.hideLoading();
                wx.showToast({
                  title: '上传文件成功',
                  icon: 'success',
                  duration: 2300,
                  mask: true
                })
              } else {
                wx.hideLoading()
                wx.showToast({
                  title: '上传文件失败',
                  icon: 'none',
                  duration: 2000,
                  mask: true
                })
              }
            }
          })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '上传文件格式错误',
            icon: "none",
            duration: 1800,
            mask: true
          })
        }
      },
      fail(error) {
        wx.hideLoading();
        console.log('文件上传失败', error)
      }
    })
  },
  //跳转至文件列表
  look_file: function () {
    wx.navigateTo({
      url: '/pages/fair_file/fair_file?fair_id=' + this.data.random_id,
    })
  },
  //提交
  formSubmit: function (e) {
    console.log(e)
    var that = this
    var url = 'https://test.hivetech.cn/hkc/job/Public/Fair/images/'
    var images = url + that.data.imageurl;
    var title = e.detail.value.title;
    var address = e.detail.value.address;
    var details = e.detail.value.details;
    console.log(url + that.data.imageurl)
    if (that.data.image == '') {
      wx.showToast({
        title: '请选择图片',
        icon: "none"
      })
      return;
    } else if (!title) {
      wx.showToast({
        title: '标题不能为空',
        icon: "none"
      })
      return;
    } else if (!address) {
      wx.showToast({
        title: '地址不能为空',
        icon: "none"
      })
      return;
    } else if (!details) {
      wx.showToast({
        title: '详情不能为空',
        icon: "none"
      })
      return;
    }else if(!that.data.imageurl){
      wx.showToast({
        title: '图片上传失败',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '提交数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/add_information',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        image: url + that.data.imageurl,
        title: e.detail.value.title,
        address: e.detail.value.address,
        details: e.detail.value.details
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.exist == 0){
          wx.showToast({
            title: '招聘会已存在',
            icon:"none",
            duration:1000
          })
        }else{
          that.change_id(that.data.random_id,res.data);
          wx.navigateBack();
          wx.hideLoading();
        }
      }, fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: '加载失败请稍后再试',
          icon: "none",
          duration: 1200,
          mask: true
        })
      }
    })
  },
  //提交时更改招聘会文件的fair_id
  change_id:function(random_id,new_id){
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/file_fair_id',
      method:'GET',
      data:{
        random_id: random_id,
        fair_id: new_id
      },
      success:function(res){
        console.log('修改招聘会id'+res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '添加招聘会信息'
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