Page({
    data: {

        arrowLImg: "../../assets/images/arrow_l.png",
        arrowRImg: "../../assets/images/arrow_R.png",
        menuImg: "../../assets/images/menu.png",

        bookText: null,
        bookList: null,

        fontSizeShow: false,
        catalogShow: false,
        // 滑块
        sliderColor: "#e9e9e9",
        activeColor: "#d4237a",
        blockSize: 10,
        bookPic: 'https://qidian.qpic.cn/qdbimg/349573/1009704712/150',
    },

    onLoad: function() {
        //初始化页面的时候 向后台请求数据   异步加载数据 不会阻塞页面
        this.getAllinfo();
    },


    getAllinfo: function() {
        var _this = this;
        wx.request({
            url: 'https://www.easy-mock.com/mock/5b02619b95118136368f1a04/book/bookText',
            method: "GET",
            header: {
                'content-type': 'application/json' // get 取值
            },
            success: function(res) {
                console.log(res)
                if (res.statusCode) {
                    _this.setData({
                        bookText: res.data.data.bookText,
                        bookList: res.data.data.catalog,
                    })
                }
            }
        })
    },

    listenerSlider: function(e) {
        console.log(e.detail.value)
    }

})