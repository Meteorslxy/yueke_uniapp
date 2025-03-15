<template>
    <view>
        <view v-if="!isLoad" class="margin-top load loading text-l text-grey"></view>

        <block v-if="isAdmin && isLoad">
            <view class="main-admin">
                <view class="form-box shadow">
                    <view class="form-group" style="width: 100%">
                        <cmpt-editor :nodeList="formContent" :viewMode="true" style="width: 100%" id="contentEditor"></cmpt-editor>
                    </view>
                </view>
            </view>
            <view class="btn-bottom-admin">
                <view @tap="bindFormSubmit" class="save">保存修改</view>
            </view>
        </block>
    </view>
</template>

<script>
import cmptEditor from '@/cmpts/public/editor/editor_cmpt';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');
export default {
    components: {
        cmptEditor
    },
    data() {
        return {
            isLoad: false,
            key: '',
            formContent: '',
            isAdmin: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
        }
        if (options && options.key) {
            let key = options.key;
            for (let k = 0; k < projectSetting.SETUP_CONTENT_ITEMS.length; k++) {
                let item = projectSetting.SETUP_CONTENT_ITEMS[k];
                if (item.key == key) {
                    this.loadDetailFun(item);
                    uni.setNavigationBarTitle({
                        title: '编辑' + item.title
                    });
                    this.setData({
                        key: item.key
                    });
                    break;
                }
            }
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
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: async function () {
        await this.loadDetailFun();
        uni.stopPullDownRefresh();
    },
    methods: {
        loadDetailFun: async function (item) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let opts = {
                title: 'bar'
            };
            let params = {
                key: item.key
            };
            try {
                await cloudHelper.callCloudSumbit('home/setup_get', params, opts).then((res) => {
                    let formContent = [
                        {
                            type: 'text',
                            val: item.title
                        }
                    ];
                    let content = res.data;
                    if (content && Array.isArray(content)) {
                        formContent = content;
                    }
                    this.setData({
                        isLoad: true,
                        // 表单数据
                        formContent
                    });
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.log(err);
            }
        },

        /**
         * 数据提交
         */
        bindFormSubmit: async function () {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let formContent = this.zpSelectComponent('#contentEditor').getNodeList();
            await cloudHelper.transRichEditorTempPics(formContent, 'setup/', this.key, 'admin/setup_set_content');
            let callback = () => {
                uni.navigateBack();
            };
            pageHelper.showSuccToast('修改成功', 1500, callback);
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';

.main-admin {
    width: 100%;
    box-sizing: border-box;
    padding: 30rpx 20rpx;
    padding-bottom: 200rpx;
}

.form-group {
    padding: 1rpx 1rpx;
    overflow: hidden;
}

.btn-bottom-admin > view {
    width: 100%;
}
</style>
