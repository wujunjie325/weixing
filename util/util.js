function convertToStartsArray(stars){
  var num=stars/10;
  var array=[];
  for(var i=1;i<=5;i++){
    if(i<=num)
    {
      array.push(1);

    }
    else{
      if((i-num)==0.5){
        array.push(0.5);
      }
      else{
        array.push(0);
      }
    }

  }
  //返回转换后的数组
  return array;
}

//这是一个网络访问的公共方法，输入参数为url，如果有返回值则有callBack参数对应的实际函数进行处理、
function http(url,callBack){
  wx.request({
    url: url,
    success:function(res){
      //此处callBack是作为输入参数传递进来，实际上它指向某一个具体的处理函数，比如processDouban，那么有数据时，则由callBack指向的实际函数来对返回值进行处理
      callBack(res.data);
    },
    fail:function(error){
      console.log(error);
    }
  })
}

//由于是公用函数，必须通过module.exports输出接口，其他文件才可以调用exports中输出的函数
module.exports={
  convertToStartsArray:convertToStartsArray,
  http:http
}