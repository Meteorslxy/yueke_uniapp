<template>
    <view>
        ﻿
        <view v-if="mode != 'btn'" style="height: 200rpx"></view>

        <view
            v-if="doHome && mode != 'right' && mode != 'left'"
            @tap="bindHomeTap"
            class="cmpt-fixed-home-btn"
            style="bottom: calc(constant(safe-area-inset-bottom) + 180rpx); bottom: calc(env(safe-area-inset-bottom) + 180rpx)"
        >
            <text class="icon-home"></text>
            <text style="font-size: 22rpx">首页</text>
        </view>

        <!-- 回页首 begin -->
        <block v-if="doTop">
            <topTpl compName="topTpl" :data="{ topBtnShow, bottom: topBtnBottom }"></topTpl>
        </block>
        <!-- 回页首 end -->

        <!-- mode1 BEGIN -->
        <view v-if="mode == 'mode1'" class="cmpt-biz-detail-mode1 safe-bottom">
            <view v-if="tag" class="has-tag">{{ tag }}</view>
            <view class="fav btn-inner" @tap="bindFavTap" v-if="doFav">
                <block v-if="isFav > 0">
                    <text class="icon-favorfill margin-right-xxs text-project" :style="'color:' + (color || bg) + '!important'"></text>
                    <text class="text-project" :style="'color:' + (color || bg) + '!important'">已收藏</text>
                </block>
                <block v-else>
                    <text class="icon-favor margin-right-xxs"></text>
                    加入收藏
                </block>
            </view>
            <view class="btn-inner" @tap="bindShareTap" v-if="doShare && doPoster">
                <view class="share">
                    <text class="icon-forward margin-right-xxs"></text>
                    分享
                </view>
            </view>
            <view class="btn-inner" v-if="doShare && !doPoster">
                <button class="share clearbtn" open-type="share" style="margin-top: -10rpx">
                    <text class="icon-forward margin-right-xxs"></text>
                    分享
                </button>
            </view>

            <slot />
        </view>
        <!-- mode1 end -->

        <!-- mode2 BEGIN -->
        <view v-if="mode == 'mode2'" class="cmpt-biz-detail-mode2 safe-bottom">
            <view v-if="tag" class="has-tag">{{ tag }}</view>
            <view class="inner">
                <button class="share clearbtn" @tap="bindShareTap" v-if="doShare && doPoster">
                    <text class="icon-forward"></text>
                    <text class="text-s">分享</text>
                </button>
                <button class="share clearbtn" open-type="share" v-if="doShare && !doPoster">
                    <text class="icon-forward"></text>
                    <text class="text-s">分享</text>
                </button>
                <block v-if="doFav">
                    <view @tap="bindFavTap" class="fav text-project" v-if="isFav > 0">
                        <text class="icon-favorfill"></text>
                        <text class="text-s">已收藏</text>
                    </view>
                    <view @tap="bindFavTap" class="fav" v-else>
                        <text class="icon-favor"></text>
                        <text class="text-s">收藏</text>
                    </view>
                </block>
                <view class="slot-inner">
                    <slot />
                </view>
            </view>
        </view>
        <!-- mode2 end -->

        <!-- mode right BEGIN -->
        <view v-if="mode == 'right'" class="cmpt-biz-detail-mode-right safe-bottom">
            <view class="inner">
                <block v-if="doHome">
                    <view @tap="bindHomeTap" class="fixed-btn">
                        <text class="icon-home"></text>
                    </view>
                </block>
                <button class="fixed-btn clearbtn" @tap="bindShareTap" v-if="doShare && doPoster">
                    <text class="icon-forward"></text>
                </button>
                <button class="fixed-btn clearbtn" open-type="share" v-if="doShare && !doPoster">
                    <text class="icon-forward"></text>
                </button>
                <block v-if="doFav">
                    <view @tap="bindFavTap" class="fixed-btn" v-if="isFav > 0">
                        <text class="icon-favorfill"></text>
                    </view>
                    <view @tap="bindFavTap" class="fixed-btn" v-else>
                        <text class="icon-favor"></text>
                    </view>
                </block>
                <view class="slot-inner">
                    <slot />
                </view>
            </view>
        </view>
        <!-- mode right end -->

        <!-- mode left BEGIN -->
        <view v-if="mode == 'left'" class="cmpt-biz-detail-mode-left safe-bottom">
            <view class="inner">
                <block v-if="doHome">
                    <view @tap="bindHomeTap" class="fixed-btn">
                        <text class="icon-home"></text>
                    </view>
                </block>
                <button class="fixed-btn clearbtn" @tap="bindShareTap" v-if="doShare && doPoster">
                    <text class="icon-forward"></text>
                </button>
                <button class="fixed-btn clearbtn" open-type="share" v-if="doShare && !doPoster">
                    <text class="icon-forward"></text>
                </button>
                <block v-if="doFav">
                    <view @tap="bindFavTap" class="fixed-btn" v-if="isFav > 0">
                        <text class="icon-favorfill"></text>
                    </view>
                    <view @tap="bindFavTap" class="fixed-btn" v-else>
                        <text class="icon-favor"></text>
                    </view>
                </block>
                <view class="slot-inner">
                    <slot />
                </view>
            </view>
        </view>
        <!-- mode left end -->

        <!-- btn BEGIN -->
        <view v-if="mode == 'btn'" class="cmpt-biz-detail-mode-btn">
            <block v-if="doFav">
                <view @tap="bindFavTap" v-if="isFav > 0">
                    <text class="icon-favorfill margin-right-xxs"></text>
                    已收藏
                </view>
                <view @tap="bindFavTap" v-else>加入收藏</view>
            </block>
            <block v-if="doShare">
                <view v-if="doPoster" @tap="bindShareTap">分享</view>
                <button open-type="share" v-else class="clearbtn">分享</button>
            </block>
        </view>
        <!-- btn End -->

        <cmpt-poster :show.sync="showPoster" :doPoster="doPoster" v-if="posterConfig" :config="posterConfig" />
    </view>
