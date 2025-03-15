<template>
    <view class="main-admin bg-admin">
        <view class="login shadow">
            <view class="pic&quot;"><text class="icon-settingsfill text-orange"></text></view>
            <view class="hint">后台管理系统</view>

            <view class="form-group margin-top">
                <view class="title">账号：</view>
                <input placeholder="请输入管理员账号" maxlength="30" placeholder-class="phc" v-model="name" />
            </view>

            <view class="form-group">
                <view class="title">密码：</view>
                <input placeholder="请输入管理员密码" maxlength="30" type="password" placeholder-class="phc" v-model="pwd" />
            </view>
            <view class="form-group-pwd" @tap="bindRememberTap">
                <text :class="remember ? 'icon-squarecheckfill text-blue' : 'icon-square'"></text>
                记住密码
            </view>

            <button class="btn bg-admin margin-bottom" @tap="bindLoginTap">点击登录</button>
            <view class="return text-grey">本系统仅限于系统管理员登录</view>
            <view @tap="bindBackTap" class="return text-grey">
                <text class="icon-back"></text>
                返回用户端
            </view>
        </view>

        <view class="foot-bottom">
            <cmpt-foot />
        </view>
    </view>
</template>

<script>
import cmptFoot from '@/cmpts/biz/foot/foot_cmpt';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cacheHelper = require('../../../../../../helper/cache_helper.js');
export default {
    components: {
        cmptFoot
    },
    data() {
        return {
            name: '',
            pwd: '',
            remember: false
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        AdminBiz.clearAdminToken();

        // 记住密码
        let pwd = cacheHelper.get('admin-pwd');
        if (pwd) {
            this.setData({
                name: pwd.name,
                pwd: pwd.pwd,
                remember: true
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
    methods: {
        url: function (e) {
            pageHelper.url(e, this);
        },

        bindBackTap: function (e) {
            uni.reLaunch({
                url: pageHelper.fmtURLByPID('/pages/my/index/my_index')
            });
        },

        bindLoginTap: async function (e) {
            // 记住密码
            if (this.remember) {
                cacheHelper.set(
                    'admin-pwd',
                    {
                        pwd: this.pwd,
                        name: this.name
                    },
                    2592000
                );
            } else {
                cacheHelper.clear('admin-pwd');
            }
            return AdminBiz.adminLogin(this, this.name, this.pwd);
        },

        bindRememberTap: function (e) {
            this.setData({
                remember: !this.remember
            });
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';

.main-admin {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}

.login {
    width: 500rpx;
    background-color: #fff;
    min-height: 550rpx;
    border-radius: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 50rpx 20rpx;
    margin-top: -100rpx;
}

.login button {
    width: 85%;
    color: #fff;
    font-size: 32rpx;
}

.login .hint {
    width: 100%;
    color: #000;
    font-weight: bold;
    font-size: 36rpx;
    text-align: center;
}

.login .return {
    width: 100%;
    font-size: 30rpx;
    text-align: center;
    font-size: 26rpx;
}

.pic {
    width: 180rpx;
    height: 180rpx;
    font-size: 130rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.foot-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 50rpx;
}

.site-footer {
    color: #fff !important;
}

.form-group .title {
    color: #333;
}

.form-group-pwd {
    width: 100%;
    padding: 25rpx 30rpx;
    color: #777 !important;
}
</style>
