<template>
    <view>
        <checkbox-group @change="bindChange" :class="'checkbox-group ' + (show == 'row' ? 'row' : '')">
            <view class="item" v-for="(item, index) in sourceData" :key="index">
                <label v-if="modeClone == 'simple'" class="item-label">
                    <checkbox class="item-checkbox" :disabled="disabled" :value="item" :checked="tools.includes(itemMulti, item)" />
                    <text v-if="tools.includes(itemMulti, item)" style="font-weight: bold">{{ item }}</text>
                    <text v-else>{{ item }}</text>
                </label>

                <label v-else-if="modeClone == 'multi'" class="item-label">
                    <checkbox class="item-checkbox" :disabled="disabled" :value="item[multiModeValMark]" :checked="tools.includes(itemMulti, item[multiModeValMark])" />
                    <text v-if="tools.includes(itemMulti, item[multiModeValMark])" style="font-weight: bold">{{ item[multiModeLabelMark] }}</text>
                    <text v-else>{{ item[multiModeLabelMark] }}</text>
                </label>
            </view>
        </checkbox-group>
    </view>
</template>
<script module="tools" lang="wxs" src="@/tpls/wxs/tools.wxs"></script>
<script>
const helper = require('../../../helper/helper.js');
export default {
    data() {
        return {
            modeClone: ''
        };
    },
    externalClasses: ['outside-picker-multi-class'],
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        sourceData: {
            //源数组
            type: Array,
            default: () => []
        },
        // 默认选中项的值数组
        itemMulti: {
            type: Array,
            default: () => []
        },
        show: {
            // 排列模式 column/row
            type: String,
            default: 'column'
        },
        mode: {
            //数据模式 simple=[1,2,3,], multi=[{label,val},{label,val},...]
            type: String,
            default: 'simple'
        },
        multiModeLabelMark: {
            type: String,
            default: 'label'
        },
        multiModeValMark: {
            type: String,
            default: 'val'
        },
        disabled: {
            // 是否禁用
            type: Boolean,
            default: false
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
            this.fixDefaultValFun();
        },

        attached: function () {},

        bindChange: function (e) {
            this.$emit('select', {
                detail: e.detail.value
            });
        },

        fixDefaultValFun() {
            //传入数据不匹配的时候，修正父页面传入的的数组默认值
            if (!Array.isArray(this.itemMulti)) {
                this.$emit('select', {
                    detail: []
                });
            }
            if (this.itemMulti.length == 0) {
                return;
            }
            let ret = [];
            let sourceData = this.sourceData;
            let itemMulti = this.itemMulti;
            if (sourceData.length > 0 && helper.isDefined(sourceData[0][this.multiModeLabelMark])) {
                this.setData({
                    modeClone: 'multi'
                });
            }
            if (this.mode == 'simple') {
                for (let k = 0; k < sourceData.length; k++) {
                    for (let j in itemMulti) {
                        if (sourceData[k] == itemMulti[j]) {
                            ret.push(itemMulti[j]);
                        }
                    }
                }
            } else if (this.mode == 'multi') {
                for (let k = 0; k < sourceData.length; k++) {
                    for (let j in itemMulti) {
                        if (sourceData[k][this.multiModeValMark] == itemMulti[j]) {
                            ret.push(itemMulti[j]);
                        }
                    }
                }
            }
            this.$emit('select', {
                detail: ret
            });
        }
    },
    created: function () {},
    watch: {
        itemMulti: {
            handler: function (newVal, oldVal) {
                if (Array.isArray(newVal) && Array.isArray(oldVal) && JSON.stringify(newVal) != JSON.stringify(oldVal)) {
                    console.log('checkbox observer');
                    this.fixDefaultValFun();
                }
            },

            immediate: true,
            deep: true
        },

        mode: {
            handler: function (newVal, oldVal) {
                this.modeClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
.checkbox-group {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0rpx 20rpx;
}

.checkbox-group .item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    line-height: 2.1;
    min-height: 70rpx;
    border-bottom: 1rpx solid #eee;
    font-size: 28rpx;
}

.checkbox-group .item .item-label {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.checkbox-group .item:last-child {
    border-bottom: 0;
}

.checkbox-group .item:nth-child(odd) {
    background-color: #fcfcfc;
}

.checkbox-group .item .item-checkbox {
    margin-right: 20rpx;
    padding-left: 10rpx;
}

/*按行排列*/
.checkbox-group.row {
    flex-direction: row !important;
    flex-wrap: wrap !important;
    justify-content: flex-start;
}

.checkbox-group.row .item {
    width: unset !important;
    margin-right: 25rpx;
}

.checkbox-group.row .item .item-checkbox {
    margin-right: 5rpx;
    padding-left: 0rpx;
}
</style>
