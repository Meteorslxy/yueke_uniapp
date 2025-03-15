<template>
    <view>
        <view class="top_bar bar search fixed flex-direction" v-if="isTotalMenu" :style="!showSearch ? 'min-height:80rpx' : ''">
            <!-- search form BEGIN -->
            <view v-if="showSearch" class="bar search bg-white" style="width: 100%">
                <view class="search-date" v-if="doDate">
                    <!-- <view class="date-title">日期:</view> -->
                    <!-- 时间段 -->
                    <view class="date-group">
                        <picker mode="date" v-model="startDateClone" class="search-date-picker">
                            <view class="picker">
                                <text :class="!startDateClone ? 'text-line1' : 'text-line2'">{{ startDateClone || '开始日期' }}</text>
                            </view>
                        </picker>
                        <text class="text-line1">~</text>
                        <picker mode="date" v-model="endDateClone">
                            <view class="picker">
                                <text :class="!endDateClone ? 'text-line1' : 'text-line2'">{{ endDateClone || '结束日期' }}</text>
                            </view>
                        </picker>
                    </view>
                    <view @tap="bindDateSearchTap" class="date-btn btn mid bg-gray margin-left-xs" style="width: 130rpx">搜索</view>
                    <view @tap="bindDateClearTap" class="date-btn btn mid bg-grey light margin-left-xs" style="width: 130rpx">清空</view>
                </view>
                <view class="search-date" v-else-if="doMonth">
                    <!-- <view class="date-title">日期:</view> -->
                    <!-- 时间段 -->
                    <view class="date-group">
                        <picker mode="date" fields="month" v-model="startDateClone" class="search-date-picker">
                            <view class="picker">
                                <text :class="!startDateClone ? 'text-line1' : 'text-line2'">{{ startDateClone || '开始月份' }}</text>
                            </view>
                        </picker>
                        <text class="text-line1">~</text>
                        <picker mode="date" fields="month" v-model="endDateClone">
                            <view class="picker">
                                <text :class="!endDateClone ? 'text-line1' : 'text-line2'">{{ endDateClone || '结束月份' }}</text>
                            </view>
                        </picker>
                    </view>
                    <view @tap="bindDateSearchTap" class="date-btn btn mid bg-gray margin-left-xs" style="width: 130rpx">搜索</view>
                    <view @tap="bindDateClearTap" class="date-btn btn mid bg-grey light margin-left-xs" style="width: 130rpx">清空</view>
                </view>
                <slot name="searchStart" />
                <view class="search-form round" v-if="!doDate && !doMonth">
                    <text class="icon-search text-l text-grey"></text>
                    <input type="text" maxlength="30" :value="searchClone" :placeholder="placeholder" :disabled="true" @tap="bindSearchTap" />
                    <view v-if="searchClone" class="text-xl" @tap="bindSearchClearTap">
                        <text class="icon-roundclose text-right text-gray"></text>
                    </view>
                </view>
                <slot name="searchEnd" />
            </view>
            <!-- search form END -->

            <!-- sort begin -->
            <view class="tabs bg-white" style="width: 100%; padding: 0 20rpx" v-if="sortItems.length || sortMenus.length">
                <!-- pulldown menu begin -->
                <view
                    @tap="bindSortTap"
                    :class="'tab ' + (sortIndex == index ? 'text-orange cur  ' : '') + ' '"
                    :data-index="index"
                    v-for="(item, index) in sortItems"
                    :key="index"
                >
                    <text class="pulldown-text">{{ index == sortIndex && item.items[sortItemIndex] ? item.items[sortItemIndex].label : item.items[0].label }}</text>

                    <text :class="'icon-' + (item.show ? 'fold' : 'unfold') + ' large text-black'"></text>
                </view>
                <!-- pulldown menu end -->

                <!-- sort menu begin -->
                <scroll-view scroll-left="0" :scroll-x="true" style="white-space: nowrap; width: 100%; overflow: scroll">
                    <view
                        @tap="bindSortTap"
                        :class="
                            'list-scroll-view tab tab-menu ' +
                            (sortIndex == index + 5 || (sortMenusDefaultIndexClone == index && !searchClone && sortIndex == -1) ? 'text-orange cur ' : '') +
                            '  '
                        "
                        :data-index="index + 5"
                        v-for="(item, index) in sortMenus"
                        :key="index"
                    >
                        {{ item.label }}
                    </view>
                    <!-- <text class="icon-filter" style="position: fixed;right: 10rpx;padding-left:10rpx;background-color: #fff;"></text> -->
                </scroll-view>
                <!-- sort menu end -->

                <slot name="menuEnd" />

                <!-- pulldown detail [LIST] begin -->
                <block v-if="pulldownType[index] == 'list'" v-for="(item, index) in sortItems" :key="index">
                    <view class="sort" @touchmove.stop.prevent="move" @tap="bindSortItemTap" v-if="item.show">
                        <scroll-view class="pulldown-scroll-view" :scroll-y="true" :scroll-into-view="'pulldown-' + sortIndex + '-' + (sortItemIndex - 9)">
                            <view
                                :id="'pulldown-' + index + '-' + idx"
                                :class="'sort-item  ' + (idx == sortItemIndex && index == sortIndex ? 'text-orange cur' : '') + '  '"
                                :data-idx="idx"
                                v-for="(its, idx) in item.items"
                                :key="idx"
                            >
                                <text v-if="idx == 0">全部</text>

                                {{ its.label }}
                            </view>
                        </scroll-view>
                    </view>
                </block>
                <!-- pulldown detail [LIST] end -->
            </view>
            <!-- sort end -->
        </view>

        <!-- content begin -->
        <view v-if="!isTotalMenu" class="box-list" :style="'height:' + (listHeight ? listHeight : '(100vh)') + ';margin-top:0rpx;'">
            <scroll-view
                :refresher-enabled="true"
                :refresher-triggered="refresherTriggered"
                :scroll-y="true"
                class="box-list-scroll"
                @refresherrefresh="bindPullDownRefresh"
                @scrolltolower="bindReachBottom"
                :scroll-top="topNum"
                @scroll="bindScrollTop"
            >
                <slot />
            </scroll-view>
        </view>

        <!-- 带搜索框 -->
        <view
            v-if="isTotalMenu && showSearch"
            class="box-list"
            :style="
                'height:calc(100vh - ' +
                (!sortItems.length && !sortMenus.length ? '110' : '190') +
                'rpx);margin-top:' +
                (!sortItems.length && !sortMenus.length ? '110' : '190') +
                'rpx'
            "
        >
            <scroll-view
                :refresher-enabled="true"
                :refresher-triggered="refresherTriggered"
                :scroll-y="true"
                class="box-list-scroll"
                @refresherrefresh="bindPullDownRefresh"
                @scrolltolower="bindReachBottom"
                :scroll-top="topNum"
                @scroll="bindScrollTop"
            >
                <slot />
            </scroll-view>
        </view>
        <!-- 不带搜索框 -->
        <view
            v-if="isTotalMenu && !showSearch"
            class="box-list"
            :style="
                'height:calc(100vh - ' +
                (!sortItems.length && !sortMenus.length ? '50' : '80') +
                'rpx);margin-top:' +
                (!sortItems.length && !sortMenus.length ? '50' : '80') +
                'rpx'
            "
        >
            <scroll-view
                :refresher-enabled="true"
                :refresher-triggered="refresherTriggered"
                :scroll-y="true"
                class="box-list-scroll"
                @refresherrefresh="bindPullDownRefresh"
                @scrolltolower="bindReachBottom"
                :scroll-top="topNum"
                @scroll="bindScrollTop"
            >
                <slot />
            </scroll-view>
        </view>
        <!-- content END -->

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

        <!-- pulldown detail [modal] begin -->
        <block v-if="pulldownType[index] == 'modal'" v-for="(item, index) in sortItems" :key="index">
            <view class="modal bottom-modal show" v-if="item.show">
                <view class="dialog">
                    <view class="bar bg-white">
                        <view class="action text-blue" @tap="bindSortTap" :data-index="index">取消</view>
                        <view class="action text-green" style="font-size: 30rpx" @tap="bindSortTap" :data-index="index">确定</view>
                    </view>
                    <view class="grid col-3 padding-sm" style="margin-bottom: 120rpx">
                        <view class="padding-xs" v-for="(its, idx) in item.items" :key="idx">
                            <button
                                @tap="bindSortItemTap"
                                :data-idx="idx"
                                :class="'pulldown-btn btn lg block ' + (idx == sortItemIndex && index == sortIndex ? 'bg-orange light border-orange' : '')"
                                :data-value="item.value"
                            >
                                <text v-if="idx == 0">全部</text>
                                {{ its.label }}
                            </button>
                        </view>
                    </view>
                </view>
            </view>
        </block>
        <!-- pulldown detail [modal] END -->

        <!-- ### MASK ### -->
        <view class="pulldown-mask" v-if="pulldownMaskShow"></view>
    </view>
