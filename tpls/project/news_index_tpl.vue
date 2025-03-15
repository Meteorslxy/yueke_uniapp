<template>
    <view>
        ﻿
        <template v-if="compName === 'newsIndexTpl'">
            <view v-if="!isLoad" class="margin-top load loading text-l load-project"></view>

            <block v-else>
                <cmpt-comm-list
                    type="news-list"
                    :search="search || ''"
                    :_params="_params"
                    :_menus="sortMenus"
                    :_items="sortItems"
                    :isTotalMenu="isTotalMenu"
                    route="news/list"
                    topBottom="120"
                    placeholder="搜索标题"
                    @list="bindCommListCmpt"
                >
                    <view class="up-project" v-if="showUp">
                        <image v-if="upImg" mode="widthFix" lazy-load :src="upImg" />
                    </view>

                    <!-- List Begin -->

                    <baseListTpl compName="baseListTpl" :data="{ dataList: dataList.list, listMode }"></baseListTpl>
                    <!-- List END -->

                    <!-- load begin -->

                    <listLoadTpl compName="listLoadTpl" :data="{ skin: 'load-project', dataList }"></listLoadTpl>
                    <!-- load end -->
                </cmpt-comm-list>
            </block>
        </template>
    </view>
</template>

<script>
import baseListTpl from '../../tpls/public/base_list_tpl.vue';
import listLoadTpl from '../../tpls/public/list_load_tpl.vue';
export default {
    components: {
        baseListTpl,
        listLoadTpl
    },
    props: ['data', 'compName'],
    computed: {
        isLoad() {
            return this.data.isLoad;
        },
        search() {
            return this.data.search;
        },
        _params() {
            return this.data._params;
        },
        sortMenus() {
            return this.data.sortMenus;
        },
        sortItems() {
            return this.data.sortItems;
        },
        isTotalMenu() {
            return this.data.isTotalMenu;
        },
        showUp() {
            return this.data.showUp;
        },
        upImg() {
            return this.data.upImg;
        },
        dataList() {
            return this.data.dataList;
        },
        bindCommListCmpt() {
            return this.data.bindCommListCmpt;
        }
    }
};
</script>
<style></style>
