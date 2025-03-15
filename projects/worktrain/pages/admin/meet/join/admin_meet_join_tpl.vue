<template>
    <view>
        <cmpt-comm-list
            :source="oprt"
            id="cmpt-comm-list"
            :type="oprt + '-meet-join-list'"
            :search="search || ''"
            :_params="_params"
            :_menus="sortMenus"
            :_items="sortItems"
            :route="oprt + '/meet_join_list'"
            topBottom="50"
            placeholder="搜索姓名，手机等"
            sortMenusDefaultIndex="0"
            @list="bindCommListCmpt"
        >
            <view slot="searchEnd">
                <button @tap="bindCancelAllTap" class="btn mid radius bg-orange margin-right-xs">取消所有</button>
            </view>

            <!-- List Begin -->
            <view class="join-list">
                <view class="time-line text-grey">({{ time }})</view>
                <view v-if="dataList && dataList.total" class="load text-grey">
                    共有{{ dataList.total }}条符合条件记录
                    <text v-if="isAllFold" @tap="bindUnFoldAllTap" class="margin-left-xs icon-unfold text-blue">全部展开</text>
                    <text v-else @tap="bindFoldAllTap" class="margin-left-xs icon-fold text-blue">全部收起</text>
                </view>

                <view class="item" v-for="(item, index) in dataList.list" :key="index">
                    <view class="header">
                        <view class="left">
                            <text class="icon-calendar margin-right-xxs"></text>
                            <text class="">{{ item.JOIN_MEET_DAY }} ({{ item.JOIN_MEET_TIME_START }}～{{ item.JOIN_MEET_TIME_END }})</text>
                        </view>
                        <view class="right" @tap="bindCopyTap" :data-idx="index">
                            <text class="icon-copy margin-right-xxs"></text>
                            复制资料
                        </view>
                    </view>

                    <view class="info">
                        <view class="info-item">
                            <view class="title text-blue">状态</view>
                            <view class="mao">：</view>
                            <view class="content">
                                <view v-if="item.JOIN_STATUS == 1" class="text-black">
                                    <text class="icon-roundcheck margin-right-xxs"></text>
                                    预约成功
                                    <text v-if="item.JOIN_IS_CHECKIN == 1">，已核销</text>
                                    <text class="text-grey" v-else>，未核销</text>
                                </view>
                                <view v-else-if="item.JOIN_STATUS == 10">用户取消</view>
                                <view v-else-if="item.JOIN_STATUS == 99">系统取消</view>
                            </view>
                        </view>

                        <view class="info-item" v-if="item.JOIN_STATUS == 99">
                            <view class="title text-blue">取消原因</view>
                            <view class="mao">：</view>
                            <view class="content">{{ item.JOIN_REASON || '未填' }}</view>
                        </view>
                        <view class="info-item" v-if="item.JOIN_STATUS == 8">
                            <view class="title text-orange">未通过原因</view>
                            <view class="mao">：</view>
                            <view class="content">{{ item.JOIN_REASON || '未填' }}</view>
                        </view>

                        <view class="info-item" v-if="formindex < 3 || !item.fold" v-for="(form, formindex) in item.JOIN_FORMS" :key="formindex">
                            <view class="title">{{ form.title }}</view>

                            <view class="mao">：</view>

                            <view v-if="form.type == 'mobile'" class="content" @tap="url" data-type="phone" :data-url="form.val">
                                <text :class="valItem === search ? 'text-red text-bold' : ''" v-for="(valItem, index) in form.valArr" :key="index">{{ valItem }}</text>
                                <text class="margin-left-xs icon-phone text-black text-normal"></text>
                            </view>

                            <view v-else class="content" @tap="url" data-type="copy" :data-url="form.title + '：' + form.val">
                                <text :class="valItem === search ? 'text-red text-bold' : ''" v-for="(valItem, index) in form.valArr" :key="index">{{ valItem }}</text>
                            </view>
                        </view>
                        <view @tap="bindUnFoldTap" :data-idx="index" v-if="item.fold && item.JOIN_FORMS.length > 3" class="fold">
                            <text class="icon-unfold margin-right-xs"></text>
                            更多资料...
                        </view>

                        <view @tap="bindFoldTap" :data-idx="index" v-if="!item.fold && item.JOIN_FORMS.length > 3" class="fold">
                            <text class="icon-fold margin-right-xs"></text>
                            收起
                        </view>

                        <view class="info-item add-time">
                            <view class="title text-grey">提交</view>
                            <view class="mao text-grey">：</view>
                            <view class="content text-grey">{{ item.JOIN_ADD_TIME }}</view>
                        </view>
                        <view class="info-item" v-if="item.JOIN_IS_CHECKIN == 1">
                            <view class="title text-grey" style="font-weight: normal">核销</view>
                            <view class="mao text-grey" style="font-weight: normal">：</view>
                            <view class="content text-grey" style="font-weight: normal">{{ item.JOIN_CHECKIN_TIME }}</view>
                        </view>

                        <view class="oprt">
                            <block v-if="item.JOIN_STATUS == 1">
                                <view v-if="item.JOIN_IS_CHECKIN == 0" @tap="bindCheckinTap" :data-idx="index" data-flag="1" class="btn bg-purple margin-right-s light">
                                    核销预约
                                </view>

                                <view v-else @tap="bindCheckinTap" :data-idx="index" data-flag="0" class="btn bg-grey light margin-right-s">取消核销</view>
                            </block>

                            <block v-if="item.JOIN_STATUS == 1">
                                <view @tap="bindCancelTap" :data-idx="index" data-status="99" :data-old="item.JOIN_STATUS" class="btn bg-grey light margin-right-s">取消预约</view>
                            </block>

                            <block v-if="item.JOIN_STATUS == 10 || item.JOIN_STATUS == 99">
                                <view @tap="bindStatusTap" :data-idx="index" data-status="1" :data-old="item.JOIN_STATUS" class="btn bg-olive light margin-right-s">恢复预约</view>
                            </block>

                            <view @tap="bindDelTap" :data-idx="index" class="btn bg-orange light margin-right-s">删除</view>
                        </view>
                    </view>

                    <view class="no">{{ index + 1 }}</view>
                </view>
            </view>
            <!-- List END -->

            <!-- load begin -->

            <listLoadTpl compName="listLoadTpl" :data="{ dataList, skin: 'text-grey', noHint: '暂无记录' }"></listLoadTpl>
            <!-- load end -->
        </cmpt-comm-list>

        <cmpt-modal
            v-if="cancelAllModalShow"
            :show.sync="cancelAllModalShow"
            type="dialog"
            title="取消所有预约"
            @click="bindCancelAllCmpt"
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
                <textarea placeholder-class="phc" placeholder="请输入取消理由 (非必填)" style="height: 110rpx" v-model="formReason" maxlength="100"></textarea>
            </view>
        </cmpt-modal>

        <cmpt-modal
            v-if="cancelModalShow"
            :show.sync="cancelModalShow"
            type="dialog"
            title="取消预约"
            @click="bindCancelCmpt"
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
                <textarea placeholder-class="phc" placeholder="请输入取消理由 (非必填)" style="height: 110rpx" v-model="formReason" maxlength="100"></textarea>
            </view>
        </cmpt-modal>

        <cmpt-modal
            v-if="refuseModalShow"
            :show.sync="refuseModalShow"
            type="dialog"
            title="审核不通过"
            @click="bindRefuseCmpt"
            class="modal-form"
            cancelText="返回"
            confirmText="确定"
        >
            <view class="form-group" style="padding: 0 10rpx">
                <view class="title">
                    不通过理由
                    <text class="text-grey text-mid">(选填)</text>
                    ：
                </view>
                <view @tap="bindClearReasonTap" style="width: 150rpx; text-align: right" class="text-grey">
                    <text class="icon-roundclose"></text>
                    清空
                </view>
            </view>

            <view class="form-group cancel-area">
                <textarea placeholder-class="phc" placeholder="请输入审核不通过理由 (非必填)，将通知给用户" style="height: 110rpx" v-model="formReason" maxlength="100"></textarea>
            </view>
        </cmpt-modal>
    </view>
