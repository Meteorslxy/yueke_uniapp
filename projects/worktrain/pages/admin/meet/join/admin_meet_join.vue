<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l text-grey"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l text-grey"></view>

        <block v-if="isAdmin && isLoad">
            <Admin_meet_join_tpl :data="this"></Admin_meet_join_tpl>
        </block>
    </view>
</template>

<script>
import Admin_meet_join_tpl from './admin_meet_join_tpl';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const behavior = require('./admin_meet_join_bh.js');
export default {
    components: {
        Admin_meet_join_tpl
    },
    data() {
        return {
            isLoad: '',
            isAdmin: '',
            this: []
        };
    },
    mixins: [behavior],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
        }
        this._init(options);
    },
    methods: {}
};
</script>
<style>
@import '../../../../../../style/public/admin.css';

page {
    background-color: #f8f8f8;
}

.join-list {
    width: 100%;
    padding: 0rpx 20rpx 20rpx;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
}

.join-list .item {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;
    border-radius: 5rpx;
    overflow: hidden;
    margin-bottom: 30rpx;
    position: relative;
    border: 1rpx solid #ddd;
}

.join-list .item .no {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 25rpx;
    color: #999;
    line-height: 2;
    padding: 0rpx 15rpx 0rpx 15rpx;
    background-color: #eee;
    border-top-left-radius: 15rpx;
}

.join-list .item .header {
    width: 100%;
    font-size: 26rpx;
    text-align: left;
    line-height: 2.6;
    background-color: #f2f2f2;
    padding: 0 15rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.join-list .item .header .left {
    color: #333;
}

.join-list .item .header .right {
    font-size: 25rpx;
    color: #666;
}

.join-list .item .info {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;
    min-height: 150rpx;
    padding: 15rpx 20rpx 20rpx;
    position: relative;
}

.join-list .item .info .right-corner {
    position: absolute;
    left: 10rpx;
    top: 0;
    width: 100rpx;
    height: 50rpx;
}

.join-list .item .info .fold {
    width: 100%;
    text-align: center;
    font-size: 24rpx;
    color: #999;
    padding: 0 20rpx 10rpx;
}

.join-list .item .info .info-item {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #fff;
    line-height: 1.5;
    font-size: 25rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
}

.join-list .item .info .info-item .title {
    width: 160rpx;
    color: #777;
    text-align: right;
}

.join-list .item .info .info-item .mao {
    color: #777;
    text-align: left;
    margin-right: 10rpx;
}

.join-list .item .info .info-item .content {
    flex: 1;
    color: #333;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.join-list .item .info .info-item.add-time {
    font-size: 24rpx !important;
    font-weight: normal !important;
    border-top: 1rpx dashed #ccc;
    padding-top: 15rpx;
}

.join-list .item .info .oprt {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0rpx 0 0rpx;
}

.join-list .item .info .oprt .btn {
    padding: 0 30rpx;
    font-size: 26rpx;
    border-radius: 10rpx !important;
}

.cancel-area {
    border: 1rpx solid #ddd;
}

.time-line {
    width: 100%;
    text-align: right;
    font-size: 24rpx;
}
</style>
