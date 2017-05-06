//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: '/page/user?id=123',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  },
  fenxiang:function(){
      wx.showShareMenu({
        success:function(res){
            console.log(res);
        }
      })
  }
})
