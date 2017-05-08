// pages/booklist/booklist.js
var value = '';
var newlist=[];
Page({
  data: {
    flag: true,
    booklist: [],
    height: 0,
    start: 0,
    showLoading: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    newlist=[];
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight - 221
        })
      }
    })
    value = options.value || ' ';
    getData(that, value);
  },
  loadmore: function () {
    var that = this;
    console.log(123)
    newlist = that.data.booklist;
    var num = this.data.start + 22;
    this.setData({
      showLoading: false,
      start:num
    })
    getData(that, value);
  },
  gotodetail:function(event){
    var id=event.currentTarget.dataset.bid;
    wx.navigateTo({
      url: '../bookdetail/bookdetail?id='+id
    });
  }
})
function getData(that, value) {
  wx.request({
    url: 'https://api.douban.com/v2/book/search',
    data: {
      q: value,
      count: 21,
      start: that.data.start
    },
    method: 'GET',
    success: function (res) {
      if (res.data.books.length == 0 && newlist.length==0) {
        that.setData({
          flag: false
        })
      } else {
        for(var i=0;i<res.data.books.length;i++){
            newlist.push(res.data.books[i]);
        }
         console.log(newlist,12);
        that.setData({
          booklist:newlist,
           showLoading: true
        })
      }
      console.log(that.data.booklist);
    },
  })
}