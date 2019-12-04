// pages/survey/survey.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bg: true,
        answer: [], //值为-1时表示没有选择
        position: [],
        items: [],
        ans:[]
    },
    radioChange: function(e) {
        var isArray = Array.isArray || function (o) {
            return typeof o == "object" && Object.prototype.toString.call(o) === "[object Array]";
        }
        if(isArray(e.detail.value)){
            this.data.ans=[-1];
            for(let j=0;j<e.detail.value.length;j++){
                var a = String.fromCharCode(65 + parseInt(e.detail.value[j]));
                this.data.ans[j]=a;
            }
        }
        console.log(String.fromCharCode(65 + parseInt(e.detail.value)))
        var position = e.target.offsetTop;
        var answer = isArray(e.detail.value)?this.data.ans :String.fromCharCode(65 + parseInt(e.detail.value));//A　Ｂ　Ｃ
        var index = parseInt(e.target.dataset.id) - 1;//第几题
        var dataAnswer = this.data.answer;
        dataAnswer[index] = answer;
        console.log(this.data.answer);
        this.data.position[index] = position;
    },
    formSubmit: function(e) {
        var flag = false;
        var position = this.data.position;
        var dataAnswer = this.data.answer;
        for (var i = 0; i < dataAnswer.length; i++) {
            if (dataAnswer[i] != -1) {
                flag = true;
            } else {
                flag = false;
                wx.showModal({
                    title: '请确保所有内容填写正确，页面将自动定位到第一个不符合要求的题目，请检查！',
                    showCancel: false,
                    success: function() {
                        wx.pageScrollTo({
                            scrollTop: position[i - 1] + 150,
                            duration: 800
                        })
                    }
                })
                return false;
            }
        }
        if (flag) {
            this.setData({
                bg: false
            })
            wx.setStorageSync('answ', dataAnswer);
            setTimeout(function() {
                wx.redirectTo({
                    url: '/pages/sucs/sucs',
                })
            }, 300)
            wx.getStorage({
                key:'answ',
                success(res){
                    console.log(res.data)
                }
            });
            this.onLoad();
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var newitem = [{
                id: '1',
                type:'radio',
                title: '1、您的性别：',
                value: {
                    num: '1',
                    answer: ['A 男', 'B 女']
                }
            },
            {
                id: '2',
                type: 'radio',
                title: '2、您的年龄段：',
                value: {
                    num: '2',
                    answer: ['A 18岁以下', 'B 18-25岁', 'C 26-35岁', 'D 36-45岁', 'E 45岁以上']
                }
            },
            {
                id: '3',
                type: 'checkbox',
                title: '3、您想要购买什么类型的商品：',
                value: {
                    num: '3',
                    answer: ['A 化妆品', 'B 首饰', 'C 服饰', 'D 食品','E 我就随便逛逛']
                }
            },
            {
                id: '4',
                type: 'radio',
                title: '4、您每月在商场购买商品的消费水平是：',
                value: {
                    num: '4',
                    answer: ['A 500以下', 'B 500-1000', 'C 1000-2500', 'D 2500-3500 ', 'E 3500以上']
                }
            },
            {
                id: '5',
                type: 'radio',
                title: '5、您比较偏向于什么品牌的商品：',
                value: {
                    num: '5',
                    answer: ['A 耐克', 'B 阿迪达斯', 'C 蒂芙尼' ,'D 周六福','E 必胜客','F 优衣库']
                }
            },
        ]

        this.setData({
            items: newitem,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        for (var i = 0; i < this.data.items.length; i++) {
            this.data.answer[i] = -1
            this.data.position[i] = 0;
        }

        this.setData({
            bg: true
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})