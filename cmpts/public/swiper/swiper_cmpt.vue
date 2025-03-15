<template>
    <view>
        <swiper
            v-if="images.length > 0"
            class="swiper"
            :style="'height:' + height + 'rpx'"
            :indicator-active-color="indicatorActiveColor"
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :circular="circular"
            :vertical="vertical"
            :interval="interval"
            :duration="duration"
            :previous-margin="previousMargin + 'rpx'"
            :next-margin="nextMargin + 'rpx'"
        >
            <swiper-item v-for="(item, index) in images" :key="index">
                <image
                    show-menu-by-longpress
                    @tap="url"
                    :style="'height:' + height + 'rpx'"
                    :lazy-load="true"
                    data-type="image"
                    :data-url="item"
                    :data-imgs="images"
                    :src="item"
                    :mode="mode"
                    class="swiper-item-images loading"
                />
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
const pageHelper = require('../../../helper/page_helper.js');
export default {
    data() {
        return {};
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        images: {
            type: Array,
            default: () => []
        },
        height: {
            type: Number,
            default: 350
        },
        mode: {
            type: String,
            default: 'aspectFill'
        },
        indicatorActiveColor: {
            type: String,
            default: '#000000'
        },
        interval: {
            type: Number,
            default: 3000
        },
        duration: {
            type: Number,
            default: 500
        },
        previousMargin: {
            type: Number,
            default: 0
        },
        nextMargin: {
            type: Number,
            default: 0
        },
        indicatorDots: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        circular: {
            type: Boolean,
            default: true
        },
        vertical: {
            type: Boolean,
            default: false
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        url: function (e) {
            pageHelper.url(e, this);
        }
    },
    created: function () {}
};
</script>
<style>
.swiper {
    width: 100%;
}
.swiper-item-images {
    width: 100%;
}
</style>
