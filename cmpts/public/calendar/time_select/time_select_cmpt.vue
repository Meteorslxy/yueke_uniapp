<template>
    <view>
        <view class="time-table">
            <view class="table-inner">
                <view class="list">
                    <view @tap="bindSelectTap" class="item" :data-idx="index" v-for="(item, index) in times" :key="index">
                        <view :class="'left ' + (item.title ? 'top' : '')">{{ item.title }}</view>

                        <view
                            :class="
                                'right ' +
                                (item.selected ? 'selected' : '') +
                                '  ' +
                                (item.start == selectedStart ? 'selected-first' : '') +
                                ' ' +
                                (item.expire ? 'expire' : '') +
                                ' ' +
                                (item.used ? 'used' : '') +
                                '  ' +
                                (item.usedFirst ? 'used-first' : '') +
                                ' text-cut'
                            "
                        >
                            {{ item.usedText }}
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view style="height: 150rpx"></view>
        <view @tap="bindSumbitTap" v-if="selectedStart && selectedEnd && selectedEndPoint" class="time-submit safe-bottom">
            <view class="inner bg-project">确认预约 ({{ selectedStart }}~{{ selectedEndPoint }})</view>
        </view>
    </view>
</template>

<script>
const dataHelper = require('../../../../helper/data_helper.js');
const pageHelper = require('../../../../helper/page_helper.js');
const timeHelper = require('../../../../helper/time_helper.js');
export default {
    data() {
        return {
            times: [],

            //时间段 48个

            selectedStart: '',

            selectedEnd: '',
            selectedEndPoint: '',
            dayClone: ''
        };
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        day: {
            type: String,
            default: '' // 当前日期
        },

        startTimeStep: {
            type: Number,
            default: 0 // 开始时间，把每天划分为48个时间段
        },

        endTimeStep: {
            type: String,
            default: 47 // 结束时间，把每天划分为48个时间段
        },

        used: {
            // 已选择
            type: Array,
            default: () => [] // {title,start,end,url=支持true或者跳转地址}
        },

        usedPos: {
            // 已约的标题位置 first / mid
            type: String,
            default: 'first'
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
            this.init();
        },

        attached: function () {},

        init: function () {
            let now = timeHelper.time('Y-M-D h:m');
            let times = this.times;
            let day = this.day;
            if (!day) {
                day = timeHelper.time('Y-M-D');
            }
            this.setData({
                dayClone: day
            });

            // 初始化
            if (times == 0) {
                for (let k = this.startTimeStep; k <= this.endTimeStep; k++) {
                    let start = '';
                    let end = '';
                    let title = '';
                    let clock = Math.trunc(k / 2);
                    if (k % 2 == 0) {
                        start = dataHelper.padLeft(clock, 2, '0') + ':00';
                        end = dataHelper.padLeft(clock, 2, '0') + ':30';
                        title = start;
                    } else {
                        start = dataHelper.padLeft(clock, 2, '0') + ':30';
                        end = dataHelper.padLeft(clock + 1, 2, '0') + ':00';
                        title = '';
                    }
                    if (end == '24:00') {
                        end = '23:59';
                    }
                    let node = {
                        idx: k,
                        title,
                        start,
                        end,
                        used: false,
                        selected: false,
                        expire: day + ' ' + start < now //过期时间
                    };

                    times.push(node);
                }
            }

            // 已约时间段
            for (let k = 0; k < this.used.length; k++) {
                let usedNode = this.used[k];

                // 计算有占有几个时间段
                let usedlen = 0;
                for (let j = 0; j < times.length; j++) {
                    let node = times[j];
                    if (node.start >= usedNode.start && node.start <= usedNode.end) {
                        usedlen++;
                    }
                }
                if (usedlen <= 1) {
                    usedlen = 2;
                }
                usedlen = Math.round(usedlen / 2);
                if (this.usedPos == 'first') {
                    usedlen = 1;
                }
                let curLen = 0;
                for (let j = 0; j < times.length; j++) {
                    let node = times[j];
                    if (node.start == usedNode.start) {
                        node.used = usedNode.url || 'no';
                        node.usedFirst = true;
                        curLen++;
                        if (curLen == usedlen) {
                            node.usedText = usedNode.title;
                        }
                    } else if (node.start >= usedNode.start && node.start <= usedNode.end) {
                        node.used = usedNode.url || 'no';
                        node.usedFirst = false;
                        curLen++;
                        if (curLen == usedlen) {
                            node.usedText = usedNode.title;
                        }
                    }
                }
            }
            this.setData({
                times
            });
        },

        bindSelectTap: function (e) {
            //  选择
            let idx = pageHelper.dataset(e, 'idx');
            let timeNode = this.times[idx];
            let selected = timeNode.start;

            // 已选择
            let used = timeNode.used;
            if (used) {
                if (used === true) {
                    return;
                } else {
                    return uni.navigateTo({
                        url: used // 跳到详细
                    });
                }
            }

            // 过期
            let expire = timeNode.expire;
            if (expire) {
                return;
            }
            let selectedStart = this.selectedStart;
            let selectedEnd = this.selectedEnd;
            let times = this.times;

            // 区间内直接干掉
            if (selected >= selectedStart && selected <= selectedEnd) {
                selectedStart = '';
                selectedEnd = '';
                for (let k = 0; k < times.length; k++) {
                    times[k].selected = false;
                }
                this.setData({
                    times,
                    selectedStart,
                    selectedEnd
                });
                return;
            }
            if (!selectedStart && !selectedEnd) {
                selectedStart = selected;
                selectedEnd = selected;
            }
            if (selected < selectedStart) {
                selectedStart = selected;
            }
            if (selected > selectedEnd) {
                selectedEnd = selected;
            }

            // 如果包含了已选的，则只保留最后或者最后选择那一个时段
            for (let k = 0; k < times.length; k++) {
                if (times[k].start >= selectedStart && times[k].start <= selectedEnd && times[k].used) {
                    if (selected >= selectedEnd) {
                        selectedStart = selectedEnd;
                    } else if (selected <= selectedStart) {
                        selectedEnd = selectedStart;
                    }
                    break;
                }
            }

            // 选中
            for (let k = 0; k < times.length; k++) {
                if (times[k].start >= selectedStart && times[k].start <= selectedEnd) {
                    times[k].selected = true;
                } else {
                    times[k].selected = false;
                }
            }

            // 取得结束时间点
            let selectedEndPoint = '';
            for (let k = 0; k < times.length; k++) {
                if (times[k].start == selectedEnd) {
                    selectedEndPoint = times[k].end;
                }
            }
            this.setData({
                times,
                selectedStart,
                selectedEnd,
                selectedEndPoint
            });
        },

        bindSumbitTap: function (e) {
            let start = this.selectedStart;
            let end = this.selectedEnd;
            let endPoint = this.selectedEndPoint;
            if (!start || !end || !endPoint) {
                return;
            }
            this.$emit('select', {
                detail: {
                    start,
                    end,
                    endPoint
                }
            });
        }
    },
    created: function () {},
    watch: {
        day: {
            handler: function (newVal, oldVal) {
                this.dayClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
@import '../calendar_comm/din.css';

.time-table {
    width: 100%;
    padding: 0 5rpx;
}

.time-table .table-inner {
    width: 100%;
    font-size: 28rpx;
}

.time-table .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.time-table .list .item {
    color: #000;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 42rpx;
    padding: 0;
}

.time-table .list .item .left {
    background-color: #f5fafe;
    height: inherit;
    width: 140rpx;
    text-align: center;
    padding-top: 4rpx;
    border-right: 1rpx solid #ddd;
    border-left: 1rpx solid #ddd;
    font-size: 30rpx;
    font-weight: normal !important;
    font-family: 'din';
}

.time-table .list .item:last-child .left {
    border-bottom: 1rpx solid #ddd;
}

.time-table .list .item .left.top {
    border-top: 1rpx solid #ddd !important;
    border-bottom: 0 !important;
}

.time-table .list .item .right {
    flex: 1;
    height: inherit;
    border-right: 1rpx solid #ddd;
    border-top: 1rpx solid #ddd;
    background-color: #fff;
    color: #444;
    padding: 0 10rpx;
    width: 100%;
    text-align: center;
}

.time-table .list .item:last-child .right {
    border-bottom: 1rpx solid #ddd !important;
}

.time-table .list .item:first-child .right {
    border-top: 1rpx solid #ddd !important;
}

.time-table .list .item .right.selected {
    border-top: 1rpx solid #dfffd8;
    background-color: #dfffd8;
}

.time-table .list .item .right.selected-first {
    border-top: 1rpx solid #ddd !important;
}

.time-table .list .item .right.expire {
    background-color: #f5f5f5;
    color: #999;
}

.time-table .list .item .right.used,
.time-table .list .item .right.used-first {
    border-top: 0rpx solid #e0ebfe;
    background-color: #e0ebfe;
    color: #f37445;
    font-size: 28rpx;
    border-left: 6rpx solid #1a65ff;
    text-align: left;
}

.time-table .list .item .right.used-first {
    border-top: 1rpx solid #ddd !important;
}

.time-submit {
    width: 100%;
    position: fixed;
    bottom: 15rpx;
    padding: 20rpx 30rpx;
    z-index: 999999;
}

.time-submit .inner {
    width: 100%;
    background-color: #999;
    font-size: 36rpx;
    border-radius: 15rpx;
    padding: 15rpx 0;
    text-align: center;
    color: #fff;
}
</style>
