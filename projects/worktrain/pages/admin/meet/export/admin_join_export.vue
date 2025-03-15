<template>
    <view>
        <view v-if="!isLoad" class="margin-top load loading text-l text-grey"></view>

        <view class="main-admin" v-if="isAdmin && isLoad">
            <view class="form-box shadow">
                <view class="form-group">
                    <view class="title text-cut">{{ title }}</view>
                </view>
                <view class="form-group arrow">
                    <view class="title must">起始日期</view>
                    <cmpt-picker-time
                        mark="startDay"
                        mode="day"
                        @select="urlFun($event, { type: 'picker', item: 'startDay' })"
                        data-type="picker"
                        data-item="startDay"
                        startYear="2021"
                        endYear="2025"
                        :item="startDay"
                    >
                        <view class="form-text">{{ startDay || '请选择' }}</view>
                    </cmpt-picker-time>
                </view>

                <view class="form-group arrow">
                    <view class="title must">终止日期</view>
                    <cmpt-picker-time
                        mark="endDay"
                        mode="day"
                        @select="urlFun($event, { type: 'picker', item: 'endDay' })"
                        data-type="picker"
                        data-item="endDay"
                        startYear="2021"
                        endYear="2025"
                        :item="endDay"
                    >
                        <view class="form-text">{{ endDay || '请选择' }}</view>
                    </cmpt-picker-time>
                </view>

                <view class="form-group">
                    <view class="title must">数据类型</view>
                    <cmpt-picker mark="status" style="flex: 1" :item.sync="status" sourceDataStr="1=预约成功名单,10=用户已取消名单,99=系统取消名单,999=所有名单" />
                </view>
            </view>

            <view class="form-box shadow margin-top-xs">
                <view class="form-group">
                    <view class="title" style="font-size: 30rpx">
                        数据下载链接
                        <text v-if="time" class="text-gray text-s margin-left-s">({{ time }} 生成)</text>
                    </view>

                    <button hover-class="button-hover" class="btn bg-admin text-white shadow" @tap="urlFun" data-type="copy" :data-url="url">复制</button>
                </view>
                <view class="form-group align-start" @tap="urlFun" data-type="copy" :data-url="url">
                    <textarea maxlength="500" placeholder="数据文件尚未生成，点击下方按钮生成" placeholder-class="phc" :value="url" style="height: 50rpx"></textarea>
                </view>

                <block v-if="url">
                    <view class="form-group" style="padding: 20rpx 15rpx 20rpx">
                        <view class="title-desc">
                            <text :user-select="true">
                                ※
                                <text class="text-black">链接使用说明</text>
                                1. 复制以上链接地址，建议在电脑浏览器中打开链接下载数据文件 2. 为保障信息安全，请勿外传数据链接 3.
                                为了防止隐私数据泄露，请在下载后及时点击下方按钮删除
                            </text>
                        </view>
                    </view>
                </block>
            </view>

            <button @tap="bindExportTap" class="btn-admin margin-top">{{ url ? '重新生成名单数据' : '生成名单数据' }} (Excel文件)</button>

            <button v-if="url" @tap="bindOpenTap" class="btn-admin bg-purple light">直接打开数据文件</button>

            <button v-if="url" @tap="bindDelTap" class="btn-admin bg-orange light">删除数据文件</button>

            <view class="form-group" v-if="url">
                <view class="title-desc text-red">
                    <text class="icon-info margin-right-xs"></text>
                    为了防止隐私数据泄露，请在下载上述文件后及时点击按钮删除
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import cmptPickerTime from '@/cmpts/public/picker_time/picker_time_cmpt';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const timeHelper = require('../../../../../../helper/time_helper.js');
const fileHelper = require('../../../../../../helper/file_helper.js');
export default {
    components: {
        cmptPickerTime
    },
    data() {
        return {
            title: '',
            url: '',
            time: '',
            startDay: timeHelper.time('Y-M-D'),
            endDay: timeHelper.time('Y-M-D'),
            status: 1,
            isLoad: false,
            isAdmin: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
        }
        if (!pageHelper.getOptions(this, options, 'meetId')) {
            return;
        }
        if (options && options.title) {
            let title = decodeURIComponent(options.title);
            this.setData({
                title
            });
        }
        this.loadDetailFun(1);
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
        await this.loadDetailFun(1);
        uni.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    methods: {
        loadDetailFun: async function (isDel) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let params = {
                isDel
            };
            let options = {
                title: 'bar'
            };
            let data = await cloudHelper.callCloudData('admin/join_data_get', params, options);
            if (!data) {
                return;
            }
            this.setData({
                isLoad: true,
                url: data.url,
                time: data.time
            });
        },

        bindOpenTap: function (e) {
            fileHelper.openDoc('预约名单', this.url);
        },

        urlFun: async function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            pageHelper.url(e, this);
        },

        bindExportTap: async function (e) {
            try {
                let options = {
                    title: '数据生成中'
                };
                let params = {
                    meetId: this.meetId,
                    startDay: this.startDay,
                    endDay: this.endDay,
                    status: this.status
                };
                await cloudHelper.callCloudData('admin/join_data_export', params, options).then((res) => {
                    this.loadDetailFun(0);
                    pageHelper.showModal('数据文件生成成功(' + res.total + '条记录), 请点击「直接打开」按钮或者复制文件地址下载');
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.log(err);
                pageHelper.showNoneToast('导出失败，请重试');
            }
        },

        bindDelTap: async function (e) {
            try {
                let options = {
                    title: '数据删除中'
                };
                await cloudHelper.callCloudData('admin/join_data_del', {}, options).then((res) => {
                    this.setData({
                        url: '',
                        time: ''
                    });
                    pageHelper.showSuccToast('删除成功');
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.log(err);
                pageHelper.showNoneToast('删除失败，请重试');
            }
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';

.form-box .title-desc {
    padding-bottom: 10rpx;
    border: 0;
    font-size: 29rpx;
    color: #888;
}

.btn-admin {
    margin-bottom: 20rpx;
}
</style>
