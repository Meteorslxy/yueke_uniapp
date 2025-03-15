<template>
    <view>
        <view :class="'main-' + oprt">
            <view class="select-date">
                <cmpt-calendar
                    mode="multi"
                    :hasDays="hasDays"
                    :hasJoinDays="hasJoinDays"
                    :multiDoDay="multiDoDay"
                    :fold="false"
                    :selectTimeout="false"
                    @click="bindDataCalendarClickCmpt"
                />
            </view>

            <view v-if="days.length" class="data-hint">
                <text>
                    时段设置
                    <text class="text-grey text-day">(共{{ days.length + lastHasDays.length }}天可约)</text>
                </text>
            </view>

            <view v-else class="data-hint">
                <text>
                    时段设置：
                    <text class="text-orange text-day">请先选择以上日期</text>
                </text>
            </view>

            <view class="form-area">
                <view class="form-box" v-for="(item, index) in days" :key="index">
                    <view class="time-group">
                        <view class="time-title">
                            <text>{{ item.dayDesc }}</text>
                            <text @tap="bindDaySetTap" :data-idx="index" class="icon-moreandroid"></text>
                        </view>
                        <view @tap="bindTimeAddTap" :data-idx="index" v-if="item.times.length == 0" class="time-line text-orange time-line-hint">
                            <text class="icon-info margin-right-xs"></text>
                            尚未添加时段，请设置
                        </view>
                        <view class="time-line" v-for="(timesItem, timesIndex) in item.times" :key="timesIndex">
                            <text v-if="timesItem.stat.succCnt" class="x-lock icon-profilefill text-grey margin-right-xs"></text>

                            <cmpt-picker
                                :disabled="timesItem.stat.succCnt"
                                disabledHint="该时段已有用户预约，处于锁定状态，不可更改起止时间点（上限人数可更改）"
                                steps="2"
                                :isSlot="true"
                                :sourceData="daysTimeOptions"
                                @select="bindDaysTimeStartCmpt"
                                :itemMulti="[tools.split(timesItem.start, ':')[0], tools.split(timesItem.start, ':')[1]]"
                                :data-idx="index"
                                :data-timesidx="timesIndex"
                            >
                                <view class="clock box">
                                    {{ timesItem.start }}
                                    <text class="icon-right text-arrow"></text>
                                </view>
                            </cmpt-picker>

                            <view class="clock-line">～</view>

                            <cmpt-picker
                                :disabled="timesItem.stat.succCnt"
                                disabledHint="该时段已有用户预约，处于锁定状态，不可更改起止时间点（上限人数可更改）"
                                steps="2"
                                :isSlot="true"
                                :sourceData="daysTimeOptions"
                                @select="bindDaysTimeEndCmpt"
                                :itemMulti="[tools.split(timesItem.end, ':')[0], tools.split(timesItem.end, ':')[1]]"
                                :data-idx="index"
                                :data-timesidx="timesIndex"
                            >
                                <view class="clock box">
                                    {{ timesItem.end }}
                                    <text class="icon-right text-arrow"></text>
                                </view>
                            </cmpt-picker>

                            <view class="limit box" @tap="bindShowTimeLimitModalTap" :data-idx="index" :data-timesidx="timesIndex">
                                {{ !timesItem.isLimit ? '不限人数' : timesItem.limit + '人' }}
                                <text class="icon-right"></text>
                            </view>

                            <view class="box close" @tap="bindTimeDelTap" :data-idx="index" :data-timesidx="timesIndex" :data-mark="timesItem.mark">
                                <text class="icon-delete"></text>
                            </view>

                            <switch
                                @tap="bindTimeStatusSwitch"
                                :disabled="true"
                                :data-idx="index"
                                :data-timesidx="timesIndex"
                                class="limit-status green sm"
                                :checked="timesItem.status == 1"
                            ></switch>
                        </view>
                        <view class="time-oprt">
                            <view class="op" @tap="bindTimeAddTap" :data-idx="index">
                                <text class="icon-add margin-right-xxs"></text>
                                添加时段
                            </view>
                            <view class="vline"></view>
                            <view class="op" @tap="bindShowTimeLimitModalTap" :data-idx="index" :data-timesidx="-1">
                                <text class="icon-friend margin-right-xxs"></text>
                                人数上限
                            </view>
                            <view class="vline"></view>
                            <view class="op" @tap="bindTimeSetTap" :data-idx="index">
                                <text class="icon-copy margin-right-xxs"></text>
                                复制/模板
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view :class="'btn-bottom-' + oprt">
            <view @tap="url" data-type="back" class="return">不保存,返回</view>
            <view @tap="bindSaveTap" class="save">保存时间设置</view>
        </view>

        <cmpt-modal v-if="curTimeLimitModalShow" :show.sync="curTimeLimitModalShow" type="dialog" title="时段人数上限" @click="bindTimeLimitSetCmpt" class="modal-form">
            <view v-if="curTimesIdx > -1" class="modal-desc text-blue">
                {{ days[curIdx].day }} {{ days[curIdx].times[curTimesIdx].start }}～{{ days[curIdx].times[curTimesIdx].end }} 可约人数上限为
            </view>
            <view v-else class="modal-desc">{{ days[curIdx].day }} 全天 可约人数上限为</view>

            <view class="form-group">
                <view class="title">是否限制人数</view>
                <switch v-if="curTimeIsLimit" @change="switchModel" data-item="curTimeIsLimit" class="green sm" :checked="true"></switch>
                <switch v-else-if="!curTimeIsLimit" @change="switchModel" data-item="curTimeIsLimit" class="green sm"></switch>
            </view>
            <view class="form-group">
                <view class="title">人数上限</view>
                <block v-if="curTimeIsLimit">
                    <input type="number" maxlength="4" placeholder="请输入本时段人数上限" v-model="curTimeLimit" class="text-red margin-right-xs" />
                    人
                </block>
                <text v-else>不限制人数</text>
            </view>
        </cmpt-modal>

        <cmpt-modal
            v-if="saveTempModalShow"
            :show.sync="saveTempModalShow"
            type="dialog"
            title="保存为模板"
            @click="bindSaveTempCmpt"
            class="modal-form"
            :subtitle="'将当前该日期下的配置的 「' + days[curIdx].times.length + '项」 时段保存为模板，以便于后续快速调用 :'"
            subtitleAlign="left"
        >
            <view class="form-group">
                <input maxlength="20" placeholder="请输入模板名称" v-model="formTempName" class="input-temp" />
            </view>
        </cmpt-modal>

        <!-- top begin -->
        <button v-if="topShow" class="btn-fixed bg-gray text-gray btn-top" @tap="bindTopTap" style="bottom: 160rpx"><text class="icon-top"></text></button>
        <!-- top END. -->

        <cmpt-modal
            v-if="cancelModalShow"
            :show.sync="cancelModalShow"
            type="dialog"
            title="取消该时段所有预约"
            @click="bindCancelMeetJoinCmpt"
            class="modal-form"
            cancelText="返回"
            confirmText="确定取消"
        >
            <view class="form-group" style="padding: 0 10rpx">
                <view class="title">
                    取消理由
                    <text class="text-grey text-mid">(选填)</text>
                    ：
                </view>
                <view @tap="bindClearReasonTap" style="width: 150rpx; text-align: right" class="text-grey">
                    <text class="icon-roundclose"></text>
                    清空
                </view>
            </view>

            <view class="form-group cancel-area">
                <textarea placeholder-class="phc" placeholder="请输入取消理由 (非必填)，将通知给用户" style="height: 110rpx" v-model="formReason" maxlength="100"></textarea>
            </view>
        </cmpt-modal>
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        oprt() {
            return this.data.oprt;
        },
        hasDays() {
            return this.data.hasDays;
        },
        hasJoinDays() {
            return this.data.hasJoinDays;
        },
        multiDoDay() {
            return this.data.multiDoDay;
        },
        days() {
            return this.data.days;
        },
        lastHasDays() {
            return this.data.lastHasDays;
        },
        index() {
            return this.data.index;
        },
        item() {
            return this.data.item;
        },
        timesIndex() {
            return this.data.timesIndex;
        },
        timesItem() {
            return this.data.timesItem;
        },
        daysTimeOptions() {
            return this.data.daysTimeOptions;
        },
        tools() {
            return this.data.tools;
        },
        curTimeLimitModalShow() {
            return this.data.curTimeLimitModalShow;
        },
        curTimesIdx() {
            return this.data.curTimesIdx;
        },
        curIdx() {
            return this.data.curIdx;
        },
        curTimeIsLimit() {
            return this.data.curTimeIsLimit;
        },
        curTimeLimit() {
            return this.data.curTimeLimit;
        },
        saveTempModalShow() {
            return this.data.saveTempModalShow;
        },
        formTempName() {
            return this.data.formTempName;
        },
        topShow() {
            return this.data.topShow;
        },
        cancelModalShow() {
            return this.data.cancelModalShow;
        },
        formReason() {
            return this.data.formReason;
        },
        bindDataCalendarClickCmpt() {
            return this.data.bindDataCalendarClickCmpt;
        },
        bindDaySetTap() {
            return this.data.bindDaySetTap;
        },
        bindTimeAddTap() {
            return this.data.bindTimeAddTap;
        },
        bindDaysTimeStartCmpt() {
            return this.data.bindDaysTimeStartCmpt;
        },
        bindDaysTimeEndCmpt() {
            return this.data.bindDaysTimeEndCmpt;
        },
        bindShowTimeLimitModalTap() {
            return this.data.bindShowTimeLimitModalTap;
        },
        bindTimeDelTap() {
            return this.data.bindTimeDelTap;
        },
        bindTimeStatusSwitch() {
            return this.data.bindTimeStatusSwitch;
        },
        bindTimeSetTap() {
            return this.data.bindTimeSetTap;
        },
        url() {
            return this.data.url;
        },
        bindSaveTap() {
            return this.data.bindSaveTap;
        },
        bindTimeLimitSetCmpt() {
            return this.data.bindTimeLimitSetCmpt;
        },
        switchModel() {
            return this.data.switchModel;
        },
        bindSaveTempCmpt() {
            return this.data.bindSaveTempCmpt;
        },
        bindTopTap() {
            return this.data.bindTopTap;
        },
        bindCancelMeetJoinCmpt() {
            return this.data.bindCancelMeetJoinCmpt;
        },
        bindClearReasonTap() {
            return this.data.bindClearReasonTap;
        }
    }
};
</script>
<style></style>
