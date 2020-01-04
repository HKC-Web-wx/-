// pages/show_resume/show_resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentlist:'',
    eid:'',
    winHeight:'',
    select: false,
    grade_name: '--请选择--',
    class_id: '',
    classlist:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    this.setData({
      eid:options.eid
    })
    this.class_list();
    this.loaddata();
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
      class_id: class_id
    })
    this.stu_list();
  },

  //班级列表
  class_list: function () {
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
        wx.hideLoading();
      }
    })
  },
  //学生简历信息
  stu_list: function(){
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    var that = this;
    if (that.data.class_id) {
      wx.request({
        url: 'https://test.hivetech.cn/hkc/job/Home/Enterprise/search_class',
        method: 'GET',
        data: {
          class_id: that.data.class_id
        },
        success: function (res) {
          console.log(res.data)
          var arr = res.data;
          var newstudentlist = [];
          for (let i = 0, len = arr.length; i < len;) {
            i++;
            let currentRandom = parseInt(Math.random() * len);
            if (!newstudentlist.includes(arr[currentRandom])) {
              newstudentlist.push(arr[currentRandom]);
            } else {
              i--;
            }
          }
          that.setData({
            studentlist: newstudentlist,
          })
          wx.hideLoading();
        }
      })
    }else{
      that.loaddata();
    }
  },


// 加载所有数据
loaddata:function(){
  var that = this;
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  wx.request({
    url: 'https://test.hivetech.cn/hkc/job/Home/Enterprise/all_resume',
    method: 'GET',
    header: {},
    data: {
      
    },
    success: function (res) {
      console.log(res.data)
      var arr = res.data;
      var newstudentlist = [];
      for (let i = 0, len = arr.length; i < len;) {
        i++;
        let currentRandom = parseInt(Math.random() * len);
        if (!newstudentlist.includes(arr[currentRandom])) {
          newstudentlist.push(arr[currentRandom]);
        } else {
          i--;
        }
      }
      that.setData({
        studentlist: newstudentlist,
      })
      wx.hideLoading();
    }
  })
},
// 搜索数据
  // formSubmit: function (e) {
  //   console.log(e)
  //   var that = this;
  //   wx.showLoading({
  //     title: '加载中',
  //     mask: true
  //   })
  //   wx.request({
  //     url: 'https://test.hivetech.cn/hkc/job/Home/Enterprise/search_major',
  //     method: 'GET',
  //     header: {},
  //     data: { 
  //       search_value: e.detail.value.search_value,
  //     },
  //     success: function (res) {
  //       var arr = res.data;
  //       var newstudentlist = [];
  //       for (let i = 0, len = arr.length; i < len;) {
  //         i++;
  //         let currentRandom = parseInt(Math.random() * len);
  //         if (!newstudentlist.includes(arr[currentRandom])) {
  //           newstudentlist.push(arr[currentRandom]);
  //         } else {
  //           i--;
  //         }
  //       }

  //       that.setData({
  //         studentlist: newstudentlist,
  //       })
  //       wx.hideLoading();
  //     }
  //   })
  // },
  // 打开文档
  show_resume: function (e) {
    var that = this
    var filepath = e.currentTarget.dataset.filepath;
    console.log(filepath)
    if (filepath) {
      wx.downloadFile({
        url: 'https://test.hivetech.cn/hkc/job/Public/Fair/resume/' + filepath,
        success: function (res) {
          wx.openDocument({
            filePath: res.tempFilePath,
            // fileType: 'pdf',
            success(res) {
              console.log('打开文件成功');
            },
            fail(error) {
              console.log('文件打开失败');
            }
          })
        }, fail: function (err) {
          console.log(err)
        }
      })
    }
  },
  //自我评价
  look_self_info: function(e){
    var that = this;
    var stu_self = e.currentTarget.dataset.stu_self;
    var stu_name = e.currentTarget.dataset.stu_name;
    wx.showToast({
      title: '跳转中..',
      icon: "loading",
      mask: true,
    })
    wx.navigateTo({
      url: '/pages/show_stu_self/show_stu_self?stu_self=' + stu_self + '&stu_name=' + stu_name,
      success: function () {
        wx.hideLoading();
        wx.hideToast();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '查看简历'
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