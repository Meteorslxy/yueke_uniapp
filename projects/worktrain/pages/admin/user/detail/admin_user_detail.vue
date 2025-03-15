<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l text-grey"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l text-grey"></view>

        <view v-if="isLoad && isAdmin" class="main-admin">
            <view class="admin-comm-list">
                <view class="item">
                    <view class="info">
                        <view class="info-item">
                            <view class="title">用户昵称</view>
                            <view class="mao">：</view>
                            <view class="content text-admin text-l">{{ user.USER_NAME }}</view>
                        </view>
                        <view class="info-item" @tap="url" data-type="phone" :data-url="user.USER_MOBILE">
                            <view class="title">手机号码</view>
                            <view class="mao">：</view>
                            <view class="content">
                                {{ user.USER_MOBILE }}
                                <text class="icon-phone text-l margin-left-xs"></text>
                            </view>
                        </view>
                        <view class="info-item">
                            <view class="title">注册时间</view>
                            <view class="mao">：</view>
                            <view class="content">{{ user.USER_ADD_TIME }}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view style="height: 30rpx"></view>

            <adminFormsDetailTpl compName="adminFormsDetailTpl" :data="{ forms: user.USER_FORMS }"></adminFormsDetailTpl>
        </view>
    </view>
</template>

<script>
import adminFormsDetailTpl from '../../../../../../tpls/public/admin_forms_detail_tpl';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
export default {
    components: {
        adminFormsDetailTpl
    },
    data() {
        return {
            isLoad: false,

            user: {
                USER_NAME: '',
                USER_MOBILE: '',
                USER_ADD_TIME: '',
                USER_FORMS: ''
            },

            isAdmin: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
        }
        if (!pageHelper.getOptions(this, options)) {
            return;
        }
        this.loadDetailFun();
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
    async onPullDownRefresh() {
        await this.loadDetailFun();
        uni.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {
        loadDetailFun: async function () {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let id = this.id;
            if (!id) {
                return;
            }
            let params = {
                id
            };
            let opts = {
                hint: false
            };
            let user = await cloudHelper.callCloudData('admin/user_detail', params, opts);
            if (!user) {
                this.setData({
                    isLoad: null
                });
                return;
            }
            this.setData({
                isLoad: true,
                user
            });
        },

        url(e) {
            pageHelper.url(e, this);
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';

.main-admin {
    padding: 30rpx 0rpx;
}
</style>
