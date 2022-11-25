const { DBPost } = require("../../../db/DBPost");

// pages/posts/post-detail/post-detail.js
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
    //得到传递过来的文章编号参数
    var postId = options.id;
    //构造DBPost类的实例,调用构造函数时文章编号作为参数进行传递,特别注意,在最前面要引入类定义的位置
    this.dbPost = new DBPost(postId);
    //调用getPostItemById()这个函数活动具体文章的详情,getPostItemById()函数返回一个对象,对象中有index和data两个属性,其中index是当前文章是数组中的第几篇文章,data则是这篇文章的详细内容
    this.postData = this.dbPost.getPostItemById().data;
    //调用setData方法去渲染,将文章数据赋值给post这个key
    this.setData({post:this.postData})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.postData.title,
    })
    wx.setNavigationBarColor({
      frontColor:'#ffffff',
      backgroundColor: '#ff0000',
      animation:{
        duration:400,
        timingFunc:'esaeIn'
      }
    })
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
  onCollectionTap(event){
      //调用dbPost类的collect的方法,实际是返用updatePostData方法,实现用户点击收藏之后状态的更新,并且返回更新后的数据
      var newPostData = this.dbPost.collect();

      //根据更新后的数据调用setData,强制再次渲染
      this.setData({
        post:newPostData
      })
  },
  //用户点赞后的事件处理函数
  onUpTap(event){
    var newPostData = this.dbPost.up();
    this.setData({post:newPostData});
  },
  //用户点击评论后的事件处理函数
  onCommentTap(event){
    //得到自定义组建属性(data-post-id)传过来的文章编号postId
    var postId = event.currentTarget.dataset.postId;
    //实现跳转，将postId作为url的query参数传递到post-comment页面
    wx.navigateTo({
      url:'../post-comment/post-comment?id='+postId,
    })
  }
})