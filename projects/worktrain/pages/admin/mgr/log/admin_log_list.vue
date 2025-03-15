<template>
    <view>
        <block v-if="isAdmin && isLoad">
            <cmpt-comm-list
                source="admin"
                type="admin_log_list"
                :search="search || ''"
                :_menus="sortMenus"
                :_items="sortItems"
                sortMenusDefaultIndex="0"
                route="admin/log_list"
                topBottom="50"
                placeholder="搜索内容，管理员账号，姓名"
                @list="bindCommListCmpt"
            >
                <view slot="searchEnd">
                    <button @tap="bindClearTap" class="btn radius bg-admin text-white margin-right-s">
                        <text class="icon-delete margin-right-xxs"></text>
                        清空日志
                    </button>
                </view>

                <!-- List Begin -->
                <view class="admin-comm-list">
                    <view v-if="dataList && dataList.total" class="load text-black">共有{{ dataList.total }}条符合条件记录</view>

                    <view class="item" v-for="(item, index) in dataList.list" :key="index">
                        <view class="no">{{ index + 1 }}</view>

                        <view class="header">
                            <view class="left text-cut">{{ item.LOG_TYPE_DESC }}操作</view>
                            <view class="right"></view>
                        </view>

                        <view class="info">
                            <view class="info-item">
                                <view class="title">操作人</view>
                                <view class="mao">：</view>
                                <view class="content">{{ item.LOG_ADMIN_NAME }} ({{ item.LOG_ADMIN_DESC }})</view>
                            </view>
                            <view class="info-item">
                                <view class="title">操作时间</view>
                                <view class="mao">：</view>
                                <view class="content">{{ item.LOG_ADD_TIME }}</view>
                            </view>
                            <view class="info-item">
                                <view class="title">操作内容</view>
                                <view class="mao">：</view>
                                <view class="content">{{ item.LOG_CONTENT }}</view>
                            </view>
                            <view class="info-item">
                                <view class="title">IP地址</view>
                                <view class="mao">：</view>
                                <view class="content">{{ item.LOG_ADD_IP }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <!-- List END -->

                <!-- load begin -->

                <listLoadTpl compName="listLoadTpl" :data="{ dataList, skin: 'text-grey' }"></listLoadTpl>
                <!-- load end -->
            </cmpt-comm-list>
        </block>
    </view>
</template>

<script>
import listLoadTpl from '../../../../../../tpls/public/list_load_tpl';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
export default {
    components: {
        listLoadTpl
    },
    data() {
        return {
            isAdmin: '',
            isLoad: '',
            search: '',
            sortMenus: '',
            sortItems: '',

            dataList: {
                total: '',
                list: []
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
        }

        //设置搜索菜单
        this.setData(this.getSearchMenuFun());
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
    methods: {
        url: async function (e) {
            pageHelper.url(e, this);
        },

        bindCommListCmpt: function (e) {
            pageHelper.commListListener(this, e);
        },

        bindClearTap: async function (e) {
            let cb = async () => {
                try {
                    await cloudHelper.callCloudSumbit('admin/log_clear').then((res) => {
                        let cb = () => {
                            uni.redirectTo({
                                url: 'admin_log_list'
                            });
                        };
                        pageHelper.showSuccToast('清空完成', 1500, cb);
                    });
                } catch (err) {
                    console.log('CatchClause', err);
                    console.log('CatchClause', err);
                    console.log(err);
                }
            };
            pageHelper.showConfirm('确认清空？清空不可恢复', cb);
        },

        getSearchMenuFun: function () {
            let sortItems = [];
            let sortMenus = [
                {
                    label: '全部',
                    type: '',
                    value: ''
                },
                {
                    label: '系统',
                    type: 'type',
                    value: 0
                },
                {
                    label: '用户',
                    type: 'type',
                    value: 1
                },
                {
                    label: '文章',
                    type: 'type',
                    value: 2
                },
                {
                    label: '其他',
                    type: 'type',
                    value: 99
                }
            ];
            return {
                search: '',
                sortItems,
                sortMenus,
                isLoad: true
            };
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';

page {
    background-color: #f8f8f8;
}

.admin-comm-list .item .info {
    padding: 15rpx 20rpx 0rpx;
}
</style>
