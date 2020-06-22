// pages/shopsList/shopsList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopList:[],
        pageIndex:0,
        pageSize: 10,
        catId:1,
        hasMore:true,
    },
    loadMore:function(){
        if(!this.data.hasMore) return;
        wx.request({
            url: "https://locally.uieee.com/categories/" + this.data.catId + "/shops",
            data: {
                _limit: this.data.pageSize,
                _page: ++this.data.pageIndex
            },
            success: (res) => {
                console.log(res);
                var newList = this.data.shopList.concat(res.data); 
                var count = res.header['X-Total-Count'] -0;
                var flag = this.data.pageIndex * this.data.pageSize < count;
                this.setData({
                    shopList: newList,
                    hasMore:flag,
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.title){
            wx.setNavigationBarTitle({
                title: options.title,
            });
        }
        this.setData({
            catId : options.cat
        })
        this.loadMore();
        console.log(this.data.shopList);
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            shopList:[],
            pageIndex:0,
            hasMore:true
        });
        this.loadMore();
        wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.loadMore();
    },
})