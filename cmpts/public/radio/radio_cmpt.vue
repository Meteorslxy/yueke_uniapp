<template>
    <view>
        <radio-group v-if="show != 'tag'" @change="bindChange" :class="'radio-group ' + (show == 'row' ? 'row' : '')">
            <view :class="'item ' + show" v-for="(item, index) in options" :key="index">
                <label class="item-label">
                    <radio class="item-radio" :disabled="disabled" :value="item.value" :checked="itemSelectedClone == item.value" />
                    <text>{{ item.label }}{{ labelExt }}</text>
                </label>
            </view>
        </radio-group>
        <block v-else>
            <view class="form-radio-tags">
                <view @tap="bindTagChange" :data-val="item.value" class="item" v-for="(item, index) in options" :key="index">
                    <text :class="'tag-txt  ' + (itemSelectedClone == item.value ? 'cur' : '')">{{ item.label }}{{ labelExt }}</text>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
const pageHelper = require('../../../helper/page_helper.js');
export default {
    data() {
        return {
            options: []
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
        sourceDataStr: {
            //源字符串 支持 x,y,z;;; 1=x,2=y,3=z
            type: String,
            default: ''
        },
        // 默认选中项
        itemSelected: {
            type: String,
            default: ''
        },
        show: {
            // 排列模式 column/row
            type: String,
            default: 'column'
        },
        labelExt: {
            // 附加描述
            type: String,
            default: ''
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
            let sourceDataStr = this.sourceDataStr;
            if (sourceDataStr) {
                let options = [];
                let arr = sourceDataStr.split(',');
                for (let k = 0; k < arr.length; k++) {
                    let node = {};
                    if (arr[k].includes('=')) {
                        node.label = arr[k].split('=')[1];
                        node.value = arr[k].split('=')[0];
                    } else {
                        node.label = arr[k];
                        node.value = arr[k];
                    }
                    options.push(node);
                }
                this.setData({
                    options
                });
            } else {
                let sourceData = this.sourceData;
                let options = [];
                for (let k = 0; k < sourceData.length; k++) {
                    let node = {
                        label: sourceData[k],
                        value: sourceData[k]
                    };
                    options.push(node);
                }
                this.setData({
                    options
                });
            }
        },

        attached: function () {},

        bindChange: function (e) {
            this.$emit('select', {
                detail: e.detail.value
            });
        },

        bindTagChange: function (e) {
            let itemSelected = pageHelper.dataset(e, 'val');
            this.setData({
                itemSelectedClone: itemSelected
            });
            this.$emit('select', {
                detail: itemSelected
            });
        }
    },
    created: function () {},
    watch: {
        itemSelected: {
            handler: function (newVal, oldVal) {
                this.itemSelectedClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
.radio-group {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0rpx 20rpx;
}

.radio-group .item {
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

.radio-group .item.row {
    border-bottom: unset;
}

.radio-group .item .item-label {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.radio-group .item:last-child {
    border-bottom: 0;
}

.radio-group .item:nth-child(odd) {
    background-color: #fcfcfc;
}

.radio-group .item.row:nth-child(odd) {
    background-color: #fff;
}

.radio-group .item .item-radio {
    margin-right: 20rpx;
    padding-left: 10rpx;
}

/*按行排列*/
.radio-group.row {
    flex-direction: row !important;
    flex-wrap: wrap !important;
    justify-content: flex-start;
}

.radio-group.row .item {
    width: unset !important;
    margin-right: 25rpx;
}

.radio-group.row .item.row {
    margin-right: 0rpx;
    margin-left: 25rpx;
}

.radio-group.row .item .item-radio {
    margin-right: 5rpx;
    padding-left: 0rpx;
}

/*标签形式*/
.form-radio-tags {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
}

.form-radio-tags .item {
    padding: 15rpx 10rpx;
}

.form-radio-tags .item .tag-txt {
    padding: 9rpx 25rpx;
    background-color: #f8f8f8;
    border: 1rpx solid #ccc;
    color: #000;
    border-radius: 7rpx;
    font-size: 28rpx;
}

.form-radio-tags .item .tag-txt.cur {
    border: 1rpx solid var(--btnColor);
    background-color: var(--btnColor);
    color: #fff;
}
</style>
