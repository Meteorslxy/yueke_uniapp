<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l text-grey"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l text-grey"></view>

        <block v-if="isWork && isLoad">
            <Admin_meet_join_tpl :data="this"></Admin_meet_join_tpl>
        </block>
    </view>
</template>

<script>
import Admin_meet_join_tpl from '../../../admin/meet/join/admin_meet_join_tpl';
const WorkBiz = require('../../../../biz/work_biz.js');
const behavior = require('../../../admin/meet/join/admin_meet_join_bh.js');
export default {
    components: {
        Admin_meet_join_tpl
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
        this._init(options);
    },
    methods: {}
};
</script>
<style>
@import '../../../admin/meet/join/admin_meet_join.css';
@import '../../../../style/work.css';
</style>
