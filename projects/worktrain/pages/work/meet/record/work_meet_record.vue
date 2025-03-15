<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l text-grey"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l text-grey"></view>

        <block v-if="isWork && isLoad">
            <Admin_meet_record_tpl :data="this"></Admin_meet_record_tpl>
        </block>
    </view>
</template>

<script>
import cmptPickerTime from '@/cmpts/public/picker_time/picker_time_cmpt';
import Admin_meet_record_tpl from '../../../admin/meet/record/admin_meet_record_tpl';
const WorkBiz = require('../../../../biz/work_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const behavior = require('../../../admin/meet/record/admin_meet_record_bh.js');
export default {
    components: {
        cmptPickerTime,
        Admin_meet_record_tpl
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
    onLoad: async function (options) {
        if (!pageHelper.getOptions(this, options, 'meetId')) {
            return;
        }
        if (!WorkBiz.isWork(this)) {
            return;
        }
        this._init(options);
    },
    methods: {}
};
</script>
<style>
@import '../../../admin/meet/record/admin_meet_record.css';
@import '../../../../style/work.css';

.main-work {
    width: 100%;
    box-sizing: border-box;
    padding: 0rpx 0rpx 30rpx;
}

.table .table-form .oprt .min-btn {
    padding: 5rpx 30rpx;
}
</style>
