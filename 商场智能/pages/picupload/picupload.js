// pages/picupload/picupload.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        image:[],
        name:"",
        stock:"",
        describe:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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

    },

    // 添加图片
    addImage(e){
        var imageList = this.data.image;
        if(imageList.length<3){
            wx.chooseImage({
                count: 3,
                sizeType: ["original", "compressed"],
                sourceType: ["album", "camera"],
                success: (res) => {
                    this.setData({
                        image: res.tempFilePaths
                    })
                }
            })
        }else{
            wx.showToast({
                title: '只能添加3张图片哦!',
                icon:'none',
                duration:2000,
            })
        }
    },
    // 删除图片
    removeImage(e){
        // console.log(e.target.dataset)
        var idx = e.target.dataset.idx;
        var imageList = this.data.image;
        console.log(idx);
        console.log(imageList);
        wx.showModal({
            title: '提示',
            content: '您确定要删除此图片吗？',
            success:(res)=>{
                if(res.confirm){
                    console.log("确认删除");
                    imageList.splice(idx, 1);
                }else if(res.cancel){
                    console.log("取消删除");
                    return false;
                }
                this.setData({
                    image:imageList,
                });
            }
        })
    },
    // 点击图片看大图
    lookImage(e){
        var idx = e.target.dataset.idx;
        var imageList = this.data.image;
        wx.previewImage({
            urls: imageList,
            current: imageList[idx],
        })
    },

    //设置三个输入框的内容
    nameInput(e){
        this.setData({
            name: e.detail.value
        })
    },
    stockInput(e) {
        this.setData({
            stock: e.detail.value
        })
    },
    describeInput(e) {
        this.setData({
            describe: e.detail.value
        })
    },

    // 点提交按钮上传图片/并获取输入框内容
    submitImage:function(e){
        var imageList = this.data.image;
        var name = this.data.name,
            stock = this.data.stock,
            describe = this.data.describe;
        console.log("名字:"+name+", 库存:"+stock+", 描述:"+describe);
        for(var index in imageList){
            upLoadImage({
                url:'https://www.hkc.com',
                path:imageList[index]
            });
        }
    },
})
function upLoadImage(data){
    var success = data.success ? data.success : 0,
        fail = data.fail ? data.fail : 0;
    wx.uploadFile({
        url: data.url,
        filePath: data.path,
        name: 'img',
        success:(res) => {
            success++;
        },
        fail:(err) => {
            fail++;
            console.log(err);
        },
        complete:() => {
                data.success=success;
                data.fail=fail;
        }
    })
}