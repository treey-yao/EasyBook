//index.js
//获取应用实例
const UPDATE_MILE_SEC = 100; //自动关闭、打开 每次刷新毫秒

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
        isReachTop: false,
        currentIndex: -1,
        currentX: 0,

        CELL_MAX_MOVE: 50,
        CELL_MIN_MOVE: 25,


        mark: 0,
        newmark: 0,
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
            ["messageList[" + this.data.lastIndex + "].cellMoveLeftDistance"]: 0,
            isClickToClose: true,
            isOpen: false,
            lastIndex: 0,
        });

    },

    cellTouchStart: function(e) {
        // touchstart事件
        //触摸开始


        this.data.mark = this.data.newmark = e.touches[0].pageX;

        this.setData({
            currentIndex: e.currentTarget.dataset.index, //获取列表 坐标
        })

        if (this.data.lastIndex > -1 && this.data.isOpen) {
            if (this.data.currentIndex != this.data.lastIndex) {
                this.closeOperateItems();
            }
        }

        this.setData({
            mark: e.touches[0].pageX,
            newmark: e.touches[0].pageX,
        });

    },

    cellTouchMove: function(e) {

        //触摸移动

        if (e.touches.length != 1) {
            console.log('多指触摸不触发 cellTouchMove');
            return;
        }

        //记录触摸点位置的X坐标
        let moveX = e.touches[0].clientX;
        //计算手指起始点的X坐标与当前触摸点的X坐标的差值
        let disX = this.data.mark - moveX;
        // console.log('move', disX)

        if (this.data.isOpen) {
            if (disX > 0) {
                console.log('|<-------isOpen 已经到 左边 顶到了...');
                return;
            }
        }

        if (this.data.currentX > 0) {
            this.setData({
                currentX: disX
            })
        } else { //初始
            //初始的时候，不让往右滑
            if (disX < 0 && !this.data.isOpen) {
                this.setData({
                    isReachTop: true
                })
                console.log('------->| 已经到 右边 顶到了...');
                return;
            }
        }

        //大于最大宽度，就不再滑 CELL_MAX_MOVE
        if (disX > this.data.CELL_MAX_MOVE) {
            this.setData({
                isReachTop: true
            })
            console.log('|<------- 已经到 左边 顶到了');
            return;
        }

        // if (this.isOpen) {
        //     disX = disX + CELL_MAX_MOVE;
        // }

        let vw = disX / 10;

        this.setData({
            ["messageList[" + this.data.currentIndex + "].cellMoveLeftDistance"]: vw //计算成vw
        });
    },

    cellTouchEnd: function(e) {
        //触摸结束

        if (e.changedTouches.length != 1) {
            console.log('多指触摸不触发 cellTouchEnd');
            return;
        }
        let endX = e.changedTouches[0].clientX;
        let disX = this.data.mark - endX;

        if (this.data.isReachTop) {
            if (disX > 0) { //左滑到顶
                this.data.isOpen = true;
                console.log('cellTouchEnd <--左滑到顶 重置为', );

            } else {
                disX = 0; //右滑到顶  
                this.data.isOpen = false;
                console.log('cellTouchEnd -->右滑到顶 重置为', 0);
            }
        }

        if (this.data.isOpen) { //在打开状态下，只要稍微右滑，就自动关闭



        } else {
            var CELL_MIN_MOVE = this.data.CELL_MIN_MOVE;
            var CELL_MAX_MOVE = this.data.CELL_MAX_MOVE;

            if (disX < CELL_MIN_MOVE) { //右滑距离小于 最大打开状态  自动关闭
                let newX = -(disX);
                for (let i = newX; i <= 0; i++) { //TODO：由于setTimeOut会导致，卡顿，动画进行很慢，所以，不采用。只有一个项的时候，是正常的
                    // let vw = newX / 10; //计算成vw
                    setTimeout(() => {
                        this.setData({
                            ["messageList[" + this.data.currentIndex + "].cellMoveLeftDistance"]: i
                        });
                    }, UPDATE_MILE_SEC)
                }
                this.data.isOpen = false;
            } else {

                this.setData({
                    ["messageList[" + this.data.currentIndex + "].cellMoveLeftDistance"]: 5
                });
                this.data.isOpen = true;
            }
        }

        this.setData({
            currentX: 0, //滑动完，重置
            isReachTop: false
        })

        if (this.data.isOpen) {
            this.setData({
                lastIndex: this.data.currentIndex,
            })
        }
    },

    deleteBtn: function() {
        wx.showModal({
            title: '删除',
            content: '是否删除小说',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else {
                    console.log('用户点击取消')
                }
            }
        })
    }



})