<template>
    <view>
        <template v-if="compName === 'baseListTpl'">
            <!-- 横向拖动 Begin -->

            <scroll-view :scroll-x="true" v-if="listMode == 'scroll'" class="comm-list-scroll">
                <view
                    class="item-scroll"
                    @tap="url"
                    :data-url="'../../' + item.type + '/detail/' + item.type + '_detail?id=' + item.id"
                    v-for="(item, index) in dataList"
                    :key="index"
                >
                    <image :lazy-load="true" class="loading" :src="item.pic" mode="aspectFill"></image>

                    <view class="title text-cut">{{ item.title }}</view>
                </view>
            </scroll-view>

            <!-- 横向拖动 END -->

            <view v-else :class="'sub-margin-bottom ' + (listMode == 'flow' ? 'comm-list-flow' : 'comm-list-box')">
                <block v-for="(item, index) in dataList" :key="index">
                    <!-- 文字条目 Begin -->

                    <view
                        v-if="listMode == 'line' || listMode == 'line-order'"
                        class="item-line"
                        @tap="url"
                        :data-url="'../../' + item.type + '/detail/' + item.type + '_detail?id=' + item.id"
                    >
                        <view class="left">
                            <view v-if="listMode == 'line-order'" class="order bg-gray bg-project">{{ index + 1 }}</view>
                            <view class="title content-cut-one">{{ item.title }}</view>
                        </view>
                        <view class="right"><text class="icon-right"></text></view>
                    </view>

                    <!-- 文字条目 END -->

                    <!-- 瀑布流 Begin -->

                    <view v-if="listMode == 'flow'" class="item-flow" @tap="url" :data-url="'../../' + item.type + '/detail/' + item.type + '_detail?id=' + item.id">
                        <view class="item-flow-inner">
                            <image mode="aspectFill" :lazy-load="true" class="loading shadow" :src="item.pic" />
                            <view class="title-flow content-cut-one">{{ item.title }}</view>
                        </view>
                    </view>

                    <!-- 瀑布流 END -->

                    <!-- 上下图 Begin -->

                    <view
                        v-if="listMode == 'upimg'"
                        class="item card-project shadow-project item-upimg"
                        @tap="url"
                        :data-url="'../../' + item.type + '/detail/' + item.type + '_detail?id=' + item.id"
                    >
                        <image mode="widthFix" :lazy-load="true" class="loading" :src="item.pic" />
                        <view class="upimg-title content-cut-two">{{ item.title }}</view>
                        <view class="data-desc content-cut-two">{{ item.desc }}</view>
                        <view class="data-status">{{ item.ext }}</view>
                    </view>

                    <!-- 上下图 END -->

                    <!-- 右边图 Begin -->

                    <view
                        v-else-if="listMode == 'rightpic'"
                        class="item card-project shadow-project item-rightpic"
                        @tap="url"
                        :data-url="'../../' + item.type + '/detail/' + item.type + '_detail?id=' + item.id"
                    >
                        <view class="title content-cut-two">{{ item.title }}</view>
                        <view class="desc">
                            <text class="content-cut-three">{{ item.desc }}</text>
                            <image class="pic loading" :lazy-load="true" mode="aspectFill" :src="item.pic"></image>
                        </view>
                        <view class="data">
                            <text class="margin-right">{{ item.ext }}</text>
                        </view>
                    </view>

                    <!-- 右边图 END -->

                    <!-- 左边图 Begin -->

                    <view
                        v-else-if="listMode == 'leftpic'"
                        class="item card-project shadow-project item-leftpic"
                        @tap="url"
                        :data-url="'../../' + item.type + '/detail/' + item.type + '_detail?id=' + item.id"
                    >
                        <view class="title content-cut-two">{{ item.title }}</view>
                        <view class="desc">
                            <image class="pic loading" :lazy-load="true" mode="aspectFill" :src="item.pic"></image>
                            <text class="content-cut-three">{{ item.desc }}</text>
                        </view>
                        <view class="data">
                            <text class="margin-right">{{ item.ext }}</text>
                        </view>
                    </view>

                    <!-- 左边图 END -->

                    <!-- 左大图 Begin -->

                    <view
                        v-else-if="listMode == 'leftbig' || listMode == 'leftbig1' || listMode == 'leftbig2' || listMode == 'leftbig3'"
                        :class="'item card-project shadow-project item-' + listMode"
                        @tap="url"
                        :data-url="'../../' + item.type + '/detail/' + item.type + '_detail?id=' + item.id"
                    >
                        <image mode="aspectFill" :lazy-load="true" class="leftbig-left loading" :src="item.pic"></image>
                        <view class="leftbig-right">
                            <view class="leftbig-title content-cut-one">{{ item.title }}</view>
                            <view class="leftbig-desc">
                                <text :class="listMode == 'leftbig1' || listMode == 'leftbig3' ? 'content-cut-two' : 'content-cut-three'">{{ item.desc }}</text>
                            </view>
                            <view class="data">
                                <view class="bottom-tag-list text-cut"></view>
                                <view class="bottom-status">{{ item.ext }}</view>
                            </view>
                        </view>
                    </view>

                    <!-- 左大图 END -->

                    <!-- 大文字 Begin -->

                    <view
                        v-else-if="listMode == 'bigtext'"
                        class="item card-project shadow-project item-bigtext"
                        @tap="url"
                        :data-url="'../../' + item.type + '/detail/' + item.type + '_detail?id=' + item.id"
                    >
                        <view class="left">
                            <image mode="aspectFill" :lazy-load="true" :class="item.pic ? 'loading' : ''" :src="item.pic" />
                        </view>

                        <view class="right">
                            <view class="bigtext-title content-cut-one">{{ item.title }}</view>
                            <view class="data-desc content-cut-one">{{ item.desc }}</view>
                        </view>
                        <view class="data-status">
                            {{ item.ext }}
                        </view>
                    </view>

                    <!-- 大文字 END -->
                </block>
            </view>
        </template>
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        listMode() {
            return this.data.listMode;
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
        url() {
            return this.data.url;
        }
    }
};
</script>
<style></style>