</template>

<script>
import listLoadTpl from '../../../../../../tpls/public/list_load_tpl';
export default {
    components: {
        listLoadTpl
    },
    props: ['data', 'compName'],
    computed: {
        oprt() {
            return this.data.oprt;
        },
        search() {
            return this.data.search;
        },
        _params() {
            return this.data._params;
        },
        sortMenus() {
            return this.data.sortMenus;
        },
        sortItems() {
            return this.data.sortItems;
        },
        time() {
            return this.data.time;
        },
        dataList() {
            return this.data.dataList;
        },
        isAllFold() {
            return this.data.isAllFold;
        },
        index() {
            return this.data.index;
        },
        item() {
            return this.data.item;
        },
        formindex() {
            return this.data.formindex;
        },
        form() {
            return this.data.form;
        },
        valItem() {
            return this.data.valItem;
        },
        cancelAllModalShow() {
            return this.data.cancelAllModalShow;
        },
        formReason() {
            return this.data.formReason;
        },
        cancelModalShow() {
            return this.data.cancelModalShow;
        },
        refuseModalShow() {
            return this.data.refuseModalShow;
        },
        bindCommListCmpt() {
            return this.data.bindCommListCmpt;
        },
        bindCancelAllTap() {
            return this.data.bindCancelAllTap;
        },
        bindUnFoldAllTap() {
            return this.data.bindUnFoldAllTap;
        },
        bindFoldAllTap() {
            return this.data.bindFoldAllTap;
        },
        bindCopyTap() {
            return this.data.bindCopyTap;
        },
        url() {
            return this.data.url;
        },
        bindUnFoldTap() {
            return this.data.bindUnFoldTap;
        },
        bindFoldTap() {
            return this.data.bindFoldTap;
        },
        bindCheckinTap() {
            return this.data.bindCheckinTap;
        },
        bindCancelTap() {
            return this.data.bindCancelTap;
        },
        bindStatusTap() {
            return this.data.bindStatusTap;
        },
        bindDelTap() {
            return this.data.bindDelTap;
        },
        bindCancelAllCmpt() {
            return this.data.bindCancelAllCmpt;
        },
        bindClearReasonTap() {
            return this.data.bindClearReasonTap;
        },
        bindCancelCmpt() {
            return this.data.bindCancelCmpt;
        },
        bindRefuseCmpt() {
            return this.data.bindRefuseCmpt;
        }
    }
};
</script>
<style></style>
