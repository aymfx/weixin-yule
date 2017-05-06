Page({
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var a = res.windowHeight;
        that.setData({
          scrollTop: a-200
        })
      }
    })
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio');
    var that = this;
    wx.request({
      url: 'http://www.maodan.online/php/music.php',
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          musiclist: res.data
        })
      }
    })




  },
  data: {
    pic: "/icon/paly.png",
    musiclist: [],
    musiclrc: {},
    mid: 0,
    lrctext:'',
    scrollTop: 0,
    music: {
      poster: "http://img4.imgtn.bdimg.com/it/u=2261186682,2088140882&fm=23&gp=0.jpg",
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
    }
  },
  audioPlay: function () {
    var that = this;
    if (that.data.pic == "/icon/paly.png") {
      console.log(this.audioCtx);
      this.audioCtx.play()
      that.setData({
        pic: "/icon/pause.png"
      })

    } else {
      this.audioCtx.pause()
      that.setData({
        pic: "/icon/paly.png"
      })
    }
  },
  musictap: function (event) {
    console.log(event.currentTarget.dataset.cid);
    var idx = event.currentTarget.dataset.cid;
    var that = this;
    that.setData({
      music: that.data.musiclist[idx],
      pic: "/icon/pause.png",
      mid: idx
    })
    
     showlrc(that);
   

  },
  musicend: function () {

    var that = this;
    var s = this.data.mid + 1;
    if (s >= this.data.musiclist.length) {
      s = 0
    }
    that.setData({
      music: that.data.musiclist[s],
      pic: "/icon/pause.png",
      mid: s
    })
     showlrc(that);
  },
  lrcshow: function (event) {
        var that = this;
        var s=parseInt(event.detail.currentTime).toString();
        console.log(this.data.musiclrc[s]);
        that.setData({
          lrctext:this.data.musiclrc[s]
    })

  }
})


function parseLyric(lrc) {
  var lyrics = lrc.split("\n");
  var lrcObj = {};
  for (var i = 0; i < lyrics.length; i++) {
    var lyric = decodeURIComponent(lyrics[i]);
    var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
    var timeRegExpArr = lyric.match(timeReg);
    if (!timeRegExpArr) continue;
    var clause = lyric.replace(timeReg, '');
    for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
      var t = timeRegExpArr[k];
      var min = Number(String(t.match(/\[\d*/i)).slice(1)),
        sec = Number(String(t.match(/\:\d*/i)).slice(1));
      var time = min * 60 + sec;
      lrcObj[time] = clause;
    }
  }
  return lrcObj;
}

function showlrc(that){
 //歌词请求
    wx.request({
      url: 'http://www.maodan.online/music/' + (that.data.mid + 1) + '.lrc',
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        var lyric = parseLyric(res.data);
       
        that.setData({
          musiclrc:lyric
        })
        setTimeout(function () {
          that.audioCtx.play();
        }, 500)

      }
    })

}