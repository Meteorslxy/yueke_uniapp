<template>
    <view>
        <view v-if="id && isLoad === null" class="margin-top load notexist text-l text-grey"></view>
        <view v-if="id && isLoad === false" class="margin-top load loading text-l text-grey"></view>
        <block v-if="isWork && isLoad">
            <view class="main-work">
                <Admin_meet_form_tpl :data="this"></Admin_meet_form_tpl>

                <button @tap="bindFormEditSubmit" class="btn-work margin-top-l">保存</button>
            </view>
        </block>
    </view>
</template>

<script>
import cmptFormSet from '@/cmpts/public/form/form_set/form_set_cmpt';
import cmptFormShow from '@/cmpts/public/form/form_show/form_show_cmpt';
import cmptPickerTime from '@/cmpts/public/picker_time/picker_time_cmpt';
import cmptPickerMulti from '@/cmpts/public/picker_multi/picker_multi_cmpt';
import Admin_meet_form_tpl from '../../../admin/meet/add/admin_meet_form_tpl';
const WorkBiz = require('../../../../biz/work_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminMeetBiz = require('../../../../biz/admin_meet_biz.js');
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
            isLoad: false,
            id: '',
            formTitle: '',
            formCateId: '',
            formOrder: '',
            formCancelSet: '',
            formPhone: '',
            formForms: '',
            formDaysSet: '',
            formJoinForms: '',
            isWork: '',
            this: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        if (!WorkBiz.isWork(this)) {
            return;
        }
        this.setData({
            id: WorkBiz.getWorkId()
        });
        this.setData(await AdminMeetBiz.initFormData()); // 初始化表单数据

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
    methods: {
        loadDetailFun: async function () {
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
            let meet = await cloudHelper.callCloudData('work/meet_detail', params, opt);
            if (!meet) {
                this.setData({
                    isLoad: null
                });
                return;
            }
            this.setData({
                isLoad: true,
                // 表单数据
                formTitle: meet.MEET_TITLE,
                formCateId: meet.MEET_CATE_ID,
                formOrder: meet.MEET_ORDER,
                formCancelSet: meet.MEET_CANCEL_SET,
                formPhone: meet.MEET_PHONE,
                formForms: meet.MEET_FORMS,
                formDaysSet: meet.MEET_DAYS_SET,
                formJoinForms: meet.MEET_JOIN_FORMS
            });
        },

        bindJoinFormsCmpt: function (e) {
            this.setData({
                formJoinForms: e.detail
            });
        },

        bindFormEditSubmit: async function () {
            pageHelper.formClearFocus(this);
            if (!WorkBiz.isWork(this)) {
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
            let forms = this.zpSelectComponent('#cmpt-form').getForms(true);
            if (!forms) {
                return;
            }
            data.forms = forms;
            data.cateName = AdminMeetBiz.getCateName(data.cateId);
            try {
                let meetId = this.id;
                data.id = meetId;

                // 先修改，再上传
                await cloudHelper.callCloudSumbit('work/meet_edit', data);

                // 图片
                await cloudHelper.transFormsTempPics(forms, 'meet/', meetId, 'work/meet_update_forms');
                let callback = async function () {
                    uni.navigateBack();
                };
                pageHelper.showSuccToast('编辑成功', 2000, callback);
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
@import '../../../../style/work.css';
</style>
