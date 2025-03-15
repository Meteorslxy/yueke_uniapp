<template>
    <view class="main-work bg-work">
        <view class="login">
            <view class="pic&quot;"><text class="icon-peoplefill text-red"></text></view>
            <view class="hint">老师平台</view>

            <view class="form-group margin-top">
                <view class="title">手机：</view>
                <input type="number" placeholder="请输入手机号码" maxlength="11" placeholder-class="phc" v-model="phone" />
            </view>

            <view class="form-group">
                <view class="title">密码：</view>
                <input placeholder="请输入您的密码" maxlength="30" type="password" placeholder-class="phc" v-model="pwd" />
            </view>

            <button class="btn bg-work margin-bottom margin-top" @tap="bindLoginTap">点击登录</button>
            <view class="return text-grey">本系统仅限于老师登录</view>
            <view @tap="bindBackTap" class="return text-grey">
                <text class="icon-back"></text>
                返回用户端
            </view>
        </view>
    </view>
</template>

<script>
const WorkBiz = require('../../../../biz/work_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
export default {
    data() {
        return {
            phone: '',
            pwd: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        WorkBiz.clearWorkToken();
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
            return WorkBiz.workLogin(this, this.phone, this.pwd);
        }
    }
};
</script>
<style>
@import '../../../../style/work.css';

.main-work {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}

.login {
    width: 550rpx;
    background-color: #fff;
    min-height: 550rpx;
    border-radius: 20rpx;
    border-bottom-left-radius: 70rpx;
    border-top-right-radius: 70rpx;
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

.form-group .title {
    color: #333;
}

.pic {
    width: 180rpx;
    height: 180rpx;
    font-size: 130rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
