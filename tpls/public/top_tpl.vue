<template>
    <view>
        <template v-if="compName === 'topTpl'">
            <view
                v-if="topBtnShow"
                @tap="top"
                class="btn-fixed bg-gray btn-top"
                :style="'color:#888!important;bottom:' + (bottom || '200') + 'rpx;right:' + (right || '12') + 'rpx;z-index: 99;'"
            >
                <text class="icon-top"></text>
            </view>
        </template>
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        topBtnShow() {
            return this.data.topBtnShow;
        },
        bottom() {
            return this.data.bottom;
        },
        right() {
            return this.data.right;
        },
        top() {
            return this.data.top;
        }
    }
};
</script>
<style></style>
