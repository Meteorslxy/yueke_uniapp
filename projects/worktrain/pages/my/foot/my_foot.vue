<template>
    <view>
        <My_foot_tpl :data="this"></My_foot_tpl>
    </view>
</template>

<script>
import My_foot_tpl from '../../../../../tpls/project/my_foot_tpl';
const behavior = require('../../../../../comm/behavior/my_foot_bh.js');
const ProjectBiz = require('../../../biz/project_biz.js');
export default {
    components: {
        My_foot_tpl
    },
    data() {
        return {
            this: []
        };
    },
    mixins: [behavior],
    onReady: function () {
        ProjectBiz.initPage(this);
    },
    methods: {}
};
</script>
<style>
@import '../../../../../style/public/article_list.css';
@import '../../../style/skin.css';
@import '../../../../../style/project/my_foot_style.css';
</style>
