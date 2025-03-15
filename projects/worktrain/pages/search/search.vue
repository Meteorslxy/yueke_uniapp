<template>
    <view>
        <Search_tpl :data="this"></Search_tpl>
    </view>
</template>

<script>
import Search_tpl from '../../../../tpls/project/search_tpl';
const behavior = require('../../../../comm/behavior/search_bh.js');
const ProjectBiz = require('../../biz/project_biz.js');
const pageHelper = require('../../../../helper/page_helper.js');
export default {
    components: {
        Search_tpl
    },
    data() {
        return {
            this: []
        };
    },
    mixins: [behavior],
    onReady: function () {
        ProjectBiz.initPage(this);
        let curPage = pageHelper.getPrevPage(1);
        if (!curPage) {
            return;
        }
        if (curPage.options && curPage.options.source == 'admin') {
            uni.setNavigationBarColor({
                //管理端顶部
                backgroundColor: '#2499f2',
                frontColor: '#ffffff'
            });
        }
    },
    methods: {}
};
</script>
<style>
@import '../../style/skin.css';
@import '../../../../style/project/search_style.css';
.bg-project {
    color: #000 !important;
}
</style>
