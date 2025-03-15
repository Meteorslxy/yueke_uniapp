<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l load-project"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l load-project"></view>

        <block v-if="isLoad">
            <view class="main padding-project">
                <view class="text-pic-list-box margin-top-xs">
                    <view class="item card-project shadow-project">
                        <view class="title-line" @tap="url" :data-url="'../detail/meet_detail?id=' + join.JOIN_MEET_ID">
                            <view class="title content-cut-two">{{ join.JOIN_MEET_TITLE }}</view>
                            <view class="arrow"><text class="icon-right"></text></view>
                        </view>

                        <view class="author">
                            <text class="icon-remind margin-right-xs text-s"></text>
                            <text class="text-cut">{{ join.JOIN_MEET_DAY }} {{ join.JOIN_MEET_TIME_START }}～{{ join.JOIN_MEET_TIME_END }}</text>
                        </view>

                        <view class="data">
                            <text v-if="join.isTimeout" class="text-grey">
                                <text class="icon-bad margin-right-xxs"></text>
                                已过期
                            </text>

                            <text v-else-if="join.JOIN_STATUS == 1 && join.JOIN_IS_CHECKIN == 0" class="text-green">
                                <text class="icon-newshot margin-right-xxs"></text>
                                可使用
                            </text>

                            <text v-else-if="join.JOIN_STATUS == 1 && join.JOIN_IS_CHECKIN == 1" class="text-blue">
                                <text class="icon-roundcheckfill margin-right-xxs"></text>
                                已核销
                            </text>

                            <text v-else-if="join.JOIN_STATUS == 10" class="text-grey">
                                <text class="icon-bad margin-right-xxs"></text>
                                已取消
                            </text>

                            <block v-else-if="join.JOIN_STATUS == 99">
                                <text class="text-red">
                                    <text class="icon-bad margin-right-xxs"></text>
                                    系统取消
                                    <text class="text-grey" v-if="join.JOIN_REASON">：{{ join.JOIN_REASON }}</text>
                                </text>
                            </block>
                        </view>

                        <view class="oprt" v-if="join.JOIN_STATUS == 0 || join.JOIN_STATUS == 1">
                            <view @tap="url" data-url="../../my/index/my_index" data-type="relaunch" v-if="isShowHome" class="btn margin-right-s">返回首页</view>
                            <view @tap="bindCalendarTap" class="btn bg-yellow light">
                                <text class="icon-add"></text>
                                加入手机日程
                            </view>
                        </view>
                    </view>
                </view>

                <view class="info-list-box" v-if="join.JOIN_STATUS == 1 && join.JOIN_IS_CHECKIN == 0">
                    <view class="item card-project shadow-project">
                        <view class="info">
                            <view class="center">
                                <text class="text-bold margin-right-s">预约码</text>
                                (向工作人员出示进行核销)
                            </view>
                        </view>
                        <view class="info">
                            <view class="center">
                                <image :show-menu-by-longpress="true" :src="qrImageData" class="loading" />
                            </view>
                        </view>
                    </view>
                </view>

                <view class="info-list-box margin-bottom-xxl">
                    <view class="item card-project shadow-project">
                        <view class="info margin-bottom-s">
                            <view class="center text-bold">预约信息</view>
                        </view>
                        <view class="info" v-for="(item, index) in join.JOIN_FORMS" :key="index">
                            <view class="title">{{ item.title }}：</view>

                            <view class="content">{{ item.val }}</view>
                        </view>

                        <view class="info text-grey margin-top-xs text-s">提交时间：{{ join.JOIN_ADD_TIME }}</view>
                        <view v-if="join.JOIN_STATUS == 1 && join.JOIN_IS_CHECKIN == 1" class="info text-grey margin-top-xs text-s">核销时间：{{ join.JOIN_CHECKIN_TIME }}</view>
                    </view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const qrcodeLib = require('../../../../../lib/tools/qrcode_lib.js');
