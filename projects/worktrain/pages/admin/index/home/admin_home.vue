<template>
    <view>
        <view v-if="!isLoad" class="margin-top load loading text-l text-admin"></view>

        <view class="main-admin" v-if="isLoad && isAdmin">
            <view class="admin-info bg-admin">
                <view class="pic"><text class="icon-profilefill"></text></view>
                <view class="right">
                    <view class="name">
                        <text class="text-xl">{{ admin.name }}</text>

                        <text v-if="admin.type == 1" class="tag small bg-orange light radius margin-left-s">超级管理员</text>
                        <text v-if="admin.type == 0" class="tag small bg-green radius margin-left-s">一般管理员</text>
                    </view>
                    <view class="desc text-s">共登录{{ admin.cnt }}次，上次{{ admin.last }}</view>
                </view>
                <view class="exit-admin" @tap="bindExitTap"><text class="icon-exit"></text></view>
            </view>

            <view class="bar bg-white solid-bottom margin-top-s">
                <view class="action">
                    <text class="icon-title"></text>
                    功能管理
                </view>
            </view>

            <view class="comm-list grid col-3">
                <view class="item" @tap="url" data-url="../../user/list/admin_user_list">
                    <text class="icon-group_fill text-green"></text>
                    <text class="text-black">用户管理</text>
                </view>

                <view class="item" @tap="url" data-url="../../news/list/admin_news_list">
                    <text class="icon-formfill text-darkgreen"></text>
                    <text class="text-black">公告管理</text>
                </view>

                <view class="item" @tap="url" data-url="../../meet/list/admin_meet_list">
                    <text class="icon-timefill text-red"></text>
                    <text class="text-black">老师&预约管理</text>
                </view>
            </view>

            <!-- BOTTOM begin -->
            <view class="comm-list menu margin-top">
                <view class="item arrow" @tap="url" data-url="../../setup/about_list/admin_setup_about_list">
                    <view class="content">
                        <text class="icon-edit text-darkgreen"></text>
                        <text class="text-black">编辑 - 关于我们</text>
                    </view>
                </view>

                <view class="item arrow" @tap="url" data-url="../../setup/qr/admin_setup_qr">
                    <view class="content">
                        <text class="icon-qr_code text-mauve"></text>
                        <text class="text-black">小程序二维码</text>
                    </view>
                </view>
            </view>

            <view class="comm-list menu">
                <view v-if="isSuperAdmin" class="item arrow" @tap="url" data-url="../../mgr/list/admin_mgr_list">
                    <view class="content">
                        <text class="icon-profile text-red"></text>
                        <text class="text-black">系统管理员管理</text>
                    </view>
                </view>

                <view class="item arrow" @tap="url" data-url="../../mgr/pwd/admin_mgr_pwd">
                    <view class="content">
                        <text class="icon-lock text-orange"></text>
                        <text class="text-black">修改我的管理员密码</text>
                    </view>
                </view>

                <view class="item arrow" @tap="url" data-url="../../mgr/log/admin_log_list">
                    <view class="content">
                        <text class="icon-footprint text-brown"></text>
                        <text class="text-black">管理员操作日志</text>
                    </view>
                </view>
            </view>

            <view class="comm-list menu margin-bottom-xl">
                <view class="item arrow" @tap="bindMoreTap">
                    <view class="content">
                        <text class="icon-settings text-grey"></text>
                        <text class="text-black">更多设置</text>
                    </view>
                </view>
            </view>

            <!-- BOTTOM END -->
            <button @tap="bindExitTap" class="btn-admin margin-top">退出登录</button>

            <view class="foot-bottom">
                <cmpt-foot />
            </view>
        </view>
    </view>
</template>

<script>
import cmptFoot from '@/cmpts/biz/foot/foot_cmpt';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
export default {
    components: {
        cmptFoot
    },
    data() {
        return {
            isLoad: false,

            admin: {
                name: '',
                type: 0,
                cnt: '',
                last: ''
            },

            stat: '',
            isAdmin: '',
            isSuperAdmin: false
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
        }
        this.loadDetailFun();
    },
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
    onShow: function () {},
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
            let admin = AdminBiz.getAdminToken();
            this.setData({
                isLoad: true,
                admin
            });
            try {
                let opts = {
                    title: 'bar'
                };
                let res = await cloudHelper.callCloudData('admin/home', {}, opts);
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

        bindMoreTap: function (e) {
            let itemList = ['取消所有首页推荐'];
            uni.showActionSheet({
                itemList,
                success: async (res) => {
                    let idx = res.tapIndex;
                    if (idx == 0) {
                        this.clearVouchFun();
                    }
                },
                fail: function (res) {}
            });
        },

        clearVouchFun: async function (e) {
            let cb = async () => {
                try {
                    await cloudHelper.callCloudSumbit('admin/clear_vouch').then((res) => {
                        pageHelper.showSuccToast('操作成功');
                    });
                } catch (err) {
                    console.log('CatchClause', err);
                    console.log('CatchClause', err);
                    console.log(err);
                }
            };
            pageHelper.showConfirm('您确认清除所有首页推荐？', cb);
        },

        bindExitTap: function (e) {
            let callback = function () {
                AdminBiz.clearAdminToken();
                uni.reLaunch({
                    url: pageHelper.fmtURLByPID('/pages/my/index/my_index')
                });
            };
            pageHelper.showConfirm('您确认退出?', callback);
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';

.main-admin {
    padding: 0;
}

.admin-info {
    height: 200rpx;
    width: 100%;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}

.admin-info .pic {
    width: 100rpx;
    height: 100rpx;
    font-size: 70rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20rpx;
    border-radius: 20rpx;
    margin-left: 20rpx;
}

.admin-info .right {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.admin-info .right .name {
    font-size: 32rpx;
    line-height: 1.8;
}

.admin-info .right .desc {
    font-size: 24rpx;
    line-height: 1.3;
}

.admin-info .exit-admin {
    position: absolute;
    top: 12rpx;
    right: 12rpx;
    font-size: 45rpx;
}

.main-admin .comm-list,
.main-admin .bar {
    background-color: #fff;
    width: 100%;
}

.main-admin .exit {
    width: 100%;
    padding: 0 20rpx;
    margin-bottom: 50rpx;
}

.main-admin .exit button {
    width: 100%;
    color: #fff;
    height: 70rpx;
}

.grid.col-6 > view {
    width: 16.66%;
}

.foot-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 50rpx;
}
</style>
