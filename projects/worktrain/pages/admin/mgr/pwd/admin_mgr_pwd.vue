<template>
    <view class="main-admin" v-if="isAdmin">
        <view class="form-box shadow">
            <view class="form-group">
                <view class="title must">旧密码</view>
                <input maxlength="30" type="password" placeholder="请填写旧密码" v-model="formOldPassword" :focus="formOldPasswordFocus" />
            </view>
            <view v-if="formOldPasswordFocus" class="hint-desc error">{{ formOldPasswordFocus }}</view>

            <view class="form-group">
                <view class="title must">新密码</view>
                <input maxlength="30" type="password" placeholder="请填写新密码" v-model="formPassword" :focus="formPasswordFocus" />
            </view>
            <view v-if="formPasswordFocus" class="hint-desc error">{{ formPasswordFocus }}</view>

            <view class="form-group">
                <view class="title must">新密码再次填写</view>
                <input maxlength="30" type="password" placeholder="请再次填写新密码" v-model="formPassword2" :focus="formPassword2Focus" />
            </view>
            <view v-if="formPassword2Focus" class="hint-desc error">{{ formPassword2Focus }}</view>
        </view>

        <button @tap="bindFormSubmit" class="btn-admin margin-top">提交修改</button>
    </view>
</template>

<script>
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
export default {
    data() {
        return {
            formOldPassword: '',
            formPassword: '',
            formPassword2: '',
            isAdmin: false,
            formOldPasswordFocus: [],
            formPasswordFocus: [],
            formPassword2Focus: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
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
        /**
         * 数据提交
         */
        bindFormSubmit: async function () {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let data = this;

            // 数据校验
            data = validate.check(data, AdminBiz.CHECK_FORM_MGR_PWD, this);
            if (!data) {
                return;
            }
            if (data.password != data.password2) {
                return pageHelper.showModal('两次输入的新密码不一致');
            }
            try {
                await cloudHelper.callCloudSumbit('admin/mgr_pwd', data).then((res) => {
                    let callback = () => {
                        uni.navigateBack();
                    };
                    pageHelper.showSuccToast('修改成功', 1500, callback);
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.log(err);
            }
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';
</style>
