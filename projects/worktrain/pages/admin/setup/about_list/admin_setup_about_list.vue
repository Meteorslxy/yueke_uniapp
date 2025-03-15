<template>
    <!-- List Begin -->
    <view class="main-admin" v-if="isAdmin">
        <view class="admin-comm-list">
            <view class="item" @tap="url" :data-url="'../about/admin_setup_about?key=' + item.key" v-for="(item, index) in list" :key="index">
                <view class="header">
                    <view class="left text-cut">《{{ item.title }}》</view>
                    <view class="right">
                        <view class="btn round margin-right-s">
                            <text class="icon-edit margin-right-xxs"></text>
                            编辑
                        </view>

                        <view @tap.stop.prevent="url" :data-url="'../../../about/list/about_list?key=' + item.key" class="btn round margin-right-s">
                            <text class="icon-attention margin-right-xxs"></text>
                            预览
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- List END -->
    </view>
</template>

<script>
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const projectSetting = require('../../../../public/project_setting.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
export default {
    data() {
        return {
            list: '',
            isAdmin: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
        }
        this.setData({
            list: projectSetting.SETUP_CONTENT_ITEMS
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    methods: {
        url: function (e) {
            pageHelper.url(e, this);
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';

page {
    background-color: #f8f8f8;
}

.main-admin {
    padding: 40rpx 0;
}

.admin-comm-list .item {
    margin-bottom: 40rpx;
}

.admin-comm-list .item .header .left {
    font-size: 32rpx !important;
}
</style>
