<template>
    <view class="cal-container">
        <view class="cal-main">
            <view class="text-center cal-nav">
                <view class="to-now" @tap="bindToNowTap">本月</view>
                <view class="select-item">
                    <view class="arrow" @tap="bindLastTap"><text class="icon-back" /></view>
                    <view class="text-lg">{{ year }}年{{ month }}月</view>
                    <view class="arrow" @tap="bindNextTap"><text class="icon-right" /></view>
                </view>
                <block v-if="mode == 'one'">
                    <view v-if="!fold" class="fold" @tap="bindFoldTap"><text class="icon-fold"></text></view>
                    <view v-if="fold" class="fold" @tap="bindFoldTap"><text class="icon-unfold"></text></view>
                </block>
            </view>

            <view class="cal-title">
                <view class="cal-title-view">一</view>
                <view class="cal-title-view">二</view>
                <view class="cal-title-view">三</view>
                <view class="cal-title-view">四</view>
                <view class="cal-title-view">五</view>
                <view class="cal-title-view text-orange">六</view>
                <view class="cal-title-view text-red">日</view>
            </view>
            <view :class="'cal-center ' + (!fold ? 'cur' : '') + ' '">
                <!-- 单击begin -->
                <view
                    v-if="
                        mode == 'one' &&
                        ((weekNo > 0 && item.weekNo == weekNo && utils.compareYearMonth(oneDoDay, year, month)) ||
                            (item.weekNo == 1 && !utils.compareYearMonth(oneDoDay, year, month)) ||
                            !fold)
                    "
                    :data-fullday="item.full"
                    :class="'cube ' + (isLunar ? 'lunar' : '') + ' '"
                    @tap="bindDayOneTap"
                    v-for="(item, index) in dayArr"
                    :key="index"
                >
                    <view :class="'num-grid  ' + (fullToday == item.full ? 'now-day-cur' : '') + '  ' + (oneDoDay == item.full ? 'calendar-bg text-white shadow ' : '') + ' '">
                        <view :class="'num  ' + (!item.curMonth ? 'text-no-month' : '')">
                            <text class="dd data-has" v-if="tools.includes(hasDays, item.full)">{{ item.show }}</text>
                            <text class="dd" v-else>{{ item.show }}</text>
                            <text v-if="isLunar" :class="'lunar ' + (oneDoDay == item.full ? 'text-white' : '') + ' ' + (item.holiday ? 'text-red' : '')">{{ item.lunar }}</text>
                        </view>
                    </view>
                </view>
                <!-- 单击END -->

                <!-- 多选begin -->
                <view
                    v-if="mode == 'multi'"
                    :data-fullday="item.full"
                    :class="'cube ' + (isLunar ? 'lunar' : '')"
                    @tap="bindDayMultiTap"
                    v-for="(item, index) in dayArr"
                    :key="index"
                >
                    <view
                        :class="
                            'num-grid  ' +
                            (fullToday == item.full ? 'now-day-cur' : '') +
                            '  ' +
                            (tools.includes(multiDoDay, item.full) ? 'calendar-bg text-white data-checked' : '') +
                            ' '
                        "
                    >
                        <view :class="'num  ' + (!item.curMonth ? 'text-no-month' : '') + ' '">
                            <text class="dd data-has" v-if="tools.includes(hasDays, item.full)">{{ item.show }}</text>
                            <text class="dd" v-else>{{ item.show }}</text>
                            <text v-if="isLunar" :class="'lunar ' + (tools.includes(multiDoDay, item.full) ? 'text-white' : '') + ' ' + (item.holiday ? 'text-red' : '')">
                                {{ item.lunar }}
                            </text>
                        </view>
                    </view>
                </view>
                <!-- 多选END -->
            </view>
        </view>
    </view>
</template>
<script module="tools" lang="wxs" src="@/tpls/wxs/tools.wxs"></script>
<script module="utils" lang="wxs">
// 比较操作日期所在月是否当前显示的月
function compareYearMonth(oneDoDay, year, month) {
	var arr = oneDoDay.split('-');
	return arr[0] == year && arr[1] == month;
}

module.exports = {
	compareYearMonth: compareYearMonth,
};
</script>
<script>
const timeHelper = require('../../../../helper/time_helper.js');
const pageHelper = require('../../../../helper/page_helper.js');
const calendarLib = require('../calendar_lib.js');

/*#### 父组件日历颜色定义*/
/* 整体颜色 */
//--calendarPageColor: #F0F4FF;
/* 加重颜色*/
//--calendarMainColor: #388AFF;
/* 加重的亮颜色 用于选中日期的数据小圆点 */
//--calendarLightColor: #A2C7FF;

