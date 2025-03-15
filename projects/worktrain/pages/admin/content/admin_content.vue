<template>
    <view>
        <block v-if="isAdmin">
            <view class="main-admin">
                <view class="form-box shadow">
                    <view class="form-group" style="width: 100%">
                        <cmpt-editor :nodeList="formContent" :viewMode="true" style="width: 100%" id="contentEditor"></cmpt-editor>
                    </view>
                </view>
            </view>

            <view class="btn-bottom-admin">
                <view @tap="url" data-type="back" class="return">不保存,返回</view>
                <view @tap="bindSaveTap" class="save">保存</view>
            </view>
        </block>
    </view>
</template>

<script>
import cmptEditor from '@/cmpts/public/editor/editor_cmpt';
const AdminBiz = require('../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
export default {
    components: {
        cmptEditor
    },
    data() {
        return {
            formContent: [
                {
                    type: 'text',
                    val: ''
                }
            ],

            isAdmin: false
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
        }
        let parent = pageHelper.getPrevPage(2);
        if (!parent) {
            return;
        }
        let formContent = parent.data.formContent;
        if (formContent && formContent.length > 0) {
            this.setData({
                formContent
            });
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
    onPullDownRefresh: async function () {},
    methods: {
        model: function (e) {
            pageHelper.model(this, e);
        },

        url: function (e) {
            pageHelper.url(e, this);
        },

        bindSaveTap: function (e) {
            let formContent = this.zpSelectComponent('#contentEditor').getNodeList();
            let parent = pageHelper.getPrevPage(2);
            if (!parent) {
                return;
            }
            parent.setData(
                {
                    formContent
                },
                () => {
                    parent._setContentDesc();
                }
            );
            uni.navigateBack();
        }
    }
};
</script>
<style>
@import '../../../../../style/public/admin.css';

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

.oprt {
    display: flex;
    width: 100%;
    justify-content: space-around;
}

.oprt button {
    width: 45%;
}

.bottom-oprt {
    position: fixed;
    bottom: 0;
    height: 130rpx;
    background-color: #f8f8f8;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1rpx solid #ccc;
    z-index: 99999;
}
</style>
