<template>
    <view>
        <My_fav_tpl :data="this"></My_fav_tpl>
    </view>
</template>

<script>
import My_fav_tpl from '../../../../../tpls/project/my_fav_tpl';
const behavior = require('../../../../../comm/behavior/my_fav_bh.js');
const ProjectBiz = require('../../../biz/project_biz.js');
export default {
    components: {
        My_fav_tpl
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
@import '../../../../../style/project/my_fav_style.css';
</style>