</template>

<script>
import cmptPoster from '@/cmpts/public/poster/poster_cmpt';
import topTpl from '../../../tpls/public/top_tpl.vue';
const pageHelper = require('../../../helper/page_helper');
const posterCmptHelper = require('../../public/poster/poster_cmpt_helper.js');
const FavBiz = require('../../../comm/biz/fav_biz.js');
const FootBiz = require('../../../comm/biz/foot_biz.js');
export default {
    components: {
        cmptPoster,
        topTpl
    },
    data() {
        return {
            isFav: -1,
            showPoster: false,
            posterConfig: null
        };
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        mode: {
            type: String,
            default: 'mode1'
        },
        oid: {
            type: String,
            default: ''
        },
        cate: {
            //分类中文名
            type: String,
            default: ''
        },
        type: {
            //分类  有值时业务存储到type对应的表里，无值时存储到fav表
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        cover: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: '查看详情'
        },
        qr: {
            type: String,
            default: ''
        },
        user: {
            type: String,
            default: ''
        },
        avatar: {
            type: String,
            default: ''
        },
        bg: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
        tag: {
            type: String,
            //小角标
            default: ''
        },
        doFav: {
            type: Boolean,
            default: true
        },
        doFoot: {
            type: Boolean,
            default: true
        },
        doShare: {
            type: Boolean,
            default: true
        },
        doHome: {
            type: Boolean,
            default: true
        },
        homeUrl: {
            type: String,
            default: ''
        },
        doPoster: {
            type: Boolean,
            default: true
        },
        doFoot: {
            type: Boolean,
            default: true
        },
        doTop: {
            type: Boolean,
            default: true
        },
        doSlot: {
            type: Boolean,
            default: false
        },
        topBtnBottom: {
            type: Number,
            default: 190
        },
        topBtnShow: {
            type: Boolean,
            default: false
        }
    },
    created: function () {},
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
        // 处理小程序 ready 生命周期
        this.$nextTick(() => this.ready());
    },
    move: function () {},
    destroyed: function () {},
    /**
     * 组件的方法列表
     */
    methods: {
        ready: async function () {
            if (!this.oid || !this.title) {
                return;
            }
            if (this.doFav) {
                if (this.type) {
                    FavBiz.isFav(this, this.oid, this.type);
                } else {
                    FavBiz.isFav(this, this.oid, this.cate);
                }
            }
            if (this.doFoot) {
                FootBiz.addFoot(this.cate, this.title);
            }
            if (this.doShare) {
                let posterConfig = await posterCmptHelper.config1({
                    cover: this.cover,
                    title: this.title,
                    desc: this.desc,
                    qr: this.qr,
                    bg: this.bg,
                    user: this.user,
                    avatar: this.avatar
                });
                this.setData({
                    posterConfig
                });
            }
        },

        attached: function () {},

        bindShareTap: function () {
            this.setData({
                showPoster: true
            });
        },

        bindFavTap: async function () {
            if (this.isFav == -1) {
                return;
            }
            if (this.type) {
                await FavBiz.updateFav(this, this.oid, this.isFav, this.type, this.title);
            } else {
                await FavBiz.updateFav(this, this.oid, this.isFav, this.cate, this.title);
            }
        },

        url: function (e) {
            pageHelper.url(e, this);
        },

        bindHomeTap: function (e) {
            let url = this.homeUrl;
            if (!url) {
                url = pageHelper.fmtURLByPID('/pages/default/index/default_index');
            }
            uni.reLaunch({
                url
            });
        },

        top: function (e) {
            // 回页首事件
            pageHelper.top();
        }
    }
};
</script>
<style>
.cmpt-fixed-home-btn {
    position: fixed;
    bottom: 180rpx;
    left: 10rpx;
    font-size: 45rpx;
    height: 80rpx;
    width: 80rpx;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    z-index: 99999;
}

