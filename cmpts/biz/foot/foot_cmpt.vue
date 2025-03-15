<template>
    <view class="site-footer" @tap="url" data-type="mini" data-app="wx1a3ad7903d85f33a" data-url="/pages/home/index/home_index">
        <view :class="'info ' + color">© {{ company }}</view>
        <view :class="'info margin-top-xs ' + color">build {{ time }}</view>
    </view>
</template>

<script>
const pageHelper = require('../../../helper/page_helper');
const timeHelper = require('../../../helper/time_helper');
const setting = require('../../../setting/setting.js');
export default {
    data() {
        return {
            time: '',
            company: '',
            ver: ''
        };
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        color: {
            type: String,
            default: ''
        }
    },
    created: function () {
        // 组件实例化，但节点树还未导入，因此这时不能用setData
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
        // 处理小程序 ready 生命周期
        this.$nextTick(() => this.ready());
    },
    move: function () {
        // 组件实例被移动到树的另一个位置
    },
    destroyed: function () {
        // 在组件实例被从页面节点树移除时执行
    },
    /**
     * 组件的方法列表
     */
    methods: {
        ready: async function () {
            // 组件布局完成，这时可以获取节点信息，也可以操作节点
            // 当前用户，用于评论删除
            this.loadDetailFun();
            this.setData({
                time: timeHelper.time('Y.M')
            });
        },

        attached: function () {},

        loadDetailFun: async function () {
            this.setData({
                company: setting.COMPANY,
                ver: setting.VER
            });
        },

        url: function (e) {
            pageHelper.url(e, this);
        }
    }
};
</script>
<style>
@import '../../../style/public/project.css';

.site-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 24rpx;
    color: #aaa;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
}
</style>
