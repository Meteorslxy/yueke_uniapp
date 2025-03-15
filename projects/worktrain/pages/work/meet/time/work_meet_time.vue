<template>
    <view>
        <block v-if="isWork">
            <Admin_meet_time_form_tpl :data="this"></Admin_meet_time_form_tpl>
        </block>
    </view>
</template>
<script module="tools" lang="wxs" src="@/tpls/wxs/tools.wxs"></script>
<script>
import cmptPickerMulti from '@/cmpts/public/picker_multi/picker_multi_cmpt';
import cmptCalendar from '@/cmpts/public/calendar/calendar_meet/calendar_meet_cmpt';
import Admin_meet_time_form_tpl from '../../../admin/meet/time/admin_meet_time_form_tpl';
const WorkBiz = require('../../../../biz/work_biz.js');
const behavior = require('../../../admin/meet/time/admin_meet_time_bh.js');
export default {
    components: {
        cmptPickerMulti,
        cmptCalendar,
        Admin_meet_time_form_tpl
    },
    data() {
        return {
            oprt: 'work',
            isWork: false,
            this: []
        };
    },
    mixins: [behavior],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        if (!WorkBiz.isWork(this)) {
            return;
        }
        this._init();
    },
    methods: {}
};
</script>
<style>
@import '../../../admin/meet/time/admin_meet_time.css';
@import '../../../../style/work.css';

.time-oprt {
    color: var(--workColor);
}
</style>