/*MODE1*/
.cmpt-biz-detail-mode1 {
    box-shadow: 0 -6rpx 8rpx rgba(114, 130, 138, 0.2);
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 9999999;
    display: flex;
    align-items: stretch;
    justify-content: center;
    font-size: 32rpx;
    color: #333;
}

.cmpt-biz-detail-mode1 .has-tag {
    position: absolute;
    top: 0rpx;
    right: 0rpx;
    z-index: 9999;
    font-size: 22rpx;
    padding: 0rpx 4rpx;
    border-radius: 5rpx;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.2);
}

.cmpt-biz-detail-mode1 .btn-inner {
    padding: 30rpx 0rpx;
    flex: 1 1 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cmpt-biz-detail-mode1 .btn-inner {
    border-right: 1rpx solid #ddd;
}

.cmpt-biz-detail-mode1 .btn-inner:last-child {
    border-right: unset;
}

.cmpt-biz-detail-mode1 .btn-inner .fav {
    background: inherit;
}

.cmpt-biz-detail-mode1 .btn-inner .share {
    background: inherit;
}

/*MODE2*/
.cmpt-biz-detail-mode2 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0 -6rpx 8rpx rgba(114, 130, 138, 0.1);
    z-index: 999;
}

.cmpt-biz-detail-mode2 .has-tag {
    position: absolute;
    top: 5rpx;
    right: 10rpx;
    z-index: 9999;
    font-size: 24rpx;
    background-color: #f8f8f8;
    padding: 5rpx 10rpx;
    border-radius: 10rpx;
    color: #666;
    border: 1rpx solid #eee;
}

.cmpt-biz-detail-mode2 .inner {
    width: 100%;
    padding: 20rpx 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.cmpt-biz-detail-mode2 .inner .slot-inner {
    flex: 1;
    padding: 0 20rpx;
}

.cmpt-biz-detail-mode2 .share,
.cmpt-biz-detail-mode2 .fav {
    font-size: 35rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20rpx;
    width: 120rpx;
}

.cmpt-biz-detail-mode2 .share .text-s,
.cmpt-biz-detail-mode2 .fav .text-s {
    margin-top: 0rpx;
    font-size: 24rpx;
}

/*MODE RIGHT*/
.cmpt-biz-detail-mode-right {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    position: fixed;
    bottom: 90rpx;
    right: 15rpx;
    z-index: 99999;
}

.cmpt-biz-detail-mode-right .fixed-btn {
    font-size: 35rpx;
    height: 60rpx;
    width: 60rpx;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-bottom: 15rpx;
}

.cmpt-biz-detail-mode-right .fixed-btn .text-t {
    font-size: 22rpx;
}

/*MODE LEFT*/
.cmpt-biz-detail-mode-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    position: fixed;
    bottom: 90rpx;
    left: 15rpx;
    z-index: 99999;
}

.cmpt-biz-detail-mode-left .fixed-btn {
    font-size: 35rpx;
    height: 60rpx;
    width: 60rpx;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-bottom: 15rpx;
}

.cmpt-biz-detail-mode-left .fixed-btn .text-t {
    font-size: 22rpx;
}

/** BTN **/
.cmpt-biz-detail-mode-btn {
    width: 100%;
    font-size: 26rpx;
    color: #fff;
    display: flex;
    margin-top: 20rpx;
    justify-content: flex-start;
}

.cmpt-biz-detail-mode-btn > view,
.cmpt-biz-detail-mode-btn > button {
    font-size: 24rpx;
    color: #fff;
    margin-right: 20rpx;
    padding: 6rpx 25rpx;
    border-radius: 30rpx;
    border: 2rpx solid #999999;
}
</style>
