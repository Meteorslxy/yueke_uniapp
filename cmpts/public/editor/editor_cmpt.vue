<template>
    <view>
        <view class="editor-tab" v-if="viewMode">
            <button @tap.stop.prevent="url" data-type="bool" data-url="isView" :class="'btn round ' + (!isView ? 'bg-blue' : 'bg-grey light') + '  margin-right-xs'">编辑</button>
            <button @tap.stop.prevent="url" data-type="bool" data-url="isView" :class="'btn ' + (isView ? 'bg-blue' : 'bg-grey light') + ' round'">预览</button>
        </view>

        <view enableBackToTop scrollY class="editor-wrapper" :style="'min-height: 400px;' + (viewMode ? 'margin-top:50rpx' : '')">
            <block v-for="(node, index) in nodeListClone" :key="index">
                <view :class="'editor-node-wrapper ' + (cur == index ? 'cur' : '') + ' ' + (isView ? 'is-view' : '')">
                    <textarea
                        :disabled="isView"
                        :id="'editor-node-' + index"
                        v-if="node.type === 'text'"
                        :auto-height="true"
                        cursor-spacing="60"
                        @input="bindTextareaInput"
                        class="editor-textarea"
                        :data-idx="index"
                        maxlength="-1"
                        :value="node.val"
                    ></textarea>
                    <image
                        @tap="url"
                        data-type="image"
                        :data-url="node.val"
                        :id="'editor-node-' + index"
                        v-if="node.type === 'img'"
                        mode="widthFix"
                        class="loading editor-image"
                        :src="node.val"
                        :lazy-load="true"
                    ></image>

                    <view class="editor-delete" v-if="!isView">
                        <!-- <view bindtap="bindTopTap" class="iconfont icon-top" data-idx="{{index}}" wx:if="{{index>1}}"></view> -->
                        <view @tap="bindUpTap" class="iconfont icon-refresharrow up" :data-idx="index" v-if="index > 0"></view>
                        <view @tap="bindDownTap" class="iconfont icon-refresharrow" :data-idx="index" v-if="index < nodeListClone.length - 1"></view>
                        <!-- <view bindtap="bindBottomTap" class="iconfont icon-down" data-idx="{{index}}" wx:if="{{index<(nodeList.length-2)}}"></view> -->
                        <view @tap="bidnDeleteNodeTap" class="iconfont icon-delete" :data-idx="index"></view>
                    </view>
                </view>

                <view class="editor-add-wrapper" v-if="!isView">
                    <view @tap="bindAddTextTap" :data-idx="index" class="editor-add-wrapper-view">
                        <text class="icon-roundadd margin-right-xs"></text>
                        添加文本
                    </view>
                    <view @tap="bindAddImageTap" :data-idx="index" class="editor-add-wrapper-view">
                        <text class="icon-pic margin-right-xs"></text>
                        添加图片
                    </view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
