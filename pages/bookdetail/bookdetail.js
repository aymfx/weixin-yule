// pages/bookdetail/bookdetail.js
Page({
  data: {
    singlebook: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    console.log(options.id);
    wx.request({
      url: 'https://api.douban.com/v2/book/' + options.id,
      method: 'GET',
      success: function (res) {
        // success
        console.log(res);
        that.setData({
          singlebook:res.data
        });
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  }
})