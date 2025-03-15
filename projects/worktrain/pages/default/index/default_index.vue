<template>
    <view>
        <view class="main">
            <view class="up">
                <image mode="widthFix" src="/static/projects/worktrain/images/home.jpg" />
            </view>
            <view class="down">
                <view class="menu shadow-project">
                    <block v-for="(item, index) in cateList" :key="index">
                        <view @tap="url" :data-url="'../../meet/index/meet_index?id=' + item.id" class="item">
                            <view class="item-inner">
                                <view class="img">
                                    <image :src="'../../../images/menu/' + item.id + '.png'" />
                                </view>
                                <view class="title">{{ item.title }}</view>
                            </view>
                        </view>
                    </block>
                </view>

                <view class="area shadow-project">
                    <view class="hot-line" @tap="url" data-url="../../meet/index/meet_index?id=1">
                        <view class="left">
                            <view class="icon-left"></view>
                            热门推荐
                        </view>
                    </view>

                    <view v-if="!meetList" class="margin-top load loading text-l load-project"></view>

                    <!-- 横向拖动 Begin -->
                    <view class="scroll-x">
                        <scroll-view :scroll-x="true" class="comm-list-scroll">
                            <view class="item-scroll" @tap="url" :data-url="'../../meet/detail/meet_detail?id=' + item._id" v-for="(item, index) in meetList" :key="index">
                                <image :lazy-load="true" class="loading shadow" :src="item.MEET_OBJ.cover" mode="aspectFill"></image>

                                <view class="title text-cut">{{ item.MEET_TITLE }}</view>
                            </view>
                        </scroll-view>
                    </view>
                    <!-- 横向拖动 END -->
                </view>

                <view class="area shadow-project">
                    <view class="hot-line">
                        <view class="left">
                            <view class="icon-left"></view>
                            最新通知
                        </view>
                    </view>

                    <!-- List Begin -->
                    <view v-if="!newsList" class="margin-top load loading text-l load-project"></view>

                    <view v-else class="comm-list-box sub-margin-bottom">
                        <block v-for="(item, index) in newsList" :key="index">
                            <view class="item item-leftbig1" @tap="url" :data-url="'../../news/detail/news_detail?id=' + item._id">
                                <image mode="aspectFill" :lazy-load="true" class="leftbig-left loading shadow" :src="item.NEWS_PIC"></image>
                                <view class="leftbig-right">
                                    <view class="leftbig-title content-cut-one">{{ item.NEWS_TITLE }}</view>
                                    <view class="leftbig-desc">
                                        <text class="content-cut-two">{{ item.NEWS_DESC }}</text>
                                    </view>
                                    <view class="data">
                                        <view class="bottom-tag-list text-cut"></view>
                                        <view class="bottom-status">{{ item.NEWS_ADD_TIME }}</view>
                                    </view>
                                </view>
                            </view>
                        </block>
                    </view>
                    <!-- List END -->
                </view>
            </view>
        </view>

        <block v-if="skin.IS_SUB">
            <menuTpl compName="menuTpl" :data="{ curMenu: 'home_index', returnHome: false }"></menuTpl>
        </block>
    </view>
</template>

