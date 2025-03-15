<template>
    <view class="date-cmpt">
        <view class="month">
            <view class="left">{{ month || '2022年' }}</view>
            <view v-if="isFresh" class="right" @tap="bindReloadTap">
                <text class="icon-refresh"></text>
                刷新
            </view>
        </view>
        <scroll-view scroll-x class="date-select" :scroll-into-view="toViewClone" :enable-flex="true">
            <view
                :id="'day-' + item.day"
                :class="'item ' + (item.day == selectedClone ? 'cur' : '')"
                @tap="bindTap"
                :data-day="item.day"
                :data-month="item.month"
                v-for="(item, index) in range"
                :key="index"
            >
                <view class="week">{{ item.week }}</view>

                <view class="date">{{ item.show }}</view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
const dataHelper = require('../../../../helper/data_helper.js');
const pageHelper = require('../../../../helper/page_helper.js');
const timeHelper = require('../../../../helper/time_helper.js');
export default {
    data() {
        return {
            range: [],
            month: '',
            selectedClone: '',
            toViewClone: ''
        };
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        start: {
            // 开始日期
            type: String,
            default: ''
        },
        end: {
            // 结束日期
            type: String
        },
        selected: {
            // 当前选中日期
            type: String
        },
        toView: {
            //跳转到的view
            type: String,
            val: ''
        },
        isFresh: {
            type: Boolean,
            val: false
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
            if (!this.selected) {
                this.setData({
                    selectedClone: timeHelper.time('Y-M-D')
                });
            } else {
                this.setData({
                    toViewClone: 'day-' + this.selected
                });
            }
            this.init();
        },

        attached: function () {},

        init: function () {
            let start = this.start;
            let end = this.end;
            if (!start) {
                start = timeHelper.time('Y-M-D');
            }
            if (!end) {
                end = timeHelper.time('Y-M-D', 1296000);
            }
            let range = [];
            let startTime = timeHelper.time2Timestamp(start);
            let endTime = timeHelper.time2Timestamp(end);
            for (let k = startTime; k <= endTime; ) {
                let day = timeHelper.timestamp2Time(k, 'Y-M-D');
                let month = timeHelper.timestamp2Time(k, 'Y年M月');
                let node = {
                    day,
                    show: this.fmtShowFun(day),
                    week: this.fmtWeekFun(day),
                    month
                };
                range.push(node);
                k += 86400000;
            }
            this.setData({
                range
            });
        },

        fmtShowFun: function (day) {
            return day.split('-')[2];
        },

        fmtWeekFun: function (day) {
            if (day == timeHelper.time('Y-M-D')) {
                return '今天';
            }
            day = timeHelper.week(day);
            day = day.replace('周', '');
            return day;
        },

        bindTap: function (e) {
            let selected = pageHelper.dataset(e, 'day');
            let month = pageHelper.dataset(e, 'month');
            this.setData({
                selectedClone: selected,
                month
            });
            this.$emit('select', {
                detail: selected
            });
        },

        bindReloadTap: function (e) {
            this.$emit('select', {
                detail: this.selected
            });
        }
    },
    created: function () {},
    watch: {
        end: {
            handler: function (newVal, oldVal) {
                this.init();
            },

            immediate: true
        },

        selected: {
            handler: function (newVal, oldVal) {
                this.selectedClone = this.clone(this.selected);
                if (newVal != oldVal) {
                    let month = timeHelper.timestamp2Time(timeHelper.time2Timestamp(newVal), 'Y年M月');
                    this.setData({
                        month
                    });
                }
            },

            immediate: true
        },

        toView: {
            handler: function (newVal, oldVal) {
                this.toViewClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
@import '../calendar_comm/din.css';

.date-cmpt {
    width: 100%;
}

.date-cmpt .month {
    width: 100%;
    padding: 10rpx 15rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.date-cmpt .month .left {
    font-size: 32rpx;
    color: #000;
    font-weight: bold;
    font-family: 'din';
}

.date-cmpt .month .right {
    font-size: 28rpx;
    color: #777;
    padding: 0 10rpx 0rpx 60rpx;
}

.date-select {
    white-space: nowrap;
}

.date-select .item {
    margin: 10rpx 10rpx 10rpx 0rpx;
    text-align: center;
    font-size: 24rpx;
    line-height: 55rpx;
    height: 110rpx;
    width: 85rpx;
    border: 2rpx solid #ddd;
    border-radius: 17rpx;
    display: inline-block;
}

.date-select .item:first-child {
    margin-left: 5rpx;
}

.date-select .item .date {
    font-size: 32rpx;
    color: #000;
    font-family: 'din';
}

.date-select .item .week {
    font-size: 24rpx;
    color: #666;
}

.date-select .item.cur {
    background-color: #f37445;
}

.date-select .item.cur .week,
.date-select .item.cur .date {
    color: #fff;
}
</style>
