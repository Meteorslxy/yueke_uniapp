<template>
    <view>
        <About_tpl :data="this"></About_tpl>
    </view>
</template>

<script>
import About_tpl from '../../../../../tpls/project/about_tpl';
const behavior = require('../../../../../comm/behavior/about_bh.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const projectSetting = require('../../../public/project_setting.js');
export default {
    components: {
        About_tpl
    },
    data() {
        return {
            this: []
        };
    },
    mixins: [behavior],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        ProjectBiz.initPage(this);
        if (options && options.key) {
            this._loadDetail(options.key, projectSetting.SETUP_CONTENT_ITEMS);
        } else {
            this._loadDetail('SETUP_CONTENT_ABOUT', projectSetting.SETUP_CONTENT_ITEMS);
        }
    },
    methods: {}
};
</script>
<style>
@import '../../../../../style/public/detail.css';
@import '../../../style/skin.css';
</style>
