// pages/videoDetail/videoDetail.js
Page({
  data:{
    moviedetail:{},
    tmp:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var cid = options.id || 1;
    var that = this;
    console.log(cid);
    wx.request({
      url: 'http://www.maodan.online/php/movieDetail.php',
      data: {
        id:cid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res.data[0],121212);
        that.setData({
           moviedetail:res.data[0]
        })
      }
    })
  },
  onReady:function(){
     this.videoContext = wx.createVideoContext('myVideo');
  },
  bindInputBlur: function(e) {
    console.log(e.detail.value);
    this.inputValue = e.detail.value
  },
  send:function(){
    this.videoContext.sendDanmu({
      text:this.inputValue,
      color: getRandomColor()
    });
  }
})


function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}