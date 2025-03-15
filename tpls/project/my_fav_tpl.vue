<template>
    <view>
        <cmpt-comm-list
            type="my-fav"
            :search="search || ''"
            :_menus="sortMenus || []"
            :_items="sortItems || []"
            route="fav/my_list"
            :isTotalMenu="false"
            topBottom="120"
            placeholder="搜索标题"
            returnUrl="/pages/my/fav/my_fav"
            @list="myCommListListener"
        >
            <!-- List Begin -->
            <view class="text-pic-list-box">
                <view class="item shadow item-simple" @tap="url" :data-url="item.FAV_PATH" v-for="(item, index) in dataList.list" :key="index">
                    <view class="simple">
                        <view class="simple-right">
                            <view class="simple-title content-cut-one">{{ item.FAV_TITLE }}</view>
                            <view class="simple-desc">
                                <text class="text-grey text-bold">{{ item.FAV_TYPE }}</text>
                                <text class="margin-left-s">{{ item.FAV_ADD_TIME }}</text>
                                <button @tap.stop.prevent="bindDelTap" :data-oid="item.FAV_OID" class="margin-left btn mid bg-white text-red">
                                    <text class="icon-delete"></text>
                                    删除
                                </button>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- load begin -->

                <listLoadTpl compName="listLoadTpl" :data="{ skin: 'load-project', dataList }"></listLoadTpl>
                <!-- load end -->
            </view>
            <!-- List END -->
        </cmpt-comm-list>
    </view>
</template>

<script>
import listLoadTpl from '../../tpls/public/list_load_tpl.vue';
export default {
    components: {
        listLoadTpl
    },
    props: ['data', 'compName'],
    computed: {
        search() {
            return this.data.search;
        },
        sortMenus() {
            return this.data.sortMenus;
        },
        sortItems() {
            return this.data.sortItems;
        },
        item() {
            return this.data.item;
        },
        dataList() {
            return this.data.dataList;
        },
        index() {
            return this.data.index;
        },
        myCommListListener() {
            return this.data.myCommListListener;
        },
        url() {
            return this.data.url;
        },
        bindDelTap() {
            return this.data.bindDelTap;
        }
    }
};
</script>
<style></style>
