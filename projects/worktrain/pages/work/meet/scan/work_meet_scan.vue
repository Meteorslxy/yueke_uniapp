<template>
    <view>
        <view v-if="!isLoad" class="margin-top load loading text-l text-admin"></view>

        <view class="main-work" v-if="isWork && isLoad">
            <Admin_meet_scan_tpl :data="this"></Admin_meet_scan_tpl>
        </view>
    </view>
</template>

<script>
import cmptPickerTime from '@/cmpts/public/picker_time/picker_time_cmpt';
import Admin_meet_scan_tpl from '../../../admin/meet/scan/admin_meet_scan_tpl';
const WorkBiz = require('../../../../biz/work_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const behavior = require('../../../admin/meet/scan/admin_meet_scan_bh.js');
export default {
    components: {
        cmptPickerTime,
        Admin_meet_scan_tpl
    },
    data() {
        return {
            oprt: 'work',
            isLoad: '',
            isWork: '',
            this: []
        };
    },
    mixins: [behavior],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!WorkBiz.isWork(this)) {
            return;
        }
        if (!pageHelper.getOptions(this, options, 'meetId')) {
            return;
        }
    },
    methods: {}
};
</script>
<style>
@import '../../../admin/meet/scan/admin_meet_scan.css';
@import '../../../../style/work.css';
</style>
