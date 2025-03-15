<template>
    <view>
        <!-- 普通窗口 begin -->
        <view v-if="type == 'comm'" :class="'modal ' + (showClone ? 'show' : '')">
            <view class="dialog">
                <view class="bar bg-white justify-end">
                    <view class="content">{{ title }}</view>
                    <view class="action" @tap="bindHideModalTap">
                        <text class="icon-close text-red"></text>
                    </view>
                </view>
                <view class="padding-xl">
                    <slot />
                </view>
            </view>
        </view>
        <!-- 普通窗口 end -->

        <!-- 底部窗口 begin -->
        <view v-if="type == 'bottom'" :class="'modal bottom-modal ' + (showClone ? 'show' : '')">
            <view class="dialog">
                <view class="bar bg-white">
                    <view class="action text-gray text-xl" @tap="bindHideModalTap">取消</view>
                    <view class="action text-green text-modal text-xl" @tap="bindComfirmTap">确定</view>
                </view>
                <view class="padding-xl">
                    <slot />
                </view>
            </view>
        </view>
        <!-- 底部窗口 end -->

        <!-- 对话窗口 begin -->
        <view v-if="type == 'dialog'" :class="'modal ' + (showClone ? 'show' : '')" @touchmove.stop.prevent="nomove">
            <view class="dialog modal-dialog">
                <view class="bar bg-white justify-end" v-if="title">
                    <view class="content">{{ title }}</view>
                </view>

                <view v-if="subtitle" class="subtitle" :style="'text-align:' + subtitleAlign">{{ subtitle }}</view>

                <view class="padding-xl slot-class" style="padding-top: 0">
                    <slot />
                </view>
                <view class="modal-bar">
                    <view class="modal-bar-view" @tap="bindHideModalTap">{{ cancelText }}</view>
                    <view v-if="showConfirm" class="modal-bar-view modal-bar-comfirm" @tap="bindComfirmTap">{{ confirmText }}</view>
                </view>
            </view>
        </view>
        <!-- 对话窗口 end -->

        <!-- 可能超长的对话窗口 begin -->
        <view v-if="type == 'longdialog'" :class="'modal ' + (showClone ? 'show' : '')">
            <view class="dialog modal-dialog">
                <view class="bar bg-white justify-end" v-if="title">
                    <view class="content">{{ title }}</view>
                </view>

                <view v-if="subtitle" class="subtitle" :style="'text-align:' + subtitleAlign">{{ subtitle }}</view>

                <view class="padding-xl slot-class" style="padding-top: 0">
                    <slot />
                </view>
                <view class="modal-bar">
                    <view class="modal-bar-view" @tap="bindHideModalTap">{{ cancelText }}</view>
                    <view v-if="showConfirm" class="modal-bar-view modal-bar-comfirm" @tap="bindComfirmTap">{{ confirmText }}</view>
                </view>
            </view>
        </view>
        <!-- 可能超长的对话窗口 end -->

        <!-- 图片窗口 begin -->
        <view v-if="type == 'image'" :class="'modal  ' + (showClone ? 'show' : '')">
            <view class="dialog">
                <view class="bg-img" :style="'height:' + height + 'rpx;'">
                    <image class="bg-img-image" mode="aspectFill" :src="imgURL"></image>
                    <view class="bar justify-end text-white">
                        <view class="action" @tap="bindHideModalTap">
                            <text class="icon-close"></text>
                        </view>
                    </view>
                </view>
                <view class="bar bg-white" v-if="title">
                    <view class="action margin-0 flex-sub">{{ title }}</view>
                </view>
            </view>
        </view>
        <!-- 图片窗口 end -->
    </view>
</template>

<script>
// cmpts/public/modal/modal.js
export default {
    data() {
        return {
            showClone: ''
        };
    },
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    externalClasses: ['slot-class'],
    /**
     * 组件的属性列表
     */
    props: {
        type: {
            // 类型 comm/bottom/dialog/image
            type: String,
            default: 'comm'
        },
        title: {
            type: String,
            default: '温馨提示'
        },
        subtitle: {
            type: String,
            default: ''
        },
        subtitleAlign: {
            type: String,
            default: 'center'
        },
        show: {
            type: Boolean,
            default: true
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        showConfirm: {
            type: Boolean,
            default: true
        },
        imgURL: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 600
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        bindHideModalTap: function (e) {
            this.setData({
                showClone: ''
            });
        },
        nomove: function () {},
        bindComfirmTap: function (e) {
            this.$emit('click', {
                detail: {}
            });
        }
    },
    created: function () {},
    watch: {
        show: {
            handler: function (newVal, oldVal) {
                this.showClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
.bg-img {
    width: 100%;
    height: 100%;
    position: relative;
}

.bg-img .bg-img-image {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
}

.bg-img .action .icon-close {
    font-size: 50rpx !important;
    font-weight: bold;
}

.modal .dialog {
    padding: 20rpx 0rpx;
    margin-top: 30rpx;
}

.modal .dialog .bar {
    background-color: #f8f8f8;
}

.modal .dialog .bar .content {
    color: #333;
    font-size: 36rpx;
}

.modal-bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1rpx solid #ccc;
    line-height: 3;
}

.modal-bar .modal-bar-view {
    width: 50%;
    font-size: 36rpx;
    font-weight: bold;
}

.modal-bar .modal-bar-comfirm {
    color: #576b95;
    border-left: 1rpx solid #ccc;
}

.modal .modal-dialog {
    padding: 10rpx 0rpx 0;
}

.modal .modal-dialog .subtitle {
    width: 100%;
    text-align: center;
    font-size: 30rpx;
    color: #777;
    padding: 0 60rpx;
    margin-top: 10rpx;
    margin-bottom: 20rpx;
}
</style>
