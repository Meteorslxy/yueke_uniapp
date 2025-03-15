<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l load-project"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l load-project"></view>
        <block v-if="isLoad">
            <image :src="meet.MEET_OBJ.cover[0]" mode="widthFix" class="loading cover" :lazy-load="true" />
            <view class="main">
                <view class="title-box">
                    <view class="mark">{{ meet.MEET_CATE_NAME }}</view>
                    <view class="left">
                        <image @tap="url" :data-url="meet.MEET_OBJ.cover[0]" data-type="image" mode="aspectFill" class="loading shadow" :src="meet.MEET_OBJ.cover[0]" />
                    </view>
                    <view class="right">
                        <view class="line1">{{ meet.MEET_TITLE }}</view>
                        <view class="line2">
                            <view class="tag-list">
                                <text v-for="(itm, index) in meet.MEET_OBJ.tag" :key="index">{{ itm.title }}</text>
                            </view>
                        </view>
                        <view class="line3">
                            <view class="star">
                                <text class="icon-favorfill cur" v-for="(item, index) in meet.MEET_OBJ.level" :key="index"></text>
                                <text class="icon-favor text-grey" v-for="(item, index) in 5 - meet.MEET_OBJ.level" :key="index"></text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="detail-box">
                    <view class="meet-tab">
                        <view @tap="bindTabTap" data-cur="mind" :class="'item ' + (cur == 'mind' ? 'cur' : '')">老师简介</view>
                        <view @tap="bindTabTap" data-cur="time" :class="'item ' + (cur == 'time' ? 'cur' : '')">预约时段</view>
                    </view>

                    <view v-if="cur == 'mind'" class="article-box">
                        <view class="article" v-if="meet.MEET_OBJ.content && meet.MEET_OBJ.content.length > 0">
                            <block v-for="(item, index) in meet.MEET_OBJ.content" :key="index">
                                <view class="content" v-if="item.type == 'text'">
                                    <text :user-select="true">{{ item.val }}</text>
                                </view>

                                <view class="pics" v-if="item.type == 'img'">
                                    <image
                                        @tap="url"
                                        data-type="img"
                                        :data-url="item.val"
                                        :show-menu-by-longpress="true"
                                        class="loading"
                                        mode="widthFix"
                                        :lazy-load="true"
                                        :src="item.val"
                                    ></image>
                                </view>
                            </block>
                        </view>
                    </view>

                    <block v-if="cur == 'time'">
                        <block v-if="days.length > 0">
                            <scroll-view scroll-x class="date" :enable-flex="true">
                                <view @tap="bindDayTap" :data-idx="index" class="date-inner" v-for="(item, index) in days" :key="index">
                                    <view :class="'item ' + (dayIdx == index ? 'cur' : '')">
                                        <text v-if="dayIdx == index && item.status != '今天'" class="status cur"><text class="icon-check"></text></text>
                                        <text v-else :class="'status ' + (item.status == '今天' ? 'bg-red' : '')">{{ item.status || '可约' }}</text>

                                        <text class="week">{{ item.week }}</text>
                                        <text class="day">{{ item.date }}</text>
                                    </view>
                                </view>
                            </scroll-view>

                            <view class="time-title">请选择时段</view>
                            <view class="time">
                                <view
                                    @tap="bindTimeTap"
                                    :data-timeidx="idx"
                                    :class="'item ' + (timeIdx == idx ? 'cur' : '') + ' ' + (itm.error ? 'selected' : '')"
                                    v-for="(itm, idx) in days[dayIdx].times"
                                    :key="idx"
                                >
                                    <block v-if="!itm.error">
                                        <text v-if="timeIdx != idx" class="status">可约</text>
                                        <text v-else class="status"><text class="icon-check"></text></text>
                                    </block>

                                    <text class="t1">{{ index }}{{ itm.start }}~{{ itm.end }}</text>

                                    <text v-if="!itm.error && itm.isLimit && itm.limit > 1" class="t3">剩余:{{ itm.limit - itm.stat.succCnt }}</text>

                                    <text v-if="!itm.error && !itm.isLimit" class="t3">人数不限</text>

                                    <text v-if="itm.error" class="t3">{{ itm.error }}</text>
                                </view>
                            </view>
                            <View style="height: 250rpx"></View>
                        </block>
                        <view v-else-if="days.length == 0" class="margin-top load notexist text-l load-project day-load"></view>
                        <view v-else class="margin-top load loading text-l load-project"></view>
                    </block>
                </view>
            </view>

            <view v-if="days.length > 0" class="bottom safe-bottom">
                <view class="inner">
                    <view class="line2">
                        <view v-if="timeIdx > -1" class="left text-red">
                            {{ days[dayIdx].day + ' ' + days[dayIdx].times[timeIdx].start + '~' + days[dayIdx].times[timeIdx].end }}
                        </view>
                        <view v-else class="left text-red">未选定预约时段</view>
                        <view @tap="bindJoinTap" class="right">去预约</view>
                    </view>
                </view>
            </view>

            <cmpt-detail
                :doTop="true"
                mode="left"
                :topBtnShow="topBtnShow"
                topBtnBottom="150"
                tag=""
                :oid="id"
                :cate="meet.MEET_CATE_NAME"
                :title="meet.MEET_TITLE"
                :cover="meet.MEET_OBJ.cover[0]"
                :qr="meet.MEET_QR"
                desc="查看详情"
                :bg="skin.PROJECT_COLOR"
            ></cmpt-detail>
        </block>
    </view>
