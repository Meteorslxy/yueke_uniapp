<template>
    <!-- List Begin -->
    <view class="text-pic-list-box">
        <view class="simple text-center text-grey padding" v-if="!footList || footList.length == 0">暂无记录哦~</view>
        <view class="item shadow item-simple" @tap="url" :data-url="item.path" v-for="(item, index) in footList" :key="index">
            <view class="simple">
                <view class="simple-right">
                    <view class="simple-title content-cut-one">{{ item.title }}</view>
                    <view class="simple-desc">
                        <text class="text-grey text-bold">{{ item.type }}</text>
                        <text class="margin-left-s">{{ item.time }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
    <!-- List END -->
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        footList() {
            return this.data.footList;
        },
        item() {
            return this.data.item;
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
