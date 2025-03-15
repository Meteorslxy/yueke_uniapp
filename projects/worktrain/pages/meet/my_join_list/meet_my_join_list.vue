<template>
    <view>
        <block v-if="isLoad">
            <cmpt-comm-list
                type="my_join"
                :_params="params_var"
                :search="search || ''"
                :_menus="sortMenus"
                :_items="sortItems"
                route="meet/my_join_list"
                :isTotalMenu="true"
                sortMenusDefaultIndex="0"
                topBottom="120"
                placeholder="搜索"
                @list="bindCommListCmpt"
            >
                <view slot="searchEnd"></view>

                <!-- List Begin -->
                <view class="text-pic-list-box padding-project">
                    <view class="item card-project shadow-project" v-for="(item, index) in dataList.list" :key="index">
                        <view class="status bg-grey light" v-if="item.isTimeout">已过期</view>

                        <view class="status bg-green light" v-else-if="item.JOIN_STATUS == 1 && item.JOIN_IS_CHECKIN == 0">可使用</view>

                        <view class="status bg-blue light" v-else-if="item.JOIN_STATUS == 1 && item.JOIN_IS_CHECKIN == 1">已核销</view>

                        <view class="status bg-orange light" v-else-if="item.JOIN_STATUS == 10">已取消</view>

                        <view class="status bg-red light" v-else-if="item.JOIN_STATUS == 99">系统取消</view>

                        <view
                            @tap="url"
                            :data-url="'../my_join_detail/meet_my_join_detail?id=' + item._id"
                            v-if="!item.isTimeout && item.JOIN_STATUS == 1 && item.JOIN_IS_CHECKIN == 0"
                            class="qr"
                        >
                            <text class="icon-qrcode"></text>
                        </view>

                        <view class="title">{{ item.JOIN_MEET_TITLE }}</view>

                        <view class="author content-cut-two">姓名：{{ item.JOIN_OBJ.name }}</view>

                        <view class="author">时间：{{ item.JOIN_MEET_DAY }} {{ item.JOIN_MEET_TIME_START }}～{{ item.JOIN_MEET_TIME_END }}</view>

                        <view class="data">
                            <block v-if="item.JOIN_STATUS == 99">
                                <text class="text-red">
                                    <text class="icon-bad margin-right-xxs"></text>
                                    系统取消
                                    <text class="text-grey" v-if="item.JOIN_REASON">：{{ item.JOIN_REASON }}</text>
                                </text>
                            </block>
                        </view>

                        <view class="data data-button">
                            <button @tap="url" :data-url="'../my_join_detail/meet_my_join_detail?id=' + item._id" class="btn mid bg-gray text-black">查看详情</button>
                            <button
                                v-if="((!item.isTimeout && item.JOIN_STATUS == 1) || item.JOIN_STATUS == 0) && item.JOIN_IS_CHECKIN == 0"
                                @tap="bindCancelTap"
                                :data-id="item._id"
                                class="btn mid bg-grey light"
                            >
                                <text class="icon-close"></text>
                                取消
                            </button>
                        </view>
                    </view>

                    <!-- load begin -->

                    <listLoadTpl compName="listLoadTpl" :data="{ skin: 'load-project', dataList }"></listLoadTpl>
                    <!-- load end -->
                </view>
                <!-- List END -->
            </cmpt-comm-list>

            <!-- button Begin -->
            <!-- button END -->
        </block>
    </view>
</template>

<script>
import listLoadTpl from '../../../../../tpls/public/list_load_tpl';
const pageHelper = require('../../../../../helper/page_helper.js');
const helper = require('../../../../../helper/helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
export default {
    components: {
        listLoadTpl
    },
    data() {
        return {
            isLogin: true,
            isLoad: false,
            params_var: '',
            search: '',
            sortItems: '',
            sortMenus: '',

            dataList: {
                list: []
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        ProjectBiz.initPage(this);
        if (!(await PassportBiz.loginMustBackWin(this))) {
            return;
        }
        if (options && helper.isDefined(options.status)) {
            this.setData({
                isLoad: true,
                params_var: {
                    sortType: options.status,
                    sortVal: ''
                }
            });
        }
        this.getSearchMenuFun();
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
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        url: async function (e) {
            pageHelper.url(e, this);
        },

        bindCommListCmpt: function (e) {
            pageHelper.commListListener(this, e);
        },

        /** 搜索菜单设置 */
        getSearchMenuFun: function () {
            let sortItems = [];
            let sortMenus = [
                {
                    label: '全部',
                    type: 'all',
                    value: ''
                }
            ];
            sortMenus = sortMenus.concat([
                {
                    label: '可使用',
                    type: 'use',
                    value: ''
                },
                {
                    label: '已核销',
                    type: 'check',
                    value: ''
                },
                {
                    label: '已过期',
                    type: 'timeout',
                    value: ''
                },
                {
                    label: '系统取消',
                    type: 'cancel',
                    value: ''
                }
            ]);
            this.setData({
                search: '',
                sortItems,
                sortMenus,
                isLoad: true
            });
        },

        bindCancelTap: async function (e) {
            let callback = async () => {
                let joinId = pageHelper.dataset(e, 'id');
                try {
                    let params = {
                        joinId
                    };
                    let opts = {
                        title: '取消中'
                    };
                    await cloudHelper.callCloudSumbit('meet/my_join_cancel', params, opts).then((res) => {
                        pageHelper.delListNode(joinId, this.dataList.list, '_id');
                        this.dataList.total--;
                        this.setData({
                            dataList: this.dataList
                        });
                        pageHelper.showNoneToast('取消成功');
                    });
                } catch (err) {
                    console.log('CatchClause', err);
                    console.log('CatchClause', err);
                    console.log(err);
                }
            };
            pageHelper.showConfirm('确认取消该预约?', callback);
        }
    }
};
</script>
<style>
@import '../../../../../style/public/article_list.css';
@import '../../../style/skin.css';

.text-pic-list-box .item {
    padding: 20rpx 30rpx 20rpx 40rpx;
    position: relative;
    overflow: hidden;
}

.text-pic-list-box .item .status {
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 24rpx;
    border-bottom-right-radius: 20rpx;
    background-color: #ccc;
    padding: 10rpx 20rpx 10rpx;
    color: #fff;
}

.text-pic-list-box .item .qr {
    z-index: 9999;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 24rpx;
    border-bottom-left-radius: 10rpx;
    background-color: #f2f2f2;
    padding: 0rpx 10rpx 0rpx;
    color: #666;
    font-size: 40rpx;
}

.btn.mid {
    padding: 0 30rpx;
}

.text-pic-list-box .item .author {
    margin-top: 10rpx;
    font-size: 28rpx;
    color: #999;
}

.text-pic-list-box .item .title {
    position: relative;
    padding-right: 20rpx;
    padding-top: 40rpx;
    font-size: 32rpx;
}

.text-pic-list-box .item .data {
    line-height: 1.5;
    font-size: 26rpx;
    color: #666;
    margin-top: 10rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.text-time {
    color: #ccc;
}

.text-pic-list-box .item .title {
    max-height: unset !important;
}
</style>
