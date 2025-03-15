<template>
    <view>
        <poster
            v-if="posterConfig"
            id="poster"
            :hide-loading="true"
            :preload="false"
            :config="posterConfig"
            @success="bindPosterSuccessListener($event, { tagId: 'poster' })"
            @fail="bindPosterFailListener($event, { tagId: 'poster' })"
        ></poster>

        <view @touchmove.stop.prevent="trueFun" style="z-index: 9999999999" :class="'main-poster modal bottom-modal ' + (showClone ? 'show' : '')">
            <view class="dialog">
                <view class="poster-img" v-if="isCreate">
                    <image
                        @tap="url"
                        data-type="img"
                        :data-url="imgClone"
                        :show-menu-by-longpress="true"
                        v-if="isLoad"
                        mode="widthFix"
                        :src="imgClone"
                        class="shadow loading"
                    ></image>

                    <view v-else class="load loading text-l"></view>

                    <view class="save-hint text-project" v-if="isLoad">长按图片保存或者转发</view>
                </view>
                <view class="poster-share">
                    <button class="item item-share clearbtn" open-type="share" :data-img="imgClone">
                        <view class="pic">
                            <image src="/static/cmpts/public/poster/images/wechat.png" />
                        </view>
                        <text>转发给朋友</text>
                    </button>

                    <view v-if="doPoster" class="item" @tap="bindPosterTap" style="padding-top: 12rpx">
                        <view class="pic">
                            <image class="friend" src="/static/cmpts/public/poster/images/friend.png" />
                        </view>
                        <text>生成海报</text>
                    </view>
                </view>

                <view class="line" @tap="bindCloseTap">
                    <view>关闭</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import poster from './wxa-plugin-canvas/poster';
/*
https://github.com/jasondu/wxa-plugin-canvas
### 标准尺寸：
width: 375, // rpx
height: 670,

### 父页面分享按钮取值
onShareAppMessage: function (e) {
	let img = e.target.dataset.img;
	return {
		title: 'xxx',
		imageUrl: img,
		path: 'xxxx',
	}
}
*/
import Poster from './wxa-plugin-canvas/poster/poster.js';
const pageHelper = require('../../../helper/page_helper.js');
const picHelper = require('../../../helper/pic_helper.js');
const helper = require('../../../helper/helper.js');
export default {
    components: {
        poster
    },
    data() {
        return {
            isLoad: false,
            isCreate: false,
            posterConfig: '',
            showClone: false,
            imgClone: ''
        };
    },
    externalClasses: ['poster-class'],
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        config: {
            // 图形参数
            type: Object,
            default: null
        },
        isQr: {
            // 是否叠加小程序码
            type: Boolean,
            default: false
        },
        isFace: {
            // 是否叠加头像
            type: Boolean,
            default: false
        },
        doPoster: {
            type: Boolean,
            default: true
        },
        show: {
            // 显示
            type: Boolean,
            default: false
        },
        img: {
            //图片文件
            type: String,
            default: ''
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
        // 处理小程序 ready 生命周期
        this.$nextTick(() => this.ready());
    },
    destroyed: function () {
        // 在组件实例被从页面节点树移除时执行
    },
    /**
     * 组件的方法列表
     */
    methods: {
        ready: function () {
            this.initFun();
        },

        attached: function () {},
        initFun: async function () {},

        bindPosterTap: function (e) {
            this.setData(
                {
                    isCreate: true,
                    isLoad: false
                },
                async () => {
                    await this.createPoster();
                }
            );
        },

        bindCloseTap: function () {
            this.setData({
                showClone: false
            });
        },

        /**
         * 异步生成海报
         */
        createPoster: async function () {
            // TODO:根据屏幕大小来生成，但是没有负定位

            let posterConfig = {
                width: 480,
                // rpx
                height: 650,
                pixelRatio: 2,
                // 2 为原始大小
                backgroundColor: '#345678',
                debug: false
            };
            let config = this.config;
            if (!helper.isDefined(config['width'])) {
                config.width = posterConfig.width;
            }
            if (!helper.isDefined(config['height'])) {
                config.height = posterConfig.height;
            }
            if (!helper.isDefined(config['pixelRatio'])) {
                config.pixelRatio = posterConfig.pixelRatio;
            }
            if (!helper.isDefined(config['backgroundColor'])) {
                config.backgroundColor = posterConfig.backgroundColor;
            }
            if (!helper.isDefined(config['debug'])) {
                config.debug = posterConfig.debug;
            }

            //Object.assign(posterConfig, this.data.config); // TODO有问题

            this.setData(
                {
                    posterConfig: config
                },
                async () => {
                    await Poster.create(true, this);
                }
            );
        },

        onPosterFail: function (e) {
            console.log(e);
        },

        bindPosterSuccessListener(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let img = e.detail;
            this.setData({
                imgClone: img,
                isLoad: true
            });
        },

        url: function (e) {
            pageHelper.url(e, this);
        },

        bindPosterFailListener(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            console.log(e);
        },

        bindSaveTap: function (e) {
            let that = this;
            let callback = function () {
                uni.saveImageToPhotosAlbum({
                    filePath: that.img,
                    success: function (data) {
                        uni.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 1000
                        });
                    }
                });
            };
            picHelper.getWritePhotosAlbum(callback);
        },

        trueFun() {
            console.log('占位：函数 true 未声明');
        }
    },
    created: function () {},
    watch: {
        show: {
            handler: function (newVal, oldVal) {
                this.showClone = newVal;
            },

            immediate: true
        },

        img: {
            handler: function (newVal, oldVal) {
                this.imgClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
.main-poster .poster-share {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 30rpx 50rpx 10rpx;
}

.main-poster .poster-share .item {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #333;
}

.main-poster .poster-share .item .pic {
    height: 100rpx;
    width: 100rpx;
    background-color: #f2f2f2;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-poster .poster-share .item-share {
    margin-top: 15rpx;
}

.main-poster .poster-share .item-share > text {
    margin-top: 15rpx !important;
}

.main-poster .poster-share .item .pic image {
    height: 50rpx;
    width: 50rpx;
}

.main-poster .poster-share .item .pic .friend {
    height: 60rpx;
    width: 60rpx;
}

.main-poster .poster-share .item > text {
    margin-top: 15rpx;
    font-size: 30rpx;
    text-align: center;
}

.main-poster .poster-img {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0rpx;
    padding-bottom: 0rpx;
    min-height: 600rpx;
    margin-top: 30rpx;
    flex-direction: column;
}

.main-poster .poster-img .save-hint {
    font-size: 30rpx;
    color: #555;
    margin-top: 10rpx;
}

.load.loading::after {
    content: '海报生成中...';
}

.main-poster .poster-img image {
    width: 375rpx;
    border-radius: 15rpx;
}

.main-poster .line {
    width: 100%;
    margin: 30rpx 0 30rpx;
    border-top: 1rpx solid #ddd;
    padding: 30rpx 0 20rpx;
    font-size: 32rpx;
}
</style>