const pageHelper = require('../../../helper/page_helper.js');
const dataHelper = require('../../../helper/data_helper.js');
const cloudHelper = require('../../../helper/cloud_helper.js');
const contentCheckHelper = require('../../../helper/content_check_helper.js');
const projectSetting = require('../../../setting/setting.js');
export default {
    data() {
        return {
            cur: -1,

            node: {
                type: '',
                val: ''
            },

            nodeListClone: ''
        };
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        nodeList: {
            // [{type:'text/img',val:'txt/cloudId'}]
            type: Array,
            default: () => [
                {
                    type: 'text',
                    val: ''
                }
            ]
        },
        viewMode: {
            // 整体：编辑还是预览
            type: Boolean,
            default: false
        },
        isView: {
            // 编辑时：编辑还是预览
            type: Boolean,
            default: false
        },
        upDirectDir: {
            //不为空：则在非测试模式下直接上传
            type: String,
            default: '' //editor/
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

        url: function (e) {
            pageHelper.url(e, this);
        },

        setGlow(cur) {
            this.setData({
                cur
            });
            setTimeout(() => {
                this.setData({
                    cur: -1
                });
            }, 1000);
        },

        bindAddTextTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let node = {
                type: 'text',
                val: ''
            };
            let nodeList = this.nodeList;
            nodeList.splice(idx + 1, 0, node);
            this.setData({
                nodeListClone: nodeList
            });
            this.setGlow(idx + 1);
        },

        bindAddImageTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let that = this;
            uni.chooseMedia({
                count: 8,
                mediaType: ['image'],
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success: async (res) => {
                    let nodeList = that.nodeList;
                    for (let k = 0; k < res.tempFiles.length; k++) {
                        let path = res.tempFiles[k].tempFilePath;
                        let size = res.tempFiles[k].size;
                        if (!contentCheckHelper.imgTypeCheck(path)) {
                            uni.hideLoading();
                            return pageHelper.showNoneToast('只能上传png、jpg、jpeg格式', 3000);
                        }
                        let maxSize = 20; //TODO setting
                        let imageMaxSize = 1024000 * maxSize;
                        console.log('IMGX SIZE=' + size + 'Byte,' + size / 1024 + 'K');
                        if (!contentCheckHelper.imgSizeCheck(size, imageMaxSize)) {
                            uni.hideLoading();
                            return pageHelper.showModal('图片大小不能超过 ' + maxSize + '兆');
                        }
                        if (!projectSetting.IS_DEMO && this.upDirectDir) {
                            uni.showLoading({
                                title: '上传中'
                            });
                            path = await cloudHelper.transTempPicOne(path, this.upDirectDir, '', false);
                            uni.hideLoading();
                        }
                        let node = {
                            type: 'img',
                            val: path
                        };
                        nodeList.splice(idx + 1, 0, node);
                    }
                    that.setData({
                        nodeListClone: nodeList
                    });
                    //that.setGlow(idx + 1);
                }
            });
        },

        bidnDeleteNodeTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let nodeList = this.nodeList;
            if (this.nodeList.length == 1) {
                return pageHelper.showNoneToast('至少需要一个内容框');
            }
            nodeList.splice(idx, 1);
            this.setData({
                nodeListClone: nodeList
            });
        },

        bindUpTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let nodeList = this.nodeList;
            nodeList = dataHelper.arraySwap(nodeList, idx, idx - 1);
            this.setData({
                nodeListClone: nodeList
            });
            pageHelper.anchor('editor-node-' + (idx - 1), this);
            this.setGlow(idx - 1);
        },

        bindTopTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let nodeList = this.nodeList;
            nodeList = dataHelper.arrayTop(nodeList, idx);
            this.setData({
                nodeListClone: nodeList
            });
            pageHelper.anchor('editor-node-0', this);
            this.setGlow(0);
        },

        bindBottomTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let nodeList = this.nodeList;
            nodeList = dataHelper.arrayBottom(nodeList, idx);
            this.setData({
                nodeListClone: nodeList
            });
            pageHelper.anchor('editor-node-' + (nodeList.length - 1), this);
            this.setGlow(nodeList.length - 1);
        },

        bindDownTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let nodeList = this.nodeList;
            nodeList = dataHelper.arraySwap(nodeList, idx, idx + 1);
            this.setData({
                nodeListClone: nodeList
            });
            pageHelper.anchor('editor-node-' + (idx + 1), this);
            this.setGlow(idx + 1);
        },

        bindTextareaInput: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let nodeList = this.nodeList;
            let node = nodeList[idx];
            if (node.type == 'text') {
                node.val = e.detail.value;
                nodeList[idx] = node;
                /*
      this.setData({
          nodeList
      });*/
            }
        },

        getNodeList: function (e) {
            let nodeList = this.nodeList;

            // 校验是否填写了内容
            let imgCnt = 0;
            let textCnt = 0;
            for (let k = 0; k < nodeList.length; k++) {
                if (nodeList[k].type == 'img' && nodeList[k].val.trim() != '') {
                    imgCnt++;
                }
                if (nodeList[k].type == 'text' && nodeList[k].val.trim() != '') {
                    textCnt++;
                }
            }
            if (imgCnt + textCnt == 0) {
                return [];
            }
            return this.nodeList;
        }
    },
    created: function () {},
    watch: {
        nodeList: {
            handler: function (newVal, oldVal) {
                this.nodeListClone = newVal;
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
.editor-tab {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    z-index: 999;
    line-height: 3;
    height: 70rpx;
    margin-top: 40rpx;
}

.editor-tab .item.cur::after {
    width: 100%;
    position: absolute;
    bottom: 10rpx;
    left: 0rpx;
    height: 6rpx;
    content: '';
    background-color: #ff5858;
}

.iconfont {
    font-size: 32rpx;
    font-style: normal;
}

.editor-wrapper {
    padding: 30rpx;
    box-sizing: border-box;
}

.editor-add-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
    font-size: 30rpx;
    width: 100%;
    justify-content: center;
}

.editor-add-wrapper .editor-add-wrapper-view {
    width: 250rpx;
    line-height: 2;
    text-align: center;
}

.editor-add-wrapper .iconfont {
    padding: 20rpx;
    color: #666;
    font-size: 48rpx;
    box-sizing: border-box;
}

.editor-node-wrapper {
    position: relative;
    width: 100%;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    border: 1rpx dashed #999;
    background: #fff;
}

.editor-node-wrapper.is-view {
    border: 1rpx solid #fff;
    border-radius: 10rpx;
}

.editor-node-wrapper.cur {
    animation: glow 800ms ease-out infinite alternate;
}

@keyframes glow {
    0% {
        box-shadow: 0 0 5px rgba(252, 94, 94, 0.2), inset 0 0 5px rgba(252, 94, 94, 0.1), 0 0px 0 #d70c19;
    }

    100% {
        border-color: #d70c19;
        box-shadow: 0 0 20px rgba(252, 94, 94, 0.6), inset 0 0 10px rgba(252, 94, 94, 0.4), 0 0px 0 #d70c19;
    }
}

.editor-delete {
    position: absolute;
    z-index: 999;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    top: -30rpx;
    right: 0rpx;
    color: #999;
    background: hsla(0, 0%, 100%, 0.95);
    border-radius: 40rpx;
    padding: 15rpx;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.editor-delete .iconfont {
    padding: 0 20rpx;
}

.editor-wrapper .editor-node-wrapper .editor-textarea {
    margin: 0;
    display: block;
    width: 100%;
    line-height: 1.5;
    padding: 35rpx 20rpx 20rpx;
    min-height: 240rpx;
    font-size: 32rpx;
}

.editor-images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 656rpx;
    border: 2rpx solid #e4e7ed;
    background: #fff;
    padding: 20rpx;
    min-height: 2.5em;
}

.editor-images .item-image {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5rpx;
    width: 150rpx;
    height: 150rpx;
    box-sizing: border-box;
}

.editor-images .editor-images-add {
    border: 4rpx dashed #c0c4cc;
    color: #c0c4cc;
}

.editor-image {
    display: block;
    width: 100%;
}
</style>
