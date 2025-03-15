<template>
    <view class="cal-container">
        <view @tap="bindLastTap" class="left"><text class="icon-back"></text></view>
        <view class="cal-main">
            <view class="text-center cal-nav">
                <view class="to-now" @tap="bindToNowTap">本月</view>
                <view class="select-item">
                    <!-- <view class="arrow text-grey" bindtap="bindLastTap"><text class="icon-backwardfill" /></view> -->
                    <view class="text-lg">{{ year }}年{{ month }}月</view>
                    <!-- <view class="arrow text-grey" bindtap="bindNextTap"><text class=" icon-play_forward_fill" /></view> -->
                </view>
                <block v-if="mode == 'one'">
                    <view v-if="!fold" class="fold text-grey" @tap="bindFoldTap"><text class="icon-fold calendar-text"></text></view>
                    <view v-if="fold" class="fold" @tap="bindFoldTap"><text class="icon-unfold calendar-text"></text></view>
                </block>
            </view>

            <view class="cal-title">
                <view>一</view>
                <view>二</view>
                <view>三</view>
                <view>四</view>
                <view>五</view>
                <view class="text-orange text-bold">六</view>
                <view class="text-red text-bold">日</view>
            </view>
            <view :class="'cal-center ' + (!fold ? 'cur' : '')">
                <!-- 多选begin -->
                <view
                    v-if="mode == 'multi'"
                    :data-fullday="item.full"
                    :class="
                        'cube ' +
                        glow +
                        ' ' +
                        (isLunar ? 'lunar' : '') +
                        ' ' +
                        (item.full < fullToday ? 'timeout' : '') +
                        ' ' +
                        (tools.includes(multiDoDay, item.full) ? 'calendar-bg text-white data-checked' : '') +
                        ' ' +
                        (tools.includes(hasDays, item.full) ? 'data-has' : '') +
                        ' ' +
                        (tools.includes(hasJoinDays, item.full) ? 'join-has' : '')
                    "
                    @tap="bindDayMultiTap"
                    v-for="(item, index) in dayArr"
                    :key="index"
                >
                    <view :class="'num-grid ' + (fullToday == item.full ? 'now-day-cur' : '') + ' '">
                        <view :class="'num ' + (!item.curMonth ? 'text-no-month' : '') + ' '">
                            <text class="dd">{{ item.show }}</text>
                            <text v-if="isLunar" :class="'lunar ' + (tools.includes(multiDoDay, item.full) ? 'text-white' : '') + ' ' + (item.holiday ? 'text-red' : '')">
                                {{ item.lunar }}
                            </text>
                        </view>
                    </view>
                </view>
                <!-- 多选END -->
            </view>
        </view>
        <view @tap="bindNextTap" class="left"><text class="icon-right"></text></view>
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
            fullToday: 0,

            //今天
            //闪烁效果
            glow: '',

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
            default: false
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
        hasDays: {
            // 过期有数据的日期
            type: Array,

            default: () => []
        },
        hasJoinDays: {
            // 未超期有预约的日期
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
            default: null
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
            this.setData({
                glow: 'glow'
            });
            setTimeout(() => {
                this.setData({
                    glow: ''
                });
            }, 800);
        },

        bindLastTap(e) {
            // 上月
            calendarLib.bindLastTap(this);
            this.setData({
                glow: 'glow'
            });
            setTimeout(() => {
                this.setData({
                    glow: ''
                });
            }, 300);
        },

        bindDayOneTap(e) {
            // 单个天点击
            calendarLib.bindDayOneTap(e, this);
        },

        bindDayMultiTap(e) {
            // 多选天点击
            let day = e.currentTarget.dataset.fullday;

            // 过期时间判断
            if (!this.selectTimeout) {
                let now = timeHelper.time('Y-M-D');
                if (day < now) {
                    return pageHelper.showNoneToast('不能编辑过往的日期');
                }
            }

            // 是否有预约判断
            if (this.hasJoinDays.includes(day)) {
                return pageHelper.showModal('该日期已有用户预约/预约待审核，不可直接取消；如果确要取消，请先删除有预约的时段');
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
page {
    /*#### 父组件日历颜色定义*/
    --calendarPageColor: #f0f4ff;
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
    padding-top: 10rpx;
    padding-bottom: 20rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
}

.cal-container .left,
.cal-container .right {
    width: 70rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80rpx;
    height: 400rpx;
    color: #888;
}

.cal-container .cal-nav {
    position: relative;
    width: 100%;
    min-height: 60rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #000;
    border-bottom-left-radius: 15rpx;
    border-bottom-right-radius: 15rpx;
    font-size: 32rpx;
    font-weight: bold;
}

.cal-container .cal-nav .select-item {
    width: 500rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
    font-size: 30rpx;
    color: var(--calendarMainColor);
    display: flex;
    align-items: center;
    justify-content: center;
}

.cal-main {
    flex: 1;
    padding: 10rpx 0rpx 20rpx;
    background-color: #fcfcfc;
}

.cal-title {
    display: flex;
    justify-content: center;
}

.cal-title view {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
}

.cal-center {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}

.cal-center.cur {
    border-bottom-right-radius: 0rpx;
    border-bottom-left-radius: 0rpx;
}

.cal-center .cube {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    border: 1rpx solid #ccc;
}

.cal-center .cube.glow {
    animation: glow 300ms linear 1 alternate;
}

@keyframes glow {
    0% {
        background-color: #ececec;
    }

    100% {
        background-color: inherit;
    }
}

.cal-center .cube.lunar {
    margin-bottom: 8rpx;
}

.cal-center .num-grid {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cal-center .cube.lunar .num-grid {
    width: 85rpx;
    height: 85rpx;
}

.cal-center .num-grid.now-day-cur {
    background-color: orange;
    height: 60rpx;
    width: 60rpx;
    border-radius: 50%;
    color: #fff;
}

.cal-center .num-grid.now-day-cur .text-no-month {
    color: #fff;
}

.cal-center .num {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
}

.cal-center .num .lunar {
    font-size: 20rpx;
    font-weight: normal;
    color: #aaa;
}

.cal-center .text-no-month {
    color: #aaa;
}

.cal-center .timeout {
    background-color: #f2f2f2;
}

.cal-center .timeout .num-grid {
    color: #aaa;
}

/* 当日有数据 */
.data-has {
    position: relative;
    font-family: 'icon';
    font-size: inherit;
    font-style: normal;
}

.data-has::before {
    position: absolute;
    content: '\e699';
    right: 1rpx;
    bottom: 0rpx;
    color: #999;
    font-size: 22rpx;
}

.cube.data-checked.data-has::before {
    color: #fff;
}

/* 当日有预约 */
.join-has {
    position: relative;
    font-family: 'icon';
    font-size: inherit;
    font-style: normal;
}

.join-has::before {
    position: absolute;
    content: '\e6c0';
    right: 1rpx;
    bottom: 0rpx;
    color: #999;
    font-size: 24rpx;
}

.cube.data-checked.join-has::before {
    color: #fff;
}

/* 选中某日 */
.cube.data-checked {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff !important;
}

.cube.data-checked .text-no-month {
    color: #fff !important;
}
</style>
