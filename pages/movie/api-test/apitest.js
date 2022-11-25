// pages/movie/api-test/apitest.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        songs : {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.get_music_info();
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

    get_music_info: function () {
        var that = this;
        wx.request({
            url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8%C2%ACice=0&platform=h5&needNewCode=1&tpl=3&type=top&topid=27',
            success: function (res) {
                that.work_to_info(res.data);
            },
            fail: function (error) {
                console.log(error);
            }
        })
    },
    work_to_info(data_list) {
        var res = [];
        for (var idx in data_list.songlist) {
            var song = data_list.songlist[idx].data;
            var name = song.songname;
            var singer = song.singer[0].name;
            var albumname = song.albumname;
            var albumid = song.albumid.toString();
            var image = 'http://imgcache.qq.com/music/photo/album_300/' + albumid.substring(albumid.length-2,2) 
            + '/300_albumpic_' + albumid + '_0.jpg';
            if (name.length > 6) {
                name = name.substring(0, 6) + '...'
            }
            if (singer.length > 6) {
                singer = singer.substring(0, 6) + '...'
            }
            if (albumname.length > 6) {
                albumname = albumname.substring(0, 6) + '...'
            }
            var tmp = {
                name: name,
                singer: singer,
                albumname: albumname,
                image_url: image,
            }
            res.push(tmp);
        }
        this.setData({songs : res});
        //test
    }
})