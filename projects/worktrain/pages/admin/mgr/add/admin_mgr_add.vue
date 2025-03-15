<template>
    <view class="main-admin" v-if="isAdmin">
        <!-- edit form begin -->
        <view class="form-box shadow">
            <view class="form-group">
                <view class="title must">登录账号</view>
                <input maxlength="30" placeholder="请填写登录账号" placeholder-class="phc" v-model="formName" :focus="formNameFocus" />
            </view>
            <view v-if="formNameFocus" class="hint-desc error">{{ formNameFocus }}</view>

            <view class="form-group">
                <view class="title must">姓名</view>
                <input maxlength="30" placeholder="请填写管理员姓名" v-model="formDesc" :focus="formDescFocus" />
            </view>
            <view v-if="formDescFocus" class="hint-desc error">{{ formDescFocus }}</view>

            <view class="form-group">
                <view class="title">*手机</view>
                <input maxlength="11" placeholder="请填写手机号码" v-model="formPhone" :focus="formPhoneFocus" />
            </view>
            <view v-if="formPhoneFocus" class="hint-desc error">{{ formPhoneFocus }}</view>

            <view class="form-group">
                <view class="title must">密码</view>
                <input maxlength="30" type="password" placeholder="请填写密码" v-model="formPassword" :focus="formPasswordFocus" />
            </view>
            <view v-if="formPasswordFocus" class="hint-desc error">{{ formPasswordFocus }}</view>
        </view>

        <button @tap="bindFormSubmit" class="btn-admin margin-top">确定添加</button>
    </view>
</template>

<script>
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
export default {
    data() {
        return {
            formName: '',
            formDesc: '',
            formPhone: '',
            formPassword: '',
            isAdmin: false,
            formNameFocus: [],
            formDescFocus: [],
            formPhoneFocus: [],
            formPasswordFocus: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        if (!AdminBiz.isAdmin(this, true)) {
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
            if (!AdminBiz.isAdmin(this, true)) {
                return;
            }
            let data = this;

            // 数据校验
            data = validate.check(data, AdminBiz.CHECK_FORM_MGR_ADD, this);
            if (!data) {
                return;
            }
            try {
                let adminId = this.id;
                data.id = adminId;
                await cloudHelper.callCloudSumbit('admin/mgr_insert', data).then((res) => {
                    let callback = async function () {
                        PublicBiz.removeCacheList('admin-mgr');
                        uni.navigateBack();
                    };
                    pageHelper.showSuccToast('添加成功', 1500, callback);
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