</template>

<script>
const cloudHelper = require('../../../helper/cloud_helper.js');
const helper = require('../../../helper/helper.js');
const PublicBiz = require('../../../comm/biz/public_biz.js');
const pageHelper = require('../../../helper/page_helper.js');
export default {
    data() {
        return {
            refresherTriggered: false,

            //下拉刷新是否完成

            sortItems: [],

            //下拉
            sortMenus: [],

            //一级菜单非下拉

            sortType: '',

            //回传的类型
            sortVal: '',

            //	回传的值

            sortItemIndex: -1,

            sortIndex: -1,
            topNum: 0,

            //回顶部
            topShow: false,

            //下拉菜单遮罩
            pulldownMaskShow: false,

            sortMenusDefaultIndexClone: 0,
            startDateClone: '',
            endDateClone: '',
            searchClone: ''
        };
    },
    options: {
        addGlobalClass: true,
        pureDataPattern: /^_dataList/,
        // 指定所有 _ 开头的数据字段为纯数据字段
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    props: {
        doMonth: {
            type: Boolean,
            default: false
        },
        doDate: {
            type: Boolean,
            default: false
        },
        listHeight: {
            // 列表区高度
            type: String,
            default: ''
        },
        route: {
            // 业务路由
            type: String,
            default: ''
        },
        source: {
            // 来源 admin/user
            type: String,
            default: 'user'
        },
        _params: {
            // 路由的附加参数
            type: Object,

            default: null
        },
        isTotalMenu: {
            type: Boolean,
            //是否整个搜索+菜单显示
            default: true
        },
        showSearch: {
            type: Boolean,
            //是否整个搜索框
            default: true
        },
        _items: {
            // 下拉菜单基础数据
            type: Array,

            default: () => []
        },
        _menus: {
            // 非下拉菜单基础数据
            type: Array,

            default: () => []
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
        placeholder: {
            type: String,
            default: '搜索关键字'
        },
        sortMenusDefaultIndex: {
            type: Number,
            default: -1 //横菜单默认选中的
        },

        search: {
            type: String,

            //搜索框关键字
            default: ''
        },
        whereEx: {
            type: Object,
            // 附加查询条件
            default: null
        },
        returnUrl: {
            type: String,
            // 搜索完返回页面
            default: ''
        },
        topBottom: {
            type: String,
            // 回顶部按钮的位置
            default: '50'
        },
        isCache: {
            // 非缓存状态下或者list缓存过期下onshow加载, 缓存下onload加载
            type: Boolean,
            //是否cache
            default: true
        },
        pulldownType: {
            type: Array,
            // 下拉菜单展示模式 list/modal 每个菜单一个
            default: () => ['list', 'list', 'list', 'list', 'list', 'list']
        },
        startDate: {
            type: String,
            default: ''
        },
        endDate: {
            type: String,
            default: ''
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
            this.fmtSearchDataFun();
            if (this.isCache) {
                //缓存状态下加载
                await this.getListFun(1);
            }

            //取得预置参数_params的选中状态
            let params = this._params;
            if (params && params.sortType && helper.isDefined(params.sortVal)) {
                let sortMenus = this._menus;
                for (let k = 0; k < sortMenus.length; k++) {
                    if (params.sortType == sortMenus[k].type && params.sortVal == sortMenus[k].value) {
                        this.setData({
                            //sortType: sortMenus[k].type,
                            //sortVal: sortMenus[k].value,
                            sortMenusDefaultIndexClone: k
                        });
                        break;
                    }
                }
            }
        },

        attached: function () {},

        reload: async function () {
            await this.getListFun(1);
        },

        // 数据列表
        getListFun: async function (page) {
            let params = {
                page: page,
                ...this._params
            };
            if (this.whereEx) {
                params.whereEx = this.whereEx;
            }

            // 搜索关键字
            if (this.search) {
                params.search = this.search;
            }

            // 日期or月份模式
            if ((this.doDate || this.doMonth) && this.startDate && this.endDate) {
                params.search = this.startDate + '#' + this.endDate;
            }

            // 搜索菜单
            if (this.sortType && helper.isDefined(this.sortVal)) {
                params.sortType = this.sortType;
                params.sortVal = this.sortVal;
            }

            //if (page == 1 && !this.data._dataList) { TODO???
            if (page == 1) {
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
            this.$emit('list', {
                detail: {
                    //TODO 考虑改为双向数据绑定model
                    sortType: this.sortType,
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

        bindReachBottom: function () {
            // 上拉触底
            this.getListFun(this._dataList.page + 1);
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
        },

        // 初始化搜索
        fmtSearchDataFun: function () {
            let data = {};
            let sortItems = [];
            let items = this._items;
            for (let k = 0; k < items.length; k++) {
                let item = {
                    show: false,
                    items: items[k]
                };
                sortItems.push(item);
            }
            data.sortItems = sortItems;
            data.sortMenus = this._menus;
            data.sortItemIndex = -1;
            data.sortIndex = -1;
            data.sortType = '';
            data.sortVal = '';
            this.setData(data);
        },

        /**
         * 清除搜索条件
         */
        bindSearchClearTap: function () {
            // 请求父页面清空搜索
            if (this.search) {
                this.$emit('list', {
                    detail: {
                        search: ''
                    }
                });
            }
        },

        // 分类&排序一级菜单选择
        bindSortTap: function (e) {
            let sortIndex = e.currentTarget.dataset.index;
            let sortItems = this.sortItems;

            // 横菜单默认选中取消 TODO
            /*
    this.setData({
      sortMenusDefaultIndex: -1
    });*/

            // 换了下拉菜单
            let sortItemIndex = sortIndex != this.sortIndex ? -1 : this.sortItemIndex;
            if (sortIndex < 5) {
                let pulldownMaskShow = this.pulldownMaskShow;

                // 有下拉
                for (let i = 0; i < sortItems.length; i++) {
                    if (i != sortIndex) {
                        sortItems[i].show = false;
                    } else {
                        sortItems[i].show = !sortItems[i].show;
                        pulldownMaskShow = sortItems[i].show;
                    }
                }
                this.setData({
                    pulldownMaskShow,
                    //遮罩

                    sortItems,
                    sortIndex,
                    sortItemIndex
                });
            } else {
                //无下拉
                for (let i = 0; i < sortItems.length; i++) {
                    sortItems[i].show = false;
                }
                this.setData({
                    pulldownMaskShow: false,
                    sortItems,
                    sortIndex,
                    sortItemIndex
                });
                this.getSortKeyFun();
            }
        },

        /**
         * 下拉菜单选择
         */
        bindSortItemTap: function (e) {
            let sortItemIndex = e.target.dataset.idx;
            if (!sortItemIndex) {
                sortItemIndex = 0;
            } // #46
            let sortItems = this.sortItems;
            for (let i = 0; i < sortItems.length; i++) {
                sortItems[i].show = false;
            }
            this.setData({
                pulldownMaskShow: false,
                sortItemIndex,
                sortItems
            });
            this.getSortKeyFun();
        },

        // 获得排序关键字
        getSortKeyFun: function () {
            let sortVal = '';
            let sortType = '';
            let oldSortVal = this.sortVal;
            let oldSortType = this.sortType;
            if (this.sortIndex < 5) {
                sortVal = this.sortItems[this.sortIndex].items[this.sortItemIndex].value;
                sortType = this.sortItems[this.sortIndex].items[this.sortItemIndex].type;
            } else {
                sortVal = this.sortMenus[this.sortIndex - 5].value;
                sortType = this.sortMenus[this.sortIndex - 5].type;
            }
            this.setData({
                sortVal,
                sortType
            });
            if (sortVal != oldSortVal || sortType != oldSortType) {
                // 点击分类

                if (this.startDate || this.endDate) {
                    this.setData({
                        startDateClone: '',
                        endDateClone: ''
                    });
                }
                if (this.search) {
                    //清空搜索
                    this.$emit('list', {
                        detail: {
                            search: ''
                        }
                    });
                } else {
                    this.getListFun(1);
                }
            }
        },

        // 搜索跳转
        bindSearchTap: function (e) {
            uni.navigateTo({
                url: pageHelper.fmtURLByPID('/pages/search/search?source=' + this.source + '&type=' + this.type + '&returnUrl=' + this.returnUrl)
            });
        },

        getSortIndex: function () {
            //获得横向菜单
            return this.sortIndex;
        },

        setSortIndex: function (sortIndex) {
            //设置横向菜单
            this.setData({
                sortIndex
            });
        },

        bindDateStartChange(e) {
            this.setData({
                startDateClone: e.detail.value
            });
        },

        bindDateEndChange(e) {
            this.setData({
                endDateClone: e.detail.value
            });
        },

        bindDateSearchTap: function (e) {
            if (this.doDate) {
                if (!this.startDate.includes('-')) {
                    return pageHelper.showNoneToast('请选择开始日期');
                }
                if (!this.endDate.includes('-')) {
                    return pageHelper.showNoneToast('请选择结束日期');
                }
            } else if (this.doMonth) {
                if (!this.startDate.includes('-')) {
                    return pageHelper.showNoneToast('请选择开始月份');
                }
                if (!this.endDate.includes('-')) {
                    return pageHelper.showNoneToast('请选择结束月份');
                }
            }
            let search = this.startDate + '#' + this.endDate;
            this.setData({
                searchClone: search
            });
            this.getListFun(1);
        },

        bindDateClearTap: function (e) {
            this.setData({
                startDateClone: '',
                endDateClone: ''
            });
            if (this.search) {
                this.setData({
                    searchClone: ''
                });
            }
        },

        setParams: function (params) {
            // 通过外部一次性注入查询条件，不始终带着，如果是在组件传_params，则一直带着
            this.sortType = params.sortType;
            this.sortVal = params.sortVal;
            this.reload();
        },

        move() {
            console.log('占位：函数 move 未声明');
        }
    },
    watch: {
        _params: {
            handler: function (newVal, oldVal) {
                //TODO????
                if (!oldVal || !newVal) {
                    return;
                } //页面data里赋值会引起触发，除非在组件标签里直接赋值,或者提前赋值

                // 清空当前选择
                if (newVal) {
                    this.setData({
                        pulldownMaskShow: false //返回去遮罩
                    });

                    this.fmtSearchDataFun();
                }
                this._dataList = null;
                this.$emit('list', {
                    detail: {
                        //TODO 考虑改为双向数据绑定model
                        dataList: this._dataList
                    }
                });
                this.getListFun(1);
            },

            immediate: true,
            deep: true
        },

        _items: {
            handler: function (newVal, oldVal) {
                if (newVal) {
                    this.fmtSearchDataFun();
                }
            },

            immediate: true,
            deep: true
        },

        _menus: {
            handler: function (newVal, oldVal) {
                if (newVal) {
                    this.fmtSearchDataFun();
                } //置为纯数据字段则不触发
            },

            immediate: true,
            deep: true
        },

        search: {
            handler: function (newVal, oldVal) {
                this.searchClone = this.clone(this.search);
                // 清空当前选择
                if (newVal) {
                    this.setData({
                        pulldownMaskShow: false //返回去遮罩
                    });

                    this.fmtSearchDataFun();
                }
                this._dataList = null;
                this.$emit('list', {
                    detail: {
                        //TODO 考虑改为双向数据绑定model
                        dataList: this._dataList
                    }
                });
                this.getListFun(1);
            },

            immediate: true
        },

        sortMenusDefaultIndex: {
            handler: function (newVal, oldVal) {
                this.sortMenusDefaultIndexClone = newVal;
            },

            immediate: true
        },

        startDate: {
            handler: function (newVal, oldVal) {
                this.startDateClone = newVal;
            },

            immediate: true
        },

        endDate: {
            handler: function (newVal, oldVal) {
                this.endDateClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
/*sort*/
.tabs {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 28rpx;
    color: #aaa;
    height: 80rpx;
    line-height: 80rpx;
}

.tabs .tab {
    flex-grow: 1;
    text-align: center;
    position: relative;
    margin-right: 10rpx;
    font-size: 28rpx;
    color: #000;
}

.tabs .cur {
    font-weight: bold;
}

.tabs .tab-menu.cur:after {
    content: ' ';
    position: absolute;
    left: 50%;
    bottom: 0rpx;
    width: 50%;
    height: 6rpx;
    border-radius: 2rpx;
    background-color: orange;
    transform: translateX(-50%);
}

.tabs .icon {
    color: #000;
}

.sort {
    position: absolute;
    top: 178rpx;
    bottom: 0;
    width: 100%;
    background-color: rgba(188, 188, 188, 0.3);
    z-index: 999;
    left: 0;
}

.sort .sort-item {
    border-top: 1px solid #eee;
    height: 80rpx;
    line-height: 80rpx;
    padding-left: 50rpx;
    background-color: #fff;
}

/**头部*/
.top_bar {
    width: 100%;
}

.top_bar_scroll {
    position: fixed;
    top: 0rpx;
    left: 0;
    z-index: 99;
    background: #fff;

    z-index: 999;
}

.box-list {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
}

.box-list-scroll {
    flex: 1;
    height: 1px;
}

.top-button {
    position: fixed;
    bottom: 50rpx;
    right: 30rpx;
    opacity: 0.8;
}

.list-scroll-view {
    display: inline-block;
    padding: 0 10rpx;
}

.pulldown-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #999;
    top: 0;
    left: 0;
    opacity: 0.5;
}

.pulldown-scroll-view {
    height: 840rpx;
    width: 100%;
}

.pulldown-btn {
    font-size: 28rpx;
    color: #333 !important;
    height: 100rpx;
    width: 200rpx;
    line-height: 1.3;
    padding: 0 15rpx;
}

/* date */
.search-date {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 20rpx;
}

.search-date .date-title {
    font-size: 28rpx;
    margin-right: 8rpx;
}

.search-date .date-group {
    color: #888;
    border: 1rpx solid #a4a6ae;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5rpx 20rpx;
    font-size: 29rpx;
}

.search-date .text-line1 {
    color: #a4a6ae;
    margin: 0 18rpx;
}

.search-date .text-line2 {
    color: rgb(0, 0, 0, 0.8);
}

.search-date .search-date-picker {
    width: 150rpx;
}
</style>
