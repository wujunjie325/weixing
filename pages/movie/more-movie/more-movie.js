// pages/movie/more-movie/more-movie.js
var app = getApp();
var util = require('../../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var category = options.category;
    var dataUrl = '';
    switch (category) {
      case '即将热映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
        break;
      case '正在热映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
        break;
      case 'top250':
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    }
    this.data.refreshUrl = dataUrl;
    this.getMoreMovies(dataUrl);

  },
  getMoreMovies: function (url) {
    var that = this;
    wx.request({
      url: url,
      success: function (res) {
        console.log(this);
        that.processDoubanData(res.data)
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  processDoubanData(moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      var temp = {
        stars: util.convertToStartsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    var totalMovies = [];

    totalMovies = this.data.movies.concat(movies);

    this.setData({
      movies: totalMovies
    });
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    var refreshUrl = this.data.reqrefreshUrl + '?start=0&count=20';
    util.http(refreshUrl, this.processDoubanData);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    var totaCount = this.data.movies.length;
    var nextUrl = this.data.refreshUrl + '?start=' + totaCount + '&count=20';
    util.http(nextUrl, this.processDoubanData);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})