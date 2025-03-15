<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l text-grey"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l text-grey"></view>

        <block v-if="isWork">
            <Admin_meet_temp_tpl :data="this"></Admin_meet_temp_tpl>
        </block>
    </view>
</template>

<script>
import Admin_meet_temp_tpl from '../../../admin/meet/temp/admin_meet_temp_tpl';
const WorkBiz = require('../../../../biz/work_biz.js');
const behavior = require('../../../admin/meet/temp/admin_meet_temp_bh.js');
export default {
    components: {
        Admin_meet_temp_tpl
    },
    data() {
        return {
            oprt: 'work',
            isLoad: '',
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
        this.setData({
            oprt: 'work'
        });
        await this._loadList();
    },
    methods: {}
};
</script>
<style>
@import '../../../admin/meet/temp/admin_meet_temp.css';
@import '../../../../style/work.css';
</style>
