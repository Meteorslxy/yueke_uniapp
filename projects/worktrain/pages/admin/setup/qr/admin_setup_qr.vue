<template>
    <view>
        <view v-if="!isLoad" class="margin-top load loading text-l text-grey"></view>

        <view class="main-admin" v-if="isAdmin && isLoad">
            <view class="form-box shadow margin-top-xs">
                <view class="checkin">
                    <view class="notice">
                        <text class="icon-scan margin-right-s text-bold"></text>
                        放在推广的地方展示
                    </view>

                    <image @tap="url" data-type="img" :data-url="qrUrl" mode="aspectFill" class="loading" :show-menu-by-longpress="true" :src="qrUrl"></image>
                    <view class="oprt text-l">长按图片保存小程序码</view>

                    <view v-if="title" class="oprt text-black text-normal">《{{ title }}》小程序码</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
export default {
    data() {
        return {
            isLoad: false,
            qrUrl: '',
            title: '',
            path: '',
            sc: '',
            qr: '',
            isAdmin: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: async function (options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
        }
        if (options && options.qr && options.title) {
            this.setData(
                {
                    qr: decodeURIComponent(options.qr),
                    title: decodeURIComponent(options.title)
                },
                () => {
                    this.loadDetailFun();
                }
            );
        } else {
            this.loadDetailFun();
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
    onPullDownRefresh: async function () {
        await this.loadDetailFun();
        uni.stopPullDownRefresh();
    },
    methods: {
        loadDetailFun: async function () {
            if (this.qr) {
                this.setData({
                    qrUrl: this.qr,
                    isLoad: true
                });
                return;
            }
            let path = pageHelper.fmtURLByPID('/pages/default/index/default_index');
            let params = {
                path
            };
            let opt = {
                title: 'bar'
            };
            try {
                await cloudHelper.callCloudSumbit('admin/setup_qr', params, opt).then((res) => {
                    this.setData({
                        qrUrl: res.data,
                        isLoad: true
                    });
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.error(err);
            }
        },

        url: function (e) {
            pageHelper.url(e, this);
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';

.load.loading::after {
    content: '小程序码生成中...';
}

.form-box .checkin {
    width: 100%;
    padding: 40rpx 40rpx 80rpx;
    padding-bottom: 150rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.form-box .checkin .notice {
    width: 100%;
    font-size: 36rpx;
    text-align: center;
    color: #000;
    margin-bottom: 30rpx;
}

.form-box .checkin image {
    width: 500rpx;
    height: 500rpx;
    margin: 30rpx 0rpx;
}

.form-box .checkin .oprt {
    margin-top: 0rpx;
    text-align: center;
    font-size: 30rpx;
    color: var(--adminColor);
    padding: 20rpx 10rpx;
}
</style>
