<template>
    <view class="main main-search">
        <view class="bar search bg-white">
            <view class="search-form round">
                <text class="icon-search"></text>
                <input type="text" v-model="search" placeholder="请输入搜索内容" confirm-type="search" @confirm="bindSearchConfirm" maxlength="20" />
                <text v-if="search.length > 0" @tap="bindClearKeyTap" class="icon-roundclosefill text-l text-gray clear"></text>
            </view>
            <view class="action">
                <button @tap="url" data-type="back" :class="'btn ' + (source == 'admin' ? 'bg-admin' : 'bg-project') + ' text-white shadow-blur round'">返回</button>
            </view>
        </view>

        <view class="his">
            <view class="title">
                <view class="tit">历史记录</view>
                <text @tap="bindDelHisTap" class="del text-small icon-delete"></text>
            </view>

            <view class="search-content">
                <view @tap="bindKeyTap" :data-key="item" class="btn mid round text-darkgreen" v-for="(item, index) in hisKeys" :key="index">{{ item }}</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        search() {
            return this.data.search;
        },
        source() {
            return this.data.source;
        },
        item() {
            return this.data.item;
        },
        hisKeys() {
            return this.data.hisKeys;
        },
        index() {
            return this.data.index;
        },
        bindSearchConfirm() {
            return this.data.bindSearchConfirm;
        },
        bindClearKeyTap() {
            return this.data.bindClearKeyTap;
        },
        url() {
            return this.data.url;
        },
        bindDelHisTap() {
            return this.data.bindDelHisTap;
        },
        bindKeyTap() {
            return this.data.bindKeyTap;
        }
    }
};
</script>
<style></style>
