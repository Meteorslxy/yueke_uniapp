<template>
    <view :scroll-x="true" :scroll-y="true" :scroll-anchoring="true" :enhanced="true" :bounces="false" class="table table-border">
        <!-- 表格头 start -->
        <view class="thead thead-border">
            <view class="td" style="width: 200rpx" v-for="(item, index) in headers" :key="index">
                {{ item.label }}
            </view>
        </view>
        <!-- 表格头 end -->

        <!-- 表格体 start -->
        <view class="tbody">
            <block v-if="data.length > 0" v-for="(it, idx) in data" :key="idx">
                <view class="tbody-tr tbody-tr-stripe1 tbody-tr-border">
                    <view class="td" style="width: 200rpx" v-for="(head, index) in headers" :key="index">
                        {{ it[head['prop']] }}
                    </view>
                </view>
            </block>
            <!-- 列表无数据处理 -->
            <block v-if="data.length === 0">
                <view class="no-data">{{ msg }}</view>
            </block>
        </view>
        <!-- 表格体 end -->
    </view>
</template>

<script>
/**
 *
 */
export default {
    data() {
        return {
            scrolWidth: '20%'
        };
    },
    /**
     * 外部样式类
     */
    externalClasses: ['header-row-class-name', 'row-class-name', 'cell-class-name'],
    /**
     * 组件样式隔离
     */
    options: {
        styleIsolation: 'isolated',
        multipleSlots: true // 支持多个slot
    },
    /**
     * 组件的属性列表
     */
    props: {
        data: {
            type: Array,
            default: () => []
        },
        headers: {
            type: Array,
            default: () => []
        },
        // table的高度, 溢出可滚动
        height: {
            type: String,
            default: 'auto'
        },
        width: {
            type: Number || String,
            default: '100%'
        },
        // 单元格的宽度
        tdWidth: {
            type: Number,
            default: 35
        },
        // 固定表头 thead达到Header的位置时就应该被fixed了
        offsetTop: {
            type: Number,
            default: 150
        },
        // 是否带有纵向边框
        stripe: {
            type: Boolean,
            default: false
        },
        // 是否带有纵向边框
        border: {
            type: Boolean,
            default: false
        },
        msg: {
            type: String,
            default: '暂无数据~'
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
        attached: function () {}
    },
    created: function () {}
};
</script>
<style>
.reset {
    background: white;
}

.other {
    font-size: 20px;
}

.table {
    position: relative;
    font-size: 28rpx;
    background: #fff;
    border-right: none;
    border-radius: 8rpx;
    overflow: hidden;
}
.thead {
    border-bottom: none;
    display: flex;
    justify-content: flex-start;
    border-top-right-radius: 8rpx;
    border-top-left-radius: 8rpx;
    overflow: visible;
    color: #909399;
    border: 1px solid #ebeef5;
    box-sizing: border-box;
}
.thead .td {
    padding: 20rpx 10rpx;
    font-weight: bold;
    display: inline-block;
    white-space: nowrap;
    text-align: center;
    border-right: 1rpx solid #fff;
}
.thead .td:last-child {
    border-right: none;
}
.thead-border .td {
    border-right: 1rpx solid #ebeef5;
}
.thead-border .td:last-child {
    border-right: none;
}
/* .tr{
  display: flex;
  white-space:nowrap; 
} */
.tbody {
    box-sizing: border-box;
    font-size: 28rpx;
    color: #666;
    border: 1px solid #ebeef5;
    border-top: none;
    border-bottom-left-radius: 8rpx;
    border-bottom-right-radius: 8rpx;
}
.tbody-tr {
    display: flex;
    border-bottom: 1px solid #ebeef5;
}
.tbody-tr:last-child {
    border-bottom-left-radius: 8rpx;
    border-bottom-right-radius: 8rpx;
}

.tbody-tr-stripe {
    background: #fff;
    border-bottom: none;
}
.tbody-tr-stripe:nth-child(2n) {
    background: #f6f6f6;
}
.tbody-tr .td {
    white-space: wrap;
    padding: 20rpx 10rpx;
    text-align: center;
}

.tbody-tr-border .td {
    border-right: 1rpx solid #f6f6f6;
}
.tbody-tr-border .td:last-child {
    border-right: none;
}
.no-data {
    display: flex;
    padding: 50rpx;
    color: #666;
    justify-content: center;
}
</style>
