<template>
    <view>
        <view :class="'main-' + oprt">
            <view class="table margin-bottom sticky1" style="width: 100%">
                <view class="table-top">
                    <view class="table-form">
                        <view class="item">
                            <view class="title">起始日期：</view>
                            <cmpt-picker-time
                                mode="day"
                                style="flex: 1"
                                startYear="2022"
                                endYear="2025"
                                :item="searchDayStart"
                                @select="url"
                                data-type="picker"
                                data-item="searchDayStart"
                            >
                                <view class="content">
                                    {{ searchDayStart }}
                                    <text v-if="!searchDayStart" class="margin-left-xxs icon-calendar"></text>
                                </view>
                            </cmpt-picker-time>
                        </view>

                        <view class="item">
                            <view class="title">结束日期：</view>
                            <cmpt-picker-time
                                mode="day"
                                style="flex: 1"
                                startYear="2022"
                                endYear="2025"
                                :item="searchDayEnd"
                                @select="url"
                                data-type="picker"
                                data-item="searchDayEnd"
                            >
                                <view class="content">
                                    {{ searchDayEnd }}
                                    <text v-if="!searchDayEnd" class="margin-left-xxs icon-calendar"></text>
                                </view>
                            </cmpt-picker-time>
                        </view>
                        <view class="oprt">
                            <view @tap="bindSearchTodayTap" hover-class="button-hover" class="min-btn margin-right-xs">今日</view>
                            <view @tap="bindSearchTomorrowTap" hover-class="button-hover" class="min-btn margin-right-xs">明日</view>
                            <!-- <view bindtap="bindSearchClearTap" hover-class="button-hover" class="margin-right-xs">清空</view> -->
                            <view @tap="bindSearchTap" hover-class="button-hover" class="submit margin-right-xs">搜索</view>
                        </view>
                    </view>
                    <!-- 表格头 start -->
                    <view class="thead border">
                        <view class="td" style="width: 220rpx">时段</view>
                        <view class="td" style="width: 230rpx">已预约/名额</view>
                        <view class="td" style="width: 150rpx">取消</view>
                        <view class="td full">查看</view>
                    </view>
                    <!-- 表格头 end -->
                </view>

                <!-- 表格体 start -->
                <view class="tbody" v-for="(item, index) in daysSet" :key="index">
                    <view class="line">
                        <text :class="(item.day < now ? 'text-grey' : '') + ' ' + (item.day == now ? 'text-blue text-bold' : '')">
                            {{ item.day }}
                            <text v-if="item.day < now" class="margin-left-xxs">(已过期)</text>
                            <text v-if="item.day == now" class="margin-left-xxs">(今日)</text>
                        </text>
                    </view>

                    <view class="tr stripe border" v-for="(itm, idx) in item.times" :key="idx">
                        <view class="td" style="width: 220rpx">{{ itm.start }}～{{ itm.end }}</view>

                        <view class="td" style="width: 230rpx">
                            <text :class="itm.stat.succCnt ? 'text-bold' : ''">{{ itm.stat.succCnt }}</text>
                            <text class="margin-right-xxxs margin-left-xxxs">/</text>
                            {{ itm.isLimit ? itm.limit : '不限' }}
                        </view>

                        <view class="td text-grey" style="width: 150rpx">{{ itm.stat.cancelCnt + itm.stat.adminCancelCnt }}</view>

                        <view
                            @tap="url"
                            :data-url="
                                '../join/' +
                                oprt +
                                '_meet_join?meetId=' +
                                meetId +
                                '&mark=' +
                                itm.mark +
                                '&dayidx=' +
                                index +
                                '&timeidx=' +
                                idx +
                                '&title=' +
                                titleEn +
                                '&time=' +
                                (item.day + ' ' + itm.start + '-' + itm.end)
                            "
                            class="td full"
                        >
                            名单
                            <text class="icon-right"></text>
                        </view>
                    </view>
                </view>

                <view v-if="daysSet === null" class="no-data">数据加载中...</view>
                <view v-if="daysSet.length == 0" class="no-data">没有数据哦~</view>
            </view>
        </view>

        <!-- top begin -->
        <button v-if="topShow" class="btn-fixed bg-gray text-gray btn-top" @tap="bindTopTap" style="bottom: 100rpx"><text class="icon-top"></text></button>
        <!-- top END. -->
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        oprt() {
            return this.data.oprt;
        },
        searchDayStart() {
            return this.data.searchDayStart;
        },
        searchDayEnd() {
            return this.data.searchDayEnd;
        },
        daysSet() {
            return this.data.daysSet;
        },
        index() {
            return this.data.index;
        },
        item() {
            return this.data.item;
        },
        now() {
            return this.data.now;
        },
        idx() {
            return this.data.idx;
        },
        itm() {
            return this.data.itm;
        },
        meetId() {
            return this.data.meetId;
        },
        titleEn() {
            return this.data.titleEn;
        },
        topShow() {
            return this.data.topShow;
        },
        url() {
            return this.data.url;
        },
        bindSearchTodayTap() {
            return this.data.bindSearchTodayTap;
        },
        bindSearchTomorrowTap() {
            return this.data.bindSearchTomorrowTap;
        },
        bindSearchTap() {
            return this.data.bindSearchTap;
        },
        bindTopTap() {
            return this.data.bindTopTap;
        }
    }
};
</script>
<style></style>
