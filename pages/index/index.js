//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '简约，而不简单',
    userInfo: {},
    windowHeight:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '/pages/videoDetail/videoDetail'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        that.setData({
          windowHeight:res.windowHeight
        })
      }
    })
  }
})
