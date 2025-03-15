<template>
    ﻿
    <view class="custom" :style="'height:' + customBarHeight + 'px'">
        <view @tap="bindTap" :class="'bar ' + textColor" :style="'height:' + customBarHeight + 'px;padding-top:' + statusBarHeight + 'px;'">
            <view class="action">
                <text v-if="method == 'back'" class="icc icon-back"></text>
                <text v-else class="icc icon-homefill"></text>
            </view>

            <view :class="'content ' + textColor" :style="'top:' + statusBarHeight + 'px;'">
                <slot name="content"></slot>
            </view>

            <slot name="right"></slot>
        </view>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            method: 'back',
            statusBarHeight: app.globalData.statusBarHeight,
            customBarHeight: app.globalData.customBarHeight
        };
    },
    /**
     * 组件的一些选项
     */
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    /**
     * 组件的对外属性
     */
    props: {
        textColor: {
            type: String,
            default: 'text-white'
        },
        url: {
            type: String,
            default: '/projects/home/index/home_index'
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        attached() {
            let parentPages = getCurrentPages().length;
            if (parentPages == 1) {
                this.setData({
                    method: 'home'
                });
            }
        },

        bindTap() {
            if (this.method == 'back') {
                uni.navigateBack();
            } else {
                uni.reLaunch({
                    url: this.url
                });
            }
        }
    },
    created: function () {}
};
</script>
<style>
.bar {
    display: flex;
    position: relative;
    align-items: center;
    min-height: 100rpx;
    justify-content: space-between;
}

.custom {
    display: block;
    position: fixed;
    width: 100%;
    z-index: 99999;
}

.custom .title {
    color: #fff;
}

.custom .bar {
    width: 100%;
    min-height: 0px;
    padding-right: 220rpx;
    box-shadow: 0rpx 0rpx 0rpx;
    z-index: 9999;
}

.custom .bar .action > .icc {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50% !important;
    color: #fff;
    width: 60rpx;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36rpx;
}

.custom .bar .content {
    width: 100%;
}

.custom .bar .content image {
    height: 60rpx;
    width: 240rpx;
}
</style>
