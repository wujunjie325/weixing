// pages/movie/movie.js
var app=getApp();
var util=require('../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var inTheatersUrl=app.globalData.doubanBase+'/v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl=app.globalData.doubanBase+'/v2/movie/coming_soon?start=0&count=3';
    var top250Url=app.globalData.doubanBase+'/v2/movie/top250?start=0&count=3';


    this.getMovieListData(inTheatersUrl,'inTheaters','正在热映');
    this.getMovieListData(comingSoonUrl,'comingSoon','即将热映');
    this.getMovieListData(top250Url,'top250','top250');
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  getMovieListData:function(url,settedKey,catgoryTitle){
    var that=this;
    wx.request({
      url: url,
      success:function(res){
        console.log(this);
        that.processDoubanData(res.data,settedKey,catgoryTitle)
      },
      fail:function(error){
        console.log(error);
      }
    })
  },
  processDoubanData(moviesDouban,settedKey,catgoryTitle){
    var movies=[];
    for(var idx in moviesDouban.subjects){
      var subject=moviesDouban.subjects[idx];
      var title =subject.title;
      if(title.length >=6){
        title=title.substring(0,6)+'...'
      }
      var temp ={
        stars:util.convertToStartsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }     
      movies.push(temp);
    }
    var readyData={};
    readyData[settedKey]={
      catgoryTitle:catgoryTitle,
      movies:movies
    }
    this.setData(readyData);
  },
  onMoreTap:function(event){
    var category=event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category,
    })
  }
})