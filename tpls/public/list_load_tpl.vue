<template>
    <view>
        <template v-if="compName === 'listLoadTpl'">
            <view v-if="!dataList || (dataList && dataList.page < dataList.count)" :class="'load text-grey loading ' + skin"></view>

            <view v-if="dataList && dataList.page > 1 && dataList.page == dataList.count" :class="'load text-grey over ' + skin"></view>

            <block v-if="noHintImg">
                <image style="height: 500rpx" mode="aspectFit" v-if="dataList && dataList.total == 0" :src="noHintImg" />
            </block>

            <block v-else>
                <view v-if="dataList && dataList.total == 0" :class="'load text-grey ' + skin">{{ noHint ? noHint : '暂无记录哦~' }}</view>
            </block>

            <view style="height: 200rpx"></view>
        </template>
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        dataList() {
            return this.data.dataList;
        },
        skin() {
            return this.data.skin;
        },
        noHintImg() {
            return this.data.noHintImg;
        },
        noHint() {
            return this.data.noHint;
        }
    }
};
</script>
<style></style>
