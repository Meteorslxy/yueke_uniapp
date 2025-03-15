<template>
    <view>
        <view v-if="!isLoad" class="margin-top load loading text-l text-grey"></view>
        <view class="main-admin" v-if="isAdmin && isLoad">
            <Admin_news_form_tpl :data="this"></Admin_news_form_tpl>
        </view>
    </view>
</template>

<script>
import cmptImgUpload from '@/cmpts/public/img/img_upload_cmpt';
import cmptFormShow from '@/cmpts/public/form/form_show/form_show_cmpt';
import Admin_news_form_tpl from '../admin_news_form_tpl';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminNewsBiz = require('../../../../biz/admin_news_biz.js');
const projectSetting = require('../../../../public/project_setting.js');
export default {
    components: {
        cmptImgUpload,
        cmptFormShow,
        Admin_news_form_tpl
    },
    data() {
        return {
            isLoad: false,
            formContent: '',
            imgList: '',
            isAdmin: '',
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
            title: projectSetting.NEWS_NAME + '-添加'
        });
        this.setData(AdminNewsBiz.initFormData()); // 初始化表单数据
        this.setData({
            isLoad: true
        });
        this.setContentDescFun();
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
        setContentDescFun: function () {
            AdminBiz.setContentDesc(this);
        },

        model: function (e) {
            pageHelper.model(this, e);
        },

        /**
         * 数据提交
         */
        bindFormSubmit: async function () {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let data = this;
            if (this.formContent.length == 0) {
                return pageHelper.showModal('详细内容不能为空');
            }
            data = validate.check(data, AdminNewsBiz.CHECK_FORM, this);
            if (!data) {
                return;
            }
            let forms = this.zpSelectComponent('#cmpt-form').getForms(true);
            if (!forms) {
                return;
            }
            data.forms = forms;
            data.cateName = AdminNewsBiz.getCateName(data.cateId);
            try {
                if (this.imgList.length == 0) {
                    return pageHelper.showModal('请上传封面图');
                }

                // 提取简介
                data.desc = PublicBiz.getRichEditorDesc(data.desc, this.formContent);

                // 先创建，再上传
                let result = await cloudHelper.callCloudSumbit('admin/news_insert', data);
                let newsId = result.data.id;

                // 封面图片 提交处理
                uni.showLoading({
                    title: '提交中...',
                    mask: true
                });
                await cloudHelper.transCoverTempPics(this.imgList, 'news/', newsId, 'admin/news_update_pic');

                // 富文本
                let formContent = this.formContent;
                if (formContent && formContent.length > 0) {
                    uni.showLoading({
                        title: '提交中...',
                        mask: true
                    });
                    let content = await cloudHelper.transRichEditorTempPics(formContent, 'news/', newsId, 'admin/news_update_content');
                    this.setData({
                        formContent: content
                    });
                }
                await cloudHelper.transFormsTempPics(forms, 'news/', newsId, 'admin/news_update_forms');
                let callback = async function () {
                    PublicBiz.removeCacheList('admin-news-list');
                    PublicBiz.removeCacheList('news-list');
                    uni.navigateBack();
                };
                pageHelper.showSuccToast('添加成功', 2000, callback);
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.log(err);
            }
        },

        bindImgUploadCmpt: function (e) {
            this.setData({
                imgList: e.detail
            });
        },

        url: function (e) {
            pageHelper.url(e, this);
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';
</style>
