import * as echarts from '../../ec-canvas/echarts';

var chart = null;//总览
var i_chart = null;//已面试
var a_chart = null;//已录取

var app = getApp()
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts',
      path: '/pages/adle-tong-data/adle-tong-data',
      success: function () { },
      fail: function () { }
    }
  },

  data: {
    //页面配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 1,
    tid: '',
    fairList: '',
    //招聘会报名人数
    countList: '',
    //总览echarts图标
    ec: {
      onInit: function (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        return chart;
      }
    },
    //已面试echarts图表
    i_length:'',
    i_ec: {
      onInit: function (canvas, width, height) {
        i_chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(i_chart);
        return i_chart;
      }
    },
    //已录取echarts图表
    a_length: '',
    a_ec: {
      onInit: function (canvas, width, height) {
        a_chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(a_chart);
        return a_chart;
      }
    }
  },
  //总览图标数据配置
  getData(){
    wx.showLoading({
      title: '加载数据中',
      mask:true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Admin/fair_enroll_count',
      success: function (res) {
        var fair_title = [];
        var fair_count = [];
        res.data.forEach(function (item, index) {
          fair_title.push(item.title);
          fair_count.push(item.count);
        });
        chart.setOption({
          color: ['#37a2da'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['报名人数'] //数据提示词
          },
          grid: {
            left: 5,
            right: 20,
            bottom: 15,
            top: 40,
            containLabel: true
          },
          xAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                color: '#666',
                fontSize: 13
              }
            }
          ],
          yAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: fair_title.slice(0,8),//Y轴字段值
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                color: '#666',
                fontSize:13,
                interval: 0,
                formatter: function (val) {
                  var strs = val.split(''); //字符串数组
                  var str = ''
                  for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
                    str += s;
                    if (!(i % 5)) str += '\n'; //按需要求余
                  }
                  return str
                }
              }
            }
          ],
          series: [
            {
              name: '报名人数',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  fontSize:14,
                  rich:{}
                }
              },
              data: fair_count.slice(0, 8),
              itemStyle: {}
            }
          ]
        })
        wx.hideLoading();
      }
    })
  },
  //已面试echarts图表
  i_getData() {
    var that = this;
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/stu_interviewed_count',
      success: function (res) {
        var class_name = [];//班级名称
        var class_interview_count = [];//班级面试信息数量
        that.setData({
          i_length: res.data.length
        })
        res.data.forEach(function (item, index) {
          class_name.push(item.classname);
          class_interview_count.push(item.count);
        });
        i_chart.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['班级面试信息数量'] //数据提示词
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            x2: 20,
            width: res.data.length * 75,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: class_name,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                color: '#666',
                fontSize: 13,
                interval: 0,
                formatter: function (val) {
                  var strs = val.split(''); //字符串数组
                  var str = ''
                  for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
                    str += s;
                    if (!(i % 5)) str += '\n'; //按需要求余
                  }
                  return str
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                color: '#666',
                fontSize: 13
              }
            }
          ],
          series: [
            {
              name: '班级面试信息数量',
              type: 'bar',
              barWidth: '30%',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  fontSize: 14,
                  rich: {}
                }
              },
              data: class_interview_count
            }
          ]
        })
      }
    })
  },
  //已录取echarts图表
  a_getData() {
    var that = this;
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/stu_admission_count',
      success: function (res) {
        var class_name = [];//班级名称
        var class_admission_count = [];//班级面试信息数量
        that.setData({
          a_length: res.data.length
        })
        res.data.forEach(function (item, index) {
          class_name.push(item.classname);
          class_admission_count.push(item.count);
        });
        a_chart.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['班级录取信息数量'] //数据提示词
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            x2: 20,
            width: res.data.length * 75,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: class_name,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                color: '#666',
                fontSize: 13,
                interval: 0,
                formatter: function (val) {
                  var strs = val.split(''); //字符串数组
                  var str = ''
                  for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
                    str += s;
                    if (!(i % 5)) str += '\n'; //按需要求余
                  }
                  return str
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                color: '#666',
                fontSize: 13
              }
            }
          ],
          series: [
            {
              name: '班级录取信息数量',
              type: 'bar',
              barWidth: '30%',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  fontSize: 14,
                  rich: {}
                }
              },
              data: class_admission_count
            }
          ]
        })
      }
    })
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
  enroll_classlist: function (e) {
    var that = this;
    let pid = e.currentTarget.dataset.id
    wx.showToast({
      title: '加载中',
      mask:true,
      icon:"none"
    })
    wx.navigateTo({
      url: '/pages/adle-enroll-classlist/adle-enroll-classlist?pid=' + pid,
      success:function(){
        wx.hideToast();
      }
    })
  },
  //已面试学生列表
  interviewed_stulist: function (e) {
    var that = this;
    let cid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/adle-interviewed-stulist/adle-interviewed-stulist?cid=' + cid,
    })
  },
  //已录取学生列表
  accepted_stulist: function (e) {
    var that = this;
    let cid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/adle-accepted-stulist/adle-accepted-stulist?cid=' + cid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载数据中',
      mask:true
    })
    // this.getData();//总览echarts图表
    // this.i_getData();//已面试echarts图表
    // this.a_getData();//已录取echarts图表
    var that = this;
    that.setData({
      tid: options.tid
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
    var that =this;
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Admin/fair_enroll_count',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          fairList: res.data
        })
      }
    })
    //已面试已录取班级渲染
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/class_list',
      method: 'GET',
      success: function (res) {
        // console.log(res.data)
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
    setTimeout(this.getData, 500);
    setTimeout(this.i_getData, 650);
    setTimeout(this.a_getData, 750);
    // this.getData();//总览echarts图表
    // this.i_getData();//已面试echarts图表
    // this.a_getData();//已录取echarts图表
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