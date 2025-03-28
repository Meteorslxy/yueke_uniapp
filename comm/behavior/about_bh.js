const pageHelper = require('../../helper/page_helper.js');
const cloudHelper = require('../../helper/cloud_helper.js');
module.exports = {
    data() {
        return {
            isLoad: false
        };
    },
    methods: {
        _loadDetail: async function (key, items, options = null) {
            let title = '';
            if (options && options.title) {
                title = decodeURIComponent(options.title);
                uni.setNavigationBarTitle({
                    title
                });
            } else {
                for (let k = 0; k < items.length; k++) {
                    if (items[k].key == key) {
                        title = items[k].title;
                        uni.setNavigationBarTitle({
                            title
                        });
                        if (key == 'SETUP_CONTENT_ABOUT') {
                            this.setData({
                                accountInfo: uni.getAccountInfoSync()
                            });
                        }
                        break;
                    }
                }
            }
            let opts = {
                title: 'bar'
            };
            let params = {
                key
            };
            let about = await cloudHelper.callCloudData('home/setup_get', params, opts);
            if (!about) {
                about = [
                    {
                        type: 'text',
                        val: title
                    }
                ];
            }
            if (about) {
                this.setData({
                    about,
                    isLoad: true
                });
            }
        },
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {},
        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {},
        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {},
        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {},
        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {
            this._loadDetail();
            uni.stopPullDownRefresh();
        },
        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function () {},
        url: function (e) {
            pageHelper.url(e, this);
        }
    }
};
