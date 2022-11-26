// pages/posts/posts.js
import {DBPost} from "../../db/DBPost";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postDate:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //调用DBPost类构造函数，生成类的
    var dbPost = new DBPost;
    this.setData({postDate:dbPost.getAllPostData()})
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
  onShareAppMessage:function() {

  },
  onTapToDetail:function(event){
    //得到文章编号
    var postId = event.currentTarget.dataset.postId;
    //将文章编号作为query参数进行传递
   wx.navigateTo({
     url: '/pages/posts/post-detail/post-detail?id='+postId,
   })
  }
})