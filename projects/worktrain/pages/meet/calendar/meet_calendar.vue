<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l load-project"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l load-project"></view>

        <view :class="'main ' + (skin.IS_SUB ? 'sub-margin-bottom' : '')" v-if="isLoad">
            <view class="plan-date">
                <cmpt-calendar mode="one" :hasDays="hasDays" @click="bindClickCmpt" @monthChange="bindMonthChangeCmpt" />
            </view>

            <view class="list padding-project">
                <view v-if="list === null" class="load loading text-l text-grey"></view>
                <text v-else-if="list.length == 0" class="no-project icon-emoji text-l text-grey">本日没有可预约的项目哦~</text>
                <view class="item card-project shadow-project" @tap="url" :data-url="'../detail/meet_detail?id=' + item._id" v-for="(item, index) in list" :key="index">
                    <view v-if="index % 4 == 0" class="left bg-blue bg-project"></view>

                    <view v-else-if="index % 4 == 1" class="left bg-green"></view>

                    <view v-else-if="index % 4 == 2" class="left bg-orange"></view>

                    <view v-else class="left bg-cyan"></view>

                    <block v-if="item.pic">
                        <image class="img loading" :src="item.pic" :lazy-load="true" mode="aspectFill" />
                    </block>

                    <view class="title text-cut">{{ item.title }}</view>

                    <view class="time">
                        <text class="icon-time margin-right-xxs"></text>
                        {{ item.timeDesc }}
                    </view>
                </view>
            </view>
        </view>

        <view style="height: 150rpx"></view>

        <block v-if="skin.IS_SUB">
            <menuTpl compName="menuTpl" :data="{ curMenu: 'meet_calendar', returnHome: false }"></menuTpl>
        </block>
    </view>
</template>

<script>
import cmptCalendar from '@/cmpts/public/calendar/calendar_comm/calendar_comm_cmpt';
import menuTpl from '../../tpls/menu_tpl';
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
export default {
    components: {
        cmptCalendar,
        menuTpl
    },
    data() {
        return {
            isLoad: false,
            list: [],
            day: '',
            hasDays: [],

            skin: {
                IS_SUB: false
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        ProjectBiz.initPage(this);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () {
        this.setData(
            {
                day: timeHelper.time('Y-M-D')
            },
            async () => {
                await this.loadHasListFun();
                await this.loadListFun();
            }
        );
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: async function () {
        await this.loadHasListFun();
        await this.loadListFun();
        uni.stopPullDownRefresh();
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        loadListFun: async function () {
            let params = {
                day: this.day
            };
            let opts = {
                title: this.isLoad ? 'bar' : 'bar'
            };
            try {
                this.setData({
                    list: null
                });
                await cloudHelper.callCloudSumbit('meet/list_by_day', params, opts).then((res) => {
                    this.setData({
                        list: res.data,
                        isLoad: true
                    });
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.error(err);
            }
        },

        loadHasListFun: async function () {
            let params = {
                day: timeHelper.time('Y-M-D')
            };
            let opts = {
                title: 'bar'
            };
            try {
                await cloudHelper.callCloudSumbit('meet/list_has_day', params, opts).then((res) => {
                    this.setData({
                        hasDays: res.data
                    });
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.error(err);
            }
        },

        bindClickCmpt: async function (e) {
            let day = e.detail.day;
            this.setData(
                {
                    day
                },
                async () => {
                    await this.loadListFun();
                }
            );
        },

        bindMonthChangeCmpt: function (e) {},

        url: async function (e) {
            pageHelper.url(e, this);
        }
    }
};
</script>
<style>
@import '../../../style/skin.css';

.main {
    padding: 0 0 20rpx;
}

.main .plan-date {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 999;
    box-shadow: var(--ShadowSize) var(--greyShadow);
}

.main .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 30rpx 20rpx;
}

.main .list .item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100rpx;
    padding: 0 30rpx 0 0;
    background-color: #fff;
    margin-bottom: 30rpx;
    border-radius: 10rpx;
    overflow: hidden;
}

.main .list .item .left {
    width: 8rpx;
    height: 100rpx;
    margin-right: 15rpx;
}

.main .list .item .img {
    width: 65rpx;
    height: 65rpx;
    border-radius: 10rpx;
    position: relative;
}

.main .list .item .title {
    flex: 1;
    text-align: left;
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    margin-left: 20rpx;
}

.main .list .item .time {
    width: 140rpx;
    text-align: right;
    font-size: 26rpx;
    color: #999;
}

.main .list .no-project {
    padding: 30rpx 30rpx;
    font-size: 28rpx;
}
</style>
