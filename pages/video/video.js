// pages/movie/movie.js
Page({
  data: {
    imgUrls: [  'http://news.youth.cn/yl/201705/W020170503421346317624.jpg', 'http://cdn2.bjweekly.com/uploads/2017-05-03/14768059708877048543.jpg',
'http://pic1.win4000.com/wallpaper/f/58cf42655066a.jpg'
    ],
    interval: 5000,
    duration: 1000,
    movielist: []
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
      url: 'http://www.maodan.online/php/movie.php',
      success: function (res) {
        console.log(res);
        that.setData({
          movielist: res.data
        })
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        var height = res.windowHeight;
        that.setData({
          scrollTop: height-185
        })
      }
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  gotoDetail:function(event){
    var id=event.currentTarget.dataset.vid;
    console.log(event,id);
    wx.navigateTo({
      url: '/pages/videoDetail/videoDetail?id='+id
    }); 
  }

})