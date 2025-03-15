<template>
    <view>
        <view v-if="!isLoad" class="margin-top load loading text-l text-admin"></view>

        <view class="main-admin" v-if="isAdmin && isLoad">
            <Admin_meet_scan_tpl :data="this"></Admin_meet_scan_tpl>
        </view>
    </view>
</template>

<script>
import cmptPickerTime from '@/cmpts/public/picker_time/picker_time_cmpt';
import Admin_meet_scan_tpl from './admin_meet_scan_tpl';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const behavior = require('./admin_meet_scan_bh.js');
export default {
    components: {
        cmptPickerTime,
        Admin_meet_scan_tpl
    },
    data() {
        return {
            title: '',
            isLoad: '',
            isAdmin: '',
            this: []
        };
    },
    mixins: [behavior],
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
    },
    methods: {}
};
</script>
<style>
@import '../../../../../../style/public/admin.css';

.form-box .checkin {
    width: 100%;
    padding: 40rpx 40rpx 80rpx;
    padding-bottom: 150rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.form-box .checkin .notice {
    width: 100%;
    font-size: 46rpx;
    text-align: center;
    color: #000;
    margin-bottom: 30rpx;
}

.form-box .checkin .desc {
    width: 100%;
    font-size: 32rpx;
    text-align: center;
    color: #666;
}

.form-box .checkin .oprt {
    width: 600rpx;
    margin-top: 40rpx;
    text-align: center;
    font-size: 34rpx;
    color: var(--adminColor);
    border: 2rpx solid var(--adminColor);
    padding: 30rpx 20rpx;
}
</style>
