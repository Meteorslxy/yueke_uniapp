<template>
    <view>
        <template v-if="compName === 'menuTpl'">
            <view class="tab-bar">
                <view v-if="returnHome" class="tab-bar-home" @tap="url" data-type="relaunch" data-url="/pages/home/index/home_index">
                    <text class="tab-bar-home-text icon-homefill text-grey"></text>
                </view>

                <view class="tab-bar-border"></view>
                <view class="tab-bar-item" @tap="url" data-type="relaunch" data-url="/projects/worktrain/pages/default/index/default_index">
                    <image class="tab-icon" :src="'/projects/worktrain/images/tabbar/home' + (curMenu == 'home_index' ? '_cur' : '') + '.png'"></image>
                    <view :class="'tab-text ' + (curMenu == 'home_index' ? 'menu-project' : '')">首页</view>
                </view>

                <view class="tab-bar-item" @tap="url" data-type="relaunch" data-url="/projects/worktrain/pages/news/index/news_index">
                    <image class="tab-icon" :src="'/projects/worktrain/images/tabbar/news' + (curMenu == 'news_index' ? '_cur' : '') + '.png'"></image>
                    <view :class="'tab-text ' + (curMenu == 'news_index' ? 'menu-project' : '')">公告通知</view>
                </view>

                <view v-if="skin.cate2 !== false" class="tab-bar-item" @tap="url" data-type="relaunch" data-url="/projects/worktrain/pages/meet/calendar/meet_calendar">
                    <image class="tab-icon" :src="'/projects/worktrain/images/tabbar/day' + (curMenu == 'meet_calendar' ? '_cur' : '') + '.png'"></image>
                    <view :class="'tab-text ' + (curMenu == 'meet_calendar' ? 'menu-project' : '')">预约日历</view>
                </view>

                <view class="tab-bar-item" @tap="url" data-type="relaunch" data-url="/projects/worktrain/pages/my/index/my_index">
                    <image class="tab-icon" :src="'/projects/worktrain/images/tabbar/my' + (curMenu == 'my_index' ? '_cur' : '') + '.png'"></image>
                    <view :class="'tab-text ' + (curMenu == 'my_index' ? 'menu-project' : '')">个人中心</view>
                </view>
            </view>
        </template>
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        returnHome() {
            return this.data.returnHome;
        },
        curMenu() {
            return this.data.curMenu;
        },
        skin() {
            return this.data.skin;
        },
        url() {
            return this.data.url;
        }
    },
	component: true
};
</script>
<style></style>
