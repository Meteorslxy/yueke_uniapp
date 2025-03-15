<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l text-grey"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l text-grey"></view>

        <block v-if="isAdmin">
            <Admin_meet_temp_tpl :data="this"></Admin_meet_temp_tpl>
        </block>
    </view>
</template>

<script>
import Admin_meet_temp_tpl from './admin_meet_temp_tpl';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const behavior = require('./admin_meet_temp_bh.js');
export default {
    components: {
        Admin_meet_temp_tpl
    },
    data() {
        return {
            isLoad: '',
            isAdmin: false,
            this: []
        };
    },
    mixins: [behavior],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
        }
        await this._loadList();
    },
    methods: {}
};
</script>
<style>
@import '../../../../../../style/public/admin.css';
@import '../../../../../../style/public/article_list.css';

.load.notexist::after {
    content: '您还没有可选用的模板哦';
}

.text-pic-list-box .item {
    padding: 18rpx 30rpx;
    position: relative;
}

.item .time-list {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 20rpx;
}

.item .time-list .time-item {
    width: 33.33%;
    padding: 10rpx;
}

.item .time-list .time-item .detail {
    width: 100%;
    border: 1rpx solid #ccc;
    border-radius: 1rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 13rpx 0;
    height: 130rpx;
}

.item .time-list .time-item .detail > text {
    font-size: 30rpx;
    color: #555;
    width: 100%;
    text-align: center;
}

.item .time-list .time-item .detail .up {
    font-size: 29rpx;
}

.item .detail.select {
    font-size: 35rpx;
    background-color: #f8f8f8;
    color: #777;
}

.item .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    color: #333 !important;
    margin-left: 15rpx;
}

.item .title .temp-name {
    flex: 1;
}

.item .title .more {
    color: #777;
    width: 60rpx;
    text-align: right;
    font-size: 40rpx;
    font-weight: normal;
}
</style>
