// pages/book/book.js
Page({
  data: {
    windowHeight: 0
  },
  onLoad: function (options) {
   var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        that.setData({
          windowHeight:res.windowHeight
        })
      }
    })
  },
  confirm:function(event){
      var value = event.detail.value;
      wx.navigateTo({
        url: '/pages/booklist/booklist?value='+value
      })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})