<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l load-project"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l load-project"></view>

        <view v-if="isLoad" class="main padding-project">
            <User_form :data="this"></User_form>
            <button @tap="bindSubmitTap" class="btn-base btn-project shadow">提交注册</button>
        </view>
    </view>
</template>

<script>
import cmptFormShow from '@/cmpts/public/form/form_show/form_show_cmpt';
import User_form from '../edit/user_form';
const pageHelper = require('../../../../../helper/page_helper.js');
const helper = require('../../../../../helper/helper.js');
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
            isEdit: false,
            mobileCheck: setting.MOBILE_CHECK,
            fields: '',
            formName: '',
            formMobile: '',
            formForms: [],
            this: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        ProjectBiz.initPage(this);
        if (options && options.retUrl) {
            this.retUrl = decodeURIComponent(options.retUrl);
        }
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
    onPullDownRefresh: async function () {},
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
            if (user) {
                return uni.redirectTo({
                    url: '../index/my_index'
                });
            }
            this.setData({
                isLoad: true,
                fields: projectSetting.USER_FIELDS,
                formName: '',
                formMobile: '',
                formForms: []
            });
        },

        bindGetPhoneNumber: async function (e) {
            PassportBiz.getPhone(e, this);
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
                data.status = projectSetting.USER_REG_CHECK ? 0 : 1;
                let opts = {
                    title: '提交中'
                };
                await cloudHelper.callCloudSumbit('passport/register', data, opts).then((result) => {
                    if (result && helper.isDefined(result.data.token) && result.data.token) {
                        // 用户需要审核，不能登录
                        if (!projectSetting.USER_REG_CHECK) {
                            PassportBiz.setToken(result.data.token);
                        }
                        let callback = () => {
                            if (this.retUrl == 'back') uni.navigateBack();
                            else if (this.retUrl) {
                                uni.redirectTo({
                                    url: this.retUrl
                                });
                            } else {
                                uni.reLaunch({
                                    url: '../index/my_index'
                                });
                            }
                        };
                        if (projectSetting.USER_REG_CHECK) {
                            pageHelper.showModal('注册完成，等待系统审核', '温馨提示', callback);
                        } else {
                            pageHelper.showSuccToast('注册成功', 1500, callback);
                        }
                    }
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
    font-size: 28rpx;
}
</style>
