<template>
    <view>
        <view class="main-admin">
            <view class="form-box shadow">
                <view class="form-group" style="width: 100%">
                    <cmpt-editor :nodeList="formContent" :upDirectDir="upDirectDir" :viewMode="true" style="width: 100%" id="contentEditor"></cmpt-editor>
                </view>
            </view>
        </view>

        <view class="btn-bottom-admin">
            <view @tap="url" data-type="back" class="return">不保存,返回</view>
            <view @tap="bindSaveTap" class="save">保存</view>
        </view>
    </view>
</template>

<script>
import cmptEditor from '@/cmpts/public/editor/editor_cmpt';
const pageHelper = require('../../../../../helper/page_helper.js');
const helper = require('../../../../../helper/helper.js');
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
            cmptId: '',
            // 父页面editor或者rows控件id
            cmptFormName: '',
            // 父页面show-content对应表单的名字或者索引

            cmptParentId: '',
            //父页面包含rows控件的控件id

            upDirectDir: '' //直接上传的目录
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let parent = pageHelper.getPrevPage(2);
        if (!parent) {
            return;
        }
        if (!options) {
            return;
        }
        if (!helper.isDefined(options.cmptId) || !helper.isDefined(options.cmptFormName)) {
            return;
        }
        let cmptId = '#' + options.cmptId;
        let cmptFormName = options.cmptFormName;

        // 父父页面控件id
        let cmptParentId = '';
        if (options.cmptParentId) {
            cmptParentId = '#' + options.cmptParentId;
        }
        let formContent = [];
        if (!cmptParentId) {
            formContent = parent.zpSelectComponent(cmptId).getOneFormVal(cmptFormName);
        } else {
            formContent = parent.selectComponent(cmptParentId).zpSelectComponent(cmptId).getOneFormVal(cmptFormName);
        }
        if (formContent.length == 0) {
            formContent = [
                {
                    type: 'text',
                    val: ''
                }
            ];
        }
        this.setData({
            cmptId,
            cmptFormName,
            cmptParentId,
            formContent
        });

        // 直接上传 与IS_DEMO结合使用
        if (options.upDirectDir) {
            this.setData({
                upDirectDir: options.upDirectDir
            });
        }
        let curPage = pageHelper.getPrevPage(1);
        if (!curPage) {
            return;
        }
        if (curPage.options && curPage.options.source == 'admin') {
            uni.setNavigationBarColor({
                //管理端顶部
                backgroundColor: '#2499f2',
                frontColor: '#ffffff'
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
            // 获取富文本，如果没填写则为[]
            let formContent = this.zpSelectComponent('#contentEditor').getNodeList();
            let parent = pageHelper.getPrevPage(2);
            if (!parent) {
                return;
            }
            if (!this.cmptParentId) {
                parent.zpSelectComponent(this.cmptId).setOneFormVal(this.cmptFormName, formContent);
            } else {
                parent.selectComponent(this.cmptParentId).zpSelectComponent(this.cmptId).setOneFormVal(this.cmptFormName, formContent);
            }
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
