<template>
    <view>
        <picker
            :class="disabled ? 'disabled' : ''"
            v-if="steps == 1"
            mode="selector"
            :value="idx == -1 ? 0 : idx"
            :range="options"
            :range-key="labelKeyClone"
            @change="bindChange"
            :disabled="disabled"
        >
            <view v-if="!isSlot" class="picker-cmpt outside-picker-class">
                <block v-if="labelKeyClone">{{ options[idx].label || noDataHint }}</block>
                <block v-else>{{ options[idx] || noDataHint }}</block>
            </view>
            <slot v-else />
        </picker>

        <picker
            :class="disabled ? 'disabled' : ''"
            v-if="steps > 1"
            mode="multiSelector"
            :value="idx"
            :range="options"
            :range-key="labelKeyClone"
            @tap="bindTap"
            @change="bindChange"
            :disabled="disabled"
        >
            <view v-if="!isSlot" class="picker-cmpt outside-picker-class">
                {{ multiDesc || noDataHint }}
            </view>
            <slot v-else />
        </picker>
    </view>
</template>

<script>
const helper = require('../../../helper/helper.js');
const dataHelper = require('../../../helper/data_helper.js');
const pageHelper = require('../../../helper/page_helper.js');
export default {
    data() {
        return {
            options: null,
            idx: 0,

            // 多选的显示文字
            multiDesc: '',

            label: '',
            sourceDataClone: [],
            labelKeyClone: '',
            itemClone: '',
            indexClone: 0
        };
    },
    externalClasses: ['outside-picker-class'],
    options: {
        addGlobalClass: true
    },
    /**
     * 一维格式： 可以通过model返回
     * 对象格式： {label:'对象A',val:'5'}, {label:'对象B',val:'12'}, {label:'对象C',val:'99'}
     * 简单形式：['形式1','形式2','形式33']
     * 字符串形式
     */

    /**
     * N维格式： 只能通过trigger返回
     * 对象格式： {label:'对象A',val:'5'}, {label:'对象B',val:'12'}, {label:'对象C',val:'99'}
     * 简单形式：['形式1','形式2','形式33']
     *
     */
    props: {
        mark: {
            type: String,
            default: ''
        },
        isSlot: {
            //是否开启slot
            type: Boolean,
            default: false
        },
        sourceData: {
            //源数组，sourceData有几维，Picker就可以有几阶 简单形式待选项,,,
            type: Array,
            default: () => []
        },
        sourceDataStr: {
            //源数组，sourceData有几维，Picker就可以有几阶 简单形式待选项,,,
            type: String,
            default: ''
        },
        // key
        labelKey: {
            type: String,
            default: ''
        },
        // 阶数
        steps: {
            type: Number,
            default: 1
        },
        noDataHint: {
            // 无数据的提示语
            type: String,
            default: '请选择'
        },
        // 选中项的下标数组 1维
        index: {
            type: Number,
            default: 0
        },
        // 选中项的下标数组 N维
        indexMulti: {
            type: Array,
            default: () => []
        },
        // 默认选中项的值数组 1维
        item: {
            type: String,
            default: ''
        },
        // 默认选中项的值数组 N维
        itemMulti: {
            type: Array,
            default: () => []
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        disabledHint: {
            //  禁用提示
            type: String,
            default: ''
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
            if (!this.options || this.options.length == 0) {
                this.initFun();
            }
        },

        attached: function () {},

        initFun: function () {
            let sourceData = this.sourceData;
            let labelKey = this.labelKey;
            let idx = this.idx;

            // 字符串形式
            if (this.steps == 1 && this.sourceDataStr && (!sourceData || sourceData.length == 0)) {
                sourceData = dataHelper.getSelectOptions(this.sourceDataStr);
                this.setData({
                    sourceDataClone: sourceData
                });
            }
            if (!sourceData || sourceData.length == 0) {
                return;
            }
            if (this.steps == 1) {
                if (sourceData.length > 0 && helper.isDefined(sourceData[0]['label'])) {
                    labelKey = 'label';
                }
                idx = this.index;
            } else if (this.steps > 1) {
                if (sourceData.length > 0 && helper.isDefined(sourceData[0][0]['label'])) {
                    labelKey = 'label';
                }
                idx = this.indexMulti;
            }
            this.setData({
                idx,
                labelKeyClone: labelKey,
                options: sourceData
            });
            this.getMultiDescFun();
            if (this.steps == 1) {
                this.selected(this.item);
            } else {
                this.selected(this.itemMulti);
            }
        },

        getMultiDescFun: function () {
            let idx = this.idx;
            let options = this.options;
            if (idx.length != options.length) {
                return;
            }
            let multiDesc = [];
            if (this.labelKey) {
                for (let k = 0; k < options.length; k++) {
                    multiDesc[k] = options[k][idx[k]].label;
                }
            } else {
                for (let k = 0; k < options.length; k++) {
                    multiDesc[k] = options[k][idx[k]];
                }
            }
            this.setData({
                multiDesc
            });
        },

        bindTap: function (e) {
            // 点击行为
            if (this.disabled && this.disabledHint) {
                pageHelper.showModal(this.disabledHint, '提示', null, '知道了');
            }
        },

        // 触发改变
        bindChange: function (e) {
            let idx = e.detail.value;
            let val = null;
            if (this.steps == 1) {
                val = this.labelKey ? this.options[idx].val : this.options[idx];
                this.setData({
                    itemClone: val,
                    indexClone: idx
                });
            } else {
                val = [];
                let options = this.options;
                if (this.labelKey) {
                    for (let k = 0; k < options.length; k++) {
                        val[k] = options[k][idx[k]].val;
                    }
                } else {
                    for (let k = 0; k < options.length; k++) {
                        val[k] = options[k][idx[k]];
                    }
                }
                this.getMultiDescFun();
            }
            this.$emit('select', {
                detail: val
            });
        },

        // 一维数组根据val获取lable
        getLabelOneStep: function (val) {
            for (let k = 0; k < this.sourceData.length; k++) {
                if (this.sourceData[k].val == val) {
                    return this.sourceData[k].label;
                }
            }
            return 'unknown';
        },

        // 选中值
        selected: function (val) {
            let options = this.options;
            let labelKey = this.labelKey;
            if (this.steps == 1) {
                for (let k = 0; k < options.length; k++) {
                    if (labelKey && val == options[k].val) {
                        this.setData({
                            idx: k
                        });
                        return;
                    } else if (!labelKey && val == options[k]) {
                        this.setData({
                            idx: k
                        });
                        return;
                    }
                }
                this.setData({
                    idx: -1
                });

                //传入数据不匹配的时候，修正父页面传入的的默认值
                this.$emit('select', {
                    detail: ''
                });
            } else if (this.steps > 1) {
                let idx = [];
                for (let k = 0; k < options.length; k++) {
                    let levelTwo = options[k];
                    for (let j in levelTwo) {
                        if (labelKey && val[k] == options[k][j].val) {
                            idx.push(j);
                        } else if (!labelKey && val[k] == options[k][j]) {
                            idx.push(j);
                        }
                    }
                }
                if (idx.length != options.length) {
                    idx = [];
                }
                this.setData({
                    idx
                });
                this.getMultiDescFun();

                //传入数据不匹配的时候，修正父页面传入的的数组默认值 TODO
            }
        }
    },
    created: function () {},
    watch: {
        item: {
            handler: function (newVal, oldVal) {
                this.itemClone = this.clone(this.item);
                //	console.log('one observer', this.data.mark);
                if (newVal != oldVal) {
                    let options = this.options;
                    if (!options || options.length == 0) {
                        this.initFun();
                    }
                    if (options && options.length > 0) {
                        this.selected(newVal);
                    }
                }
            },

            immediate: true
        },

        itemMulti: {
            handler: function (newVal, oldVal) {
                //	console.log('multi observer', this.data.mark);
                if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
                    let options = this.options;
                    if (!options || options.length == 0) {
                        this.initFun();
                    }
                    if (options && options.length > 0) {
                        this.selected(newVal);
                    }
                }
            },

            immediate: true,
            deep: true
        },

        sourceData: {
            handler: function (newVal, oldVal) {
                this.sourceDataClone = newVal;
            },

            immediate: true,
            deep: true
        },

        labelKey: {
            handler: function (newVal, oldVal) {
                this.labelKeyClone = newVal;
            },

            immediate: true
        },

        index: {
            handler: function (newVal, oldVal) {
                this.indexClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
.picker-cmpt {
    line-height: 100rpx;
    font-size: 28rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-align: right;
    padding-right: 40rpx;
}

.disabled {
    background-color: #eee;
    color: #999;
}

.picker-cmpt::before {
    position: absolute;
    top: 0;
    right: 30rpx;
    bottom: 0;
    display: block;
    margin: auto;
    width: 30rpx;
    height: 30rpx;
    color: var(--grey);
    content: '\e6a3';
    text-align: center;
    font-size: 34rpx;
    font-family: 'icon';
    line-height: 30rpx;
    margin-top: auto;
    margin-right: auto;
    margin-bottom: auto;
    margin-left: auto;
}
</style>