<script>
import menuTpl from '../../tpls/menu_tpl';
const pageHelper = require('../../../../../helper/page_helper');
const cloudHelper = require('../../../../../helper/cloud_helper');
const ProjectBiz = require('../../../biz/project_biz');
const projectSetting = require('../../../public/project_setting');
export default {
    components: {
        menuTpl
    },
    data() {
        return {
            cateList: '',
            meetList: '',
            newsList: '',

            skin: {
                IS_SUB: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        ProjectBiz.initPage(this);
        this.setData({
            cateList: projectSetting.MEET_CATE
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () {
        this.loadListFun();
    },
    onPullDownRefresh: async function () {
        await this.loadListFun();
        uni.stopPullDownRefresh();
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        loadListFun: async function () {
            let opts = {
                title: 'bar'
            };
            await cloudHelper.callCloudSumbit('home/list', {}, opts).then((res) => {
                this.setData({
                    ...res.data
                });
            });
        },

        url: async function (e) {
            pageHelper.url(e, this);
        }
    }
};
</script>
<style>
@import '../../../../../style/public/comm_box_list.css';
@import '../../../style/skin.css';

page {
    background-color: #f8f8f8;
}

.main {
    padding: 0rpx 0rpx 100rpx;
}

.up {
    width: 100%;
}

.up image {
    width: 100%;
    height: 500rpx;
}

.down {
    width: 100%;
    box-sizing: border-box;
    margin-top: -50rpx;
    z-index: 9999;
    padding: 0 24rpx;
}

.menu {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 50rpx 10rpx 10rpx;
    border-radius: 20rpx;
}

.menu .item {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50rpx;
}

.menu .item .item-inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.menu .item-inner .img {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(218, 222, 238, 0.1);
    border-radius: 50%;
    width: 60rpx;
    height: 60rpx;
}

.menu .item-inner .img image {
    width: 60rpx;
    height: 60rpx;
}

.menu .item-inner .title {
    margin-top: 10rpx;
    font-size: 26rpx;
    color: #4f5368;
}

/*** 图文列表盒子 ***/
.home-list-box {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx 30rpx 30rpx 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    padding: 0;
    margin-top: 40rpx;
    overflow: unset;
}

.home-list-box .item {
    padding: 0rpx 0rpx;
    background-color: #fff;
    border-radius: 20rpx;
    position: relative;
    max-height: 280rpx;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    margin-bottom: 70rpx;
}

.home-list-box .item:first-child {
    margin-top: 60rpx;
}

.home-list-box .item .left {
    width: 190rpx;
    height: 210rpx;
    margin-left: 0rpx;
    margin-top: -30rpx;
    border-radius: 15rpx !important;
    overflow: hidden;
    box-shadow: var(--ShadowSize) var(--greyShadow);
}

.home-list-box .item .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 20rpx;
    margin-right: 20rpx;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    padding: 15rpx 10rpx;
}

.home-list-box .item .right .title {
    width: 100%;
    font-size: 32rpx;
    color: #000;
    line-height: 1.5;
    margin-top: 0rpx;
    font-weight: bold;
}

.home-list-box .item .desc {
    margin-top: 5rpx;
    font-size: 28rpx;
    color: #999;
    line-height: 1.2;
    height: 60rpx;
    margin-bottom: 10rpx;
}

.home-list-box .item .data {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 0rpx;
    color: #999;
    font-size: 24rpx;
    position: relative;
}

.area {
    width: 100%;
    background-color: #fff;
    border-radius: 20rpx;
    margin-top: 30rpx;
    padding: 0rpx 0 20rpx;
}

.hot-line {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10rpx 30rpx 10rpx;
    align-items: center;
    margin-top: 10rpx;
    border-radius: 20rpx;
    align-items: center;
}

.hot-line .left {
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
    margin-top: 10rpx;
    display: flex;
    align-items: center;
}

.hot-line .left .icon-left {
    width: 10rpx;
    height: 30rpx;
    background-image: linear-gradient(145deg, #2b72d4, #79a6e4, #2b72d4);
    margin-right: 14rpx;
    border-radius: 10rpx;
}

.hot-line .right {
    font-size: 24rpx;
    color: #bbb;
}

.scroll-x {
    width: 100%;
    padding: 0 28rpx;
}

.comm-list-box {
    padding: 0rpx 10rpx 30rpx 10rpx;
}

.comm-list-scroll .item-scroll {
    margin-left: 10rpx;
    margin-right: 10rpx;
    position: relative;
    padding: 0rpx 0rpx;
}

.comm-list-scroll .item-scroll:first-child {
    margin-left: 0rpx;
}

.comm-list-scroll .item-scroll {
    position: relative;
}

.comm-list-scroll .item-scroll image {
    width: 160rpx;
    height: 260rpx;
    border-radius: 10rpx;
    border: 2rpx solid #ccc;
}

.comm-list-scroll .item-scroll .title {
    text-align: left;
    margin-left: 14rpx;
    font-size: 24rpx;
    color: #fff;
    position: absolute;
    bottom: 20rpx;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    max-width: 160rpx;
    width: unset;
    height: unset;
    padding: 2rpx 6rpx;
    border-radius: 6rpx;
}

.comm-list-box .item-leftbig1 .leftbig-left {
    border-top-right-radius: 10rpx !important;
    border-bottom-left-radius: 10rpx !important;
}
</style>
