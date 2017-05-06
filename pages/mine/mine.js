// pages/mine/mine.js
Page({
  data:{
    info:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var app = getApp();
    var that = this;
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        info:userInfo
      })
    })

    console.log(this.data.info);
    
  }
})

