<template>
    <view>
        <view v-if="!isLoad" class="margin-top load loading text-l load-project"></view>
        <block v-else>
            <cmpt-comm-list
                type="meet-list"
                :_params="params_var"
                :search="search || ''"
                :_menus="sortMenus"
                :_items="sortItems"
                route="meet/list"
                topBottom="120"
                :isTotalMenu="true"
                placeholder="搜索"
                @list="bindCommListCmpt"
            >
                <!-- List Begin -->
                <view class="main">
                    <view class="list">
                        <view @tap="url" :data-url="'../detail/meet_detail?id=' + item._id" class="item shadow-project" v-for="(item, index) in dataList.list" :key="index">
                            <view class="left">
                                <image class="loading shadow" :lazy-load="true" mode="aspectFill" :src="item.MEET_OBJ.cover[0]" />
                            </view>

                            <view class="right">
                                <view class="line1">
                                    <view class="title">
                                        <text>{{ item.MEET_TITLE }}</text>
                                        <view class="star">
                                            <text class="icon-favorfill text-yellow" v-for="(item, index1) in item.MEET_OBJ.level" :key="index1"></text>
                                            <text class="icon-favor" v-for="(item, index1) in 5 - item.MEET_OBJ.level" :key="index1"></text>
                                        </view>
                                    </view>
                                    <view class="tag-list">
                                        <text v-for="(itm, index1) in item.MEET_OBJ.tag" :key="index1">{{ itm.title }}</text>
                                    </view>
                                </view>
                                <view class="line3">
                                    <view class="text-grey">{{ item.MEET_CATE_NAME }}</view>
                                    <text class="margin-right-xs margin-left-xs">|</text>
                                    <view>{{ item.openRule }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- List END -->

                <!-- load begin -->

                <listLoadTpl compName="listLoadTpl" :data="{ skin: 'load-project', dataList }"></listLoadTpl>
                <!-- load end -->
            </cmpt-comm-list>
        </block>
    </view>
</template>
<script module="tools" lang="wxs" src="@/tpls/wxs/tools.wxs"></script>
<script>
import listLoadTpl from '../../../../../tpls/public/list_load_tpl';
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const MeetBiz = require('../../../biz/meet_biz.js');
export default {
    components: {
        listLoadTpl
    },
    data() {
        return {
            isLoad: false,
            params_var: null,
            sortMenus: [],
            sortItems: [],
            search: '',

            dataList: {
                list: []
            },

            itm: {
                title: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        ProjectBiz.initPage(this);
        if (options && options.id) {
            this.setData({
                isLoad: true,
                params_var: {
                    cateId: options.id
                }
            });
            MeetBiz.setCateTitle();
        } else {
            this.getSearchMenuFun();
            this.setData({
                isLoad: true
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
    onShow: async function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
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

        getSearchMenuFun: function () {
            let sortItem1 = [];
            if (MeetBiz.getCateList().length > 1) {
                sortItem1 = [
                    {
                        label: '全部',
                        type: 'cateId',
                        value: ''
                    }
                ];
                sortItem1 = sortItem1.concat(MeetBiz.getCateList());
            }
            let sortItems = [];
            let sortMenus = sortItem1;
            this.setData({
                sortItems,
                sortMenus
            });
        }
    }
};
</script>
<style>
@import '../../../../../style/public/comm_box_list.css';
@import '../../../style/skin.css';

.main {
    padding: 0rpx;
}

.list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10rpx 20rpx;
    margin-top: 30rpx;
}

.list .item {
    position: relative;
    width: 100%;
    display: flex;
    background-color: #fff;
    padding: 10rpx 14rpx;
    border-radius: 10rpx;
    margin-bottom: 60rpx;
    border-bottom-left-radius: 30rpx;
}

.list .item .left {
    margin-right: 20rpx;
    position: relative;
    margin-top: -40rpx;
}

.list .item .left image {
    width: 160rpx;
    height: 210rpx;
    box-shadow: 5rpx 0rpx 10rpx rgba(216, 220, 223, 0.6);
    border-radius: 10rpx;
    border: 2rpx solid #eee;
    border-bottom-left-radius: 30rpx;
    border-top-right-radius: 30rpx;
}

.list .item .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 5rpx;
    justify-content: space-between;
}

.list .item .right .line1 {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.list .item .right .line1 .title {
    width: 100%;
    font-size: 30rpx;
    border-bottom: 2rpx dotted #ccc;
    padding: 5rpx 0rpx 15rpx 0;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.list .item .right .line1 .title .star {
    font-size: 20rpx;
    color: #ccc;
}

.list .item .right .line1 .title .star > text {
    margin-right: 0rpx;
}

.list .item .right .line1 .tag-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 15rpx;
}

.list .item .right .line1 .tag-list > text {
    padding: 6rpx 10rpx;
    font-size: 22rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    background-color: #f2f2f2;
    border-radius: 6rpx;
    color: var(--projectCompareColor);
}

.list .item .right .line3 {
    width: 100%;
    color: #999;
    font-size: 24rpx;
    padding: 0rpx 0;
    line-height: 40rpx;
    display: flex;
    justify-content: flex-start;
    margin-top: 6rpx;
}

.list .item .right .tag-list .tag {
    padding: 5rpx 10rpx;
    background-color: #f2f2f2;
    margin-right: 5rpx;
    border-radius: 5rpx;
    margin-bottom: 11rpx;
    margin-top: 5rpx;
    color: #999;
}
</style>
