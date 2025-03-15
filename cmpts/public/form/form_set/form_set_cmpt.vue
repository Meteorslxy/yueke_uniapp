<template>
    <view>
        <view
            :class="'form-group arrow ' + (cur == index ? 'cur' : '')"
            hoverClass="form-group-active"
            style="padding-left: 10rpx"
            v-for="(item, index) in fieldsClone"
            :key="index"
        >
            <view class="field-oprt">
                <view @tap="bindUpTap" v-if="index > 0" :data-idx="index"><text class="icon-refresharrow up"></text></view>
                <view @tap="bindDownTap" v-if="index < fieldsClone.length - 1" :data-idx="index"><text class="icon-refresharrow"></text></view>
            </view>

            <view class="title text-cut" @tap="bindEditTap" :data-edit="item.edit" :data-idx="index">
                {{ item.title }}
            </view>

            <view class="picker-set text-cut" @tap="bindEditTap" :data-edit="item.edit" :data-idx="index">
                <text v-if="item.type == 'text'">单行文本，</text>
                <text v-else-if="item.type == 'date'">日期，</text>
                <text v-else-if="item.type == 'hourminute'">时间点，</text>
                <text v-else-if="item.type == 'select'">单项选择，</text>
                <text v-else-if="item.type == 'checkbox'">多项选择，</text>
                <text v-else-if="item.type == 'switch'">开关选择，</text>
                <text v-else-if="item.type == 'area'">省市区，</text>
                <text v-else-if="item.type == 'textarea'">多行文本，</text>
                <text v-else-if="item.type == 'year'">年份，</text>
                <text v-else-if="item.type == 'month'">月份，</text>
                <text v-else-if="item.type == 'int'">整数数字，</text>
                <text v-else-if="item.type == 'digit'">小数数字，</text>
                <text v-else-if="item.type == 'idcard'">身份证，</text>
                <text v-else-if="item.type == 'mobile'">手机，</text>

                <text v-if="item.must">必填</text>
                <text v-else>选填</text>
            </view>
        </view>

        <view class="form-group" @tap="url" data-url="/cmpts/public/form/form_set/field/form_set_field">
            <view class="title text-cut text-blue text-bold">
                <text class="icon-roundadd margin-right-xs"></text>
                添加新字段
            </view>
        </view>
    </view>
</template>

<script>
const pageHelper = require('../../../../helper/page_helper.js');
const dataHelper = require('../../../../helper/data_helper.js');
export default {
    data() {
        return {
            cur: -1,
            fieldsClone: ''
        };
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        fields: {
            type: Array,
            default: () => []
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
        ready: function () {},
        attached: function () {},

        setGlow(cur) {
            this.setData({
                cur
            });
            setTimeout(() => {
                this.setData({
                    cur: -1
                });
            }, 800);
        },

        url: function (e) {
            pageHelper.url(e, this);
        },

        set: function (fields) {
            this.setData({
                fieldsClone: fields
            });
            this.$emit('formset', {
                detail: fields
            });
        },

        get: function () {
            return this.fields;
        },

        bindEditTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let edit = pageHelper.dataset(e, 'edit');
            if (!edit) {
                return pageHelper.showNoneToast('该字段不可编辑和删除');
            }
            uni.navigateTo({
                url: '/cmpts/public/form/form_set/field/form_set_field?idx=' + idx
            });
        },

        bindUpTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let fields = this.fields;
            dataHelper.arraySwap(fields, idx, idx - 1);
            this.setData({
                fieldsClone: fields
            });
            this.setGlow(idx - 1);
            this.$emit('formset', {
                detail: fields
            });
        },

        bindDownTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let fields = this.fields;
            dataHelper.arraySwap(fields, idx, idx + 1);
            this.setData({
                fieldsClone: fields
            });
            this.setGlow(idx + 1);
            this.$emit('formset', {
                detail: fields
            });
        }
    },
    created: function () {},
    watch: {
        fields: {
            handler: function (newVal, oldVal) {
                this.fieldsClone = newVal;
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
.picker-set {
    line-height: 100rpx;
    font-size: 24rpx;
    width: 100%;
    text-align: right;
    color: #999;
    width: 210rpx;
}

.form-group .picker-set {
    padding-right: 40rpx;
    overflow: hidden;
    position: relative;
}

.form-group.cur {
    animation: glow 800ms linear 1 alternate;
}

@keyframes glow {
    0% {
        background-color: #ececec;
    }
    100% {
        background-color: #fff;
    }
}

.form-group-active {
    background-color: #ececec;
}

.form-group .title {
    font-weight: normal;
    color: #333;
    flex: 1;
    padding-right: 10rpx;
}

.form-group .field-oprt {
    color: #777;
    background: hsla(0, 0%, 100%, 0.95);
    border-radius: 5rpx;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-right: 15rpx;
}

.form-group .field-oprt > view {
    width: 70rpx;
    height: 55rpx;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 36rpx;
}
</style>
