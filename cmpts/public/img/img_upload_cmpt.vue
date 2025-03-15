<template>
    <view>
        <view class="form-group">
            <view class="title">
                <text v-if="must" class="text-red">*</text>
                {{ title }}
                <text v-if="isShowSize" class="text-gray" style="font-size: 24rpx; font-weight: normal">(每张不超过{{ imgUploadSize }}M)</text>
            </view>
            <view class="action" v-if="isShowSize && imgMax > 1">{{ imgListClone.length }}/{{ imgMax }}</view>
        </view>
        <view class="form-group padding">
            <view class="upload-img">
                <view class="bg-img" @tap="bindPreviewImgTap" :data-url="imgListClone[index]" v-for="(item, index) in imgListClone" :key="index">
                    <image :src="imgListClone[index]" mode="aspectFill"></image>

                    <view class="tag bg-red" @tap.stop.prevent="catchDelImgTap" :data-index="index">
                        <text class="icon-close"></text>
                    </view>

                    <view v-if="isShowNo" class="bg-olive img-no">
                        <text>#{{ index }}</text>
                    </view>
                </view>
                <view class="solid" @tap="bindChooseImgTap" v-if="imgListClone.length < imgMax">
                    <text class="icon-cameraadd"></text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
const pageHelper = require('../../../helper/page_helper.js');
const contentCheckHelper = require('../../../helper/content_check_helper.js');
const setting = require('../../../setting/setting.js');
export default {
    data() {
        return {
            imgListClone: ''
        };
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        imgList: {
            type: Array,
            default: () => []
        },
        imgMax: {
            type: Number,
            default: 4
        },
        title: {
            type: String,
            default: '图片上传'
        },
        must: {
            //是否必填
            type: Boolean,
            default: true
        },
        isCheck: {
            //是否做图片内容校验
            type: Boolean,
            default: true
        },
        isShowNo: {
            //是否显示序号
            type: Boolean,
            default: false
        },
        imgUploadSize: {
            //图片最大大小
            type: Number,
            default: setting.IMG_UPLOAD_SIZE
        },
        isShowSize: {
            //是否提示图片尺寸
            type: Boolean,
            default: true
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
        ready: function () {},
        attached: function () {},

        /**
         * 选择上传图片
         */
        bindChooseImgTap: function (e) {
            uni.chooseMedia({
                count: this.imgMax - this.imgList.length,
                //默认9
                mediaType: ['image'],
                sizeType: ['compressed'],
                //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'],
                //从相册选择
                success: async (res) => {
                    for (let k = 0; k < res.tempFiles.length; k++) {
                        let size = res.tempFiles[k].size;
                        let path = res.tempFiles[k].tempFilePath;
                        if (!contentCheckHelper.imgTypeCheck(path)) {
                            uni.hideLoading();
                            return pageHelper.showNoneToast('只能上传png、jpg、jpeg格式', 3000);
                        }
                        let imageMaxSize = 1024000 * this.imgUploadSize;
                        if (!contentCheckHelper.imgSizeCheck(size, imageMaxSize)) {
                            uni.hideLoading();
                            return pageHelper.showNoneToast('单张图片大小不能超过 ' + this.imgUploadSize + 'M', 3000);
                        }

                        //  读取文件流，云校验
                        //let imgData = wx.getFileSystemManager().readFileSync(path, 'base64');

                        //console.log('imgData size=' + imgData.length);

                        if (this.isCheck) {
                            let check = await contentCheckHelper.imgCheck(path);
                            if (!check) {
                                uni.hideLoading();
                                return pageHelper.showNoneToast('存在不合适的图片, 已屏蔽', 3000);
                            }
                        }
                        this.setData({
                            imgListClone: this.imgList.concat(path)
                        });
                        this.$emit('upload', {
                            detail: this.imgList
                        });
                    }
                }
            });
        },

        bindPreviewImgTap: function (e) {
            uni.previewImage({
                urls: this.imgList,
                current: e.currentTarget.dataset.url
            });
        },

        /**
         * 	删除图片
         */
        catchDelImgTap: function (e) {
            let that = this;
            let callback = function () {
                that.imgList.splice(e.currentTarget.dataset.index, 1);
                that.setData({
                    imgListClone: that.imgList
                });
                that.$emit('upload', {
                    detail: that.imgList
                });
            };
            pageHelper.showConfirm('确定要删除该图片吗？', callback);
        }
    },
    created: function () {},
    watch: {
        imgList: {
            handler: function (newVal, oldVal) {
                this.imgListClone = newVal;
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
@import '../../../style/base/comm.css';
@import '../../../style/public/project.css';

.form-group .upload-img .img-no {
    position: absolute;
    right: 0;
    bottom: 0;
    border-top-left-radius: 6rpx;
    padding: 6rpx 12rpx;
    height: 35rpx;
    opacity: 0.9;
}
</style>
