// pages/mine/mine.js
Page({
  data: {
    info: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var app = getApp();
    var that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo);
      that.setData({
        info: userInfo
      })
    })

    console.log(this.data.info);

  },
  saoyisao: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  location: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  }
})