const MeetBiz = require('../../../biz/meet_biz.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
export default {
    data() {
        return {
            isLoad: false,
            isShowHome: false,

            join: {
                JOIN_MEET_ID: '',
                JOIN_MEET_TITLE: '',
                JOIN_MEET_DAY: '',
                JOIN_MEET_TIME_START: '',
                JOIN_MEET_TIME_END: '',
                isTimeout: '',
                JOIN_STATUS: 0,
                JOIN_IS_CHECKIN: 0,
                JOIN_REASON: '',
                JOIN_FORMS: [],
                JOIN_ADD_TIME: '',
                JOIN_CHECKIN_TIME: ''
            },

            qrImageData: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: async function (options) {
        ProjectBiz.initPage(this);
        if (!pageHelper.getOptions(this, options)) {
            return;
        }
        if (!(await PassportBiz.loginMustBackWin(this))) {
            return;
        }
        this.loadDetailFun();
        if (options && options.flag == 'home') {
            this.setData({
                isShowHome: true
            });
        }
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        loadDetailFun: async function (e) {
            let id = this.id;
            if (!id) {
                return;
            }
            let params = {
                joinId: id
            };
            let opts = {
                title: 'bar'
            };
            try {
                let join = await cloudHelper.callCloudData('meet/my_join_detail', params, opts);
                if (!join) {
                    this.setData({
                        isLoad: null
                    });
                    return;
                }
                let qrImageData = qrcodeLib.drawImg('meet=' + join.JOIN_CODE, {
                    typeNumber: 1,
                    errorCorrectLevel: 'L',
                    size: 100
                });
                this.setData({
                    isLoad: true,
                    join,
                    qrImageData
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.error(err);
            }
        },

        url: function (e) {
            pageHelper.url(e, this);
        },

        bindNoticeTap: function (e) {
            let callback = () => {
                pageHelper.showSuccToast('开启成功');
            };
            MeetBiz.subscribeMessageMeet(callback);
        },

        bindCalendarTap: function (e) {
            let join = this.join;
            let title = join.JOIN_MEET_TITLE;
            let startTime = timeHelper.time2Timestamp(join.JOIN_MEET_DAY + ' ' + join.JOIN_MEET_TIME_START + ':00') / 1000;
            let endTime = timeHelper.time2Timestamp(join.JOIN_MEET_DAY + ' ' + join.JOIN_MEET_TIME_END + ':00') / 1000;
            pageHelper.addPhoneCalendar(title, startTime, endTime);
        }
    }
};
</script>
<style>
@import '../../../../../style/public/article_list.css';
@import '../../../style/skin.css';
.main {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.text-pic-list-box {
    padding: 20rpx 0rpx 10rpx;
}

.text-pic-list-box .item {
    padding: 20rpx 30rpx 20rpx 30rpx;
}

.text-pic-list-box .title-line {
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: flex-start;
}

.text-pic-list-box .title-line .arrow {
    width: 100rpx;
    color: #666;
    text-align: right;
}

.text-pic-list-box .item .oprt {
    line-height: 1.5;
    font-size: 27rpx;
    margin: 30rpx 0 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--projectColor);
}

.text-pic-list-box .item .oprt .btn {
    padding: 0 20rpx;
}

.info-list-box {
    width: 100%;
    box-sizing: border-box;
    padding: 0rpx 0rpx 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.info-list-box .item {
    padding: 20rpx 30rpx 20rpx 40rpx;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
    position: relative;
}

.info-list-box .item .info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 28rpx;
    line-height: 1.5;
    color: #333;
    border-bottom: 2rpx dotted #ccc;
    padding: 10rpx 0;
}

.info-list-box .item .info:last-child,
.info-list-box .item .info:first-child {
    border-bottom: 0;
}

.info-list-box .item .info .title {
    font-weight: bold;
    width: 150rpx;
    margin-right: 10rpx;
    align-self: start;
    position: relative;
}

.info-list-box .item .info .content {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: start;
}

.info-list-box .item .info .center {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.info-list-box .item .info .center image {
    width: 400rpx;
    height: 400rpx;
    margin: 30rpx;
}
</style>
