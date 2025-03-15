<template>
    <view>
        <block v-if="show == 'page'">
            <scroll-view
                class="scroll-view"
                scroll-y
                :refresher-enabled="true"
                :refresher-triggered="refresherTriggered"
                :scroll-top="topNum"
                @scroll="bindScrollTop"
                @scrolltolower="bindReachBottom"
                @refresherrefresh="bindPullDownRefresh"
                :style="'height: calc(100vh - ' + top + 'rpx);'"
            >
                <slot />
                <view v-if="!isLoadClone || !_dataList || (_dataList && _dataList.page < _dataList.count)" class="load text-grey loading"></view>
                <view v-if="isLoadClone && _dataList && _dataList.page > 1 && _dataList.page == _dataList.count" class="load text-grey over"></view>
                <view v-if="isLoadClone && _dataList && _dataList.total == 0" class="load text-grey">{{ dataNoHint }}</view>

                <view style="height: 200rpx"></view>
            </scroll-view>

            <!-- top begin -->
            <button
                v-if="topShow"
                class="btn-fixed bg-gray text-gray btn-top"
                @tap="bindTopTap"
                :style="'bottom:' + topBottom + 'rpx;margin-bottom: constant(safe-area-inset-bottom);margin-bottom: env(safe-area-inset-bottom);'"
            >
                <text class="icon-top"></text>
            </button>
            <!-- top END. -->
        </block>

        <block v-if="show == 'show'">
            <view class="simple-view">
                <slot />
                <view v-if="!isLoadClone || !_dataList" class="load text-grey loading"></view>
                <view v-if="isLoadClone && _dataList && _dataList.total == 0" class="load text-grey">{{ dataNoHint }}</view>

                <view style="height: 200rpx"></view>
            </view>
        </block>
    </view>
</template>

<script>
const cloudHelper = require('../../../helper/cloud_helper.js');
const PublicBiz = require('../../../comm/biz/public_biz.js');
export default {
    data() {
        return {
            refresherTriggered: false,

            //下拉刷新是否完成

            topNum: 0,

            //回顶部
            topShow: false,

            isLoadClone: false
        };
    },
    options: {
        addGlobalClass: true,
        //pureDataPattern: /^_dataList/, // 指定所有 _ 开头的数据字段为纯数据字段
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    props: {
        route: {
            // 业务路由
            type: String,
            default: ''
        },
        _params: {
            //路由的附加参数
            type: Object,
            default: () => ({})
        },
        _dataList: {
            type: Object,
            default: null
        },
        type: {
            type: String,
            //业务类型 info,user,well
            default: ''
        },
        top: {
            type: String,
            // 顶部空出高度 rpx
            default: '0'
        },
        topBottom: {
            type: String,
            // 回顶部按钮的位置 rpx
            default: '50'
        },
        isLoad: {
            type: Boolean,
            //数据加载中
            default: false
        },
        dataNoHint: {
            type: String,
            //无数据提示
            default: '暂无数据哦~'
        },
        isCache: {
            // 非缓存状态下或者list缓存过期下onshow加载, 缓存下onload加载
            type: Boolean,
            //是否cache
            default: true
        },
        show: {
            type: String,
            //显示模式 分页page或者直接显示show
            default: 'page'
        }
    },
    created: function () {
        // 组件实例化，但节点树还未导入，因此这时不能用setData
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
        // 处理小程序 ready 生命周期
        this.$nextTick(() => this.ready());
    },
    move: function () {
        // 组件实例被移动到树的另一个位置
    },
    destroyed: function () {
        // 在组件实例被从页面节点树移除时执行
    },
    /**
     * 组件的方法列表
     */
    methods: {
        async handlePageShow() {
            // 页面被展示
            if (!this.isCache || !PublicBiz.isCacheList(this.type)) {
                // 非缓存状态下或者 list缓存过期下加载
                await this.getListFun(1);
            }
        },

        handlePageHide() {},
        handlePageResize(size) {},

        ready: async function () {
            // 组件布局完成，这时可以获取节点信息，也可以操作节点

            if (this.isCache) {
                //缓存状态下加载
                await this.getListFun(1);
            }
        },

        attached: function () {},

        reload: async function () {
            await this.getListFun(1);
        },

        // 数据列表
        getListFun: async function (page) {
            this.setData({
                isLoadClone: false
            });
            let params = {
                page: page,
                ...this._params
            };
            if (page == 1 && !this._dataList) {
                this.$emit('list', {
                    detail: {
                        dataList: null //第一页面且没有数据提示加载中
                    }
                });
            }

            let opt = {};
            //if (this.data._dataList && this.data._dataList.list && this.data._dataList.list.length > 0)
            opt.title = 'bar';
            await cloudHelper.dataList(this, '_dataList', this.route, params, opt);
            this.setData({
                isLoadClone: true
            });
            this.$emit('list', {
                detail: {
                    //TODO 考虑改为双向数据绑定model
                    dataList: this._dataList
                }
            });
            if (this.isCache) {
                PublicBiz.setCacheList(this.type);
            }
            if (page == 1) {
                this.bindTopTap();
            }
        },

        bindReachBottom: async function () {
            // 上拉触底
            await this.getListFun(this._dataList.page + 1);
        },

        bindPullDownRefresh: async function () {
            // 下拉刷新
            this.setData({
                refresherTriggered: true
            });
            await this.getListFun(1);
            this.setData({
                refresherTriggered: false
            });
        },

        /**
         * 顶部位置
         * @param {*} e
         */
        bindScrollTop: function (e) {
            if (e.detail.scrollTop > 100) {
                this.setData({
                    topShow: true
                });
            } else {
                this.setData({
                    topShow: false
                });
            }
        },

        /**
         * 一键回到顶部
         */
        bindTopTap: function () {
            this.setData({
                topNum: 0
            });
        }
    },
    watch: {
        isLoad: {
            handler: function (newVal, oldVal) {
                this.isLoadClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
.scroll-view {
    height: 100vh;
}
</style>
