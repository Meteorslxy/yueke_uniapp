<template>
    <view>
        <view class="form-group">
            <view class="title">
                <text v-if="must" class="text-red">*</text>
                {{ title }}
                <text v-if="isShowSize" class="text-gray" style="font-size: 24rpx; font-weight: normal">(每个不超过{{ uploadSize }}M)</text>
            </view>
            <view class="action" v-if="isShowSize && fileMax > 1">{{ fileListClone.length }}/{{ fileMax }}</view>
        </view>

        <view @tap="bindChooseFileTap" class="upload-img">
            <view class="inner">
                <text class="icon-file margin-right-xs"></text>
                请选择文件...
            </view>
        </view>

        <view class="file-box">
            <view class="item" v-for="(item, index) in fileListClone" :key="index">
                <view class="left" @tap="bindOpenTap" :data-idx="index">
                    <image class="img" :src="'images/' + item.ext + '.png'"></image>
                    <view class="title">{{ item.name }}</view>
                </view>

                <view class="right">
                    <view class="oprt" @tap="catchDelTap" :data-idx="index"><text class="oprt-btn icon-delete bg-red light margin-right-xs"></text></view>
                    <view class="oprt" @tap="catchEditTap" :data-idx="index"><text class="oprt-btn icon-edit bg-blue light"></text></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
const pageHelper = require('../../../helper/page_helper.js');
const fileHelper = require('../../../helper/file_helper.js');
export default {
    data() {
        return {
            fileListClone: ''
        };
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        fileList: {
            // {path,ext,name,type}
            type: Array,
            default: () => []
        },
        fileMax: {
            // 文件个数上限
            type: Number,
            default: 5
        },
        title: {
            type: String,
            default: '文件上传'
        },
        must: {
            //是否必填
            type: Boolean,
            default: true
        },
        isCheck: {
            //是否做文件内容校验
            type: Boolean,
            default: true
        },
        uploadSize: {
            // 文件大小M
            type: Number,
            default: 100
        },
        isShowSize: {
            //是否提示文件尺寸
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

        // 选择上传文件
        bindChooseFileTap: function (e) {
            if (this.fileList.length >= this.fileMax) {
                return pageHelper.showModal('最多可上传' + this.fileMax + '个文件');
            }
            uni.chooseMessageFile({
                count: 1,
                type: 'file',
                //extension: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'jpg', 'jpeg', 'png'],file时无效，仅能打开文档
                success: async (res) => {
                    // console.log(res)
                    for (let k = 0; k < res.tempFiles.length; k++) {
                        let size = res.tempFiles[k].size;
                        let path = res.tempFiles[k].path;

                        //console.log(res.tempFiles[k]);

                        let fileMaxSize = 1024000 * this.uploadSize;
                        if (size > fileMaxSize) {
                            return pageHelper.showNoneToast('单个文件大小不能超过 ' + this.uploadSize + 'M', 3000);
                        }
                        this.setData({
                            fileListClone: this.fileList.concat({
                                path,
                                name: res.tempFiles[k].name,
                                type: res.tempFiles[k].type,
                                ext: this.getExt(path)
                            })
                        });
                        this.$emit('upload', {
                            detail: this.fileList
                        });
                    }
                }
            });
        },

        bindPreviewFileTap: function (e) {
            uni.previewImage({
                urls: this.fileList,
                current: e.currentTarget.dataset.url
            });
        },

        bindOpenTap: async function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            return fileHelper.openFile(this.fileList[idx]);
        },

        // 获取文件类型
        getExt: function (fileName) {
            if (!fileName) {
                return 'other';
            }
            if (!fileName.includes('.')) {
                return 'other';
            }
            fileName = fileName.toLowerCase();
            let suffix = fileName.substring(fileName.lastIndexOf('.') + 1);
            if (suffix == 'png' || suffix == 'jpg' || suffix == 'jpeg' || suffix == 'gif' || suffix == 'svg') {
                return 'image';
            }
            if (suffix == 'doc' || suffix == 'docx') {
                return 'word';
            }
            if (suffix == 'xls' || suffix == 'xlsx') {
                return 'excel';
            }
            if (suffix == 'ppt' || suffix == 'pptx') {
                return 'ppt';
            }
            if (suffix == 'txt') {
                return 'txt';
            }
            if (suffix == 'pdf') {
                return 'pdf';
            }
            if (suffix == 'zip' || suffix == 'rar') {
                return 'zip';
            }
            if (suffix == 'mp4' || suffix == 'mov' || suffix == 'm4v' || suffix == '3gp' || suffix == 'avi' || suffix == 'm3u8' || suffix == 'webm') {
                return 'video';
            }
            if (suffix == 'm4a' || suffix == 'mp3' || suffix == 'aac' || suffix == 'wav') {
                return 'audio';
            }
            return 'other';
        },

        // 	删除文件
        catchDelTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let cb = () => {
                this.fileList.splice(idx, 1);
                this.setData({
                    fileListClone: this.fileList
                });
                this.$emit('upload', {
                    detail: this.fileList
                });
            };
            pageHelper.showConfirm('确定要删除该文件吗？', cb);
        },

        // 	修改文件名
        catchEditTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let name = this.fileList[idx].name;
            let ext = name.substring(name.lastIndexOf('.'));
            let content = name.substring(0, name.lastIndexOf('.'));
            let that = this;
            uni.showModal({
                title: '修改名称',
                content,
                editable: true,
                success(res) {
                    if (res.cancel) {
                        return;
                    }
                    if (!res.content || !res.content.trim()) {
                        return pageHelper.showModal('名称不能为空');
                    }
                    that.fileList[idx].name = res.content.trim() + ext;
                    that.setData({
                        fileListClone: that.fileList
                    });
                    that.$emit('upload', {
                        detail: that.fileList
                    });
                }
            });
        }
    },
    created: function () {},
    watch: {
        fileList: {
            handler: function (newVal, oldVal) {
                this.fileListClone = newVal;
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

.upload-img {
    width: 100%;
    padding: 0 0rpx;
}

.upload-img .inner {
    width: 100%;
    font-size: 28rpx;
    color: var(--blue);
    background-color: #f8f8f8;
    font-weight: bold;
    padding: 30rpx 30rpx;
}

.file-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10rpx 10rpx;
}

.file-box .item {
    width: 100%;
    display: flex;
    padding: 14rpx 4rpx;
    border-bottom: 2rpx dashed #ccc;
}

.file-box .item .left {
    flex: 1;
    font-size: 24rpx;
    color: #888;
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
}

.file-box .item .left .img {
    width: 30rpx;
    height: 30rpx;
    margin-right: 10rpx;
}

.file-box .item .left .title {
    flex: 1;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-line;
}

.file-box .item .right {
    display: flex;
    margin-left: 20rpx;
}

.file-box .item .right .oprt {
    padding: 4rpx 4rpx;
}

.file-box .item .right .oprt .oprt-btn {
    padding: 6rpx;
    font-size: 24rpx;
    border-radius: 20%;
}
</style>
