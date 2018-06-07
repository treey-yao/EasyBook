//index.js
//获取应用实例


Page({
    data: {
        messageList: [{
                pic: 'https://qidian.qpic.cn/qdbimg/349573/1009704712/150',
                name: '牧神记',
                chapter: '第三章 呵呵顶顶',
            },
            {
                pic: 'https://qidian.qpic.cn/qdbimg/349573/1009704712/150',
                name: '牧神记',
                chapter: '第三章 呵呵顶顶',
            }
        ],

        isClickToClose: true,
        isOpen: false,
        lastIndex: -1,
    },

    bindCellTapHandler: function(e) { //点击事件
        if (this.data.isClickToClose) {
            console.log('isOpen不触发 详情页');
            this.setData({
                isClickToClose: false
            })
            return;
        }
        let index = e.currentTarget.dataset.index;
        let tapItem = e.currentTarget.dataset.value;
        console.log('点击选项，', index)
    },

    closeOperateItems: function() { //关闭所有的列表
        this.setData({
            ["messageList[" + this.lastIndex + "].cellMoveLeftDistance"]: 0,
            isClickToClose: true,
            isOpen: false,
            lastIndex: 0,
        });

    },

    cellTouchStart: function(e) {
        // touchstart事件
        //触摸开始
        this.data.mark = this.data.newmark = e.touches[0].pageX;

        if (this.data.lastIndex > -1 && this.data.isOpen) {
            this.closeOperateItems();
        }



    },



})