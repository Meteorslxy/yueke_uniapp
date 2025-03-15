<template>
    <view>
        <view :class="'main-' + oprt">
            <view class="text-pic-list-box">
                <view class="item shadow" v-for="(item, index) in temps" :key="index">
                    <view class="title">
                        <text @tap="bindSelectTap" :data-idx="index" class="temp-name text-cut">{{ item.TEMP_NAME }}</text>
                        <button @tap="bindSelectTap" :data-idx="index" class="btn mid bg-blue text-white margin-right-s" style="font-weight: normal">选用</button>
                        <text @tap="bindOprtTap" :data-idx="index" class="icon-moreandroid more"></text>
                    </view>

                    <view class="time-list">
                        <view wx-for class="time-item" v-for="(timesItem, timesIndex) in item.TEMP_TIMES" :key="timesIndex">
                            <view class="detail">
                                <text class="up">{{ timesItem.start }}～{{ timesItem.end }}</text>
                                <text v-if="timesItem.isLimit" class="text-blue">{{ timesItem.limit }}人</text>
                                <text v-else class="text-blue">不限人数</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <cmpt-modal :show.sync="curTimeModalShow" type="dialog" title="批量设置人数上限" @click="bindAllLimitSetCmpt" class="modal-form">
            <view class="modal-desc text-green">统一设置该模板下各时段可约人数</view>

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
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        oprt() {
            return this.data.oprt;
        },
        temps() {
            return this.data.temps;
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
        curTimeModalShow() {
            return this.data.curTimeModalShow;
        },
        curTimeIsLimit() {
            return this.data.curTimeIsLimit;
        },
        curTimeLimit() {
            return this.data.curTimeLimit;
        },
        bindSelectTap() {
            return this.data.bindSelectTap;
        },
        bindOprtTap() {
            return this.data.bindOprtTap;
        },
        bindAllLimitSetCmpt() {
            return this.data.bindAllLimitSetCmpt;
        },
        switchModel() {
            return this.data.switchModel;
        }
    }
};
</script>
<style></style>
