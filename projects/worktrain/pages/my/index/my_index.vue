<template>
    <view>
        <view class="main">
            <view class="top">
                <view class="inner" @tap="url" :data-url="user ? '../edit/my_edit' : '../reg/my_reg'">
                    <view class="avatar">
                        <image src="/static/projects/worktrain/images/tabbar/my_cur.png" mode="aspectFill"></image>
                    </view>
                    <view class="right">
                        <view class="line1">
                            <view class="name">{{ user ? user.USER_NAME : '注册 / 登录' }}</view>
                            <view v-if="user && user.USER_STATUS == 9" class="type bg-red">已禁用</view>
                            <view v-else-if="user && user.USER_STATUS == 0" class="type bg-orange">已注册，待审核</view>
                            <view v-else-if="user && user.USER_STATUS == 8" class="type bg-orange">审核未通过，请修改资料</view>
                        </view>
                        <view class="line2">{{ user ? '欢迎回来~~~' : '马上注册，使用更多功能' }}</view>
                    </view>
                </view>

                <view class="ex">
                    <view class="ex-inner">
                        <text class="icon-edit margin-right-xs"></text>
                        <view @tap="url" data-url="../edit/my_edit" class="title">修改我的个人资料</view>
                    </view>
                </view>
            </view>

            <view class="meet-menu">
                <view class="padding-s text-bold">
                    <text class="icon-calendar margin-right-xxs"></text>
                    我的预约
                </view>
                <view class="inner">
                    <view class="item" @tap="url" data-url="../../meet/my_join_list/meet_my_join_list?status=use">
                        <view class="img">
                            <image src="/static/projects/worktrain/images/my/use.png" />
                        </view>
                        <text>可使用</text>
                    </view>
                    <view class="item" @tap="url" data-url="../../meet/my_join_list/meet_my_join_list?status=check">
                        <view class="img">
                            <image src="/static/projects/worktrain/images/my/check.png" />
                        </view>
                        <text>已核销</text>
                    </view>
                    <view class="item" @tap="url" data-url="../../meet/my_join_list/meet_my_join_list?status=timeout">
                        <view class="img">
                            <image src="/static/projects/worktrain/images/my/out.png" />
                        </view>
                        <text>已过期</text>
                    </view>
                    <view class="item" @tap="url" data-url="../../meet/my_join_list/meet_my_join_list?status=cancel">
                        <view class="img">
                            <image src="/static/projects/worktrain/images/my/cancel.png" />
                        </view>
                        <text>系统取消</text>
                    </view>
                    <view class="item" @tap="url" data-url="../../meet/my_join_list/meet_my_join_list?status=all">
                        <view class="img">
                            <image src="/static/projects/worktrain/images/my/all.png" />
                        </view>
                        <text>全部预约</text>
                    </view>
                </view>
            </view>

            <view class="list-menu">
                <view class="item" @tap="url" data-url="../fav/my_fav">
                    <view class="title">
                        <text class="icon-favor title-ico"></text>
                        <text>我的收藏</text>
                    </view>
                </view>
                <view class="item" @tap="url" data-url="../foot/my_foot">
                    <view class="title">
                        <text class="icon-footprint title-ico"></text>
                        <text>历史浏览</text>
                    </view>
                </view>

                <view class="item" @tap="bindSetTap">
                    <view class="title">
                        <text class="icon-friend title-ico"></text>
                        <text style="color: var(--projectColor)">
                            老师入口
                            <text v-if="skin.IS_SUB" class="text-grey text-normal">（点击试用）</text>
                        </text>
                    </view>
                </view>

                <view class="item" v-if="skin.IS_SUB" @tap="bindSetTap">
                    <view class="title">
                        <text class="icon-settings title-ico"></text>
                        <text class="text-red text-bold">
                            系统后台管理
                            <text class="text-grey text-normal">（点击试用）</text>
                        </text>
                    </view>
                </view>

                <view class="item" @tap="url" data-url="../../about/index/about_index?key=SETUP_CONTENT_ABOUT">
                    <view class="title">
                        <text class="icon-service title-ico"></text>
                        <text>关于我们</text>
                    </view>
                </view>

                <view class="item" v-if="skin.IS_SUB" @tap="url" data-url="/pages/home/about/home_about">
                    <view class="title">
                        <text class="icon-phone title-ico"></text>
                        <text class="text-orange">联系作者了解更多详情</text>
                    </view>
                </view>

                <view class="item" v-if="!skin.IS_SUB" @tap="bindSetTap">
                    <view class="title">
                        <text class="icon-settings title-ico"></text>
                        <text>设置</text>
                    </view>
                </view>
            </view>
            <view style="height: 150rpx"></view>
        </view>

        <block v-if="skin.IS_SUB">
            <menuTpl compName="menuTpl" :data="{ curMenu: 'my_index', returnHome: false }"></menuTpl>
        </block>
    </view>
</template>

<script>
import menuTpl from '../../tpls/menu_tpl';
/**
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2020-10-29 07:48:00
 */