export default {
    data() {
        return {
            weekNo: 0,

            // 正在操作的那天位于第几周
            //今天
            fullToday: 0,

            dayArr: []
        };
    },
    options: {
        addGlobalClass: true
    },
    props: {
        isLunar: {
            //是否开启农历
            type: Boolean,
            default: true
        },
        mode: {
            // 模式 one/multi
            type: String,
            default: 'one'
        },
        year: {
            // 正在操作的年
            type: Number,
            default: 0
        },
        month: {
            // 正在操作的月
            type: Number,
            default: 0
        },
        fold: {
            //日历折叠
            type: Boolean,
            default: false
        },
        selectTimeout: {
            //过期时间选择(mode=multi)
            type: Boolean,
            default: true
        },
        selectTimeoutHint: {
            //过期时间选择提示(mode=multi)
            type: String,
            default: '不能选择过去的日期'
        },
        hasDays: {
            // 有数据的日期
            type: Array,

            default: () => []
        },
        oneDoDay: {
            // 正在操作的天  string
            type: String,
            default: null
        },
        multiDoDay: {
            // 多选模式>正在操作的天 arrary[]
            type: Array,
            default: () => []
        },
        multiOnlyOne: {
            //多选模式>只能选一个
            type: Boolean,
            default: false
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    methods: {
        attached() {
            this.initFun();
        },

        initFun: function () {
            calendarLib.getNowTime(this);
            calendarLib.createDay(this);
        },

        bindFoldTap: function (e) {
            // 日历折叠
            calendarLib.bindFoldTap(this);
        },

        bindNextTap(e) {
            // 下月
            calendarLib.bindNextTap(this);
        },

        bindLastTap(e) {
            // 上月
            calendarLib.bindLastTap(this);
        },

        bindDayOneTap(e) {
            // 单个天点击
            let day = e.currentTarget.dataset.fullday;
            let now = timeHelper.time('Y-M-D');
            if (day < now) {
                return pageHelper.showNoneToast('已过期', 1000);
            }
            calendarLib.bindDayOneTap(e, this);
        },

        bindDayMultiTap(e) {
            // 多选天点击
            // 过期时间判断
            if (!this.selectTimeout) {
                let day = e.currentTarget.dataset.fullday;
                let now = timeHelper.time('Y-M-D');
                if (day < now) {
                    return pageHelper.showNoneToast(this.selectTimeoutHint);
                }
            }
            calendarLib.bindDayMultiTap(e, this);
        },

        bindToNowTap: function (e) {
            // 回本月
            calendarLib.bindToNowTap(this);
        },

        // ListTouch触摸开始
        listTouchStart(e) {
            pageHelper.listTouchStart(e, this);
        },

        // ListTouch计算方向
        listTouchMove(e) {
            pageHelper.listTouchMove(e, this);
        },

        /** ListTouch计算滚动 */
        listTouchEnd: function (e) {
            calendarLib.listTouchEnd(this);
        }
    },
    created: function () {},
    watch: {
        hasDays: {
            handler: function (newVal, oldVal) {
                if (newVal.length != oldVal.length) {
                    // TODO 引起加载的时候二次调用
                    //this._init();
                }
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
@import './din.css';

page {
    /*#### 父组件日历颜色定义*/
    --calendarPageColor: #fff;
    /* 加重颜色*/
    --calendarMainColor: #1f6ed4;
    /* 加重的亮颜色 用于选中日期的数据小圆点 */
    --calendarLightColor: #a2c7ff;
}

.calendar-text {
    color: var(--calendarMainColor) !important;
}

.calendar-bg {
    background-color: var(--calendarMainColor) !important;
}

.cal-container {
    width: 100%;
    padding-bottom: 10rpx;
    background-color: var(--calendarPageColor);
}

.cal-container .cal-nav {
    position: relative;
    width: 100%;
    min-height: 80rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 20rpx;
    color: #666;
    font-weight: bold;
    background-color: #f8f8f8;
}

.cal-container .cal-nav .select-item {
    width: 500rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.cal-container .cal-nav .arrow {
    width: 150rpx;
    font-size: 40rpx;
}

.cal-container .cal-nav .fold {
    position: absolute;
    right: 0rpx;
    width: 100rpx;
    font-size: 40rpx;
    font-weight: bold;
}

.cal-container .cal-nav .to-now {
    position: absolute;
    left: 5rpx;
    width: 100rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cal-main {
    width: 100%;
    padding: 0rpx 0rpx;
}

.cal-title {
    display: flex;
    width: 100%;
    border-bottom: 2rpx dashed #ccc;
    background-color: #f8f8f8;
}

.cal-title .cal-title-view {
    width: 14.28%;
    height: 70rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 32rpx;
    font-weight: bold;
}

.cal-center {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}

.cal-center .cube {
    width: 14.28%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cal-center .cube.lunar {
    margin-bottom: 0rpx;
}

.cal-center .num-grid {
    min-width: 70rpx;
    height: 70rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    margin-bottom: 2rpx;
    border-radius: 10rpx;
}

.cal-center .cube.lunar .num-grid {
    width: 70rpx;
    height: 90rpx;
}

.cal-center .num-grid.now-day-cur {
    background-color: #fadbd9;
    color: orangered;
    font-weight: bold;
}

.cal-center .num-grid.now-day-cur.calendar-bg {
    color: #fbbd08 !important;
}

.cal-center .num {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    font-family: 'din';
}

.cal-center .num .lunar {
    font-size: 20rpx;
    font-weight: normal;
    color: #aaa;
}

.cal-center .text-no-month {
    color: #333;
    opacity: 0.5;
}

.cal-center .calendar-bg .text-no-month {
    color: #ccc;
    opacity: 1;
}

/* 当日有数据 */
.data-has {
    position: relative;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.data-has::before {
    position: absolute;
    content: '';
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    background-color: var(--calendarMainColor);
    right: -16rpx;
    top: 14rpx;
}

.calendar-bg .data-has::before {
    background-color: var(--calendarLightColor);
}

/* 选中某日 */
.cube .data-checked {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cube .data-checked::before {
    position: absolute;
    content: '';
    width: 17rpx;
    height: 17rpx;
    transform: rotate(45deg);
    border-right: 3rpx solid #fff;
    border-bottom: 3rpx solid #fff;
    bottom: 13rpx;
}

.cube.lunar .data-checked::before {
    bottom: 38rpx;
}
</style>
