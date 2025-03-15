<template>
    <view>
        <picker
            class="multi-picker picker-class"
            mode="multiSelector"
            @change="pickerChange"
            @columnchange="pickerColumnChange"
            @cancel="pickerCancel"
            :disabled="disabled"
            :value="multiIndex"
            :range="multiArray"
        >
            <slot />
        </picker>
    </view>
</template>

<script>
const timeHelper = require('../../../helper/time_helper.js');
const dateTimePicker = require('./datetime_picker.js');
export default {
    data() {
        return {
            multiIndex: [],

            //  Picker当前所选择的索引数组
            // Picker当前所展示的数组
            multiArray: [],

            disabled: ''
        };
    },
    externalClasses: ['picker-class'],
    /**
     * 组件的属性列表
     */
    props: {
        mark: {
            type: String,
            default: ''
        },
        // 特定类型 time  minute=单纯时间分钟选择
        mode: {
            // year/month/day/hour/minute/fullminute/second
            type: String,
            default: 'second'
        },
        // time特定类型 对应的分钟步长
        timeModeStep: {
            type: Number,
            default: 5
        },
        startYear: {
            type: Number,
            default: 0
        },
        endYear: {
            type: Number,
            default: 2030
        },
        item: {
            type: String,
            default: ''
        }
    },
    created: function () {},
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
            // 当前年份
            if (this.startYear == 0) {
                this.startYear = timeHelper.time('Y');
            }

            // 单纯分钟选择
            if (this.mode == 'minute') {
                this.startYear = 2021;
                this.endYear = 2021;
                if (this.item) {
                    this.item = '2021-01-01 ' + this.item;
                }
            }
            this.initFun();
        },

        attached: function () {},

        fmtTimeFun: function (str) {
            str = str.replace(/[^0-9]/gi, '');
            str = parseInt(str);
            return str < 10 ? '0' + str : '' + str;
        },

        // 根据选择获取时间字符串
        getTimeStrFun: function (selIdex) {
            let arr = [];
            let multiArray = this.multiArray;
            for (let k = 0; k < selIdex.length; k++) {
                let str = this.fmtTimeFun(multiArray[k][selIdex[k]]);
                arr.push(str);
            }
            let mode = this.mode;
            switch (mode) {
                case 'year':
                    arr = arr[0];
                    break;
                case 'month':
                    arr = arr[0] + '-' + arr[1];
                    break;
                case 'day':
                    arr = arr[0] + '-' + arr[1] + '-' + arr[2];
                    break;
                case 'hour':
                    arr = arr[0] + '-' + arr[1] + '-' + arr[2] + ' ' + arr[3] + ':00';
                    break;
                case 'fullminute':
                    arr = arr[0] + '-' + arr[1] + '-' + arr[2] + ' ' + arr[3] + ':' + arr[4];
                    break;
                case 'minute':
                    arr = arr[0] + ':' + arr[1];
                    break;
                case 'second':
                    arr = arr[0] + '-' + arr[1] + '-' + arr[2] + ' ' + arr[3] + ':' + arr[4] + ':' + arr[5];
                    break;
            }
            return arr;
        },

        initFun: function () {
            let multiIndex = [];
            let multiArray = [];
            let mode = this.mode;
            let obj = dateTimePicker.dateTimePicker(this.startYear, this.endYear, this.item, this.timeModeStep);
            let idx = obj.dateTimeIndex;
            let arr = obj.dateTimeArray;
            switch (mode) {
                case 'year':
                    multiIndex = [idx[0]];
                    multiArray = [arr[0]];
                    break;
                case 'month':
                    multiIndex = [idx[0], idx[1]];
                    multiArray = [arr[0], arr[1]];
                    break;
                case 'day':
                    multiIndex = [idx[0], idx[1], idx[2]];
                    multiArray = [arr[0], arr[1], arr[2]];
                    break;
                case 'hour':
                    multiIndex = [idx[0], idx[1], idx[2], idx[3]];
                    multiArray = [arr[0], arr[1], arr[2], arr[3]];
                    break;
                case 'fullminute':
                    idx.pop();
                    arr.pop();
                    multiIndex = idx;
                    multiArray = arr;
                    break;
                case 'minute':
                    multiIndex = [idx[3], idx[4]];
                    multiArray = [arr[3], arr[4]];
                    break;
                case 'second':
                    multiIndex = idx;
                    multiArray = arr;
                    break;
            }
            this.setData({
                multiIndex,
                multiArray
            });
        },

        pickerCancel: function (e) {},

        // 用户点击了确认
        pickerChange: function (e) {
            let time = this.getTimeStrFun(e.detail.value);
            this.$emit('select', {
                detail: time
            });
        },

        // 用户点击了列选择
        pickerColumnChange: function (e) {
            let multiArray = this.multiArray;
            let multiIndex = this.multiIndex;
            multiIndex[e.detail.column] = e.detail.value;
            let mode = this.mode;
            if (mode != 'year' && mode != 'month' && mode != 'minute') {
                let year = multiArray[0][multiIndex[0]].replace('年', '');
                let month = multiArray[1][multiIndex[1]].replace('月', '');
                multiArray[2] = dateTimePicker.getMonthDay(year, month, '日');
            }
            this.setData({
                multiArray,
                multiIndex
            });
        }
    },
    watch: {
        item: {
            handler: function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.initFun();
                }
            },

            immediate: true
        }
    }
};
</script>
<style>
/* cmpts/public/picker_time/picker_time_cmpt.wxss */
</style>
