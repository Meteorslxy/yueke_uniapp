<template>
    <view>
        <newsIndexTpl
            compName="newsIndexTpl"
            :data="{ showUp: false, upImg: '', dataList, isLoad, isLoad, _params, search: search || '', listMode: listMode || 'leftbig1', isTotalMenu: true, sortMenus, sortItems }"
        ></newsIndexTpl>

        <block v-if="skin.IS_SUB">
            <menuTpl compName="menuTpl" :data="{ curMenu: 'news_index', returnHome: false }"></menuTpl>
        </block>
    </view>
</template>

<script>
import newsIndexTpl from '../../../../../tpls/project/news_index_tpl';
import menuTpl from '../../tpls/menu_tpl';
let behavior = require('../../../../../comm/behavior/news_index_bh.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const NewsBiz = require('../../../biz/news_biz.js');
export default {
    components: {
        newsIndexTpl,
        menuTpl
    },
    data() {
        return {
            search: '',
            listMode: '',

            skin: {
                IS_SUB: ''
            }
        };
    },
    mixins: [behavior],
    onLoad: function (options) {
        ProjectBiz.initPage(this);
        this._setCate(NewsBiz.getCateList(), options, null);
    },
    methods: {}
};
</script>
<style>
@import '../../../../../style/public/comm_box_list.css';
@import '../../../style/skin.css';
</style>
