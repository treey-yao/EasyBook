//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        //轮播图参数
        slides: [],
        indicatorDots: true, //是否显示面板指示点
        indicatorActiveColor: "#d4237a", //当前选中的指示点颜色
        autoplay: true, //是否自动切换
        interval: 5000,
        duration: 1000,
        // 搜索
        deleteIco: "../../assets/images/delete.png",
        searchPanel: false,
        // 关键词
        searchWord: "",

        // 新品推荐
        newBook: [],
        // 完本小说
        endBook: [],
    },
    onLoad: function() {
        //初始化页面的时候 向后台请求数据   异步加载数据 不会阻塞页面
        this.getAllinfo();
    },

    //获取首页的数据
    getAllinfo: function() {
        var _this = this;
        wx.request({
            url: 'https://www.easy-mock.com/mock/5b02619b95118136368f1a04/book/index',
            method: "GET",
            header: {
                'content-type': 'application/json' // get 取值
            },
            success: function(res) {
                console.log(res)
                if (res.statusCode) {
                    _this.setData({
                        slides: res.data.data.slides,
                        newBook: res.data.data.newBook,
                        endBook: res.data.data.endBook
                    })
                }
            }
        })
    },
    searchText: function(e) {
        this.setData({
            searchWord: e.detail.value,
            searchPanel: true,
        });
    },
    searchBut: function() {
        console.log(this.data.searchWord)
    }
})