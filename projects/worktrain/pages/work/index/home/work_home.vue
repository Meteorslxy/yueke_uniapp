<template>
    <view>
        <view v-if="!isLoad" class="margin-top load loading text-l text-work"></view>

        <view class="main-work" v-if="isLoad && isWork">
            <view class="work-info bg-work">
                <view class="pic">
                    <image mode="aspectFill" class="loading" :src="work.pic || '../../../../images/work/pic.png'" />
                </view>
                <view class="right">
                    <view class="name">
                        <text class="text-xl">{{ work.name }}</text>
                    </view>
                    <view v-if="work.cnt" class="desc text-s">共登录{{ work.cnt }}次，上次{{ work.last }}</view>
                    <view v-else class="desc text-s">首次登录~</view>
                </view>
                <view class="exit-work" @tap="bindExitTap"><text class="icon-exit"></text></view>
            </view>

            <view class="mid">
                <view class="main-menu" style="margin-top: 30rpx">
                    <view class="item" @tap="url" :data-url="'../../meet/edit/work_meet_edit?id=' + id">
                        <view class="ico">
                            <view v-if="stat" class="status">{{ stat.dayCnt }}</view>
                            <text class="icon-calendar"></text>
                        </view>
                        <view class="desc">预约设置与排期</view>
                    </view>
                    <view class="item" @tap="url" :data-url="'../../meet/record/work_meet_record?meetId=' + id">
                        <view class="ico">
                            <text class="icon-form"></text>
                        </view>
                        <view class="desc">用户预约记录</view>
                    </view>
                    <view class="item" @tap="url" :data-url="'../../meet/scan/work_meet_scan?meetId=' + id">
                        <view class="ico">
                            <text class="icon-scan"></text>
                        </view>
                        <view class="desc">核销预约</view>
                    </view>
                </view>

                <view class="main-menu" style="margin-top: 30rpx">
                    <view class="item" @tap="url" data-url="../pwd/work_pwd">
                        <view class="ico">
                            <text class="icon-edit"></text>
                        </view>
                        <view class="desc">修改登录密码</view>
                    </view>
                    <view class="item" @tap="url" :data-url="'../../../meet/detail/meet_detail?id=' + id">
                        <view class="ico">
                            <text class="icon-attention"></text>
                        </view>
                        <view class="desc">预览预约页面</view>
                    </view>
                </view>

                <view @tap="bindExitTap" class="btn-work btn-exit" style="border-radius: 20rpx">退出登录</view>
            </view>

            <view style="height: 150rpx"></view>
        </view>
    </view>
</template>

<script>
const WorkBiz = require('../../../../biz/work_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
export default {
    data() {
        return {
            id: '',
            isLoad: false,

            work: {
                pic: '',
                name: '',
                cnt: '',
                last: ''
            },

            stat: {
                dayCnt: ''
            },

            isWork: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: async function (options) {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: async function () {
        await this.loadDetailFun();
        uni.stopPullDownRefresh();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () {
        if (!WorkBiz.isWork(this)) {
            this.setData({
                isLoad: false
            });
            return;
        }

        // 用于修改图片后更新展示
        let work = WorkBiz.getWorkToken();
        this.setData({
            isLoad: true,
            work,
            id: work.id
        });
        await this.loadDetailFun();
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    methods: {
        loadDetailFun: async function () {
            try {
                let opts = {
                    title: 'bar'
                };
                let res = await cloudHelper.callCloudData('work/home', {}, opts);
                this.setData({
                    stat: res
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.log(err);
            }
        },

        url: function (e) {
            pageHelper.url(e, this);
        },

        bindExitTap: function (e) {
            let callback = function () {
                WorkBiz.clearWorkToken();
                uni.reLaunch({
                    url: '../../../my/index/my_index'
                });
            };
            pageHelper.showConfirm('您确认退出?', callback);
        }
    }
};
</script>
<style>
@import '../../../../style/work.css';

.main-work {
    padding: 0;
}

.work-info {
    height: 200rpx;
    width: 100%;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    border-bottom-left-radius: 50rpx;
}

.work-info .pic {
    width: 100rpx;
    height: 100rpx;
    font-size: 70rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20rpx;
    border-radius: 50%;
    margin-left: 20rpx;
    background-color: #fff;
}

.work-info .right {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.work-info .pic image {
    width: 100rpx;
    height: 100rpx;
    border-radius: inherit;
}

.work-info .right {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.work-info .right .name {
    font-size: 32rpx;
    line-height: 1.8;
}

.work-info .right .desc {
    font-size: 24rpx;
    line-height: 1.3;
}

.work-info .exit-work {
    position: absolute;
    top: 12rpx;
    right: 12rpx;
    font-size: 45rpx;
}

.main-work .comm-list {
    background-color: #fff;
    width: 100%;
    border-radius: 20rpx;
}

.main-work .exit {
    width: 100%;
    padding: 0 20rpx;
    margin-bottom: 50rpx;
}

.main-work .exit button {
    width: 100%;
    color: #fff;
    height: 70rpx;
}

.mid {
    width: 100%;
    padding: 20rpx 15rpx;
}

.main-menu {
    margin-top: 10rpx;
    width: 100%;
    padding: 0rpx;
    background-color: #fff;
    border-radius: 20rpx;
    display: flex;
    flex-wrap: wrap;
    position: relative;
}

.main-menu .title {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5rpx 15rpx;
    background-color: #f2f2f2;
    color: #999;
    border-bottom-left-radius: 10rpx;
    font-size: 24rpx;
}

.main-menu .item {
    width: 33.33%;
    display: flex;
    flex-direction: column;
    padding: 20rpx 0;
    align-items: center;
}

.main-menu .item .ico {
    margin-bottom: 0rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30rpx;
    position: relative;
    padding: 20rpx 0;
}

.main-menu .item .ico text {
    font-size: 60rpx;
}

.main-menu .item .ico .status {
    position: absolute;
    top: 8rpx;
    right: -15rpx;
    font-size: 24rpx;
    padding: 3rpx 10rpx;
    background-color: var(--red);
    color: #fff;
    border-radius: 20rpx;
    z-index: 99999;
}

.main-menu .item .desc {
    font-size: 28rpx;
}

.btn-exit {
    width: 100%;
    margin-top: 50rpx;
}

.base-hint {
    width: 100%;
    padding: 10rpx 20rpx;
    border-radius: 5rpx;
    background-color: #fdf6ec;
    color: #feb13e;
    line-height: 1.5;
}
</style>
