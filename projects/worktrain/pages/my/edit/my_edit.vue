<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l load-project"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l load-project"></view>

        <view v-if="isLoad" class="main padding-project">
            <User_form :data="this"></User_form>
            <button @tap="bindSubmitTap" class="btn-base btn-project shadow">修改资料</button>
        </view>
    </view>
</template>

<script>
import cmptFormShow from '@/cmpts/public/form/form_show/form_show_cmpt';
import User_form from './user_form';
const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const validate = require('../../../../../helper/validate.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const projectSetting = require('../../../public/project_setting.js');
const setting = require('../../../../../setting/setting.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
export default {
    components: {
        cmptFormShow,
        User_form
    },
    data() {
        return {
            isLoad: false,
            isEdit: true,
            userRegCheck: projectSetting.USER_REG_CHECK,
            mobileCheck: setting.MOBILE_CHECK,
            user: '',
            fields: '',
            formName: '',
            formMobile: '',
            formForms: '',
            this: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        ProjectBiz.initPage(this);
        await this.loadDetailFun();
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
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    methods: {
        loadDetailFun: async function (e) {
            let opts = {
                title: 'bar'
            };
            let user = await cloudHelper.callCloudData('passport/my_detail', {}, opts);
            if (!user) {
                return uni.redirectTo({
                    url: '../reg/my_reg'
                });
            }
            this.setData({
                isLoad: true,
                isEdit: true,
                user,
                fields: projectSetting.USER_FIELDS,
                formName: user.USER_NAME,
                formMobile: user.USER_MOBILE,
                formForms: user.USER_FORMS
            });
        },

        bindGetPhoneNumber: async function (e) {
            await PassportBiz.getPhone(e, this);
        },

        bindSubmitTap: async function (e) {
            try {
                let data = this;
                // 数据校验
                data = validate.check(data, PassportBiz.CHECK_FORM, this);
                if (!data) {
                    return;
                }
                let forms = this.zpSelectComponent('#cmpt-form').getForms(true);
                if (!forms) {
                    return;
                }
                data.forms = forms;
                let opts = {
                    title: '提交中'
                };
                await cloudHelper.callCloudSumbit('passport/edit_base', data, opts).then((res) => {
                    let callback = () => {
                        uni.reLaunch({
                            url: '../index/my_index'
                        });
                    };
                    pageHelper.showSuccToast('修改成功', 1500, callback);
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.error(err);
            }
        }
    }
};
</script>
<style>
@import '../../../style/skin.css';
.submit-line {
    width: 100%;
}

.form-group .mobile {
    flex: 1;
    text-align: left;
}

.submit-line {
    width: 100%;
}

.form-group .mobile {
    flex: 1;
    text-align: left;
}
</style>
