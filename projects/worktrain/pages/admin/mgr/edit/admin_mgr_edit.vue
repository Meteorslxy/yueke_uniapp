<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l text-admin"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l text-admin"></view>

        <view class="main-admin" v-if="isLoad && isAdmin">
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
            </view>

            <view class="form-box shadow">
                <view class="form-group text-orange">
                    <text class="icon-info">不修改密码则保持以下为空</text>
                </view>
                <view class="form-group">
                    <view class="title must">新密码</view>
                    <input maxlength="30" type="password" placeholder="请填写密码" v-model="formPassword" :focus="formPasswordFocus" />
                </view>
                <view v-if="formPasswordFocus" class="hint-desc error">{{ formPasswordFocus }}</view>
            </view>

            <button @tap="bindFormSubmit" class="btn-admin margin-top">确定修改</button>
        </view>
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
            isLoad: false,
            formName: '',
            formDesc: '',
            formPhone: '',
            formPassword: '',
            isAdmin: '',
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
        if (!pageHelper.getOptions(this, options)) {
            return;
        }
        this.loadDetailFun();
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
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: async function () {
        await this.loadDetailFun();
        uni.stopPullDownRefresh();
    },
    methods: {
        loadDetailFun: async function () {
            if (!AdminBiz.isAdmin(this, true)) {
                return;
            }
            let id = this.id;
            if (!id) {
                return;
            }
            let params = {
                id
            };
            let opt = {
                title: 'bar'
            };
            let mgr = await cloudHelper.callCloudData('admin/mgr_detail', params, opt);
            if (!mgr) {
                this.setData({
                    isLoad: null
                });
                return;
            }
            this.setData({
                isLoad: true,
                // 表单数据
                formName: mgr.ADMIN_NAME,
                formDesc: mgr.ADMIN_DESC,
                formPhone: mgr.ADMIN_PHONE,
                formPassword: ''
            });
        },

        /**
         * 数据提交
         */
        bindFormSubmit: async function () {
            if (!AdminBiz.isAdmin(this, true)) {
                return;
            }
            let data = this;

            // 数据校验
            data = validate.check(data, AdminBiz.CHECK_FORM_MGR_EDIT, this);
            if (!data) {
                return;
            }
            try {
                let adminId = this.id;
                data.id = adminId;
                await cloudHelper.callCloudSumbit('admin/mgr_edit', data).then((res) => {
                    let callback = () => {
                        // 更新列表页面数据
                        let node = {
                            ADMIN_NAME: data.name,
                            ADMIN_DESC: data.desc,
                            ADMIN_PHONE: data.phone
                        };
                        pageHelper.modifyPrevPageListNodeObject(adminId, node);
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
