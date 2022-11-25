const { DBPost } = require("../../../db/DBPost");

// pages/posts/post-comment/post-comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //1.得到post-detail跳转后传递的文章编号的值
    var postId = options.id;
    //2.构造DBPost类的实例,并且调用getCommentData方法获得该文章所有的评论数据
    this.dbPost = new DBPost(postId);
    //定义一个评论的数组变量comments，将getCommentData方法返回的当前文章的所有评论数据赋值给comments
    var comments = this.dbPost.getCommentData();
    //3.强制页面进行渲染，评论的数组变量为comments
    this.setData({comments:comments});
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

  }
})