const cacheHelper = require('../../../../../helper/cache_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const AdminBiz = require('../../../../../comm/biz/admin_biz.js');
const WorkBiz = require('../../../biz/work_biz.js');
const setting = require('../../../../../setting/setting.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
export default {
    components: {
        menuTpl
    },
    data() {
        return {
            user: {
                USER_NAME: '',
                USER_STATUS: 0
            },

            skin: {
                IS_SUB: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        if (PassportBiz.isLogin()) {
            let user = {};
            user.USER_NAME = PassportBiz.getUserName();
            this.setData({
                user
            });
        }
        ProjectBiz.initPage(this);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () {
        PassportBiz.loginSilenceMust(this);
        this.loadUserFun();
    },
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
        await this.loadUserFun();
        uni.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        loadUserFun: async function (e) {
            let opts = {
                title: 'bar'
            };
            let user = await cloudHelper.callCloudData('passport/my_detail', {}, opts);
            if (!user) {
                this.setData({
                    user: null
                });
                return;
            }
            this.setData({
                user
            });
        },

        url: function (e) {
            pageHelper.url(e, this);
        },

        bindSetTap: function (e, skin) {
            let itemList = ['清除缓存', '后台管理', '老师平台'];
            uni.showActionSheet({
                itemList,
                success: async (res) => {
                    let idx = res.tapIndex;
                    if (idx == 0) {
                        cacheHelper.clear();
                        pageHelper.showNoneToast('清除缓存成功');
                    }
                    if (idx == 1) {
                        if (setting.IS_SUB) {
                            AdminBiz.adminLogin(this, 'admin', '123456');
                        } else {
                            uni.reLaunch({
                                url: '../../admin/index/login/admin_login'
                            });
                        }
                    }
                    if (idx == 2) {
                        if (setting.IS_SUB) {
                            WorkBiz.workLogin(this, '13700000000', '123456');
                        } else {
                            uni.reLaunch({
                                url: '../../work/index/login/work_login'
                            });
                        }
                    }
                },
                fail: function (res) {}
            });
        }
    }
};
</script>
<style>
@import '../../../style/skin.css';

page {
    background-color: #fff;
    width: 100%;
    display: flex;
}

.main {
    padding: 0;
    width: 100%;
    overflow: hidden;
}

.top {
    height: 320rpx;
    background-color: var(--projectColor);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 240%;
    border-radius: 0 0 50% 50%;
    padding-top: 40rpx;
    position: relative;
    overflow: hidden;
}

.top .inner {
    width: 100vw;
    display: flex;
    padding: 0 25rpx;
    justify-items: center;
}

.top .inner .avatar {
    height: 120rpx;
    width: 120rpx;
    border-radius: 50%;
    background-color: #fff;
}

.top .inner .avatar image {
    height: 80rpx;
    width: 80rpx;
    border-radius: 50%;
}

.top .inner .right {
    flex: 1;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.top .inner .right .line1 {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 25rpx;
}

.top .inner .right .line1 .name {
    font-size: 36rpx;
    font-weight: bold;
    margin-right: 20rpx;
    color: #fff;
}

.top .inner .right .line1 .type {
    font-size: 24rpx;
    padding: 0 25rpx;
    background-color: #333;
    color: var(--projectColor);
    border-radius: 20rpx;
}

.top .inner .right .line2 {
    font-size: 24rpx;
    color: #fff;
}

.top .ex {
    position: absolute;
    bottom: 0;
    height: 120rpx;
    width: 100vw;
    padding: 0 25rpx;
    display: flex;
    justify-content: center;
}

.top .ex .ex-inner {
    background-color: var(--projectColor);
    background-image: linear-gradient(45deg, var(--projectColor), var(--projectColorLight));
    width: 100%;
    height: inherit;
    color: #fff;
    border-top-left-radius: 25rpx;
    border-top-right-radius: 25rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 40rpx;
}

.top .ex .ex-inner image {
    width: 30rpx;
    height: 30rpx;
    margin-right: 10rpx;
}

.top .ex .ex-inner .title {
    font-size: 30rpx;
    flex: 1;
}

.top .ex .ex-inner .desc {
    width: 380rpx;
    font-size: 26rpx;
    text-align: right;
}

.meet-menu {
    width: 100%;
    padding: 25rpx;
    margin-top: 30rpx;
    background-color: #fff;
}

.meet-menu .inner {
    width: 100%;
    display: flex;
    border-radius: 20rpx;
    padding: 30rpx 0;
    box-shadow: 6rpx 6rpx 18rpx rgba(216, 220, 223, 0.5);
    border: 1rpx solid #ddd;
}

.meet-menu .inner .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.meet-menu .inner .item .img {
    position: relative;
}

.meet-menu .inner .item .img text {
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 62rpx;
    z-index: 9999;
}

.meet-menu .inner .item image {
    width: 60rpx;
    height: 60rpx;
}

.meet-menu .inner .item text {
    font-size: 24rpx;
    color: #777;
}

.meet-menu .inner .item:last-child {
    border-left: 1rpx solid #eee;
}

.list-menu {
    width: 100%;
    padding: 0 25rpx;
    display: flex;
    flex-direction: column;
    background-color: #fff;
}

.list-menu .item {
    width: 100%;
    display: flex;
    font-size: 30rpx;
    align-items: center;
    justify-content: flex-start;
    padding: 35rpx 10rpx;
    border-bottom: 1rpx solid #ddd;
}

.list-menu .item:last-child {
    padding-bottom: 10rpx;
}

.list-menu .item:last-child {
    border-bottom: 0rpx;
}

.list-menu .item .title {
    flex: 1;
    display: flex;
    align-items: center;
    color: #000;
}

.list-menu .item .title .title-ico {
    margin-right: 20rpx;
}
</style>