</template>

<script>
import cmptDetail from '@/cmpts/biz/detail/detail_cmpt';
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const MeetBiz = require('../../../biz/meet_biz.js');
const projectSetting = require('../../../public/project_setting.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
export default {
    components: {
        cmptDetail
    },
    data() {
        return {
            isLoad: false,
            tabCur: 0,
            mainCur: 0,
            verticalNavTop: 0,
            cur: 'mind',
            dayIdx: 0,
            timeIdx: -1,
            topBtnShow: false,

            meet: {
                MEET_OBJ: {
                    cover: '',
                    tag: [],
                    level: [],
                    content: ''
                },

                MEET_CATE_NAME: '',
                MEET_TITLE: '',
                MEET_QR: ''
            },

            days: '',
            canNullTime: '',

            itm: {
                title: '',
                error: false,
                start: '',
                end: '',
                isLimit: '',
                limit: 0,

                stat: {
                    succCnt: 0
                }
            },

            times: [],
            day: '',
            start: '',
            end: '',
            id: '',

            skin: {
                PROJECT_COLOR: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        ProjectBiz.initPage(this);
        if (!pageHelper.getOptions(this, options)) {
            return;
        }
        this.loadDetailFun();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
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
        await this.loadDetailFun();
        uni.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.meet.MEET_TITLE,
            imageUrl: this.meet.MEET_OBJ.cover[0]
        };
    },
    onPageScroll: function (e) {
        if (e.scrollTop > 100) {
            this.setData({
                topBtnShow: true
            });
        } else {
            this.setData({
                topBtnShow: false
            });
        }
    },
    methods: {
        loadDetailFun: async function () {
            this.setData({
                dayIdx: 0,
                timeIdx: -1,
                isLoad: false
            });
            let id = this.id;
            if (!id) {
                return;
            }
            let params = {
                id
            };
            let opt = {
                title: 'bar'
            };
            let meet = await cloudHelper.callCloudData('meet/view', params, opt);
            if (!meet) {
                this.setData({
                    isLoad: null
                });
                return;
            }
            let days = meet.MEET_DAYS_SET;
            let dayNow1 = timeHelper.time('Y-M-D');
            let dayNow2 = timeHelper.time('Y-M-D', 86400);
            let dayNow3 = timeHelper.time('Y-M-D', 172800);
            for (let k = 0; k < days.length; k++) {
                if (days[k].day == dayNow1) {
                    days[k].status = '今天';
                }
                if (days[k].day == dayNow2) {
                    days[k].status = '明天';
                }
                if (days[k].day == dayNow3) {
                    days[k].status = '后天';
                }
                days[k].week = timeHelper.week(days[k].day);
                days[k].date = days[k].day.split('-')[1] + '-' + days[k].day.split('-')[2];
            }
            this.setData({
                isLoad: true,
                meet,
                days,
                canNullTime: projectSetting.MEET_CAN_NULL_TIME
            });
        },

        bindDayTap: function (e) {
            let dayIdx = pageHelper.dataset(e, 'idx');
            this.setData({
                dayIdx,
                timeIdx: -1
            });
        },

        bindTimeTap: function (e) {
            let timeIdx = pageHelper.dataset(e, 'timeidx');
            let node = this.days[this.dayIdx].times[timeIdx];
            if (node.error) {
                return;
            }
            this.setData({
                timeIdx
            });
        },

        bindJoinTap: async function (e) {
            if (!(await PassportBiz.loginMustCancelWin(this))) {
                return;
            }
            this.setData({
                cur: 'time'
            });
            let dayIdx = this.dayIdx;
            let timeIdx = this.timeIdx;
            if (timeIdx < 0) {
                return pageHelper.showNoneToast('请先选择预约时段');
            }
            let time = this.meet.MEET_DAYS_SET[dayIdx].times[timeIdx];
            if (time.error) {
                if (time.error.includes('预约')) {
                    return pageHelper.showModal('该时段' + time.error + '，换一个时段试试吧！');
                } else {
                    return pageHelper.showModal('该时段预约' + time.error + '，换一个时段试试吧！');
                }
            }
            let meetId = this.id;
            let timeMark = time.mark;
            let callback = async () => {
                try {
                    let opts = {
                        title: '请稍候'
                    };
                    let params = {
                        meetId,
                        timeMark
                    };
                    await cloudHelper.callCloudSumbit('meet/before_join', params, opts).then((res) => {
                        uni.navigateTo({
                            url: `../join/meet_join?id=${meetId}&timeMark=${timeMark}`
                        });
                    });
                } catch (ex) {
                    console.log('CatchClause', ex);
                    console.log('CatchClause', ex);
                    console.log(ex);
                }
            };
            callback();
        },

        url: function (e) {
            pageHelper.url(e, this);
        },

        bindTabTap: function (e) {
            let cur = pageHelper.dataset(e, 'cur');
            this.setData({
                cur
            });
        }
    }
};
</script>
<style>
@import '../../../../../style/public/comm_box_list.css';
@import '../../../style/skin.css';

.cover {
    width: 100%;
    filter: blur(10rpx);
    position: fixed;
    top: 0;
    left: 0;
}

.text-red {
    color: #eb7887 !important;
}

.bg-red {
    background-color: #eb7887 !important;
    color: var(--white) !important;
}

.main {
    padding: 30rpx 20rpx;
    position: relative;
}

.title-box {
    width: 100%;
    padding: 50rpx 30rpx 40rpx;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 10rpx;
    margin-top: 0rpx;
    position: relative;
    overflow: hidden;
}

.title-box .mark {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8rpx 16rpx 6rpx 20rpx;
    border-bottom-left-radius: 30rpx;
    font-size: 22rpx;
    background-color: var(--projectCompareColor);
    color: #fff;
}

.title-box .left {
    margin-right: 30rpx;
}

.title-box .left image {
    width: 110rpx;
    height: 110rpx;
    border-radius: 50%;
}

.title-box .right {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.title-box .right .line1 {
    font-size: 30rpx;
    color: #000;
    padding: 0 0;
}

.title-box .right .line2 {
    font-size: 24rpx;
    color: #999;
    padding: 10rpx 0 0rpx;
}

.title-box .right .line2 .tag-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.title-box .right .line2 .tag-list > text {
    padding: 6rpx 10rpx;
    font-size: 22rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    background-color: #f2f2f2;
    border-radius: 6rpx;
    color: #777;
}

.title-box .right .line3 {
    font-size: 24rpx;
    color: #999;
    padding: 0rpx 0;
    margin-top: 6rpx;
}

.title-box .right .line3 .star {
    text-align: left;
    font-size: 24rpx;
    color: var(--yellow);
}

.title-box .right .line3 .star > text {
    margin-right: 4rpx;
}

.detail-box {
    width: 100%;
    background-color: #fff;
    margin-top: 12rpx;
    border-radius: 10rpx;
}

.meet-tab {
    width: 100%;
    display: flex;
    font-size: 28rpx;
    color: #333;
    line-height: 80rpx;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2rpx dotted #ddd;
}

.meet-tab .item {
    padding: 0 20rpx;
    position: relative;
    color: #999;
}

.meet-tab .item.cur {
    font-weight: bold;
    color: #333;
}

.meet-tab .item.cur:after {
    border-radius: unset !important;
    background-color: unset !important;
    transform: unset !important;
    border-top-left-radius: unset !important;
    border-top-right-radius: unset !important;
    border-bottom-right-radius: unset !important;
    border-bottom-left-radius: unset !important;

    content: '' !important;
    width: 30rpx !important;
    height: 30rpx !important;
    position: absolute !important;
    left: calc(50% - 15rpx) !important;
    bottom: 0rpx !important;
    border-top: 6rpx solid var(--projectColor) !important;
    border-right: 6rpx solid var(--projectColor) !important;
    border-top-right-radius: 100% !important;
    transform: rotate(-225deg) !important;
    border-top-width: 6rpx !important;
    border-top-style: solid !important;
    border-top-color: var(--projectColor) !important;
    border-right-width: 6rpx !important;
    border-right-style: solid !important;
    border-right-color: var(--projectColor) !important;
}

.date {
    white-space: nowrap;
    display: flex;
    background-color: #fff;
    padding: 25rpx;
    height: 245rpx;
}

.date .item {
    font-family: 'din';
    border: 2rpx solid #ebebeb;
    background-color: #f2f2f2;
    width: 110rpx;
    height: 170rpx;
    border-radius: 15rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 15rpx;
    color: #333;
    position: relative;
    overflow: hidden;
}

.date .item .status {
    position: absolute;
    top: 0rpx;
    right: 0rpx;
    font-size: 22rpx;
    background-color: #e0e0e0;
    color: #666;
    border-bottom-left-radius: 4rpx;
    border-top-right-radius: 10rpx;
    padding: 2rpx 5rpx;
}

.date .item .status.cur {
    background-color: var(--projectColor);
    color: #fff;
    font-size: 22rpx;
    font-weight: bold;
}

.date .item.cur {
    border-color: var(--projectColor);
    background-color: #eaeeff;
}

.date .item .week {
    font-size: 26rpx;
    margin-top: 20rpx;
}

.date .item.cur .week,
.date .item.cur .day {
    font-weight: bold;
}

.date .item .day {
    font-size: 26rpx;
    margin-top: 10rpx;
}

.time-title {
    width: 100%;
    padding: 30rpx 30rpx;
    font-size: 32rpx;
    font-weight: bold;
}

.time {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 25rpx;
    background-color: #fff;
    border-top: 4rpx solid #f2f2f2;
}

.time .item {
    width: calc((100% - 40rpx) / 3);
    background-color: #f2f2f2;
    border: 2rpx solid #f2f2f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20rpx;
    height: 135rpx;
    font-size: 28rpx;
    border-radius: 8rpx;
    position: relative;
}

.time .item.cur {
    border-color: var(--projectColor);
    background-color: var(--projectColor);
}

.time .item.cur .t1,
.time .item.cur .t3 {
    color: #fff !important;
}

.time .item .status {
    position: absolute;
    top: -2rpx;
    right: -2rpx;
    font-size: 22rpx;
    padding: 4rpx 6rpx;
    background-color: #e0e0e0;
    border-bottom-left-radius: 4rpx;
    border-top-right-radius: 10rpx;
    color: #666;
}

.time .item.cur .status {
    background-color: var(--projectColor);
    color: #fff;
}

.time .item.selected {
    border-color: #ebebeb;
    color: #e7e7e7;
    background-color: #fcfcfc;
}

.time .item:nth-child(3n + 1),
.time .item:nth-child(3n + 2) {
    margin-right: 20rpx;
}

.time .item .t1 {
    color: #000;
    font-size: 26rpx;
    margin-top: 18rpx;
}

.time .item.selected .t1,
.time .item.selected .t2,
.time .item.selected .t3 {
    color: #aaa;
}

.time .item .t2,
.time .item .t3 {
    margin-top: 5rpx;
}

.time .item .t2 {
    font-weight: bold;
}

.time .item .t3 {
    color: #666;
    font-size: 24rpx;
}

.time .item.cur .t3 {
    color: #000;
}

.bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 99999;
    background-color: #fff;
}

.bottom .inner {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.bottom .inner .line1 {
    width: 100%;
    display: flex;
    padding: 10rpx 25rpx 20rpx;
    font-size: 30rpx;
    color: #777;
}

.bottom .inner .line2 {
    border-top: 2rpx solid #ddd;
    width: 100%;
    display: flex;
    padding: 0rpx 0rpx 0rpx 25rpx;
    height: 110rpx;
    font-size: 36rpx;
}

.bottom .inner .line2 .left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    height: inherit;
    font-size: 32rpx;
}

.bottom .inner .line2 .right {
    width: 270rpx;
    background-color: var(--projectColor);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: inherit;
    font-weight: bold;
}

.day-load.notexist::after {
    content: '没有可预约的时段';
}

/*** 详情盒子 ***/
.article-box {
    box-sizing: border-box;
    width: 100%;
    box-sizing: border-box;
    padding: 30rpx 20rpx;
    margin-bottom: 200rpx;
    min-height: 500rpx;
}

.article-box .article {
    background-color: #fff;
    padding: 10rpx 30rpx;
    border-radius: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.article-box .article .content {
    margin-top: 24rpx;
    color: #444;
    font-size: 28rpx;
    text-align: justify;
    line-height: 1.6;
}

.article-box .article .pics {
    margin-top: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.article-box .article .pics image {
    width: 100%;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
}

.cmpt-biz-detail-mode-left {
    bottom: 120rpx !important;
}
</style>
