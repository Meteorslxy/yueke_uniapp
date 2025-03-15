<template>
    <view>
        <block v-if="isAdmin">
            <view class="main-admin">
                <Admin_meet_form_tpl :data="this"></Admin_meet_form_tpl>

                <button @tap="bindFormAddSubmit" class="btn-admin margin-top-l">创建</button>
            </view>
        </block>
    </view>
</template>

<script>
import cmptFormSet from '@/cmpts/public/form/form_set/form_set_cmpt';
import cmptFormShow from '@/cmpts/public/form/form_show/form_show_cmpt';
import cmptPickerTime from '@/cmpts/public/picker_time/picker_time_cmpt';
import cmptPickerMulti from '@/cmpts/public/picker_multi/picker_multi_cmpt';
import Admin_meet_form_tpl from '../add/admin_meet_form_tpl';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminMeetBiz = require('../../../../biz/admin_meet_biz.js');
const projectSetting = require('../../../../public/project_setting.js');
export default {
    components: {
        cmptFormSet,
        cmptFormShow,
        cmptPickerTime,
        cmptPickerMulti,
        Admin_meet_form_tpl
    },
    data() {
        return {
            isLoad: true,
            formJoinForms: '',
            isAdmin: false,
            this: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
        }
        uni.setNavigationBarTitle({
            title: projectSetting.MEET_NAME + '-添加'
        });
        this.setData(await AdminMeetBiz.initFormData()); // 初始化表单数据
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
        uni.stopPullDownRefresh();
    },
    methods: {
        bindJoinFormsCmpt: function (e) {
            this.setData({
                formJoinForms: e.detail
            });
        },

        bindFormAddSubmit: async function () {
            pageHelper.formClearFocus(this);
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let data = this;
            if (data.formDaysSet.length <= 0) {
                pageHelper.anchor('formDaysSet', this);
                return pageHelper.formHint(this, 'formDaysSet', '请配置「可预约时段」');
            }
            if (data.formJoinForms.length <= 0) {
                return pageHelper.showModal('请至少设置一项「用户填写资料」');
            }
            data = validate.check(data, AdminMeetBiz.CHECK_FORM, this);
            if (!data) {
                return;
            }
            if (data.password.length == 0) {
                pageHelper.anchor('formPassword', this);
                return pageHelper.formHint(this, 'formPassword', '请设置登录密码');
            }
            let forms = this.zpSelectComponent('#cmpt-form').getForms(true);
            if (!forms) {
                return;
            }
            data.forms = forms;
            data.cateName = AdminMeetBiz.getCateName(data.cateId);
            try {
                // 先创建，再上传
                let result = await cloudHelper.callCloudSumbit('admin/meet_insert', data);
                let meetId = result.data.id;

                // 图片
                await cloudHelper.transFormsTempPics(forms, 'meet/', meetId, 'admin/meet_update_forms');
                let callback = async function () {
                    PublicBiz.removeCacheList('admin-meet');
                    PublicBiz.removeCacheList('meet-list');
                    uni.navigateBack();
                };
                pageHelper.showSuccToast('添加成功', 2000, callback);
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.log(err);
            }
        },

        url: function (e) {
            pageHelper.url(e, this);
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';

.main-admin {
    padding: 20rpx 0rpx;
}

.form-box {
    border-radius: 0;
}

.modal-rules {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.modal-rules .padding-xl {
    padding: 0;
}

.modal-rules .item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 2rpx solid #ddd;
    padding: 20rpx 0;
    position: relative;
}

.modal-rules .item.cur {
    background-color: #f2f2f2;
    font-weight: bold;
}

.modal-rules .item.cur .icon-right {
    color: var(--adminColor) !important;
}

.modal-rules .item .icon-right {
    right: 10rpx;
    position: absolute;
    top: 50rpx;
}

.modal-rules .item.item-last {
    border-bottom: 0;
}

.modal-rules .item .title {
    font-size: 36rpx;
    color: #111;
}

.modal-rules .item .desc {
    font-size: 28rpx;
    color: #777;
    margin-top: 10rpx;
}

cmpt-picker-multi {
    flex: 1;
}

.form-group .desc-textarea {
    height: 100rpx;
}
</style>
