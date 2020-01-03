import * as echarts from '../../ec-canvas/echarts';

var chart = null;


Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts',
      path: '/pages/adle-enroll-classlist/adle-enroll-classlist',
      success: function () { },
      fail: function () { }
    }
  },

  data: {
    enroll_classlist: '',
    pid: '',
    winWidth:'',
    winHeight:'',
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
    e_echartImgSrc:''
  },

  getData(){
    var that = this;
    wx.showLoading({
      title: '加载echarts',
      mask: true
    });
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Admin/class_enroll_count',
      data: {
        pid: that.data.pid,
      },
      success: function (res) {
        var class_name = [];//班级名称
        var class_enroll_count = [];//班级报名人数
        res.data.forEach(function (item, index) {
          class_name.push(item.classname);
          class_enroll_count.push(item.count);
        });
        chart.setOption({
          color: ['#3398DB'],
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
              name: '报名人数',
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
              data: class_enroll_count
            }
          ]
        })
        chart.on('finished', () => {
          that.selectComponent('#mychart-dom-bar').canvasToTempFilePath({
            success: function (res) {
              that.setData({
                e_echartImgSrc: res.tempFilePath
              })
              wx.hideLoading();
            },
            fail: function(err){
              wx.hideLoading();
              console.log('转换图片失败', err)
            }
          });
        })
        wx.hideLoading();
      },fail:function(err){
        wx.hideLoading();
        console.log('echarts加载失败')
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      pid: options.pid
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
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Admin/class_enroll_count',
      data: {
        pid: that.data.pid,
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          enroll_classlist: res.data
        })
        wx.hideLoading();
        if (res.data.length !== 0 ){
          setTimeout(that.getData, 600);
        }
      }
    })

  },
  enroll_stulist: function (e) {
    var that = this;
    let cid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/adle-enroll-stulist/adle-enroll-stulist?cid=' + cid + '&pid=' + that.data.pid
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '招聘会报名详情'
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData();
    // if (this.data.enroll_classlist.length !== 0) {
    //   setTimeout(this.getData, 600);
    // }
    // this.getData();
    
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