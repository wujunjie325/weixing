class DBPost {
  constructor(postId)
  {
    this.storageName = 'postList';
    this.postId = postId;
  }

  //读取所有的文章列表
  getAllPostData()
  {
    var res = wx.getStorageSync(this.storageName);
    if (!res)
    {
        var dataObj = require("../data/data.js");
        res = dataObj.postList;
    }
 
    return res;
  }
  //根据指定文章编号读取该文章详情
  getPostItemById()
  {
    //首先调用刚才写的getAllPostData函数获得所有的文章列表,是个数组
    var postsData = this.getAllPostData();   //获取文章的数组
    var len = postsData.length;
    for (var i = 0; i < len; i++) {    //根据传进来的文章编号遍历文章数组，如果找到和传进来的编号相同，则返回该元素(即找到该篇文章)
        if (postsData[i].postId == this.postId) {
            return {
                index: i,
                data: postsData[i]
            }
        }
    }
  }
  //用户收藏后调用的方法
  collect(){
    return this.updatePostData('collect');
  }
  //用户点装后调用的方法
  up(){
    return this.updatePostData('up');
  }
  
  updatePostData(category){
  //得到当前这篇文章的数据,包括index(序号)和data(详细内容),itemData包含index和data两项内容
  var itemData = this.getPostItemById();
  //得到当前这篇文章详细内容
  var postData = itemData.data;
  //利用getAllPostData获取所有文章列表,返回一个数组
  var allPostData = this.getAllPostData();
  switch(category){
    case 'collect':
        //如果该篇文章读者未收藏,即collectionStatus为false,则将collectionStatus设为true,将来图标会显示亮色图标,收藏数+1
        if(!postData.collectionStatus){
            postData.collectionStatus = true;
            postData.collection ++;
        }
        //如果该篇文章已经收藏,则当用户再次点击时, collectionStatus设置为false,即用户取消收藏,收藏数-1
        else{
            postData.collectionStatus = false;
            postData.collection --;
        }
        break;
      case 'up':
        //如果没有点赞，则将upStatus设为true，点赞数+1
        if(!postData.upStatus){
          postData.upStatus = true;
          postData.upNum++;
        }
        //如果点赞了，则将upStatus设为false，点赞数-1
        else{
          postData.upStatus = false;
          postData.upNum--;
        }
        break;
      default:
        break;
    }
    //将原来该位置上的文章内容更新为用户点击后的状态,即将收藏状态和收藏数进行更新
    allPostData[itemData.index] = postData;
    //将更新后的文章列表写回缓存,从而实现数据的更新
    wx.setStorageSync(this.storageKeyName, allPostData)
    return postData;
  }
  //获取某一文章对应的所有评论数据，返回的应该是评论数据的数组
  getCommentData(){
    //直接调用getPostItemById方法获得当前文章的详细内容，详细内容中是包含了comments
    var itemData = this.getPostItemById().data;

    return itemData.comments;
  }
}

export { DBPost }